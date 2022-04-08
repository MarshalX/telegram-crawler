(function () {
  var eventHandlers = {};

  // Parse init params from location hash: for Android < 5.0, TDesktop
  var locationHash = '';
  try {
    locationHash = location.hash.toString();
  } catch (e) {}

  var initParams = urlParseHashParams(locationHash);

  var webAppDataRaw = '', webAppData = {};
  if (initParams.tgWebAppData && initParams.tgWebAppData.length) {
    webAppDataRaw = initParams.tgWebAppData;
    webAppData = urlParseHashParams(webAppDataRaw);
    delete webAppData._path;
    for (var key in webAppData) {
      var val = webAppData[key];
      try {
        if (val.substr(0, 1) == '{' && val.substr(-1) == '}' ||
            val.substr(0, 1) == '[' && val.substr(-1) == ']') {
          webAppData[key] = JSON.parse(val);
        }
      } catch (e) {}
    }
  }

  var isIframe = false;
  try {
    isIframe = (window.parent != null && window != window.parent);
    if (isIframe) {
      window.addEventListener('message', function (event) {
        if (event.source !== window.parent) return;
        try {
          var dataParsed = JSON.parse(event.data);
        } catch (e) {
          return;
        }
        if (!dataParsed || !dataParsed.eventType) {
          return;
        }
        receiveEvent(dataParsed.eventType, dataParsed.eventData);
      });
    }
  } catch (e) {}

  function onThemeChanged(eventType, eventData) {
    if (eventData.theme_params) {
      setThemeParams(eventData.theme_params);
      window.Telegram.WebApp.MainButton.setParams({});
    }
  }

  document.write('<style>#tg-fixed-container{position:fixed;left:0;right:0;top:0;transform:translateY(100vh)}</style>');

  function onViewportChanged(eventType, eventData) {
    var el = document.getElementById('tg-fixed-container');
    if (el && eventData.height) {
      el.style.transform = 'translateY(' + eventData.height + 'px)';
    }
  }

  function urlSafeDecode(urlencoded) {
    try {
      urlencoded = urlencoded.replace(/\+/g, '%20');
      return decodeURIComponent(urlencoded);
    } catch (e) {
      return urlencoded;
    }
  }

  function urlParseHashParams(locationHash) {
    locationHash = locationHash.replace(/^#/, '');
    var params = {};
    if (!locationHash.length) {
      return params;
    }
    if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
      params._path = urlSafeDecode(locationHash);
      return params;
    }
    var qIndex = locationHash.indexOf('?');
    if (qIndex >= 0) {
      var pathParam = locationHash.substr(0, qIndex);
      params._path = urlSafeDecode(pathParam);
      locationHash = locationHash.substr(qIndex + 1);
    }
    var locationHashParams = locationHash.split('&');
    var i, param, paramName, paramValue;
    for (i = 0; i < locationHashParams.length; i++) {
      param = locationHashParams[i].split('=');
      paramName = urlSafeDecode(param[0]);
      paramValue = param[1] == null ? null : urlSafeDecode(param[1]);
      params[paramName] = paramValue;
    }
    return params;
  }

  // Telegram apps will implement this logic to add service params (e.g. tgShareScoreUrl) to game URL
  function urlAppendHashParams(url, addHash) {
    // url looks like 'https://game.com/path?query=1#hash'
    // addHash looks like 'tgShareScoreUrl=' + encodeURIComponent('tgb://share_game_score?hash=telegram-crawler_long_hash123')

    var ind = url.indexOf('#');
    if (ind < 0) {
      // https://game.com/path -> https://game.com/path#tgShareScoreUrl=etc
      return url + '#' + addHash;
    }
    var curHash = url.substr(ind + 1);
    if (curHash.indexOf('=') >= 0 || curHash.indexOf('?') >= 0) {
      // https://game.com/#hash=1 -> https://game.com/#hash=1&tgShareScoreUrl=etc
      // https://game.com/#path?query -> https://game.com/#path?query&tgShareScoreUrl=etc
      return url + '&' + addHash;
    }
    // https://game.com/#hash -> https://game.com/#hash?tgShareScoreUrl=etc
    if (curHash.length > 0) {
      return url + '?' + addHash;
    }
    // https://game.com/# -> https://game.com/#tgShareScoreUrl=etc
    return url + addHash;
  }


  function postEvent(eventType, callback, eventData) {
    if (!callback) {
      callback = function () {};
    }
    if (eventData === undefined) {
      eventData = '';
    }

    if (window.TelegramWebviewProxy !== undefined) {
      TelegramWebviewProxy.postEvent(eventType, JSON.stringify(eventData));
      console.log('[Telegram.WebView] postEvent via TelegramWebviewProxy', eventType, eventData);
      callback();
    }
    else if (window.external && 'notify' in window.external) {
      window.external.notify(JSON.stringify({eventType: eventType, eventData: eventData}));
      console.log('[Telegram.WebView] postEvent via external.notify', eventType, eventData);
      callback();
    }
    else if (isIframe) {
      try {
        var trustedTarget = 'https://web.telegram.org';
        // For now we don't restrict target, for testing purposes
        trustedTarget = '*';
        window.parent.postMessage(JSON.stringify({eventType: eventType, eventData: eventData}), trustedTarget);
        console.log('[Telegram.WebView] postEvent via postMessage', eventType, eventData);
        callback();
      } catch (e) {
        callback(e);
      }
    }
    else {
      console.log('[Telegram.WebView] postEvent', eventType, eventData);
      callback({notAvailable: true});
    }
  };

  function receiveEvent(eventType, eventData) {
    console.log('[Telegram.WebView] receiveEvent', eventType, eventData);
    var curEventHandlers = eventHandlers[eventType];
    if (curEventHandlers === undefined ||
        !curEventHandlers.length) {
      return;
    }
    for (var i = 0; i < curEventHandlers.length; i++) {
      try {
        curEventHandlers[i](eventType, eventData);
      } catch (e) {}
    }
  }

  function onEvent(eventType, callback) {
    if (eventHandlers[eventType] === undefined) {
      eventHandlers[eventType] = [];
    }
    var index = eventHandlers[eventType].indexOf(callback);
    if (index === -1) {
      eventHandlers[eventType].push(callback);
    }
  };

  function offEvent(eventType, callback) {
    if (eventHandlers[eventType] === undefined) {
      return;
    }
    var index = eventHandlers[eventType].indexOf(callback);
    if (index === -1) {
      return;
    }
    eventHandlers[eventType].splice(index, 1);
  };

  var themeParams = {};
  function setThemeParams(theme_params) {
    var root = document.documentElement, color;
    if (root && root.style && root.style.setProperty) {
      for (var key in theme_params) {
        if (color = parseColorToHex(theme_params[key])) {
          themeParams[key] = color;
          if (key == 'bg_color') {
            var color_scheme = isColorDark(color) ? 'dark' : 'light'
            themeParams.color_scheme = color_scheme;
            root.style.setProperty('--tg-theme-color-scheme', color_scheme);
          }
          key = '--tg-theme-' + key.split('_').join('-');
          root.style.setProperty(key, color);
        }
      }
    }
  }

  function parseColorToHex(color) {
    color += '';
    var match;
    if (/^#([0-9a-f]){6}$/i.test(color)) {
      return color.toLowerCase();
    }
    else if (match = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(color)) {
      return ('#' + match[1] + match[1] + match[2] + match[2] + match[3] + match[3]).toLowerCase();
    }
    return false;
  }

  function isColorDark(rgb) {
    rgb = rgb.replace(/[\s#]/g, '');
    if (rgb.length == 3) {
      rgb = rgb[0] + rgb[0] + rgb[1] + rgb[1] + rgb[2] + rgb[2];
    }
    var r = parseInt(rgb.substr(0, 2), 16);
    var g = parseInt(rgb.substr(2, 2), 16);
    var b = parseInt(rgb.substr(4, 2), 16);
    var hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp < 120;
  }

  function byteLength(str) {
    if (window.Blob) {
      try { return new Blob([str]).size; } catch (e) {}
    }
    var s = str.length;
    for (var i=str.length-1; i>=0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s+=2;
      if (code >= 0xdc00 && code <= 0xdfff) i--;
    }
    return s;
  }

  function isParentEl(el, parentEl) {
    var checkEl = el.parentNode;
    while (checkEl) {
      if (checkEl === parentEl) {
        return true;
      }
      checkEl = checkEl.parentNode;
    }
    return false;
  }

  var MainButton = (function() {
    var isVisible = false;
    var isActive = true;
    var isProgressVisible = false;
    var buttonText = 'CONTINUE';
    var buttonColor = false;
    var buttonTextColor = false;
    var onClickCallback = null;

    var mainButton = {};
    Object.defineProperty(mainButton, 'text', {
      set: function(val){ mainButton.setParams({text: val}); },
      get: function(){ return buttonText; },
      enumerable: true
    });
    Object.defineProperty(mainButton, 'color', {
      set: function(val){ mainButton.setParams({color: val}); },
      get: function(){ return buttonColor || themeParams.button_color || '#2481cc'; },
      enumerable: true
    });
    Object.defineProperty(mainButton, 'textColor', {
      set: function(val){ mainButton.setParams({text_color: val}); },
      get: function(){ return buttonTextColor || themeParams.button_text_color || '#ffffff'; },
      enumerable: true
    });
    Object.defineProperty(mainButton, 'isVisible', {
      set: function(val){ mainButton.setParams({is_visible: val}); },
      get: function(){ return isVisible; },
      enumerable: true
    });
    Object.defineProperty(mainButton, 'isProgressVisible', {
      get: function(){ return isProgressVisible; },
      enumerable: true
    });
    Object.defineProperty(mainButton, 'isActive', {
      set: function(val){ mainButton.setParams({is_active: val}); },
      get: function(){ return isActive; },
      enumerable: true
    });

    onEvent('main_button_pressed', onMainButtonPressed);

    var debugBtn = null, debugBodyBottom, debugBtnStyle = {};
    if (initParams.tgWebAppDebug) {
      debugBtn = document.createElement('tg-main-button');
      debugBtnStyle = {
        font: '600 14px/18px sans-serif',
        display: 'none',
        width: '100%',
        height: '48px',
        borderRadius: '0',
        background: 'no-repeat right center',
        position: 'fixed',
        left: '0',
        right: '0',
        bottom: '0',
        margin: '0',
        padding: '15px 20px',
        textAlign: 'center',
        boxSizing: 'border-box',
        zIndex: '10000'
      };
      for (var k in debugBtnStyle) {
        debugBtn.style[k] = debugBtnStyle[k];
      }
      document.addEventListener('DOMContentLoaded', function onDomLoaded(event) {
        document.removeEventListener('DOMContentLoaded', onDomLoaded);
        document.body.appendChild(debugBtn);
        debugBodyBottom = window.getComputedStyle ? window.getComputedStyle(document.body).marginBottom : document.body.style.marginBottom;
        debugBodyBottom = parseInt(debugBodyBottom) || 0;
        debugBtn.addEventListener('click', onMainButtonPressed, false);
      });
    }

    function onMainButtonPressed() {
      if (isActive && onClickCallback) {
        onClickCallback();
      }
    }

    function updateButton() {
      var color = mainButton.color;
      var text_color = mainButton.textColor;
      postEvent('web_app_setup_main_button', false, isVisible ? {
        is_visible: true,
        is_active: isActive,
        is_progress_visible: isProgressVisible,
        text: buttonText,
        color: color,
        text_color: text_color
      } : {is_visible: false});
      if (initParams.tgWebAppDebug) {
        debugBtn.style.display = isVisible ? 'block' : 'none';
        debugBtn.style.opacity = isActive ? '1' : '0.8';
        debugBtn.style.cursor = isActive ? 'pointer' : 'auto';
        debugBtn.disabled = !isActive;
        debugBtn.innerText = buttonText;
        debugBtn.style.backgroundImage = isProgressVisible ? "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewport%3D%220%200%2048%2048%22%20width%3D%2248px%22%20height%3D%2248px%22%3E%3Ccircle%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222.25%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20stroke-dashoffset%3D%22106%22%20r%3D%229%22%20stroke-dasharray%3D%2256.52%22%20rotate%3D%22-90%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20attributeType%3D%22XML%22%20dur%3D%22360s%22%20from%3D%220%22%20to%3D%2212500%22%20repeatCount%3D%22indefinite%22%3E%3C%2Fanimate%3E%3CanimateTransform%20attributeName%3D%22transform%22%20attributeType%3D%22XML%22%20type%3D%22rotate%22%20dur%3D%221s%22%20from%3D%22-90%2024%2024%22%20to%3D%22630%2024%2024%22%20repeatCount%3D%22indefinite%22%3E%3C%2FanimateTransform%3E%3C%2Fcircle%3E%3C%2Fsvg%3E')" : 'none';
        debugBtn.style.backgroundColor = color;
        debugBtn.style.color = text_color;

        var fixedContainer = document.getElementById('tg-fixed-container');
        if (fixedContainer) {
          fixedContainer.style.top = isVisible ? '-48px' : '0';
        }
        document.body.style.marginBottom = (debugBodyBottom + (isVisible ? 48 : 0)) + 'px';
      }
    }

    function setParams(params) {
      var changed = false;
      if (typeof params.text !== 'undefined') {
        var text = params.text.toString().replace(/^\s+|\s+$/g, '');
        if (!text.length) {
          console.error('[Telegram.WebApp] Main button text is required', params.text);
          throw Error('WebAppMainButtonParamInvalid');
        }
        if (text.length > 64) {
          console.error('[Telegram.WebApp] Main button text is too long', text);
          throw Error('WebAppMainButtonParamInvalid');
        }
        if (buttonText !== text) {
          changed = true;
        }
        buttonText = text;
      }
      if (typeof params.color !== 'undefined') {
        if (params.color === false ||
            params.color === null) {
          if (buttonColor !== false) {
            changed = true;
          }
          buttonColor = false;
        } else {
          var color = parseColorToHex(params.color);
          if (!color) {
            console.error('[Telegram.WebApp] Main button color format is invalid', color);
            throw Error('WebAppMainButtonParamInvalid');
          }
          if (buttonColor !== color) {
            changed = true;
          }
          buttonColor = color;
        }
      }
      if (typeof params.text_color !== 'undefined') {
        if (params.text_color === false ||
            params.text_color === null) {
          if (buttonTextColor !== false) {
            changed = true;
          }
          buttonTextColor = false;
        } else {
          var text_color = parseColorToHex(params.text_color);
          if (!text_color) {
            console.error('[Telegram.WebApp] Main button text color format is invalid', text_color);
            throw Error('WebAppMainButtonParamInvalid');
          }
          if (buttonTextColor !== text_color) {
            changed = true;
          }
          buttonTextColor = text_color;
        }
      }
      if (typeof params.is_visible !== 'undefined') {
        if (params.is_visible &&
            !mainButton.text.length) {
          console.error('[Telegram.WebApp] Main button text is required');
          throw Error('WebAppMainButtonParamInvalid');
        }
        if (isVisible !== !!params.is_visible) {
          changed = true;
        }
        isVisible = !!params.is_visible;
      }
      if (typeof params.is_active !== 'undefined') {
        if (isActive !== !!params.is_active) {
          changed = true;
        }
        isActive = !!params.is_active;
      }
      if (changed) {
        updateButton();
      }
      return mainButton;
    }

    mainButton.setParams = setParams;
    mainButton.setText = function(text) {
      mainButton.text = text;
      return mainButton;
    };
    mainButton.onClick = function(callback) {
      onClickCallback = callback;
      return mainButton;
    };
    mainButton.show = function() {
      return mainButton.setParams({is_visible: true});
    };
    mainButton.hide = function() {
      return mainButton.setParams({is_visible: false});
    };
    mainButton.enable = function() {
      return mainButton.setParams({is_active: true});
    };
    mainButton.disable = function() {
      return mainButton.setParams({is_active: false});
    };
    mainButton.showProgress = function(leaveActive) {
      isActive = !!leaveActive;
      isProgressVisible = true;
      updateButton();
      return mainButton;
    };
    mainButton.hideProgress = function() {
      if (!mainButton.isActive) {
        isActive = true;
      }
      isProgressVisible = false;
      updateButton();
      return mainButton;
    }
    return mainButton;
  })();

  function openProtoUrl(url) {
    if (!url.match(/^(web\+)?tgb?:\/\/./)) {
      return false;
    }
    var useIframe = navigator.userAgent.match(/iOS|iPhone OS|iPhone|iPod|iPad/i) ? true : false;
    if (useIframe) {
      var iframeContEl = document.getElementById('tgme_frame_cont') || document.body;
      var iframeEl = document.createElement('iframe');
      iframeContEl.appendChild(iframeEl);
      var pageHidden = false;
      var enableHidden = function () {
        pageHidden = true;
      };
      window.addEventListener('pagehide', enableHidden, false);
      window.addEventListener('blur', enableHidden, false);
      if (iframeEl !== null) {
        iframeEl.src = url;
      }
      setTimeout(function() {
        if (!pageHidden) {
          window.location = url;
        }
        window.removeEventListener('pagehide', enableHidden, false);
        window.removeEventListener('blur', enableHidden, false);
      }, 2000);
    }
    else {
      window.location = url;
    }
    return true;
  }

  if (!window.Telegram) {
    window.Telegram = {};
  }
  window.Telegram.WebView = {
    initParams: initParams,
    onEvent: onEvent,
    offEvent: offEvent,
    receiveEvent: receiveEvent,
  };
  window.Telegram.Games = {
    shareScore: function() {
      postEvent('share_score', function (error) {
        if (error) {
          var shareScoreUrl = initParams.tgShareScoreUrl;
          if (shareScoreUrl) {
            openProtoUrl(shareScoreUrl);
          }
        }
      });
    },
    shareGame: function() {
      postEvent('share_game');
    }
  };
  window.Telegram.Payments = {
    submitPaymentForm: function (formData) {
      if (!formData ||
          !formData.credentials ||
          formData.credentials.type !== 'card' ||
          !formData.credentials.token ||
          !formData.credentials.token.match(/^[A-Za-z0-9\/=_\-]{4,512}$/) ||
          !formData.title) {
        console.error('[Telegram.Payments] Invalid form data submitted', formData);
        throw Error('PaymentFormDataInvalid');
      }
      postEvent('payment_form_submit', false, formData);
    }
  };
  window.Telegram.WebApp = {
    initData: webAppData,
    initDataRaw: webAppDataRaw,
    onEvent: onEvent,
    offEvent: offEvent,
    MainButton: MainButton,
    sendData: function (data) {
      if (!data || !data.length) {
        console.error('[Telegram.WebApp] Data is required', data);
        throw Error('WebAppDataInvalid');
      }
      if (byteLength(data) > 4096) {
        console.error('[Telegram.WebApp] Data is too long', data);
        throw Error('WebAppDataInvalid');
      }
      postEvent('web_app_data_send', false, {data: data});
    },
    expand: function () {
      postEvent('web_app_expand');
    },
    close: function () {
      postEvent('web_app_close');
    }
  };

  if (webAppData.theme_params) {
    setThemeParams(webAppData.theme_params);
  }
  onEvent('theme_changed', onThemeChanged);
  onEvent('viewport_changed', onViewportChanged);

  postEvent('web_app_request_viewport');

  // For Windows Phone app
  window.TelegramGameProxy_receiveEvent = receiveEvent;

  // Backward compatibility
  window.TelegramGameProxy = {
    initParams: initParams,
    onEvent: onEvent,
    receiveEvent: receiveEvent,
    shareScore: window.Telegram.Games.shareScore,
    paymentFormSubmit: window.Telegram.Payments.submitPaymentForm
  };

})();

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
  else if (initParams.tgWebviewData && initParams.tgWebviewData.length) {
    // temp
    webAppDataRaw = initParams.tgWebviewData;
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
  if (webAppData.theme_params) {
    setThemeParams(webAppData.theme_params);
  }
  onEvent('theme_changed', onThemeChanged);

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
      callback();
    }
    else if (window.external && 'notify' in window.external) {
      window.external.notify(JSON.stringify({eventType: eventType, eventData: eventData}));
      callback();
    }
    else if (isIframe) {
      try {
        var trustedTarget = 'https://web.telegram.org';
        // For now we don't restrict target, for testing purposes
        trustedTarget = '*';
        window.parent.postMessage(JSON.stringify({eventType: eventType, eventData: eventData}), trustedTarget);
        callback();
      } catch (e) {
        callback(e);
      }
    }
    else {
      callback({notAvailable: true});
    }
  };

  function receiveEvent(eventType, eventData) {
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

  function setThemeParams(theme_params) {
    var root = document.documentElement, color;
    if (root && root.style && root.style.setProperty) {
      for (var key in theme_params) {
        if ((color = theme_params[key]) &&
            /^#[0-9a-f]{3}|#[0-9a-f]{6}$/i.test(color)) {
          if (key == 'bg_color') {
            root.style.setProperty('--tg-theme-color-scheme', isColorDark(color) ? 'dark' : 'light');
          }
          key = '--tg-theme-' + key.split('_').join('-');
          root.style.setProperty(key, color);
        }
      }
    }
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

    sendData: function (data) {
      if (!data || !data.length) {
        console.error('[Telegram.WebApp] Data is empty', data);
        throw Error('WebAppDataInvalid');
      }
      if (byteLength(data) > 4096) {
        console.error('[Telegram.WebApp] Data is too long', data);
        throw Error('WebAppDataInvalid');
      }
      postEvent('web_app_data_send', false, {data: data});
      postEvent('webview_data_send', false, {data: data});//temp
    },
    close: function () {
      postEvent('web_app_close');
      postEvent('webview_close');//temp
    }
  };

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

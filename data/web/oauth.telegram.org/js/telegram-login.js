(function(window) {
  'use strict';

  if (!window.Telegram) {
    window.Telegram = {};
  }

  var Telegram = window.Telegram;

  function addEvent(el, event, handler) {
    el.addEventListener(event, handler);
  }

  function removeEvent(el, event, handler) {
    el.removeEventListener(event, handler);
  }

  function decodeJwtPayload(token) {
    try {
      var parts = token.split('.');
      if (parts.length !== 3) return null;
      var payload = parts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      var pad = payload.length % 4;
      if (pad) payload += new Array(5 - pad).join('=');
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  function buildResult(data) {
    if (data.error) {
      return { error: data.error };
    }
    var idToken = data.result;
    if (!idToken || typeof idToken !== 'string') {
      return { error: 'missing id_token' };
    }
    var user = decodeJwtPayload(idToken);
    if (!user) {
      return { error: 'malformed id_token' };
    }
    return { id_token: idToken, user: user };
  }

  function getScriptOrigin(default_origin, dev_origin) {
    var link = document.createElement('A'), origin;
    link.href = document.currentScript && document.currentScript.src || default_origin;
    origin = link.origin || link.protocol + '//' + link.hostname;
    if (origin == 'https://telegram.org') {
      origin = default_origin;
    } else if (origin == 'https://telegram-js.azureedge.net' || origin == 'https://tg.dev') {
      origin = dev_origin;
    }
    return origin;
  };

  var OIDC_ORIGIN = getScriptOrigin('https://oauth.telegram.org', 'https://oauth.tg.dev');
  var OIDC_URL = OIDC_ORIGIN + '/auth';
  var INAPP_URL = OIDC_ORIGIN + '/inapp';

  var inAppRequestPending = false;
  async function openPopup(opts, callback) {
    if (!opts || !opts.client_id) {
      throw new Error('client_id is required');
    }

    var redirectUri = location.origin + location.pathname;
    var clientId    = opts.client_id;
    var scopes = ['openid', 'profile'];

    if (opts.request_access) {
      var ra = opts.request_access;
      if (typeof ra === 'string') ra = [ra];
      for (var i = 0; i < ra.length; i++) {
        if (ra[i] === 'phone') {
          scopes.push('phone');
        } else if (ra[i] === 'write') {
          scopes.push('telegram:bot_access');
        }
      }
    }

    var authUrl = OIDC_URL
      + '?response_type=post_message'
      + '&client_id='     + encodeURIComponent(clientId)
      + '&redirect_uri='  + encodeURIComponent(redirectUri)
      + '&scope='         + encodeURIComponent(scopes.join(' '));

    if (opts.nonce) {
      authUrl += '&nonce=' + opts.nonce;
    }

    if (opts.lang) {
      authUrl += '&lang=' + encodeURIComponent(opts.lang);
    }

    var width  = 550;
    var height = 650;
    var left = Math.max(0, (screen.width  - width)  / 2) + (screen.availLeft | 0);
    var top  = Math.max(0, (screen.height - height) / 2) + (screen.availTop  | 0);

    var features = 'width=' + width + ',height=' + height
                 + ',left=' + left  + ',top='    + top
                 + ',status=0,location=0,menubar=0,toolbar=0';

    if (TelegramLogin._messageHandler) {
      removeEvent(window, 'message', TelegramLogin._messageHandler);
      TelegramLogin._messageHandler = null;
    }

    var redirectOrigin = location.origin;
    var authFinished = false;

    var fireCallbacks = function(result) {
      if (authFinished) return;
      authFinished = true;

      TelegramLogin._fireCallbacks = null;

      if (TelegramLogin._messageHandler) {
        removeEvent(window, 'message', TelegramLogin._messageHandler);
        TelegramLogin._messageHandler = null;
      }

      if (TelegramLogin._authCallback) {
        TelegramLogin._authCallback(result);
      }
      if (callback) {
        callback(result);
      }
    };
    TelegramLogin._fireCallbacks = fireCallbacks;

    TelegramLogin._messageHandler = function(event) {
      if (event.origin !== OIDC_ORIGIN) return;
      if (TelegramLogin._popup && event.source !== TelegramLogin._popup) return;

      var data;
      try {
        data = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;
      } catch(e) {
        return;
      }

      if (data && data.event === 'auth_result') {
        fireCallbacks(buildResult(data));
      }
    };

    if (TelegramLogin._inapp) {
      if (inAppRequestPending) return;
      inAppRequestPending = Date.now();

      var query_params = 'scope=' + scopes.join(' ');
      query_params += '&origin=' + encodeURIComponent(location.origin);
      query_params += '&client_id=' + clientId;

      var result = await fetch(INAPP_URL + '?' + query_params);
      result = (await result.json());

      setTimeout(() => {inAppRequestPending = false}, 600);
      sendEvent('oauth_request', {url: result['url']});
      return;
    }

    addEvent(window, 'message', TelegramLogin._messageHandler);

    TelegramLogin._popup = window.open(authUrl, 'telegram_oidc_login', features);

    if (TelegramLogin._popup) {
      TelegramLogin._popup.focus();

      var checkClose = function() {
        if (!TelegramLogin._popup || TelegramLogin._popup.closed) {
          if (!authFinished) {
            fireCallbacks({ error: 'popup_closed' });
          }
          return;
        }
        setTimeout(checkClose, 200);
      };
      checkClose();
    }
  }

  var stylesInjected = false;
  function injectStyles() {
    if (stylesInjected) return;
    stylesInjected = true;
    var css =
      '.tg-auth-button{' +
        'width:fit-content;height:44px;padding:0 28px;' +
        'text-transform:none;background:#119AF5;border-radius:22px;cursor:pointer;' +
        'font-weight:500;font-size:16px;display:flex;align-items:center;' +
        'font-family:"SF Pro",ProductSans,-apple-system,system-ui,sans-serif;' +
        'letter-spacing:-0.32px;-webkit-font-smoothing:antialiased;color:white;' +
        'position:relative;overflow:hidden;user-select:none' +
      '}' +
      '.tg-auth-button:hover{background:#1090E5}' +
      '.tg-auth-button:before{' +
        'content:" ";width:22px;height:22px;margin-right:8px;display:inline-block;vertical-align:top;' +
        'background:no-repeat 0 0;' +
        "background-image:url('data:image/svg+xml,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m1.95617055%2011.392196c5.77764656-2.42328736%209.63031585-4.02086673%2011.55800785-4.79273807%205.5039525-2.20384954%206.6476266-2.5866818%207.3930574-2.59932314.1639507-.00278035.5305319.0363352.7679878.22182361.2005031.15662277.2556695.36819788.2820684.51669348.026399.1484956.0592719.48677234.0331404.75109194-.2982611%203.0169019-1.5888322%2010.33812718-2.2454015%2013.71710898-.2778191%201.4297738-.8288514%201.7357846-1.3584441%201.7826999-1.1509274.1019576-2.0208916-.5588425-3.1356211-1.2622918-1.7443316-1.1007592-2.3854935-1.3972358-4.0786694-2.4713734-1.95675765-1.2413519-.8891962-1.8911034.2259543-3.0061212.2918402-.2918054%205.3989024-4.83750096%205.497052-5.24030969.0122753-.05037796-.1557336-.55407742-.2716182-.65323489-.1158847-.09915747-.2869204-.06524947-.4103446-.03828214-.17495.03822537-2.9615423%201.81132342-8.35977698%205.31929412-.79096496.5228681-1.50739646.7776269-2.1492945.7642766-.70764107-.0147176-2.06885864-.3851791-3.08078398-.7018404-1.24116762-.388398-1.69932554-.5713149-1.61342745-1.2309348.04474105-.3435709.36011227-.7024173.94611366-1.0765391z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');" +
        'background-size:22px;background-position:center;display:inline-block;' +
      '}' +
      '.tg-auth-button[data-style~="square"]{border-radius:5px}' +
      '.tg-auth-button[data-style~="outlined"]{color:black;background:transparent;border:1px solid var(--border_color,rgba(0,0,0,0.06))}' +
      '.tg-auth-button[data-style~="outlined"]:hover{border:1px solid rgba(0,0,0,0.08);background:rgba(116,116,128,0.06)}' +
      '.tg-auth-button[data-style~="outlined"]:before{' +
        'content:" ";height:22px;margin-right:8px;width:22px;display:inline-block;vertical-align:top;' +
        'background-size:12px;background-position:center;background-color:#0993D7;border-radius:34px;' +
      '}' +
      '.tg-auth-button[data-style~="icon"]{width:44px;padding:0;justify-content:center;display:flex;font-size:0}' +
      '.tg-auth-button[data-style~="icon"]::before{margin-right:0 !important}' +
      '.tg-auth-button[data-style~="shine"]::after{' +
        'content:" ";position:absolute;top:-2px;left:-75%;width:70px;max-width:50%;bottom:-2px;' +
        'background:linear-gradient(95deg,rgba(255,255,255,.0) 0%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.0) 100%);' +
        'animation:tg-shine 4s infinite;' +
      '}' +
      '.tg-auth-button[data-style~="outlined"][data-style~="shine"]::after{' +
        'background:linear-gradient(95deg,rgba(255,255,255,.0) 0%,rgba(255,255,255,.6) 50%,rgba(255,255,255,.0) 100%);' +
      '}' +
      '@keyframes tg-shine{0%{left:-75%}100%{left:125%}}' +
      '.tg-ripple-mask{' +
        'position:absolute;left:0;right:0;top:0;bottom:0;' +
        'transform:translateZ(0);overflow:hidden;pointer-events:none;' +
      '}' +
      '.tg-ripple{' +
        'position:absolute;width:200%;left:50%;top:50%;' +
        'margin:-100% 0 0 -100%;padding-top:200%;border-radius:50%;' +
        'background-color:#ffffff1f;' +
        'transition:transform .65s ease-out,opacity .65s ease-out,background-color .65s ease-out;' +
        'opacity:0;' +
      '}'+
      '.tg-auth-button[data-style~="outlined"] .tg-ripple{'+
        'background-color:#0000000f'+
      '}';
    var style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  addEvent(document, 'click', function(event) {
    var el = event.target;
    while (el && el !== document) {
      if (el.classList && el.classList.contains('tg-auth-button')) {
        Telegram.Login.open();
        return;
      }
      el = el.parentNode;
    }
  });

  var TelegramLogin = {
    _options: null,
    _popup: null,
    _authCallback: null,
    _messageHandler: null,
    _fireCallbacks: null,
    _inapp: null,
    _lastCallback: null,

    init: function(options, callback) {
      initButtons();
      if (!options || !options.client_id) {
        throw new Error('options.client_id is required');
      }
      TelegramLogin._options = options;
      TelegramLogin._authCallback = callback || null;
    },

    open: function(callback) {
      if (!TelegramLogin._options) {
        throw new Error('Call Telegram.Login.init() first');
      }
      TelegramLogin._lastCallback = callback;
      openPopup(TelegramLogin._options, callback);
    },

    auth: function(options, callback) {
      if (!options || !options.client_id) {
        throw new Error('options.client_id is required');
      }
      TelegramLogin._lastCallback = callback;
      openPopup(options, callback);
    },

    close: function() {
      if (TelegramLogin._popup && !TelegramLogin._popup.closed) {
        TelegramLogin._popup.close();
      }
      TelegramLogin._popup = null;
      if (TelegramLogin._messageHandler) {
        removeEvent(window, 'message', TelegramLogin._messageHandler);
        TelegramLogin._messageHandler = null;
      }
      TelegramLogin._fireCallbacks = null;
    }
  };

  function redraw(el) {
    void el.offsetHeight;
  }

  function onRippleStart(evt) {
    var btn = this;
    var rippleMask = btn.querySelector('.tg-ripple-mask');
    if (!rippleMask) return;
    var ripple = btn.querySelector('.tg-ripple');
    if (!ripple) return;
    var rect = rippleMask.getBoundingClientRect();
    var clientX, clientY;
    if (evt.type === 'touchstart') {
      clientX = evt.targetTouches[0].clientX;
      clientY = evt.targetTouches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }
    var rippleX = (clientX - rect.left) - rippleMask.offsetWidth / 2;
    var rippleY = (clientY - rect.top) - rippleMask.offsetHeight / 2;
    ripple.style.transition = 'none';
    redraw(ripple);
    ripple.style.transform = 'translate3d(' + rippleX + 'px, ' + rippleY + 'px, 0) scale3d(0.2, 0.2, 1)';
    ripple.style.opacity = 1;
    redraw(ripple);
    ripple.style.transform = 'translate3d(' + rippleX + 'px, ' + rippleY + 'px, 0) scale3d(1, 1, 1)';
    ripple.style.transition = '';

    function onRippleEnd() {
      ripple.style.transitionDuration = '.2s';
      ripple.style.opacity = 0;
      document.removeEventListener('mouseup', onRippleEnd);
      document.removeEventListener('touchend', onRippleEnd);
      document.removeEventListener('touchcancel', onRippleEnd);
    }
    document.addEventListener('mouseup', onRippleEnd);
    document.addEventListener('touchend', onRippleEnd);
    document.addEventListener('touchcancel', onRippleEnd);
  }

  function initButtons() {
    var buttons = document.querySelectorAll('.tg-auth-button');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      btn.setAttribute('role', 'button');
      if (!btn.hasAttribute('tabindex')) {
        btn.setAttribute('tabindex', '0');
      }
      if (!btn.hasAttribute('aria-label')) {
        btn.setAttribute('aria-label', 'Log in with Telegram');
      }
      if (!btn.querySelector('.tg-ripple-mask')) {
        var mask = document.createElement('span');
        mask.className = 'tg-ripple-mask';
        var ripple = document.createElement('span');
        ripple.className = 'tg-ripple';
        mask.appendChild(ripple);
        btn.appendChild(mask);
        addEvent(btn, 'mousedown', onRippleStart);
        addEvent(btn, 'touchstart', onRippleStart);
      }
    }
  }

  async function receiveEvent(eventType, eventData) {
    console.log('[Telegram.WebView] < receiveEvent', eventType);
    if (eventType == 'oauth_supported') {
      TelegramLogin._inapp = true;
    }
    if (eventType == 'oauth_result_confirmed') {
      if (!eventData?.result_url) return;
      var url = new URL(eventData.result_url);
      var token = url.searchParams.get('token');
      if (!token) return;

      var user_data = await fetch(INAPP_URL + '?code=' + token);
      user_data = await user_data.json();

      if (TelegramLogin._fireCallbacks) {

        TelegramLogin._fireCallbacks(buildResult(user_data));
      }
    }
  }

  function sendEvent(eventType, eventData) {
    if (window.TelegramWebviewProxy !== undefined) {
      TelegramWebviewProxy.postEvent(eventType, JSON.stringify(eventData));
    }
  }

  function initProxy() {
    if (!window.TelegramWebviewProxy) {
      TelegramLogin._inapp = false;
      return false;
    }
    window.Telegram.WebView = {receiveEvent};
    window.Telegram.TelegramGameProxy = {receiveEvent};

    sendEvent('oauth_request', {});
  }
  initProxy();

  injectStyles();

  Telegram.Login = {
    init:  TelegramLogin.init,
    open:  TelegramLogin.open,
    auth:  TelegramLogin.auth,
    close: TelegramLogin.close
  };

  var autoInitScript = document.currentScript || null;

  function autoInit() {
    if (!autoInitScript) return;

    var clientId = autoInitScript.getAttribute('data-client-id');
    if (!clientId) return;

    var options = { client_id: clientId };

    var lang = autoInitScript.getAttribute('data-lang');
    if (lang) {
      options.lang = lang;
    }

    var requestAccess = autoInitScript.getAttribute('data-request-access');
    if (requestAccess) {
      options.request_access = requestAccess.trim().split(/\s+/);
    }

    var callback = null;
    var onauth = autoInitScript.getAttribute('data-onauth');
    if (onauth) {
      callback = function(result) {
        try {
          (new Function('data', onauth))(result);
        } catch (e) {
          console.error('[Telegram.Login] data-onauth error:', e);
        }
      };
    }

    Telegram.Login.init(options, callback);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    autoInit();
  } else {
    addEvent(document, 'DOMContentLoaded', function() {
      autoInit();
    });
  }

})(window);

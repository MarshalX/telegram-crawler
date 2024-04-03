// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



/*! npm.im/iphone-inline-video 2.0.2 */

var enableInlineVideo=function(){"use strict";/*! npm.im/intervalometer */
function e(e,i,n,r){function t(n){d=i(t,r),e(n-(a||n)),a=n}var d,a;return{start:function(){d||t(0)},stop:function(){n(d),d=null,a=0}}}function i(i){return e(i,requestAnimationFrame,cancelAnimationFrame)}function n(e,i,n,r){function t(i){Boolean(e[n])===Boolean(r)&&i.stopImmediatePropagation(),delete e[n]}return e.addEventListener(i,t,!1),t}function r(e,i,n,r){function t(){return n[i]}function d(e){n[i]=e}r&&d(e[i]),Object.defineProperty(e,i,{get:t,set:d})}function t(e,i,n){n.addEventListener(i,function(){return e.dispatchEvent(new Event(i))})}function d(e,i){Promise.resolve().then(function(){e.dispatchEvent(new Event(i))})}function a(e){var i=new Audio;return t(e,"play",i),t(e,"playing",i),t(e,"pause",i),i.crossOrigin=e.crossOrigin,i.src=e.src||e.currentSrc||"data:",i}function o(e,i,n){(m||0)+200<Date.now()&&(e[b]=!0,m=Date.now()),n||(e.currentTime=i),w[++T%3]=100*i|0}function u(e){return e.driver.currentTime>=e.video.duration}function s(e){var i=this;i.video.readyState>=i.video.HAVE_FUTURE_DATA?(i.hasAudio||(i.driver.currentTime=i.video.currentTime+e*i.video.playbackRate/1e3,i.video.loop&&u(i)&&(i.driver.currentTime=0)),o(i.video,i.driver.currentTime)):i.video.networkState===i.video.NETWORK_IDLE&&0===i.video.buffered.length&&i.video.load(),i.video.ended&&(delete i.video[b],i.video.pause(!0))}function c(){var e=this,i=e[h];return e.webkitDisplayingFullscreen?void e[g]():("data:"!==i.driver.src&&i.driver.src!==e.src&&(o(e,0,!0),i.driver.src=e.src),void(e.paused&&(i.paused=!1,0===e.buffered.length&&e.load(),i.driver.play(),i.updater.start(),i.hasAudio||(d(e,"play"),i.video.readyState>=i.video.HAVE_ENOUGH_DATA&&d(e,"playing")))))}function v(e){var i=this,n=i[h];n.driver.pause(),n.updater.stop(),i.webkitDisplayingFullscreen&&i[E](),n.paused&&!e||(n.paused=!0,n.hasAudio||d(i,"pause"),i.ended&&(i[b]=!0,d(i,"ended")))}function p(e,n){var r=e[h]={};r.paused=!0,r.hasAudio=n,r.video=e,r.updater=i(s.bind(r)),n?r.driver=a(e):(e.addEventListener("canplay",function(){e.paused||d(e,"playing")}),r.driver={src:e.src||e.currentSrc||"data:",muted:!0,paused:!0,pause:function(){r.driver.paused=!0},play:function(){r.driver.paused=!1,u(r)&&o(e,0)},get ended(){return u(r)}}),e.addEventListener("emptied",function(){var i=!r.driver.src||"data:"===r.driver.src;r.driver.src&&r.driver.src!==e.src&&(o(e,0,!0),r.driver.src=e.src,i?r.driver.play():r.updater.stop())},!1),e.addEventListener("webkitbeginfullscreen",function(){e.paused?n&&0===r.driver.buffered.length&&r.driver.load():(e.pause(),e[g]())}),n&&(e.addEventListener("webkitendfullscreen",function(){r.driver.currentTime=e.currentTime}),e.addEventListener("seeking",function(){w.indexOf(100*e.currentTime|0)<0&&(r.driver.currentTime=e.currentTime)}))}function l(e){var i=e[h];e[g]=e.play,e[E]=e.pause,e.play=c,e.pause=v,r(e,"paused",i.driver),r(e,"muted",i.driver,!0),r(e,"playbackRate",i.driver,!0),r(e,"ended",i.driver),r(e,"loop",i.driver,!0),n(e,"seeking"),n(e,"seeked"),n(e,"timeupdate",b,!1),n(e,"ended",b,!1)}function f(e,i){if(void 0===i&&(i={}),!e[h]){if(!i.everywhere){if(!y)return;if(!(i.iPad||i.ipad?/iPhone|iPod|iPad/:/iPhone|iPod/).test(navigator.userAgent))return}!e.paused&&e.webkitDisplayingFullscreen&&e.pause(),p(e,!e.muted),l(e),e.classList.add("IIV"),e.muted&&e.autoplay&&e.play(),/iPhone|iPod|iPad/.test(navigator.platform)||console.warn("iphone-inline-video is not guaranteed to work in emulated environments")}}var m,y="object"==typeof document&&"object-fit"in document.head.style&&!matchMedia("(-webkit-video-playable-inline)").matches,h="bfred-it:iphone-inline-video",b="bfred-it:iphone-inline-video:event",g="bfred-it:iphone-inline-video:nativeplay",E="bfred-it:iphone-inline-video:nativepause",w=[],T=0;return f}();

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

(!this.CustomEvent || typeof this.CustomEvent === "object") && (function() {
  this.CustomEvent = function CustomEvent(type, eventInitDict) {
    var event;
    eventInitDict = eventInitDict || {bubbles: false, cancelable: false, detail: undefined};

    try {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
    } catch (error) {
      event = document.createEvent('Event');
      event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
      event.detail = eventInitDict.detail;
    }

    return event;
  };
})();

var Keys = {
  BACKSPACE: 8,
  ESC: 27,
  TAB: 9,
  RETURN: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var TWidget = {
  options: {},
  isFocused: false
};
function inFrame() {
  return (window.parent != null && window != window.parent);
}
function inFullFrame() {
  return inFrame() && TWidget.options.auto_height;
}
function isFocused() {
  return inFrame() ? TWidget.isFocused : document.hasFocus();
}

function l(lang_key, params, def_value) {
  if (typeof params === 'string') {
    def_value = params;
    params = {};
  }
  params = params || {};
  var value = l._keys[lang_key] || def_value || lang_key;
  value = value.replace(/\{\{([A-Za-z_\-\d]{1,32}):(.+?)\}\}/g, function(lang_value, token, options) {
    var number = +params[token] || 0;
    var numeric_options = options.split('|');
    var i;
    if (number == 1) i = 0;
    else i = 1;
    if (typeof numeric_options[i] === 'undefined') {
      i = 1;
    }
    var numeric_option = numeric_options[i] || '#';
    return numeric_option.replace(/#/g, number);
  });
  value = value.replace(/\{([A-Za-z_\-\d]{1,32}):(.{1,256}?)\}/g, function(lang_value, token, options) {
    var number = +params[token] || 0;
    var numeric_options = options.split('|');
    var i;
    if (!number) i = 0;
    else if (number == 1) i = 1;
    else i = 2;
    if (typeof numeric_options[i] === 'undefined') {
      i = 0;
    }
    var numeric_option = numeric_options[i] || '#';
    return numeric_option.replace(/#/g, number);
  });
  for (var param in params) {
    value = value.split('{' + param + '}').join(params[param]);
  }
  return value;
}
l._keys = {};
l.add = function(lang_values) {
  for (var lang_key in lang_values) {
    l._keys[lang_key] = lang_values[lang_key];
  }
}

var PostMessage = {
  _callbacks: {},
  _lastId: 0,
  send: function(data, origin, callback) {
    if (typeof origin === 'function') {
      callback = origin; origin = null;
    }
    try {
      if (callback) {
        data._cb = ++PostMessage._lastId;
        PostMessage._callbacks[data._cb] = callback;
      }
      window.parent.postMessage(JSON.stringify(data), origin || '*');
    } catch(e) {
      if (origin) alert('Bot domain invalid');
    }
  },
  onMessage: function(event) {
    if (event.source !== window.parent) return;
    try {
      var data = JSON.parse(event.data);
    } catch(e) {
      var data = {};
    }
    if (data.event == 'visible') {
      if (!frameWasVisible) {
        frameWasVisible = true;
        TWidget.options.onVisible && TWidget.options.onVisible();
      }
      PostMessage.send({event: 'visible_off'});
    }
    else if (data.event == 'focus') {
      TWidget.isFocused = data.has_focus;
      triggerEvent(window, 'tg:focuschange');
    }
    else if (data.event == 'set_options') {
      triggerEvent(window, 'tg:optionschange', {detail: data.options});
    }
    else if (data.event == 'get_info') {
      triggerEvent(window, 'tg:inforequest', {detail: {
        callback: function(value) {
          PostMessage.send({event: 'callback', _cb: data._cb, value: value});
        }
      }});
    }
    else if (data.event == 'visible') {
      if (!frameWasVisible) {
        frameWasVisible = true;
        TWidget.options.onVisible && TWidget.options.onVisible();
      }
      PostMessage.send({event: 'visible_off'});
    }
    else if (data.event == 'callback') {
      if (PostMessage._callbacks[data._cb]) {
        PostMessage._callbacks[data._cb](data.value);
        delete PostMessage._callbacks[data._cb];
      } else {
        console.warn('Callback #' + data._cb + ' not found');
      }
    }
    else {
      triggerEvent(window, 'tg:postmessage', {detail: data});
    }
  }
};

var TPopups = {
  _list: [],
  _lastId: 1000000,
  _inited: false,
  init: function() {
    if (!TPopups._inited) {
      TPopups._inited = true;
      if (window.Popups) {
        TPopups._list = window.Popups; // legacy
      }
      addEvent(document, 'keydown', function(e) {
        if (e.keyCode == Keys.ESC && TPopups._list.length > 0) {
          e.stopImmediatePropagation();
          e.preventDefault();
          TPopups.close();
        }
      });
    }
  },
  open: function(popup_el, options) {
    TPopups.init();
    popup_el = ge1(popup_el);
    if (!popup_el) {
      return popup_el;
    }
    options = options || {};
    var popup_id = popup_el.__puid;
    if (!popup_id) {
      popup_id = ++TPopups._lastId;
      popup_el.__puid = popup_id;
    }
    popup_el.__options = options;
    var index = TPopups._list.indexOf(popup_id);
    if (index >= 0) {
      TPopups._list.splice(index, 1);
    }
    TPopups._list.push(popup_id);
    document.body.style.overflow = 'hidden';
    document.body.appendChild(popup_el);
    removeClass(popup_el, 'hide');
    TPopups.setPosition(popup_el);
    if (document.activeElement) {
      document.activeElement.blur();
    }
    if (ge1('.js-popup_box', popup_el)) {
      addEvent(popup_el, 'click', function(e) {
        if (elInBody(e.target) &&
            !hasClass(e.target, 'js-popup_box') &&
            !gpeByClass(e.target, 'js-popup_box')) {
          TPopups.close(popup_el);
        }
      });
    }
    gec('.js-popup_close', function() {
      addEvent(this, 'click', function() {
        TPopups.close(popup_el);
      });
    }, popup_el);
    triggerEvent(popup_el, 'tg:popupopen');
    return popup_el;
  },
  close: function(popup_el) {
    if (!TPopups._list.length) return false;
    var popup_id;
    if (popup_el) {
      popup_id = popup_el.__puid;
    } else {
      popup_id = TPopups._list.pop();
      gec('.js-popup_container', function() {
        if (popup_id == this.__puid) {
          popup_el = this;
          return false;
        }
      });
    }
    if (!popup_el) {
      return false;
    }
    var options = popup_el.__options;
    var index = TPopups._list.indexOf(popup_id);
    if (index >= 0) {
      TPopups._list.splice(index, 1);
    }
    if (!TPopups._list.length) {
      document.body.style.overflow = '';
    }
    removeEvent(popup_el, 'click');
    gec('.js-popup_close', function() {
      removeEvent(this, 'click');
    }, popup_el);
    addClass(popup_el, 'hide');
    triggerEvent(popup_el, 'tg:popupclose');
  },
  closeAll: function() {
    while (TPopups._list.length) {
      TPopups.close();
    }
  },
  setPosition: function(popul_el) {
    var popup_box = ge1('.js-popup_box', popul_el);
    if (!popup_box) return;
    getCoords(function(coords) {
      var style      = window.getComputedStyle(popul_el);
      var contTop    = parseInt(style.paddingTop);
      var contBottom = parseInt(style.paddingBottom);
      var marginMax  = popul_el.offsetHeight - contTop - contBottom - coords.elHeight;
      var frameTop   = coords.frameTop || 0;
      var deltaY     = (coords.clientHeight - coords.elHeight) / 2;
      var marginTop  = deltaY - contTop - frameTop;
      marginTop = Math.max(0, Math.min(marginMax, marginTop));
      popup_box.style.marginTop = marginTop + 'px';
    }, popup_box);
  },
  show: function(html, buttons, options) {
    options = options || {};
    var popup_el = newEl('div', 'tgme_popup_container js-popup_container tgme_popup_alert hide', '<div class="tgme_popup js-popup_box"><div class="tgme_popup_body"><div class="tgme_popup_text js-popup_text"></div><div class="tgme_popup_buttons js-popup_buttons"></div></div></div>');
    var text_el = ge1('.js-popup_text', popup_el);
    var buttons_el = ge1('.js-popup_buttons', popup_el);
    setHtml(text_el, html);
    var enterBtn = null, onEnterPress = null;
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var button_el = newEl('div', 'tgme_popup_button' + (btn.close ? ' js-popup_close' : ''), btn.label);
      btn.el = button_el;
      buttons_el.appendChild(button_el);
      if (btn.enter) {
        enterBtn = button_el;
      }
      if (btn.onPress) {
        addEvent(button_el, 'click', btn.onPress);
      }
    }
    if (enterBtn) {
      onEnterPress = function(e) {
        if (e.keyCode == Keys.RETURN) {
          e.stopImmediatePropagation();
          e.preventDefault();
          triggerEvent(enterBtn, 'click');
        }
      };
      addEvent(document, 'keydown', onEnterPress);
    }
    var onPopupClose = function(e) {
      if (enterBtn && onEnterPress) {
        removeEvent(document, 'keydown', onEnterPress);
      }
      for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        if (btn.onPress) {
          removeEvent(btn.el, 'click', btn.onPress);
        }
      }
      removeEvent(popup_el, 'tg:popupclose', onPopupClose);
      removeEl(popup_el);
    };
    addEvent(popup_el, 'tg:popupclose', onPopupClose);
    return TPopups.open(popup_el);
  }
};

function showAlert(html, onClose) {
  return TPopups.show(html, [{
    label: l('WEB_CLOSE', 'Close'),
    enter: true,
    close: true
  }]);
}

function showConfirm(html, onConfirm, confirm_btn, onCancel, cancel_btn) {
  var popup_el = TPopups.show(html, [{
    label: cancel_btn || l('WEB_CANCEL', 'Cancel'),
    onPress: function() {
      onCancel && onCancel(popup_el);
    },
    close: true
  }, {
    label: confirm_btn || l('WEB_OK', 'OK'),
    onPress: function() {
      onConfirm && onConfirm(popup_el);
      TPopups.close(popup_el);
    },
    enter: true
  }]);
  return popup_el;
}

function addEvent(el, event, handler) {
  gec(el, function() {
    var events = event.split(/\s+/);
    for (var i = 0; i < events.length; i++) {
      if (this.addEventListener) {
        this.addEventListener(events[i], handler, false);
      } else {
        this.attachEvent('on' + events[i], handler);
      }
    }
  });
}
function removeEvent(el, event, handler) {
  gec(el, function() {
    var events = event.split(/\s+/);
    for (var i = 0; i < events.length; i++) {
      if (this.removeEventListener) {
        this.removeEventListener(events[i], handler);
      } else {
        this.detachEvent('on' + events[i], handler);
      }
    }
  });
}
function addEventOnce(el, event, handler) {
  var once_handler = function(e) {
    removeEvent(el, event, once_handler);
    handler(e);
  };
  addEvent(el, event, once_handler);
}
function triggerEvent(el, event_type, init_dict) {
  gec(el, function() {
    var event = new CustomEvent(event_type, init_dict);
    this.dispatchEvent(event);
  });
}

function geById(el_or_id) {
  if (typeof el_or_id == 'string' || el_or_id instanceof String) {
    return document.getElementById(el_or_id);
  } else if (el_or_id instanceof HTMLElement) {
    return el_or_id;
  }
  return null;
}

function gec(el, callback, context) {
  var list = ge(el, context);
  for (var i = 0, l = list.length; i < l; i++) {
    var result = callback.call(list[i], list[i], i, list);
    if (result === false) {
      break;
    }
  }
}
function ge(el, context) {
  var list = [];
  if (typeof el === 'string') {
    list = (ge1(context) || document).querySelectorAll(el);
  } else if (el instanceof Node || el instanceof Window) {
    list = [el];
  } else if (el instanceof NodeList) {
    list = el;
  } else if (Array.isArray(el)) {
    list = el;
  } else if (el) {
    console.warn('unknown type of el', el);
    return [el];
  }
  if (list instanceof NodeList) {
    list = Array.prototype.slice.call(list);
  }
  return list;
}
function ge1(el, context) {
  if (typeof el === 'string') {
    return (ge1(context) || document).querySelector(el);
  } else if (el instanceof Node || el instanceof Window) {
    return el;
  } else if (el instanceof NodeList) {
    return el.item(0);
  } else if (el instanceof Array) {
    return el[0];
  } else if (el) {
    console.warn('unknown type of el', el);
    return el;
  }
  return null;
}
function newEl(tag, cl, html, styles) {
  var el = document.createElement((tag || 'DIV').toUpperCase());
  if (cl) el.className = cl;
  if (styles) {
    for (var k in styles) {
      el.style[k] = styles[k];
    }
  }
  if (html) {
    el.innerHTML = html;
  }
  return el;
}
function gpeByClass(el, cl) {
  if (!el) return null;
  while (el = el.parentNode) {
    if (hasClass(el, cl)) break;
  }
  return el || null;
}
function elInBody(el) {
  if (!el) return false;
  while (el = el.parentNode) {
    if (el === document.body) return true;
  }
  return false;
}

function getCoords(callback, el) {
  var rect = {};
  if (el = ge1(el)) {
    rect = el.getBoundingClientRect();
  }
  var docEl = document.documentElement;
  var coords = {};
  if (inFullFrame()) {
    PostMessage.send({event: 'get_coords'}, function(coords) {
      coords.inFrame = true;
      if (el) {
        coords.elTop = rect.top + coords.frameTop;
        coords.elBottom = rect.bottom + coords.frameTop;
        coords.elLeft = rect.left + coords.frameLeft;
        coords.elRight = rect.right + coords.frameLeft;
        coords.elWidth = rect.width;
        coords.elHeight = rect.height;
      }
      callback && callback(coords);
    });
    return;
  } else {
    if (el) {
      coords.elTop = rect.top;
      coords.elBottom = rect.bottom;
      coords.elLeft = rect.left;
      coords.elRight = rect.right;
      coords.elWidth = rect.width;
      coords.elHeight = rect.height;
    }
    coords.scrollTop = window.pageYOffset;
    coords.scrollLeft = window.pageXOffset;
    coords.clientWidth = docEl.clientWidth;
    coords.clientHeight = docEl.clientHeight;
    callback && callback(coords);
  }
}
function scrollToY(y) {
  if (inFullFrame()) {
    PostMessage.send({event: 'scroll_to', y: y});
  } else {
    window.scrollTo(0, y);
  }
}

function addClass(el, cl) {
  gec(el, function() {
    var cls = cl.split(/\s+/);
    for (var i = 0; i < cls.length; i++) {
      this.classList.add(cls[i]);
    }
  });
}
function removeClass(el, cl) {
  gec(el, function() {
    var cls = cl.split(/\s+/);
    for (var i = 0; i < cls.length; i++) {
      this.classList.remove(cls[i]);
    }
  });
}
function toggleClass(el, cl, add) {
  gec(el, function() {
    var cls = cl.split(/\s+/);
    for (var i = 0; i < cls.length; i++) {
      cl = cls[i];
      var add_cl = (typeof add !== 'undefined') ? add : !hasClass(this, cl);
      add_cl ? this.classList.add(cl) : this.classList.remove(cl);
    }
  });
}
function hasClass(el, cl) {
  var item = ge1(el);
  return (item && item.classList && item.classList.contains(cl));
}
function removeEl(el) {
  gec(el, function() {
    if (this && this.parentNode) {
      this.parentNode.removeChild(this);
    }
  });
}
function getHtml(el, context) {
  var item = ge1(el, context);
  return item ? item.innerHTML : null;
}
function setHtml(el, html) {
  gec(el, function() {
    if (this) {
      this.innerHTML = html;
    }
  });
}
function getAttr(el, attr) {
  var item = ge1(el);
  return item ? item.getAttribute(attr) : null;
}
function setAttr(el, attr, value) {
  gec(el, function() {
    if (this) {
      this.setAttribute(attr, value);
    }
  });
}

function isLSEnabled() {
  try {
    return window.localStorage ? true : false;
  } catch (e) {
    return false;
  }
}
function parseHeaders(headers) {
  var headers_strs = headers.replace(/^\s+|\s+$/g, '').split(/[\r\n]+/);
  var headers_arr = [];
  for (var i = 0; i < headers_strs.length; i++) {
    var header_str = headers_strs[i];
    var parts = header_str.split(': ');
    var name = parts.shift().toLowerCase();
    var value = parts.join(': ');
    headers_arr.push({name: name, value: value});
  }
  return headers_arr;
}
function setLS(xhr) {
  if (!isLSEnabled()) return;
  try {
    var headers = parseHeaders(xhr.getAllResponseHeaders());
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header.name == 'x-set-local-storage') {
        var arr = header.value.split('=');
        var key = decodeURIComponent(arr[0]);
        var val = decodeURIComponent(arr[1]);
        if (val.length) {
          localStorage.setItem(key, val);
        } else {
          localStorage.removeItem(key);
        }
      }
    }
  } catch (e) {}
}
function getLSString() {
  if (!isLSEnabled()) return false;
  var arr = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(localStorage[key]));
  }
  return arr.join('; ');
}

function getXHR() {
  if (navigator.appName == "Microsoft Internet Explorer"){
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    return new XMLHttpRequest();
  }
}

function xhrRequest(href, postdata, onCallback, retry_delay) {
  var xhr = getXHR(), type = 'GET', data = null, ls_header;
  if (postdata !== false) {
    type = 'POST';
    var data_arr = [];
    for (var field in postdata) {
      data_arr.push(encodeURIComponent(field) + '=' + encodeURIComponent(postdata[field]));
    }
    data = data_arr.join('&');
  }
  xhr.open(type, href);
  if (postdata !== false) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  if (ls_header = getLSString()) {
    xhr.setRequestHeader('X-Local-Storage', ls_header);
  }
  xhr.onerror = function() {
    if (xhr._retried) return;
    xhr._retried = true;
    retry_delay = retry_delay || 1000;
    if (retry_delay > 60000) {
      onCallback && onCallback('Server unavailable');
      return;
    }
    setTimeout(function() {
      xhrRequest(href, postdata, onCallback, retry_delay * 2);
    }, retry_delay);
  };
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      setLS(xhr);
      if (typeof xhr.responseBody == 'undefined' && xhr.responseText) {
        try {
          var result = JSON.parse(xhr.responseText);
        } catch(e) {
          var result = {};
        }
        if (xhr.status == 401) { // Unauthorized
          TWidgetAuth.reload();
          return;
        }
        if (result.error && result.flood_wait) {
          console.log('flood_wait', result.flood_wait);
          setTimeout(function() {
            xhrRequest(href, postdata, onCallback);
          }, result.flood_wait * 1000);
          return;
        }
        onCallback && onCallback(null, result);
      } else {
        xhr.onerror();
      }
    }
  };
  xhr.withCredentials = true;
  xhr.send(data);
  return xhr;
}

function xhrJsonRequest(href, onCallback) {
  var xhr = getXHR();
  xhr.open('get', href);
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
  } else {
    xhr.setRequestHeader('Accept-Charset', 'x-user-defined');
  }
  xhr.onerror = function() {
    onCallback({error: 'XHR_ERROR'});
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var result;
      if (typeof xhr.responseBody == 'undefined' &&
          xhr.responseText && xhr.status == 200) {
        try {
          result = JSON.parse(xhr.responseText);
        } catch(e) {
          result = {error: 'JSON_PARSE_FAILED'};
        }
      } else {
        result = {error: 'HTTP_ERROR_' + xhr.status};
      }
      onCallback(result);
    }
  };
  xhr.send(null);
  return xhr;
}

function xhrUploadRequest(href, params, onCallback, onProgress) {
  var xhr = getXHR(), data = new FormData(), ls_header;
  xhr.open('POST', href, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  if (ls_header = getLSString()) {
    xhr.setRequestHeader('X-Local-Storage', ls_header);
  }
  xhr.upload.addEventListener('progress', function(event) {
    if (event.lengthComputable) {
      onProgress && onProgress(event.loaded, event.total);
    }
  });
  xhr.onerror = function() {
    onCallback && onCallback('Server unavailable');
  };
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      setLS(xhr);
      if (typeof xhr.responseBody == 'undefined' && xhr.responseText) {
        try {
          var result = JSON.parse(xhr.responseText);
        } catch(e) {
          var result = {};
        }
        if (result.error && result.flood_wait) {
          console.log('flood_wait', result.flood_wait);
          setTimeout(function() {
            xhrUploadRequest(href, params, onCallback, onProgress);
          }, result.flood_wait * 1000);
          return;
        }
        onCallback && onCallback(null, result);
      } else {
        xhr.onerror();
      }
    }
  };
  for (var k in params) {
    var value = params[k];
    if (value instanceof File) {
      data.append(k, value, value.name);
    } else {
      data.append(k, value);
    }
  }
  xhr.withCredentials = true;
  xhr.send(data);
  return xhr;
}

window.TWidgetAuth = {
  init: function(options) {
    options = options || {};
    TWidgetAuth.options = options;
  },
  apiRequest: function(method, params, callback) {
    var options = TWidgetAuth.options || {};
    if (!options.api_url) {
      console.warn('API url not found');
      return null;
    }
    params.method = method;
    return xhrRequest(options.api_url, params, callback);
  },
  uploadRequest: function(params, onCallback, onProgress) {
    var options = TWidgetAuth.options || {};
    if (!options.upload_url) {
      console.warn('Upload url not found');
      return null;
    }
    return xhrUploadRequest(options.upload_url, params, onCallback, onProgress);
  },
  logIn: function() {
    var options = TWidgetAuth.options || {};
    if (!options.bot_id) {
      console.warn('Bot id not found');
      return;
    }
    if (TWidgetAuth.isLoggedIn()) {
      return;
    }
    Telegram.Login.auth({bot_id: options.bot_id, lang: 'en'}, function(user) {
      if (user) {
        xhrRequest('/auth', user, function(err, result) {
          if (result.ok) {
            TWidgetAuth.reload(result.host);
          } else {
            location.reload();
          }
        });
      }
    });
  },
  reload: function(host, callback) {
    var xhr = getXHR(), data = null, ls_header;
    var url = location.href;
    if (host) {
      var a = newEl('a');
      a.href = url; a.hostname = host; url = a.href;
    }
    xhr.open('GET', url);
    xhr.setRequestHeader('X-Requested-With', 'relogin');
    if (ls_header = getLSString()) {
      xhr.setRequestHeader('X-Local-Storage', ls_header);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        setLS(xhr);
        if (typeof xhr.responseBody == 'undefined' && xhr.responseText) {
          document.open();
          document.write(xhr.responseText);
          document.close();
          callback && callback();
        } else {
          location.reload();
        }
      }
    };
    xhr.onerror = function() {
      location.reload();
    };
    xhr.withCredentials = true;
    xhr.send();
  },
  isLoggedIn: function() {
    var options = TWidgetAuth.options || {};
    return options && !options.unauth;
  }
};
window.apiRequest = TWidgetAuth.apiRequest;
window.uploadRequest = TWidgetAuth.uploadRequest;

function loadImage(file, callback) {
  var image = new Image();
  image.onload = function() {
    var w = image.naturalWidth;
    var h = image.naturalHeight;
    callback && callback(null, {
      url:    image.src,
      width:  w,
      height: h,
      image:  image
    });
  };
  image.onerror = function() {
    callback && callback('LOAD_FAILED');
  };
  image.src = URL.createObjectURL(file);
}

function initWidgetFrame(options) {
  TWidget.options = options || {};
  if (window.devicePixelRatio >= 2) {
    addClass(document.body, 'r2x');
  }
  if (TWidget.options.auto_height ||
      TWidget.options.auto_width) {
    addEvent(window, 'resize', checkFrameSize);
    checkFrameSize();
  }
  addEvent(window, 'message', PostMessage.onMessage);
  addEvent(window, 'focus blur', function() {
    triggerEvent(window, 'tg:focuschange');
  });
  PostMessage.send({event: 'ready'});
}

var frameLastHeight = null,
    frameLastWidth = null,
    frameWasVisible = false;
function checkFrameSize() {
  var height, width, style;
  if (document.body) {
    if (TWidget.options.include_absolute_elems) {
      if (document.body.querySelectorAll) {
        document.body.querySelectorAll('*').forEach(function(el) {
            var rect = el.getBoundingClientRect();
            if (!width || width < rect.right) width = rect.right;
            if (!height || height < rect.bottom) height = rect.bottom;
        });
      }
    } else {
      if (window.getComputedStyle) {
        style = window.getComputedStyle(document.body);
        height = style.height;
        if (height.substr(-2) == 'px') {
          height = height.slice(0, -2);
        }
        width = style.width;
        if (width.substr(-2) == 'px') {
          width = width.slice(0, -2);
        }
      } else {
        height = document.body.offsetHeight;
        width = document.body.offsetWidth;
      }
    }
    var data = {event: 'resize'}, resized = false;
    if (TWidget.options.auto_height) {
      height = Math.ceil(height);
      if (height != frameLastHeight) {
        frameLastHeight = height;
        data.height = height;
        resized = true;
      }
    }
    if (TWidget.options.auto_width) {
      width = Math.ceil(width);
      if (width != frameLastWidth) {
        frameLastWidth = width;
        data.width = width;
        resized = true;
      }
    }
    if (resized) {
      PostMessage.send(data);
    }
  }
  requestAnimationFrame(checkFrameSize);
}


(function() {
  var ua = navigator.userAgent.toLowerCase();
  var browser = {
    opera: (/opera/i.test(ua) || /opr/i.test(ua)),
    msie: (/msie/i.test(ua) && !/opera/i.test(ua) || /trident\//i.test(ua)) || /edge/i.test(ua),
    msie_edge: (/edge/i.test(ua) && !/opera/i.test(ua)),
    mozilla: /firefox/i.test(ua),
    chrome: /chrome/i.test(ua) && !/edge/i.test(ua),
    safari: (!(/chrome/i.test(ua)) && /webkit|safari|khtml/i.test(ua)),
    iphone: /iphone/i.test(ua),
    ipod: /ipod/i.test(ua),
    ipad: /ipad/i.test(ua),
    android: /android/i.test(ua),
    mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(ua),
    safari_mobile: /iphone|ipod|ipad/i.test(ua),
    opera_mobile: /opera mini|opera mobi/i.test(ua),
    opera_mini: /opera mini/i.test(ua),
    mac: /mac/i.test(ua),
  };
  var TBaseUrl = window.TBaseUrl || '//telegram.org/';

  function formatDateTime(datetime) {
    var date = new Date(datetime);
    var cur_date = new Date();
    if (cur_date.getFullYear() == date.getFullYear() &&
        cur_date.getMonth() == date.getMonth() &&
        cur_date.getDate() == date.getDate()) {
      return formatTime(datetime);
    }
    return formatDate(datetime);
  }

  function formatDate(datetime) {
    var date = new Date(datetime);
    var cur_date = new Date();
    var j = date.getDate();
    var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    var Y = date.getFullYear();
    if (cur_date.getFullYear() == date.getFullYear()) {
      return M + ' ' + j;
    }
    return M + ' ' + j + ', ' + Y;
  }

  function formatTime(datetime) {
    var date = new Date(datetime);
    var H = date.getHours();
    if (H < 10) H = '0' + H;
    var i = date.getMinutes();
    if (i < 10) i = '0' + i;
    return H + ':' + i;
  }

  function formatDuration(duration) {
    duration = Math.floor(duration);
    duration = Math.max(0, duration);
    var duration_str = '';
    if (duration >= 3600) {
      var hours = Math.floor(duration / 3600);
      duration_str += hours + ':';
      var minutes = Math.floor((duration % 3600) / 60);
      if (minutes < 10) minutes = '0' + minutes;
    } else {
      var minutes = Math.floor(duration / 60);
    }
    duration_str += minutes + ':';
    var seconds = duration % 60;
    if (seconds < 10) seconds = '0' + seconds;
    duration_str += seconds;
    return duration_str;
  }

  function doesSupportEmoji() {
    var context, smile, canvas = document.createElement('canvas');
    if (!canvas.getContext) return false;
    context = canvas.getContext('2d');
    if (typeof context.fillText != 'function') return false;
    smile = '#' + String.fromCharCode(65039) + String.fromCharCode(8419);
    context.textBaseline = 'top';
    context.font = '32px Arial';
    context.fillText(smile, 0, 0);
    if (context.getImageData(16, 16, 1, 1).data[0] === 0) return false;
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.overflow = 'hidden';
    div.style.top = '-1000px';
    var span = document.createElement('span');
    div.style.fontSize = '16px';
    span.innerHTML = smile;
    div.appendChild(span);
    document.body.insertBefore(div, document.body.firstChild);
    var width = span.offsetWidth;
    document.body.removeChild(div);
    if (width < 18) return false;
    return true;
  }

  function cloneArr(arrLike) {
    return Array.prototype.slice.apply(arrLike);
  }

  var loadedLibs = {};
  function loadLib(file, callback) {
    if (!loadedLibs[file]) {
      loadedLibs[file] = {
        loaded: null,
        callbacks: [callback]
      };
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = file;
      script.onerror = function() {
        loadedLibs[file].loaded = false;
        applyCallbacks(loadedLibs[file].callbacks, loadedLibs[file].loaded);
      }
      script.onload = function() {
        loadedLibs[file].loaded = true;
        applyCallbacks(loadedLibs[file].callbacks, loadedLibs[file].loaded);
      }
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
      return script;
    } else if (loadedLibs[file].loaded === null) {
      loadedLibs[file].callbacks.push(callback);
    } else {
      callback(loadedLibs[file].loaded);
    }
  };

  var webpNativeSupport = null, webpFallbackSupport = null, webpImage = null, webpCallbacks = [];
  function applyCallbacks(callbacks) {
    var args = cloneArr(arguments); args.shift();
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i].apply(null, args);
    }
  }
  function doesSupportWebp(callback) {
    if (webpFallbackSupport !== null) {
      callback(webpNativeSupport, webpFallbackSupport);
    } else {
      webpCallbacks.push(callback);
      if (!webpImage) {
        webpImage = new Image();
        webpImage.onerror = webpImage.onload = function() {
          if (this.width === 2 && this.height === 1) {
            webpNativeSupport = true;
            webpFallbackSupport = false;
            applyCallbacks(webpCallbacks, webpNativeSupport, webpFallbackSupport);
          } else {
            webpNativeSupport = false;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = TBaseUrl + 'js/libwebp-0.2.0.js';
            script.onerror = function() {
              webpFallbackSupport = false;
              applyCallbacks(webpCallbacks, webpNativeSupport, webpFallbackSupport);
            }
            script.onload = function() {
              webpFallbackSupport = true;
              applyCallbacks(webpCallbacks, webpNativeSupport, webpFallbackSupport);
            }
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
          }
        }
        webpImage.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
      }
    }
  }

  function getPngDataUrlFromWebp(data) {
    var decoder = new WebPDecoder();
    var config = decoder.WebPDecoderConfig;
    var buffer = config.j || config.output;
    var bitstream = config.input;
    if (!decoder.WebPInitDecoderConfig(config)) {
      throw new Error('[webpjs] Library version mismatch!');
    }
    var StatusCode = decoder.VP8StatusCode;
    status = decoder.WebPGetFeatures(data, data.length, bitstream);
    if (status != (StatusCode.VP8_STATUS_OK || 0)) {
      throw new Error('[webpjs] status error');
    }
    var mode = decoder.WEBP_CSP_MODE;
    buffer.colorspace = mode.MODE_RGBA;
    buffer.J = 4;
    try {
      status = decoder.WebPDecode(data, data.length, config);
    } catch (e) {
      status = e
    }
    var ok = (status == 0);
    if (!ok) {
      throw new Error('[webpjs] decoding failed');
    }
    var bitmap = buffer.c.RGBA.ma;
    if (!bitmap) {
      throw new Error('[webpjs] bitmap error');
    }
    var biHeight = buffer.height;
    var biWidth = buffer.width;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.height = biHeight;
    canvas.width = biWidth;
    var output = context.createImageData(canvas.width, canvas.height);
    var outputData = output.data;
    for (var h = 0; h < biHeight; h++) {
      for (var w = 0; w < biWidth; w++) {
        outputData[0 + w * 4 + (biWidth * 4) * h] = bitmap[1 + w * 4 + (biWidth * 4) * h];
        outputData[1 + w * 4 + (biWidth * 4) * h] = bitmap[2 + w * 4 + (biWidth * 4) * h];
        outputData[2 + w * 4 + (biWidth * 4) * h] = bitmap[3 + w * 4 + (biWidth * 4) * h];
        outputData[3 + w * 4 + (biWidth * 4) * h] = bitmap[0 + w * 4 + (biWidth * 4) * h];
      }
    }
    context.putImageData(output, 0, 0);
    return canvas.toDataURL('image/png');
  }

  function proccessWebpImage(imgEl, failed_callback, success_callback) {
    var imgEl = geById(imgEl);
    if (!imgEl || imgEl.__inited) return;
    imgEl.__inited = true;
    failed_callback = failed_callback || function(){};
    success_callback = success_callback || function(){};
    doesSupportWebp(function(nativeSupport, fallbackSupport) {
      var isImage, src;
      var webpSrc = imgEl.getAttribute('data-webp');
      if (imgEl.tagName && imgEl.tagName.toUpperCase() == 'IMG' && imgEl.src) {
        isImage = true;
        src = imgEl.src;
      } else {
        isImage = false;
        var bgImage;
        if (window.getComputedStyle) {
          bgImage = window.getComputedStyle(imgEl).backgroundImage;
        } else {
          bgImage = imgEl.style && imgEl.style.backgroundImage;
        }
        src = bgImage.slice(4, -1).replace(/["|']/g, '');
      }
      var setImgSrc = function(src) {
        if (isImage) {
          imgEl.src = src;
        } else {
          imgEl.style.backgroundImage = "url('" + src + "')";
        }
        addClass(imgEl, 'webp_sticker_done');
      };
      if (nativeSupport) {
        if (webpSrc) {
          var img = new Image();
          img.onload = function() {
            setImgSrc(webpSrc);
            success_callback();
          }
          img.onerror = function() {
            failed_callback();
          }
          img.src = webpSrc;
        } else {
          success_callback();
        }
        return;
      } else if (!fallbackSupport) {
        failed_callback();
        return;
      }
      if (hasClass(imgEl, 'webp_sticker_done')) {
        success_callback();
        return;
      }
      if (!src) {
        failed_callback();
        return;
      }
      if (webpSrc) {
        src = webpSrc;
      }
      var xhr = getXHR();
      xhr.open('get', src);
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
      } else {
        xhr.setRequestHeader('Accept-Charset', 'x-user-defined');
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (typeof xhr.responseBody == 'undefined' && xhr.responseText) {
            var rlen = xhr.responseText.length, uarr = new Uint8Array(rlen);
            for (var i = 0; i < rlen; i++) {
              uarr[i] = xhr.responseText.charCodeAt(i);
            }
            try {
              var src = getPngDataUrlFromWebp(uarr);
              if (isImage) {
                imgEl.src = src;
              } else {
                imgEl.style.backgroundImage = "url('" + src + "')";
              }
              addClass(imgEl, 'webp_sticker_done');
              success_callback();
            } catch(e) {
              failed_callback();
            }
          } else {
            failed_callback();
          }
        }
      };
      xhr.send(null);
    });
  }

  function proccessWebmImage(imageEl, failed_callback, success_callback) {
    imageEl = geById(imageEl);
    if (!imageEl || imageEl.__inited) return;
    imageEl.__inited = true;
    failed_callback = failed_callback || function(){};
    success_callback = success_callback || function(){};
    var videoEl = ge1('video', imageEl);
    var imgEl = ge1('img', videoEl);
    if (!videoEl) return;
    var fallback = function() {
      videoEl.parentNode.removeChild(videoEl);
      imageEl.style.backgroundImage = 'none';
      if (imgEl && imgEl.src) {
        var img = new Image();
        img.onload = function() {
          imageEl.style.backgroundImage = "url('" + img.src + "')";
        }
        img.src = imgEl.src;
      }
      failed_callback();
    };
    if (browser.safari) {
      fallback();
      return;
    }
    enableInlineVideo(videoEl);
    checkVideo(videoEl, fallback);
    function videoStarted() {
      removeEvent(videoEl, 'timeupdate', videoStarted);
      imageEl.style.backgroundImage = 'none';
      addClass(imgEl, 'webm_sticker_done');
      success_callback();
    }
    addEvent(videoEl, 'timeupdate', videoStarted);
  }

  function proccessEmoji(emojiEl, failed_callback, success_callback) {
    emojiEl = geById(emojiEl);
    if (!emojiEl || emojiEl.__inited) return;
    emojiEl.__inited = true;
    failed_callback = failed_callback || function(){};
    success_callback = success_callback || function(){};

    var emoji_id = emojiEl.getAttribute('emoji-id');
    if (!emoji_id) {
      failed_callback();
      return;
    }
    xhrJsonRequest('/i/emoji/' + emoji_id + '.json', function(emoji) {
      if (emoji.error) {
        failed_callback();
        return;
      }
      var emoji_html = '', thumb_url = '', thumb_mime = '';
      if (emoji.path) {
        var size = emoji.size || (emoji.type == 'tgs' ? 512 : 100);
        var thumb_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + size + ' ' + size + '"><defs><linearGradient id="g" x1="-300%" x2="-200%" y1="0" y2="0"><stop offset="-10%" stop-opacity=".1"/><stop offset="30%" stop-opacity=".07"/><stop offset="70%" stop-opacity=".07"/><stop offset="110%" stop-opacity=".1"/><animate attributeName="x1" from="-300%" to="1200%" dur="3s" repeatCount="indefinite"/><animate attributeName="x2" from="-200%" to="1300%" dur="3s" repeatCount="indefinite"/></linearGradient></defs><path fill="url(#g)" d="' + emoji.path + '"/></svg>';
        thumb_url = 'data:image/svg+xml,' + encodeURIComponent(thumb_svg);
      }
      if (emoji.type == 'tgs') {
        if (!thumb_url) {
          thumb_url = emoji.thumb;
          thumb_mime = 'image/webp';
        } else {
          thumb_mime = 'image/svg+xml';
        }
        emoji_html = '<picture class="tg-emoji tg-emoji-tgs"><source type="application/x-tgsticker" srcset="' + emoji.emoji + '"><source type="' + thumb_mime + '" srcset="' + thumb_url + '"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></picture>';
      } else if (emoji.type == 'webm') {
        var wrap_attr = thumb_url ? ' style="background-image:url(\'' + thumb_url + '\');"' : '';
        emoji_html = '<div class="tg-emoji tg-emoji-webm"' + wrap_attr + '><video src="' + emoji.emoji + '" width="100%" height="100%" preload muted autoplay loop playsinline disablepictureinpicture><img src="' + emoji.thumb + '"></video></div>';
      } else if (emoji.type == 'webp') {
        var wrap_attr = thumb_url ? ' style="background-image:url(\'' + thumb_url + '\');" data-webp="' + emoji.emoji + '"' : ' style="background-image:url(\'' + emoji.emoji + '\');"';
        emoji_html = '<i class="tg-emoji tg-emoji-webp"' + wrap_attr + '></i>';
      }
      if (emoji_html) {
        var emojiWrapEl = newEl('span', 'tg-emoji-wrap', emoji_html);
        emojiEl.insertBefore(emojiWrapEl, emojiEl.firstChild);
        if (emoji.type == 'tgs') {
          gec('.tg-emoji-tgs', function() {
            if (!RLottie.isSupported) {
              failed_callback();
            } else {
              addEventOnce(this, 'tg:init', success_callback);
              RLottie.init(this);
            }
          }, emojiWrapEl);
        } else if (emoji.type == 'webm') {
          gec('.tg-emoji-webm', function() {
            TVideoSticker.init(this, failed_callback, success_callback);
          }, emojiWrapEl);
        } else if (emoji.type == 'webp') {
          gec('.tg-emoji-webp', function() {
            TSticker.init(this, failed_callback, success_callback);
          }, emojiWrapEl);
        }
      } else {
        failed_callback();
      }
    });
  }

  function checkVideo(el, error_callback) {
    var timeout, eventAdded;
    if (!eventAdded) {
      function destroyCheck() {
        clearTimeout(timeout);
        removeEvent(el, 'canplay', onCanPlay);
        removeEvent(el, 'error', onError);
      }
      function onCanPlay() {
        destroyCheck();
      }
      function onError() {
        destroyCheck();
        error_callback();
      }
      eventAdded = true;
      addEvent(el, 'canplay', onCanPlay);
      addEvent(el, 'error', onError);
    }
    if (el.readyState >= 2) {
      destroyCheck();
    } else {
      timeout = setTimeout(function() {
        checkVideo(el, error_callback);
      }, 50);
    }
  }

  window.TPost = {
    init: function(postEl, options) {
      postEl = geById(postEl);
      options = options || {};
      if (!postEl || postEl.__inited) return;
      postEl.__inited = true;
      if (window.RLottie) {
        if (options.tgs_workers_limit) {
          RLottie.WORKERS_LIMIT = options.tgs_workers_limit;
        } else if (options.frame) {
          RLottie.WORKERS_LIMIT = 1;
        }
      }
      gec('time[datetime]', function() {
        var datetime = this.getAttribute('datetime');
        if (datetime) {
          if (hasClass(this, 'datetime')) {
            this.innerHTML = formatDate(datetime) + ' at ' + formatTime(datetime);
          } else if (hasClass(this, 'time')) {
            this.innerHTML = formatTime(datetime);
          } else {
            this.innerHTML = formatDateTime(datetime);
          }
        }
      }, postEl);
      gec('.js-message_text', function() {
        TPost.initSpoilers(this, !gpeByClass(this, 'service_message'));
        gec('tg-emoji', function() {
          var emojiEl = this;
          TEmoji.init(this, function() {
            var wrapEl = gpeByClass(emojiEl, 'js-message_media') || postEl;
            addClass(wrapEl, 'media_not_supported');
            removeClass(postEl, 'no_bubble');
          });
        }, this);
      }, postEl);
      gec('.js-message_reply_text', function() {
        TPost.initSpoilers(this);
        gec('tg-emoji', function() {
          TEmoji.init(this);
        }, this);
      }, postEl);
      gec('.js-message_footer.compact', function() {
        var timeEl = ge1('time[datetime]', this)
          , textEl = this.previousElementSibling;
        if (textEl && hasClass(textEl, 'js-message_media')) {
          textEl = textEl.lastElementChild;
        }
        if (textEl && !textEl.__inited && hasClass(textEl, 'js-message_text')) {
          var text_rect = textEl.getBoundingClientRect();
          var tnode = textEl.firstChild;
          while (tnode && tnode.nodeType == tnode.ELEMENT_NODE) {
            tnode = tnode.firstChild;
          }
          if (tnode) {
            var r = document.createRange();
            r.setStart(tnode, 0);
            r.setEnd(tnode, 1);
            var char_rect = r.getBoundingClientRect();
            textEl.__inited = true;
            if (Math.abs(char_rect.right - text_rect.right) > 3) {
              var infoEl = ge1('.js-message_info', this);
              if (infoEl) {
                var shadowEl = document.createElement('span');
                shadowEl.style.display = 'inline-block';
                shadowEl.style.width = infoEl.offsetWidth + 'px';
                textEl.appendChild(shadowEl);
                addClass(textEl, 'before_footer');
              }
            }
          }
        }
      }, postEl);
      gec('.js-message_video_player', function() {
        TVideo.init(this);
      }, postEl);
      gec('.js-message_photo', function() {
        TPhoto.init(this);
      }, postEl);
      gec('.js-message_grouped_wrap', function() {
        TGrouped.init(this);
      }, postEl);
      gec('.js-message_roundvideo_player', function() {
        TRoundVideo.init(this);
      }, postEl);
      gec('.js-message_voice_player', function() {
        TVoice.init(this);
      }, postEl);
      gec('.js-sticker_image', function() {
        TSticker.init(this, function() {
          addClass(postEl, 'media_not_supported');
          removeClass(postEl, 'no_bubble');
        });
      }, postEl);
      gec('.js-sticker_thumb', function() {
        TSticker.init(this);
      }, postEl);
      gec('.js-tgsticker_image', function() {
        var stickerEl = this;
        var effectEl = ge1('.js-tgsticker_effect', postEl);
        if (effectEl) {
          addEventOnce(this, 'tg:play', function() {
            RLottie.playOnce(effectEl);
          });
          addEvent(this, 'click', function(e) {
            e.stopPropagation();
            RLottie.playOnce(effectEl);
          });
        }
        RLottie.init(this, {
          playUntilEnd: this.hasAttribute('data-is-dice')
        });
      }, postEl);
      gec('.js-tgsticker_effect', function() {
        RLottie.init(this, {noAutoPlay: true});
        var effectEl = this;
        addEvent(this, 'tg:play', function() {
          effectEl.style.visibility = 'visible';
        });
        addEvent(this, 'tg:pause', function() {
          effectEl.style.visibility = 'hidden';
        });
      }, postEl);
      gec('.js-videosticker', function() {
        TVideoSticker.init(this, function() {
          addClass(postEl, 'media_not_supported');
          removeClass(postEl, 'no_bubble');
        });
      }, postEl);
    },
    view: function(postEl) {
      postEl = geById(postEl);
      if (!postEl) return;
      var view = postEl.getAttribute('data-view');
      if (view) {
        var xhr = getXHR();
        xhr.open('get', '/v/?views=' + encodeURIComponent(view));
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(null);
      }
    },
    initSpoilers: function(text_el, active) {
      var spoilers = ge('tg-spoiler', text_el);
      if (spoilers.length) {
        TPost.wrapSpoilers(spoilers);
        TPost.wrapTextNodes(text_el);
        addClass(text_el, 'decorated-text');
      }
      TPost.hideSpoilers(text_el, active);
    },
    wrapSpoilers: function(spoilers) {
      gec(spoilers, function() {
        var inner_el = newEl('span', 'tg-spoiler-text');
        while (this.firstChild) {
          inner_el.appendChild(this.firstChild);
        }
        this.appendChild(inner_el);
      });
    },
    wrapTextNodes: function(el) {
      gec(el.childNodes, function() {
        if (this.nodeType == this.TEXT_NODE) {
          var text = newEl('span', 'd-text');
          this.parentNode.insertBefore(text, this);
          text.appendChild(this);
        } else if (!this.classList.contains('tg-spoiler') && this.childNodes) {
          TPost.wrapTextNodes(this);
        }
      });
    },
    hideSpoilers: function(text_el, active) {
      var spoilers = ge('tg-spoiler', text_el);
      if (spoilers.length) {
        if (active) {
          addClass(text_el, 'spoilers_active');
          addEvent(spoilers, 'click', TPost.eSpoilerShow);
        }
        addClass(text_el, 'spoilers_hidden');
      }
    },
    eSpoilerShow: function(e) {
      var text_el = gpeByClass(this, 'spoilers_hidden');
      if (!text_el) return false;
      e.preventDefault();
      e.stopImmediatePropagation();
      addClass(text_el, 'spoilers_animate');
      removeClass(text_el, 'spoilers_hidden');
      var delay = 0;
      gec('tg-spoiler', function() {
        removeEvent(this, 'click', TPost.eSpoilerShow);
        delay += this.innerText.length * 40;
      }, text_el);
      if (delay < 4000) delay = 4000;
      if (delay > 45000) delay = 45000;
      setTimeout(function() {
        TPost.hideSpoilers(text_el, true);
      }, delay);
    }
  };

  var TPhoto = window.TPhoto = {
    init: function(photoEl) {
      photoEl = geById(photoEl);
      if (!photoEl || photoEl.__inited) return;
      photoEl.__inited = true;
      var inGroup = hasClass(photoEl, 'grouped_media_wrap')
        , opened
        , overTo;
      if (inGroup) {
        addEvent(photoEl, 'click', function togglePhoto(e) {
          if (e.metaKey || e.ctrlKey) return true;
          e.stopPropagation();
          if (!photoEl) return true;
          if (opened) {
            opened = false;
            removeClass(photoEl, 'active');
            overTo = setTimeout(function() {
              removeClass(photoEl, 'over');
            }, 200);
          } else {
            opened = true;
            clearTimeout(overTo);
            addClass(photoEl, 'over active');
          }
          e.preventDefault();
          return false;
        });
      }
    }
  };

  var TVideo = window.TVideo = {
    init: function(playerEl) {
      playerEl = geById(playerEl);
      if (!playerEl || playerEl.__inited) return;
      playerEl.__inited = true;
      var videoEl = ge1('.js-message_video', playerEl)
        , videoBluredEl = ge1('.js-message_video_blured', playerEl)
        , playEl = ge1('.js-message_video_play', playerEl)
        , durationEl = ge1('.js-message_video_duration', playerEl)
        , inGroup = hasClass(playerEl, 'grouped_media_wrap')
        , looped
        , overTo;
      if (!videoEl) return;

      looped = videoEl.hasAttribute('loop');
      if (inGroup) {
        addEvent(playerEl, 'click', function videoToggleInGroup(e) {
          if (e.metaKey || e.ctrlKey) return true;
          if (hasClass(e.target, 'message_media_view_in_telegram')) return true;
          e.stopPropagation();
          if (!playerEl) return true;
          if (hasClass(playerEl, 'active')) {
            removeClass(playerEl, 'active');
            overTo = setTimeout(function() {
              removeClass(playerEl, 'over');
            }, 200);
          } else {
            clearTimeout(overTo);
            addClass(playerEl, 'over active');
          }
          e.preventDefault();
          return false;
        });
      }
      if (videoEl.hasAttribute('playsinline')) {
        enableInlineVideo(videoEl);
        if (videoBluredEl) {
          enableInlineVideo(videoBluredEl);
        }
      }
      if (videoBluredEl) {
        videoBluredEl.muted = true;
      }
      function fixControls() {
        if (videoEl.controls) videoEl.controls = false;
      }
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      if (MutationObserver) {
        (new MutationObserver(fixControls)).observe(videoEl, {attributes: true});
      }

      checkVideo(videoEl, function() {
        addClass(playerEl, 'not_supported');
      });
      addEvent(videoEl, 'play', function() {
        fixControls();
        addClass(playerEl, 'playing');
        if (inGroup) {
          clearTimeout(overTo);
          addClass(playerEl, 'over active');
        }
        if (videoBluredEl) {
          videoBluredEl.currentTime = videoEl.currentTime;
          if (!browser.mobile) {
            videoBluredEl.play();
          }
        }
        if (!looped) {
          triggerEvent(videoEl, 'tg:play', {bubbles: true});
        }
      });
      addEvent(document, 'tg:play', function(e) {
        if (e.target === videoEl || looped) return true;
        if (!videoEl.paused) {
          videoEl.pause();
          if (videoBluredEl) {
            videoBluredEl.pause();
          }
        }
      });
      addEvent(videoEl, 'pause', function() {
        fixControls();
        removeClass(playerEl, 'playing');
        if (inGroup) {
          removeClass(playerEl, 'active');
          overTo = setTimeout(function() {
            removeClass(playerEl, 'over');
          }, 200);
        }
        if (videoBluredEl) {
          videoBluredEl.currentTime = videoEl.currentTime;
          videoBluredEl.pause();
        }
        if (looped) {
          videoEl.play();
        }
      });
      addEvent(videoEl, 'timeupdate', function(e) {
        fixControls();
        if (videoBluredEl && videoBluredEl.currentTime != videoEl.currentTime) {
          videoBluredEl.currentTime = videoEl.currentTime;
        }
        if (durationEl && videoEl.duration) {
          var duration = Math.floor(videoEl.duration);
          durationEl.innerHTML = formatDuration(duration - videoEl.currentTime);
        }
      });
      addEvent(videoEl, 'ended load', function(e) {
        fixControls();
        if (durationEl && videoEl.duration) {
          var duration = Math.floor(videoEl.duration);
          durationEl.innerHTML = formatDuration(duration);
        }
      });
      if (looped) {
        addEvent(document, 'touchstart', function(){ videoEl.play(); });
      } else {
        addClass(playerEl, 'ready');
      }
      if (playEl) {
        addEvent(playEl, 'click', function toggleVideo(e) {
          if (e.metaKey || e.ctrlKey) return true;
          e.stopPropagation();
          if (!videoEl) return true;
          if (videoEl.paused) {
            videoEl.play();
            if (videoBluredEl) {
              videoBluredEl.play();
            }
          } else {
            videoEl.pause();
            if (videoBluredEl) {
              videoBluredEl.pause();
            }
          }
          e.preventDefault();
          return false;
        });
      }
    }
  };

  var TGrouped = window.TGrouped = {
    init: function(groupedWrapEl) {
      groupedWrapEl = geById(groupedWrapEl);
      if (!groupedWrapEl || groupedWrapEl.__inited) return;
      groupedWrapEl.__inited = true;
      var groupedEl = ge1('.js-message_grouped', groupedWrapEl)
        , groupedLayerEl = ge1('.js-message_grouped_layer', groupedEl)
        , thumbsEl = groupedLayerEl.children
        , margin_w = +groupedWrapEl.getAttribute('data-margin-w') || 2
        , margin_h = +groupedWrapEl.getAttribute('data-margin-h') || 2;
      if (!thumbsEl.length) {
        return false;
      }

      addEvent(window, 'resize', function() {
        if (groupedLayerEl.offsetWidth != groupedEl.offsetWidth) {
          recalcGrouped(groupedWrapEl.offsetWidth);
        }
      });
      recalcGrouped(groupedWrapEl.offsetWidth);

      function updateThumb(thumbEl, x, y, width, height, th_width, th_height, position) {
        if (!thumbEl) return;
        var t = false, r = false, b = false, l = false;
        for (var i = 0; i < position.length; i++) {
          if      (position[i] == 't') t = true;
          else if (position[i] == 'r') r = true;
          else if (position[i] == 'b') b = true;
          else if (position[i] == 'l') l = true;
        }
        thumbEl.style.left = x + 'px';
        thumbEl.style.top = y + 'px';
        thumbEl.style.width = width + 'px';
        thumbEl.style.height = height + 'px';
        thumbEl.style.marginRight = (!r ? margin_w : 0) + 'px';
        thumbEl.style.marginBottom = (!b ? margin_h : 0) + 'px';

        var th_ratio = th_width / th_height;
        var ratio    = +thumbEl.getAttribute('data-ratio') || 1.0;
        var mediaEl  = ge1('.grouped_media', thumbEl);
        var helperEl = ge1('.grouped_media_helper', thumbEl);

        if (mediaEl) {
          var media_height = Math.ceil(width / ratio);
          var media_tb = height - media_height;
          if (media_tb < 0) {
            var media_t = Math.floor(media_tb / 2);
            var media_b = media_tb - media_t;
            mediaEl.style.left = 0;
            mediaEl.style.right = 0;
            mediaEl.style.top = media_t + 'px';
            mediaEl.style.bottom = media_b + 'px';
          } else {
            var media_width = Math.ceil(height * ratio);
            var media_lr = width - media_width;
            var media_l = Math.floor(media_lr / 2);
            var media_r = media_lr - media_l;
            mediaEl.style.top = 0;
            mediaEl.style.bottom = 0;
            mediaEl.style.left = media_l + 'px';
            mediaEl.style.right = media_r + 'px';
          }
        }
        if (helperEl) {
          var helper_height = Math.floor(th_width / ratio);
          var helper_tb = th_height - helper_height;
          if (helper_tb > 0) {
            var helper_t = Math.floor(helper_tb / 2);
            var helper_b = helper_tb - helper_t;
            helperEl.style.left = 0;
            helperEl.style.right = 0;
            helperEl.style.top = helper_t + 'px';
            helperEl.style.bottom = helper_b + 'px';
          } else {
            var helper_width = Math.ceil(th_height * ratio);
            var helper_lr = th_width - helper_width;
            var helper_l = Math.floor(helper_lr / 2);
            var helper_r = helper_lr - helper_l;
            helperEl.style.top = 0;
            helperEl.style.bottom = 0;
            helperEl.style.left = helper_l + 'px';
            helperEl.style.right = helper_r + 'px';
          }
        }
      }

      function recalcGrouped(max_w) {
        var orients = '';
        var ratios = [];
        var cnt = thumbsEl.length;

        var ratios_sum = 0;
        for (var i = 0; i < thumbsEl.length; i++) {
          var thumbEl = thumbsEl[i];
          var ratio = +thumbEl.getAttribute('data-ratio') || 1.0;
          orients += ratio > 1.2 ? 'w' : (ratio < 0.8 ? 'n' : 'q');
          ratios_sum += ratio;
          ratios.push(ratio);
        }

        var avg_ratio = ratios.length ? ratios_sum / ratios.length : 1.0;
        var max_ratio = 0.75;
        var min_w     = 75;
        var max_h     = max_w / max_ratio;

        var w, h, w0, w1, w2, h0, h1, h2, x, y, x1, x2, y1, y2,
            th_width, th_height;

        if (cnt == 2) {
          if (orients == 'ww' &&
              avg_ratio > 1.4 * max_ratio &&
              (ratios[1] - ratios[0]) < 0.2) {
            // 2 wide pics are one below the other
            w = max_w;
            h = Math.min(w / ratios[0], Math.min(w / ratios[1], (max_h - margin_h) / 2.0));
            th_width  = max_w;
            th_height = 2 * h + margin_h;
            h0 = Math.floor(h);
            h1 = th_height - h0 - margin_h;
            y = h0 + margin_h;
            updateThumb(thumbsEl[0], 0, 0, w, h0, th_width, th_height, 'trl');
            updateThumb(thumbsEl[1], 0, y, w, h1, th_width, th_height, 'rbl');
          }
          else if (orients == 'ww' || orients == 'qq') {
            // 2 equal width pics
            w = (max_w - margin_w) / 2;
            h = Math.floor(Math.min(max_h, Math.min(w / ratios[0], w / ratios[1])));
            th_width  = max_w;
            th_height = h;
            w0 = Math.floor(w);
            w1 = max_w - w0 - margin_w;
            x = w0 + margin_w;
            updateThumb(thumbsEl[0], 0, 0, w0, h, th_width, th_height, 'tbl');
            updateThumb(thumbsEl[1], x, 0, w1, h, th_width, th_height, 'trb');
          }
          else {
            // so, we have one wide and one not wide (square or narrow)
            w0 = Math.floor((max_w - margin_w) / ratios[1] / (1 / ratios[0] + 1 / ratios[1]));
            w1 = max_w - w0 - margin_w;
            h = Math.floor(Math.min(max_h, Math.min(w0 / ratios[0], w1 / ratios[1])));
            th_width  = max_w;
            th_height = h;
            x = w0 + margin_w;
            updateThumb(thumbsEl[0], 0, 0, w0, h, th_width, th_height, 'tbl');
            updateThumb(thumbsEl[1], x, 0, w1, h, th_width, th_height, 'trb');
          }
        }
        else if (cnt == 3) {
          if (orients[0] == 'n') {
            // 2nd and 3rd photos are on the right part
            h0 = max_h;
            h2 = Math.floor(Math.min((max_h - margin_h) * 0.5, ratios[1] * (max_h - margin_h) / (ratios[2] + ratios[1])));
            h1 = max_h - h2 - margin_h;
            w1 = Math.floor(Math.max(min_w, Math.min((max_w - margin_w) * 0.5, Math.min(h2 * ratios[2], h1 * ratios[1]))));
            w0 = Math.min(Math.floor(h0 * ratios[0]), (max_w - w1 - margin_w));
            th_width  = w0 + w1 + margin_w;
            th_height = max_h;
            x = w0 + margin_w;
            y = h1 + margin_h;
            updateThumb(thumbsEl[0], 0, 0, w0, h0, th_width, th_height, 'tbl');
            updateThumb(thumbsEl[1], x, 0, w1, h1, th_width, th_height, 'tr');
            updateThumb(thumbsEl[2], x, y, w1, h2, th_width, th_height, 'rb');
          }
          else {
            // 2nd and 3rd photos are on the next line
            w0 = max_w;
            h0 = Math.floor(Math.min(w0 / ratios[0], (max_h - margin_h) * 0.66));
            w = (max_w - margin_w) / 2;
            h = Math.floor(Math.min(max_h - h0 - margin_h, Math.min(w / ratios[1], w / ratios[2])));
            th_width  = max_w;
            th_height = h0 + h + margin_h;
            w1 = Math.floor(w);
            w2 = max_w - w1 - margin_w;
            x = w1 + margin_w;
            y = h0 + margin_h;
            updateThumb(thumbsEl[0], 0, 0, w0, h0, th_width, th_height, 'tlr');
            updateThumb(thumbsEl[1], 0, y, w1, h, th_width, th_height, 'bl');
            updateThumb(thumbsEl[2], x, y, w2, h, th_width, th_height, 'rb');
          }
        }
        else if (cnt == 4) {
          if (orients == 'wwww' || orients[0] == 'w') {
            // 2nd, 3rd and 4th photos are on the next line
            w = max_w;
            h0 = Math.floor(Math.min(w / ratios[0], (max_h - margin_h) * 0.66));
            h = (max_w - 2 * margin_w) / (ratios[1] + ratios[2] + ratios[3]);
            w0 = Math.floor(Math.max(min_w, Math.min((max_w - 2 * margin_w) * 0.4, h * ratios[1])));
            w2 = Math.floor(Math.max(min_w, Math.min((max_w - 2 * margin_w) * 0.33, h * ratios[3])));
            w1 = w - w0 - w2 - 2 * margin_w;
            h = Math.floor(Math.min(max_h - h0 - margin_h, h));
            th_width  = max_w;
            th_height = h0 + h + margin_h;
            y = h0 + margin_h;
            x1 = w0 + margin_w;
            x2 = x1 + w1 + margin_w;
            updateThumb(thumbsEl[0], 0, 0, w, h0, th_width, th_height, 'tlr');
            updateThumb(thumbsEl[1], 0, y, w0, h, th_width, th_height, 'bl');
            updateThumb(thumbsEl[2], x1, y, w1, h, th_width, th_height, 'b');
            updateThumb(thumbsEl[3], x2, y, w2, h, th_width, th_height, 'rb');
          }
          else {
            // 2nd, 3rd and 4th photos are on the right part
            h = max_h;
            w0 = Math.floor(Math.min(h * ratios[0], (max_w - margin_w) * 0.66));
            w = Math.floor((max_h - 2 * margin_h) / (1 / ratios[1] + 1 / ratios[2] + 1 / ratios[3]));
            h0 = Math.floor(w / ratios[1]);
            h2 = Math.floor(w / ratios[3]);
            h1 = h - h0 - h2 - 2 * margin_h;
            w = Math.max(min_w, Math.min(max_w - w0 - margin_w, w));
            th_width  = w0 + w + margin_w;
            th_height = max_h;
            x = w0 + margin_w;
            y1 = h0 + margin_h;
            y2 = y1 + h1 + margin_h;
            updateThumb(thumbsEl[0], 0, 0, w0, h, th_width, th_height, 'tbl');
            updateThumb(thumbsEl[1], x, 0, w, h0, th_width, th_height, 'tr');
            updateThumb(thumbsEl[2], x, y1, w, h1, th_width, th_height, 'r');
            updateThumb(thumbsEl[3], x, y2, w, h2, th_width, th_height, 'rb');
          }
        }
        else {
          var ratios_cropped = [];
          for (var i = 0; i < ratios.length; i++) {
            var ratio = ratios[i];
            if (avg_ratio > 1.1) {
              ratio_cropped = Math.max(1.0, ratio);
            } else {
              ratio_cropped = Math.min(1.0, ratio);
            }
            ratio_cropped = Math.max(0.66667, Math.min(1.7, ratio_cropped));
            ratios_cropped.push(ratio_cropped);
          }

          var multiHeight = function(ratios) {
            var ratios_sum = 0;
            for (var i = 0; i < ratios.length; i++) {
              var ratio = ratios[i];
              ratios_sum += ratio;
            }
            return (max_w - (ratios.length - 1) * margin_w) / ratios_sum;
          };

          var tries = [];
          var first_line, second_line, third_line, fourth_line;
          // Two lines
          for (first_line = 1; first_line <= cnt - 1; first_line++) {
            second_line = cnt - first_line;
            if (first_line  > 3 ||
                second_line > 3) {
              continue;
            }
            tries.push([[first_line, second_line], [
              multiHeight(ratios_cropped.slice(0, first_line)),
              multiHeight(ratios_cropped.slice(first_line)),
            ]]);
          }

          // Three lines
          for (first_line = 1; first_line <= cnt - 2; first_line++) {
            for (second_line = 1; second_line <= cnt - first_line - 1; second_line++) {
              third_line = cnt - first_line - second_line;
              if (first_line  > 3 ||
                  second_line > (avg_ratio < 0.85 ? 4 : 3) ||
                  third_line  > 3) {
                continue;
              }
              tries.push([[first_line, second_line, third_line], [
                multiHeight(ratios_cropped.slice(0, first_line)),
                multiHeight(ratios_cropped.slice(first_line, first_line + second_line)),
                multiHeight(ratios_cropped.slice(first_line + second_line)),
              ]]);
            }
          }

          // Four lines
          for (first_line = 1; first_line <= cnt - 3; first_line++) {
            for (second_line = 1; second_line <= cnt - first_line - 2; second_line++) {
              for (third_line = 1; third_line <= cnt - first_line - second_line - 1; third_line++) {
                fourth_line = cnt - first_line - second_line - third_line;
                if (first_line  > 3 ||
                    second_line > 3 ||
                    third_line  > 3 ||
                    fourth_line > 3) {
                  continue;
                }
                tries.push([[first_line, second_line, third_line, fourth_line], [
                  multiHeight(ratios_cropped.slice(0, first_line)),
                  multiHeight(ratios_cropped.slice(first_line, first_line + second_line)),
                  multiHeight(ratios_cropped.slice(first_line + second_line, first_line + second_line + third_line)),
                  multiHeight(ratios_cropped.slice(first_line + second_line + third_line)),
                ]]);
              }
            }
          }

          // Looking for minimum difference between thumbs block height and max_h (may probably be little over)
          var opt_i = false;
          var opt_conf = false;
          var opt_diff = false;
          var opt_h = false;
          for (var i = 0; i < tries.length; i++) {
            var conf_nums = tries[i][0];
            var heights = tries[i][1];
            var heights_sum = 0;
            var heights_min = Infinity;
            for (var j = 0; j < heights.length; j++) {
              heights_sum += heights[j];
              if (heights_min > heights[j]) {
                heights_min = heights[j];
              }
            }
            var conf_h = Math.floor(heights_sum + margin_h * (heights.length - 1));
            var conf_diff = Math.abs(conf_h - max_h);
            if (conf_nums.length > 1) {
              if (conf_nums[0] > conf_nums[1] ||
                  conf_nums[2] && conf_nums[1] > conf_nums[2] ||
                  conf_nums[3] && conf_nums[2] > conf_nums[3]) {
                conf_diff *= 1.5;
              }
            }
            if (heights_min < min_w) {
              conf_diff *= 1.5;
            }
            if (opt_conf === false || conf_diff < opt_diff) {
              opt_i = i;
              opt_conf = cloneArr(conf_nums);
              opt_diff = conf_diff;
              opt_h = conf_h;
            }
          }

          // Generating optimal thumbs
          th_width  = max_w;
          th_height = opt_h;
          var thumbs_remain = cloneArr(thumbsEl);
          var ratios_remain = cloneArr(ratios_cropped);
          var chunks = cloneArr(opt_conf);
          var opt_heights = cloneArr(tries[opt_i][1]);
          var chunks_num = chunks.length;
          var last_row = chunks_num - 1;
          var sy = 0;
          for (var i = 0; i < chunks.length; i++) {
            var line_chunks_num = chunks[i];
            var line_thumbs = thumbs_remain.splice(0, line_chunks_num);
            var line_height = opt_heights.shift();
            var last_column = line_thumbs.length - 1;
            var h = Math.floor(line_height);
            var sx = 0;
            var t = '', r = '', b = '', l = '';
            if (i == 0) {
              t = 't';
            }
            if (i == last_row) {
              b = 'b';
              h = th_height - sy;
            }
            for (var j = 0; j < line_thumbs.length; j++) {
              var thumbEl = line_thumbs[j];
              var thumb_ratio = ratios_remain.shift();
              var w = Math.floor(thumb_ratio * h);
              if (j == 0) {
                l = 'l';
              }
              if (j == last_column) {
                r = 'r';
                w = th_width - sx;
              }
              updateThumb(thumbEl, sx, sy, w, h, th_width, th_height, t+r+b+l);
              sx += w + margin_w;
            }
            sy += h + margin_h;
          }
        }

        groupedEl.style.paddingTop  = (th_height / th_width * 100) + '%';
        groupedLayerEl.style.width  = th_width + 'px';
        groupedLayerEl.style.height = th_height + 'px';
      }
    }
  };

  var TRoundVideo = window.TRoundVideo = {
    init: function(playerEl) {
      playerEl = geById(playerEl);
      if (!playerEl || playerEl.__inited) return;
      playerEl.__inited = true;
      var videoEl = ge1('.js-message_roundvideo', playerEl)
        , playEl = ge1('.js-message_roundvideo_play', playerEl)
        , progressEl = ge1('.js-message_roundvideo_progress', playerEl)
        , durationEl = ge1('.js-message_roundvideo_duration', playerEl)
        , playing = false;
      if (!videoEl) return;

      function autoplay() {
        if (!videoEl) return;
        removeEvent(document, 'touchstart', autoplay);
        removeClass(playerEl, 'playing');
        playing = false;
        videoEl.muted = true;
        videoEl.loop = true;
        videoEl.currentTime = 0;
        play();
        showProgress();
      }
      function showProgress() {
        if (!videoEl) return;
        if (playing && !videoEl.paused) {
          requestAnimationFrame(function(){ showProgress(); });
        }
        redrawProgress();
        if (videoEl.duration) {
          var duration = Math.floor(videoEl.duration);
          durationEl.innerHTML = formatDuration(duration - videoEl.currentTime);
        }
      }
      function redrawProgress(updateSVG) {
        if (!videoEl) return;
        var progress;
        if (playing) {
          progress = videoEl.currentTime / videoEl.duration;
        } else {
          progress = 0;
        }
        progress = Math.max(0, Math.min(progress, 1));
        var wrapWidth = playerEl.offsetWidth;
        if (wrapWidth) {
          var rd = progressEl.getAttribute('data-rd') || 3;
          var d = (wrapWidth - rd);
          var l = (d * Math.PI);
          progressEl.setAttribute('r', (d / 2));
          progressEl.setAttribute('stroke-dasharray', l);
          progressEl.setAttribute('stroke-dashoffset', l * (1 - progress));
          if (updateSVG) {
            progressEl.style.transform = !progressEl.style.transform ? 'rotateZ(270deg)' : '';
          }
        }
      }
      function play() {
        if (!videoEl) return;
        var video = videoEl;
        var isPlaying = (video.currentTime > 0) &&
                        !video.paused &&
                        !video.ended &&
                        (video.readyState > 2);
        if (!isPlaying) {
          video.play();
          if (playing) {
            triggerEvent(videoEl, 'tg:play', {bubbles: true});
          }
        }
      }
      addEvent(document, 'tg:play', function(e) {
        if (e.target === videoEl || !playing) return true;
        if (videoEl.paused) {
          play();
          showProgress();
        } else {
          autoplay();
        }
      });
      function pause() {
        if (!videoEl) return;
        videoEl.pause();
      }
      function toggle(e) {
        e.stopPropagation();
        if (!playing) {
          redrawProgress();
          addClass(playerEl, 'playing');
          playing = true;
          videoEl.muted = false;
          videoEl.loop = false;
          videoEl.currentTime = 0;
          play();
          showProgress();
        } else {
          if (videoEl.paused) {
            play();
            showProgress();
          } else {
            pause();
          }
        }
      }

      enableInlineVideo(videoEl);

      checkVideo(videoEl, function() {
        addClass(playerEl, 'not_supported');
      });
      autoplay();
      addEvent(document, 'touchstart', autoplay);
      addEvent(videoEl, 'ended', function() {
        autoplay();
      });
      addEvent(window, 'resize', function() {
        redrawProgress(true)
      });
      if (playEl) {
        addEvent(playEl, 'click', toggle);
      }
    }
  };

  var TVoice = window.TVoice = {
    init: function(playerEl) {
      playerEl = geById(playerEl);
      if (!playerEl || playerEl.__inited) return;
      playerEl.__inited = true;
      var audioEl = ge1('.js-message_voice', playerEl)
        , durationEl = ge1('.js-message_voice_duration', playerEl)
        , progressEl = ge1('.js-message_voice_progress', playerEl)
        , progressWrapEl = ge1('.js-message_voice_progress_wrap', playerEl)
        , player = null
        , isOGG = audioEl.hasAttribute('data-ogg')
        , seekTo = null
        , seeking = false
        , disableClick = false;
      if (!audioEl) return;

      function initPlayer() {
        addClass(playerEl, 'ready');
        addEvent(player, 'play', function() {
          addClass(playerEl, 'playing');
          triggerEvent(playerEl, 'tg:play', {bubbles: true});
        });
        addEvent(player, 'pause', function() {
          removeClass(playerEl, 'playing');
        });
        addEvent(player, 'ended', function() {
          player.currentTime = 0;
          showProgress();
        });
        addEvent(player, 'loadedmetadata', function() {
          showProgress();
        });
        addEvent(playerEl, 'click', toggle);
        addEvent(progressWrapEl, 'mousedown touchstart', seekStart);
        addEvent(document, 'tg:play', stop);
      }
      function toggle(e) {
        e.stopPropagation();
        if (!disableClick) {
          if (!player) return true;
          if (player.paused) {
            player.play();
            showProgress();
          } else {
            player.pause();
            showProgress();
          }
        } else {
          disableClick = false;
        }
        e.preventDefault();
        return false;
      }
      function stop(e) {
        if (e.target === playerEl || !player) return true;
        if (!player.paused) {
          player.pause();
          showProgress();
        }
        return false;
      }
      function seekStart(e) {
        if (player &&
            player.duration !== Infinity &&
            (!player.paused ||
             player.currentTime > 0 && player.currentTime < player.duration)) {
          e.preventDefault();
          seeking = true;
          disableClick = false;
          player.pause();
          addEvent(document, 'mousemove touchmove', seek);
          addEvent(document, 'mouseup mouseleave touchend touchcancel', seekEnd);
          seek(e);
        }
      }
      function seek(e) {
        if (!seeking) return;
        var px = e.pageX;
        var op = progressWrapEl;
        var x = op.offsetLeft;
        var w = op.offsetWidth;
        while (op = op.offsetParent) {
          x += op.offsetLeft;
        }
        var ct = Math.max(0, Math.min(px - x, w)) / w;
        seekTo = ct;
        showProgress();
      }
      function seekEnd(e) {
        if (!seeking) return;
        seek(e);
        var duration = Math.floor(player.duration);
        player.currentTime = seekTo * duration;
        seekTo = null;
        seeking = false;
        if (e.type.substr(0, 5) == 'mouse') {
          disableClick = true;
        }
        player.play();
        showProgress();
        removeEvent(document, 'mousemove touchmove', seek);
        removeEvent(document, 'mouseup touchend', seekEnd);
      }
      function showProgress() {
        if (!player) return;
        if (!player.paused) {
          requestAnimationFrame(function(){ showProgress(); });
        }
        if (player.duration && player.duration !== Infinity) {
          var duration = Math.floor(player.duration);
          if (seeking) {
            var currentTime = seekTo * duration;
          } else {
            var currentTime = Math.max(0, player.currentTime);
          }
          if (progressEl) {
            progressEl.style.width = Math.min(100, currentTime / duration * 100) + '%';
          }
          if (durationEl) {
            durationEl.innerHTML = formatDuration(duration - currentTime);
          }
        }
      }
      function redrawProgress() {
        if (!audioEl) return;
        var ss = progressWrapEl.getElementsByTagName('S');
        var ss_count = ss.length / 2;
        var waveform_str = audioEl.getAttribute('data-waveform') || '';
        var waveform = waveform_str.split(',');
        var lines_cnt = Math.floor((progressWrapEl.offsetWidth + 2) / 6);
        var p = waveform.length / lines_cnt;
        var values = [];
        var max_value = 0;
        for (var i = 0; i < lines_cnt; i++) {
          var ws = i * p;
          var we = ws + p;
          var wsi = Math.floor(ws);
          var wei = Math.floor(we);
          if (wsi == wei) {
            var value = waveform[wsi] * (we - ws);
          } else {
            var value = 0;
            for (var j = wsi; j <= wei; j++) {
              var wv = +waveform[j] || 0;
              if (j == wsi) {
                value += wv * (j + 1 - ws);
              } else if (j == wei) {
                value += wv * (we - j);
              } else {
                value += wv;
              }
            }
          }
          value = value / p;
          max_value = Math.max(value, max_value);
          values.push(value);
        }
        for (var i = 0; i < ss.length; i++) {
          var li = i % ss_count;
          if (li < lines_cnt) {
            var height = (values[li] / max_value) * 100;
            ss[i].style.height = height + '%';
            ss[i].style.display = '';
          } else {
            ss[i].style.display = 'none';
          }
        }
      }

      loadLib(TBaseUrl + 'js/ogvjs/ogv-support.js', function(success) {
        if (!success) return;
        if (isOGG &&
            OGVCompat.hasWebAudio() &&
            OGVCompat.supported('OGVPlayer')) {
          loadLib(TBaseUrl + 'js/ogvjs/ogv.js', function(success) {
            if (!success) return;
            player = new OGVPlayer();
            player.src = audioEl.src;
            initPlayer();
          });
        } else {
          player = audioEl;
          initPlayer();
        }
      });
      addEvent(window, 'resize', function(){ redrawProgress() });
      redrawProgress();
    }
  };

  var TSticker = window.TSticker = {
    init: proccessWebpImage
  };

  var TVideoSticker = window.TVideoSticker = {
    init: proccessWebmImage
  };

  var TEmoji = window.TEmoji = {
    init: proccessEmoji
  }

  window.TWidgetPost = {
    init: function(options) {
      if (!doesSupportEmoji()) {
        removeClass(document.body, 'emoji_default');
        addClass(document.body, 'emoji_image');
      }
      options = options || {};
      TWidgetPost.options = options;

      gec('.js-widget_message', function() {
        TPost.init(this, {tgs_workers_limit: 1});
        addEvent(ge('.js-poll_option', this), 'click', TWidgetPost.eSelectPollOption);
        addEvent(ge('.js-poll_vote_btn', this), 'click', TWidgetPost.eSendVotes);
      });
      initWidgetFrame({
        auto_height: true,
        onVisible: function() {
          gec('.js-widget_message', function() {
            TPost.view(this);
          });
        }
      });
      addEvent(window, 'tg:optionschange', TWidgetPost.onOptionsChange);
    },
    onOptionsChange: function(e) {
      var new_options = e.detail, transition_off = false;
      if (typeof new_options.dark !== undefined) {
        transition_off = true;
        addClass(document.body, 'no_transitions');
        toggleClass(document.body, 'dark', !!new_options.dark);
        toggleClass(document.body, 'nodark', !new_options.dark);
        var root = document.documentElement;
        if (root && root.style) {
          root.style.colorScheme = !new_options.dark ? 'light' : 'dark';
        }
      }
      if (transition_off) {
        setTimeout(function() {
          removeClass(document.body, 'no_transitions');
        }, 100);
      }
    },
    eSelectPollOption: function(e) {
      e.preventDefault();
      if (!TWidgetAuth.isLoggedIn()) {
        return TWidgetAuth.logIn();
      }
      var poll_el = gpeByClass(this, 'js-poll');
      if (!poll_el) {
        return false;
      }
      toggleClass(this, 'selected');
      toggleClass(poll_el, 'selected', ge('.js-poll_option.selected', poll_el).length > 0);
      if (!hasClass(poll_el, 'multiple')) {
        TWidgetPost.sendPollVote(poll_el, this);
      }
    },
    eSendVotes: function(e) {
      e.preventDefault();
      if (!TWidgetAuth.isLoggedIn()) {
        return TWidgetAuth.logIn();
      }
      var poll_el = gpeByClass(this, 'js-poll');
      if (!poll_el) {
        return false;
      }
      TWidgetPost.sendPollVote(poll_el, this);
    },
    sendPollVote: function(poll_el, option_el) {
      if (!poll_el || hasClass(poll_el, 'sending')) {
        return false;
      }
      var option_els = ge('.js-poll_option.selected', poll_el);
      var options = TWidgetPost.options || {};
      var post_el = gpeByClass(option_el, 'js-widget_message');
      if (!post_el) {
        return false;
      }
      var peer = getAttr(post_el, 'data-peer');
      var peer_hash = getAttr(post_el, 'data-peer-hash');
      var post_id = getAttr(post_el, 'data-post-id');
      if (!peer || !peer_hash || !post_id) {
        return false;
      }
      var poll_options = [];
      gec(option_els, function() {
        poll_options.push(getAttr(this, 'data-value'));
      });
      removeClass(poll_el, 'selected');
      addClass(poll_el, 'sending');
      apiRequest('sendVote', {
        peer: peer,
        peer_hash: peer_hash,
        post_id: post_id,
        options: poll_options.join(';')
      }, function(err, result) {
        removeClass(poll_el, 'sending');
        if (result.media_html) {
          var media_wrap = newEl('div', '', result.media_html);
          var media_html = getHtml('.js-poll', media_wrap);
          setHtml(poll_el, media_html);
          addEvent(ge('.js-poll_option', poll_el), 'click', TWidgetPost.eSelectPollOption);
          addEvent(ge('.js-poll_vote_btn', poll_el), 'click', TWidgetPost.eSendVotes);
        }
        toggleClass(poll_el, 'selected', ge('.js-poll_option.selected', poll_el).length > 0);
      });
    }
  };

  var TWidgetLogin = {
    init: function(id, bot_id, params, init_auth) {
      initWidgetFrame({
        auto_height: true,
        auto_width: true
      });
      TWidgetLogin.widgetEl = document.getElementById(id);
      TWidgetLogin.botId = bot_id;
      TWidgetLogin.params = params;
      TWidgetLogin.lang = (params || {}).lang;
      var params_encoded = '', params_arr = [];
      for (var k in params) {
        params_arr.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
      }
      TWidgetLogin.paramsEncoded = params_arr.join('&');
      if (init_auth) {
        TWidgetLogin.getAuth(true);
      }
      addEvent(window, 'message', function (event) {
        try {
          var data = JSON.parse(event.data);
        } catch(e) {
          var data = {};
        }
        if (event.source !== TWidgetLogin.activePopup) return;
        if (data.event == 'auth_result') {
          TWidgetLogin.onAuth(data.origin, data.result);
        }
      });
    },
    auth: function() {
      var width = 550;
      var height = 470;
      var left = Math.max(0, (screen.width - width) / 2) + (screen.availLeft | 0),
          top = Math.max(0, (screen.height - height) / 2) + (screen.availTop | 0);
      function checkClose() {
        if (!TWidgetLogin.activePopup || TWidgetLogin.activePopup.closed) {
          return TWidgetLogin.onClose();
        }
        setTimeout(checkClose, 100);
      }
      TWidgetLogin.activePopup = window.open('/auth?bot_id=' + TWidgetLogin.botId + (TWidgetLogin.paramsEncoded ? '&' + TWidgetLogin.paramsEncoded : ''), 'telegram_oauth', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',status=0,location=0,menubar=0,toolbar=0');
      TWidgetLogin.authFinished = false;
      if (TWidgetLogin.activePopup) {
        TWidgetLogin.activePopup.focus();
        checkClose();
      }
    },
    getAuth: function(init) {
      var xhr = getXHR();
      xhr.open('POST', '/auth/get?bot_id=' + TWidgetLogin.botId + (TWidgetLogin.lang ? '&lang=' + encodeURIComponent(TWidgetLogin.lang) : ''));
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (typeof xhr.responseBody == 'undefined' && xhr.responseText) {
            try {
              var result = JSON.parse(xhr.responseText);
            } catch(e) {
              var result = {};
            }
            if (result.html && TWidgetLogin.widgetEl.innerHTML != result.html) {
              TWidgetLogin.widgetEl.innerHTML = result.html;
            }
            if (result.user) {
              TWidgetLogin.onAuth(result.origin, result.user, init);
            } else {
              TWidgetLogin.onAuth(result.origin, false, init);
            }
          } else {
            TWidgetLogin.onAuth('*', false, init);
          }
        }
      };
      xhr.onerror = function() {
        TWidgetLogin.onAuth('*', false, init);
      };
      xhr.withCredentials = true;
      xhr.send(TWidgetLogin.paramsEncoded);
    },
    onAuth: function(origin, authData, init) {
      if (TWidgetLogin.authFinished) return;
      if (authData) {
        var data = {event: 'auth_user', auth_data: authData};
      } else {
        var data = {event: 'unauthorized'};
      }
      if (init) {
        data.init = true;
      }
      PostMessage.send(data, origin);
      TWidgetLogin.authFinished = true;
    },
    onClose: function() {
      TWidgetLogin.getAuth();
    }
  };
  window.TWidgetLogin = TWidgetLogin;

  var TStats = {
    init: function () {
      if (!doesSupportEmoji()) {
        removeClass(document.body, 'emoji_default');
        addClass(document.body, 'emoji_image');
      }
      gec('.js-sticker_thumb', function() {
        TSticker.init(this);
      });
    }
  }
  window.TStats = TStats;

  window.TWidget = {
    initFrame: initWidgetFrame
  };

})();
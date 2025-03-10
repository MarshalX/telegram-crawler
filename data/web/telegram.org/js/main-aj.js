function ajInit(options) {
  if (!window.history || !history.pushState) {
    return false;
  }

  var nav_url   = location.href;
  var short_url = layerUrlToShort(nav_url);
  if (options.layer && !short_url) {
    nav_url = layerUrlToNav(nav_url, options.layerUnderUrl);
  }
  if (!history.state) {
    history.replaceState({i: 0, u: nav_url}, null, short_url);
  } else if (!history.state.u) {
    history.replaceState({i: history.state.i, u: nav_url}, null, short_url);
  } else if (short_url && location.href != short_url) {
    history.replaceState(history.state, null, short_url);
  }

  var $progress = $('#aj_progress'),
      progressBoxShadow = 'inset 0 2px 0 var(--accent-color, #39ade7)',
      progressNoBoxShadow = 'inset 0 0 0 var(--accent-color, #39ade7)',
      progressTransition = 'width .3s linear, box-shadow .2s ease',
      progressTo,
      progressVal = 0;
  $progress.css({
    width: 0,
    transition: progressTransition,
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    height: 3
  });

  var skipPopState = false;
  var curHistoryState = history.state;
  var curLocation = loc(curHistoryState.u);
  var layerCloseLocation = layerCloseLoc(curHistoryState.u);
  var underLayerTitle = document.title;
  var curOnLoad = [], curOnUnload = [];
  var curOnLayerLoad = [], curOnLayerUnload = [];
  var curBeforeUnload = false, curBeforeLayerUnload = false;
  var ajContainer = $('#aj_content');

  console.log('history init', 'curState =', curHistoryState);

  window.Aj = {
    apiUrl: options.apiUrl,
    version: options.version,
    unauth: options.unauth || false,
    onLoad: onLoad,
    onUnload: onUnload,
    onLayerLoad: onLayerLoad,
    onLayerUnload: onLayerUnload,
    pageLoaded: pageLoaded,
    layerLoaded: layerLoaded,
    showProgress: showProgress,
    hideProgress: hideProgress,
    onBeforeUnload: onBeforeUnload,
    onBeforeLayerUnload: onBeforeLayerUnload,
    linkHandler: linkHandler,
    location: _location,
    layerLocation: layerLocation,
    setLocation: setLocation,
    setLayerLocation: setLayerLocation,
    reload: reload,
    apiRequest: apiRequest,
    uploadRequest: uploadRequest,
    needAuth: needAuth,
    ajContainer: ajContainer,
    state: options.state || {},
    layerState: {},
    globalState: {},
    layer: false
  };

  if (options.layer) {
    Aj.layer = $('#layer-popup-container');
    Aj.layerState = options.layerState || {};
    if (options.layerTitle) {
      document.title = options.layerTitle;
    }
  }

  function showProgress() {
    clearTimeout(progressTo);
    if (!progressVal) {
      $progress.css({width: 0, transition: 'none'});
      progressTo = setTimeout(function() {
        $progress.css({transition: progressTransition});
        showProgress();
      }, 50);
    } else {
      progressTo = setTimeout(showProgress, 300);
    }
    $progress.css({width: progressVal + '%', boxShadow: progressBoxShadow});
    progressVal = progressVal + (99 - progressVal) / 4;
  }

  function hideProgress(cancel) {
    clearTimeout(progressTo);
    progressTo = false;
    progressVal = 0;
    $progress.css({width: cancel ? '0%' : '100%'});
    setTimeout(function() {
      $progress.css({boxShadow: progressNoBoxShadow});
    }, 300);
  }

  function apiRequest(method, data, onSuccess) {
    return $.ajax(Aj.apiUrl, {
      type: 'POST',
      data: $.extend(data, {method: method}),
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function(result) {
        if (result._dlog) {
          $('#dlog').append(result._dlog);
        }
        onSuccess && onSuccess(result);
      },
      error: function(xhr) {
        if (!xhr.readyState && !xhr.status) {
          // was aborted
        } else if (xhr.status == 401) {
          location.href = '/auth';
        } else if (xhr.readyState > 0) {
          location.reload();
        }
      }
    });
  }

  function uploadRequest(method, file, params, onSuccess, onProgress) {
    var data = new FormData();
    data.append('file', file, file.name);
    data.append('method', method);
    for (var key in params) {
      data.append(key, params[key]);
    }
    return $.ajax(Aj.apiUrl, {
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      xhrFields: {
        withCredentials: true
      },
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(event) {
          if (event.lengthComputable) {
            onProgress && onProgress(event.loaded, event.total);
          }
        });
        return xhr;
      },
      beforeSend: function(xhr) {
        onProgress && onProgress(0, 1);
      },
      success: function(result) {
        if (result._dlog) {
          $('#dlog').append(result._dlog);
        }
        onSuccess && onSuccess(result);
      },
      error: function(xhr) {
        if (xhr.status == 401) {
          location.href = '/auth';
        } else if (xhr.readyState > 0) {
          onSuccess && onSuccess({error: 'Network error'});
        }
      }
    });
  }

  function loc(href) {
    var url = document.createElement('a');
    url.href = href;
    return url;
  }

  function layerHref(href) {
    var url = document.createElement('a');
    url.href = href;
    var search = url.search;
    if (search.substr(0, 1) == '?') {
      search = search.substr(1);
    }
    var params = search.split('&');
    for (var i = 0; i < params.length; i++) {
      var kv = params[i].split('=');
      if (kv[0] == 'l') {
        return decodeURIComponent(kv[1] || '');
      }
    }
    return null;
  }

  function layerOpenHref(href, l) {
    var url = document.createElement('a');
    url.href = href;
    url.search = url.search.replace(/&l=[^&]*/g, '', url.search);
    url.search = url.search.replace(/(\?)l=[^&]*&|\?l=[^&]*$/g, '$1', url.search);
    url.search += (url.search ? '&' : '?') + 'l=' + encodeURIComponent(l);
    return url.href;
  }

  function layerCloseLoc(href) {
    var url = document.createElement('a');
    url.href = href;
    url.search = url.search.replace(/&l=[^&]*/g, '', url.search);
    url.search = url.search.replace(/(\?)l=[^&]*&|\?l=[^&]*$/g, '$1', url.search);
    return url;
  }

  function layerUrlToShort(href) {
    var url = document.createElement('a');
    url.href = href;
    var match = url.search.match(/(\?|&)l=([^&]*)/);
    if (match) {
      return '/' + decodeURIComponent(match[2]);
    }
    return null;
  }

  function layerUrlToNav(href, cur_loc) {
    if (layerUrlToShort(href)) {
      return href;
    }
    var url = document.createElement('a');
    url.href = href;
    var layer_url = url.pathname.replace(/^\/+|\/+$/g, '');
    return layerOpenHref(cur_loc || '/', layer_url);
  }

  function changeLocation(url, push_state) {
    if (push_state) {
      location.href = url;
    } else {
      location.replace(url);
    }
  }

  function scrollToEl(elem) {
    $(window).scrollTop($(elem).offset().top);
  }

  function scrollToHash(hash) {
    hash = hash || curLocation.hash;
    if (hash[0] == '#') hash = hash.substr(1);
    if (!hash) return;
    var elem = document.getElementById(hash);
    if (elem) {
      return scrollToEl(elem);
    }
    elem = $('a[name]').filter(function() {
      return $(this).attr('name') == hash;
    }).eq(0);
    if (elem.length) {
      scrollToEl(elem);
    }
  }

  function onLoad(func) {
    console.log('added to onLoad');
    curOnLoad.push(func);
  }

  function onUnload(func) {
    console.log('added to onUnload');
    curOnUnload.push(func);
  }

  function onLayerLoad(func) {
    console.log('added to onLayerLoad');
    curOnLayerLoad.push(func);
  }

  function onLayerUnload(func) {
    console.log('added to onLayerUnload');
    curOnLayerUnload.push(func);
  }

  function onBeforeUnload(func) {
    curBeforeUnload = func;
  }

  function onBeforeLayerUnload(func) {
    curBeforeLayerUnload = func;
  }

  function pageLoaded() {
    if (curOnLoad.length) {
      for (var i = 0; i < curOnLoad.length; i++) {
        console.log('onLoad', i);
        curOnLoad[i](Aj.state);
      }
    }
    onUnload(function() {
      $(ajContainer).off('.curPage');
      $(document).off('.curPage');
    });
    $(ajContainer).trigger('page:load');
    if (Aj.layer) {
      layerLoaded();
    }
  }

  function layerLoaded() {
    if (curOnLayerLoad.length) {
      for (var i = 0; i < curOnLayerLoad.length; i++) {
        console.log('onLayerLoad', i);
        curOnLayerLoad[i](Aj.layerState);
      }
    }
    onLayerUnload(function() {
      Aj.layer.off('.curLayer');
    });
    Aj.layer.one('popup:close', function() {
      if (curOnLayerUnload.length) {
        for (var i = 0; i < curOnLayerUnload.length; i++) {
          console.log('onLayerUnload', i);
          curOnLayerUnload[i](Aj.layerState);
        }
      }
      Aj.layer.remove();
      if (underLayerTitle) {
        document.title = underLayerTitle;
      }
      if (layerCloseLocation) {
        setLocation(layerCloseLocation.href);
        layerCloseLocation = false;
      }
      Aj.layer = false;
      Aj.layerState = {};
      curOnLayerLoad = [];
      curOnLayerUnload = [];
    });
    Aj.layer.on('click.curLayer', 'a[data-layer-close]', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closePopup(Aj.layer);
    });
    openPopup(Aj.layer, {
      closeByClickOutside: '.popup-no-close',
      onBeforeClose: function($popup) {
        var unloaded = checkBeforeUnload(function() {
          var options = $popup.data('options');
          options.onBeforeClose = null;
          closePopup($popup);
        });
        return unloaded;
      }
    });
    $(ajContainer).trigger('layer:load');
  }

  function onResult(url, http_code, result, push_state) {
    hideProgress();
    if (http_code != 200 || !result || !result.v || result.v != Aj.version) {
      changeLocation(url, push_state);
      return;
    }
    var url_hash = loc(url).hash;
    if (result.r) {
      var redirect_url = result.r;
      if (url_hash) {
        redirect_url = redirect_url.split('#')[0] + url_hash;
      }
      if (result.hr || !loadPage(loc(redirect_url), push_state)) {
        changeLocation(redirect_url, push_state);
      }
      return;
    }
    var saved_ult = underLayerTitle;
    var saved_lcl = (!Aj.layer || !push_state) ? layerCloseLocation : false;
    underLayerTitle = false;
    layerCloseLocation = false;
    closeAllPopups();
    underLayerTitle = saved_ult;
    layerCloseLocation = saved_lcl;

    if (result.h) {
      if (curOnUnload.length) {
        for (var i = 0; i < curOnUnload.length; i++) {
          console.log('onUnload', i);
          curOnUnload[i](Aj.state);
        }
      }
      if (push_state) {
        if (result.l) {
          url = layerUrlToNav(url);
        }
        setLocation(url);
      }
      Aj.state = {};
      curOnLoad = [];
      curOnUnload = [];
      if (result.t) {
        document.title = result.t;
        underLayerTitle = document.title;
      }
      if (result.h) {
        ajContainer.html(result.h);
      }
      if (result.s) {
        $.extend(Aj.state, result.s);
      }
      document.documentElement.className = result.rc || '';
      if (result._dlog) {
        $('#dlog').html(result._dlog);
      }
      if (push_state || !Aj._useScrollHack) {
        $(window).scrollTop(0);
      }
      unfreezeBody();
      if (url_hash) {
        scrollToHash();
      }
      if (result.l) {
        Aj.layer = $('<div class="popup-container hide" id="layer-popup-container"></div>');
        Aj.layerState = {};
        curOnLayerLoad = [];
        curOnLayerUnload = [];
        if (result.lt) {
          document.title = result.lt;
        }
        if (result.ls) {
          $.extend(Aj.layerState, result.ls);
        }
        Aj.layer.html(result.l).appendTo(document.body);
      }
      if (result.j) {
        window.execScript ? window.execScript(result.j) : eval(result.j);
      }
      pageLoaded();
      return;
    } else if (result.l) {
      if (push_state) {
        url = layerUrlToNav(url);
        setLocation(url);
      }
      if (result.s) {
        $.extend(Aj.state, result.s);
      }
      if (result._dlog) {
        $('#dlog').html(result._dlog);
      }
      Aj.layer = $('<div class="popup-container hide" id="layer-popup-container"></div>');
      Aj.layerState = {};
      curOnLayerLoad = [];
      curOnLayerUnload = [];
      if (result.lt) {
        document.title = result.lt;
      }
      if (result.ls) {
        $.extend(Aj.layerState, result.ls);
      }
      Aj.layer.html(result.l).appendTo(document.body);
      if (result.j) {
        window.execScript ? window.execScript(result.j) : eval(result.j);
      }
      layerLoaded();
      return;
    }
    return changeLocation(url, push_state);
  }

  function loadPage(link, push_state, state_go) {
    var url = link.href;
    var cur_url = curLocation.href;
    var cur_ref = curLocation.origin + curLocation.pathname + curLocation.search;
    if (link.origin != curLocation.origin) {
      return false;
    }
    if (link.pathname == curLocation.pathname &&
        link.search == curLocation.search &&
        link.hash != curLocation.hash) {
      return false;
    }
    if (url == cur_url) {
      push_state = false;
    }
    var load_fn, interrupted = false;
    load_fn = function() {
      if (!push_state) {
        if (interrupted) {
          historyJump(state_go);
        }
        curLocation = loc(url);
        layerCloseLocation = layerCloseLoc(url);
      }
      if (interrupted && Aj.layer) {
        var options = Aj.layer.data('options');
        options.onBeforeClose = null;
      }
      showProgress();
      $.ajax(url, {
        dataType: 'json',
        xhrFields: {withCredentials: true},
        headers: {'X-Aj-Referer': cur_ref},
        success: function(result, t, xhr) {
          onResult(url, xhr.status, result, push_state);
        },
        error: function(xhr) {
          onResult(url, xhr.status, false, push_state);
        }
      });
    };
    interrupted = !checkBeforeUnload(load_fn);
    if (interrupted && !push_state) {
      historyJump(-state_go);
    }
    return true;
  }

  function _location(href, replace) {
    if (typeof href !== 'undefined') {
      var url = loc(href);
      var push_state = !replace;
      if (!loadPage(url, push_state)) {
        changeLocation(url, push_state);
      }
    } else {
      return loc(curLocation.href);
    }
  }

  function layerLocation(layer_url) {
    if (typeof layer_url !== 'undefined') {
      var layer_href = layerOpenHref(curLocation, layer_url);
      loadPage(loc(layer_href), true);
    } else {
      return layerHref(curLocation.href);
    }
  }

  function setLocation(href, replace = false) {
    var url = loc(href).href;
    var short_url = layerUrlToShort(url) || url;
    if (replace) {
      history.replaceState({i: curHistoryState.i, u: url}, null, short_url);
      console.log('history replace', 'oldState =', curHistoryState, 'newState =', history.state);
    } else {
      history.pushState({i: curHistoryState.i + 1, u: url}, null, short_url);
      console.log('history push', 'oldState =', curHistoryState, 'newState =', history.state);
    }
    curHistoryState = history.state;
    curLocation = loc(curHistoryState.u);
    layerCloseLocation = layerCloseLoc(curHistoryState.u);
  }

  function setLayerLocation(layer_url) {
    layer_url = layer_url.toString().replace(/^\/+|\/+$/g, '');
    var layer_href = layerOpenHref(curLocation, layer_url);
    var url = loc(layer_href).href;
    var short_url = layerUrlToShort(url) || url;
    history.pushState({i: curHistoryState.i + 1, u: url}, null, short_url);
    console.log('history push', 'oldState =', curHistoryState, 'newState =', history.state);
    curHistoryState = history.state;
    curLocation = loc(curHistoryState.u);
  }

  function reload() {
    _location(_location(), true);
  }

  function historyJump(delta) {
    if (delta) {
      skipPopState = true;
      history.go(delta);
    }
  }

  function needAuth() {
    if (Aj.unauth) {
      openPopup('#login-popup-container');
      return true;
    }
    return false;
  }

  function linkHandler(e) {
    if (e.metaKey || e.ctrlKey) return true;
    var href = this.href;
    if (this.hasAttribute('data-unsafe') &&
        href != $(this).text()) {
      var $confirm = showConfirm(l('WEB_OPEN_LINK_CONFIRM', {url: cleanHTML(href)}, 'Do you want to open <b>{url}</b>?'), null, l('WEB_OPEN_LINK', 'Open'));
      $('.popup-primary-btn', $confirm).attr({
        href: href,
        target: $(this).attr('target'),
        rel: $(this).attr('rel')
      });
      return false;
    }
    if ($(this).attr('target') == '_blank') return true;
    if (this.hasAttribute('data-layer')) {
      href = layerUrlToNav(href, curLocation);
    }
    if ($(this).hasClass('need-auth') && needAuth() ||
        loadPage(loc(href), true)) {
      e.preventDefault();
    }
  }

  function beforeUnloadHandler(e) {
    var message = null;
    if (Aj.layer && curBeforeLayerUnload) {
      message = curBeforeLayerUnload();
    }
    if (!message && curBeforeUnload) {
      message = curBeforeUnload();
    }
    if (message) {
      if (typeof e === 'undefined') e = window.e;
      if (e) e.returnValue = message;
      return message;
    }
  }
  function checkBeforeUnload(load_fn) {
    var message = null;
    if (Aj.layer && curBeforeLayerUnload) {
      message = curBeforeLayerUnload();
    }
    if (!message && curBeforeUnload) {
      message = curBeforeUnload();
    }
    var load_func = function() {
      curBeforeLayerUnload = false;
      curBeforeUnload = false;
      load_fn();
    };
    if (message) {
      var message_html = $('<div>').text(message).html();
      showConfirm(message_html, load_func, l('WEB_LEAVE_PAGE', 'Leave'));
      return false;
    } else {
      load_func();
      return true;
    }
  }

  $(document).on('click', 'a[href]', linkHandler);
  $(document.body).removeClass('no-transition');

  $(window).on('popstate', function(e) {
    var popstate = e.originalEvent.state;
    var state_go = popstate ? (popstate.i - curHistoryState.i) : 0;
    if (!popstate) {
      popstate = {i: 0, u: location.href};
    } else if (!popstate.u) {
      popstate.u = location.href;
    }
    console.log('history popstate', 'oldState =', curHistoryState, 'newState =', popstate, 'go(' + state_go + ')');
    curHistoryState = popstate;
    if (skipPopState) {
      skipPopState = false;
      return;
    }
    if (Aj._useScrollHack) {
      freezeBody();
    }
    var link = loc(curHistoryState.u);
    var loaded = loadPage(link, false, state_go);
    if (!loaded && Aj._useScrollHack) {
      unfreezeBody();
    }
  });
  window.onbeforeunload = beforeUnloadHandler;
}

function freezeBody() {
  $('body').css({height: '1000000px', overflow: 'hidden'}); // for correct scroll restoration
  $(Aj.ajContainer).css({position: 'fixed', width: '100%', top: -$(window).scrollTop() + 'px', left: -$(window).scrollLeft() + 'px'});
}

function unfreezeBody() {
  $(Aj.ajContainer).css({position: '', width: '', top: '', left: ''});
  $('body').css({height: '', overflow: ''});
}

function updateNavBar() {
  var $nav_menu = $('.nav-menu');
  $nav_menu.addClass('nav-menu-can-fix');
  if ($nav_menu.css('position') == 'fixed') {
    $nav_menu.width($nav_menu.parent().width());
  } else {
    $nav_menu.css('width', 'auto');
  }
}

function getBR() {
  if (window._brHTML) return window._brHTML;
  return window._brHTML = $('<div><br/></div>').html();
}

function cleanHTML(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, getBR());
}

function cleanRE(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

var Keys = {
  BACKSPACE: 8,
  ESC: 27,
  TAB: 9,
  RETURN: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  on: function(key, callback) {
    return function(e){ if(e.which == key) callback.apply(this, Array.prototype.slice.apply(arguments)); };
  }
};

var Popups = [];

function openPopup(popup, options) {
  if (!popup) return false;
  options = options || {};
  var $popup = $(popup);
  var popup_id = $popup.data('puid');
  if (!popup_id) {
    if (!Popups._pid) Popups._pid = 0;
    popup_id = ++Popups._pid;
    $popup.data('puid', popup_id).addClass('aj_popup');
  }
  $popup.data('options', options);
  var closeOutside = $popup.attr('data-close-outside');
  if (closeOutside && !options.closeByClickOutside) {
    options.closeByClickOutside = '.' + closeOutside;
  }
  var i = Popups.indexOf(popup_id);
  if (i >= 0) {
    Popups.splice(i, 1);
  }
  Popups.push(popup_id);
  $('body').css('overflow', 'hidden');
  if (!options.noAppend) {
    $popup.appendTo(window.Aj && Aj.ajContainer || 'body').redraw();
  }
  $popup.one('transitionend transitioncancel', function() {
    $popup.trigger('popup:opencomplete');
  });
  $popup.removeClass('hide');
  if (document.activeElement) {
    document.activeElement.blur();
  }
  if (options.onOpen) {
    $popup.one('popup:open', options.onOpen);
  }
  if (options.onOpenComplete) {
    $popup.one('popup:opencomplete', options.onOpenComplete);
  }
  if (options.onClose) {
    $popup.one('popup:close', options.onClose);
  }
  if (options.onCloseComplete) {
    $popup.one('popup:closecomplete', options.onCloseComplete);
  }
  if (options.closeByClickOutside) {
    $popup.on('click', function(e) {
      if ($(e.target).closest('body').length &&
         !$(e.target).closest(options.closeByClickOutside).length) {
        closePopup($popup);
      }
    });
  }
  $('.popup-cancel-btn', $popup).on('click', function(e) {
    closePopup($popup);
  });
  $popup.trigger('popup:open');
}

function getPopupById(popup_id) {
  var $popups = $('.aj_popup');
  var found = false;
  for (var i = 0; i < $popups.length; i++) {
    $popup = $popups.eq(i);
    if (popup_id == $popup.data('puid')) {
      return $popup;
    }
  }
  return false;
}

function closePopup(popup) {
  if (!Popups.length) return false;
  var $popup, popup_id;
  if (popup) {
    $popup = $(popup);
    popup_id = $popup.data('puid');
  } else {
    popup_id = Popups[Popups.length - 1];
    $popup = getPopupById(popup_id);
    if (!$popup) {
      return false;
    }
  }
  var options = $popup.data('options') || {};
  if (options.onBeforeClose) {
    var result = options.onBeforeClose($popup);
    if (result === false) {
      return false;
    }
  }
  var i = Popups.indexOf(popup_id);
  if (i >= 0) {
    Popups.splice(i, 1);
  }
  if (!Popups.length) {
    $('body').css('overflow', '');
  }
  if (options.closeByClickOutside) {
    $popup.off('click');
  }
  $('.popup-cancel-btn', $popup).off('click');
  $popup.one('transitionend transitioncancel', function() {
    $popup.trigger('popup:closecomplete');
  });
  $popup.addClass('hide');
  $popup.trigger('popup:close');
}

function closeAllPopups() {
  for (var i = Popups.length - 1; i >= 0; i--) {
    var $popup = getPopupById(Popups[i]);
    if ($popup) {
      closePopup($popup);
    }
  }
}

function showAlert(html, options) {
  options = options || {};
  var $alert = $('<div class="popup-container hide alert-popup-container"><div class="popup"><div class="popup-body"><section><p class="popup-text"></p><div class="popup-buttons">' + (options.second_btn ? '<a' + (options.second_btn_href ? ' href="' + options.second_btn_href + '"' : '') + ' class="btn btn-link btn-lg">' + options.second_btn + '</a>' : '') + '<a class="btn btn-link btn-lg popup-cancel-btn">' + (options.close_btn || l('WEB_CLOSE', 'Close')) + '</a></div></section></div></div></div>');
  var onEnterPress = function(e) {
    if (e.keyCode == Keys.RETURN) {
      e.stopImmediatePropagation();
      closePopup($alert);
    }
  };
  $('.popup-text', $alert).html(html);
  $(document).on('keydown', onEnterPress);
  $alert.one('popup:close', function() {
    $(document).off('keydown', onEnterPress);
    $alert.remove();
  });
  openPopup($alert);
  return $alert;
}

function showConfirm(html, onConfirm, confirm_btn, onCancel, cancel_btn) {
  var $confirm = $('<div class="popup-container hide alert-popup-container"><div class="popup"><div class="popup-body"><section><p class="popup-text"></p><div class="popup-buttons"><a class="btn btn-link btn-lg popup-cancel-btn">' + (cancel_btn || l('WEB_CANCEL', 'Cancel')) + '</a><a class="btn btn-link btn-lg popup-primary-btn">' + (confirm_btn || l('WEB_OK', 'OK')) + '</a></div></section></div></div></div>');
  var confirm = function() {
    onConfirm && onConfirm($confirm);
    closePopup($confirm);
  }
  var onEnterPress = function(e) {
    if (e.keyCode == Keys.RETURN) {
      e.stopImmediatePropagation();
      confirm();
    }
  };
  $('.popup-text', $confirm).html(html);
  var $primaryBtn = $('.popup-primary-btn', $confirm);
  $primaryBtn.on('click', confirm);
  if (onCancel) {
    var cancel = function(){ onCancel($confirm); };
    var $cancelBtn = $('.popup-cancel-btn', $confirm);
    $cancelBtn.on('click', cancel);
  }
  $(document).on('keydown', onEnterPress);
  $confirm.one('popup:close', function() {
    $primaryBtn.off('click', confirm);
    if (onCancel) {
      $cancelBtn.off('click', cancel);
    }
    $(document).off('keydown', onEnterPress);
    $confirm.remove();
  });
  openPopup($confirm);
  return $confirm;
}

function showMedia(src, is_video, options) {
  var media_html = (is_video ? '<video class="media media-video ohide" autoplay' + (options.is_gif ? ' loop playsinline' : ' controls') + '></video>' : '<div class="media media-photo ohide"></div>') + (options.add_media_html || '');
  var title_html = options.title ? '<div class="media-title-wrap"><div class="media-title">' + options.title + '</div></div>' : '';
  var pagination_html = options.pagination ? '<div class="media-counter-wrap"><div class="media-prev-btn"></div><div class="media-counter">' + (options.pagination.num + 1) + ' / ' + options.pagination.total + '</div><div class="media-next-btn"></div></div>' : '';
  var $popup = $('<div class="popup-container hide media-popup-container">' + title_html + pagination_html + '<div class="media-popup-wrap popup-no-close file-loading"><div class="media-popup-cover ohide">' + media_html + '<svg class="circle-progress-wrap ohide" viewport="0 0 66 66" width="66px" height="66px"><circle class="circle-progress-bg" cx="50%" cy="50%"></circle><circle class="circle-progress infinite" cx="50%" cy="50%" stroke-dashoffset="106"></circle></svg></div></div></div>');
  var media = {
    $wrap:    $('.media-popup-wrap', $popup),
    $cover:   $('.media-popup-cover', $popup),
    $pwrap:   $('.circle-progress-wrap', $popup),
    $media:   $('.media', $popup),
    width:    null,
    height:   null,
    cover:    null,
    timeout:  null,
    checkMediaSize: function() {
      if (is_video) {
        var video = media.mediaEl;
        if (video.videoWidth && video.videoHeight) {
          media.width  = video.videoWidth;
          media.height = video.videoHeight;
          media.$media.removeClass('ohide');
          media.$wrap.removeClass('file-loading').addClass('file-loaded');
          media.onResize();
          return;
        }
      } else {
        var img = media.mediaEl;
        if (img.naturalWidth && img.naturalHeight) {
          media.width  = img.naturalWidth;
          media.height = img.naturalHeight;
          media.onResize();
          return;
        }
      }
      media.timeout = setTimeout(media.checkMediaSize, 50);
    },
    onResize: function() {
      if (!media.width || !media.height) {
        return;
      }
      var w = media.width, h = media.height;
      var de = document.documentElement;
      var vw = de.clientWidth, vh = de.clientHeight;
      vw -= parseInt($popup.css('paddingLeft') || 0)
          + parseInt($popup.css('paddingRight') || 0)
          + parseInt(media.$wrap.css('paddingRight') || 0);
      vh -= parseInt($popup.css('paddingTop') || 0)
          + parseInt($popup.css('paddingBottom') || 0)
          + parseInt(media.$wrap.css('paddingBottom') || 0);
      var min_vw = Math.max(320, vw);
      var min_vh = Math.max(320, vh);
      var sw = w / min_vw;
      var sh = h / min_vh;
      var s = Math.max(sw, sh);
      var iw = w / s, ih = h / s;
      if (!is_video) {
        var can_zoom = (s > 1);
        if (!can_zoom || $popup.hasClass('fullsize')) {
          var iw = w, ih = h;
        }
        $popup.toggleClass('can-zoom', can_zoom);
      }
      var scroll_x = iw > vw;
      var scroll_y = ih > vh;
      $popup.toggleClass('scroll-x', scroll_x);
      $popup.toggleClass('scroll-y', scroll_y);
      media.$media.width(iw);
      media.$media.height(ih);
    },
    onLoad: function() {
      if (!is_video) {
        media.$media.css('background-image', "url('" + media.mediaEl.src + "')");
        media.$media.removeClass('ohide');
        media.$wrap.removeClass('ohide').removeClass('file-loading').addClass('file-loaded');
        media.onResize();
      }
    },
    onZoomInOut: function(e) {
      if (!is_video) {
        var photo = media.$media.get(0);
        var dx, dy, px, py, sx, sy, rect;
        rect = photo.getBoundingClientRect();
        dx = e.clientX - rect.left;
        dy = e.clientY - rect.top;
        px = dx / rect.width;
        py = dy / rect.height;
        $popup.toggleClass('fullsize');
        media.onResize();
        rect = photo.getBoundingClientRect();
        dx = px * rect.width;
        dy = py * rect.height;
        sx = e.clientX - dx - rect.left - $popup.scrollLeft();
        sy = e.clientY - dy - rect.top - $popup.scrollTop();
        $popup.scrollLeft(-sx);
        $popup.scrollTop(-sy);
      }
    },
    onKeysPress: function(e) {
      if (e.keyCode == Keys.LEFT) {
        media.onPrevMedia(e);
      } else if (e.keyCode == Keys.RIGHT) {
        media.onNextMedia(e);
      } else if (e.keyCode == Keys.UP) {
        media.onPrevMediaGroup(e);
      } else if (e.keyCode == Keys.DOWN) {
        media.onNextMediaGroup(e);
      }
    },
    onPrevMedia: function(e) {
      if (options.pagination && options.pagination.prev) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closePopup($popup);
        options.pagination.prev();
      }
    },
    onNextMedia: function(e) {
      if (options.pagination && options.pagination.next) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closePopup($popup);
        options.pagination.next();
      }
    },
    onPrevMediaGroup: function(e) {
      if (options.pagination && options.pagination.prevGroup) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closePopup($popup);
        options.pagination.prevGroup();
      }
    },
    onNextMediaGroup: function(e) {
      if (options.pagination && options.pagination.nextGroup) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closePopup($popup);
        options.pagination.nextGroup();
      }
    }
  };
  if (is_video) {
    media.mediaEl = media.$media.get(0);
  } else {
    media.mediaEl = new Image();
    media.mediaEl.onload = media.onLoad;
    media.$wrap.on('click', media.onZoomInOut);
  }
  if (options.pagination) {
    $('.media-prev-btn', $popup).on('click', media.onPrevMedia);
    $('.media-next-btn', $popup).on('click', media.onNextMedia);
    $(document).on('keydown', media.onKeysPress);
  }
  $(window).on('resize', media.onResize);
  media.checkMediaSize();
  $popup.one('popup:close', function() {
    if (!is_video) {
      media.$media.off('click', media.onZoomInOut);
    }
    if (options.pagination) {
      $('.media-prev-btn', $popup).off('click', media.onPrevMedia);
      $('.media-next-btn', $popup).off('click', media.onNextMedia);
      $(document).off('keydown', media.onKeysPress);
    }
    $(window).off('resize', media.onResize);
    clearTimeout(media.timeout);
    $popup.remove();
  });
  openPopup($popup, {
    closeByClickOutside: '.popup-no-close',
  });
  if (options.width && options.height && options.cover) {
    media.width  = parseInt(options.width);
    media.height = parseInt(options.height);
    media.cover  = options.cover;
    media.$cover.css('background-image', "url('" + media.cover + "')").removeClass('ohide');
    media.onResize();
  }
  setTimeout(function() {
    media.$pwrap.get(0).classList.remove('ohide');
  }, 250);
  media.mediaEl.src = src;
  return $popup;
}

function showPhoto(image_src, options) {
  showMedia(image_src, false, options);
}

function showVideo(video_src, options) {
  showMedia(video_src, true, options);
}

function showToast(html, delay) {
  var $toast = $('<div class="toast-container ohide"><div class="toast"></div></div>');
  $('.toast', $toast).html(html);
  var to, close = function() {
    clearTimeout(to);
    $toast.fadeHide();
    setTimeout(function() { $toast.remove(); }, 200);
  };
  $toast.appendTo('body').redraw().fadeShow();
  $(document).one('mousedown touchstart', close);
  to = setTimeout(close, delay || 2000);
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
    if (params.__format_number && window.formatNumber) {
      var decimals = params.__format_number === true ? 0 : params.__format_number;
      number = formatNumber(number, decimals, '.', ',');
    }
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
    if (params.__format_number && window.formatNumber) {
      var decimals = params.__format_number === true ? 0 : params.__format_number;
      number = formatNumber(number, decimals, '.', ',');
    }
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

function redraw(el) {
  el.offsetTop + 1;
}

$(document).on('keydown', function(e) {
  if (e.keyCode == Keys.ESC && Popups.length > 0) {
    var last_popup_id = Popups[Popups.length - 1];
    var $popup = getPopupById(last_popup_id);
    if ($popup && !$popup.hasClass('popup-ignore-esc')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      closePopup($popup);
    }
  }
});

$(document).on('keydown', 'textarea', function(e) {
  if (e.keyCode == Keys.RETURN && (e.metaKey || e.ctrlKey)) {
    $(this.form).submit();
  }
});

(function($) {
  function onTextRippleStart(evt) {
    var e = evt.originalEvent;
    if (document.activeElement === this) return;
    var rect = this.getBoundingClientRect();
    if (e.type == 'touchstart') {
      var clientX = e.targetTouches[0].clientX;
    } else {
      var clientX = e.clientX;
    }
    var ripple = this.parentNode.querySelector('.textfield-item-underline');
    var rippleX = (clientX - rect.left) / this.offsetWidth * 100;
    ripple.style.transition = 'none';
    redraw(ripple);
    ripple.style.left = rippleX + '%';
    ripple.style.right = (100 - rippleX) + '%';
    redraw(ripple);
    ripple.style.left = '';
    ripple.style.right = '';
    ripple.style.transition = '';
  }
  function onRippleStart(evt) {
    var e = evt.originalEvent;
    var rippleMask = this.querySelector('.ripple-mask');
    if (!rippleMask) return;
    var rect = rippleMask.getBoundingClientRect();
    if (e.type == 'touchstart') {
      var clientX = e.targetTouches[0].clientX;
      var clientY = e.targetTouches[0].clientY;
    } else {
      var clientX = e.clientX;
      var clientY = e.clientY;
    }
    var rippleX = (clientX - rect.left) - rippleMask.offsetWidth / 2;
    var rippleY = (clientY - rect.top) - rippleMask.offsetHeight / 2;
    var ripple = this.querySelector('.ripple');
    ripple.style.transition = 'none';
    redraw(ripple);
    ripple.style.transform = 'translate3d(' + rippleX + 'px, ' + rippleY + 'px, 0) scale3d(0.2, 0.2, 1)';
    ripple.style.opacity = 1;
    redraw(ripple);
    ripple.style.transform = 'translate3d(' + rippleX + 'px, ' + rippleY + 'px, 0) scale3d(1, 1, 1)';
    ripple.style.transition = '';

    function onRippleEnd(e) {
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
  $.fn.initRipple = function() {
    return this.map(function(){
      $(this).off('.ripple');
      $(this).on('mousedown.ripple touchstart.ripple', '.textfield-item input.form-control', onTextRippleStart);
      $(this).on('mousedown.ripple touchstart.ripple', '.ripple-handler', onRippleStart);
      return this;
    });
  };
  $.fn.destroyRipple = function() {
    return this.map(function(){
      $(this).off('.ripple');
      return this;
    });
  };
})(jQuery);
$(document).initRipple();

Function.prototype.pbind = function() {
  var func = this, args = Array.prototype.slice.apply(arguments);
  return function() {
    return func.apply(this, args.concat(Array.prototype.slice.apply(arguments)));
  }
}

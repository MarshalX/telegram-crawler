var startTime = +(new Date());
function dT() {
  return '[' + ((+(new Date()) - startTime)/ 1000.0) + '] ';
}

var jsonpCallbacks = [];
function twitterCustomShareInit () {
  var btns = document.querySelectorAll
                ? document.querySelectorAll('.tl_twitter_share_btn')
                : [document.getElementById('tl_twitter_share_btn')];

  if (!btns.length) {
    return;
  }
  var head = document.getElementsByTagName('head')[0], i, script;
  for (i = 0; i < btns.length; i++) {
    (function (btn) {
      var status = btn.getAttribute('data-text'),
          url = btn.getAttribute('data-url') || location.toString() || 'https://telegram.org/',
          via = btn.getAttribute('data-via'),
          urlEncoded = encodeURIComponent(url),
          popupUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(status) + '&url=' + urlEncoded + '&via=' + encodeURIComponent(via);

      btn.setAttribute('href', popupUrl);
      btn.href = popupUrl;

      btn.addEventListener('click', function (e) {
        var popupW = 550,
            popupH = 450,
            params = [
              'width=' + popupW,
              'height=' + popupH,
              'left=' + Math.round(screen.width / 2 - popupW / 2),
              'top=' + Math.round(screen.height / 2 - popupH / 2),
              'personalbar=0',
              'toolbar=0',
              'scrollbars=1',
              'resizable=1'
            ].join(','),
            popup = window.open(popupUrl, '_blank', params);

        if (popup) {
          try {
            popup.focus();
          } catch (e) {}
        }

        return cancelEvent(e);
      }, false);
    })(btns[i]);
  }
}

function blogRecentNewsInit () {
  if (document.querySelectorAll) {
    var sideImages = document.querySelectorAll('.blog_side_image_wrap');
    var sideImage, parent, i;
    var len = len = sideImages.length;
    for (i = 0; i < len; i++) {
      sideImage = sideImages[i];
      parent = sideImage.parentNode.parentNode;
      if (parent) {
        parent.insertBefore(sideImage, parent.firstChild);
      }
    }
  }

  var moreBtn = document.getElementById('tlb_blog_head_more_link');
  if (!moreBtn) {
    return false;
  }

  var activeClassName = 'tlb_blog_head_recent_active';
  moreBtn.addEventListener('click', function (event) {
    var parent = this.parentNode;
    var className = parent.className;
    if (className.indexOf(activeClassName) == -1) {
      className += ' ' + activeClassName;
    } else {
      className = className.replace(' ' + activeClassName, '');
    }
    parent.className = className;

    return cancelEvent(event);
  });
}

function blogSideImageUpdate(argument) {
  var isDesktop = document.documentElement.offsetWidth >= 1000
  document.querySelectorAll('.blog_side_image_wrap').forEach(function (imageWrap) {
    if (isDesktop) {
      var titleHeight = imageWrap.parentNode.previousElementSibling.clientHeight;
      var beforeTitleEl = imageWrap.parentNode.previousElementSibling.previousElementSibling;
      if (beforeTitleEl) {
        titleHeight += beforeTitleEl.clientHeight;
      }
      imageWrap.firstElementChild.style.marginTop = (-titleHeight - 8) + 'px';
    } else {
      imageWrap.firstElementChild.style.marginTop = '';
    }
  })
}

function blogSideImageInit() {
  window.addEventListener('resize', blogSideImageUpdate, false);
  setTimeout(blogSideImageUpdate, 0);
}

function cancelEvent (event) {
  event = event || window.event;
  if (event) event = event.originalEvent || event;

  if (event.stopPropagation) event.stopPropagation();
  if (event.preventDefault) event.preventDefault();

  return false;
}

function trackDlClick (element, event) {
  var href = element.getAttribute('href'),
      track = element.getAttribute('data-track') || false;

  if (!track || !window.ga) {
    return;
  }

  var trackData = track.toString().split('/');

  ga('send', 'event', trackData[0], trackData[1], href);

  if ((element.getAttribute('target') || '').toLowerCase() != '_blank') {
    setTimeout(function() { location.href = href; }, 200);
    return false;
  }
}

var toTopWrapEl,
    toTopEl,
    pageContentWrapEl,
    curVisible,
    curShown = false;
function backToTopInit (labelHtml) {
  pageContentWrapEl = document.getElementById('dev_page_content_wrap');
  if (!pageContentWrapEl) {
    return false;
  }
  var t = document.createElement('div');

  t.innerHTML = '<div class="back_to_top"><i class="icon icon-to-top"></i>' + labelHtml + '</div>';
  toTopEl = t.firstChild;
  t.innerHTML = '<a class="back_to_top_wrap' + (pageContentWrapEl.classList.contains('is_rtl') ? ' is_rtl' : '') + '" onclick="backToTopGo()"></a>';
  toTopWrapEl = t.firstChild;

  toTopWrapEl.appendChild(toTopEl);
  document.body.appendChild(toTopWrapEl);

  if (window.addEventListener) {
    window.addEventListener('resize', backToTopResize, false);
    window.addEventListener('scroll', backToTopScroll, false);
  }
  backToTopResize();
}

function backToTopGo () {
  window.scroll(0, 0);
  backToTopScroll();
}

function backToTopResize () {
  var left = getXY(pageContentWrapEl)[0],
      dwidth = Math.max(window.innerWidth, document.documentElement.clientWidth, 0),
      dheight = Math.max(window.innerHeight, document.documentElement.clientHeight);

  curVisible = pageContentWrapEl && left > 130 && dwidth > 640;
  toTopWrapEl.style.width = left + 'px';
  toTopEl.style.height = dheight + 'px';
  backToTopScroll();
}

function backToTopScroll () {
  var st = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || document.documentElement.scrollTop;
  if ((st > 400 && curVisible) != curShown) {
    curShown = !curShown;
    if (curShown) {
      toTopWrapEl.classList.add('back_to_top_shown');
    } else {
      toTopWrapEl.classList.remove('back_to_top_shown');
    }
  }
}

function removePreloadInit() {
  if (window.addEventListener) {
    window.addEventListener('load', function () {
      document.body.classList.remove('preload');
    }, false);
  } else {
    setTimeout(function () {
      document.body.classList.remove('preload');
    }, 1000)
  }
}

function getXY (obj) {
  if (!obj) return [0, 0];

  var left = 0, top = 0;
  if (obj.offsetParent) {
    do {
      left += obj.offsetLeft;
      top += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
  return [left, top];
}


var onDdBodyClick,
    currentDd;
function dropdownClick (element, event) {
  var parent = element.parentNode;
  var isOpen = (parent.className || '').indexOf('open') > 0;
  if (currentDd && currentDd != parent) {
    dropdownHide(currentDd);
  }
  if (!isOpen) {
    parent.className = (parent.className || '') + ' open';
    if (!onDdBodyClick) {
      window.addEventListener('click', dropdownPageClick, false);
    }
    currentDd = parent;
  } else {
    dropdownHide(currentDd);
    currentDd = false;
  }
  event.cancelBubble = true;
  return false;
}

function dropdownHide (parent) {
  parent.className = parent.className.replace(' open', '');
}

function dropdownPageClick (event) {
  if (currentDd) {
    dropdownHide(currentDd);
    currentDd = false;
  }
}

function escapeHTML (html) {
  html = html || '';
  return html.replace(/&/g, '&amp;')
             .replace(/>/g, '&gt;')
             .replace(/</g, '&lt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&apos;');
}

function videoTogglePlay(el) {
  if (el.paused) {
    el.play();
  } else {
    el.pause();
  }
}

function getDevPageNav() {
  // console.time('page nav');
  var menu = $('<ul class="nav navbar-nav navbar-default"></ul>');
  var lastLi = false;
  var items = 0;
  $('a.anchor').each(function (k, anchor) {
    var parentTag = anchor.parentNode.tagName;
    var matches = parentTag.match(/^h([34])$/i);
    var anchorName = anchor.name;
    if (!matches || !anchorName) {
      return;
    }
    anchor.id = anchor.name;
    var level = parseInt(matches[1]);
    var li = $('<li><a href="#'+ anchorName +'" data-target="#'+ anchorName +'" onmouseenter="showTitleIfOverflows(this)">' + escapeHTML(anchor.nextSibling.textContent) + '</a></li>');
    if (level == 3) {
      li.appendTo(menu);
      lastLi = li;
    } else {
      // console.log(lastLi);
      if (!lastLi) {
        return;
      }
      var subMenu = $('ul', lastLi)[0] || $('<ul class="nav"></ul>').appendTo(lastLi);
      // console.log(subMenu);
      li.appendTo(subMenu);
    }
    items++;
  });
  // console.log(items, menu);
  // console.timeEnd('page nav');
  if (items < 2) {
    return false;
  }

  return menu;
}

function showTitleIfOverflows(element) {
  if (element &&
      element.innerText &&
      element.scrollWidth &&
      element.offsetWidth &&
      element.offsetWidth < element.scrollWidth) {
    element.setAttribute('title', element.innerText);
  }
  else if (element.removeAttribute) {
    element.removeAttribute('title');
  }
}

function initDevPageNav() {
  window.hasDevPageNav = true;
  var menu = getDevPageNav();
  if (!menu) {
    return;
  }
  var sideNavCont = $('#dev_side_nav_cont');
  if (!sideNavCont.length) {
    sideNavCont = $('#dev_page_content_wrap');
  }
  var sideNavWrap = $('<div class="dev_side_nav_wrap"></div>').prependTo(sideNavCont);
  var sideNav = $('<div class="dev_side_nav"></div>').appendTo(sideNavWrap);
  menu.appendTo(sideNav);
  $('body').css({position: 'relative'}).scrollspy({ target: '.dev_side_nav' });

  $('body').on('activate.bs.scrollspy', function () {
    $('.dev_side_nav > ul').affix('checkPosition');
    var active_el = $('.dev_side_nav li.active').get(-1);
    if (active_el) {
      if (active_el.scrollIntoViewIfNeeded) {
        active_el.scrollIntoViewIfNeeded();
      } else if (active_el.scrollIntoView) {
        active_el.scrollIntoView(false);
      }
    }
  });
  $('body').trigger('activate.bs.scrollspy');

  updateMenuAffix(menu);
}

function updateDevPageNav() {
  if (!window.hasDevPageNav) {
    return;
  }
  var menu = getDevPageNav() || $('<ul></ul>');
  $('.dev_side_nav > ul').replaceWith(menu);
  $('body').scrollspy('refresh');
  updateMenuAffix(menu);
}

function updateMenuAffix(menu) {
  menu.affix({
    offset: {
      top: function () {
        return $('.dev_side_nav_wrap').offset().top;
      },
      bottom: function () {
        return (this.bottom = $('.footer_wrap').outerHeight(true) + 20)
      }
    }
  })
}


function initScrollVideos(desktop) {
  var videos = document.querySelectorAll
                ? document.querySelectorAll('video.tl_blog_vid_autoplay')
                : [];

  window.pageVideos = Array.prototype.slice.apply(videos);
  if (!pageVideos.length) {
    return;
  }
  window.pageVideosPlaying = {};

  var index = 1;
  var tgStickersCnt = document.querySelectorAll('.js-tgsticker_image').length;
  var preloadVideos = tgStickersCnt > 1 ? 0 : (tgStickersCnt ? 1 : 2);
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  for (var i = 0; i < pageVideos.length; i++) {
    var videoEl = pageVideos[i];
    videoEl.setAttribute('vindex', index++);
    var preloadValue = i >= preloadVideos ? (isSafari ? 'none' : 'metadata') : 'auto';
    videoEl.setAttribute('preload', preloadValue);
    videoEl.preload = preloadValue;
    if (desktop) {
      videoEl.removeAttribute('controls');
      videoEl.autoplay = false;
      videoEl.removeAttribute('autoplay');
    } else {
      videoEl.autoplay = true;
      videoEl.playsinline = true;
      videoEl.setAttribute('autoplay', 'autoplay');
      videoEl.setAttribute('playsinline', 'playsinline');
      videoEl.controls = false;
      videoEl.removeAttribute('controls');
    }
    var posterUrl = videoEl.poster;
    if (posterUrl && isSafari) {
      videoEl.parentNode.style.background = "url('" + escapeHTML(posterUrl) +  "') center no-repeat";
      videoEl.parentNode.style.backgroundSize = "cover";
      videoEl.parentNode.style.lineHeight = "0";
      videoPreloadPosterDimensions(videoEl, posterUrl);
    }
  }
  if (!desktop) {
    return;
  }

  window.addEventListener('scroll', checkScrollVideos, false);
  window.addEventListener('resize', checkScrollVideos, false);
  setTimeout(checkScrollVideos, 1000);
}

function checkScrollVideos() {
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      winWidth = w.innerWidth || e.clientWidth || g.clientWidth,
      winHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,
      scrollTop = e.scrollTop || g.scrollTop || w.pageYOffset;

  for (var i = 0; i < pageVideos.length; i++) {
    var videoEl = pageVideos[i];
    var curIndex = videoEl.getAttribute('vindex');
    var posY = getFullOffsetY(videoEl);
    var height = videoEl.offsetHeight;
    // console.log(scrollTop, winHeight, posY, height);


    if (isVisibleEnough(posY, height, scrollTop, winHeight, 0.7, 0.9)) {
      if (!pageVideosPlaying[curIndex]) {
        pageVideosPlaying[curIndex] = true;
        console.log('play', videoEl);
        videoEl.play();
      }
    } else {
      if (pageVideosPlaying[curIndex]) {
        delete pageVideosPlaying[curIndex];
        console.log('pause', videoEl);
        videoEl.pause();
      }
    }
  }
}

function videoPreloadPosterDimensions(videoEl, posterUrl) {
  var img = new Image();
  img.onload = function () {
    if (img.width > 0 && img.height > 0) {
      videoEl.style.aspectRatio = img.width / img.height;
    }
  };
  img.src = posterUrl;
}

function isVisibleEnough(boxOffset, boxSize, viewOffset, viewSize, boxThreshold, viewThreshold) {
  var boxEnd = boxOffset + boxSize;
  var viewEnd = viewOffset + viewSize;
  var viewBox = Math.min(viewEnd, boxEnd) - Math.max(boxOffset, viewOffset);
  if (viewBox < 0) {
    return false;
  }
  if (viewBox / boxSize > boxThreshold) {
    return true;
  }
  if (viewThreshold && viewBox / viewSize > viewThreshold) {
    return true;
  }
  return false
}

function getFullOffsetY(el) {
  var offsetTop = el.offsetTop || 0;
  if (el.offsetParent) {
    offsetTop += getFullOffsetY(el.offsetParent);
  }
  return offsetTop;
}

function redraw(el) {
  el.offsetTop + 1;
}

function initRipple() {
  if (!document.querySelectorAll) return;
  var rippleTextFields = document.querySelectorAll('.textfield-item input.form-control');
  for (var i = 0; i < rippleTextFields.length; i++) {
    (function(rippleTextField) {
      function onTextRippleStart(e) {
        if (document.activeElement === rippleTextField) return;
        var rect = rippleTextField.getBoundingClientRect();
        if (e.type == 'touchstart') {
          var clientX = e.targetTouches[0].clientX;
        } else {
          var clientX = e.clientX;
        }
        var ripple = rippleTextField.parentNode.querySelector('.textfield-item-underline');
        var rippleX = (clientX - rect.left) / rippleTextField.offsetWidth * 100;
        ripple.style.transition = 'none';
        redraw(ripple);
        ripple.style.left = rippleX + '%';
        ripple.style.right = (100 - rippleX) + '%';
        redraw(ripple);
        ripple.style.left = '';
        ripple.style.right = '';
        ripple.style.transition = '';
      }
      rippleTextField.removeEventListener('mousedown', onTextRippleStart);
      rippleTextField.removeEventListener('touchstart', onTextRippleStart);
      rippleTextField.addEventListener('mousedown', onTextRippleStart);
      rippleTextField.addEventListener('touchstart', onTextRippleStart);
    })(rippleTextFields[i]);
  }
  var rippleHandlers = document.querySelectorAll('.ripple-handler');
  for (var i = 0; i < rippleHandlers.length; i++) {
    (function(rippleHandler) {
      function onRippleStart(e) {
        var rippleMask = rippleHandler.querySelector('.ripple-mask');
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
        var ripple = rippleHandler.querySelector('.ripple');
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
      rippleHandler.removeEventListener('mousedown', onRippleStart);
      rippleHandler.removeEventListener('touchstart', onRippleStart);
      rippleHandler.addEventListener('mousedown', onRippleStart);
      rippleHandler.addEventListener('touchstart', onRippleStart);
    })(rippleHandlers[i]);
  }
}

function mainInitRetinaVideos() {
  var videoEls = document.querySelectorAll('video.video__init_retina');
  var isRetina = window.devicePixelRatio >= 1.5;
  var videoEl, i, badChildren, j, badChild, sources, sourceEl;
  for (i = 0; i < videoEls.length; i++) {
    videoEl = videoEls[i];
    sources = (videoEl.getAttribute('data-sources')||'').split(',');
    sourceEl = document.createElement('source');
    sourceEl.type = 'video/mp4';
    sourceEl.src = sources[isRetina ? 1 : 0];
    videoEl.appendChild(sourceEl);
    videoEl.classList.remove('video__init_retina');
    videoEl.setAttribute('preload', 'auto');
  }
}

function mainInitDemoAutoplay(videoLinkElsSelector) {
  var videoLinkEls = document.querySelectorAll(videoLinkElsSelector);
  var videoLinkEl, videoEl, i;
  for (i = 0; i < videoLinkEls.length; i++) {
    videoLinkEl = videoLinkEls[i];
    videoEl = videoLinkEl.querySelector('video');
    if (!videoEl) {
      continue;
    }
    if (videoEl.readyState > 1) {
      mainDemoVideoHover(videoLinkEl, 1);
    } else {
      videoEl.load();
      videoEl.addEventListener('loadeddata', (function(el) {
        return function () {
          setTimeout(function () {
            mainDemoVideoHover(el, 1);
          }, 0)
        }
      })(videoLinkEl), false);
    }
  }
}

function mainDemoVideoHover(videoLinkEl, isHover) {
  var outTimeout = videoLinkEl.outTimeout;
  var curIsHover = videoLinkEl.isHover || 0;
  if (outTimeout) {
    clearTimeout(outTimeout);
  }
  if (curIsHover == isHover) {
    return false;
  }
  if (!isHover) {
    outTimeout = setTimeout(function () {
      mainDemoVideoDoHover(videoLinkEl, isHover)
    }, 100);
    videoLinkEl.outTimeout = outTimeout;
    return false;
  }
  mainDemoVideoDoHover(videoLinkEl, isHover);
}

function mainDemoVideoDoHover(videoLinkEl, isHover) {
  delete videoLinkEl.outTimeout;

  var videoEl = videoLinkEl.querySelector('video');
  if (isHover) {
    if (videoEl.readyState > 1) {
      videoLinkEl.classList.add('video_play');
      videoEl.play();
      videoLinkEl.isHover = 1;
    }
  } else {
    videoLinkEl.isHover = 0;
  }
  if (!videoEl.inited) {
    videoEl.inited = true;
    // videoEl.onended =
    videoEl.addEventListener('ended', function onVideoEnded(e) {
      if (videoLinkEl.isHover) {
        videoEl.currentTime = 0;
        videoEl.play();
      } else {
        videoEl.pause();
        videoEl.currentTime = 0;
        videoLinkEl.classList.remove('video_play')
      }
    }, false);
  }
}

function mainInitLogo(logo_url) {
  var img = new Image();
  img.onload = function() {
    var logo = document.querySelector('div.tl_main_logo');
    logo.style.backgroundImage = 'url(\'' + logo_url + '\')';
    logo.classList.add('play');
  };
  img.src = logo_url;
}

function mainInitTgStickers(options) {
  options = options || {};
  if (!RLottie.isSupported) {
    if (options.unsupportedURL) {
      if (!getCookie('stel_notgs')) {
        setCookie('stel_notgs', 1, 7);
      }
      location = options.unsupportedURL;
    }
    return false;
  }
  document.querySelectorAll('.js-tgsticker_image').forEach(function (imgEl) {
    RLottie.init(imgEl, options);
  });
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 86400000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substr(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substr(nameEQ.length, c.length);
    }
  }
  return null;
}

function mainScrollTo(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }
  if (element) {
    window.scroll(0, getFullOffsetY(element));
  }
}

(function($) {
  $.fn.redraw = function() {
    return this.map(function(){ this.offsetTop; return this; });
  };
})(jQuery);

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

function px(str) {
  return new Number(str.slice(0, -2));
}

var WebApp = window.Telegram && window.Telegram.WebApp || null;

var MaskPosition = {
  state: {},
  initValues: [
    {w: 200, x: 214, y: 152, s: 1.0},
    {w: 82,  x: 214, y: 214, s: 2.5},
    {w: 200, x: 214, y: 302, s: 0.35},
    {w: 200, x: 214, y: 352, s: 1.0}
  ],

  init: function(options) {
    var state = MaskPosition.state;

    state.faceMirror = $('.face-mirror');
    state.mask       = $('.mask', state.faceMirror);
    state.maskImg    = $('img', state.mask);

    var loaded = 0;
    var onLoaded = function (i) {
      loaded |= i;
      if (loaded & 3 == 3) {
        MaskPosition.start();
      }
    }

    state.imgFace = new Image(),
    state.imgMask = new Image();
    state.imgFace.src = '/img/face.jpg';
    state.imgMask.src = state.maskImg[0].src;
    state.imgFace.onload = function() {
      onLoaded(1);
    }
    state.imgMask.onload = function() {
      onLoaded(2);
    }

    state.anchor = $(state.maskImg).data('anchor') || 0;
    var customValues = $(state.maskImg).data('values') || '';
    if (customValues) {
      var arr = customValues.split(' ');
      state.custom = {
        anchor: +arr[0],
        x:      +arr[1],
        y:      +arr[2],
        scale:  +arr[3]
      };
    }
    $(document).on('touchmove', function(e) {
      e.preventDefault();
    });
  },
  start: function() {
    WebApp.ready();
    WebApp.expand();
    WebApp.MainButton.setText(l('DONE_BUTTON')).onClick(function() {
      var values = MaskPosition.getValues();
      WebApp.sendData(values);
    }).show();

    var state = MaskPosition.state;
    var maskWidth = 0, maskHeight = 0;
    state.maskCoeff = 1;
    var anchor = state.anchor, x, y, scale;
    var custom = state.custom;
    state.curScale = 1;


    maskWidth  = state.imgMask.width;
    maskHeight = state.imgMask.height;
    if (maskWidth < maskHeight) {
      state.maskCoeff = maskWidth / maskHeight;
    }

    state.curScale = px(state.faceMirror.css('width')) / state.imgFace.width;

    var resizeStartCenter, resizeStartSize;

    state.mask.draggable({
      cursor: 'move'
    });
    state.mask.resizable({
      handles : 'se',
      aspectRatio: true,
      minWidth: 50,
      minHeight: 50,
      start: function(event, ui) {
        resizeStartCenter = MaskPosition.centerOfElement(ui.element);
        resizeStartSize = {
          width: ui.size.width,
          height: ui.size.height,
        }
      },
      resize: function(event, ui) {
        ui.position.left = resizeStartCenter.x - ui.size.width / 2;
        ui.position.top = resizeStartCenter.y - ui.size.height / 2;
        ui.size.width -= (resizeStartSize.width - ui.size.width) / 2;
        ui.size.height -= (resizeStartSize.height - ui.size.height) / 2;
      }
    });

    if (custom) {
      var initialWidth  = MaskPosition.initialWidthForAnchor(custom.anchor);
      var initialHeight = MaskPosition.aspectHeight(initialWidth, maskWidth, maskHeight);
      var initialCenter = MaskPosition.initialCenterForAnchor(custom.anchor);

      var scale  = custom.scale * state.maskCoeff;
      var width  = initialWidth * scale;
      var height = initialHeight * scale;
      var center = {
        x: custom.x * initialWidth + initialCenter.x,
        y: custom.y * initialWidth + initialCenter.y
      };
    } else {
      var scale  = MaskPosition.initialScaleForAnchor(anchor) * state.maskCoeff;
      var width  = MaskPosition.initialWidthForAnchor(anchor) * scale;
      var height = MaskPosition.aspectHeight(width, maskWidth, maskHeight);
      var center = MaskPosition.initialCenterForAnchor(anchor);
    }
    state.mask.css({
      left:   center.x - width / 2,
      top:    center.y - height / 2,
      width:  width,
      height: height
    });
  },
  initialCenterForAnchor: function(anchor) {
    var state = MaskPosition.state;
    return {
      x: MaskPosition.initValues[anchor].x * state.curScale,
      y: MaskPosition.initValues[anchor].y * state.curScale
    };
  },
  initialWidthForAnchor: function(anchor) {
    var state = MaskPosition.state;
    return MaskPosition.initValues[anchor].w * state.curScale;
  },
  initialScaleForAnchor: function(anchor) {
    return MaskPosition.initValues[anchor].s;
  },
  aspectHeight: function(newWidth, orginalWidth, originalHeight) {
    if (orginalWidth == 0) return orginalWidth;
    return newWidth * originalHeight / orginalWidth;
  },
  centerOfElement: function(el) {
    var width = px(el.css('width'));
    var height = px(el.css('height'));

    var centerX = px(el.css('left')) + width / 2;
    var centerY = px(el.css('top')) + height / 2;

    return { x: centerX, y: centerY };
  },
  getValues: function() {
    var state = MaskPosition.state;
    var el = state.mask;
    var width = px(el.css('width'));
    var height = px(el.css('height'));

    var centerX = px(el.css('left')) + width / 2;
    var centerY = px(el.css('top')) + height / 2;

    var initialWidth  = MaskPosition.initialWidthForAnchor(state.anchor);
    var initialCenter = MaskPosition.initialCenterForAnchor(state.anchor);

    var scale = width / initialWidth / state.maskCoeff;
    var x     = (centerX - initialCenter.x) / initialWidth;
    var y     = (centerY - initialCenter.y) / initialWidth;

    return [ state.anchor, x.toFixed(4), y.toFixed(4), scale.toFixed(4) ].join(' ');
  }
};

var StickersSelect = {
  state: {},

  init: function(options) {
    WebApp.ready();

    gec('.sticker.image', function() {
      TSticker.init(this);
    });
    gec('.sticker.animated', function() {
      RLottie.init(this);
    });
    gec('.sticker.video', function() {
      TVideoSticker.init(this);
    });

    $('.sticker-wrap').on('click', function() {
      var value = $(this).attr('data-id');
      WebApp.sendData(value);
    });
  }
};

var StickersReorder = {
  state: {},

  init: function(options) {
    var state = StickersReorder.state;

    WebApp.ready();
    WebApp.MainButton.setText(l('SAVE_ORDER_BUTTON')).onClick(function() {
      var values = StickersReorder.getValues();
      WebApp.sendData(values);
    });

    state.initValues = StickersReorder.getValues();

    gec('.sticker.image', function() {
      TSticker.init(this);
    });
    gec('.sticker.animated', function() {
      RLottie.init(this);
    });
    gec('.sticker.video', function() {
      TVideoSticker.init(this);
    });

    $('.stickers-wrap').sortable({
      // start: function() {
      //   gec('.sticker.animated', function() {
      //     RLottie.pause(this);
      //   });
      // },
      stop: function() {
        var newValues = StickersReorder.getValues();
        if (newValues != state.initValues) {
          WebApp.isClosingConfirmationEnabled = true;
          WebApp.MainButton.show();
        } else {
          WebApp.isClosingConfirmationEnabled = false;
          WebApp.MainButton.hide();
        }
        // gec('.sticker.animated', function() {
        //   RLottie.play(this);
        // });
      },
      containment: 'parent',
      items: '> .sticker-wrap',
      tolerance: 'pointer',
      revert: 150
    });
  },
  getValues: function() {
    var joiner = $('.stickers-wrap').attr('data-joiner') || '';
    return $('.sticker-wrap').map(function() {
      return $(this).attr('data-id');
    }).get().join(joiner);
  }
};

var Main = {
  init(api_hash = null) {
    if (api_hash) {
      Aj.apiUrl = '/stickers/api?hash=' + api_hash;
    }
    Main.initOnce();
    Aj.viewTransition = true;
    window.basePath = '/stickers'

    $('form').on('submit', e => e.preventDefault());
    setBackButton(Aj.state.backButton);
    Aj.state.files = Aj.state.files || {};

    function adjustTextArea () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    }

    $('textarea[expandable]').each(adjustTextArea).on('input focus', adjustTextArea);

    $('.js-drop-area').on('dragenter', function () {
      $(this).toggleClass('drag-over', true);
    });

    $('.js-drop-area').on('dragover', function (e) {
      e.preventDefault();
    });

    $('.js-drop-area').on('dragleave drop', function (e) {
      $(this).toggleClass('drag-over', false);
    });

    $('img').on('error', function (e) {
      var src = this.src;
      setTimeout(() => {
        var url = document.createElement('a');
        url.href = src;
        if (!url.search.includes('retry')) {
          url.search += '&retry=1';
          this.src = url.href;
        }
      }, 300);
    });

    $('.js-lottie-thumb').each(function () {
      RLottie.init(this, {noAutoPlay: $(this).hasClass('static')});
    });

    $('.js-dropdown-wrapper').on('click', function (e) {
      if (e.target.closest('.tm-dropdown')) return;
      if (!this.contains(e.target)) return;
      $('.dropdown-toggle', this).dropdown('toggle');
      e.stopImmediatePropagation();
      e.stopPropagation();
    });

    WebApp.MainButton.enable();
    WebApp.MainButton.hide();
  },
  eMainButton() {
    if (Aj.layerState.onMainButton) {
      return Aj.layerState.onMainButton();
    }
    Aj.state.onMainButton && Aj.state.onMainButton();
  },
  initOnce() {
    if (window._initOnce) {
      return;
    }
    window._initOnce = true;

    Main.checkAuth();

    window.showConfirm = (message, onConfirm, confirm_btn, onCancel) => {
      WebApp.showPopup({
        message: message,
        buttons: [
          {type: 'destructive', id: 'ok', text: confirm_btn || 'Leave'},
          {type: 'cancel'}
        ]
      }, button_id => button_id == 'ok' ? onConfirm?.() : onCancel?.());
    };

    WebApp.ready();
    WebApp.setHeaderColor('#212a33');
    WebApp.setBackgroundColor('#1a2026');
    WebApp.setBottomBarColor('#212a33');
    WebApp.MainButton.setParams({ color: '#248BDA' });
    WebApp.MainButton.onClick(Main.eMainButton);
    WebApp.disableVerticalSwipes();

    if (['android', 'ios'].includes(WebApp.platform)) {
      $('body').addClass('mobile');
      $('body').addClass('platform-'+WebApp.platform);
      WebApp.requestFullscreen();
      initBackSwipe();
      window._mobileApp = true;
    }

    var ua = navigator.userAgent.toLowerCase();
    window.isSafari = (!(/chrome/i.test(ua)) && /webkit|safari|khtml/i.test(ua));

    window._localCache = {};

    $(document).on('click', '.tm-bot-anchor', () => {
      WebApp.HapticFeedback.impactOccurred('soft');
    });

    $(document).on('shown.bs.dropdown', (event) => {
      WebApp.HapticFeedback.impactOccurred('soft');
      var $menu = $('.dropdown-menu', event.target);
      var rect = $menu[0].getBoundingClientRect();
      var needsInvert = document.body.clientHeight - rect.bottom < -4;
      var needsInvertHorizontal = rect.left < 2;
      $menu.toggleClass('dropdown-menu-top', needsInvert);
      $menu.toggleClass('dropdown-menu-right', needsInvertHorizontal);
    });

    $(document).on('hidden.bs.dropdown', (event) => {
      var $menu = $('.dropdown-menu', event.target);
      $menu.removeClass('dropdown-menu-top dropdown-menu-right');
    });

    $(document).on('change', 'input[type=checkbox]', () => {
      WebApp.HapticFeedback.selectionChanged();
    });

    $(document).on('sortchange', () => {
      WebApp.HapticFeedback.selectionChanged();
    });

    $(document).on('sortstart', () => {
      window._sortInProgress = true;
    });

    $(document).on('sortstop', () => {
      window._sortInProgress = false;
    });
  },
  scrollToEl(elem, offset = 0, smooth = false) {
   window.scrollTo({
    top: $(elem).offset().top - WebApp.safeAreaInset.top - WebApp.contentSafeAreaInset.top + offset,
    left: 0,
    behaviour: smooth ? 'smooth' : 'auto',
   });
  },
  checkAuth() {
    var authPage = Aj.state.authPage === true;
    Aj.apiRequest('auth', {_auth: WebApp.initData}, res => {
      if (!res.ok) {
        if (!authPage) {
          window.location = '/stickers/auth';
        } else {
          AuthPage.showExpired();          
        }
      } else if (authPage) {
        var start_param = WebApp.initDataUnsafe.start_param;
        window.location = '/stickers?' + (start_param ? 'tgWebAppStartParam=' + start_param : '');
      }
    });
  },
  showToast(text, options = {}) {
    if (!window.$_toastContainer) {
      window.$_toastContainer = $('<div class="tm-toast-container">').appendTo('body');
    }
    if (!window.$toast) {
      window.$toast = $(`<div class="tm-toast ${options.class}">${text}</div>`);
      $_toastContainer.html($toast);

      setTimeout(() => $toast.addClass('tm-toast-show'), 10);
      setTimeout(() => {
        $toast.removeClass('tm-toast-show');
        setTimeout(() => {
            $toast.remove();
            window.$toast = null;
        }, 300);
      }, options.duration || 2000);
    }
  },
  showErrorToast(text) {
    Main.showToast(text || 'Error.', { class: 'tm-toast-error' });
    WebApp.HapticFeedback.notificationOccurred('error');
  },
  showSuccessToast(text) {
    Main.showToast('<div>' + (text || 'Success.') + '</div>', { class: 'tm-toast-success' });
    WebApp.HapticFeedback.notificationOccurred('success');
  },
  iosChatFix() {
    if (WebApp.platform != 'ios') return;
    if (WebApp.isVersionAtLeast('8.0')) {
      setTimeout(() => {
        if (WebApp.isActive) {
          WebApp.close();
        }
      }, 500);
    } else {
      WebApp.close();
    }
  },
}

var StickerChart = {
  init() {
    StickerChart.initChartDate();
  },
  initChartDate() {
    Aj.state.$dateRange = {};

    $(document).on('chart-update-zoom.curPage', (e) => {
      var data = e.originalEvent.detail;
      $('#' + data.target.id + ' .chart_wrap_loading').remove();
      StickerChart.setDateRange(data.target.id, [data.x1, data.x2]);
    });
  },
  setDateRange(id, range) {
    var fmt = Graph.units.TUtils.xRangeFormatter;
    var datestr = fmt(range[0]);
    if (range[0] != range[1]) {
      datestr += ' - ' + fmt(range[1]);
    }
    if (!Aj.state.$dateRange[id]) {
      Aj.state.$dateRange[id] = $(`.js-date-range[data-for=${id}]`);
    }
    Aj.state.$dateRange[id].text(datestr);
  }
}

var StickerUpload = {
  inputFile(file, callback) {
    var isEmojis = Aj.state.isEmojis;
    if (file.type.match('image.*')) {
      var processedImage = processImage(file, callback, isEmojis ? 'emoji' : 'sticker');
    } else if (file.type.match('video.*')) {
      if (file.type == 'video/webm') {
        const video = document.createElement('video');
        video.addEventListener("loadedmetadata", function () {
            if (isEmojis) {
              if (this.videoWidth !== 100 || this.videoHeight !== 100) {
                return Main.showErrorToast(l('WEB_UPLOAD_BAD_DIMENSIONS'));
              }
            } else {
              if (Math.max(this.videoWidth, this.videoHeight) !== 512 || Math.min(this.videoWidth, this.videoHeight) < 1) {
                return Main.showErrorToast(l('WEB_UPLOAD_BAD_DIMENSIONS'));
              }
            }
            if (this.duration > 3) {
              return Main.showErrorToast(l('WEB_UPLOAD_LONG_VIDEO'));
            }
            callback(file);
        }, false);
        video.src = URL.createObjectURL(file);
      } else {
        Main.showErrorToast(l('WEB_UPLOAD_UNSUPPORTED_FORMAT'));
      }
    } else {
      var mimeFile = new File([file], file.name, {type: 'application/x-tgsticker'});
      callback(mimeFile);
    }
  },
}

var AuthPage = {
  init () {},
  showExpired() {
    $('.tm-auth-expired').toggle(true);

    Aj.state.onMainButton = WebApp.close;
    WebApp.MainButton.setText('Close');
    WebApp.MainButton.show();
  }
}

var NewPack = {
  init () {
    Aj.state.shortNameDebounce = debounce();
    Aj.state.files = [];
    $('input[name=short_name]').on('input', NewPack.eShortNameInput);
    $('.js-drop-area').on('drop', NewPack.eDrop);
    Aj.state.onMainButton = NewPack.submit;
    WebApp.MainButton.setText(l('WEB_NEWPACK_CREATE'));
    WebApp.MainButton.show();
    $('.tm-grid-area').sortable({
      containment: 'parent',
      items: '> *',
      isGrid: 'true',
      tolerance: 'pointer',
      revert: 150,
      touchDelay: 500,
    });
    $(document).on('mousedown.curPage', '.tm-grid-item-sticker', function() {
      WebApp.HapticFeedback.impactOccurred('soft');
      $(this).addClass('drag');
    }).on('mouseup.curPage', '.tm-grid-item-sticker', function() {
      $(this).removeClass('drag');
    });

    $('.js-upload-btn').on('click', NewPack.requestFileInput);
    $('.js-open-sticker-picker').on('click', StickerPicker.open);
    $(document).on('sticker-picker-input.curPage', NewPack.eStickerPickerInput);
    $('.tm-row-toggle').on('click', function () {
      var toggleEl = this.querySelector('.tm-toggle');
      var value = toggleEl.classList.toggle('tm-toggle-on');
      Aj.state.textColor = value;
      $('main').toggleClass('tm-text-color', value);
      WebApp.HapticFeedback.impactOccurred('soft');
    });

    $('.tm-bottom-sheet-overlay').on('click', PackPage.hideOverlay);
    $('.js-delete-sticker').on('click', PackPage.deleteSticker);
    $(document).on('click.curPage', '.tm-grid-item-sticker', PackPage.showOverlay);
  },
  requestFileInput() {
    $input = $(`<input type="file" accept="image/*,video/webm,*.tgs" style="display: none">`);
    $input.on('change', () => {
      var files = $input[0].files;
      if (files.length) {
        [...files].forEach(file => StickerUpload.inputFile(file, NewPack.addFile));
      }
      $input.remove();
    });
    $input.on('cancel', () => {
      $input.remove();
    })
    $('body').append($input);
    $input.click();
  },
  eShortNameInput(e) {
    var $hint = $('.hint-text[data-for=short_name]');
    $hint.attr('class', 'hint-text hint-text-loading');
    $hint.text(l('WEB_NEWPACK_LINK_LOADING'));
    Aj.state.shortNameDebounce(NewPack.checkShortName, 400);
  },
  checkShortName() {
    var $hint = $('.hint-text[data-for=short_name]');
    var $input = $('input[name=short_name]');
    var value = $input.val();
    $hint.attr('class', 'hint-text hint-text-loading');
    $hint.text(l('WEB_NEWPACK_LINK_LOADING'));
    Aj.apiRequest('checkShortName', { value: value }, res => {
      if ($input.val() !== value) return;
      if (res.ok) {
        Aj.state.shortName = value;
        $hint.attr('class', 'hint-text hint-text-success');
        $hint.text(res.msg || (value + ' is available.'));
      } else {
        Aj.state.shortName = false;
        $hint.attr('class', 'hint-text hint-text-error');
        $hint.html(res.error);
      }
    });
  },
  eDrop(e) {
    e.preventDefault();
    var dataTransfer = e.originalEvent.dataTransfer;
    if (dataTransfer.items) {
      [...dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          Aj.state.files.push(file);
          StickerUpload.inputFile(file, NewPack.addFile);
        }
      });
    } else {
      [...dataTransfer.files].forEach((file, i) => {
        Aj.state.files.push(file);
        StickerUpload.inputFile(file, NewPack.addFile);
      });
    }
  },
  eStickerPickerInput(e) {
    var $grid = $('.tm-grid-area');
    e.originalEvent.detail.forEach(el => {
      if ($(`.tm-grid-item[data-doc=${el.docId}]`).length) {
        return;
      }
      $item = $(`<div class="tm-grid-item tm-grid-item-sticker" data-raw="${el.stickerRaw}" data-doc="${el.docId}" data-emoji="${el.emoji}" data-type="webp"><img src="${el.thumb}"></div>`);
      $item.appendTo($grid);
    })
  },
  addFile(file) {
    var $grid = $('.tm-grid-area');
    var url = URL.createObjectURL(file);
    var $item;
    if (file.type == 'application/x-tgsticker') {
      $item = $(`<picture class="tm-grid-item tm-grid-item-sticker tm-sticker-loading" data-blob="${url}" data-type="tgs"><source type="application/x-tgsticker" srcset="${url}"></picture>`);
      RLottie.init($item[0], {noAutoPlay: true});
    } else if (file.type == 'video/webm') {
      $item = $(`<div class="tm-grid-item tm-grid-item-sticker tm-sticker-loading" data-blob="${url}" data-type="webm"><video muted src="${url}"></div>`);      
    } else {
      $item = $(`<div class="tm-grid-item tm-grid-item-sticker tm-sticker-loading" data-blob="${url}" data-type="webp"><img src="${url}"></div>`);
    }
    Aj.uploadRequest('upload', file, {target: Aj.state.isEmojis ? 'emoji' : 'sticker'}, (res) => {
      if (res.ok) {
        $item.removeClass('tm-sticker-loading').attr('data-doc', res.doc);
        // $('img', $item).attr('src', res.thumb);
      } else {
        $item.remove();
        Main.showErrorToast(res.error);
      }
    });
    $item.appendTo($grid);
  },
  submit() {
    var stickers = $('.tm-grid-item[data-doc]').toArray().map(el => ({doc_id: $(el).data('doc'), emoji: $(el).data('emoji') || '🫥'}));
    var title = $('input[name=title]').val();
    if (!title.trim()) {
      $('input[name=title]').focus();
      Main.showErrorToast(l('WEB_NEWPACK_NAME_REQUIRED'));
      return;
    }
    var shortName = Aj.state.shortName;
    if (!shortName && $('input[name=short_name]').val()) {
      $('input[name=short_name]').focus();
      return;
    }
    if (!stickers.length) {
      Main.showErrorToast(l('WEB_NEWPACK_STICKERS_REQUIRED'));
      return;
    }

    WebApp.MainButton.showProgress();
    Aj.apiRequest('createStickerSet', {
      title: title,
      stickers: stickers,
      short_name: shortName,
      is_emoji: Aj.state.isEmojis || '',
      text_color: Aj.state.textColor || '',
    }, (res) => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.location(res.redirect);
      }
      if (res.error) {
        Main.showErrorToast(res.error);
      }
    });
  }
}

var PublishPack = {
  init () {    
    Aj.state.onMainButton = PublishPack.submit;
    WebApp.MainButton.setText(l('WEB_PUBLISHPACK_PUBLISH'));
    WebApp.MainButton.show();

    Aj.state.initialShortName = Aj.state.shortName;
    Aj.state.shortNameDebounce = debounce();
    $('input[name=short_name]').on('input', PublishPack.eShortNameInput);
  },
  eShortNameInput(e) {
    var $hint = $('.hint-text[data-for=short_name]');
    $hint.attr('class', 'hint-text hint-text-loading');
    $hint.text(l('WEB_NEWPACK_LINK_LOADING'));
    Aj.state.shortNameDebounce(PublishPack.checkShortName, this.value ? 400 : 0);
  },
  checkShortName() {
    var $hint = $('.hint-text[data-for=short_name]');
    var $input = $('input[name=short_name]');
    var value = $input.val();
    if (!value) {
      $hint.text('').attr('class', 'hint-text');
      Aj.state.shortName = Aj.state.initialShortName;
      return;
    }
    $hint.attr('class', 'hint-text hint-text-loading');
    $hint.text(l('WEB_NEWPACK_LINK_LOADING'));
    Aj.apiRequest('checkShortName', { value: value }, res => {
      if ($input.val() !== value) return;
      if (res.ok) {
        Aj.state.shortName = value;
        $hint.attr('class', 'hint-text hint-text-success');
        $hint.text(res.msg || (value + ' is available.'));
      } else {
        Aj.state.shortName = false;
        $hint.attr('class', 'hint-text hint-text-error');
        $hint.html(res.error);
      }
    });
  },
  submit() {
    var title = $('input[name=title]').val();
    if (!title.trim()) {
      $('input[name=title]').focus();
      Main.showErrorToast('Name is required');
      return;
    }
    var shortName = Aj.state.shortName;
    if (!shortName && $('input[name=short_name]').val()) {
      $('input[name=short_name]').focus();
      return;
    }

    WebApp.MainButton.showProgress();
    Aj.apiRequest('publishStickerSet', {
      title: title,
      short_name: shortName,
      pack_id: Aj.state.packId,
    }, (res) => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.onUnload(() => {
          Main.showSuccessToast(res.msg);
        });
        Aj.location(res.redirect);
      }
      if (res.error) {
        Main.showErrorToast(res.error);
      }
    });
  }
}

var EditPack = {
  init() {
    $('.js-sortable-table').sortable({
      containment: 'parent',
      items: '> *',
      handle: '.js-sortable-handle',
      tolerance: 'pointer',
      revert: 150,
    });
    Aj.onLoad(() => {
      var hash = Aj.location().hash;
      if (hash) {
        EditPack.focusSticker(hash);
      }
    });
    Aj.onUnload(() => {
      Aj.state.$emojiPanel.remove();
    });
    $(document)
      .on('click.curPage', '.js-delete-sticker', EditPack.eDeleteSticker)
      .on('pointerdown', '.js-delete-sticker', e => e.preventDefault());
    $('.js-upload-thumb').on('click', EditPack.uploadThumb);
    var query = new URLSearchParams(Aj.location().search);
    Aj.state.new = query.get('new');
    Aj.state.onMainButton = EditPack.submit;
    WebApp.MainButton.setText(l('WEB_EDITPACK_SAVE'));
    WebApp.MainButton.show();

    $('.tm-sticker-row input').on('focus', function () {
      Aj.state.$activeInput = $(this);
    }).on('blur', function () {
      Aj.state.$emojiPanel.addClass('hidden');
      $('.js-toggle-panel.active').removeClass('active');
    });

    $(document).on('click.curPage', '.js-toggle-panel', function () {
      var top = this.parentElement.offsetTop + this.parentElement.offsetHeight;
      var state = $(this).toggleClass('active').hasClass('active');
      Aj.state.$activeInput = $(this.closest('.js-sticker-row')).find('input');
      Aj.state.$activeInput.focus();
      Aj.state.$emojiPanel.toggleClass('hidden', !state).css('top', top);
    }).on('pointerdown', '.js-toggle-panel', function (e) {
      e.preventDefault();
    });

    EditPack.initEmojiList();
    Aj.state.$emojiPanel = $(EditPack.initEmojiPanel()).on('click', '.emoji-btn', function (event) {
      event.preventDefault();
      document.execCommand('insertText', false, $(this).text());
      Aj.state.$activeInput.focus();
    }).on('pointerdown', function (e) {
      e.preventDefault();
    }).addClass('hidden').appendTo('body');

    $('.js-upload-btn').on('click', EditPack.eUploadClick);

    $('.js-open-sticker-picker').on('click', StickerPicker.open);
    $(document).on('sticker-picker-input.curPage', EditPack.eStickerPickerInput);
  },
  eDeleteSticker() {
    var activeSticker = document.activeElement.closest('.js-sticker-row');
    var sticker = this.closest('.js-sticker-row');
    if (activeSticker == sticker) {
      document.execCommand('delete');
    } else {
      sticker.remove();
    }
    WebApp.HapticFeedback.impactOccurred('rigid');
  },
  initEmojiList: function() {
    Aj.state.emojiHexList = [];
    Aj.state.emojiByHex = {};
    for (var group_id = 0, index = 0; group_id < Aj.state.emojiGroupedList.length; group_id++) {
      var group = Aj.state.emojiGroupedList[group_id];
      var emojis = group.e.split(' ');
      var hexes = group.h.split(' ');
      for (var i = 0; i < emojis.length; i++) {
        var hex = strEmojiToHex(emojis[i]);
        Aj.state.emojiByHex[hex] = {
          img_hex: hexes[i],
          i: (i % 10),
          j: Math.floor(i / 10),
          group_id: group_id,
          index: index++,
          emoji: emojis[i]
        };
        Aj.state.emojiHexList.push(hex);
        if (hex.slice(-12) == 'e2808de29982' ||
            hex.slice(-12) == 'e2808de29980') {
          Aj.state.emojiByHex[hex.slice(0, -12)] = Aj.state.emojiByHex[hex];
        }
      }
    }
    Aj.state.emojiRE = new RegExp(Aj.state.emojiRE, 'g');
  },
  initEmojiPanel: function() {
    var html = '<div class="emoji-panel">';
    for (var group_id = 0; group_id < Aj.state.emojiGroupedList.length; group_id++) {
      var group = Aj.state.emojiGroupedList[group_id];
      var emojis = group.e.split(' ');
      var hexes = group.h.split(' ');
      html += '<div class="emoji-group-wrap">';
      html += '<h4 class="emoji-group-header">' + group.t + '</h4>';
      html += '<div class="emoji-group">';
      for (var i = 0; i < emojis.length; i++) {
        html += '<div class="emoji-btn">' + EditPack.emojiHtml(emojis[i], true) + '</div>';
      }
      for (i = 0; i < 30; i++) {
        html += '<div class="emoji-btn-hidden"></div>';
      }
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  },
  wrapEmojiHtml: function(text, lg) {
    text = cleanHTML(text);
    if (!Aj.state.emojiRE) {
      return text;
    }
    return text.replace(/🏻|🏼|🏽|🏾|🏿/g, '').replace(Aj.state.emojiRE, function(emoji) {
      return EditPackx.emojiHtml(emoji, lg);
    });
  },
  emojiHtml: function(emoji, lg) {
    var hex = strEmojiToHex(emoji);
    var data = Aj.state.emojiByHex[hex];
    if (!data) {
      console.warn('No hex found: ' + emoji);
      return cleanHTML(emoji);
    }
    // var emoji_url = '//telegram.org/img/emoji/40/' + data.img_hex + '.png';
    // return '<img class="emoji" src="' + emoji_url + '" width="20" height="20" alt="' + cleanHTML(emoji) + '" />';
    var size = lg ? 31 : 25;
    var i_class = lg ? 'emoji-lg' : 'emoji-md lg';
    return '<i class="' + i_class + ' g' + data.group_id + '" style="background-position:' + (-size * data.i) + 'px ' + (-size * data.j) + 'px"><b>' + cleanHTML(emoji) + '</b></i>';
  },
  eUploadClick() {
    $input = $(`<input type="file" accept="image/*,video/webm,*.tgs" style="display: none">`);
    $input.on('change', () => {
      var files = $input[0].files;
      if (files.length) {
        [...files].forEach(file => StickerUpload.inputFile(file, EditPack.addFile));
      }
      $input.remove();
    });
    $input.on('cancel', () => {
      $input.remove();
    })
    $('body').append($input);
    $input.click();
  },
  eStickerPickerInput(e) {
    var $grid = $('.js-sortable-table');

    e.originalEvent.detail.forEach(el => {
      if ($(`.tm-sticker-row[data-doc-id=${el.docId}]`).length) {
        return;
      }
      $item = $(`<div class="tm-row tm-sticker-row tm-sticker-row-edit js-sticker-row" data-doc-id="${el.docId}">
        <span class="tm-icon js-sortable-handle ui-sortable-handle" style="--icon-s: var(--image-url-rearrange)"></span>
        <img class="tm-row-pic" src="${el.thumb}">
        <input value="${el.emoji}" type="text" class="form-control tm-input" name="emoji" placeholder="${l('WEB_EDITPACK_EMOJI_PLACEHOLDER')}" autocomplete="off" value="" spellcheck="false">
        <span class="tm-icon tm-icon-end tm-toggle-emoji js-toggle-panel"></span>
        <span class="tm-icon tm-icon-end tm-icon-close js-delete-sticker"></span>
      </div>`);
      $item.attr('id', 'i' + el.docId);
      $item.appendTo($grid);
    });
  },
  addFile(file) {
    var $grid = $('.js-sortable-table');
    var url = URL.createObjectURL(file);
    var $thumb;
    if (file.type == 'application/x-tgsticker') {
      $thumb = $(`<picture class="tm-row-pic"><source type="application/x-tgsticker" srcset="${url}"></picture>`);
      RLottie.init($item[0], {noAutoPlay: true});
    } else if (file.type == 'video/webm') {
      $thumb = $(`<video class="tm-row-pic" muted src="${url}">`);
    } else {
      $thumb = $(`<img class="tm-row-pic" src="${url}">`);
    }
    $item = $(`<div class="tm-row tm-sticker-row tm-sticker-row-edit tm-sticker-loading">
        <span class="tm-icon js-sortable-handle ui-sortable-handle" style="--icon-s: var(--image-url-rearrange)"></span>
        <div class="tm-row-pic"></div>
        <input type="text" class="form-control tm-input" name="emoji" placeholder="${l('WEB_EDITPACK_EMOJI_PLACEHOLDER')}" autocomplete="off" value="" spellcheck="false">
        <span class="tm-icon tm-icon-end tm-toggle-emoji js-toggle-panel"></span>
        <span class="tm-icon tm-icon-end tm-icon-close js-delete-sticker"></span>
      </div>`);
    $('.tm-row-pic', $item).replaceWith($thumb);
    Aj.uploadRequest('upload', file, {target: Aj.state.isEmojis ? 'emoji' : 'sticker'}, (res) => {
      if (res.ok) {
        $item.removeClass('tm-sticker-loading');
        $item.addClass('js-sticker-row');
        $item.attr('data-doc-id', res.doc);
        $item.attr('id', 'i' + res.doc);
      } else {
        $item.remove();
        Main.showErrorToast(res.error);
      }
    });
    $item.appendTo($grid);
  },
  uploadThumb() {
    var src = false;
    requestUpload('stickers_thumb', (res) => {
      $('.tm-main-intro-picture').removeClass('loading');
      if (res.ok) {
        Aj.state.thumbId = res.doc_id;
      } else {
        $('.tm-main-intro-picture img').remove();
      }
    }, {
      onSelected(file) {
        var src = URL.createObjectURL(file);
        $('.tm-main-intro-picture').html(`<img src="${src}">`)
      }
    });
  },
  submit() {
    var $title = $('input[name=title]');
    if (!$title.val().trim()) {
      $title.focus();
    }

    var stickers = $('.js-sticker-row').toArray().map(el => {
    var emoji = $('input', el).val();
      return {
        sticker_raw: el.dataset.raw,
        doc_id: el.dataset.docId,
        emoji: emoji,
      }
    });

    if (!stickers.length) {
      PackPage.askDeletePack();
      return;
    }

    WebApp.MainButton.showProgress();
    Aj.apiRequest('updateStickerSet', { 
      pack_id: Aj.state.packId, 
      stickers: stickers, 
      title: $title.val().trim(),
      thumb: Aj.state.thumbId,
    }, (res) => {
      WebApp.MainButton.hideProgress();
      if (res.error) {
        Main.showErrorToast(res.error);
        if (res.field) {
          EditPack.focusSticker('#'+res.field, true);
        }
      } else {
        Aj.onUnload(() => {
          Main.showSuccessToast(res.msg);          
        });
        _backButton();  
      }
    });
  },
  focusSticker(hash, error = false) {
    $(hash).addClass('tm-sticker-row-target');
    if (error) {
      $(hash).addClass('tm-sticker-row-error');
      setTimeout(() => {
        $(hash).removeClass('tm-sticker-row-error');
      }, 5000);
    }
    Main.scrollToEl(hash, -12);
    $('input', hash).focus();
  }
}

var PackPage = {
  init () {
    Aj.state.PackPage = true;
    $('.tm-grid-area').sortable({
      containment: 'parent',
      items: '> *',
      isGrid: 'true',
      tolerance: 'pointer',
      revert: 150,
      touchDelay: 500,
    }).on('sortupdate', () => {
      PackPage.hasChanges();
    });
    $('.tm-grid-item-sticker').on('mousedown', function() {
      WebApp.HapticFeedback.impactOccurred('soft');
      $(this).addClass('drag');
    }).on('mouseup', function() {
      $(this).removeClass('drag');
    });
    $('.js-share-link').on('click', () => {
      WebApp.openTelegramLink(Aj.state.shareLink);
    })
    $('.js-edit-emoji').on('click', function () {
      Aj.location('/stickers/editpack/' + Aj.state.packId + '#s' + Aj.state.targetSticker);
    });
    $('.tm-bottom-sheet-overlay').on('click', PackPage.hideOverlay);
    $('.tm-grid-item-sticker').on('click', PackPage.showOverlay);
    $('.js-delete-sticker').on('click', PackPage.deleteSticker);
    $('.js-delete-pack').on('click', PackPage.askDeletePack);
    $('.js-show-stat').on('click', PackPage.showStickerStat);
    $('.js-set-pack-icon').on('click', PackPage.setPackIcon);

    $('.tm-grid-item img').on('load', PackPage.updateImgSvgThumb).each(PackPage.updateImgSvgThumb);

    WebApp.MainButton.setText(l('WEB_EDITPACK_SAVE'));

    Aj.state.onMainButton = PackPage.submitChanges;
    Aj.state.initialStickersData = PackPage.getStickersData();
  },
  updateImgSvgThumb() {
    if (this.complete) {
      $(this).css('background', 'none');
    }
  },
  showStickerStat() {
    Aj.location(`/stickers/stats/${Aj.state.packId}/${Aj.state.targetSticker}`)
  },
  async showOverlay() {
    if (this.classList.contains('ui-sortable-helper')) {
      return;
    }
    var sticker_raw = $(this).data('raw');
    var blob = $(this).data('blob');
    var type = $(this).data('type');
    var doc_id = $(this).data('doc');

    if (sticker_raw) {
      Aj.state.targetSticker = sticker_raw;      
    } else if (doc_id) {
      Aj.state.targetSticker = doc_id;
    } else {
      return;
    }
    var emoji = $(this).data('emoji') || '';
    var html = '';
    if (blob) {
      if (type == 'tgs') {
        html = `<picture class="sticker animated"><div style="padding-top:100%"></div><source type="application/x-tgsticker" srcset="${blob}"></picture>`;
      } else if (type == 'webm') {
        html = `<div class="sticker video"><div style="padding-top:100%"></div><video src="${blob}" width="100%" height="100%" preload muted autoplay loop playsinline disablepictureinpicture></video></div>`;
      } else if (type == 'webp') {
        html = `<i class="sticker image" style="background-image:url(${blob});"><div style="padding-top:100%"></div></i>`;
      }
      html = `<div class="sticker-wrap">${html}</div>`;
    } else if (doc_id) {
      html = await StickerPicker.loadStickerHtml(doc_id);
    } else if (sticker_raw) {
      html = Aj.state.stickerIndex['s' + sticker_raw];
    } 
    $('.tm-bottom-sheet-content').html(html);
    $(`<div class="tm-sticker-preview-emoji">${emoji}</div>`).appendTo('.tm-bottom-sheet-content');
    gec('.sticker.image', function() {
      TSticker.init(this);
    });
    gec('.sticker.animated', function() {
      RLottie.init(this);
    });
    gec('.sticker.video', function() {
      TVideoSticker.init(this, false, false, {allowSafari: true});
      if (window.isSafari) {
        $(`<div class="tm-sticker-preview-note">${l('WEB_SAFARI_WEBM_ISSUE')}</div>`).appendTo('.tm-bottom-sheet-content');        
      }
    });
    $('.tm-bottom-sheet-overlay').toggleClass('hidden');
    WebApp.HapticFeedback.impactOccurred('soft');
  },
  hideOverlay() {
    $('.tm-bottom-sheet-overlay').toggleClass('hidden');
    $('.tm-bottom-sheet-overlay .sticker.animated').each(function () {
      RLottie.destroy(this);
    });
  },
  deleteSticker() {
    var isPackPage = Aj.state.PackPage;
    if (isPackPage && $('.tm-grid-item-sticker').length <= 1) {
      return PackPage.askDeletePack();
    }
    var isEmojis = Aj.state.isEmojis;
    WebApp.showPopup({
      title: l(isEmojis ? 'WEB_POPUP_DELETE_EMOJI_TITLE' : 'WEB_POPUP_DELETE_STICKER_TITLE'),
      message: l(isEmojis ? 'WEB_POPUP_DELETE_EMOJI' : 'WEB_POPUP_DELETE_STICKER'),
      buttons: [
        {
          id: 'delete',
          text: l('WEB_POPUP_DELETE_BTN'),
          type: 'destructive',
        },
        {
          type: 'cancel',
        },
      ]
    }, (result) => {
      if (result !== 'delete') return;
      var target = Aj.state.targetSticker;
      var $el = $(`[data-raw=${target}], [data-doc=${target}]`);
      var blob = $el.data('blob');
      Aj.state.hasDeleted = true;
      $el.remove();
      if (blob) {
        URL.revokeObjectURL(blob);
      }
      if (isPackPage) {
        Aj.state.hasDeleted = true;
        PackPage.hasChanges();
      }
    });
  },
  getStickersData() {
    var stickersEls = $('.tm-grid-item').toArray();
    return stickersEls.map(el => ({
      sticker_raw: el.dataset.raw,
      emoji: el.dataset.emoji
    }));
  },
  submitChanges(onSuccess = null) {
    var stickers = PackPage.getStickersData();
    Aj.apiRequest('updateStickerSet', {
      pack_id: Aj.state.packId,
      stickers: stickers,
      thumb: Aj.state.thumb || '' 
    }, (res) => {
      if (res.error) {
        Main.showErrorToast(res.error);
      }
      if (res.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          Main.showSuccessToast(res.msg);
        }
        if (Aj.state.PackPage) {
          Aj.state.thumb = false;
          Aj.state.hasDeleted = false;
          Aj.state.initialStickersData = stickers;
          PackPage.hasChanges();
        }
      }
    });
  },
  setPackIcon() {
    Aj.state.thumb = Aj.state.targetSticker;
    var src = $(`.tm-grid-item[data-raw=${Aj.state.targetSticker}] img`).attr('src');
    $('.tm-main-intro-picture').attr('src', src);
    PackPage.hasChanges();
  },
  hasChanges() {
    var hasChanges = Aj.state.thumb || Aj.state.hasDeleted;

    if (!hasChanges) {
      var initialStickers = Aj.state.initialStickersData;
      hasChanges = JSON.stringify(initialStickers) != JSON.stringify(PackPage.getStickersData());
    }
    Aj.state.hasChanges = true;

    if (hasChanges) {
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }
  },
  askDeletePack() {
    WebApp.showPopup({
      title: l('WEB_POPUP_DELETE_TITLE'),
      message: l('WEB_POPUP_DELETE'),
      buttons: [
        {
          id: 'delete',
          text: l('WEB_POPUP_DELETE_BTN'),
          type: 'destructive',
        },
        {
          type: 'cancel',
        },
      ]
    }, (result) => {
      if (result !== 'delete') return;
      Aj.apiRequest('deleteStickerSet', {
        pack_id: Aj.state.packId,
      }, res => {
        if (res.error) {
          Main.showErrorToast(res.error);
        } else {
          Aj.onUnload(() => {
            Main.showSuccessToast(res.msg);            
          });
          Aj.location('/stickers');
        }
      });
    });
  }
}

var StickerPicker = {
  init() {
    Aj.state.stickerPickerSelected = {};

    var storeBtnText = WebApp.MainButton.text;
    var storeBtnAction = Aj.state.onMainButton;
    
    StickerPicker.initOnce();
    Aj.state.onMainButton = StickerPicker.eMainClick;
    WebApp.MainButton.setText(l('WEB_STICKER_PICKER_ADD'));
    WebApp.MainButton.show();

    Aj.state.pickerDestroy = () => {
      WebApp.MainButton.setText(storeBtnText);
      Aj.state.onMainButton = storeBtnAction;
    }

    $('.tm-search-input').on('input', StickerPicker.eSearchInput);

    StickerPicker.loadKeywords();
  },
  deinit() {
    Aj.state.pickerDestroy && Aj.state.pickerDestroy();
  },
  initOnce() {
    if (Aj.state.stickerPickerInited) {
      return;
    }
    Aj.state.stickerPickerInited = true;
    $(document).on('click', '.js-sticker-picker-item', StickerPicker.eClickItem);
  },
  loadKeywords() {
    var cacheKey = 'emojiKeywords';
    var cached = window._localCache[cacheKey];
    if (cached) {
      Aj.state.emojiKeywords = cached;
      return cached;
    }

    Aj.apiRequest('getEmojiKeywords', {}, res => {
      window._localCache[cacheKey] = res.keywords;
      Aj.state.emojiKeywords = res.keywords;
    });
  },
  open() {
    var openHtml = (html) => {
      var $popup = $(html).on('popup:close', StickerPicker.deinit);
      openPopup($popup);
      StickerPicker.init();
    }
    var cacheKey = Aj.state.isEmojis ? 'stickerPickerHtmlEmoji' : 'stickerPickerHtml';
    var cached = window._localCache[cacheKey];
    if (cached) {
      openHtml(cached);
    } else {
      if (Aj.state._stickerPickerLoading) {
        return;
      }
      Aj.state._stickerPickerLoading = true;
      Aj.apiRequest('getStickerPicker', {
        emojis: Aj.state.isEmojis || '',
      }, res => {
        if (res.error) {
          Aj.state._stickerPickerLoading = false;
          Main.showErrorToast(res.error);
        }
        window._localCache[cacheKey] = res.html;
        openHtml(res.html);
      });
    }
  },
  eSearchInput() {
    var val = this.value.trim();

    var emojis = [];
    Object.entries(Aj.state.emojiKeywords || {}).forEach(entry => {
      if (fuzzyMatch(val, entry[0])) {
        emojis.push(...entry[1].split("\u0001"));
      }
    });
    console.log(emojis);

    var match_some_packs = false;
    $('.tm-sticker-picker .tm-sticker-picker-pack').each(function () {
      var doc = $('.tm-section-header', this).text();
      var match_pack = fuzzyMatch(val, doc);
      var match_some = false;
      $('.js-sticker-picker-item', this).each(function () {
        var stickerEmojis = $(this).data('emoji');
        var match = match_pack || emojis.some(emoji => stickerEmojis.includes(emoji));
        $(this).toggleClass('hidden', !match);
        match_some = match_some || match;
      });
      match_pack = match_pack || match_some;
      $(this).toggleClass('hidden', !match_pack);
      match_some_packs = match_some_packs || match_pack;
    });
  },
  eMainClick() {
    var detail = Object.values(Aj.state.stickerPickerSelected);
    document.dispatchEvent(new CustomEvent('sticker-picker-input', {
      detail: detail,
    }));
    closePopup();
  },
  eClickItem() {
    var stickerRaw = $(this).data('raw');
    var docId = $(this).data('doc');
    var newState = !Aj.state.stickerPickerSelected[stickerRaw];
    if (newState) {
      Aj.state.stickerPickerSelected[stickerRaw] = {
        thumb: $('img', this).attr('src'),
        stickerRaw: stickerRaw,
        docId: docId,
        emoji: $(this).data('emoji'),
      };      
    } else {
      delete Aj.state.stickerPickerSelected[stickerRaw];
    }

    StickerPicker.loadStickerHtml(docId);
    
    $(this).toggleClass('active', newState);

    WebApp.HapticFeedback.impactOccurred('soft'); 
  },
  loadStickerHtml(docId) {
    var cacheKey = 'stickerHtml_' + docId;
    var cached = window._localCache[cacheKey];
    if (cached) {
      return cached;
    }
    return new Promise((resolve) => {
      Aj.apiRequest('getStickerHtml', {doc_id: docId}, res => {
        if (res.error) {

        } else {
          window._localCache[cacheKey] = res.html;
          resolve(res.html);
        }
      })
    })
  }
}

var MainPage = {
  init() {
    $('input[name=query]').on('input', MainPage.eSearchInput);
    $('.js-tab-button[data-scope=display]').on('click', MainPage.eDisplayTabClick);
    $('.js-tab-button[data-scope=type]').on('click', MainPage.eTypeTabClick);
    $('.js-pack-delete').on('click', MainPage.eClickDelete);
    $('.js-link-copy').on('click', MainPage.eClickCopy);
  },
  eTypeTabClick() {
    var $tab = $(this);
    if ($tab.hasClass('active')) return;
    $('input[name=query]').val('').trigger('input');
    var $oldTab = $('.js-tab-button[data-scope=type].active');
    var oldTarget = $oldTab.data('tab');
    var newTarget = $tab.data('tab');
    $(`.js-tab-content[data-tab=${oldTarget}]`).addClass('hidden');
    $(`.js-tab-content[data-tab=${newTarget}]`).removeClass('hidden');
    $oldTab.removeClass('active');
    $tab.addClass('active');
    Aj.state.type = newTarget;
    WebApp.HapticFeedback.impactOccurred('soft');
    MainPage.saveSettings();
  },
  eDisplayTabClick() {
    var tab = this.dataset.tab;
    if (Aj.state.display == tab) {
      return;
    }
    $('main').toggleClass('tm-mode-grid', tab === 'grid');
    $('.js-tab-button[data-scope=display].active').toggleClass('active');
    $(this).addClass('active');
    Aj.state.display = tab;
    WebApp.HapticFeedback.impactOccurred('soft');
    MainPage.saveSettings();
  },
  saveSettings() {
    var json = JSON.stringify({d: Aj.state.display, t: Aj.state.type});
    var str = encodeURIComponent(json);
    document.cookie = `stel_bot_stickers_settings=${str}; path=/stickers; max-age=31536000; Secure`;
  },
  eSearchInput() {
    var value = this.value || '';
    var empty = true;
    $('.tm-pack-list:not(.hidden) .tm-row').each((i, el) => {
      let doc = $('.tm-row-value', el).text() + ' ' + $(el).data('shortName');
      let hide = el.classList.contains('tm-row-add') || !fuzzyMatch(value, doc);
      hide = hide && !!value;
      empty = empty && hide;
      $(el).toggleClass('hidden', hide);
    });
    $('.js-results-empty').toggleClass('hidden', !empty);
    $('.js-results-empty-help').text(l('WEB_MAIN_NO_RESULTS_INFO', {query: value}));
  },
  eClickCopy() {
    var value = $(this).data('value');
    navigator.clipboard.writeText(value);
    Main.showSuccessToast(l('WEB_LINK_COPIED'));
  },
  eClickDelete() {
    var pack_id = $(this).data('id');
    var $item = $(this).closest('.tm-dropdown');

    WebApp.showPopup({
      title: l('WEB_POPUP_DELETE_TITLE'),
      message: l('WEB_POPUP_DELETE'),
      buttons: [
        {
          id: 'delete',
          text: l('WEB_POPUP_DELETE_BTN'),
          type: 'destructive',
        },
        {
          type: 'cancel',
        },
      ]
    }, (result) => {
      if (result !== 'delete') return;
      Aj.apiRequest('deleteStickerSet', {
        pack_id: pack_id,
      }, res => {
        if (res.error) {
          Main.showErrorToast(res.error);
        } else {
          Aj.onUnload(() => {
            Main.showSuccessToast(res.msg);            
          });
          $item.remove();
        }
      });
    });
  }
}

function requestUpload(target, callback = null, options = {}) {
  options = {  
    accept: 'image/*',
    preventError: false,
    onSelected: null,
    ...options 
  }

  $input = $(`<input type="file" accept="${options.accept}" style="display: none">`);
  Aj.state.fileLoading = Aj.state.fileLoading || 0;
  Aj.state.files = Aj.state.files || {};

  let upload = (file) => {
    Aj.uploadRequest('upload', file, { target: target }, res => {
      Aj.state.fileLoading--;

      if (res.ok) {
        Aj.state.files[target] = res.media;
      }
      if (res.error && !options.preventError) {
        Main.showErrorToast(res.error);
      }
      if (callback) {
        callback(res);        
      }
    });
  }

  $input.on('change', () => {
    let file = $input[0].files[0];
    if (!file) return;

    processImage(file, res => upload(res), target);

    options.onSelected?.(file);

    Aj.state.fileLoading++;
    
    $input.remove();
  });
  $input.on('cancel', () => {
    callback({ cancel: true });

    $input.remove();
  })
  $('body').append($input);
  $input.click();
}


function processImage(file, callback, target='game_pic') {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (target == 'emoji' || target == 'stickers_thumb') {
        canvas.width = 100;
        canvas.height = 100;
      } else {
        canvas.width = 512;
        canvas.height = 512;
      }

      const srcAspect = img.width / img.height;
      let dstAspect = canvas.width / canvas.height;

      let sx, sy, sw, sh;
      if (srcAspect > dstAspect) {
        sh = img.height;
        sw = sh * dstAspect;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / dstAspect;
        sx = 0;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(function(blob) {
        file = new File([blob], file.name + '.webp', { type: 'image/webp' });
        callback(file);
      }, 'image/webp', 0.92);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function strEmojiToHex(emoji, trim_ef0f) {
  var hex = encodeURIComponent(emoji).replace(/%([0-9a-f]{2})|(.)/gi, function(m, m1, m2){ return m1 || m2.charCodeAt(0).toString(16); }).toUpperCase();
  if (trim_ef0f !== false) hex = hex.replace(/EFB88F/g, '');
  return hex;
}
function cleanHTML(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, getBR());
}
function cleanRE(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function debounce() {
  let timer;
  return function (callback, delay = 300) {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
}

var _backButton = null;
function setBackButton(url) {
  if (_backButton) {
    WebApp.BackButton.offClick(_backButton);      
  }
  if (url) {
    _backButton = () => {
      if ((closePopup() === false)) Aj.location(url)
    };
    WebApp.BackButton.onClick(_backButton);
    WebApp.BackButton.show();
  } else {
    _backButton = null;
    WebApp.BackButton.hide();
  }
}

function fuzzyMatch(needle, haystack) {
  var needle = needle.toLowerCase();
  var haystack = haystack.toLowerCase();
  for (var i = 0, j = 0; j < haystack.length; j++) {
    if (needle[i] === haystack[j]) {
      i++;
    }
    if (i === needle.length) {
      return true;
    }
  }
  return false;
}

function initBackSwipe() {
  if ($('.tm-swipe-back').length) {
    return;
  }
  $('<div class="tm-swipe-back"></div>').appendTo('body');

  const threshold = 120;

  var touchstartX = 0;
  var touchstartY = 0;
  var touchendX = 0;
  var touchendY = 0;

  var zone = document;
  var type = null;
  var notified = false;
  var feedbackDelay = false;

  var isRtl = document.documentElement.classList.contains('lang_rtl');

  zone.addEventListener('touchstart', function(event) {
      touchstartX = event.touches[0].screenX;
      touchstartY = event.touches[0].screenY;
      window._canvasInteraction = (event.target.tagName == 'CANVAS');
  });

  zone.addEventListener('touchmove', function(event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;

      if (window._sortInProgress) return;
      if (window._canvasInteraction) return;

      deltaX = (touchendX - touchstartX) * (isRtl ? -1 : 1);
      deltaY = touchendY - touchstartY;

      const isHorizontal = Math.abs(deltaX) > 30 && 
                                     Math.abs(deltaY) < 30;

      if (type === 'h') {
          event.preventDefault();
      } else if (!event.cancelable) {
        return
      }           
      if (isHorizontal && !type && event.cancelable) {
          type = 'h';
          event.preventDefault();
      }
      if (deltaX > threshold && !notified) {
        notified = true;
        feedbackDelay = true;
        setTimeout(() => feedbackDelay = false, 80);
        WebApp.HapticFeedback.impactOccurred('soft');;
      }
      var translateX = deltaX / 1.2;
      translateX = asymptoticInterp(deltaX / 1.2 / 120, 0, 130, 1);
      translateX -= 40;
      $('.tm-swipe-back')[0].style.insetInlineStart = translateX - 52 + 'px';
  }, {passive: false})

  zone.addEventListener('touchend', function(event) {
    var finalDeltaX = (touchendX - touchstartX) * (isRtl ? -1 : 1);
    if (type == 'h' && finalDeltaX > threshold) {
      if (!feedbackDelay) {
        WebApp.HapticFeedback.impactOccurred('light');
      }
      if (_backButton) {
        _backButton();        
      } else {
        WebApp.close();
      }
    }
    notified = false;
    type = null;
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    $('.tm-swipe-back')[0].style.insetInlineStart = '-92px';
  }, false);

  function asymptoticInterp(t, start, end, rate = 5) {
    if (t <= 0) return start;
    return start + (end - start) * (t / (t + 0.5));
  }
}


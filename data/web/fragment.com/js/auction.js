
var Main = {
  CHECK_PERIOD: 400,
  UPDATE_PERIOD: 1200,
  FORCE_UPDATE_PERIOD: 5000,
  init: function() {
    Aj.onLoad(function(state) {
      var cont = Aj.ajContainer;
      $(window).on('resize', Main.onResize);
      $('.js-logo-hoverable').on('mouseover', Main.ePlayLogo);
      $('.js-logo-clickable').on('click', Main.ePlayLogo);
      $('.js-logo-icon').on('animationend', Main.eLogoAnimEnd);
      $(cont).on('click.curPage', '.js-header-menu-button', Main.eHeaderMenu);
      $(cont).on('click.curPage', '.js-header-menu-close-button', Main.eHeaderMenuClose);
      $(cont).on('click.curPage', '.js-btn-tonkeeper', Main.eTonkeeperOpen);
      $(cont).on('click.curPage', '.js-auction-unavail', Main.eAuctionUnavailable);
      $(cont).on('click.curPage', '.js-howitworks', Main.eHowitworks);
      $(cont).on('click.curPage', '.js-howofferworks', Main.eHowofferworks);
      $(cont).on('click.curPage', '.js-bots-about', Main.eBotsAbout);
      $(cont).on('click.curPage', '.logout-link', Login.logOut);
      $(cont).on('click.curPage', '.ton-logout-link', Login.tonLogOut);
      $(cont).on('click.curPage', '.js-copy-code', Main.copyCode);
      $(cont).on('click.curPage', '.js-main-search-dd-item', Main.eMainSearchDDSelected);
      state.$headerMenu = $('.js-header-menu');
      state.$unavailPopup = $('.js-unavailable-popup');
      state.$howitworksPopup = $('.js-howitworks-popup');
      state.$howofferworksPopup = $('.js-howofferworks-popup');
      state.$botsaboutPopup = $('.js-botsabout-popup');
      state.$mainSearchField = $('.js-main-search-field');
      state.$mainSearchForm = $('.js-main-search-form');
      state.$mainSearchForm.on('submit', Main.eMainSearchSubmit);
      state.$mainSearchForm.field('query').on('input', Main.eMainSearchInput);
      state.mainSearchCache = {};
      $('.js-form-clear', state.$mainSearchForm).on('click', Main.eMainSearchClear);
      Main.updateTime();
      Main.initViewport();
      Main.initLogo();
    });
    Aj.onUnload(function(state) {
      clearTimeout(Aj.state.searchTimeout);
      $(window).off('resize', Main.onResize);
      $('.js-logo-hoverable').off('mouseover', Main.ePlayLogo);
      $('.js-logo-clickable').off('click', Main.ePlayLogo);
      $('.js-logo-icon').off('animationend', Main.eLogoAnimEnd);
      state.$mainSearchForm.off('submit', Main.eMainSearchSubmit);
      state.$mainSearchForm.field('query').off('input', Main.eMainSearchInput);
      $('.js-form-clear', state.$mainSearchForm).off('click', Main.eMainSearchClear);
    });
  },
  initForm: function(form) {
    var $form = $(form);
    $('.form-control:has(+.form-control-hint)', $form).on('keyup change input', Main.eUpdateFieldHint);
    $('.js-amount-input', $form).on('keyup change input', Main.eUpdateAmountField);
    $('.js-amount-input', $form).trigger('input');
  },
  destroyForm: function(form) {
    var $form = $(form);
    $('.form-control:has(+.form-control-hint)', $form).off('keyup change input', Main.eUpdateFieldHint);
    $('.js-amount-input', $form).off('keyup change input', Main.eUpdateAmountField);
  },
  updateTime: function() {
    var now = Math.round(+(new Date) / 1000);
    if (Main._lastUpdateTime != now) {
      Main._lastUpdateTime = now;
      $('time[datetime]', Aj.ajContainer).each(function () {
        var $time = $(this), datetime = $time.attr('datetime');
        var mode = $time.attr('data-relative');
        if (mode) {
          var date = new Date(datetime);
          var cur_date = new Date();
          var time_left = Math.floor((date - cur_date) / 1000);
          if (mode == 'ago-text') {
            time_left = -time_left;
          }
          var ended = time_left < 0;
          if (time_left < 0) time_left = 0;
          var days = Math.floor(time_left / 86400);
          var hours = Math.floor((time_left % 86400) / 3600);
          var minutes = Math.floor((time_left % 3600) / 60);
          var seconds = (time_left % 60);
          var days_html = l('{n:# days|# day|# days}', {n: days});
          if (mode == 'counter') {
            var hours0   = Math.floor(hours / 10);
            var hours1   = hours % 10;
            var minutes0 = Math.floor(minutes / 10);
            var minutes1 = minutes % 10;
            var seconds0 = Math.floor(seconds / 10);
            var seconds1 = seconds % 10;
            Main.updateDigit($('.timer-d', this), days_html);
            Main.updateDigit($('.timer-h0', this), hours0);
            Main.updateDigit($('.timer-h1', this), hours1);
            Main.updateDigit($('.timer-m0', this), minutes0);
            Main.updateDigit($('.timer-m1', this), minutes1);
            Main.updateDigit($('.timer-s0', this), seconds0);
            Main.updateDigit($('.timer-s1', this), seconds1);
          } else {
            var arr = [];
            if (days > 0) {
              arr.push(days_html);
            }
            if (arr.length || hours > 0) {
              arr.push(l('{n:# hours|# hour|# hours}', {n: hours}));
            }
            if (arr.length || minutes > 0) {
              arr.push(l('{n:# minutes|# minute|# minutes}', {n: minutes}));
            }
            if (!days && !hours && (mode == 'text' || !minutes)) {
              arr.push(l('{n:# seconds|# second|# seconds}', {n: seconds}));
            }
            arr = arr.slice(0, mode == 'short-text' ? 2 : (mode == 'ago-text' ? 1 : 3));
            var text = arr.join(' ');
            if (text != $time.text()) {
              $time.text(text);
            }
          }
          $(this).closest('.js-timer-wrap').toggleClass('ended', ended);
        } else {
          var title = $time.attr('title'),
              html = $time.html(),
              new_html = formatDateTime(datetime, false, !$time.hasClass('short'));
          if (html != new_html) {
            $time.html(new_html);
          }
          $time.removeAttr('datetime');
        }
      });
    }
    requestAnimationFrame(Main.updateTime);
  },
  updateDigit: function($el, value) {
    var cur_value = $el.attr('data-val');
    if (cur_value != value) {
      $el.removeAttr('data-prev-val');
      $el.map(function(){ this.offsetTop; });
      $el.attr('data-val', value);
      $el.attr('data-prev-val', cur_value);
    }
  },
  fitUsername: function($el) {
    $el.each(function(){
      var init_size = $(this).data('init-size');
      if (!init_size) {
        init_size = parseInt($(this).css('font-size'));
        $(this).data('init-size', init_size);
      }
      var size = parseInt($(this).css('font-size'));
      size = parseInt(size);
      while (this.scrollWidth > this.offsetWidth) {
        size -= 0.5;
        if (size >= init_size * 0.75) {
          $(this).css('font-size', size + 'px');
        } else {
          break;
        }
      }
      var text = $(this).attr('title') || $(this).text();
      var prefix_len = text.length - 3;
      while (this.scrollWidth > this.offsetWidth &&
             prefix_len > 3) {
        prefix_len--;
        $(this).text(text.substr(0, prefix_len) + '…' + text.substr(-3));
      }
    });
  },
  initViewport: function() {
    if (!window.$viewportHelper) {
      window.$viewportHelper = $('<div>').css({position: 'absolute', left: '-100px', top: '0', height: '100vh'}).appendTo('body');
    }
    Main.onResize();
  },
  onResize: function() {
    var vh = window.innerHeight;
    if (window.$viewportHelper && window.$viewportHelper.height() != vh) {
      document.documentElement.style.setProperty('--viewport-height', vh + 'px');
    } else {
      document.documentElement.style.removeProperty('--viewport-height');
    }
  },
  initLogo: function() {
    if (!Aj.globalState.logoInited) {
      Aj.globalState.logoInited = true;
      var main_url = '/img/TelemintLogoSprite1.svg';
      var mainLogo = new Image();
      mainLogo.onload = function() {
        Aj.globalState.logoImageMain = main_url;
        $('.js-header-logo').each(function() {
          Main.playLogo(this, true);
        });
      };
      mainLogo.src = main_url;
      var url2 = '/img/TelemintLogoSprite2.svg';
      var logo2 = new Image();
      logo2.onload = function() {
        Aj.globalState.logoImage2 = url2;
      };
      logo2.src = url2;
      var url3 = '/img/TelemintLogoSprite3.svg';
      var logo3 = new Image();
      logo3.onload = function() {
        Aj.globalState.logoImage3 = url3;
      };
      logo3.src = url3;
    }
  },
  ePlayLogo: function(e) {
    Main.playLogo(this);
  },
  playLogo: function(el, init_logo) {
    var $el = $(el);
    if (!$el.hasClass('play')) {
      var url = Aj.globalState.logoImageMain;
      if (!init_logo && $el.hasClass('js-random-logo')) {
        var rnd = Math.random();
        if (rnd > 0.9 && Aj.globalState.logoImage3) {
          url = Aj.globalState.logoImage3;
        } else if (rnd > 0.8 && Aj.globalState.logoImage2) {
          url = Aj.globalState.logoImage2;
        }
      }
      $el.each(function() {
        this.style.setProperty('--image-url-logo-icon-animated', 'url(\'' + url + '\')');
      });
      $el.addClass('play');
    }
  },
  eLogoAnimEnd: function(e) {
    $(this).parents('.js-logo').removeClass('play');
  },
  eHeaderMenu: function(e) {
    e.preventDefault();
    openPopup(Aj.state.$headerMenu, {
      noAppend: true
    });
  },
  eHeaderMenuClose: function(e) {
    e.preventDefault();
    closePopup(Aj.state.$headerMenu);
  },
  eAuctionUnavailable: function(e) {
    e.preventDefault();
    var username = $(this).attr('data-username');
    var later = +$(this).attr('data-later');
    var onEnterPress = function(e) {
      if (e.keyCode == Keys.RETURN) {
        e.stopImmediatePropagation();
        closePopup(Aj.state.$unavailPopup);
      }
    };
    openPopup(Aj.state.$unavailPopup, {
      onOpen: function() {
        $('.js-username', this).html(username);
        $('.js-unavailable-text', this).toggleClass('hide', !!later);
        $('.js-available-later-text', this).toggleClass('hide', !later);
        $(document).on('keydown', onEnterPress);
      },
      onClose: function() {
        $(document).off('keydown', onEnterPress);
      }
    });
  },
  eHowitworks: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var onEnterPress = function(e) {
      if (e.keyCode == Keys.RETURN) {
        e.stopImmediatePropagation();
        closePopup(Aj.state.$howitworksPopup);
      }
    };
    openPopup(Aj.state.$howitworksPopup, {
      onOpen: function() {
        $(document).on('keydown', onEnterPress);
      },
      onClose: function() {
        $(document).off('keydown', onEnterPress);
      }
    });
  },
  eHowofferworks: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var onEnterPress = function(e) {
      if (e.keyCode == Keys.RETURN) {
        e.stopImmediatePropagation();
        closePopup(Aj.state.$howofferworksPopup);
      }
    };
    openPopup(Aj.state.$howofferworksPopup, {
      onOpen: function() {
        $(document).on('keydown', onEnterPress);
      },
      onClose: function() {
        $(document).off('keydown', onEnterPress);
      }
    });
  },
  eBotsAbout: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var onEnterPress = function(e) {
      if (e.keyCode == Keys.RETURN) {
        e.stopImmediatePropagation();
        closePopup(Aj.state.$botsaboutPopup);
      }
    };
    openPopup(Aj.state.$botsaboutPopup, {
      onOpen: function() {
        $(document).on('keydown', onEnterPress);
      },
      onClose: function() {
        $(document).off('keydown', onEnterPress);
      }
    });
  },
  amountFieldValue: function($form, field) {
    var $fieldEl = field ? $form.field(field) : $form;
    var minValue = $fieldEl.attr('data-min') || null;
    var maxValue = $fieldEl.attr('data-max') || null;
    var decPoint = $fieldEl.attr('data-dec-point') || '.';
    var value    = $fieldEl.value();

    var float_value = value.length ? value : '0';
    if (decPoint != '.') {
      float_value.split(decPoint).join('.');
    }
    float_value = parseFloat(float_value);
    if (isNaN(float_value) || float_value >= 1e12) {
      return false;
    }
    if (minValue !== null && float_value < minValue ||
        maxValue !== null && float_value > maxValue) {
      return false;
    } else {
      return float_value;
    }
  },
  eUpdateFieldHint: function(e) {
    var $fieldEl = $(this);
    var has_value = $fieldEl.value().length > 0;
    $('+.form-control-hint', $fieldEl).toggle(has_value);
  },
  eUpdateAmountField: function(e) {
    var $fieldEl = $(this);
    var minValue = $fieldEl.attr('data-min') || null;
    var maxValue = $fieldEl.attr('data-max') || null;
    var decPoint = $fieldEl.attr('data-dec-point') || '.';
    var decimals = $fieldEl.attr('data-decimals') || 0;
    var sel_dir   = this.selectionDirection;
    var sel_start = this.selectionStart;
    var sel_end   = this.selectionEnd;
    var value     = this.value;
    var new_sel_start = sel_start;
    var new_sel_end   = sel_end;
    var new_value     = '';
    var has_decimal = false;
    var chars_len = 0;
    var decimal_len = 0;
    for (var i = 0; i < value.length; i++) {
      var char = value[i];
      if ((char == '.' || char == ',') && !has_decimal && decimals > 0) {
        if (!chars_len) {
          new_value += '0';
          if (i < sel_start) new_sel_start++;
          if (i < sel_end) new_sel_end++;
        }
        has_decimal = true;
        new_value += decPoint;
      } else if (char >= '0' && char <= '9' && chars_len < 12 && (!has_decimal || decimal_len < decimals)) {
        new_value += char;
        if (has_decimal) decimal_len++;
        else chars_len++;
      } else {
        if (i < sel_start) new_sel_start--;
        if (i < sel_end) new_sel_end--;
      }
    }
    this.value = new_value;
    this.setSelectionRange(new_sel_start, new_sel_end, sel_dir);
    var float_value = new_value.length ? new_value : '0';
    if (decPoint != '.') {
      float_value.split(decPoint).join('.');
    }
    float_value = parseFloat(float_value);
    var is_invalid = (isNaN(float_value) || float_value >= 1e12);
    var field_value = float_value;
    if (minValue !== null && float_value < minValue ||
        maxValue !== null && float_value > maxValue ||
        is_invalid) {
      field_value = false;
      // Main.showFieldError($fieldEl);
    } else {
      // Main.hideFieldError($fieldEl);
    }
    if (e.type == 'change') {
      if (new_value.length && !is_invalid) {
        this.value = Main.wrapTonAmount(float_value, true);
      }
    }
    if (e.type == 'input') {
      var forClass, usdForClass;
      if (forClass = $fieldEl.attr('data-for')) {
        $('.' + forClass).html(Main.wrapTonAmount(field_value));
      }
      if (usdForClass = $fieldEl.attr('data-usd-for')) {
        $('.' + usdForClass).html(Main.wrapUsdAmount(field_value));
      }
    }
  },
  wrapTonAmount: function(value, field_format) {
    if (!value) {
      return '';
    }
    var dec = (Math.floor(value * 1000000) % 1000000) + '';
    while (dec.substr(-1) == '0') {
      dec = dec.slice(0, -1);
    }
    return formatNumber(value, dec.length, '.', field_format ? '' : ',');
  },
  wrapUsdAmount: function(value, field_format) {
    value = Math.round(value * Aj.state.tonRate * 100) / 100;
    return formatNumber(value, (value % 1) && value < 1000 ? 2 : 0, '.', field_format ? '' : ',');
  },
  eTonkeeperOpen: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var href = $(this).attr('data-href');
    if (href) {
      location.href = href;
    }
  },
  copyText: function(text) {
    var $text = $('<textarea readonly>').css('position', 'fixed').css('left', '-9999px');
    $text.val(text).appendTo('body');
    var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    $text.focus().select();
    document.execCommand('copy');
    $text.remove();
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },
  openApp: function(app_url) {
    if (Aj.state.appUseIframe) {
      var $frame = $('<iframe>').css('position', 'fixed').css('left', '-9999px');
      $frame.appendTo('body');
      var pageHidden = false, hideCallback = function () {
        $(window).off('pagehide blur', hideCallback);
        pageHidden = true;
      };
      $(window).on('pagehide blur', hideCallback);
      $frame.attr('src', app_url);
      if (!Aj.state.appUseIframeOnce) {
        setTimeout(function() {
          if (!pageHidden) {
            window.location = app_url;
          }
        }, 2000);
      }
    } else {
      setTimeout(function() {
        window.location = app_url;
      }, 100);
    }
  },
  copyCode: function() {
    var code = $(this).attr('data-copy');
    var app_url = $(this).attr('data-app-url');
    Main.copyText(code);
    if (app_url) {
      Main.openApp(app_url);
    }
  },
  eMainSearchInput: function(e) {
    if (!Aj.state.quickSearch) {
      return;
    }
    clearTimeout(Aj.state.searchTimeout);
    var cached_results = Main.getSearchCachedResult();
    if (cached_results) {
      Main.updateResults(cached_results);
    } else {
      Aj.state.searchTimeout = setTimeout(Main.searchSubmit, 400);
    }
  },
  eMainSearchDDSelected: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(this).closeDropdown();
    var field = $(this).attr('data-field');
    var value = $(this).attr('data-value');
    var $form  = Aj.state.$mainSearchForm;
    $form.field(field).value(value);
    Main.searchSubmit();
  },
  eMainSearchClear: function(e) {
    var $form = Aj.state.$mainSearchForm;
    $form.field('query').value('');
    Main.searchSubmit();
  },
  eMainSearchSubmit: function(e) {
    e.preventDefault();
    Main.searchSubmit();
  },
  updateResults: function(result) {
    if (result.html) {
      $('.js-search-results', Aj.ajContainer).html(result.html);
      Main.updateTime();
      var loc = Aj.location(), path = loc.pathname + loc.search;
      Aj.setLocation(result.url, path != '/');
    }
    $('.js-main-recent-bids').toggleClass('hide', !result.show_recent_bids);
  },
  getSearchCachedResult: function() {
    var $form  = Aj.state.$mainSearchForm;
    var cache  = Aj.state.mainSearchCache;
    var query  = $form.field('query').value();
    var filter = $form.field('filter').value();
    var sort   = $form.field('sort').value();
    var cache_key = 'q='+query+'&f='+filter+'&s='+sort;
    if (cache[cache_key]) {
      var expire_time = cache[cache_key].expire*1000;
      var now_time = +(new Date);
      if (expire_time > now_time) {
        return cache[cache_key];
      } else {
        delete cache[cache_key];
      }
    }
    return false;
  },
  searchSubmit: function() {
    var $form  = Aj.state.$mainSearchForm;
    var cache  = Aj.state.mainSearchCache;
    var type  = $form.field('type').value();
    var query  = $form.field('query').value();
    var filter = $form.field('filter').value();
    var sort   = $form.field('sort').value();
    var cache_key = 'q='+query+'&f='+filter+'&s='+sort;
    Aj.state.$mainSearchField.addClass('loading').removeClass('play').redraw().addClass('play');
    Aj.showProgress();
    Aj.apiRequest('searchAuctions', {
      type: type,
      query: query,
      filter: filter,
      sort: sort
    }, function(result) {
      Aj.hideProgress();
      if (result.ok) {
        cache[cache_key] = result;
        Main.updateResults(result);
      }
      Aj.state.$mainSearchField.removeClass('loading');
    });
  }
};

var Login = {
  init: function(options) {
    Telegram.Login.init(options, function(user) {
      if (user) {
        Login.auth(user);
      }
    });
  },
  open: function(return_to) {
    Login.returnTo = return_to;
    Telegram.Login.open();
  },
  checkAuth: function (e) {
    if (Aj.state.unAuth) {
      e && e.preventDefault();
      Login.open();
      return false;
    }
    return true;
  },
  auth: function(user) {
    var auth_data = window.btoa(encodeURIComponent(JSON.stringify(user)));
    Aj.apiRequest('logIn', {
      auth: auth_data
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      if (Login.returnTo) {
        location.href = Login.returnTo;
      } else {
        location.reload();
      }
    });
  },
  logOut: function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Aj.apiRequest('logOut', {}, function(result) {
      location.reload();
    });
    return false;
  },
  tonLogOut: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Aj.apiRequest('tonLogOut', {}, function(result) {
      location.reload();
    });
    return false;
  }
};

var Auction = {
  init: function() {
    Aj.onLoad(function(state) {
      var cont = Aj.ajContainer;
      $(cont).on('click.curPage', '.js-place-bid-btn', Auction.ePlaceBid);
      $(cont).on('submit.curPage', '.js-place-bid-form', Auction.ePlaceBidSubmit);
      $(cont).on('click.curPage', '.js-make-offer-btn', Auction.eMakeOffer);
      $(cont).on('submit.curPage', '.js-make-offer-form', Auction.eMakeOfferSubmit);
      $(cont).on('click.curPage', '.js-buy-now-btn', Auction.eBuyNow);
      $(cont).on('click.curPage', '.js-subscribe-btn', Auction.eSubscribe);
      $(cont).on('click.curPage', '.js-unsubscribe-btn', Auction.eUnsubscribe);
      $(cont).on('click.curPage', '.js-load-more-orders', Auction.eLoadMoreOrders);
      $(cont).on('click.curPage', '.js-load-more-owners', Auction.eLoadMoreOwners);
      state.$bidPopup = $('.js-place-bid-popup');
      state.$bidForm = $('.js-place-bid-form');
      Main.initForm(state.$bidForm);
      state.$makeOfferPopup = $('.js-make-offer-popup');
      state.$makeOfferForm = $('.js-make-offer-form');
      Main.initForm(state.$makeOfferForm);
      state.needUpdate = true;
      state.updLastReq = +Date.now();
      state.updStateTo = setTimeout(Auction.updateState, Main.UPDATE_PERIOD);
      Assets.init();
      Account.init();
    });
    Aj.onUnload(function(state) {
      Main.destroyForm(state.$bidForm);
      Main.destroyForm(state.$makeOfferForm);
      clearTimeout(state.updStateTo);
      state.needUpdate = false;
    });
  },
  updateState: function() {
    var now = +Date.now();
    if (document.hasFocus() ||
        Aj.state.updLastReq && (now - Aj.state.updLastReq) > Main.FORCE_UPDATE_PERIOD) {
      Aj.state.updLastReq = now;
      Aj.apiRequest('updateAuction', {
        type: Aj.state.type,
        username: Aj.state.username,
        lt: Aj.state.auctionLastLt,
        lv: Aj.state.auctionLastVer
      }, function(result) {
        if (result.html) {
          $('.js-main-content').html(result.html);
        }
        if (result.lt) {
          Aj.state.auctionLastLt = result.lt;
        }
        if (result.lv) {
          Aj.state.auctionLastVer = result.lv;
        }
        if (Aj.state.needUpdate) {
          Aj.state.updStateTo = setTimeout(Auction.updateState, Main.UPDATE_PERIOD);
        }
      });
    } else {
      if (Aj.state.needUpdate) {
        Aj.state.updStateTo = setTimeout(Auction.updateState, Main.CHECK_PERIOD);
      }
    }
  },
  ePlaceBid: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var amount = $(this).attr('data-bid-amount');
    openPopup(Aj.state.$bidPopup, {
      onOpen: function() {
        Aj.state.$bidForm.reset();
        Aj.state.$bidForm.field('bid_value').value(amount).trigger('input').focusAndSelect();
      }
    });
  },
  ePlaceBidSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var type = Aj.state.type;
    var username = Aj.state.username;
    var item_title = Aj.state.itemTitle;
    var amount = Main.amountFieldValue($form, 'bid_value');
    if (amount === false) {
      $form.field('bid_value').focus();
      return;
    }
    closePopup(Aj.state.$bidPopup);
    QR.showPopup({
      request: {
        method: 'getBidLink',
        params: {
          type: type,
          username: username,
          bid: amount
        }
      },
      title: l('WEB_POPUP_QR_PLACE_BID_HEADER'),
      description: l('WEB_POPUP_QR_PLACE_BID_TEXT', {
        amount: '<span class="icon-before icon-ton-text">' + amount + '</span>'
      }),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_PLACE_BID_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PLACE_BID_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          showAlert(l('WEB_PLACE_BID_SENT'));
        }
      }
    });
  },
  eBuyNow: function(e) {
    e.preventDefault();
    var type = Aj.state.type;
    var username = Aj.state.username;
    var item_title = Aj.state.itemTitle;
    var amount   = $(this).attr('data-bid-amount');
    QR.showPopup({
      request: {
        method: 'getBidLink',
        params: {
          type: type,
          username: username,
          bid: amount
        }
      },
      title: l('WEB_POPUP_QR_BUY_NOW_HEADER', {
        username: '<span class="accent-color">' + item_title + '</span>'
      }),
      description: l('WEB_POPUP_QR_BUY_NOW_TEXT', {
        amount: '<span class="icon-before icon-ton-text">' + amount + '</span>'
      }),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_BUY_NOW_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PLACE_BID_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          showAlert(l('WEB_BUY_NOW_SENT'));
        }
      }
    });
  },
  eMakeOffer: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    Aj.apiRequest('initOfferRequest', {
      type: Aj.state.type,
      username: Aj.state.username
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.state.offerFeeMin = result.min_fee;
      Aj.state.$makeOfferForm.field('id').value(result.req_id);
      var eUpdateOfferFee = function(e) {
        var amount  = Main.amountFieldValue(Aj.state.$makeOfferForm, 'amount_value');
        var mult    = Aj.state.offerFeeMult;
        var fee     = Math.ceil(amount * mult);
        var fee_val = Math.max(Aj.state.offerFeeMin, Math.min(fee, Aj.state.offerFeeMax));
        Aj.state.offerFee = fee_val;
        $('.js-amount_fee', Aj.state.$makeOfferForm).html(Main.wrapTonAmount(fee_val));
      };
      openPopup(Aj.state.$makeOfferPopup, {
        onOpen: function() {
          Aj.state.$makeOfferForm.reset();
          var $amountField = Aj.state.$makeOfferForm.field('amount_value');
          $amountField.on('keyup change input', eUpdateOfferFee);
          $amountField.trigger('input').focusAndSelect();
        },
        onClose: function() {
          var $amountField = Aj.state.$makeOfferForm.field('amount_value');
          $amountField.off('keyup change input', eUpdateOfferFee);
        }
      });
    });
  },
  eMakeOfferSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var item_title = Aj.state.itemTitle;
    var req_id = $form.field('id').value();
    var amount = Main.amountFieldValue($form, 'amount_value');
    if (amount === false) {
      $form.field('amount_value').focus();
      return;
    }
    closePopup(Aj.state.$makeOfferPopup);
    QR.showPopup({
      request: {
        method: 'getOfferLink',
        params: {
          id: req_id,
          amount: amount
        }
      },
      title: l('WEB_POPUP_QR_OFFER_HEADER'),
      description: l('WEB_POPUP_QR_OFFER_TEXT', {
        amount: '<span class="icon-before icon-ton-text js-amount_fee">' + Main.wrapTonAmount(Aj.state.offerFee) + '</span>'
      }),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_OFFER_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onDataUpdate: function(data) {
        $('.js-amount_fee', this).html(Main.wrapTonAmount(data.fee));
      },
      onConfirm: function(by_server) {
        if (by_server) {
          showAlert(l('WEB_OFFER_REQUEST_MADE'));
        }
      }
    });
  },
  eSubscribe: function(e) {
    if (!Login.checkAuth(e)) {
      return false;
    }
    e.preventDefault();
    Aj.apiRequest('subscribe', {
      type: Aj.state.type,
      username: Aj.state.username
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('.js-subscribe').addClass('subscribed');
    });
  },
  eUnsubscribe: function(e) {
    if (!Login.checkAuth(e)) {
      return false;
    }
    e.preventDefault();
    Aj.apiRequest('unsubscribe', {
      type: Aj.state.type,
      username: Aj.state.username
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('.js-subscribe').removeClass('subscribed');
    });
  },
  eLoadMoreOrders: function(e) {
    e.preventDefault();
    var $table    = $(this).closest('table');
    var offset_id = $(this).attr('data-next-offset');
    Aj.apiRequest('getOrdersHistory', {
      type: Aj.state.type,
      username: Aj.state.username,
      offset_id: offset_id
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('tbody', $table).append(result.body);
      $('tfoot', $table).html(result.foot);
    });
  },
  eLoadMoreOwners: function(e) {
    e.preventDefault();
    var $table    = $(this).closest('table');
    var offset_id = $(this).attr('data-next-offset');
    Aj.apiRequest('getOwnersHistory', {
      type: Aj.state.type,
      username: Aj.state.username,
      offset_id: offset_id
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('tbody', $table).append(result.body);
      $('tfoot', $table).html(result.foot);
    });
  }
};

var Assets = {
  init: function() {
    Aj.onLoad(function(state) {
      $(document).on('click.curPage', '.js-assign-btn', Assets.eAssignToTelegram);
      $(document).on('submit.curPage', '.js-assign-form', Assets.eAssignSubmit);
      $(document).on('submit.curPage', '.js-bot-username-form', Assets.eBotUsernameSubmit);
      $(document).on('click.curPage', '.js-get-code-btn', Assets.eGetCode);
      $(document).on('click.curPage', '.js-put-to-auction-btn', Assets.ePutToAuction);
      $(document).on('submit.curPage', '.js-put-to-auction-form', Assets.ePutToAuctionSubmit);
      $(document).on('click.curPage', '.js-cancel-auction-btn', Assets.eCancelAuction);
      $(document).on('click.curPage', '.js-sell-username-btn', Assets.eSellUsername);
      $(document).on('submit.curPage', '.js-sell-username-form', Assets.eSellUsernameSubmit);
      $('.table-selectable-in-row').on('mouseover mouseout', Assets.eTableRowSelHovered);
      state.$assignPopup = $('.js-assign-popup');
      state.$assignForm = $('.js-assign-form');
      state.$botUsernamePopup = $('.js-bot-username-popup');
      state.$botUsernameForm = $('.js-bot-username-form');
      state.$botUsernameWaitingPopup = $('.js-bot-username-waiting-popup');

      state.$putToAuctionPopup = $('.js-put-to-auction-popup');
      state.$putToAuctionForm = $('.js-put-to-auction-form');
      Main.initForm(state.$putToAuctionForm);
      state.$sellUsernamePopup = $('.js-sell-username-popup');
      state.$sellUsernameForm = $('.js-sell-username-form');
      Main.initForm(state.$sellUsernameForm);
    });
    Aj.onUnload(function(state) {
      $('.table-selectable-in-row').off('mouseover mouseout', Assets.eTableRowSelHovered);
      Main.destroyForm(state.$putToAuctionForm);
      Main.destroyForm(state.$sellUsernameForm);
      clearTimeout(Aj.state.waitingTo);
    });
  },
  eTableRowSelHovered: function(e) {
    $(this).closest('.tm-row-selectable').toggleClass('noselect', e.type == 'mouseover');
  },
  eGetCode: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var href = $(this).attr('data-href');
    if (href) {
      Aj.location(href);
    }
  },
  eAssignToTelegram: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $actions    = $(this).closest('.js-actions');
    var username    = $actions.attr('data-username');
    var assigned_to = $actions.attr('data-assigned-to');
    openPopup(Aj.state.$assignPopup, {
      onOpen: function() {
        Aj.state.$assignForm.reset();
        Aj.state.$assignForm.field('username').value(username);
        Aj.state.$assignForm.field('assign_to').value(assigned_to);
        $('.js-assign-account-item.external').addClass('hide');
        if (assigned_to) {
          $('.js-assign-account-item:has(input[name="assign_to"][value="' + assigned_to + '"])', Aj.state.$assignPopup).each(function() {
            $(this).removeClass('hide');
            if (this.scrollIntoViewIfNeeded) {
              this.scrollIntoViewIfNeeded();
            } else if (this.scrollIntoView) {
              this.scrollIntoView();
            }
          });
        }
      },
      onClose: function() {
        Aj.state.$assignForm.field('username').value('');
        Aj.state.$assignForm.field('assign_to').value(false);
      }
    });
  },
  eAssignSubmit: function(e) {
    e.preventDefault();
    var $form     = $(this);
    var username  = $form.field('username').value();
    var assign_to = $form.field('assign_to').value();
    Assets.assignToTelegram(username, assign_to);
  },
  assignToTelegram: function(username, assign_to) {
    Aj.apiRequest('assignToTgAccount', {
      username: username,
      assign_to: assign_to
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      clearTimeout(Aj.state.waitingTo);
      if (result.waiting) {
        closePopup(Aj.state.$assignPopup);
        closePopup(Aj.state.$botUsernamePopup);
        if (Aj.state.$botUsernameWaitingPopup.hasClass('hide')) {
          openPopup(Aj.state.$botUsernameWaitingPopup);
        }
        Aj.state.waitingTo = setTimeout(Assets.assignToTelegram, 1000, username, assign_to);
      } else if (result.need_pay) {
        closePopup();
        Aj.state.botUsername = result.username;
        Aj.state.botUsernameFee = result.amount;
        Aj.state.botUsernameAssignTo = assign_to;
        $('.js-username', Aj.state.$botUsernamePopup).html('@' + result.username);
        $('.js-amount', Aj.state.$botUsernamePopup).html(result.amount);
        Aj.state.$botUsernameForm.field('id').value(result.req_id);
        openPopup(Aj.state.$botUsernamePopup);
      } else {
        closePopup();
        $('.js-actions', Aj.ajContainer).each(function() {
          if ($(this).attr('data-username') == username) {
            $(this).attr('data-assigned-to', assign_to);
          }
        });
        if (result.msg) {
          showAlert(result.msg);
        }
      }
    });
  },
  eBotUsernameSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var req_id = $form.field('id').value();
    closePopup(Aj.state.$botUsernamePopup);
    QR.showPopup({
      request: {
        method: 'getBotUsernameLink',
        params: {
          id: req_id
        }
      },
      title: l('WEB_POPUP_QR_BOT_USERNAME_HEADER'),
      description: l('WEB_POPUP_QR_BOT_USERNAME_TEXT', {
        amount: '<span class="icon-before icon-ton-text js-amount_fee">' + Main.wrapTonAmount(Aj.state.botUsernameFee) + '</span>'
      }),
      qr_label: '@' + Aj.state.botUsername,
      tk_label: l('WEB_POPUP_QR_BOT_USERNAME_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        Assets.assignToTelegram(Aj.state.botUsername, Aj.state.botUsernameAssignTo);
      }
    });
  },
  ePutToAuction: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closeDropdown();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    var item_title = $actions.attr('data-item-title');
    var def_bid  = $actions.attr('data-def-bid');
    var doPutToAuction = function() {
      $('.js-username', Aj.state.$putToAuctionPopup).html(item_title);
      openPopup(Aj.state.$putToAuctionPopup, {
        onOpen: function() {
          Aj.state.$putToAuctionForm.reset();
          Aj.state.$putToAuctionForm.field('username').value(username);
          Aj.state.$putToAuctionForm.data('item_title', item_title);
          Aj.state.$putToAuctionForm.field('min_bid_value').value(def_bid).trigger('input').focusAndSelect();
        }
      });
    };
    if ($actions.attr('data-need-check')) {
      Aj.apiRequest('canSellItem', {
        type: Aj.state.type,
        username: username,
        auction: true
      }, function(result) {
        if (result.confirm_message) {
          showConfirm(result.confirm_message, function() {
            doPutToAuction();
          }, result.confirm_button);
        } else {
          doPutToAuction();
        }
      });
    } else {
      doPutToAuction();
    }
  },
  ePutToAuctionSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var username = $form.field('username').value();
    var item_title = Aj.state.$putToAuctionForm.data('item_title');
    var min_amount = Main.amountFieldValue($form, 'min_bid_value');
    var max_amount = Main.amountFieldValue($form, 'max_price_value');
    closePopup(Aj.state.$putToAuctionPopup);
    QR.showPopup({
      request: {
        method: 'getStartAuctionLink',
        params: {
          type: Aj.state.type,
          username: username,
          min_amount: min_amount,
          max_amount: max_amount
        }
      },
      title: l('WEB_POPUP_QR_START_AUCTION_HEADER'),
      description: l('WEB_POPUP_QR_START_AUCTION_TEXT'),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_START_AUCTION_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_START_AUCTION_SENT'));
          });
        }
        Aj.location(Aj.state.typeUrl + username);
      }
    });
  },
  eCancelAuction: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closeDropdown();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    var item_title = $actions.attr('data-item-title');
    QR.showPopup({
      request: {
        method: 'getCancelAuctionLink',
        params: {
          type: Aj.state.type,
          username: username
        }
      },
      title: l('WEB_POPUP_QR_STOP_AUCTION_HEADER'),
      description: l('WEB_POPUP_QR_STOP_AUCTION_TEXT'),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_STOP_AUCTION_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_STOP_AUCTION_SENT'));
          });
        }
        Aj.location(Aj.state.typeUrl + username);
      }
    });
  },
  eSellUsername: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closeDropdown();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    var item_title = $actions.attr('data-item-title');
    var def_bid  = $actions.attr('data-def-bid');
    var doSellUsername = function() {
      $('.js-username', Aj.state.$sellUsernamePopup).html(item_title);
      openPopup(Aj.state.$sellUsernamePopup, {
        onOpen: function() {
          Aj.state.$sellUsernameForm.reset();
          Aj.state.$sellUsernameForm.field('username').value(username);
          Aj.state.$sellUsernameForm.data('item_title', item_title);
          Aj.state.$sellUsernameForm.field('sell_value').value(def_bid).trigger('input').focusAndSelect();
        }
      });
    };
    if ($actions.attr('data-need-check')) {
      Aj.apiRequest('canSellItem', {
        type: Aj.state.type,
        username: username,
        auction: false
      }, function(result) {
        if (result.confirm_message) {
          showConfirm(result.confirm_message, function() {
            doSellUsername();
          }, result.confirm_button);
        } else {
          doSellUsername();
        }
      });
    } else {
      doSellUsername();
    }
  },
  eSellUsernameSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var username = $form.field('username').value();
    var item_title = Aj.state.$sellUsernameForm.data('item_title');
    var sell_amount = Main.amountFieldValue($form, 'sell_value');
    closePopup(Aj.state.$sellUsernamePopup);
    QR.showPopup({
      request: {
        method: 'getStartAuctionLink',
        params: {
          type: Aj.state.type,
          username: username,
          min_amount: sell_amount,
          max_amount: sell_amount
        }
      },
      title: l('WEB_POPUP_QR_SELL_HEADER'),
      description: l('WEB_POPUP_QR_SELL_TEXT'),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_SELL_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_SELL_SENT'));
          });
        }
        Aj.location(Aj.state.typeUrl + username);
      }
    });
  }
};

var Random = {
  init: function() {
    Aj.onLoad(function(state) {
      var cont = Aj.ajContainer;
      $(cont).on('click.curPage', '.js-buy-random-btn', Random.eBuyRandom);
      $(cont).on('click.curPage', '.js-buy-more-random-btn', Random.eBuyMoreRandom);
      state.updLastReq = +Date.now();
      if (state.needUpdate) {
        state.updStateTo = setTimeout(Random.updateState, Main.UPDATE_PERIOD);
      }
      $('.js-spoiler', cont).each(function() {
        SimpleSpoiler.init(this);
      }).removeClass('blured');
    });
    Aj.onUnload(function(state) {
      var cont = Aj.ajContainer;
      clearTimeout(state.updStateTo);
      state.needUpdate = false;
      $('.js-spoiler', cont).each(function() {
        SimpleSpoiler.destroy(this);
      });
    });
  },
  updateContent: function(html) {
    var $main = $('.js-main-content');
    $('.js-spoiler', $main).each(function() {
      SimpleSpoiler.destroy(this);
    });
    $('.js-main-content').html(html);
    $('.js-spoiler', $main).each(function() {
      SimpleSpoiler.init(this);
    }).removeClass('blured');
  },
  updateState: function() {
    var now = +Date.now();
    if (document.hasFocus() ||
        Aj.state.updLastReq && (now - Aj.state.updLastReq) > Main.FORCE_UPDATE_PERIOD) {
      Aj.state.updLastReq = now;
      Aj.apiRequest('updateRandom', {}, function(result) {
        if (result.html) {
          Random.updateContent(result.html);
        }
        if (result.done && Aj.state.$sentPopup) {
          closePopup(Aj.state.$sentPopup);
        }
        if (Aj.state.needUpdate && result.need_update) {
          Aj.state.updStateTo = setTimeout(Random.updateState, Main.UPDATE_PERIOD);
        }
      });
    } else {
      if (Aj.state.needUpdate) {
        Aj.state.updStateTo = setTimeout(Random.updateState, Main.CHECK_PERIOD);
      }
    }
  },
  eBuyRandom: function(e) {
    e.preventDefault();
    var item_title = Aj.state.itemTitle;
    var amount = Aj.state.price;
    QR.showPopup({
      request: {
        method: 'getRandomNumberLink',
        params: {}
      },
      popup_class: 'qr-random-popup',
      title: l('WEB_POPUP_QR_BUY_RANDOM_HEADER'),
      description: l('WEB_POPUP_QR_BUY_RANDOM_TEXT', {
        amount: '<span class="icon-before icon-ton-text">' + amount + '</span>',
        address: Aj.state.curWallet
      }),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_BUY_RANDOM_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          Aj.state.$sentPopup = showAlert(l('WEB_BUY_RANDOM_SENT'));
        }
      },
      onOpen: function() {
        $('.js-spoiler', this).each(function() {
          SimpleSpoiler.init(this);
        }).removeClass('blured');
      },
      onClose: function() {
        $('.js-spoiler', this).each(function() {
          SimpleSpoiler.destroy(this);
        });
      }
    });
    Aj.state.needUpdate = true;
    clearTimeout(Aj.state.updStateTo);
    Aj.state.updStateTo = setTimeout(Random.updateState, Main.UPDATE_PERIOD);
  },
  eBuyMoreRandom: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Aj.apiRequest('repeatRandom', {}, function(result) {
      Aj.state.needUpdate = false;
      if (result.html) {
        Random.updateContent(result.html);
      }
    });
  }
};

var LoginCodes = {
  init: function() {
    Aj.onLoad(function(state) {
      state.needUpdate = true;
      state.updLastReq = +Date.now();
      state.updStateTo = setTimeout(LoginCodes.updateState, Main.UPDATE_PERIOD);
    });
    Aj.onUnload(function(state) {
      clearTimeout(state.updStateTo);
      state.needUpdate = false;
    });
  },
  updateState: function() {
    var now = +Date.now();
    if (document.hasFocus() ||
        Aj.state.updLastReq && (now - Aj.state.updLastReq) > Main.FORCE_UPDATE_PERIOD) {
      Aj.state.updLastReq = now;
      Aj.apiRequest('updateLoginCodes', {
        number: Aj.state.number,
        lt: Aj.state.lastLt,
        from_app: Aj.state.fromApp
      }, function(result) {
        if (result.html) {
          $('.js-main-content').html(result.html);
        }
        if (result.lt) {
          Aj.state.lastLt = result.lt;
        }
        if (Aj.state.needUpdate) {
          Aj.state.updStateTo = setTimeout(LoginCodes.updateState, Main.UPDATE_PERIOD);
        }
      });
    } else {
      if (Aj.state.needUpdate) {
        Aj.state.updStateTo = setTimeout(LoginCodes.updateState, Main.CHECK_PERIOD);
      }

    }
  }
};

var Account = {
  init: function() {
    Aj.onLoad(function(state) {
      var cont = Aj.ajContainer;
      $(cont).on('click.curPage', '.js-convert-btn', Account.eConvertInit);
      $(cont).on('click.curPage', '.js-revert-btn', Account.eConvertRevert);
      $(cont).on('submit.curPage', '.js-convert-bid-form', Account.eConvertBidSubmit);
      $(cont).on('submit.curPage', '.js-new-convert-bid-form', Account.eConvertBidSubmit);
      state.$convertBidPopup = $('.js-convert-bid-popup');
      state.$newConvertBidPopup = $('.js-new-convert-bid-popup');
      state.$convertBidForm = $('.js-convert-bid-form');
      state.$newConvertBidForm = $('.js-new-convert-bid-form');
      Main.initForm(state.$convertBidForm);
      Main.initForm(state.$newConvertBidForm);
      state.$convertConfirmPopup = $('.js-convert-confirm-popup');
    });
    Aj.onUnload(function(state) {
      Main.destroyForm(state.$convertBidForm);
      Main.destroyForm(state.$newConvertBidForm);
      clearTimeout(state.convertTimeout);
    });
  },
  eConvertInit: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    Aj.state.curPopup = null;
    Aj.state.curPopupState = null;
    Aj.apiRequest('initConverting', {
      username: username
    }, function(result) {
      Account.processConverting(result);
    });
  },
  eConvertRevert: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    Aj.state.curPopup = null;
    Aj.state.curPopupState = null;
    Aj.apiRequest('revertConverting', {
      username: username
    }, function(result) {
      Account.processConverting(result);
    });
  },
  processConverting: function(result) {
    var $popup = Aj.state.curPopup;
    if (result.error) {
      if (!result.keep && $popup) {
        closePopup($popup);
      }
      return showAlert(result.error);
    }
    if (result.state == 'tg_confirm') {
      Aj.state.curPopup = Aj.state.$convertConfirmPopup;
      if (Aj.state.curPopupState != result.state) {
        if ($popup) {
          closePopup($popup);
        }
        Aj.state.curPopupState = result.state;
        openPopup(Aj.state.curPopup, {
          onOpen: function() {
            Account.convertStateCheck(result.req_id);
          },
          onClose: function() {
            Aj.state.curPopupState = null;
            clearTimeout(Aj.state.convertTimeout);
          }
        });
      } else {
        Account.convertStateCheck(result.req_id);
      }
    }
    else if (result.state == 'tg_declined') {
      if ($popup) {
        closePopup($popup);
      }
      Aj.state.curPopupState = result.state;
      showAlert(result.message);
    }
    else if (result.state == 'bid_request') {
      Aj.state.curPopup = Aj.state.$convertBidPopup;
      if (Aj.state.curPopupState != result.state) {
        if ($popup) {
          closePopup($popup);
        }
        $('.js-username', Aj.state.curPopup).html('@' + result.username);
        Aj.state.$convertBidForm.field('id').value(result.req_id);
        Aj.state.curPopupState = result.state;
        openPopup(Aj.state.curPopup, {
          onClose: function() {
            Aj.state.curPopupState = null;
          }
        });
      }
    }
    else if (result.state == 'min_bid_request') {
      Aj.state.curPopup = Aj.state.$newConvertBidPopup;
      if (Aj.state.curPopupState != result.state) {
        if ($popup) {
          closePopup($popup);
        }
        $('.js-username', Aj.state.curPopup).html('@' + result.username);
        $('.js-address', Aj.state.curPopup).html(result.address);
        Aj.state.$newConvertBidForm.field('id').value(result.req_id);
        Aj.state.curPopupState = result.state;
        openPopup(Aj.state.curPopup, {
          onClose: function() {
            Aj.state.curPopupState = null;
          }
        });
      }
    }
    else if (result.state == 'created') {
      $(Aj.ajContainer).one('page:load', function() {
        showAlert(result.message);
      });
      Aj.location('/username/' + result.username);
    }
    else if (result.state == 'revert_confirm') {
      showConfirm(result.message, function() {
        Aj.apiRequest('revertConverting', {
          username: result.username,
          confirmed: 1
        }, function(result) {
          Account.processConverting(result);
        });
      }, result.button);
    }
    else if (result.state == 'reverted') {
      $(Aj.ajContainer).one('page:load', function() {
        showAlert(result.message);
      });
      Aj.reload();
    }
    else if (result.state == 'qr') {
      Aj.state.curPopupState = result.state;
      if ($popup) {
        closePopup($popup);
      }
      QR.showPopup({
        data: result,
        title: l('WEB_POPUP_QR_CONVERT_HEADER'),
        description: l('WEB_POPUP_QR_CONVERT_TEXT', {
          amount: '<span class="icon-before icon-ton-text">' + result.amount + '</span>'
        }),
        qr_label: '@' + result.username,
        tk_label: l('WEB_POPUP_QR_CONVERT_TK_BUTTON'),
        terms_label: l('WEB_POPUP_QR_PLACE_BID_TERMS'),
        onConfirm: function(by_server) {
          if (by_server) {
            $(Aj.ajContainer).one('page:load', function() {
              showAlert(l('WEB_CONVERT_SENT'));
            });
          }
          Aj.location('/username/' + result.username);
        }
      });
    }
  },
  convertStateCheck: function(req_id, force) {
    var $popup = Aj.state.curPopup;
    if (!force && (!$popup || $popup.hasClass('hide'))) {
      return false;
    }
    clearTimeout(Aj.state.convertTimeout);
    Aj.state.convertTimeout = setTimeout(function() {
      Aj.apiRequest('checkConverting', {
        id: req_id
      }, function(result) {
        Account.processConverting(result);
      });
    }, force ? 1 : 700);
  },
  eConvertBidSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var req_id = $form.field('id').value();
    var amount = Main.amountFieldValue($form, 'bid_value');
    if (amount === false) {
      $form.field('bid_value').focus();
      return;
    }
    if ($form.data('loading')) {
      return false;
    }
    $form.data('loading', true);
    Aj.apiRequest('startConverting', {
      id: req_id,
      bid: amount
    }, function(result) {
      $form.data('loading', false);
      Account.processConverting(result);
    });
  }
};

var MyBids = {
  init: function() {
    Aj.onLoad(function(state) {
      $(document).on('click.curPage', '.js-load-more-bids', MyBids.eLoadMoreBids);
    });
  },
  eLoadMoreBids: function(e) {
    e.preventDefault();
    var $table    = $(this).closest('table');
    var offset_id = $(this).attr('data-next-offset');
    Aj.apiRequest('getBidsHistory', {
      type: Aj.state.type || '',
      offset_id: offset_id
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('tbody', $table).append(result.body);
      $('tfoot', $table).html(result.foot);
    });
  }
};

var Sessions = {
  init: function() {
    Aj.onLoad(function(state) {
      $(document).on('click.curPage', '.js-terminate-btn', Sessions.eTerminate);
    });
  },
  eTerminate: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $actions   = $(this).closest('.js-actions');
    var $table_row = $(this).closest('tr');
    var session_id = $actions.attr('data-session-id');
    Aj.apiRequest('tonTerminateSession', {
      session_id: session_id
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.ok) {
        $table_row.remove();
      }
    });
  }
};

var Premium = {
  init: function() {
    Aj.onLoad(function(state) {
      var cont = Aj.ajContainer;
      $(cont).on('click.curPage', '.js-myself-link', Premium.eAcquireForMyself);
      $(cont).on('click.curPage', '.js-another-gift-btn', Premium.eGiftMorePremium);
      $(cont).on('click.curPage', '.js-gift-premium-btn', Premium.eGiftPremium);
      state.$giftPremiumPopup = $('.js-gift-premium-popup');
      $(cont).on('submit.curPage', '.js-gift-premium-form', Premium.eGiftPremiumSubmit);
      state.$giftPremiumForm = $('.js-gift-premium-form');
      Main.initForm(state.$giftPremiumForm);
      state.$premiumSearchField = $('.js-premium-search-field');
      state.$premiumSearchForm = $('.js-premium-form');
      state.$premiumSearchForm.on('submit', Premium.eSearchSubmit);
      state.$premiumSearchForm.field('query').on('input', Premium.eSearchInput);
      state.$premiumSearchForm.field('query').on('change', Premium.eSearchChange);
      $('.js-form-clear', state.$premiumSearchForm).on('click', Premium.eSearchClear);
      state.$premiumSearchForm.on('change', '.js-premium-options input.radio', Premium.eRadioChanged);
      state.$giftPremiumForm.on('change', 'input.checkbox', Premium.eCheckboxChanged);
      state.$giftPremiumBtn = $('.js-gift-premium-btn');
      state.updLastReq = +Date.now();
      if (state.needUpdate) {
        state.updStateTo = setTimeout(Premium.updateState, Main.UPDATE_PERIOD);
      }
      $(cont).on('click.curPage', '.js-preview-sticker', function() {
        RLottie.playUntilEnd(this);
      });
      $('.js-preview-sticker').each(function() {
        RLottie.init(this, {playUntilEnd: true});
      });
      RLottie.init();
    });
    Aj.onUnload(function(state) {
      clearTimeout(state.updStateTo);
      state.needUpdate = false;
      Main.destroyForm(state.$giftPremiumForm);
      state.$premiumSearchForm.off('submit', Premium.eSearchSubmit);
      state.$premiumSearchForm.field('query').off('input', Premium.eSearchInput);
      state.$premiumSearchForm.field('query').on('change', Premium.eSearchChange);
      $('.js-form-clear', state.$premiumSearchForm).off('click', Premium.eSearchClear);
      state.$premiumSearchForm.off('change', '.js-premium-options input.radio', Premium.eRadioChanged);
      state.$giftPremiumForm.off('change', 'input.checkbox', Premium.eCheckboxChanged);
      $('.js-preview-sticker').each(function() {
        RLottie.destroy(this);
      });
    });
  },
  updateState: function() {
    var now = +Date.now();
    if (document.hasFocus() ||
        Aj.state.updLastReq && (now - Aj.state.updLastReq) > Main.FORCE_UPDATE_PERIOD) {
      Aj.state.updLastReq = now;
      Aj.apiRequest('updatePremiumState', {
        mode: Aj.state.mode,
        lv: Aj.state.lastVer,
        dh: Aj.state.lastDh,
      }, function(result) {
        if (result.mode) {
          Aj.state.mode = result.mode;
        }
        if (result.html) {
          Premium.updateContent(result.html);
        } else {
          if (result.history_html) {
            Premium.updateHistory(result.history_html);
          }
          if (result.options_html) {
            Premium.updateOptions(result.options_html);
          }
        }
        if (result.lv) {
          Aj.state.lastVer = result.lv;
          if (Aj.state.$sentPopup) {
            closePopup(Aj.state.$sentPopup);
          }
        }
        if (result.dh) {
          Aj.state.lastDh = result.dh;
        }
        if (Aj.state.needUpdate && result.need_update) {
          Aj.state.updStateTo = setTimeout(Premium.updateState, Main.UPDATE_PERIOD);
        }
      });
    } else {
      if (Aj.state.needUpdate) {
        Aj.state.updStateTo = setTimeout(Premium.updateState, Main.CHECK_PERIOD);
      }
    }
  },
  eSearchInput: function(e) {
    var $field = Aj.state.$premiumSearchField;
    $('.js-search-field-error').html('');
    $field.removeClass('error');
  },
  eSearchChange: function(e) {
    Premium.searchSubmit();
  },
  eSearchClear: function(e) {
    var $form = Aj.state.$premiumSearchForm;
    var $field = Aj.state.$premiumSearchField;
    var $btn   = Aj.state.$giftPremiumBtn;
    $form.field('recipient').value('');
    $form.field('query').value('').prop('disabled', false);
    $form.removeClass('myself');
    $btn.prop('disabled', true);
    $field.removeClass('found');
    $('.js-search-field-error').html('');
    $field.removeClass('error');
    Premium.updateUrl();
  },
  eAcquireForMyself: function(e) {
    e.preventDefault();
    Premium.updateResult(Aj.state.myselfResult);
  },
  eRadioChanged: function() {
    Premium.updateUrl();
  },
  eCheckboxChanged: function() {
    var $form = Aj.state.$giftPremiumForm;
    var show_sender = $form.field('show_sender').prop('checked');
    Aj.state.$giftPremiumPopup.toggleClass('show-sender', show_sender);
  },
  eSearchSubmit: function(e) {
    e.preventDefault();
    Premium.searchSubmit();
  },
  searchSubmit: function() {
    var $form  = Aj.state.$premiumSearchForm;
    var recipient = $form.field('recipient').value();
    var query  = $form.field('query').value();
    var months = $form.field('months').value();
    if (!query.length) {
      $form.field('query').focus();
      return;
    }
    Aj.state.$premiumSearchField.addClass('loading').removeClass('play').redraw().addClass('play');
    Aj.showProgress();
    Aj.apiRequest('searchPremiumGiftRecipient', {
      query: recipient || query,
      months: months
    }, function(result) {
      Aj.hideProgress();
      Premium.updateResult(result);
      Aj.state.$premiumSearchField.removeClass('loading');
    });
  },
  updateResult: function(result) {
    var $form  = Aj.state.$premiumSearchForm;
    var $field = Aj.state.$premiumSearchField;
    var $btn   = Aj.state.$giftPremiumBtn;
    if (result.error) {
      $('.js-search-field-error').html(result.error);
      $field.addClass('error').removeClass('found');
      $form.field('query').prop('disabled', false);
    } else {
      $('.js-search-field-error').html('');
      $field.removeClass('error');
      if (result.found) {
        if (result.found.photo) {
          $('.js-premium-search-photo', $field).html(result.found.photo);
        }
        if (result.found.name) {
          var $form = Aj.state.$premiumSearchForm;
          $form.field('query').value(result.found.name);
        }
        $form.toggleClass('myself', result.found.myself);
        $form.field('recipient').value(result.found.recipient);
        $field.addClass('found');
        $form.field('query').prop('disabled', true);
        $btn.prop('disabled', false);
      } else {
        $form.removeClass('myself');
        $form.field('recipient').value('');
        $field.removeClass('found');
        $form.field('query').prop('disabled', false);
        $btn.prop('disabled', true);
      }
    }
    Premium.updateUrl();
  },
  updateUrl: function() {
    var new_url = '';
    var $form     = Aj.state.$premiumSearchForm;
    var recipient = $form.field('recipient').value();
    var months    = $form.field('months').value();
    if (recipient) {
      new_url += '&recipient=' + encodeURIComponent(recipient);
    }
    if (months) {
      new_url += '&months=' + encodeURIComponent(months);
    }
    if (new_url) {
      new_url = '?' + new_url.substr(1);
    }
    var loc = Aj.location(), path = loc.pathname + loc.search;
    Aj.setLocation(new_url, path != '/premium');
  },
  updateOptions: function(html) {
    var $form  = Aj.state.$premiumSearchForm;
    var months = $form.field('months').value();
    $('.js-premium-options').replaceWith(html);
    $form.field('months').value(months);
  },
  updateHistory: function(html) {
    $('.js-premium-history').replaceWith(html);
  },
  updateContent: function(html) {
    $('.js-main-content').html(html).find('.js-preview-sticker').each(function() {
      RLottie.init(this, {playUntilEnd: true});
    });
  },
  eGiftPremium: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $form     = Aj.state.$premiumSearchForm;
    var recipient = $form.field('recipient').value();
    var months    = $form.field('months').value();
    Aj.apiRequest('initGiftPremiumRequest', {
      recipient: recipient,
      months: months
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('.js-gift-premium-content', Aj.state.$giftPremiumPopup).html(result.content);
      $('.js-gift-premium-button', Aj.state.$giftPremiumPopup).html(result.button);
      Aj.state.$giftPremiumPopup.toggleClass('iam-sender', result.myself);
      Aj.state.giftPrice = result.amount;
      Aj.state.itemTitle = result.item_title;
      Aj.state.$giftPremiumForm.field('id').value(result.req_id);
      RLottie.WORKERS_LIMIT = 1;
      openPopup(Aj.state.$giftPremiumPopup, {
        onOpen: function() {
          $('.js-preview-sticker').each(function() {
            RLottie.init(this, {playUntilEnd: true});
          });
        },
        onClose: function() {
          $('.js-preview-sticker').each(function() {
            RLottie.destroy(this);
          });
        }
      });
    });
  },
  eGiftPremiumSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var item_title = Aj.state.itemTitle;
    var req_id = $form.field('id').value();
    var show_sender = $form.field('show_sender').prop('checked');
    closePopup(Aj.state.$giftPremiumPopup);
    QR.showPopup({
      request: {
        method: 'getGiftPremiumLink',
        params: {
          id: req_id,
          show_sender: show_sender ? 1 : 0
        }
      },
      title: l('WEB_POPUP_QR_PREMIUM_HEADER'),
      description: l('WEB_POPUP_QR_PREMIUM_TEXT', {
        amount: '<span class="icon-before icon-ton-text js-amount_fee">' + Main.wrapTonAmount(Aj.state.giftPrice) + '</span>'
      }),
      qr_label: item_title,
      tk_label: l('WEB_POPUP_QR_PREMIUM_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS')
    });
    Aj.state.needUpdate = true;
  },
  eGiftMorePremium: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Aj.apiRequest('repeatPremium', {}, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.location('/premium');
    });
  }
};

var QR = {
  showPopup: function(options) {
    options = $.extend({
      title: 'Scan QR Code',
      description: null,
      popup_class: null,
      hint: null,
      qr_label: null,
      tk_label: null,
      terms_label: null,
      data: null,
      request: null,
      onConfirm: null,
      onDataUpdate: null,
      onExpire: null
    }, options);
    var ua = (navigator.userAgent || '').toLowerCase(),
        is_ios = ua.indexOf('iphone') >= 0 ||
                 ua.indexOf('ipad') >= 0,
        is_android = ua.indexOf('android') >= 0;
    var qr_label = options.qr_label ? '<div class="tm-qr-code-label fit-text">' + options.qr_label + '</div>' : '';
    var hint = options.hint ? '<p class="popup-text popup-hint-text">' + options.hint + '</p>' : '';
    var tk_button = options.tk_label && (is_android || is_ios) ? '<p class="tm-qr-code-or">' + l('WEB_POPUP_QR_OR_BUTTON') + '</p><button class="btn btn-primary btn-block btn-tonkeeper js-tonkeeper-btn" data-inactive-label="' + l('WEB_WAITING', 'Waiting...') + '"><span class="tm-button-label">' + options.tk_label + '</span></button>' : '';
    var terms_text = options.terms_label ? '<p class="popup-footer-text">' + options.terms_label + '</p>' : '';
    var $popup = $('<div class="popup-container hide qr-code-popup-container' + (options.popup_class ? ' ' + options.popup_class : '') + ' qr-inactive" data-close-outside="popup-body"><div class="popup"><div class="popup-body"><section><h2>' + options.title + '</h2><p class="popup-text">' + options.description + '</p><div class="tm-qr-code"><div class="tm-qr-code-image"></div>' + qr_label + '</div>' + tk_button + hint + terms_text + '</section></div></div></div>');
    var $qrCode = $('.tm-qr-code-image', $popup);
    var $tonkeeperBtn = $('.js-tonkeeper-btn', $popup);
    var $confirmedBtn = $('.js-confirmed-btn', $popup);
    var tkOpen = function() {
      if ($popup.hasClass('qr-inactive')) {
        return false;
      }
      var href = $tonkeeperBtn.attr('data-href');
      if (href) {
        location.href = href;
      }
    }
    var onConfirmedPress = function() {
      confirmed();
    }
    var confirmed = function(by_server) {
      options.onConfirm && options.onConfirm(by_server);
      closePopup($popup);
    }
    var onEnterPress = function(e) {
      if (e.keyCode == Keys.RETURN) {
        e.stopImmediatePropagation();
        tkOpen();
      }
    };
    var onExpire = function() {
      options.onExpire && options.onExpire();
      closePopup($popup);
    };
    var setData = function(data, req) {
      QR.getUrl(data.qr_link, function(url) {
        var urlObj = $popup.data('qrCodeUrlObj');
        if (urlObj) {
          URL.revokeObjectURL(urlObj);
        }
        $popup.data('qrCodeUrlObj', url);
        $qrCode.css('backgroundImage', "url('" + url + "')");
        $tonkeeperBtn.attr('data-href', data.link);
        $popup.removeClass('qr-inactive');
      });
      if (expTimeout = $popup.data('expTimeout')) {
        clearTimeout(expTimeout);
      }
      if (options.onDataUpdate) {
        options.onDataUpdate.call($popup.get(0), data);
      }
      if (data.expire_after) {
        expTimeout = setTimeout(onExpire, data.expire_after * 1000);
        $popup.data('expTimeout', expTimeout);
        var retry_after = data.expire_after - 10;
        if (retry_after > 0 && data.can_retry) {
          var retryTimeout = setTimeout(loadData, retry_after * 1000, req);
          $popup.data('retryTimeout', retryTimeout);
        }
      }
      if (data.check_method) {
        checkAction(data.check_method, data.check_params);
      }
    };
    var loadData = function(req) {
      var retryTimeout, expTimeout;
      if (retryTimeout = $popup.data('retryTimeout')) {
        clearTimeout(retryTimeout);
      }
      Aj.apiRequest(req.method, req.params || {}, function(result) {
        if (result.error) {
          if ($popup.hasClass('qr-inactive')) {
            closePopup($popup);
          }
          return showAlert(result.error);
        }
        setData(result, req);
      });
    };
    var checkAction = function(method, params) {
      var checkTimeout;
      if (checkTimeout = $popup.data('checkTimeout')) {
        clearTimeout(checkTimeout);
      }
      checkTimeout = setTimeout(function() {
        Aj.apiRequest(method, params || {}, function(result) {
          if (result.error) {
            return showAlert(result.error);
          }
          if (result.confirmed) {
            confirmed(true);
          } else {
            var checkTimeout = $popup.data('checkTimeout');
            if (checkTimeout) {
              checkAction(method, params);
            }
          }
        });
      }, 700);
      $popup.data('checkTimeout', checkTimeout);
    };
    if (options.data) {
      setData(options.data, options.request);
    } else if (options.request) {
      loadData(options.request);
    }
    $tonkeeperBtn.on('click', tkOpen);
    $confirmedBtn.on('click', onConfirmedPress);
    $(document).on('keydown', onEnterPress);
    $popup.one('popup:open', function() {
      Main.fitUsername($('.fit-text', $popup));
    });
    $popup.one('popup:close', function() {
      $tonkeeperBtn.off('click', tkOpen);
      $confirmedBtn.off('click', onConfirmedPress);
      $(document).off('keydown', onEnterPress);
      var retryTimeout, expTimeout, checkTimeout;
      if (retryTimeout = $popup.data('retryTimeout')) {
        clearTimeout(retryTimeout);
        $popup.data('retryTimeout', false);
      }
      if (expTimeout = $popup.data('expTimeout')) {
        clearTimeout(expTimeout);
        $popup.data('expTimeout', false);
      }
      if (checkTimeout = $popup.data('checkTimeout')) {
        clearTimeout(expTimeout);
        $popup.data('checkTimeout', false);
      }
      setTimeout(function() {
        $popup.remove();
      }, 500);
    });
    openPopup($popup, {
      onOpen: options.onOpen,
      onClose: options.onClose,
    });
    return $popup;
  },
  getUrl: function(link, callback) {
    var qrCode = new QRCodeStyling({
      width: 656,
      height: 656,
      type: 'canvas',
      data: link,
      image: 'data:image/svg+xml,%3Csvg%20height%3D%2255%22%20viewBox%3D%220%200%2055%2055%22%20width%3D%2255%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m6.94%2013.98%2018.58%208.96c.22.11.37.34.37.6l-.07%2020.79c0%20.22-.12.43-.31.55-.31.2-.71.1-.91-.21l-18.51-29.75c-.12-.19-.13-.43-.03-.63.16-.33.55-.47.88-.31zm42%20.31c.1.2.09.44-.03.63l-18.51%2029.75c-.2.31-.6.41-.91.21-.19-.12-.31-.33-.31-.55l-.07-20.79c0-.26.15-.49.37-.6l18.58-8.96c.33-.16.72-.02.88.31zm-2.39-4.29c.26%200%20.5.15.6.39.15.34%200%20.73-.33.87l-19.12%208.48c-.17.07-.37.07-.54-.01l-19-8.47c-.23-.1-.39-.34-.39-.6%200-.36.3-.66.66-.66z%22%20fill%3D%22%231a2026%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E',
      backgroundOptions: {
        color: 'transparent'
      },
      dotsOptions: {
        color: '#1a2026',
        type: 'rounded'
      },
      cornersSquareOptions: {
        type: 'extra-rounded'
      },
      imageOptions: {
        // imageSize: 0.8,
        imageSize: 0.3,
        margin: 0
      },
      qrOptions: {
        // errorCorrectionLevel: 'L'
      }
    });
    qrCode.getRawData('png').then(function(blob) {
      var qr_url = URL.createObjectURL(blob);
      callback(qr_url);
    });
  }
};

var SimpleSpoiler = {
  init: function(el) {
    el.style.position = 'relative';
    var el_w = el.offsetWidth;
    var el_h = el.offsetHeight;
    var max_d = 5;
    var fps = 30;
    var lsec = 0.6;
    var count = 300;
    console.log(count)
    var points = [];
    for (var i = 0; i < count; i++) {
      var b = document.createElement('b');
      b.className = 'point';
      var point = {
        b: b,
        mx: el_w,
        my: el_h,
        md: max_d,
        cnt: count,
        fps: fps,
        lsec: lsec,
        t: SimpleSpoiler.random(0, fps * lsec)
      };
      SimpleSpoiler.resetPoint(point);
      SimpleSpoiler.updatePoint(point);
      el.appendChild(b);
      points.push(point);
    }
    var userAgent = window.navigator.userAgent;
    var isSafari = !!window.safari ||
                   !!(userAgent && (/\b(iPad|iPhone|iPod)\b/.test(userAgent) || (!!userAgent.match('Safari') && !userAgent.match('Chrome'))));
    var isRAF = isSafari;
    var interval = 1000 / fps;
    var last_render = +(new Date);
    var doRedraw = function() {
      var now = +Date.now();
      if (now - last_render >= interval) {
        for (var i = 0; i < spoiler.points.length; i++) {
          var point = spoiler.points[i];
          if (++point.t >= fps * lsec) {
            point.t = 0;
            SimpleSpoiler.resetPoint(point);
          }
          SimpleSpoiler.updatePoint(point);
        }
        last_render = now;
      }
      if (isRAF) {
        spoiler.raf = requestAnimationFrame(doRedraw)
      } else {
        var delay = interval - (now - last_render);
        spoiler.to = setTimeout(doRedraw, delay);
      }
    };
    var spoiler = {
      points: points
    };
    if (isRAF) {
      spoiler.raf = requestAnimationFrame(doRedraw)
    } else {
      spoiler.to = setTimeout(doRedraw, 20);
    }
    el._spoiler = spoiler;
  },
  destroy: function(el) {
    var spoiler = el._spoiler;
    if (spoiler.raf) {
      cancelAnimationFrame(spoiler.raf);
    }
    if (spoiler.to) {
      clearTimeout(spoiler.to);
    }
    for (var i = 0; i < spoiler.points.length; i++) {
      var point = spoiler.points[i];
      var b = point.b;
      b.parentNode && b.parentNode.removeChild(b);
    }
  },
  random: function(x, y) {
    return x + Math.floor(Math.random() * (y + 1 - x));
  },
  resetPoint: function(point) {
    var v = SimpleSpoiler.generateVector(point.cnt);
    point.x = SimpleSpoiler.random(point.md, point.mx - point.md);
    point.y = SimpleSpoiler.random(point.md, point.my - point.md);
    point.dx = v.dx;
    point.dy = v.dy;
    point.s = SimpleSpoiler.random(60, 80) * point.my / 3600;
  },
  updatePoint: function(point) {
    var b = point.b;
    var t = point.t;
    var d = point.fps * point.lsec / 3;
    var k = 360 / point.lsec / point.fps
    var x = point.x + k * t * point.dx;
    var y = point.y + k * t * point.dy;
    b.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + point.s + ')';
    b.style.opacity = (t < d ? (t / d) : (t < d*2 ? 1 : (d*3 - t) / d)) * 0.95;
  },
  generateVector: function(count) {
    var speedMax = 8;
    var speedMin = 4;
    var lifetime = 600;
    var value = SimpleSpoiler.random(0, 2 * count + 2);
    var negative = (value < count + 1);
    var mod = (negative ? value : (value - count - 1));
    var speed = speedMin + (((speedMax - speedMin) * mod) / count);
    var max = Math.ceil(speedMax * lifetime);
    var k = speed / lifetime;
    var x = (SimpleSpoiler.random(0, 2 * max + 1) - max) / max;
    var y = Math.sqrt(1 - x * x) * (negative ? -1 : 1);
    return {
      dx: k * x,
      dy: k * y,
    };
  }
};

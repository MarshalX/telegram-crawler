
var Main = {
  init: function() {
    Aj.onLoad(function(state) {
      var cont = Aj.ajContainer;
      $(window).on('resize', Main.onResize);
      $('.js-logo-hoverable').on('mouseover', Main.playLogo);
      $('.js-logo-clickable').on('click', Main.playLogo);
      $('.js-logo-icon').on('animationend', Main.eLogoAnimEnd);
      $(cont).on('click.curPage', '.js-header-menu-button', Main.eHeaderMenu);
      $(cont).on('click.curPage', '.js-header-menu-close-button', Main.eHeaderMenuClose);
      $(cont).on('click.curPage', '.js-btn-tonkeeper', Main.eTonkeeperOpen);
      $(cont).on('click.curPage', '.js-form-clear', Main.eFormClear);
      $(cont).on('click.curPage', '.js-auction-unavail', Main.eAuctionUnavailable);
      $(cont).on('click.curPage', '.js-howitworks', Main.eHowitworks);
      $(cont).on('click.curPage', '.logout-link', Login.logOut);
      $(cont).on('click.curPage', '.ton-logout-link', Login.tonLogOut);
      state.$headerMenu = $('.js-header-menu');
      state.$unavailPopup = $('.js-unavailable-popup');
      state.$howitworksPopup = $('.js-howitworks-popup');
      Main.updateTime();
      Main.initViewport();
      Main.initLogo();
    });
    Aj.onUnload(function(state) {
      $(window).off('resize', Main.onResize);
      $('.js-logo-hoverable').off('mouseover', Main.playLogo);
      $('.js-logo-clickable').off('click', Main.playLogo);
      $('.js-logo-icon').off('animationend', Main.eLogoAnimEnd);
    });
  },
  initForm: function(form) {
    var $form = $(form);
    $('.js-amount-input', $form).on('keyup change input', Main.eUpdateAmountField);
    $('.js-amount-input', $form).trigger('input');
  },
  destroyForm: function(form) {
    var $form = $(form);
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
            arr = arr.slice(0, mode == 'text' ? 3 : 2);
            $time.html(arr.join(' '));
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
        Main.playLogo(true);
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
  playLogo: function(main) {
    if (!$('.js-logo').hasClass('play')) {
      var url = Aj.globalState.logoImageMain;
      if (!main) {
        var rnd = Math.random();
        if (rnd > 0.9 && Aj.globalState.logoImage3) {
          url = Aj.globalState.logoImage3;
        } else if (rnd > 0.8 && Aj.globalState.logoImage2) {
          url = Aj.globalState.logoImage2;
        }
      }
      $('.js-logo').each(function() {
        this.style.setProperty('--image-url-logo-icon-animated', 'url(\'' + url + '\')');
      });
      $('.js-logo').addClass('play');
    }
  },
  eLogoAnimEnd: function(e) {
    $('.js-logo').removeClass('play');
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
  eFormClear: function(e) {
    var form = $(this).closest('form').get(0);
    if (form) {
      form.query.value = '';
      form.submit();
    }
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
      } else if (char >= '0' && char <= '9' && (!has_decimal || decimal_len < decimals)) {
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
    if (!value) {
      return '';
    }
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
  open: function() {
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
      location.reload();
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
  UPDATE_PERIOD: 1200,
  init: function() {
    Aj.onLoad(function(state) {
      $(document).on('click.curPage', '.js-place-bid-btn', Auction.ePlaceBid);
      $(document).on('submit.curPage', '.js-place-bid-form', Auction.ePlaceBidSubmit);
      $(document).on('click.curPage', '.js-buy-now-btn', Auction.eBuyNow);
      $(document).on('click.curPage', '.js-subscribe-btn', Auction.eSubscribe);
      $(document).on('click.curPage', '.js-unsubscribe-btn', Auction.eUnsubscribe);
      $(document).on('click.curPage', '.js-load-more-orders', Auction.eLoadMoreOrders);
      $(document).on('click.curPage', '.js-load-more-owners', Auction.eLoadMoreOwners);
      state.$bidPopup = $('.js-place-bid-popup');
      state.$bidForm = $('.js-place-bid-form');
      Main.initForm(state.$bidForm);
      state.needUpdate = true;
      state.updStateTo = setTimeout(Auction.updateState, Auction.UPDATE_PERIOD);
      Assets.init();
      Account.init();
    });
    Aj.onUnload(function(state) {
      Main.destroyForm(state.$bidForm);
      clearTimeout(state.updStateTo);
      state.needUpdate = false;
    });
  },
  updateState: function() {
    Aj.apiRequest('updateAuction', {
      username: Aj.state.username,
      lt: Aj.state.auctionLastLt
    }, function(result) {
      if (result.html) {
        $('.js-main-content').html(result.html);
      }
      if (result.lt) {
        Aj.state.auctionLastLt = result.lt;
      }
      if (Aj.state.needUpdate) {
        Aj.state.updStateTo = setTimeout(Auction.updateState, Auction.UPDATE_PERIOD);
      }
    });
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
    var username = Aj.state.username;
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
          username: username,
          bid: amount
        }
      },
      title: l('WEB_POPUP_QR_PLACE_BID_HEADER'),
      description: l('WEB_POPUP_QR_PLACE_BID_TEXT', {
        amount: '<span class="icon-before icon-ton-text">' + amount + '</span>'
      }),
      qr_label: '@' + username,
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
    var username = Aj.state.username;
    var amount   = $(this).attr('data-bid-amount');
    QR.showPopup({
      request: {
        method: 'getBidLink',
        params: {
          username: username,
          bid: amount
        }
      },
      title: l('WEB_POPUP_QR_BUY_NOW_HEADER', {
        username: '<span class="accent-color">@' + username + '</span>'
      }),
      description: l('WEB_POPUP_QR_BUY_NOW_TEXT', {
        amount: '<span class="icon-before icon-ton-text">' + amount + '</span>'
      }),
      qr_label: '@' + username,
      tk_label: l('WEB_POPUP_QR_BUY_NOW_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PLACE_BID_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          showAlert(l('WEB_BUY_NOW_SENT'));
        }
      }
    });
  },
  eSubscribe: function(e) {
    if (!Login.checkAuth(e)) {
      return false;
    }
    e.preventDefault();
    var username = Aj.state.username;
    Aj.apiRequest('subscribe', {
      username: username
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
    var username = Aj.state.username;
    Aj.apiRequest('unsubscribe', {
      username: username
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      $('.js-subscribe').removeClass('subscribed');
    });
  },
  eLoadMoreOrders: function(e) {
    e.preventDefault();
    var username = Aj.state.username;
    var $table    = $(this).closest('table');
    var offset_id = $(this).attr('data-next-offset');
    Aj.apiRequest('getOrdersHistory', {
      username: username,
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
    var username = Aj.state.username;
    var $table    = $(this).closest('table');
    var offset_id = $(this).attr('data-next-offset');
    Aj.apiRequest('getOwnersHistory', {
      username: username,
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
      $(document).on('click.curPage', '.js-put-to-auction-btn', Assets.ePutToAuction);
      $(document).on('submit.curPage', '.js-put-to-auction-form', Assets.ePutToAuctionSubmit);
      $(document).on('click.curPage', '.js-cancel-auction-btn', Assets.eCancelAuction);
      $(document).on('click.curPage', '.js-sell-username-btn', Assets.eSellUsername);
      $(document).on('submit.curPage', '.js-sell-username-form', Assets.eSellUsernameSubmit);
      $('.table-selectable-in-row').on('mouseover mouseout', Assets.eTableRowSelHovered);
      state.$assignPopup = $('.js-assign-popup');
      state.$assignForm = $('.js-assign-form');

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
    });
  },
  eTableRowSelHovered: function(e) {
    $(this).closest('.tm-row-selectable').toggleClass('noselect', e.type == 'mouseover');
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
        if (assigned_to) {
          $('.js-assign-account-item:has(input[name="assign_to"][value="' + assigned_to + '"])', Aj.state.$assignPopup).each(function() {
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
    Aj.apiRequest('assignToTgAccount', {
      username: username,
      assign_to: assign_to
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      closePopup();
      $('.js-actions', Aj.ajContainer).each(function() {
        if ($(this).attr('data-username') == username) {
          $(this).attr('data-assigned-to', assign_to);
        }
      });
      if (result.msg) {
        showAlert(result.msg);
      }
    });
  },
  ePutToAuction: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closeDropdown();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    var def_bid  = $actions.attr('data-def-bid');
    $('.js-username', Aj.state.$putToAuctionPopup).html('@' + username);
    openPopup(Aj.state.$putToAuctionPopup, {
      onOpen: function() {
        Aj.state.$putToAuctionForm.reset();
        Aj.state.$putToAuctionForm.field('username').value(username);
        Aj.state.$putToAuctionForm.field('min_bid_value').value(def_bid).trigger('input').focusAndSelect();
      }
    });
  },
  ePutToAuctionSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var username = $form.field('username').value();
    var min_amount = Main.amountFieldValue($form, 'min_bid_value');
    var max_amount = Main.amountFieldValue($form, 'max_price_value');
    closePopup(Aj.state.$putToAuctionPopup);
    QR.showPopup({
      request: {
        method: 'getStartAuctionLink',
        params: {
          username: username,
          min_amount: min_amount,
          max_amount: max_amount
        }
      },
      title: l('WEB_POPUP_QR_START_AUCTION_HEADER'),
      description: l('WEB_POPUP_QR_START_AUCTION_TEXT'),
      qr_label: '@' + username,
      tk_label: l('WEB_POPUP_QR_START_AUCTION_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_START_AUCTION_SENT'));
          });
        }
        Aj.location('/username/' + username);
      }
    });
  },
  eCancelAuction: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closeDropdown();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    QR.showPopup({
      request: {
        method: 'getCancelAuctionLink',
        params: {
          username: username
        }
      },
      title: l('WEB_POPUP_QR_STOP_AUCTION_HEADER'),
      description: l('WEB_POPUP_QR_STOP_AUCTION_TEXT'),
      qr_label: '@' + username,
      tk_label: l('WEB_POPUP_QR_STOP_AUCTION_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_STOP_AUCTION_SENT'));
          });
        }
        Aj.location('/username/' + username);
      }
    });
  },
  eSellUsername: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    $(this).closeDropdown();
    var $actions = $(this).closest('.js-actions');
    var username = $actions.attr('data-username');
    var def_bid  = $actions.attr('data-def-bid');
    $('.js-username', Aj.state.$sellUsernamePopup).html('@'+username);
    openPopup(Aj.state.$sellUsernamePopup, {
      onOpen: function() {
        Aj.state.$sellUsernameForm.reset();
        Aj.state.$sellUsernameForm.field('username').value(username);
        Aj.state.$sellUsernameForm.field('sell_value').value(def_bid).trigger('input').focusAndSelect();
      }
    });
  },
  eSellUsernameSubmit: function(e) {
    e.preventDefault();
    var $form = $(this);
    var username = $form.field('username').value();
    var sell_amount = Main.amountFieldValue($form, 'sell_value');
    closePopup(Aj.state.$sellUsernamePopup);
    QR.showPopup({
      request: {
        method: 'getStartAuctionLink',
        params: {
          username: username,
          min_amount: sell_amount,
          max_amount: sell_amount
        }
      },
      title: l('WEB_POPUP_QR_SELL_USERNAME_HEADER'),
      description: l('WEB_POPUP_QR_SELL_USERNAME_TEXT'),
      qr_label: '@' + username,
      tk_label: l('WEB_POPUP_QR_SELL_USERNAME_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_SELL_USERNAME_SENT'));
          });
        }
        Aj.location('/username/' + username);
      }
    });
  }
};

var Account = {
  init: function() {
    Aj.onLoad(function(state) {
      $(document).on('click.curPage', '.js-blockchain-transfer-btn', Account.eBlockchainTransfer);
      $(document).on('click.curPage', '.js-do-transfer-btn', Account.eBlockchainTranswerInit);
      state.$transferInitPopup = $('.js-transfer-init-popup');
      state.$transferCheckPopup = $('.js-transfer-check-popup');
    });
    Aj.onUnload(function(state) {
      clearTimeout(state.transferTimeout);
    });
  },
  eBlockchainTransfer: function(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    var $actions    = $(this).closest('.js-actions');
    var username    = $actions.attr('data-username');
    var $popup      = Aj.state.$transferInitPopup;
    $('.js-username', $popup).html('@' + username);
    $popup.data('username', username);
    openPopup($popup);
  },
  eBlockchainTranswerInit: function(e) {
    e.preventDefault();
    var $btn = $(this);
    if ($btn.data('loading')) {
      return false;
    }
    var $popup   = Aj.state.$transferInitPopup;
    var username = $popup.data('username');
    $btn.data('loading', true);
    Aj.apiRequest('initBlockchainTransfer', {
      username: username
    }, function(result) {
      $btn.data('loading', false);
      closePopup($popup);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirmed) {
        return Account.blockchainTranswerStart($popup, result);
      }
      Aj.state.$transferCheckPopup.data('username', username);
      openPopup(Aj.state.$transferCheckPopup, {
        onOpen: function() {
          Account.blockchainTranswerCheck(result.req_id);
        },
        onClose: function() {
          clearTimeout(Aj.state.transferTimeout);
        }
      });
    });
  },
  blockchainTranswerCheck: function(req_id) {
    if (Aj.state.$transferCheckPopup.hasClass('hide')) {
      return false;
    }
    clearTimeout(Aj.state.transferTimeout);
    var $popup = Aj.state.$transferCheckPopup;
    Aj.state.transferTimeout = setTimeout(function() {
      Aj.apiRequest('checkBlockchainTransfer', {
        id: req_id
      }, function(result) {
        if (result.error) {
          if (result.declined) {
            closePopup($popup);
          }
          return showAlert(result.error);
        }
        if (result.confirmed) {
          Account.blockchainTranswerStart($popup, result);
        } else {
          Account.blockchainTranswerCheck(req_id);
        }
      });
    }, 700);
  },
  blockchainTranswerStart: function($popup, data) {
    var username = $popup.data('username');
    var amount   = $('.js-amount', Aj.state.$transferInitPopup).html();
    closePopup($popup);
    QR.showPopup({
      data: data,
      title: l('WEB_POPUP_QR_BLOCKCHAIN_TRANSFER_HEADER'),
      description: l('WEB_POPUP_QR_BLOCKCHAIN_TRANSFER_TEXT', {
        amount: '<span class="icon-before icon-ton-text">' + amount + '</span>'
      }),
      qr_label: '@' + username,
      tk_label: l('WEB_POPUP_QR_BLOCKCHAIN_TRANSFER_TK_BUTTON'),
      terms_label: l('WEB_POPUP_QR_PROCEED_TERMS'),
      onConfirm: function(by_server) {
        if (by_server) {
          $(Aj.ajContainer).one('page:load', function() {
            showAlert(l('WEB_BLOCKCHAIN_TRANSFER_SENT'));
          });
        }
        Aj.location('/username/' + username);
      }
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

var QR = {
  showPopup: function(options) {
    options = $.extend({
      title: 'Scan QR Code',
      description: null,
      hint: null,
      qr_label: null,
      tk_label: null,
      terms_label: null,
      data: null,
      request: null,
      onConfirm: null,
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
    var $popup = $('<div class="popup-container hide qr-code-popup-container qr-inactive" data-close-outside="popup-body"><div class="popup"><div class="popup-body"><section><h2>' + options.title + '</h2><p class="popup-text">' + options.description + '</p><div class="tm-qr-code"><div class="tm-qr-code-image"></div>' + qr_label + '</div>' + tk_button + hint + terms_text + '</section></div></div></div>');
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
    openPopup($popup);
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

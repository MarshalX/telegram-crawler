
var Gateway = {
  init: function() {
    Aj.onLoad(function(state) {
      Gateway.updateTime(Aj.ajContainer);
      $('.logout-link').on('click', Gateway.eLogOut);
    });
    Aj.onUnload(function(state) {
      $('.logout-link').off('click', Gateway.eLogOut);
    });
  },
  checkAuth: function (e) {
    if (Aj.needAuth()) {
      e.preventDefault();
      return false;
    }
  },
  eUpdateField: function(e) {
    var $fieldEl = $(this);
    if (e.type == 'focus' || e.type == 'focusin') {
      Gateway.updateField($fieldEl, true);
    } else if (e.type == 'blur' || e.type == 'focusout') {
      Gateway.updateField($fieldEl, false);
    } else {
      Gateway.updateField($fieldEl);
    }
  },
  eUpdateDropdown: function(e) {
    var $ddItemEl = $(this);
    var $ddItemWrapEl = $ddItemEl.parents('li');
    var $ddWrapEl = $ddItemEl.parents('.input-dropdown');
    var $ddInputEl = $('.input', $ddWrapEl);
    var value = $ddItemEl.data('value');
    var label = $ddItemEl.html();
    $('.dropdown-menu > li.selected', $ddWrapEl).removeClass('selected');
    $ddItemWrapEl.addClass('selected');
    $ddInputEl.data('value', value);
    $ddInputEl.html(label);
    $ddInputEl.trigger('ddchange');
  },
  eSetDropdownValue: function(e, val) {
    var $ddInputEl = $(this);
    var $ddWrapEl = $ddInputEl.parents('.input-dropdown');
    $('.input-dropdown-item', $ddWrapEl).each(function() {
      var $ddItemEl = $(this);
      var $ddItemWrapEl = $ddItemEl.parents('li');
      var value = $ddItemEl.data('value');
      var label = $ddItemEl.html();
      if (value == val) {
        $('.dropdown-menu > li.selected', $ddWrapEl).removeClass('selected');
        $ddItemWrapEl.addClass('selected');
        $ddInputEl.data('value', value);
        $ddInputEl.html(label);
      }
    });
  },
  eShownDropdown: function(e) {
    $('.dropdown-menu > li.selected', this).scrollIntoView({position: 'top', padding: 40});
  },
  dateTimeFieldValue: function($form, date_field, time_field) {
    var $dateFieldEl = time_field ? $form.field(date_field) : $form;
    var $timeFieldEl = time_field ? $form.field(time_field) : date_field;
    var date_value = $dateFieldEl.value();
    var time_value = $timeFieldEl.value();
    if (!date_value || !time_value) {
      return '';
    }
    var tz_offset = -60 * (new Date()).getTimezoneOffset();
    var is_pos = tz_offset >= 0;
    if (!is_pos) tz_offset *= -1;
    var h = Math.floor(tz_offset / 3600);
    var m = Math.floor((tz_offset % 3600) / 60);
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    return date_value + 'T' + time_value + (tz_offset ? (is_pos ? '+' : '-') + h + m : 'Z');
  },
  ownerCurrencyDecimals: function() {
    if (typeof Aj.state.ownerCurrencyDecimals === 'undefined') {
      return 2;
    }
    return Aj.state.ownerCurrencyDecimals;
  },
  wrapAmount: function(value, no_currency, field_format, decimals) {
    var base_decimals = Gateway.ownerCurrencyDecimals();
    if (typeof decimals === 'undefined') {
      decimals = base_decimals;
    }
    while (decimals > base_decimals) {
      var val = Math.round(value * Math.pow(10, decimals));
      if (val % 10) break;
      decimals--;
    }
    var amount_str = formatNumber(value, decimals, '.', field_format ? '' : ',');
    if (no_currency) {
      return amount_str;
    }
    var currency_str = Aj.state.ownerCurrency || '<span class="amount-currency currency-euro">€</span>';
    var parts = amount_str.split('.');
    amount_str = parts[0] + (parts.length > 1 && parts[1].length ? '<span class="amount-frac">.' + parts[1] + '</span>' : '');
    return currency_str + amount_str;
  },
  wrapEurAmount: function(value, field_format) {
    var rate = Aj.state.ownerCurrencyRate || 1;
    value = Math.round(value * rate * 100) / 100;
    return '<span class="amount-sign">~</span><span class="amount-currency currency-euro">€</span>' + formatNumber(value, (value % 1) && value < 1000 ? 2 : 0, '.', field_format ? '' : ',');
  },
  amountFieldValue: function($form, field) {
    var $fieldEl = field ? $form.field(field) : $($form);
    var minValue = $fieldEl.attr('data-min') || null;
    var maxValue = $fieldEl.attr('data-max') || null;
    var decPoint = $fieldEl.attr('data-dec-point') || '.';
    var decimals = $fieldEl.attr('data-decimals') || Gateway.ownerCurrencyDecimals();
    var value    = $fieldEl.value();

    var float_value = value.length ? value : '0';
    if (decPoint != '.') {
      float_value.split(decPoint).join('.');
    }
    float_value = parseFloat(float_value);
    if (isNaN(float_value) || float_value >= 1e9) {
      return false;
    }
    if (minValue !== null && float_value < minValue ||
        maxValue !== null && float_value > maxValue) {
      return false;
    } else {
      return float_value;
    }
  },
  updateAmountEurValue: function(field) {
    var $eurEl = $('~*>.js-amount-eur', field);
    if (Aj.state.ownerCurrencyRate) {
      var float_value = Gateway.amountFieldValue(field);
      if (float_value !== false && $(field).value()) {
        $eurEl.addClass('active').html(Gateway.wrapEurAmount(float_value));
      } else {
        $eurEl.removeClass('active');
      }
    } else {
      $eurEl.removeClass('active');
    }
  },
  eUpdateAmountField: function(e) {
    var $fieldEl = $(this);
    var minValue = $fieldEl.attr('data-min') || null;
    var maxValue = $fieldEl.attr('data-max') || null;
    var decPoint = $fieldEl.attr('data-dec-point') || '.';
    var decimals = $fieldEl.attr('data-decimals') || Gateway.ownerCurrencyDecimals();
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
    var is_invalid = (isNaN(float_value) || float_value >= 1e9);
    if (minValue !== null && float_value < minValue ||
        maxValue !== null && float_value > maxValue ||
        is_invalid) {
      Gateway.showFieldError($fieldEl);
    } else {
      Gateway.hideFieldError($fieldEl);
    }
    if (e.type == 'change') {
      if (new_value.length && !is_invalid) {
        this.value = Gateway.wrapAmount(float_value, true, true, decimals);
      }
    }
    Gateway.updateAmountEurValue(this);
  },
  updateField: function($fieldEl, focused) {
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    if (typeof focused !== 'undefined') {
      $formGroup.toggleClass('field-focused', focused);
    }
    var $select = $fieldEl.parents('.select');
    var selectedCnt = $select.find('.selected-item').size();
    $formGroup.toggleClass('noinput', $select.hasClass('no-search') && !selectedCnt);
    var hasValue = $fieldEl.value().length > 0 || selectedCnt > 0;
    $formGroup.toggleClass('field-has-value', hasValue);
  },
  showFieldHint: function($fieldEl, hint_text, field_invalid) {
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    var $hint = $formGroup.find('>.gw-form-control-hint');
    var $msg = $formGroup.find('>.gw-form-control-msg');
    if (!$msg.size() && hint_text) {
      $msg = $('<div class="gw-form-control-msg shide" />');
      $formGroup.find('>.gw-form-control-wrap,>.datetime-group,>.gw-btn').after($msg);
    }
    $msg.toggleClass('no-hint', !$hint.text().length);
    if (hint_text) {
      $msg.html('<div class="gw-form-control-msg-text">' + hint_text + '</div>').redraw().slideShow();
    } else {
      $msg.slideHide();
    }
    $formGroup.toggleClass('field-invalid', !!field_invalid);
  },
  showFieldError: function($fieldEl, error_text, focus) {
    Gateway.showFieldHint($fieldEl, error_text, true);
    if (focus) {
      if ($fieldEl.hasClass('select')) {
        $fieldEl.trigger('click');
        $fieldEl.find('.items-list').addClass('collapsed');
        $fieldEl.removeClass('open');
      } else if (!$fieldEl.is('[type="file"],[type="date"],[type="time"]')) {
        $fieldEl.focusAndSelect();
      }
    }
  },
  hideFieldError: function($fieldEl) {
    Gateway.showFieldHint($fieldEl, '', false);
  },
  onSelectChange: function(field, value, valueFull) {
    var $fieldEl = Aj.state.$form.field(field);
    Gateway.hideFieldError($fieldEl);
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        if (selectData.field == field &&
            selectData.update_cpm) {
          NewAd.adPostCheck(Aj.state.$form);
        }
      }
    }
  },
  updateTime: function(context) {
    $('time[datetime]', context).each(function () {
      var $time = $(this), datetime = $time.attr('datetime'), title = $time.attr('title'), html = $time.html(), new_html = formatDateTime(datetime, $time.hasClass('short'));
      if (html != new_html) {
        $time.html(new_html);
      }
      if ($time.hasClass('short') && title) {
        var new_title = formatDateTime(datetime);
        if (title != new_title) {
          $time.attr('title', new_title);
        }
      }
      $time.removeAttr('datetime');
    });
  },
  formatTableDate: function(timestamp) {
    var date = new Date(timestamp * 1000);
    var j = date.getDate();
    var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    var y = date.getFullYear() % 100;
    return j + ' ' + M + ' ' + y + ' ' + formatTime(timestamp * 1000);
  },
  fieldInit: function(field) {
    $(field).on('focus blur keyup change input', Gateway.eUpdateField);
    $(field).parents('.gw-search-input-wrap').find('.gw-search-reset').on('click', Gateway.eClearField);
    Gateway.updateField($(field));
  },
  fieldDestroy: function(field) {
    $(field).off('focus blur keyup change input', Gateway.eUpdateField);
    $(field).parents('.gw-search-input-wrap').find('.gw-search-reset').off('click', Gateway.eClearField);
  },
  formInit: function(form) {
    var $form = $(form);
    $('.gw-form-control', $form).each(function(){ Gateway.fieldInit(this); });
    $('.js-amount-input', $form).on('keyup change input', Gateway.eUpdateAmountField);
    $('input.checkbox,input.radio', $form).on('focus blur', Gateway.eUpdateField);
    $('.input-dropdown', $form).on('click', '.input-dropdown-item', Gateway.eUpdateDropdown);
    $('.input-dropdown > .input', $form).on('selectval', Gateway.eSetDropdownValue);
    $('.input-dropdown', $form).on('shown.bs.dropdown', Gateway.eShownDropdown);
    $('.js-hint-tooltip', $form).on('mouseover mouseout click', Gateway.eHintEvent);
    $('textarea.gw-form-control', $form).initAutosize();
    $('.upload-input input', $form).on('change', Gateway.eFileChange);
    $('.upload-input .js-file-reset', $form).on('click', Gateway.eFileReset);
    $(document).on('touchstart click', Gateway.eHideAllHints);
    $form.on('click.curPage', '.file-upload', stopImmediatePropagation);
    setTimeout(function(){ $form.removeClass('no-transition'); }, 100);
  },
  formDestroy: function(form) {
    var $form = $(form);
    $('.gw-form-control', $form).each(function(){ Gateway.fieldDestroy(this); });
    $('.js-amount-input', $form).off('keyup change input', Gateway.eUpdateAmountField);
    $('input.checkbox,input.radio', $form).off('focus blur', Gateway.eUpdateField);
    $('.input-dropdown', $form).off('click', '.input-dropdown-item', Gateway.eUpdateDropdown);
    $('.input-dropdown > .input', $form).off('selectval', Gateway.eSetDropdownValue);
    $('.input-dropdown', $form).off('shown.bs.dropdown', Gateway.eShownDropdown);
    $('.js-hint-tooltip', $form).off('mouseover mouseout click', Gateway.eHintEvent);
    $('textarea.gw-form-control', $form).destroyAutosize();
    $('.upload-input input', $form).off('change', Gateway.eFileChange);
    $('.upload-input .js-file-reset', $form).off('click', Gateway.eFileReset);
    $(document).off('touchstart click', Gateway.eHideAllHints);
    $form.off('click.curPage', '.file-upload', stopImmediatePropagation);
  },
  eClearField: function(e) {
    var $fieldEl = $(this).parents('.gw-search-input-wrap').find('.gw-search-input');
    $fieldEl.value('').trigger('input').focus();
  },
  eFileChange: function(e) {
    var files = this.files || [];
    var $field = $(this);
    var $input = $field.parents('.upload-input');
    var $fileName = $('.js-selected-value', $input);
    if (files.length > 0) {
      var file = files[0];
      $field.data('file', file)
      $fileName.attr('data-filename', file.name);
      $input.addClass('selected');
    } else {
      $field.data('file', null);
      $fileName.attr('data-filename', '');
      $input.removeClass('selected');
    }
    Gateway.hideFieldError($field);
  },
  eFileReset: function(e) {
    var $input = $(this).parents('.upload-input');
    var $field = $input.find('input');
    var $fileName = $('.js-selected-value', $input);
    $field.data('file', null).val('');
    $fileName.attr('data-filename', '');
    $input.removeClass('selected');
    Gateway.hideFieldError($field);
  },
  showHint: function($hint, delay, hide_delay) {
    hide_delay = hide_delay || 0;
    var show_to = $hint.data('show_to');
    var hide_to = $hint.data('hide_to');
    clearTimeout(show_to);
    clearTimeout(hide_to);
    show_to = setTimeout(function() {
      $hint.addClass('show-hint');
      if (hide_delay > 0) {
        Gateway.hideHint($hint, hide_delay);
      }
    }, delay);
    $hint.data('show_to', show_to);
  },
  hideHint: function($hint, delay) {
    var show_to = $hint.data('show_to');
    var hide_to = $hint.data('hide_to');
    clearTimeout(show_to);
    clearTimeout(hide_to);
    hide_to = setTimeout(function() {
      $hint.removeClass('show-hint');
    }, delay);
    $hint.data('hide_to', hide_to);
  },
  eHintEvent: function(e) {
    var $hint = $(this);
    if (e.type == 'click') {
      Gateway.showHint($hint, 50, 2000);
    } else if (e.type == 'mouseover') {
      Gateway.showHint($hint, 400);
    } else if (e.type == 'mouseout') {
      Gateway.hideHint($hint, 100);
    }
  },
  eHideAllHints: function(e) {
    var $closestHint = $(e.target).closest('.js-hint-tooltip');
    $('.js-hint-tooltip.show-hint').each(function() {
      if (!$closestHint.filter(this).size()) {
        Gateway.hideHint($(this), 1);
      }
    });
  },
  updateTextShadow: function(footerEl, textSel, shadowedSel, add_margin) {
    var textEl = footerEl.previousElementSibling;
    if (textEl && $(textEl).is(textSel)) {
      var text_rect = textEl.getBoundingClientRect();
      var tnode = textEl.firstChild;
      while (tnode && tnode.nodeType == tnode.ELEMENT_NODE) {
        tnode = tnode.firstChild;
      }
      $(textEl).removeClass('before_footer');
      if (tnode) {
        var r = document.createRange();
        r.setStart(tnode, 0);
        r.setEnd(tnode, 1);
        var char_rect = r.getBoundingClientRect();
        if (Math.abs(char_rect.right - text_rect.right) > 3) {
          var $infoEl = $(footerEl).find(shadowedSel);
          if ($infoEl.size()) {
            $(textEl).find('span.js-shadow').remove();
            var $shadowEl = $('<span class="js-shadow">').css('display', 'inline-block').width($infoEl.width() + (add_margin || 0));
            $(textEl).append($shadowEl).addClass('before_footer');
          }
        }
      }
    }
  },
  initSelect: function($form, field, options) {
    var $selectEl = $form.field(field);
    var $selectInput = $('.input', $selectEl);
    options = options || {};
    $selectEl.data('selOpts', options);
    var onload = function(state) {
      var cachedData;
      $selectEl.initSelect({
        multiSelect: !options.noMultiSelect,
        noCloseOnSelect: false,
        noCloseOnEnter: !!options.onEnter,
        enterOnClose: true,
        enterEnabled: function() {
          return !!options.onEnter;
        },
        prepareQuery: function(str) {
          return $.trim(str).toLowerCase();
        },
        renderItem: options.renderItem,
        appendToItems: options.appendToItems,
        renderSelectedItem: options.renderSelectedItem,
        renderNoItems: function(q) {
          return q && options.l_no_items_found ? '<div class="select-list-no-results">' + options.l_no_items_found + '</div>' : '';
        },
        getData: function(value) {
          if (cachedData !== false && !cachedData) {
            cachedData = false;
            if (options.items) {
              var data = options.items;
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                item._values = [item.name.toLowerCase()];
              }
              cachedData = data;
            }
          }
          if (options.getData) {
            return options.getData(value, cachedData, options.getDataOpts);
          } else {
            return cachedData;
          }
        },
        onBlur: function(value) {
          options.onBlur && options.onBlur(field, options.getDataOpts);
        },
        onEnter: function(value) {
          options.onEnter && options.onEnter(field, value);
        },
        onChange: function(value, valueFull) {
          options.onChange && options.onChange(field, value, valueFull);
        },
        onUpdate: function(value, valueFull) {
          Gateway.updateField($selectInput);
          options.onUpdate && options.onUpdate(field, value, valueFull);
        }
      });
      Gateway.updateField($selectInput);
    };
    var onunload = function(state) {
      $selectEl.destroySelect();
    };
    if (options.insideLayer) {
      Aj.onLayerLoad(onload);
      Aj.onLayerUnload(onunload);
    } else {
      Aj.onLoad(onload);
      Aj.onUnload(onunload);
    }
  },
  getSelectItems: function(method, need_fields) {
    var _data = Aj.globalState.adsList;
    if (_data === false) {
      return false;
    } else if (_data) {
      return _data;
    }
    Aj.state.adsList = false;
    Aj.state.adsListIsLoading = true;
    if (Aj.state.initialAdsList) {
      setTimeout(function() {
        OwnerGateway.processAdsList(Aj.state.initialAdsList);
      }, 10);
    } else {
      OwnerGateway.loadAdsList({offset: 0});
    }
    return false;
  },
  getTimezoneText: function(tz_offset) {
    if (typeof tz_offset === 'undefined') {
      tz_offset = -60 * (new Date()).getTimezoneOffset();
    }
    var is_pos = tz_offset >= 0;
    if (!is_pos) tz_offset *= -1;
    var h = Math.floor(tz_offset / 3600);
    var m = Math.floor((tz_offset % 3600) / 60);
    if (m < 10) m = '0' + m;
    return 'UTC' + (tz_offset ? (is_pos ? '+' : '-') + h + ':' + m : '');
  },
  eLogOut: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Aj.apiRequest('logOut', {}, function(result) {
      location.reload();
    });
    return false;
  }
};

var Account = {
  formFields: [
    'name',
    'full_name',
    'email',
    'phone_number',
    'country',
    'city'
  ],
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.account-edit-form', cont);
      Gateway.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.save-info-btn', Account.eSubmitForm);
      cont.on('change.curPage', '.gw-form-control', Account.onFieldChange);
      Aj.onLoad(function(state) {
        state.initFormData = Account.getFormData(state.$form);
        Aj.onBeforeUnload(function() {
          var curFormData = Account.getFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onUnload(function(state) {
      Gateway.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
    });
  },
  onFieldChange: function() {
    if (!$(this).hasClass('js-amount-input')) {
      Gateway.hideFieldError($(this));
    }
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [];
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      values.push(value);
    }
    return values.join('|');
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form   = Aj.state.$form;
    var $button = $(this);
    var method = 'createAccount';
    var params = {};
    if (Aj.state.accountId) {
      method = 'editAccountInfo';
      params.account_id = Aj.state.accountId;
    }
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      if (!value.length && !Account.optFields[field]) {
        $form.field(field).focus();
        return false;
      }
      params[field] = value;
    }

    $button.prop('disabled', true);
    Aj.apiRequest(method, params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Gateway.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = Account.getFormData($form);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    });
    return false;
  },
  initToken: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      cont.on('click.curPage', '.js-copy-token-btn', Account.eCopyToken);
      cont.on('click.curPage', '.js-revoke-token-btn', Account.eRevokeToken);
      state.$form = $('.api-edit-form', cont);
      Gateway.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-save-settings-btn', Account.eApiSubmitForm);
      cont.on('change.curPage', '.gw-form-control', Account.onFieldChange);
    });
  },
  eCopyToken: function(e) {
    e.preventDefault();
    copyToClipboard(Aj.state.token);
    showToast(l('WEB_TOKEN_COPIED', 'Copied.'));
  },
  revokeTokenPopup: function (onConfirm) {
    var $confirm = $('<div class="popup-container hide alert-popup-container"><section class="gw-layer-popup gw-layer-delete-ad popup-no-close"><p class="gw-layer-text">' + l('WEB_REVOKE_TOKEN_CONFIRM_TEXT') + '</p><div class="popup-buttons"><div class="popup-button popup-cancel-btn">' + l('WEB_CANCEL', 'Cancel') + '</div><div class="popup-button popup-primary-btn">' + l('WEB_REVOKE_TOKEN_CONFIRM_BUTTON') + '</div></div></section></div>');
    var confirm = function() {
      onConfirm && onConfirm($confirm);
      closePopup($confirm);
    }
    var $primaryBtn = $('.popup-primary-btn', $confirm);
    $primaryBtn.on('click', confirm);
    $confirm.one('popup:close', function() {
      $primaryBtn.off('click', confirm);
      $confirm.remove();
    });
    openPopup($confirm, {
      closeByClickOutside: '.popup-no-close',
    });
    return $confirm;
  },
  eRevokeToken: function(e) {
    e.preventDefault();
    var $btn = $(this);
    if ($btn.data('disabled')) {
      return false;
    }
    Account.revokeTokenPopup(function() {
      $btn.data('disabled', true);
      Aj.apiRequest('revokeToken', {
        account_id: Aj.state.accountId
      }, function(result) {
        $btn.data('disabled', false);
        if (result.error) {
          return showAlert(result.error);
        }
        if (result.new_token) {
          Aj.state.token = result.new_token;
        }
        if (result.new_token_value) {
          $('.js-token-value', Aj.ajContainer).value(result.new_token_value);
        }
        if (result.toast) {
          showToast(result.toast);
        }
      });
    });
    return false;
  },
  eApiSubmitForm: function(e) {
    e.preventDefault();
    var $form   = Aj.state.$form;
    var $button = $(this);
    var params = {
      account_id: Aj.state.accountId,
      ip_list:  $form.field('ip_list').value()
    };
    $button.prop('disabled', true);
    Aj.apiRequest('saveApiSettings', params, function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Gateway.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      if (result.new_ip_list) {
        $form.field('ip_list').value(result.new_ip_list).updateAutosize();
      }
      if (result.toast) {
        showToast(result.toast);
      }
    });
    return false;
  }
};

var LogHistory = {
  init: function() {
    Aj.onLoad(function(state) {
      $(document).on('click.curPage', '.js-load-more-rows', LogHistory.eLoadMoreRows);
      $(window).on('scroll resize', LogHistory.onScroll);
      LogHistory.onScroll();
    });
    Aj.onUnload(function(state) {
      $(window).off('scroll resize', LogHistory.onScroll);
    });
  },
  onScroll: function() {
    $('.js-load-more-rows').each(function() {
      var $loadMore = $(this);
      var top = $loadMore.offset().top - $(window).scrollTop();
      if (top < $(window).height() * 2) {
        LogHistory.loadRows($loadMore);
      }
    });
  },
  eLoadMoreRows: function(e) {
    e.preventDefault();
    var $loadMore = $(this);
    LogHistory.loadRows($loadMore);
  },
  loadRows: function($loadMore) {
    if ($loadMore.data('loading')) {
      return;
    }
    var $table = $loadMore.closest('table');
    var offset = $loadMore.attr('data-next-offset');
    $loadMore.data('loading', true);
    Aj.apiRequest('getLogHistory', {
      account_id: Aj.state.accountId,
      offset: offset
    }, function(result) {
      $loadMore.data('loading', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $('tbody', $table).append(result.body);
      $('tfoot', $table).html(result.foot);
      LogHistory.onScroll();
    });
  }
};


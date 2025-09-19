
var Ads = {
  init: function() {
    Aj.onLoad(function(state) {
      Ads.updateTime(Aj.ajContainer);
      Ads.updateEmoji(Aj.ajContainer);
      Ads.updateAdMessagePreviews(Aj.ajContainer);
      $('.logout-link').on('click', Ads.eLogOut);
    });
    Aj.onUnload(function(state) {
      $('.logout-link').off('click', Ads.eLogOut);
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
      Ads.updateField($fieldEl, true);
    } else if (e.type == 'blur' || e.type == 'focusout') {
      Ads.updateField($fieldEl, false);
    } else {
      Ads.updateField($fieldEl);
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
    var base_decimals = Ads.ownerCurrencyDecimals();
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
    var decimals = $fieldEl.attr('data-decimals') || Ads.ownerCurrencyDecimals();
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
      var float_value = Ads.amountFieldValue(field);
      if (float_value !== false && $(field).value()) {
        $eurEl.addClass('active').html(Ads.wrapEurAmount(float_value));
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
    var decimals = $fieldEl.attr('data-decimals') || Ads.ownerCurrencyDecimals();
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
      Ads.showFieldError($fieldEl);
    } else {
      Ads.hideFieldError($fieldEl);
    }
    if (e.type == 'change') {
      if (new_value.length && !is_invalid) {
        this.value = Ads.wrapAmount(float_value, true, true, decimals);
      }
    }
    Ads.updateAmountEurValue(this);
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
    var $hint = $formGroup.find('>.pr-form-control-hint');
    var $msg = $formGroup.find('>.pr-form-control-msg');
    if (!$msg.size() && hint_text) {
      $msg = $('<div class="pr-form-control-msg shide" />');
      $formGroup.find('>.pr-form-control-wrap,>.datetime-group,>.pr-btn').after($msg);
    }
    $msg.toggleClass('no-hint', !$hint.text().length);
    if (hint_text) {
      $msg.html('<div class="pr-form-control-msg-text">' + hint_text + '</div>').redraw().slideShow();
    } else {
      $msg.slideHide();
    }
    $formGroup.toggleClass('field-invalid', !!field_invalid);
  },
  showFieldError: function($fieldEl, error_text, focus) {
    Ads.showFieldHint($fieldEl, error_text, true);
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
    Ads.showFieldHint($fieldEl, '', false);
  },
  onSelectChange: function(field, value, valueFull) {
    var $fieldEl = Aj.state.$form.field(field);
    Ads.hideFieldError($fieldEl);
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
  updateEmoji: function(context) {
    $('tg-emoji', context).each(function() {
      TEmoji.init(this);
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
    $(field).on('focus blur keyup change input', Ads.eUpdateField);
    $(field).parents('.pr-search-input-wrap').find('.pr-search-reset').on('click', Ads.eClearField);
    Ads.updateField($(field));
  },
  fieldDestroy: function(field) {
    $(field).off('focus blur keyup change input', Ads.eUpdateField);
    $(field).parents('.pr-search-input-wrap').find('.pr-search-reset').off('click', Ads.eClearField);
  },
  formInit: function(form) {
    var $form = $(form);
    $('.pr-form-control', $form).each(function(){ Ads.fieldInit(this); });
    $('.js-amount-input', $form).on('keyup change input', Ads.eUpdateAmountField);
    $('input.checkbox,input.radio', $form).on('focus blur', Ads.eUpdateField);
    $('input[data-type="schedule"]', $form).initSchedule();
    $('input[type="date"]', $form).initDatePicker();
    $('input[type="time"]', $form).initTimePicker();
    $('input[type="date"],input[type="time"]', $form).on('change', Ads.eDateTimeChange);
    $('.input-dropdown', $form).on('click', '.input-dropdown-item', Ads.eUpdateDropdown);
    $('.input-dropdown > .input', $form).on('selectval', Ads.eSetDropdownValue);
    $('.input-dropdown', $form).on('shown.bs.dropdown', Ads.eShownDropdown);
    $('.js-hint-tooltip', $form).on('mouseover mouseout click', Ads.eHintEvent);
    $('textarea.pr-form-control', $form).initAutosize();
    $('.upload-input input', $form).on('change', Ads.eFileChange);
    $('.upload-input .js-file-reset', $form).on('click', Ads.eFileReset);
    $(document).on('touchstart click', Ads.eHideAllHints);
    $form.on('click.curPage', '.file-upload', stopImmediatePropagation);
    setTimeout(function(){ $form.removeClass('no-transition'); }, 100);
  },
  formDestroy: function(form) {
    var $form = $(form);
    $('.pr-form-control', $form).each(function(){ Ads.fieldDestroy(this); });
    $('.js-amount-input', $form).off('keyup change input', Ads.eUpdateAmountField);
    $('input.checkbox,input.radio', $form).off('focus blur', Ads.eUpdateField);
    $('input[data-type="schedule"]', $form).destroySchedule();
    $('input[type="date"]', $form).destroyDatePicker();
    $('input[type="time"]', $form).destroyTimePicker();
    $('input[type="date"],input[type="time"]', $form).off('change', Ads.eDateTimeChange);
    $('.input-dropdown', $form).off('click', '.input-dropdown-item', Ads.eUpdateDropdown);
    $('.input-dropdown > .input', $form).off('selectval', Ads.eSetDropdownValue);
    $('.input-dropdown', $form).off('shown.bs.dropdown', Ads.eShownDropdown);
    $('.js-hint-tooltip', $form).off('mouseover mouseout click', Ads.eHintEvent);
    $('textarea.pr-form-control', $form).destroyAutosize();
    $('.upload-input input', $form).off('change', Ads.eFileChange);
    $('.upload-input .js-file-reset', $form).off('click', Ads.eFileReset);
    $(document).off('touchstart click', Ads.eHideAllHints);
    $form.off('click.curPage', '.file-upload', stopImmediatePropagation);
  },
  eDateTimeChange: function(e) {
    Ads.hideFieldError($(this));
  },
  eClearField: function(e) {
    var $fieldEl = $(this).parents('.pr-search-input-wrap').find('.pr-search-input');
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
    Ads.hideFieldError($field);
  },
  eFileReset: function(e) {
    var $input = $(this).parents('.upload-input');
    var $field = $input.find('input');
    var $fileName = $('.js-selected-value', $input);
    $field.data('file', null).val('');
    $fileName.attr('data-filename', '');
    $input.removeClass('selected');
    Ads.hideFieldError($field);
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
        Ads.hideHint($hint, hide_delay);
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
      Ads.showHint($hint, 50, 2000);
    } else if (e.type == 'mouseover') {
      Ads.showHint($hint, 400);
    } else if (e.type == 'mouseout') {
      Ads.hideHint($hint, 100);
    }
  },
  eHideAllHints: function(e) {
    var $closestHint = $(e.target).closest('.js-hint-tooltip');
    $('.js-hint-tooltip.show-hint').each(function() {
      if (!$closestHint.filter(this).size()) {
        Ads.hideHint($(this), 1);
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
  updateAdMessagePreviews: function(cont) {
    NewAd.updateAdPreviewText(cont);
    $('.pr-review-ad-preview .js-preview-text tg-emoji', cont).each(function() {
      TEmoji.init(this);
    });
    $('.pr-target-intro-sticker tg-emoji', cont).each(function() {
      TEmoji.init(this);
    });
    $('.pr-review-ad-preview .js-preview-media', cont).each(function() {
      NewAd.initAdMedia(this);
    });
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
          Ads.updateField($selectInput);
          options.onUpdate && options.onUpdate(field, value, valueFull);
        },
        onValueFocus: function(value, valueFull) {
          options.onValueFocus && options.onValueFocus(field, value, valueFull);
        }
      });
      Ads.updateField($selectInput);
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
        OwnerAds.processAdsList(Aj.state.initialAdsList);
      }, 10);
    } else {
      OwnerAds.loadAdsList({offset: 0});
    }
    return false;
  },
  getTimezoneText: function(tz_offset) {
    if (typeof tz_offset === 'undefined') {
      tz_offset = -60 * (new Date()).getTimezoneOffset();
    }
    tz_offset = parseInt(tz_offset);
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

var NewAd = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.js-ad-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-promote-photo', NewAd.eReplacePromotePhoto);
      cont.on('change.curPage', '.js-promote-photo > .file-upload', NewAd.eUploadPromotePhoto);
      cont.on('click.curPage', '.js-ad-media', NewAd.ePlayAdMedia);
      cont.on('click.curPage', '.js-ad-media-remove', NewAd.eRemoveAdMedia);
      cont.on('click.curPage', '.js-add-media-btn', NewAd.eReplaceAdMedia);
      cont.on('change.curPage', '.js-add-media-btn > .file-upload', NewAd.eUploadAdMedia);
      cont.on('click.curPage', '.clear-draft-btn', NewAd.eClearDraft);
      cont.on('click.curPage', '.create-new-ad-btn', NewAd.eSubmitForm);
      cont.on('click.curPage', '.js-open-daily-budget', NewAd.eOpenDailyBudget);
      cont.on('click.curPage', '.js-remove-daily-budget', NewAd.eRemoveDailyBudget);
      cont.on('click.curPage', '.js-activate-date-link', NewAd.eOpenStartDate);
      cont.on('click.curPage', '.js-deactivate-date-link', NewAd.eOpenEndDate);
      cont.on('click.curPage', '.js-activate-date-remove', NewAd.eRemoveStartDate);
      cont.on('click.curPage', '.js-deactivate-date-remove', NewAd.eRemoveEndDate);
      cont.on('click.curPage', '.js-open-schedule', NewAd.eOpenSchedule);
      cont.on('click.curPage', '.js-deselect-all', NewAd.eDeselectAll);
      cont.on('click.curPage', '.js-field-similar_channels', NewAd.eOpenSimilarChannels);
      cont.on('click.curPage', '.js-field-similar_bots', NewAd.eOpenSimilarBots);
      cont.on('click.curPage', '.js-prev-sample-results', NewAd.ePrevSampleResults);
      cont.on('click.curPage', '.js-next-sample-results', NewAd.eNextSampleResults);
      $('.js-schedule-overview', state.$form).html(NewAd.scheduleOverview(state.$form));
      NewAd.initSelectList(state);
      state.titleField = state.$form.field('title');
      state.titleField.on('change.curPage', NewAd.onTitleChange);
      state.textField = state.$form.field('text');
      state.textField.on('change.curPage', NewAd.onTextChange);
      state.textField.on('input.curPage', NewAd.onTextInput);
      state.promoteUrlField = state.$form.field('promote_url');
      state.promoteUrlField.on('change.curPage', NewAd.onPromoteUrlChange);
      state.websiteNameField = state.$form.field('website_name');
      state.websiteNameField.on('change.curPage', NewAd.onWebsiteNameChange);
      state.websitePhotoField = state.$form.field('website_photo');
      state.mediaField = state.$form.field('media');
      state.buttonField = state.$form.field('button');
      state.buttonField.on('ddchange.curPage', NewAd.onButtonChange);
      state.adInfoField = state.$form.field('ad_info');
      state.adInfoField.on('change.curPage', NewAd.onAdInfoChange);
      state.targetTypeField = state.$form.field('target_type');
      state.targetTypeField.fieldEl().on('change.curPage', NewAd.onTargetTypeChange);
      state.pictureCheckbox = state.$form.field('picture');
      state.pictureCheckbox.on('change.curPage', NewAd.onPictureChange);
      state.intersectTopicsCheckbox = state.$form.field('intersect_topics');
      state.intersectTopicsCheckbox.on('change.curPage', NewAd.onIntersectTopicsChange);
      state.excludePoliticCheckbox = state.$form.field('exclude_politic');
      state.excludePoliticCheckbox.on('change.curPage', NewAd.onExcludeChannelTopicChange);
      state.onlyPoliticCheckbox = state.$form.field('only_politic');
      state.onlyPoliticCheckbox.on('change.curPage', NewAd.onOnlyChannelTopicChange);
      state.excludeCryptoCheckbox = state.$form.field('exclude_crypto');
      state.excludeCryptoCheckbox.on('change.curPage', NewAd.onExcludeChannelTopicChange);
      state.onlyCryptoCheckbox = state.$form.field('only_crypto');
      state.onlyCryptoCheckbox.on('change.curPage', NewAd.onOnlyChannelTopicChange);
      state.activeRadio = state.$form.field('active');
      state.activeRadio.fieldEl().on('change.curPage', NewAd.onActiveChange);
      state.useScheduleCheckbox = state.$form.field('use_schedule');
      state.useScheduleCheckbox.on('change.curPage', NewAd.onUseScheduleChange);
      state.deviceField = state.$form.field('device');
      state.deviceField.on('ddchange.curPage', NewAd.onDeviceChange);
      state.placementRadio = state.$form.field('placement');
      state.placementRadio.fieldEl().on('change.curPage', NewAd.onPlacementChange);
      state.confirmedCheckbox = state.$form.field('confirmed');
      state.confirmedCheckbox.on('change.curPage', NewAd.onConfirmedChange);
      state.similarChannelsPopup = $('.js-similar-channels-popup', cont);
      state.similarBotsPopup = $('.js-similar-bots-popup', cont);
      NewAd.updateAdMedia(state.mediaField);
      NewAd.updateAdPreview(state.$form, state.previewData);
      NewAd.updateAdTargetOverview();
      setTimeout(function() {
        state.titleField.focusAndSelect();
      }, 50);
      Aj.onLoad(function(state) {
        state.initFormData = NewAd.getFormData(state.$form);
        state.initPreviewFormData = NewAd.getPreviewFormData();
        state.draftEnabled = true;
        Aj.onBeforeUnload(function() {
          var curPreviewFormData = NewAd.getPreviewFormData();
          if (Aj.state.initPreviewFormData != curPreviewFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          var curFormData = NewAd.getFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
        NewAd.saveDraftAuto(true);
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
      state.titleField.off('.curPage');
      state.textField.off('.curPage');
      state.promoteUrlField.off('.curPage');
      state.websiteNameField.off('.curPage');
      state.buttonField.off('.curPage');
      state.adInfoField.off('.curPage');
      state.targetTypeField.fieldEl().off('.curPage');
      state.confirmedCheckbox.off('.curPage');
      state.pictureCheckbox.off('.curPage');
      state.intersectTopicsCheckbox.off('.curPage');
      state.excludePoliticCheckbox.off('.curPage');
      state.onlyPoliticCheckbox.off('.curPage');
      state.activeRadio.fieldEl().off('.curPage');
      state.placementRadio.fieldEl().off('.curPage');
      state.useScheduleCheckbox.off('.curPage');
      state.deviceField.off('.curPage');
      for (var i = 0; i < state.selectList.length; i++) {
        var selectData = state.selectList[i];
        if (selectData.location_search) {
          var $cFieldEl = state.$form.field(selectData.c_field).fieldEl();
          $cFieldEl.off('valueupdate', NewAd.updateLocationFields);
        }
      }
      clearTimeout(state.saveDraftTo);
    });
  },
  initSelectList: function(state) {
    if (!state.selectList) return;
    for (var i = 0; i < state.selectList.length; i++) {
      var selectData = state.selectList[i];
      if (selectData.channel_search) {
        Ads.initSelect(state.$form, selectData.field, {
          items: Aj.state[selectData.items_key] || [],
          pairedField: selectData.paired_field || false,
          l_limit: (selectData.limit_error || ''),
          renderSelectedItem: function(val, item) {
            return '<div class="selected-item' + (item.photo ? ' has-photo' : '') + '" data-val="' + cleanHTML(val.toString()) + '">' + (item.photo ? '<div class="selected-item-photo">' + item.photo + '</div>' : '') + '<span class="close"></span><div class="label">' + item.name + '</div></div>';
          },
          onEnter: NewAd.onChannelSearch,
          onUpdate: NewAd.onSelectUpdate,
          onChange: Ads.onSelectChange
        });
      } else if (selectData.bot_search) {
        Ads.initSelect(state.$form, selectData.field, {
          items: Aj.state[selectData.items_key] || [],
          pairedField: selectData.paired_field || false,
          l_limit: (selectData.limit_error || ''),
          renderSelectedItem: function(val, item) {
            return '<div class="selected-item' + (item.photo ? ' has-photo' : '') + '" data-val="' + cleanHTML(val.toString()) + '">' + (item.photo ? '<div class="selected-item-photo">' + item.photo + '</div>' : '') + '<span class="close"></span><div class="label">' + item.name + '</div></div>';
          },
          onEnter: NewAd.onBotSearch,
          onUpdate: NewAd.onSelectUpdate,
          onChange: Ads.onSelectChange
        });
      } else if (selectData.location_search) {
        var $cFieldEl = state.$form.field(selectData.c_field).fieldEl();
        $cFieldEl.data('l_field', selectData.field);
        $cFieldEl.on('valueupdate', NewAd.updateLocationFields);
        Ads.initSelect(state.$form, selectData.field, {
          items: Aj.state[selectData.items_key] || [],
          renderItem: function(item) {
            return '<div class="select-list-item">' + (item.name + (item.region ? ', ' + item.region : '')) + '</div>';
          },
          getData: function(query, items, opts) {
            return NewAd.getLocationData(items, opts.field, opts.c_field, query);
          },
          getDataOpts: {
            field: selectData.field,
            c_field: selectData.c_field,
          },
          onBlur: NewAd.onLocationSelectBlur,
          onUpdate: NewAd.onSelectUpdate,
          onChange: NewAd.onLocationSelectChange
        });
      } else if (selectData.query_search) {
        Ads.initSelect(state.$form, selectData.field, {
          items: Aj.state[selectData.items_key] || [],
          l_limit: (selectData.limit_error || ''),
          renderSelectedItem: function(val, item) {
            return '<div class="selected-item" data-val="' + cleanHTML(val.toString()) + '"><span class="close"></span><div class="label">' + item.name + '</div></div>';
          },
          onValueFocus: NewAd.onTargetQueryFocus,
          onEnter: NewAd.onTargetQuerySearch,
          onUpdate: NewAd.onTargetQueryUpdate,
          onChange: Ads.onSelectChange
        });
      } else {
        Ads.initSelect(state.$form, selectData.field, {
          items: Aj.state[selectData.items_key] || [],
          pairedField: selectData.paired_field || false,
          noMultiSelect: selectData.single_value || false,
          l_no_items_found: (selectData.no_items_error || ''),
          onUpdate: NewAd.onSelectUpdate,
          onChange: Ads.onSelectChange
        });
      }
    }
  },
  onTitleChange: function() {
    Ads.hideFieldError($(this));
  },
  onAdInfoChange: function() {
    Ads.hideFieldError($(this));
  },
  onTargetTypeChange: function() {
    var cur_type = this.value;
    $('.pr-target-options', Aj.ajContainer).each(function() {
      var visible = $(this).attr('data-value') == cur_type;
      $(this).toggleClass('visible', visible);
      if (visible) {
        NewAd.updateAdPreviewText(this);
      }
    });
    var $form = Aj.state.$form;
    NewAd.updateFieldsVisibility();

    $('.js-schedule-overview', $form).html(NewAd.scheduleOverview($form));
    NewAd.updateAdTargetOverview();
    NewAd.adPostCheck($form);
  },
  onPlacementChange: function() {
    var cur_placement = this.value;
    var $cont = $(this).parents('.pr-target-options');
    $('.js-preview', $cont).each(function() {
      var visible = $(this).attr('data-placement') == cur_placement;
      $(this).toggleClass('hide', !visible);
    });
    var $form = Aj.state.$form;
    NewAd.updateFieldsVisibility();
    NewAd.adPostCheck($form);
  },
  updateFieldsVisibility: function() {
    var $form = Aj.state.$form;
    var target_type = $form.field('target_type').value();
    var fv = {};
    if (target_type == 'channels' ||
        target_type == 'users') {
      fv.text = true;
      fv.media = true;
      fv.button = true;
      fv.picture = true;
      if (target_type == 'users') {
        var placement = $form.field('placement').value();
        if (placement == 'video_banner') {
          fv.media = false;
          fv.button = false;
        }
      }
      var $mediaField = Aj.state.mediaField;
      var has_media = $mediaField.value() || $mediaField.data('has-media');
      if (fv.media && has_media) {
        fv.picture = false;
      }
    } else if (target_type == 'bots') {
      fv.text = true;
      fv.picture = true;
    }
    var media_on = !!$form.field('media').value();
    var picture_checked = $form.field('picture').prop('checked');
    var $textWrap = $('.js-field-text-wrap', $form);
    var $mediaWrap = $('.js-field-media-wrap', $form);
    var $buttonWrap = $('.js-field-button-wrap', $form);
    var $pictureWrap = $('.js-field-picture-wrap');
    $textWrap.slideToggle(!!fv.text);
    $mediaWrap.slideToggle(!!fv.media);
    $pictureWrap.slideToggle(!!fv.picture);
    $buttonWrap.slideToggle(!!Aj.state.customButton && !!fv.button);
    $('.js-preview', $form).toggleClass('picture', !!fv.picture && picture_checked).toggleClass('media', !!fv.media && media_on);
  },
  onPictureChange: function() {
    var $form = $(this.form);
    var picture_checked = $(this).prop('checked');
    $('.js-preview', $form).toggleClass('picture', !!picture_checked);
    NewAd.updateAdPreviewText($form);
    NewAd.adPostCheck($form);
  },
  onIntersectTopicsChange: function() {
    NewAd.updateAdTargetOverview();
    NewAd.saveDraftAuto(true);
  },
  onExcludeChannelTopicChange: function() {
    if ($(this).prop('checked')) {
      Aj.state.onlyPoliticCheckbox.prop('checked', false);
      Aj.state.onlyCryptoCheckbox.prop('checked', false);
    }
    NewAd.updateAdTargetOverview();
    NewAd.saveDraftAuto(true);
  },
  onOnlyChannelTopicChange: function() {
    if ($(this).prop('checked')) {
      Aj.state.excludePoliticCheckbox.not(this).prop('checked', false);
      Aj.state.excludeCryptoCheckbox.not(this).prop('checked', false);
      Aj.state.onlyPoliticCheckbox.not(this).prop('checked', false);
      Aj.state.onlyCryptoCheckbox.not(this).prop('checked', false);
    }
    NewAd.updateAdTargetOverview();
    NewAd.saveDraftAuto(true);
  },
  onActiveChange: function() {
    var $form = $(this.form);
    var hasActivateDate = !!$form.field('ad_activate_date').value();
    var hasDectivateDate = !!$form.field('ad_deactivate_date').value();
    if ($form.field('active').value() == '1') {
      $('.js-activate-date-link-wrap', $form).slideHide();
      $('.js-activate-date-wrap', $form).slideHide();
      $('.js-deactivate-date-link-wrap', $form).slideToggle(!hasDectivateDate);
      $('.js-deactivate-date-wrap', $form).slideToggle(hasDectivateDate);
    } else {
      $('.js-activate-date-link-wrap', $form).slideToggle(!hasActivateDate);
      $('.js-activate-date-wrap', $form).slideToggle(hasActivateDate);
      $('.js-deactivate-date-link-wrap', $form).slideToggle(hasActivateDate && !hasDectivateDate);
      $('.js-deactivate-date-wrap', $form).slideToggle(hasActivateDate && hasDectivateDate);
    }
    NewAd.saveDraftAuto(true);
  },
  onUseScheduleChange: function() {
    var $form = Aj.state.$form;
    if ($form.field('use_schedule').prop('checked')) {
      var schedule = $form.field('schedule').value();
      if (schedule == '0;0;0;0;0;0;0') {
        NewAd.openSchedule(Aj.state);
      }
      $('.js-schedule-wrap', $form).slideShow();
    } else {
      $('.js-schedule-wrap', $form).slideHide();
    }
    NewAd.saveDraftAuto(true);
  },
  onConfirmedChange: function() {
    $('.create-new-ad-btn', Aj.ajContainer).prop('disabled', !$(this).prop('checked'));
  },
  onTextChange: function() {
    var $form = $(this.form);
    var textField = $form.field('text');
    Ads.hideFieldError(textField);
    NewAd.adPostCheck($form);
  },
  getAdTextLength: function(text) {
    text = text.replace(/!\[(.*?)\]\(tg:\/\/emoji\?id=(\d+)\)/g, '$1');
    return text.length;
  },
  onTextInput: function() {
    var textField = $(this);
    var text = textField.value();
    var max_len = Aj.state.textMaxLength;
    var symbols_left = max_len - NewAd.getAdTextLength(text);
    Ads.showFieldError(textField);
    if (text.indexOf('\n') >= 0) {
      Ads.showFieldHint(textField, l('ADS_ERROR_POST_NEW_LINES_NOT_ALLOWED'), true);
    } else if (symbols_left < 0) {
      Ads.showFieldHint(textField, l('ADS_ERROR_POST_MESSAGE_TOO_LONG', {max_len: Aj.state.textMaxLength}), true);
    } else {
      if (symbols_left <= 20) {
        Ads.showFieldHint(textField, l('WEB_AD_TEXT_SYMBOLS_LEFT', {n: symbols_left}));
      } else {
        Ads.showFieldHint(textField, '');
      }
    }
  },
  onPromoteUrlChange: function() {
    var $form = $(this.form);
    var promoteUrlField = $form.field('promote_url');
    Ads.hideFieldError(promoteUrlField);
    NewAd.adPostCheck($form);
  },
  onWebsiteNameChange: function() {
    var $form = $(this.form);
    var websiteNameField = $form.field('website_name');
    Ads.hideFieldError(websiteNameField);
    NewAd.adPostCheck($form);
  },
  onButtonChange: function() {
    var $form = $(this).parents('form');
    var buttonField = $form.field('button');
    Ads.hideFieldError(buttonField);
    NewAd.adPostCheck($form);
  },
  onDeviceChange: function() {
    var $form = $(this).parents('form');
    var devideField = $form.field('devide');
    Ads.hideFieldError(devideField);
    NewAd.updateAdTargetOverview();
    NewAd.saveDraftAuto(true);
  },
  adPostCheck: function($form, try_index) {
    var textField = $form.field('text');
    var promoteUrlField = $form.field('promote_url');
    var buttonField = $form.field('button');
    var websiteNameField = $form.field('website_name');
    var websitePhotoField = $form.field('website_photo');
    var mediaField = $form.field('media');
    var cpmField = $form.field('cpm');
    var deviceField = $form.field('device');
    var text = textField.value();
    var promote_url = promoteUrlField.value();
    var button = buttonField.data('value');
    var website_name = websiteNameField.value();
    var website_photo = websitePhotoField.value();
    var media = mediaField.value();
    var target_type = $form.field('target_type').value();
    var placement = $form.field('placement').value();
    var $formGroup = promoteUrlField.fieldEl().parents('.form-group');
    var $cpmFormGroup = cpmField.fieldEl().parents('.form-group');
    var device = deviceField.data('value');
    if (!text && !promote_url) {
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      text: text,
      promote_url: promote_url,
      button: button,
      website_name: website_name,
      website_photo: website_photo,
      media: media,
      device: device,
      target_type: target_type,
      placement: placement
    };
    if (Aj.state.adId) {
      params.ad_id = Aj.state.adId;
    }
    if ($form.field('picture').prop('checked')) {
      params.picture = 1;
    }
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var values = $form.field(selectData.field).data('value') || [];
        params[selectData.field] = selectData.single_value ? values : values.join(';');
      }
    }
    $formGroup.addClass('field-loading');
    $cpmFormGroup.addClass('field-loading');
    Aj.apiRequest('checkAdPost', params, function(result) {
      Ads.hideFieldError(textField);
      Ads.hideFieldError(promoteUrlField);
      Ads.hideFieldError(websiteNameField);
      $cpmFormGroup.removeClass('field-loading');
      $formGroup.removeClass('field-loading');
      if (result.promote_url) {
        result.promote_url = uncleanHTML(result.promote_url);
        var new_promote_url = promoteUrlField.value();
        if (!new_promote_url || promote_url == new_promote_url) {
          if (new_promote_url != result.promote_url) {
            promoteUrlField.value(result.promote_url);
          }
        }
      }
      if (result.website_name) {
        result.website_name = uncleanHTML(result.website_name);
        var new_website_name = websiteNameField.value();
        if (!new_website_name || website_name == new_website_name) {
          if (new_website_name != result.website_name) {
            websiteNameField.value(result.website_name);
          }
        }
      }
      if (result.website_photo) {
        var new_website_photo = websitePhotoField.value();
        if (!new_website_photo || website_photo == new_website_photo) {
          if (new_website_photo != result.website_photo) {
            websitePhotoField.value(result.website_photo);
          }
        }
      }
      if (result.exclude_channel) {
        var $excludeField = Aj.state.$form.field('exclude_channels');
        var excludeValueFull = $excludeField.data('valueFull');
        var already_excluded = false;
        excludeValueFull && $.each(excludeValueFull, function(val, item) {
          if (item.val == result.exclude_channel.id) {
            already_excluded = true;
          } else if (item._auto) {
            $excludeField.trigger('deselectval', [val]);
            $excludeField.data('prevval', '');
            if (Aj.state.autoExcluded) {
              delete Aj.state.autoExcluded[item.val];
            }
          }
        });
        if (!already_excluded) {
          if (!Aj.state.autoExcluded) {
            Aj.state.autoExcluded = {};
          }
          if (!Aj.state.autoExcluded[result.exclude_channel.id]) {
            var item = {
              val: result.exclude_channel.id,
              name: result.exclude_channel.title,
              photo: result.exclude_channel.photo,
              _auto: true
            };
            $excludeField.trigger('selectval', [item, true]);
            $excludeField.data('prevval', '');
            Aj.state.autoExcluded[result.exclude_channel.id] = true;
          }
        }
      }
      NewAd.updateAdPreview($form, result.preview_data);
      NewAd.updateAdForm($form, result.is_website, result.custom_button);
      try_index = try_index || 0;
      if (result.update_requested && try_index < 5) {
        setTimeout(function() {
          if ($form.parents('body').size()) {
            NewAd.adPostCheck($form, ++try_index);
          }
        }, 500);
      }
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
    });
  },
  onChannelSearch: function(field, value) {
    var $fieldEl = Aj.state.$form.field(field);
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    var prev_value = $fieldEl.data('prevval');
    if (prev_value && prev_value == value) {
      return false;
    }
    $fieldEl.data('prevval', value);
    Ads.hideFieldError($fieldEl);
    if (!value) {
      return false;
    }
    var channels_limit = Aj.state.channelItemsLimit;
    if ($fieldEl.data('value').length >= channels_limit) {
      var selOpts = $fieldEl.data('selOpts');
      if (selOpts.l_limit) {
        Ads.showFieldError($fieldEl, selOpts.l_limit);
        return false;
      }
    }
    $formGroup.addClass('field-loading');
    Aj.apiRequest('searchChannel', {
      owner_id: Aj.state.ownerId,
      query: value,
      field: field
    }, function(result) {
      $formGroup.removeClass('field-loading');
      if (result.error) {
        Ads.showFieldError($fieldEl, result.error);
        return false;
      }
      if (result.channel) {
        var item = result.channel;
        $fieldEl.trigger('selectval', [item, true]);
        $fieldEl.data('prevval', '');
      }
    });
  },
  onBotSearch: function(field, value) {
    var $fieldEl = Aj.state.$form.field(field);
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    var prev_value = $fieldEl.data('prevval');
    if (prev_value && prev_value == value) {
      return false;
    }
    $fieldEl.data('prevval', value);
    Ads.hideFieldError($fieldEl);
    if (!value) {
      return false;
    }
    var bots_limit = Aj.state.botItemsLimit;
    if ($fieldEl.data('value').length >= bots_limit) {
      var selOpts = $fieldEl.data('selOpts');
      if (selOpts.l_limit) {
        Ads.showFieldError($fieldEl, selOpts.l_limit);
        return false;
      }
    }
    $formGroup.addClass('field-loading');
    Aj.apiRequest('searchBot', {
      query: value,
      field: field
    }, function(result) {
      $formGroup.removeClass('field-loading');
      if (result.error) {
        Ads.showFieldError($fieldEl, result.error);
        return false;
      }
      if (result.bot) {
        var item = {
          val: result.bot.id,
          name: result.bot.title,
          photo: result.bot.photo,
          username: result.bot.username
        };
        $fieldEl.trigger('selectval', [item, true]);
        $fieldEl.data('prevval', '');
      }
    });
  },
  onTargetQueryFocus: function(field, value, valueFull) {
    NewAd.showAdSampleResults(valueFull);
  },
  onTargetQueryUpdate: function(field, value, valueFull) {
    NewAd.onSelectUpdate(field, value, valueFull);
    NewAd.openAdSampleResults();
    $('.js-sample-results-wrap', Aj.state.$form).toggleClass('multiple', value.length > 1);
  },
  onTargetQuerySearch: function(field, value) {
    var $fieldEl = Aj.state.$form.field(field);
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    var prev_value = $fieldEl.data('prevval');
    if (prev_value && prev_value == value) {
      return false;
    }
    $fieldEl.data('prevval', value);
    Ads.hideFieldError($fieldEl);
    if (!value) {
      return false;
    }
    var queries_limit = Aj.state.searchQueryItemsLimit;
    if ($fieldEl.data('value').length >= queries_limit) {
      var selOpts = $fieldEl.data('selOpts');
      if (selOpts.l_limit) {
        Ads.showFieldError($fieldEl, selOpts.l_limit);
        return false;
      }
    }
    $formGroup.addClass('field-loading');
    Aj.apiRequest('searchTargetQuery', {
      query: value,
      field: field
    }, function(result) {
      $formGroup.removeClass('field-loading');
      if (result.error) {
        Ads.showFieldError($fieldEl, result.error);
        return false;
      }
      if (result.query) {
        var item = {
          val: result.query.id,
          name: result.query.title,
          sample_results: result.query.sample_results
        };
        NewAd.updateAdSampleResults(item);
        $fieldEl.trigger('selectval', [item, true]);
        $fieldEl.data('prevval', '');
      }
    });
  },
  loadLocationData: function(params, opts, onUpdate, onReady) {
    Aj.apiRequest('searchLocation', params, function(result) {
      if (result.error) {
        if (result.field) {
          onReady && onReady();
          var $field = Aj.state.$form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        } else {
          if (!opts.retry) opts.retry = 1;
          else opts.retry++;
          setTimeout(function(){ NewAd.loadLocationData(params, opts, onUpdate, onReady); }, opts.retry * 1000);
        }
      } else {
        if (opts.retry) {
          opts.retry = 0;
        }
        if (result.items) {
          var locCache = Aj.globalState._locationCache;
          var data_key = opts.key;
          if (!locCache[data_key]) {
            locCache[data_key] = [];
          }
          var items = result.items;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item._values = [item.name.toLowerCase()];
            locCache[data_key].push(item);
          }
          onUpdate && onUpdate();
        }
        if (result.next_offset) {
          params.offset = result.next_offset;
          NewAd.loadLocationData(params, opts, onUpdate, onReady);
        } else {
          onReady && onReady();
        }
      }
    });
  },
  updateLocationFields: function(e, value, valueFull) {
    var field = $(this).data('l_field');
    var $fieldEl = Aj.state.$form.field(field);
    if (!value.length) {
      $fieldEl.trigger('reset');
    }
  },
  getLocationData: function(items, field, c_field, query) {
    var $form = Aj.state.$form;
    var $fieldEl = $form.field(field);
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    var $cFieldEl = $form.field(c_field);
    var c_value = $cFieldEl.data('value');
    if (c_value.join) {
      if (c_value.length > 1) {
        Ads.showFieldError($cFieldEl, l('ADS_ERROR_LOCATION_COUNTRIES_TOO_MANY'));
        return false;
      }
      c_value = c_value.join(';');
    }
    query = query.replace(/^\s+/, '');
    if (!query.length || !c_value) {
      return items;
    }
    if (!Aj.globalState._locationCache) {
      Aj.globalState._locationCache = {};
    }
    var query_char = query.substr(0, 1);
    var locCache = Aj.globalState._locationCache;
    var data_key = c_value + '.' + query_char;
    if (locCache[data_key] === false || locCache[data_key]) {
      return locCache[data_key] ? locCache[data_key].concat(items) : items;
    }
    locCache[data_key] = false;
    $formGroup.addClass('field-loading');
    NewAd.loadLocationData({
      countries: c_value,
      query: query_char,
      offset: 0
    }, {key: data_key}, function() {
      $fieldEl.trigger('contentchange');
    }, function() {
      $formGroup.removeClass('field-loading');
      $fieldEl.trigger('dataready').trigger('datachange');
    });
    return false;
  },
  onLocationSelectBlur: function(field, opts) {
    var $form = Aj.state.$form;
    var $cFieldEl = $form.field(opts.c_field);
    var c_value = $cFieldEl.data('value');
    if (c_value.join) {
      if (c_value.length > 1) {
        Ads.hideFieldError($cFieldEl);
        return false;
      }
    }
  },
  onLocationSelectChange: function(field, value, valueFull) {
    var $fieldEl = Aj.state.$form.field(field);
    Ads.hideFieldError($fieldEl);
  },
  onSelectUpdate: function(field, value, valueFull) {
    var $fieldEl = Aj.state.$form.field(field);
    if (field == 'user_topics') {
      var user_topics_cnt = $fieldEl.data('value').length;
      $('.js-field-intersect_topics-wrap', Aj.state.$form).slideToggle(user_topics_cnt > 1);
    } else if (field == 'channels') {
      var channels_cnt = $fieldEl.data('value').length;
      $('.js-field-similar_channels-wrap[data-field="channels"]', Aj.state.$form).slideToggle(channels_cnt > 0 && channels_cnt < 10);
      $('.js-deselect-all[data-field="channels"]', Aj.state.$form).toggleClass('hide', channels_cnt < 2);
    } else if (field == 'exclude_channels') {
      var channels_cnt = $fieldEl.data('value').length;
      $('.js-field-similar_channels-wrap[data-field="exclude_channels"]', Aj.state.$form).slideToggle(channels_cnt > 0 && channels_cnt < 10);
      $('.js-deselect-all[data-field="exclude_channels"]', Aj.state.$form).toggleClass('hide', channels_cnt < 2);
    } else if (field == 'bots') {
      var bots_cnt = $fieldEl.data('value').length;
      $('.js-field-similar_bots-wrap', Aj.state.$form).slideToggle(bots_cnt > 0 && bots_cnt < 10);
      $('.js-deselect-all[data-field="bots"]', Aj.state.$form).toggleClass('hide', bots_cnt < 2);
    }
    var selOpts = $fieldEl.data('selOpts');
    var paired_field = selOpts.pairedField;
    if (paired_field) {
      var $pairedField = Aj.state.$form.field(paired_field);
      if ($pairedField.data('inited')) {
        var paired_value = $pairedField.data('value');
        var paired_valueFull = $pairedField.data('valueFull');
        valueFull && $.each(valueFull, function(val, item) {
          if (paired_valueFull[val]) {
            $pairedField.trigger('deselectval', [val]);
            $pairedField.data('prevval', '');
          }
        });
      }
    }
    if (!Aj.state.adId) {
      NewAd.updateAdTargetOverview();
    }
  },
  eDeselectAll: function(e) {
    e.preventDefault();
    var field = $(this).attr('data-field');
    Aj.state.$form.field(field).trigger('reset');
  },
  eOpenSimilarChannels: function(e) {
    e.preventDefault();
    var $link = $(this);
    var field = $link.parents('.js-field-similar_channels-wrap').attr('data-field') || 'channels';
    var $fieldEl = Aj.state.$form.field(field);
    var values   = $fieldEl.data('value') || [];
    if (!values.length || $link.data('loading')) {
      return false;
    }
    var channels = values.join(';');
    openPopup(Aj.state.similarChannelsPopup, {
      closeByClickOutside: '.popup-no-close',
      onOpen: function() {
        var $list = $('.js-similar-channels-list', this);
        var $empty = $('.js-similar-channels-empty', this);
        var $loading = $('.js-similar-channels-loading', this);
        var $button = $('.js-add-similar-channels', this);
        $list.on('scroll', NewAd.onSimilarScroll);
        $list.on('change', 'input.checkbox', NewAd.eSimilarChannelChange);
        $button.data('field', field);
        $button.on('click', NewAd.eAddSimilarChannels);
        $empty.addClass('hide');
        $button.addClass('hide');
        $loading.removeClass('hide');
        $list.html('').trigger('scroll').data('channels', {}).addClass('hide');
        Aj.apiRequest('getSimilarChannels', {
          channels: channels,
          for: field
        }, function(result) {
          if (result.error) {
            showAlert(result.error);
            return false;
          }
          if (result.channels) {
            var html = '', channel_items = {};
            for (var i = 0; i < result.channels.length; i++) {
              var item = result.channels[i];
              html += item.cb_item;
              channel_items['ch' + item.id] = item;
            }
            var has_items = result.channels.length > 0;
            $empty.toggleClass('hide', has_items);
            $button.toggleClass('hide', !has_items);
            $loading.addClass('hide');
            $list.html(html).data('channel_items', channel_items).toggleClass('hide', !has_items).trigger('scroll');
            NewAd.updateSimilarChannelButton();
          }
        });
      },
      onClose: function() {
        var $list = $('.js-similar-channels-list', this);
        var $button = $('.js-add-similar-channels', this);
        $list.off('scroll', NewAd.onSimilarScroll);
        $list.off('change', 'input.checkbox', NewAd.eSimilarChannelChange);
        $button.off('click', NewAd.eAddSimilarChannels);
      }
    });
  },
  onSimilarScroll: function() {
    $(this).toggleClass('topscroll', this.scrollTop > 0);
    $(this).toggleClass('bottomscroll', this.scrollTop < this.scrollHeight - this.clientHeight);
  },
  eSimilarChannelChange: function() {
    NewAd.updateSimilarChannelButton();
  },
  updateSimilarChannelButton: function() {
    var $popup = Aj.state.similarChannelsPopup;
    var $list = $('.js-similar-channels-list', $popup);
    var $button = $('.js-add-similar-channels', $popup);
    var count = 0;
    $('input.checkbox', $list).each(function() {
      if ($(this).prop('checked')) {
        count++;
      }
    });
    $button.html(l('WEB_ADD_N_SIMILAR_CHANNELS', {n: count}));
    $button.toggleClass('disabled', !count);
  },
  eAddSimilarChannels: function() {
    var $popup = Aj.state.similarChannelsPopup;
    var field = $(this).data('field') || 'channels';
    var $list = $('.js-similar-channels-list', $popup);
    var $button = $('.js-add-similar-channels', $popup);
    var channel_items = $list.data('channel_items');
    var $fieldEl = Aj.state.$form.field(field);
    var add_items = [];
    $('input.checkbox', $list).each(function() {
      if ($(this).prop('checked')) {
        var name = $(this).prop('name');
        var channel = channel_items[name];
        var item = {
          val: channel.id,
          name: channel.title,
          photo: channel.photo,
          username: channel.username
        };
        add_items.push(item);
      }
    });
    if (add_items.length > 0) {
      $fieldEl.trigger('selectvals', [add_items, true]);
    }
    closePopup($popup);
  },
  eOpenSimilarBots: function(e) {
    e.preventDefault();
    var $link = $(this);
    var $fieldEl = Aj.state.$form.field('bots');
    var values   = $fieldEl.data('value') || [];
    if (!values.length || $link.data('loading')) {
      return false;
    }
    var bots = values.join(';');
    openPopup(Aj.state.similarBotsPopup, {
      closeByClickOutside: '.popup-no-close',
      onOpen: function() {
        var $list = $('.js-similar-bots-list', this);
        var $empty = $('.js-similar-bots-empty', this);
        var $loading = $('.js-similar-bots-loading', this);
        var $button = $('.js-add-similar-bots', this);
        $list.on('scroll', NewAd.onSimilarScroll);
        $list.on('change', 'input.checkbox', NewAd.eSimilarBotChange);
        $button.on('click', NewAd.eAddSimilarBots);
        $empty.addClass('hide');
        $button.addClass('hide');
        $loading.removeClass('hide');
        $list.html('').trigger('scroll').data('bots', {}).addClass('hide');
        Aj.apiRequest('getSimilarBots', {
          bots: bots
        }, function(result) {
          if (result.error) {
            showAlert(result.error);
            return false;
          }
          if (result.bots) {
            var html = '', bot_items = {};
            for (var i = 0; i < result.bots.length; i++) {
              var item = result.bots[i];
              html += item.cb_item;
              bot_items['bot' + item.id] = item;
            }
            var has_items = result.bots.length > 0;
            $empty.toggleClass('hide', has_items);
            $button.toggleClass('hide', !has_items);
            $loading.addClass('hide');
            $list.html(html).data('bot_items', bot_items).toggleClass('hide', !has_items).trigger('scroll');
            NewAd.updateSimilarBotButton();
          }
        });
      },
      onClose: function() {
        var $list = $('.js-similar-bots-list', this);
        var $button = $('.js-add-similar-bots', this);
        $list.off('scroll', NewAd.onSimilarScroll);
        $list.off('change', 'input.checkbox', NewAd.eSimilarBotChange);
        $button.off('click', NewAd.eAddSimilarBots);
      }
    });
  },
  eSimilarBotChange: function() {
    NewAd.updateSimilarBotButton();
  },
  updateSimilarBotButton: function() {
    var $popup = Aj.state.similarBotsPopup;
    var $list = $('.js-similar-bots-list', $popup);
    var $button = $('.js-add-similar-bots', $popup);
    var count = 0;
    $('input.checkbox', $list).each(function() {
      if ($(this).prop('checked')) {
        count++;
      }
    });
    $button.html(l('WEB_ADD_N_SIMILAR_BOTS', {n: count}));
    $button.toggleClass('disabled', !count);
  },
  eAddSimilarBots: function() {
    var $popup = Aj.state.similarBotsPopup;
    var $list = $('.js-similar-bots-list', $popup);
    var $button = $('.js-add-similar-bots', $popup);
    var bot_items = $list.data('bot_items');
    var $fieldEl = Aj.state.$form.field('bots');
    var add_items = [];
    $('input.checkbox', $list).each(function() {
      if ($(this).prop('checked')) {
        var name = $(this).prop('name');
        var bot = bot_items[name];
        var item = {
          val: bot.id,
          name: bot.title,
          photo: bot.photo,
          username: bot.username
        };
        add_items.push(item);
      }
    });
    if (add_items.length > 0) {
      $fieldEl.trigger('selectvals', [add_items, true]);
    }
    closePopup($popup);
  },
  eOpenDailyBudget: function(e) {
    e.preventDefault();
    var $form = $(this).parents('form');
    $('.js-field-daily_budget-wrap', $form).slideShow();
    $('.js-open-daily-budget', $form).addClass('inactive');
  },
  eRemoveDailyBudget: function(e) {
    e.preventDefault();
    var $form = $(this).parents('form');
    $('.js-field-daily_budget-wrap', $form).slideHide();
    $('.js-open-daily-budget', $form).removeClass('inactive');
    $form.field('daily_budget').value('');
  },
  eOpenStartDate: function(e) {
    e.preventDefault();
    var $form = $(this).parents('form');
    $('.js-activate-date-link-wrap', $form).slideHide();
    $('.js-activate-date-wrap', $form).slideShow();
    if ($form.field('active').value() != '1') {
      var hasDectivateDate = !!$form.field('ad_deactivate_date').value();
      $('.js-deactivate-date-link-wrap', $form).slideToggle(!hasDectivateDate);
      $('.js-deactivate-date-wrap', $form).slideToggle(hasDectivateDate);
    }
  },
  eOpenEndDate: function(e) {
    e.preventDefault();
    var $form = $(this).parents('form');
    $('.js-deactivate-date-link-wrap', $form).slideHide();
    $('.js-deactivate-date-wrap', $form).slideShow();
  },
  eRemoveStartDate: function(e) {
    e.preventDefault();
    var $form = $(this).parents('form');
    $('.js-activate-date-link-wrap', $form).slideShow();
    $('.js-activate-date-wrap', $form).slideHide();
    $form.field('ad_activate_date').trigger('selectval', ['']);
    $form.field('ad_activate_time').trigger('selectval', ['']);
    if ($form.field('active').value() != '1') {
      $('.js-deactivate-date-link-wrap', $form).slideHide();
      $('.js-deactivate-date-wrap', $form).slideHide();
    }
  },
  eRemoveEndDate: function(e) {
    e.preventDefault();
    var $form = $(this).parents('form');
    $('.js-deactivate-date-link-wrap', $form).slideShow();
    $('.js-deactivate-date-wrap', $form).slideHide();
    $form.field('ad_deactivate_date').trigger('selectval', ['']);
    $form.field('ad_deactivate_time').trigger('selectval', ['']);
  },
  eOpenSchedule: function(e) {
    e.preventDefault();
    NewAd.openSchedule(Aj.state);
  },
  eReplacePromotePhoto: function(e) {
    if (!$(this).hasClass('can-replace')) {
      return;
    }
    e && e.stopImmediatePropagation();
    e && e.preventDefault();
    $('<input type="file" accept="image/jpeg,image/jpg,image/png" class="file-upload hide">').appendTo(this).click();
  },
  eUploadPromotePhoto: function(e) {
    var $fileInput = $(this);
    var $form = $(this).parents('form');
    var files = this.files || [];
    if (files.length > 0) {
      var promoteUrlField = $form.field('promote_url');
      var websitePhotoField = $form.field('website_photo');
      var $formGroup = promoteUrlField.fieldEl().parents('.form-group');
      var $promotePhoto = $('.js-promote-photo', $form);
      $formGroup.addClass('field-loading');
      var xhr = Upload.uploadFile('promote_photo', files[0], function onSuccess(result) {
        $formGroup.removeClass('field-loading');
        $fileInput.remove();
        if (result.website_photo) {
          websitePhotoField.value(result.website_photo);
        }
        if (result.photo_html) {
          $promotePhoto.html(result.photo_html);
          NewAd.adPostCheck($form);
        }
      }, function onProgress(loaded, total) {
      }, function onError(error) {
        $formGroup.removeClass('field-loading');
        $fileInput.remove();
        if (xhr.aborted) return;
        showAlert(error);
      });
      $fileInput.data('xhr', xhr);
    }
  },
  ePlayAdMedia: function(e) {
    e && e.stopImmediatePropagation();
    e && e.preventDefault();
    var $form = $(this).parents('form');
    var $field = $form.field('media');
    var $formGroup = $field.parents('.form-group');
    var $mediaWrap = $('.js-ad-media-wrap', $formGroup);
    $('video', $mediaWrap).first().each(function() {
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
      $mediaWrap.toggleClass('is-playing', !this.paused);
    });
  },
  eRemoveAdMedia: function(e) {
    e && e.stopImmediatePropagation();
    e && e.preventDefault();
    var $form = $(this).parents('form');
    var $field = $form.field('media');
    var $formGroup = $field.parents('.form-group');
    var $mediaWrap = $('.js-ad-media-wrap', $formGroup);
    if ($mediaWrap.hasClass('file-loading')) {
      var xhr = $mediaWrap.data('xhr');
      if (xhr) {
        xhr.aborted = true;
        xhr.abort();
      }
    }
    $field.value('').data('has-media', false);
    NewAd.updateAdMedia($field);
    NewAd.adPostCheck($form);
  },
  resetAdMediaUpload: function($form) {
    var $mediaWrap = $('.js-ad-media-wrap', $form);
    if ($mediaWrap.hasClass('file-loading')) {
      var xhr = $mediaWrap.data('xhr');
      if (xhr) {
        xhr.aborted = true;
        xhr.abort();
      }
      var $field = $form.field('media');
      $field.value('').data('has-media', false);
      NewAd.updateAdMedia($field);
    }
  },
  eReplaceAdMedia: function(e) {
    e && e.stopImmediatePropagation();
    e && e.preventDefault();
    $('<input type="file" accept="image/jpeg,image/jpg,image/png,video/mp4" class="file-upload hide">').appendTo(this).click();
  },
  eUploadAdMedia: function(e) {
    var $fileInput = $(this);
    var $form = $(this).parents('form');
    var $field = $form.field('media');
    var files = this.files || [];
    var photo_size_limit = Aj.state.mediaPhotoSizeLimit || 1048576;
    var video_size_limit = Aj.state.mediaVideoSizeLimit || 10485760;
    Ads.hideFieldError($field);
    if (files.length > 0) {
      var file = files[0];
      var is_video = file.type == 'video/mp4';
      var size_limit = is_video ? video_size_limit : photo_size_limit;
      if (file.size > size_limit) {
        var err_msg = l(is_video ? 'ADS_ERROR_VIDEO_IS_TOO_BIG' : 'ADS_ERROR_PHOTO_IS_TOO_BIG', {
          size_limit: cleanHTML(wrapSize(size_limit)),
        });
        Ads.showFieldError($field, err_msg);
        return false;
      }
      var $formGroup = $field.parents('.form-group');
      var $mediaWrap = $('.js-ad-media-wrap', $formGroup);
      NewAd.wrapAdMedia($field, file);
      $mediaWrap.addClass('file-loading');
      var xhr = Upload.uploadFile('ad_media', files[0], function onSuccess(result) {
        $mediaWrap.removeClass('file-loading');
        $fileInput.remove();
        if (result.media) {
          $field.value(result.media);
        }
        NewAd.adPostCheck($form);
      }, function onProgress(loaded, total) {
        var progress = total ? loaded / total : 0;
        progress = Math.max(0, Math.min(progress, 1));
        $('.circle-progress', $mediaWrap).attr('stroke-dashoffset', 106 * (1 - progress));
      }, function onError(error) {
        $mediaWrap.removeClass('file-loading');
        $fileInput.remove();
        if (xhr.aborted) return;
        Ads.showFieldError($field, error);
        $field.value('').data('has-media', false);
        NewAd.updateAdMedia($field);
      });
      $mediaWrap.data('xhr', xhr);
    }
  },
  initAdMedia: function($mediaWrap) {
    var $content = $('.js-ad-media-content', $mediaWrap);
    var $duration = $('.js-ad-media-duration', $mediaWrap);
    var $video = $('video', $content);
    if ($video.size()) {
      $video.on('loadedmetadata', function(e) {
        console.log('loadedmetadata', this.duration);
        if (this.duration) {
          var duration = Math.round(this.duration);
          var duration_str = formatDuration(duration);
          $duration.html(duration_str);
        }
      });
      $video.on('timeupdate', function(e) {
        console.log('timeupdate', this.duration);
        if (this.duration) {
          var duration = Math.round(this.duration);
          var duration_str = formatDuration(duration - this.currentTime);
          $duration.html(duration_str);
        }
      });
      $video.each(function(e) {
        this.load();
      });
    }
  },
  updateAdMedia: function($field) {
    var $form = $field.parents('form');
    var $formGroup = $field.parents('.form-group');
    var $mediaWrap = $('.js-ad-media-wrap', $formGroup);
    var $content = $('.js-ad-media-content', $mediaWrap);
    var $button = $('.js-add-media-btn', $formGroup);
    var has_media = $field.value() || $field.data('has-media');
    NewAd.initAdMedia($mediaWrap);
    if (has_media) {
      $button.html(l('WEB_AD_MEDIA_CHANGE_BUTTON'));
      $mediaWrap.slideShow();
    } else {
      $button.html(l('WEB_AD_MEDIA_UPLOAD_BUTTON'));
      $mediaWrap.slideHide();
    }
    NewAd.updateFieldsVisibility();
    $mediaWrap.removeClass('file-loading');
    $previewEl = $field.data('$previewEl');
    if ($previewEl) {
      $previewEl.toggleClass('has-media', !!has_media);
    }
  },
  wrapAdMedia: function($field, file) {
    var $formGroup = $field.parents('.form-group');
    var $mediaWrap = $('.js-ad-media-wrap', $formGroup);
    var $content = $('.js-ad-media-content', $mediaWrap);
    $content.html('');
    if (file) {
      var is_video = file.type == 'video/mp4';
      var media_url = URL.createObjectURL(file);
      if (is_video) {
        $media = $('<video class="pr-ad-media-video" width="100%" height="100%" preload loop muted></video>').attr('src', media_url);
      } else {
        $media = $('<div class="pr-ad-media-photo"></div>').css('backgroundImage', "url('" + media_url + "')");
      }
      $mediaWrap.toggleClass('is-video', is_video);
      $content.append($media);
    }
    $field.data('has-media', !!file);
    NewAd.updateAdMedia($field);
  },
  updateAdPreviewText: function($cont) {
    $('.js-preview-wrap', $cont).each(function() {
      var oneline = $('.js-preview-text', this).height() <= 20;
      $(this).toggleClass('oneline-text', oneline);
    });
  },
  updateAdPreview: function($form, previewData) {
    var $form = Aj.state.$form;
    Aj.state.previewData = previewData;
    if (previewData) {
      $('.js-preview-from', $form).html(previewData.from);
      $('.js-preview-from-desc', $form).html(previewData.from_desc);
      $('.js-preview-wrap', $form).attr('href', uncleanHTML(previewData.button_url));
      for (var i = 1; i <= 3; i++) {
        $('.js-preview-wrap', $form).cssProp('--preview-color' + i, (previewData.accent_colors || [])[i - 1] || '');
      }
      $('.js-promote-media', $form).html(previewData.media);
      $('.js-promote-photo', $form).html(previewData.photo);
      $('.js-promote-photo-tooltip', $form).html(previewData.from);
      $('.js-preview-text', $form).html(previewData.text);
      $('.js-preview-text tg-emoji', $form).each(function(){ TEmoji.init(this); });
      $('.js-preview-button', $form).html(previewData.button);
      $('.js-preview-footer', $form).each(function() {
        Ads.updateTextShadow(this, '.js-preview-text', '.label', 10);
      });
      $('.js-field-picture-label', $form).html(previewData.picture_label);
      $('.js-preview', $form).toggleClass('picture', !!previewData.picture).toggleClass('media', !!previewData.media_on);
      $('.js-picture-hint', $form).html(previewData.picture_hint);
      $('.js-cpm-extra', $form).html(previewData.cpm_extra);
      $('.js-cpm-extra-tooltip', $form).html(previewData.cpm_extra_tooltip);
      NewAd.updateAdPreviewText($form);
    }
    $('.js-preview', $form).each(function() {
      var target_type = $(this).attr('data-target-type');
      var avail = previewData && previewData.avail_targets && previewData.avail_targets[target_type] || false;
      $(this).toggleClass('active', avail);
    });
    NewAd.initAdMedia($('.js-promote-media', $form));
    $('.js-promote-photo', $form).parents('.pr-form-control-wrap').toggleClass('has-photo', !!previewData);
    $('.js-cpm-extra', $form).parents('.pr-form-control-wrap').toggleClass('has-extra-cpm', !!(previewData && previewData.cpm_extra));
    $('.js-preview-link', $form).toggleClass('inactive', !previewData);
  },
  updateAdForm: function($form, isWebsite, customButton) {
    var $previewPopup = Aj.state.$previewPopup;
    var inPopup = $form.parents('.pr-layer-preview-ad').size() > 0;
    var cur_type = $form.field('target_type').value();
    var $cont = false;
    var $websiteNameField = false;
    var $websitePhotoField = false;
    if (inPopup) {
      if ($previewPopup) {
        $cont = $previewPopup;
        $websiteNameField = $form.field('website_name');
        $websitePhotoField = $form.field('website_photo');
      }
    } else {
      $cont = Aj.state.$form;
      $websiteNameField = Aj.state.$form.field('website_name');
      $websitePhotoField = Aj.state.$form.field('website_photo');
    }
    if ($cont) {
      $('.js-promote-photo', $cont).toggleClass('can-replace', !!isWebsite);
      if (!isWebsite) {
        $websiteNameField.value('');
        $websitePhotoField.value('');
      }
      var $websiteNameWrap = $('.js-field-website_name-wrap', $cont);
      $websiteNameWrap.slideToggle(!!isWebsite);
      var $convEventWrap = $('.js-field-conversion_event-wrap', $cont);
      $convEventWrap.slideToggle(!!isWebsite);
      Aj.state.customButton = customButton;
      NewAd.updateFieldsVisibility();
    }
  },
  scheduleOverview: function($form) {
    var schedule = $form.field('schedule').value();
    var schedule_tz_custom = $form.field('schedule_tz_custom').value();
    var schedule_tz = $form.field('schedule_tz').value();
    var target_type = $form.field('target_type').value();
    if (target_type != 'users') {
      schedule_tz_custom = '1';
    }
    var value = schedule.split(';').slice(0, 7);
    var grouped = {}, list = [], val;
    for (var w = 0; w < 7; w++) {
      if (val = parseInt(value[w])) {
        if (!grouped[val]) {
          grouped[val] = {};
          list.push(val);
        }
        grouped[val][w] = true;
      }
    }
    if (!list.length) {
      return '';
    }
    var week = function(w) {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][w];
    };
    var hour = function (h) {
      return h < 10 ? '0' + h : h;
    };
    var res = [];
    for (var i = 0; i < list.length; i++) {
      var val = list[i], group = grouped[val];
      var days = [], sd = null, ed = null;
      for (var w = 0; w <= 7; w++) {
        if (group[w]) {
          if (!sd) sd = week(w);
          ed = week(w);
        } else if (sd) {
          days.push(sd == ed ? sd : sd + '-' + ed);
          sd = ed = null;
        }
      }
      var hours = [], sh = null, eh = null;
      for (var h = 0; h <= 24; h++) {
        if ((val & (1 << h)) > 0) {
          if (!sh) sh = hour(h);
          eh = hour(h + 1);
        } else if (sh) {
          hours.push('<nobr>' + sh + '-' + eh + '</nobr>');
          sh = eh = null;
        }
      }
      res.push('<b><nobr>' + days.join(', ') + '</nobr></b>:&nbsp;' + hours.join(', '));
    }
    if (schedule_tz_custom == '1') {
      var tz = Ads.getTimezoneText(schedule_tz);
    } else {
      var tz = l('WEB_SCHEDULE_VIEWER_TZ', "viewer's timezone");
    }
    return res.join('; ') + ' <span class="timezone">(' + tz + ')</span>';
  },
  openSchedule: function(state) {
    var $schedulePopup = $('<div class="popup-container hide alert-popup-container pr-popup-container">' + state.scheduleTpl + '</div>');
    state.$schedulePopup = $schedulePopup;
    var $form = state.$form;
    var schedule = $form.field('schedule').value();
    var schedule_tz_custom = $form.field('schedule_tz_custom').value();
    var schedule_tz = $form.field('schedule_tz').value();
    if (!schedule_tz.length) {
      schedule_tz = -60 * (new Date()).getTimezoneOffset();
    }
    var target_type = $form.field('target_type').value();

    var $scheduleForm = $('.js-ad-form', $schedulePopup);
    Ads.formInit($scheduleForm);
    $scheduleForm.on('submit', preventDefault);

    var scheduleChanged = function() {
      var schedule = $scheduleForm.field('schedule').value();
      $clearScheduleBtn.fadeToggle(schedule != '0;0;0;0;0;0;0');
    };
    var scheduleClear = function() {
      $scheduleForm.field('schedule').trigger('selectval', ['']);
    };
    var scheduleSave = function() {
      var schedule = $scheduleForm.field('schedule').value();
      var schedule_tz_custom = $scheduleForm.field('schedule_tz_custom').value();
      var schedule_tz = $scheduleForm.field('schedule_tz').data('value');
      $form.field('schedule').trigger('selectval', [schedule]);
      $form.field('schedule_tz_custom').value(schedule_tz_custom);
      $form.field('schedule_tz').value(schedule_tz);
      if (schedule == '0;0;0;0;0;0;0') {
        $form.field('use_schedule').prop('checked', false).trigger('change');
      }
      $('.js-schedule-overview', $form).html(NewAd.scheduleOverview($form));
      closePopup($schedulePopup);
      if (state.draftEnabled) {
        NewAd.saveDraftAuto(true);
      }
    };
    var scheduleCancel = function() {
      closePopup($schedulePopup);
    };
    $scheduleForm.on('change', scheduleChanged);
    var $clearScheduleBtn = $('.js-clear-schedule', $schedulePopup);
    $clearScheduleBtn.on('click', scheduleClear);
    var $submitBtn = $('.submit-form-btn', $schedulePopup);
    $submitBtn.on('click', scheduleSave);
    var $cancelBtn = $('.cancel-form-btn', $schedulePopup);
    $cancelBtn.on('click', scheduleCancel);
    $schedulePopup.one('popup:close', function() {
      Ads.formDestroy($scheduleForm);
      $scheduleForm.off('submit', preventDefault);
      delete state.$schedulePopup;
      $clearScheduleBtn.off('click', scheduleClear);
      $submitBtn.off('click', scheduleSave);
      $cancelBtn.off('click', scheduleCancel);
      $schedulePopup.remove();
      var schedule = $form.field('schedule').value();
      if (schedule == '0;0;0;0;0;0;0') {
        $form.field('use_schedule').prop('checked', false).trigger('change');
      }
    });

    if (target_type != 'users') {
      $scheduleForm.field('schedule_tz_custom').fieldEl().filter('[value="0"]').prop('disabled', true);
      schedule_tz_custom = '1';
    }
    $scheduleForm.field('schedule').trigger('selectval', [schedule]);
    $scheduleForm.field('schedule_tz_custom').value(schedule_tz_custom);
    $scheduleForm.field('schedule_tz').trigger('selectval', [schedule_tz]);

    openPopup($schedulePopup, {
      closeByClickOutside: '.popup-no-close'
    });
    return $schedulePopup;
  },
  isAudienceTargetOnly: function(len) {
    if (!len.locations &&
        !len.countries &&
        !len.user_langs &&
        !len.user_topics &&
        !len.exclude_user_topics &&
        len.audiences > 0) {
      return true;
    }
    return false;
  },
  ePrevSampleResults: function(e) {
    NewAd.openAdSampleResults(-1);
  },
  eNextSampleResults: function(e) {
    NewAd.openAdSampleResults(1);
  },
  openAdSampleResults: function(delta) {
    var curValue = $('.js-sample-query', Aj.state.$form).attr('data-value');
    var $field = Aj.state.$form.field('search_queries');
    var value = $field.data('value') || [];
    var valueFull = $field.data('valueFull') || {};
    var curIndex = null;
    if (value.length) {
      var list = [];
      for (var j = 0; j < value.length; j++) {
        var val = value[j], valFull = valueFull[val] || {};
        if (curValue == val) {
          curIndex = j;
          break;
        }
      }
    }
    if (curIndex === null) {
      curIndex = 0;
    } else if (delta > 0) {
      curIndex++;
      if (curIndex >= value.length) {
        curIndex = 0;
      }
    } else if (delta < 0) {
      curIndex--;
      if (curIndex < 0) {
        curIndex = value.length - 1;
      }
    }
    NewAd.showAdSampleResults(valueFull[value[curIndex]]);
  },
  showAdSampleResults: function(valueFull) {
    if (!valueFull) {
      valueFull = {
        sample_results: Aj.state.sampleResultsPlaceholder
      };
    };
    if (valueFull.sample_results) {
      NewAd.updateAdSampleResults(valueFull);
    } else {
      Aj.apiRequest('searchTargetQuery', {
        query: valueFull.name
      }, function(result) {
        if (result.query) {
          valueFull.sample_results = result.query.sample_results;
          NewAd.updateAdSampleResults(valueFull);
        }
      });
    }
  },
  updateAdSampleResults: function(item) {
    $('.js-sample-query', Aj.state.$form).attr('data-value', item.val || '');
    $('.js-sample-query', Aj.state.$form).html(item.name || '');
    $('.js-sample-results', Aj.state.$form).html(item.sample_results || '');
  },
  updateAdTargetOverview: function() {
    var len = {}, lang_params = {};
    var target_type = Aj.state.$form.field('target_type').value() || 'channels';
    var joinTargets = function(list, or, repeat) {
      var lk = or ? 'WEB_AD_TARGET_OR' : 'WEB_AD_TARGET_AND';
      if (repeat && list.length > 2) {
        var last_item = list.pop();
        return l(lk, {item1: joinTargets(list, or, repeat), item2: last_item});
      }
      if (list.length > 1) {
        var last_item = list.pop();
        list[list.length - 1] = l(lk, {item1: list[list.length - 1], item2: last_item});
      }
      return list.join(', ');
    };
    for (var i = 0; i < Aj.state.selectList.length; i++) {
      var selectData = Aj.state.selectList[i];
      var field = selectData.field;
      var $field = Aj.state.$form.field(field);
      if (selectData.single_value) {
        var val1 = $field.data('value') || '';
        var val1Full = $field.data('valueFull') || {};
        var value = [];
        var valueFull = {};
        if (val1) {
          value.push(val1);
          valueFull[val1] = val1Full;
        }
      } else {
        var value = $field.data('value') || [];
        var valueFull = $field.data('valueFull') || {};
      }
      len[field] = value.length;
      if (value.length) {
        var list = [];
        for (var j = 0; j < value.length; j++) {
          var val = value[j], valFull = valueFull[val] || {};
          list.push(valFull.username ? '<a class="value" href="https://t.me/' + valFull.username + '" rel="noopener" target="_blank" dir="auto">' + valFull.name + '</a>' : '<span class="value" dir="auto">' + valFull.name + '</span>');
        }
        var list_or = (field == 'langs' || field == 'topics' || field == 'countries' || field == 'locations' || field == 'user_langs' || field == 'user_topics' && !Aj.state.intersectTopicsCheckbox.prop('checked') || field == 'user_channels' || field == 'audiences' || field == 'search_queries' || field == 'search_countries')
        lang_params[field] = joinTargets(list, list_or);
      } else {
        lang_params[field] = '';
      }
      Ads.hideFieldError($field);
    }
    len.device = Aj.state.$form.field('device').data('value');
    lang_params.device = '<span class="value" dir="auto">' + Aj.state.$form.field('device').html() + '</span>';

    var overview = '';
    if (target_type == 'channels') {
      if ((len.langs || len.topics) && len.channels) {
        if (len.langs) {
          Ads.showFieldError(Aj.state.$form.field('langs'), l('ADS_ERROR_LANG_AND_CHANNEL_NOT_ALLOWED'));
        } else if (len.topics) {
          Ads.showFieldError(Aj.state.$form.field('topics'), l('ADS_ERROR_TOPIC_AND_CHANNEL_NOT_ALLOWED'));
        }
      } else if (!len.langs && len.topics) {
        Ads.showFieldError(Aj.state.$form.field('langs'), l('ADS_ERROR_LANGUAGE_REQUIRED'));
      }
      if (!len.langs && !len.topics && !len.channels ||
          (len.langs || len.topics) && len.channels ||
          !len.langs && len.topics) {
        overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_NOTHING') + '</div>';
      } else {
        if (len.langs > 0) {
          if (len.topics > 0) {
            overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_TOPICS', lang_params) + '</div>';
          } else {
            overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_LANGS', lang_params) + '</div>';
          }
        }
        if (len.channels > 0) {
          overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_CHANNELS', lang_params) + '</div>';
        }
        if (len.exclude_topics > 0) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_TOPICS', lang_params) + '</div>';
        }
        if (len.exclude_channels > 0) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_CHANNELS', lang_params) + '</div>';
        }
      }
    } else if (target_type == 'users') {
      if (!len.locations && !len.countries && !(NewAd.isAudienceTargetOnly(len) &&
         Aj.state.audienceTargetOnlyAvailable)) {
        overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_NOTHING') + '</div>';
      } else {
        var user_targets = [];
        if (len.locations > 0) {
          user_targets.push(l('WEB_AD_TARGET_USER_LOCATIONS', lang_params));
        } else if (len.countries > 0) {
          lang_params.locations = lang_params.countries;
          user_targets.push(l('WEB_AD_TARGET_USER_LOCATIONS', lang_params));
        }
        if (len.user_langs > 0) {
          user_targets.push(l('WEB_AD_TARGET_USER_LANGS', lang_params));
        }
        if (len.user_topics > 0) {
          user_targets.push(l('WEB_AD_TARGET_USER_TOPICS', lang_params));
        }
        if (len.user_channels > 0) {
          user_targets.push(l('WEB_AD_TARGET_USER_CHANNELS', lang_params));
        }
        if (len.audiences > 0) {
          user_targets.push(l('WEB_AD_TARGET_AUDIENCES', lang_params));
        }
        if (len.device) {
          user_targets.push(l('WEB_AD_TARGET_DEVICE', lang_params));
        }
        user_targets = joinTargets(user_targets, false, true);
        if (Aj.state.onlyPoliticCheckbox.prop('checked')) {
          overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_USERS_ONLY_POLITIC', {target: user_targets}) + '</div>';
        } else if (Aj.state.onlyCryptoCheckbox.prop('checked')) {
          overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_USERS_ONLY_CRYPTO', {target: user_targets}) + '</div>';
        } else {
          overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_USERS', {target: user_targets}) + '</div>';
        }
        if (len.exclude_user_topics > 0) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_USER_EXCLUDE_TOPICS', lang_params) + '</div>';
        }
        if (len.exclude_user_channels > 0) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_USER_EXCLUDE_CHANNELS', lang_params) + '</div>';
        }
        if (len.exclude_audiences > 0) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_AUDIENCES', lang_params) + '</div>';
        }
        if (Aj.state.excludePoliticCheckbox.prop('checked')) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_POLITIC') + '</div>';
        }
        if (Aj.state.excludeCryptoCheckbox.prop('checked')) {
          overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_EXCLUDE_CRYPTO') + '</div>';
        }
      }
    } else if (target_type == 'bots') {
      if (!len.bots) {
        overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_NOTHING') + '</div>';
      } else {
        overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_BOTS', lang_params) + '</div>';
      }
    } else if (target_type == 'search') {
      if (!len.search_queries) {
        overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_NOTHING') + '</div>';
      } else if (len.search_countries > 0) {
        overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_COUNTRY_SEARCH_QUERIES', lang_params) + '</div>';
      } else {
        overview += '<div class="pr-form-info-block plus">' + l('WEB_AD_TARGET_SEARCH_QUERIES', lang_params) + '</div>';
      }
    } else {
      overview += '<div class="pr-form-info-block minus">' + l('WEB_AD_TARGET_NOTHING') + '</div>';
    }
    $('.pr-target-overview', Aj.ajContainer).html(overview);
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [
      $form.field('title').value(),
      $form.field('text').value(),
      $form.field('button').data('value'),
      $form.field('promote_url').value(),
      $form.field('website_name').value(),
      $form.field('website_photo').value(),
      $form.field('media').value(),
      $form.field('ad_info').value(),
      $form.field('cpm').value(),
      $form.field('views_per_user').value(),
      $form.field('budget').value(),
      $form.field('daily_budget').value(),
      $form.field('active').value(),
      $form.field('ad_activate_date').value(),
      $form.field('ad_activate_time').value(),
      $form.field('ad_deactivate_date').value(),
      $form.field('ad_deactivate_time').value(),
      $form.field('use_schedule').prop('checked') ? 1 : 0,
      $form.field('schedule').value(),
      $form.field('schedule_tz_custom').value(),
      $form.field('schedule_tz').value(),
      $form.field('target_type').value(),
      $form.field('placement').value(),
      $form.field('device').data('value')
    ];
    if ($form.field('picture').prop('checked')) {
      values.push('picture');
    }
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var vals = $form.field(selectData.field).data('value') || [];
        values.push(selectData.single_value ? vals : vals.join(';'));
      }
    }
    if ($form.field('intersect_topics').prop('checked')) {
      values.push('intersect_topics');
    }
    if ($form.field('exclude_politic').prop('checked')) {
      values.push('exclude_politic');
    }
    if ($form.field('only_politic').prop('checked')) {
      values.push('only_politic');
    }
    if ($form.field('exclude_crypto').prop('checked')) {
      values.push('exclude_crypto');
    }
    if ($form.field('only_crypto').prop('checked')) {
      values.push('only_crypto');
    }
    return values.join('|');
  },
  getPreviewFormData: function($form) {
    if (Aj.state.$previewPopup) {
      var $previewPopup = Aj.state.$previewPopup;
      var $previewForm = $('.js-ad-form', $previewPopup);
      if (!$previewForm.get(0)) return false;
      var values = [
        $previewForm.field('text').value(),
        $previewForm.field('button').data('value'),
        $previewForm.field('promote_url').value(),
        $previewForm.field('website_name').value(),
        $previewForm.field('website_photo').value(),
        $previewForm.field('media').value()
      ];
      if ($previewForm.field('picture').prop('checked')) {
        values.push('picture');
      }
      return values.join('|');
    }
    return false;
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form       = Aj.state.$form;
    var $button     = $(this);
    var title       = $form.field('title').value();
    var text        = $form.field('text').value();
    var button      = $form.field('button').data('value');
    var promote_url = $form.field('promote_url').value();
    var website_name = $form.field('website_name').value();
    var website_photo = $form.field('website_photo').value();
    var media       = $form.field('media').value();
    var ad_info     = $form.field('ad_info').value();
    var cpm         = Ads.amountFieldValue($form, 'cpm');
    var views_per_user = $form.field('views_per_user').value();
    var budget      = Ads.amountFieldValue($form, 'budget');
    var daily_budget = Ads.amountFieldValue($form, 'daily_budget');
    var active      = $form.field('active').value();
    var activate_date = Ads.dateTimeFieldValue($form, 'ad_activate_date', 'ad_activate_time');
    var deactivate_date = Ads.dateTimeFieldValue($form, 'ad_deactivate_date', 'ad_deactivate_time');
    var use_schedule = $form.field('use_schedule').prop('checked');
    var schedule    = $form.field('schedule').value();
    var schedule_tz_custom = $form.field('schedule_tz_custom').value();
    var schedule_tz = $form.field('schedule_tz').value();
    var target_type = $form.field('target_type').value();
    var placement   = $form.field('placement').value();
    var device      = $form.field('device').data('value');

    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    if (!promote_url.length) {
      $form.field('promote_url').focus();
      return false;
    }
    if (cpm === false) {
      $form.field('cpm').focus();
      return false;
    }
    if (budget === false) {
      $form.field('budget').focus();
      return false;
    }
    if (daily_budget === false) {
      $form.field('daily_budget').focus();
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      title: title,
      text: text,
      button: button,
      promote_url: promote_url,
      website_name: website_name,
      website_photo: website_photo,
      media: media,
      ad_info: ad_info,
      cpm: cpm,
      views_per_user: views_per_user,
      budget: budget,
      daily_budget: daily_budget,
      active: active,
      target_type: target_type,
      placement: placement,
      device: device
    };
    if ($form.field('picture').prop('checked')) {
      params.picture = 1;
    }
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var values = $form.field(selectData.field).data('value') || [];
        params[selectData.field] = selectData.single_value ? values : values.join(';');
      }
    }
    if ($form.field('intersect_topics').prop('checked')) {
      params.intersect_topics = 1;
    }
    if ($form.field('exclude_politic').prop('checked')) {
      params.exclude_politic = 1;
    }
    if ($form.field('only_politic').prop('checked')) {
      params.only_politic = 1;
    }
    if ($form.field('exclude_crypto').prop('checked')) {
      params.exclude_crypto = 1;
    }
    if ($form.field('only_crypto').prop('checked')) {
      params.only_crypto = 1;
    }
    if (activate_date) {
      params.activate_date = activate_date;
    }
    if (deactivate_date) {
      params.deactivate_date = deactivate_date;
    }
    if (use_schedule) {
      params.schedule = schedule;
      params.schedule_tz_custom = schedule_tz_custom;
      params.schedule_tz = schedule_tz;
    }
    NewAd.saveDraftAuto(true);
    $button.prop('disabled', true);
    Aj.apiRequest('createAd', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = NewAd.getFormData($form);
      NewAd.saveDraftAuto(true);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    });
    return false;
  },
  eClearDraft: function(e) {
    e.preventDefault();
    NewAd.clearDraft();
  },
  saveDraftAuto: function(with_delay) {
    if (!Aj.state.draftEnabled) {
      return;
    }
    if (!with_delay) {
      NewAd.saveDraft();
    }
    clearTimeout(Aj.state.saveDraftTo);
    Aj.state.saveDraftTo = setTimeout(NewAd.saveDraftAuto, 3000, false);
  },
  saveDraft: function() {
    var $form       = Aj.state.$form;
    var title       = $form.field('title').value();
    var text        = $form.field('text').value();
    var button      = $form.field('button').data('value');
    var promote_url = $form.field('promote_url').value();
    var website_name = $form.field('website_name').value();
    var website_photo = $form.field('website_photo').value();
    var media       = $form.field('media').value();
    var ad_info     = $form.field('ad_info').value();
    var cpm         = Ads.amountFieldValue($form, 'cpm');
    var views_per_user = $form.field('views_per_user').value();
    var budget      = Ads.amountFieldValue($form, 'budget');
    var daily_budget = Ads.amountFieldValue($form, 'daily_budget');
    var active      = $form.field('active').value();
    var activate_date = Ads.dateTimeFieldValue($form, 'ad_activate_date', 'ad_activate_time');
    var deactivate_date = Ads.dateTimeFieldValue($form, 'ad_deactivate_date', 'ad_deactivate_time');
    var use_schedule = $form.field('use_schedule').prop('checked');
    var schedule    = $form.field('schedule').value();
    var schedule_tz_custom = $form.field('schedule_tz_custom').value();
    var schedule_tz = $form.field('schedule_tz').value();
    var target_type = $form.field('target_type').value();
    var placement   = $form.field('placement').value();
    var device      = $form.field('device').data('value');

    var curFormData = NewAd.getFormData($form);
    if (Aj.state.initFormData == curFormData) {
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      title: title,
      text: text,
      button: button,
      promote_url: promote_url,
      website_name: website_name,
      website_photo: website_photo,
      media: media,
      ad_info: ad_info,
      cpm: cpm,
      views_per_user: views_per_user,
      budget: budget,
      daily_budget: daily_budget,
      active: active,
      target_type: target_type,
      placement: placement,
      device: device
    };
    if ($form.field('picture').prop('checked')) {
      params.picture = 1;
    }
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var values = $form.field(selectData.field).data('value') || [];
        params[selectData.field] = selectData.single_value ? values : values.join(';');
      }
    }
    if ($form.field('intersect_topics').prop('checked')) {
      params.intersect_topics = 1;
    }
    if ($form.field('exclude_politic').prop('checked')) {
      params.exclude_politic = 1;
    }
    if ($form.field('only_politic').prop('checked')) {
      params.only_politic = 1;
    }
    if ($form.field('exclude_crypto').prop('checked')) {
      params.exclude_crypto = 1;
    }
    if ($form.field('only_crypto').prop('checked')) {
      params.only_crypto = 1;
    }
    if (activate_date) {
      params.activate_date = activate_date;
    }
    if (deactivate_date) {
      params.deactivate_date = deactivate_date;
    }
    if (use_schedule) {
      params.schedule = schedule;
      params.schedule_tz_custom = schedule_tz_custom;
      params.schedule_tz = schedule_tz;
    }
    Aj.apiRequest('saveAdDraft', params, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.state.initFormData = curFormData;
      NewAd.saveDraftAuto(true);
      $('.pr-draft-btn-wrap').toggleClass('active', !!result.has_draft);
      // $('.pr-draft-btn-wrap').addClass('saved');
      // setTimeout(function() {
      //   $('.pr-draft-btn-wrap').removeClass('saved');
      // }, 1500);
    });
    return false;
  },
  clearDraft: function(callback) {
    var $form = Aj.state.$form;
    $form.field('title').value('');
    $form.field('text').value('');
    $form.field('button').trigger('selectval', ['']);
    $form.field('promote_url').value('');
    $form.field('website_name').value('');
    $form.field('website_photo').value('');
    $form.field('media').value('');
    $form.field('ad_info').value('');
    $form.field('cpm').value('');
    $form.field('budget').value('');
    $form.field('daily_budget').value('');
    $form.field('active').value('1');
    $form.field('placement').value('channel_post');
    $form.field('ad_activate_date').trigger('selectval', ['']);
    $form.field('ad_activate_time').trigger('selectval', ['']);
    $form.field('ad_deactivate_date').trigger('selectval', ['']);
    $form.field('ad_deactivate_time').trigger('selectval', ['']);
    NewAd.onUseScheduleChange();
    $form.field('use_schedule').prop('checked', false);
    $form.field('schedule').trigger('selectval', ['']);
    $form.field('schedule_tz_custom').value('0');
    $form.field('schedule_tz').value('');
    $form.field('picture').prop('checked', false);
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var values = $form.field(selectData.field).trigger('reset');
      }
    }
    $form.field('exclude_politic').prop('checked', false);
    $form.field('only_politic').prop('checked', false);
    $form.field('exclude_crypto').prop('checked', false);
    $form.field('only_crypto').prop('checked', false);
    $form.field('device').trigger('selectval', ['']);
    Aj.state.titleField.focusAndSelect();
    NewAd.updateAdPreview(Aj.state.$form, false);
    var curFormData = NewAd.getFormData($form);
    var params = {
      owner_id: Aj.state.ownerId
    };
    $('.pr-draft-btn-wrap').removeClass('active');
    NewAd.saveDraftAuto(true);
    Aj.apiRequest('clearAdDraft', params, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.state.initFormData = curFormData;
      NewAd.saveDraftAuto(true);
      callback && callback();
    });
    return false;
  }
};

var Upload = {
  uploadFile: function(target, file, onSuccess, onProgress, onError) {
    var data = new FormData();
    data.append('owner_id', Aj.state.ownerId);
    data.append('target', target);
    data.append('file', file, file.name);
    return $.ajax({
      url: '/file/upload',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
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
      success: function (result) {
        if (result.error) {
          return onError && onError(result.error);
        }
        onSuccess && onSuccess(result);
      },
      error: function (xhr) {
        return onError && onError('Network error');
      }
    });
  }
};

var Account = {
  formFields: [
    'full_name',
    'email',
    'phone_number',
    'country',
    'city',
    'ad_info'
  ],
  addFundsFormFields: [
    'adv_type',
    'products_desc',
    'ads_language',
    'annual_budget',
    'additional_comment',
  ],
  optFields: {
    ad_info: 1
  },
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.account-edit-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.save-info-btn', Account.eSubmitForm);
      cont.on('change.curPage', '.pr-form-control', Account.onFieldChange);
      Ads.initSelect(state.$form, 'channel', {
        items: Aj.state.channelItems || [],
        noMultiSelect: true,
        renderSelectedItem: function(val, item) {
          return '<div class="selected-item' + (item.photo ? ' has-photo' : '') + '" data-val="' + cleanHTML(val.toString()) + '">' + (item.photo ? '<div class="selected-item-photo">' + item.photo + '</div>' : '') + '<span class="close"></span><div class="label">' + item.name + '</div></div>';
        },
        onChange: Account.onChannelChange
      });
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
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
    });
  },
  onFieldChange: function() {
    if (!$(this).hasClass('js-amount-input')) {
      Ads.hideFieldError($(this));
    }
  },
  onChannelChange: function(field, value, valueFull) {
    $accPhoto = $('.pr-account-button-wrap.current .pr-account-button-photo');
    $accTitle = $('.pr-account-button-wrap.current .pr-account-button-title');
    if (!$accPhoto.data('def-val')) {
      $accPhoto.data('def-val', $accPhoto.html());
    }
    if (!$accTitle.data('def-val')) {
      $accTitle.data('def-val', $accTitle.html());
    }
    $accPhoto.html(valueFull ? valueFull.photo : $accPhoto.data('def-val'));
    $accTitle.html(valueFull ? valueFull.name : $accTitle.data('def-val'));
    var $form = Aj.state.$form;
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).prop('disabled', !valueFull);
    }
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [];
    if (!Aj.state.ownerId) {
      var value = $form.field('channel').data('value');
      values.push(value);
    }
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
    var params = {};
    if (Aj.state.forOwnerId) {
      params.for_owner_id = Aj.state.forOwnerId;
    }
    if (Aj.state.ownerId) {
      params.owner_id = Aj.state.ownerId;
    } else {
      params.owner_id = $form.field('channel').data('value');
      if (!params.owner_id) {
        $form.field('channel').trigger('click');
        return false;
      }
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
    Aj.apiRequest('saveAccountInfo', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
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
  initAddFunds: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.add-funds-req-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.send-request-btn', Account.eSendAddFundsRequest);
      cont.on('change.curPage', '.pr-form-control', Account.onFieldChange);
      Ads.initSelect(state.$form, 'ads_language', {
        items: Aj.state.langItems || [],
        noMultiSelect: true,
        l_no_items_found: l('WEB_AD_NO_LANGS_FOUND'),
        onChange: Account.onFieldChange
      });
      state.confirmedCheckbox = state.$form.field('confirmed');
      state.confirmedCheckbox.on('change.curPage', Account.onConfirmedChange);
      Aj.onLoad(function(state) {
        state.initFormData = Account.getAddFundsFormData(state.$form);
        Aj.onBeforeUnload(function() {
          var curFormData = Account.getAddFundsFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
    });
  },
  onConfirmedChange: function() {
    $('.send-request-btn', Aj.ajContainer).prop('disabled', !$(this).prop('checked'));
  },
  getAddFundsFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [];
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      values.push(value);
    }
    for (var i = 0; i < Account.addFundsFormFields.length; i++) {
      var field = Account.addFundsFormFields[i];
      var value = $form.field(field).value();
      values.push(value);
    }
    return values.join('|');
  },
  eSendAddFundsRequest: function(e) {
    e.preventDefault();
    var $form   = Aj.state.$form;
    var $button = $(this);
    var params = {
      owner_id: Aj.state.ownerId
    };
    for (var i = 0; i < Account.formFields.length; i++) {
      var field = Account.formFields[i];
      var value = $form.field(field).value();
      if (!value.length && !Account.optFields[field]) {
        $form.field(field).focus();
        return false;
      }
      params[field] = value;
    }
    params.adv_type = $form.field('adv_type').value();
    params.products_desc = $form.field('products_desc').value();
    if (!params.products_desc.length) {
      $form.field('products_desc').focus();
      return false;
    }
    params.ads_language = $form.field('ads_language').data('value');
    if (!params.ads_language.length) {
      $form.field('ads_language').trigger('click');
      return false;
    }
    params.annual_budget = Ads.amountFieldValue($form, 'annual_budget');
    if (params.annual_budget === false) {
      $form.field('annual_budget').focus();
      return false;
    }
    params.additional_comment = $form.field('additional_comment').value();

    $button.prop('disabled', true);
    Aj.apiRequest('sendAddFundsRequest', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = Account.getAddFundsFormData($form);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
      if (result.ok_msg) {
        showAlert(result.ok_msg);
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
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-save-settings-btn', Account.eApiSubmitForm);
      cont.on('change.curPage', '.pr-form-control', Account.onFieldChange);
    });
  },
  eCopyToken: function(e) {
    e.preventDefault();
    copyToClipboard(Aj.state.token);
    showToast(l('WEB_TOKEN_COPIED', 'Copied.'));
  },
  revokeTokenPopup: function (onConfirm) {
    var $confirm = $('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><p class="pr-layer-text">' + l('WEB_REVOKE_TOKEN_CONFIRM_TEXT') + '</p><div class="popup-buttons"><div class="popup-button popup-cancel-btn">' + l('WEB_CANCEL', 'Cancel') + '</div><div class="popup-button popup-primary-btn">' + l('WEB_REVOKE_TOKEN_CONFIRM_BUTTON') + '</div></div></section></div>');
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
        owner_id: Aj.state.ownerId
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
      owner_id: Aj.state.ownerId,
      ip_list:  $form.field('ip_list').value()
    };
    $button.prop('disabled', true);
    Aj.apiRequest('saveApiSettings', params, function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
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
  },
  initAddStarsPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.amountField = layerState.$form.field('amount');
      Aj.layer.one('popup:open', function() {
        layerState.amountField.focusAndSelect(true);
      });
      layerState.$form.on('submit', Account.eSubmitAddStarsPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', Account.eSubmitAddStarsPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', Account.eSubmitAddStarsPopupForm);
      clearTimeout(Aj.layerState.addStarsTo);
    });
  },
  eSubmitAddStarsPopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var amount   = Ads.amountFieldValue($form, 'amount');

    if ($form.data('disabled')) {
      return false;
    }
    if (amount === false) {
      $form.field('amount').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      amount:   amount
    };
    var onSuccess = function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      if (result.request_id) {
        $form.data('disabled', true);
        Aj.layerState.addStarsTo = setTimeout(function() {
          params.request_id = result.request_id;
          Aj.apiRequest('incrStarsBudget', params, onSuccess);
        }, 400);
      } else {
        closePopup(Aj.layer);
        if (result.redirect_to) {
          Aj.location(result.redirect_to);
        }
      }
    };
    $form.data('disabled', true);
    Aj.apiRequest('incrStarsBudget', params, onSuccess);
    return false;
  }
};

var OwnerAds = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$searchField = $('.pr-search-input');
      state.$adsListTable = $('.js-ads-table');
      state.$searchResults = $('.js-ads-table-body');
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-cell-sort', OwnerAds.eSortList);
      cont.on('click.curPage', '.pr-table-settings', OwnerAds.eSettingsOpen);
      cont.on('click.curPage', '.js-clone-ad-btn', EditAd.eCloneAd);
      cont.on('click.curPage', '.delete-ad-btn', EditAd.deleteAd);
      state.$tableColumnsPopup = $('.js-table-columns-popup');
      state.$tableColumnsForm = $('.js-table-columns-form');
      state.$tableColumnsForm.on('change.curPage', 'input.checkbox', OwnerAds.eColumnChange);
      state.$tableColumnsForm.on('submit.curPage', preventDefault);

      state.$searchField.initSearch({
        $results: state.$searchResults,
        emptyQueryEnabled: true,
        updateOnInit: true,
        resultsNotScrollable: true,
        itemTagName: 'tr',
        enterEnabled: function() {
          return false;
        },
        renderItem: function(item, query) {
          var status_attrs = ' href="' + item.base_url + item.status_url + '" ' + (item.status_attrs || 'data-layer');
          var title_class = 'pr-trg-type-' + item.trg_type;
          if (item.tme_path) {
            var promote_url = 'https://t.me/' + item.tme_path;
            var promote_url_text = 't.me/' + item.tme_path;
            var promote_link = '<a href="' + promote_url + '" target="_blank">' + promote_url_text + '</a>';
          } else if (item.promote_url) {
            var promote_url = item.promote_url;
            var promote_url_text = promote_url.replace(/^https?:\/\//, '').replace(/\/$/, '');
            var promote_link = '<a href="' + promote_url + '" target="_blank">' + promote_url_text + '</a>';
          } else {
            var promote_url = '#';
            var promote_url_text = l('WEB_ADS_NO_TME_LINK');
            var promote_link = '<span class="pr-no-tme-link">' + promote_url_text + '</span>';
          }
          var opens = item.opens !== false ? formatNumber(item.opens) : '–';
          var clicks = item.clicks !== false ? formatNumber(item.clicks) : '–';
          var actions = item.actions !== false ? formatNumber(item.actions) : '–';
          var action = item.action !== false ? '<br>' + item.action : '';
          var ctr = item.ctr !== false ? item.ctr + '%' : '–';
          var cvr = item.cvr !== false ? item.cvr + '%' : '–';
          var cpc = item.cpc !== false ? Ads.wrapAmount(item.cpc) : '–';
          var cpa = item.cpa !== false ? Ads.wrapAmount(item.cpa) : '–';
          var daily_spent  = item.daily_spent !== false ? '<small><br>' + Ads.wrapAmount(item.daily_spent)+'</small>' : '';
          var daily_budget = item.daily_budget !== false ? '<small><br><a href="' + item.base_url + '/edit_daily_budget" data-layer>' + Ads.wrapAmount(item.daily_budget)+'</a></small>' : '';
          return '<td><div class="pr-cell pr-cell-title ' + title_class + '"><a href="' + item.base_url + '"class="pr-link">' + item.title + '</a><small style="display:var(--coldp-url,inline)"><br>' + promote_link + '</small></div></td><td style="display:var(--coldp-views,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + formatNumber(item.views) + '</a></div></td><td style="display:var(--coldp-opens,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + opens + '</a></div></td><td style="display:var(--coldp-clicks,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + clicks + '</a></div></td><td style="display:var(--coldp-actions,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + actions + '</a><small style="display:var(--coldp-action,inline)">' + action + '</small></div></td><td style="display:var(--coldp-ctr,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + ctr + '</a></div></td><td style="display:var(--coldp-cvr,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + cvr + '</a></div></td><td style="display:var(--coldp-cpm,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/edit_cpm" data-layer>' + Ads.wrapAmount(item.cpm) + '</a></div></td><td style="display:var(--coldp-cpc,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + cpc + '</a></div></td><td style="display:var(--coldp-cpa,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + cpa + '</a></div></td><td style="display:var(--coldp-spent,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/stats" class="pr-link">' + Ads.wrapAmount(item.spent) + daily_spent + '</a></div></td><td style="display:var(--coldp-budget,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '/edit_budget" data-layer>' + Ads.wrapAmount(item.budget) + '</a>' + daily_budget + '</div></td><td style="display:var(--coldp-target,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '" class="pr-link">' + item.target + '</a></div></td><td style="display:var(--coldp-status,table-cell)"><div class="pr-cell"><a' + status_attrs + '>' + item.status + '</a></div></td><td style="display:var(--coldp-date,table-cell)"><div class="pr-cell"><a href="' + item.base_url + '" class="pr-link">' + Ads.formatTableDate(item.date) + '</a></div></td><td><div class="pr-actions-cell">' + Aj.state.adsDropdownTpl.replace(/\{ad_id\}/g, item.ad_id).replace(/\{promote_url\}/g, promote_url).replace(/\{promote_url_text\}/g, promote_url_text).replace(/\{ad_text\}/g, item.text) + '</div></td>';
        },
        renderLoading: function() {
          return '<tr><td colspan="100" class="pr-cell-empty"><div class="pr-cell">' + l('WEB_OWNER_ADS_LOADING') + '</div></td></tr>';
        },
        renderNoItems: function(query) {
          if (Aj.state.adsListIsLoading) {
            return '<tr><td colspan="100" class="pr-cell-empty-full"><div class="pr-cell">' + l('WEB_OWNER_ADS_LOADING') + '</div></td></tr>';
          }
          return '<tr><td colspan="100" class="pr-cell-empty-full"><div class="pr-cell">' + l('WEB_OWNER_NO_ADS') + '</div></td></tr>';
        },
        appendToItems: function(query, result_count) {
          if (Aj.state.adsListIsLoading && result_count > 0) {
            return '<tr><td colspan="100" class="pr-cell-empty"><div class="pr-cell">' + l('WEB_OWNER_ADS_LOADING') + '</div></td></tr>';
          }
          return '';
        },
        getData: function() {
          return OwnerAds.getAdsList();
        }
      });
    });
    Aj.onUnload(function(state) {
      Ads.fieldDestroy(state.$searchField);
      state.$searchField.destroySearch();
      state.$tableColumnsForm.off('.curPage');
    });
  },
  eSortList: function(e) {
    var $sortEl = $(this);
    var sortBy  = $sortEl.attr('data-sort-by');
    var sortAsc = $sortEl.hasClass('sort-asc');
    if (sortBy == Aj.state.adsListSortBy) {
      Aj.state.adsListSortAsc = !sortAsc;
    } else {
      Aj.state.adsListSortBy = sortBy;
      Aj.state.adsListSortAsc = false;
    }
    OwnerAds.updateAdsList();
    Aj.state.$searchField.trigger('datachange');
  },
  eSettingsOpen: function() {
    openPopup(Aj.state.$tableColumnsPopup, {
      closeByClickOutside: '.popup-no-close',
    });
  },
  eColumnChange: function() {
    var column = $(this).prop('name');
    var checked = $(this).prop('checked');
    Aj.state.$adsListTable.cssProp('--coldp-' + column, checked ? '' : 'none');
    OwnerAds.submitColumns();
  },
  submitColumns: function() {
    var $form = Aj.state.$tableColumnsForm;
    var active_columns = [];
    for (var i = 0; i < Aj.state.adsListAllColumns.length; i++) {
      var column = Aj.state.adsListAllColumns[i];
      if ($form.field(column).prop('checked')) {
        active_columns.push(column);
      }
    }
    Aj.apiRequest('saveAdsColumns', {
      columns: active_columns.join(';')
    });
    return false;
  },
  updateAdsList: function() {
    if (Aj.state.adsList) {
      var sortBy  = Aj.state.adsListSortBy;
      var sortAsc = Aj.state.adsListSortAsc;
      $('.pr-cell-sort').each(function() {
        var $sortEl = $(this);
        var curSortBy  = $sortEl.attr('data-sort-by');
        $sortEl.toggleClass('sort-active', sortBy == curSortBy);
        $sortEl.toggleClass('sort-asc', sortAsc && sortBy == curSortBy);
      });
      Aj.state.adsList.sort(function(ad1, ad2) {
        var v1 = sortAsc ? ad1 : ad2;
        var v2 = sortAsc ? ad2 : ad1;
        return (v1[sortBy] - v2[sortBy]) || (v1.date - v2.date);
      });
    }
  },
  processAdsList: function(result, opts) {
    opts = opts || {};
    if (result.items) {
      if (!Aj.state.adsList) {
        Aj.state.adsList = [];
      }
      for (var i = 0; i < result.items.length; i++) {
        var item = result.items[i];
        item.base_url = '/account/ad/' + item.ad_id;
        item._values = [
          item.title.toLowerCase(),
          item.tme_path.toLowerCase(),
        ];
        Aj.state.adsList.push(item);
      }
      OwnerAds.updateAdsList();
      Aj.state.$searchField.trigger('contentchange');
    }
    if (result.next_offset_id) {
      opts.offset = result.next_offset_id;
      OwnerAds.loadAdsList(opts);
    } else {
      Aj.state.adsListIsLoading = false;
      Aj.state.$searchField.trigger('dataready');
    }
  },
  loadAdsList: function(opts) {
    opts = opts || {};
    Aj.apiRequest('getAdsList', {
      owner_id: Aj.state.ownerId,
      offset_id: opts.offset
    }, function(result) {
      if (result.error) {
        if (!opts.retry) opts.retry = 1;
        else opts.retry++;
        setTimeout(function(){ OwnerAds.loadAdsList(opts); }, opts.retry * 1000);
      } else {
        if (opts.retry) {
          opts.retry = 0;
        }
        OwnerAds.processAdsList(result, opts);
      }
    });
  },
  getAdsList: function() {
    var _data = Aj.state.adsList;
    if (_data === false) {
      return false;
    } else if (_data) {
      return _data;
    }
    Aj.state.adsList = false;
    Aj.state.adsListIsLoading = true;
    if (Aj.state.initialAdsList) {
      setTimeout(function() {
        OwnerAds.processAdsList(Aj.state.initialAdsList);
      }, 10);
    } else {
      OwnerAds.loadAdsList({offset: 0});
    }
    return false;
  },
  updateAd: function(ad) {
    if (!Aj.state || !Aj.state.adsList) {
      return;
    }
    var adsList = Aj.state.adsList;
    for (var i = 0; i < adsList.length; i++) {
      if (ad.ad_id == adsList[i].ad_id) {
        ad.base_url = '/account/ad/' + ad.ad_id;
        ad._values = [
          ad.title.toLowerCase(),
          ad.tme_path.toLowerCase(),
        ];
        adsList[i] = ad;
        OwnerAds.updateAdsList();
        Aj.state.$searchField.trigger('contentchange');
        return;
      }
    }
  }
};

var ReviewAds = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-search-form', cont);
      state.$form.on('submit', ReviewAds.onSubmit);
      state.$searchField = $('.pr-search-input', cont);
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-search-reset', ReviewAds.eClearSearch);
      cont.on('click.curPage', '.ad-approve-btn', ReviewAds.eApproveAd);
      cont.on('click.curPage', '.ad-decline-btn', ReviewAds.eDeclineAd);
      cont.on('click.curPage', '.js-translate-ad', ReviewAds.eTranslateAd);
      cont.on('click.curPage', '.js-show-original-ad', ReviewAds.eOriginalAd);
      $(window).on('scroll resize', ReviewAds.onScroll);
      ReviewAds.onScroll();
    });
    Aj.onUnload(function(state) {
      state.$form.off('submit', ReviewAds.onSubmit);
      Ads.fieldDestroy(state.$searchField);
      $(window).off('scroll resize', ReviewAds.onScroll);
    });
  },
  onScroll: function() {
    $('.js-load-more').each(function() {
      var $loadMore = $(this);
      var top = $loadMore.offset().top - $(window).scrollTop();
      if (top < $(window).height() * 2) {
        ReviewAds.load($loadMore);
      }
    });
  },
  load: function($loadMore) {
    var offset = $loadMore.attr('data-offset');
    if (!offset) {
      $loadMore.remove();
    }
    if ($loadMore.data('loading')) {
      return;
    }
    var params = Aj.state.filterParams;
    params.offset_id = offset;
    var $loadMoreBtn = $('.pr-load-more', $loadMore);
    $loadMoreBtn.data('old-text', $loadMoreBtn.text()).text($loadMoreBtn.data('loading')).addClass('dots-animated');
    $loadMore.data('loading', true);
    Aj.apiRequest('loadReviewedAds', params, function(result) {
      $loadMore.data('loading', false);
      if (result.ads_html) {
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.ads_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        } else {
          var $loadMoreBtn = $('.pr-load-more', $loadMore);
          $loadMoreBtn.text($loadMoreBtn.data('old-text')).removeClass('dots-animated');
        }
        ReviewAds.onScroll();
      }
    });
  },
  onSubmit: function(e) {
    e.preventDefault();
    var href = this.action;
    if (this.query.value) {
      href += href.indexOf('?') >= 0 ? '&' : '?';
      href += 'query=' + encodeURIComponent(this.query.value);
    }
    Aj.location(href);
  },
  eClearSearch: function(e) {
    Aj.state.$form.submit();
  },
  eApproveAd: function(e) {
    e.preventDefault();
    var $ad      = $(this).parents('.js-review-item');
    var owner_id = $ad.attr('data-owner-id');
    var ad_id    = $ad.attr('data-ad-id');
    var ad_hash  = $ad.attr('data-ad-hash');
    var $buttons = $ad.find('.pr-btn');

    var method, params = {};
    var $similar_wrap = $(this).parents('.js-review-similar-wrap');
    if ($similar_wrap.size()) {
      var ads_list = [];
      $('.js-review-item', $similar_wrap).each(function() {
        var owner_id = $(this).attr('data-owner-id');
        var ad_id    = $(this).attr('data-ad-id');
        ads_list.push(owner_id + '/' + ad_id);
      });
      method = 'approveAds';
      params.ads = ads_list.join(';');
      params.similar_hash = $similar_wrap.attr('data-similar-hash');
    } else {
      method = 'approveAd';
      params.owner_id = owner_id;
      params.ad_id = ad_id;
      params.ad_hash = ad_hash;
    }

    if ($buttons.prop('disabled')) {
      return false;
    }
    $buttons.prop('disabled', true);
    Aj.apiRequest(method, params, function(result) {
      $buttons.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.similar_status_html) {
        $ad.find('.js-review-similar-status').html(result.similar_status_html);
        ReviewAds.updateSimilarAds($ad, '', '');
        $ad.scrollIntoView();
      } else {
        if (result.status_html) {
          $ad.find('.js-review-ad-status').html(result.status_html);
        }
        if (result.buttons_html) {
          $ad.find('.js-review-buttons').html(result.buttons_html);
        }
        $ad.find('.js-review-similar-status').html('');
        if (result.similar_html) {
          ReviewAds.updateSimilarAds($ad, result.similar_html, result.similar_hash);
        }
        $ad.find('.js-reports-badge').hide();
      }
      if (result.ads_html) {
        var $loadMore = $('.js-load-next');
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.ads_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        }
      }
    });
    return false;
  },
  eDeclineAd: function(e) {
    e.preventDefault();
    var $ad       = $(this).parents('.js-review-item');
    var owner_id  = $ad.attr('data-owner-id');
    var ad_id     = $ad.attr('data-ad-id');
    var ad_hash   = $ad.attr('data-ad-hash');
    var $buttons  = $ad.find('.pr-btn');
    var reason_id = $(this).attr('data-reason-id');

    var method, params = {
      reason_id: reason_id
    };
    var $similar_wrap = $(this).parents('.js-review-similar-wrap');
    if ($similar_wrap.size()) {
      var ads_list = [];
      $('.js-review-item', $similar_wrap).each(function() {
        var owner_id = $(this).attr('data-owner-id');
        var ad_id    = $(this).attr('data-ad-id');
        ads_list.push(owner_id + '/' + ad_id);
      });
      method = 'declineAds';
      params.ads = ads_list.join(';');
      params.similar_hash = $similar_wrap.attr('data-similar-hash');
    } else {
      method = 'declineAd';
      params.owner_id = owner_id;
      params.ad_id = ad_id;
      params.ad_hash = ad_hash;
    }

    if ($buttons.prop('disabled')) {
      return false;
    }
    $buttons.prop('disabled', true);
    Aj.apiRequest(method, params, function(result) {
      $buttons.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.similar_status_html) {
        $ad.find('.js-review-similar-status').html(result.similar_status_html);
        ReviewAds.updateSimilarAds($ad, '', '');
        $ad.scrollIntoView();
      } else {
        if (result.status_html) {
          $ad.find('.js-review-ad-status').html(result.status_html);
        }
        if (result.buttons_html) {
          $ad.find('.js-review-buttons').html(result.buttons_html);
        }
        $ad.find('.js-review-similar-status').html('');
        if (result.similar_html) {
          ReviewAds.updateSimilarAds($ad, result.similar_html, result.similar_hash);
        }
        $ad.find('.js-reports-badge').hide();
      }
      if (result.ads_html) {
        var $loadMore = $('.js-load-next');
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.ads_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        }
      }
    });
    return false;
  },
  updateSimilarAds: function($ad, similar_html, similar_hash) {
    var cont = Aj.ajContainer;
    var $similar_wrap = $ad.find('.js-review-similar-wrap');
    $similar_wrap.html(similar_html).attr('data-similar-hash', similar_hash);
    $('.js-review-item', $similar_wrap).each(function() {
      var owner_id = $(this).attr('data-owner-id');
      var ad_id    = $(this).attr('data-ad-id');
      $('.js-review-list > .js-review-item[data-owner-id="' + owner_id + '"][data-ad-id="' + ad_id + '"]', cont).remove();
    });
  },
  eTranslateAd: function(e) {
    e.preventDefault();
    var $ad       = $(this).parents('.js-review-item');
    var owner_id  = $ad.attr('data-owner-id');
    var ad_id     = $ad.attr('data-ad-id');

    if ($ad.attr('translated')) {
      $ad.addClass('ad-translated');
      return false;
    }
    if ($ad.attr('translating')) {
      return false;
    }
    $ad.addClass('ad-translating');
    $ad.attr('translating', true);
    Aj.apiRequest('translateAd', {
      owner_id: owner_id,
      ad_id: ad_id
    }, function(result) {
      $ad.attr('translating', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $ad.removeClass('ad-translating').addClass('ad-translated');
      $ad.attr('translated', true);
      if (result.preview_html) {
        $('.js-translated-ad', $ad).prepend(result.preview_html);
        Ads.updateAdMessagePreviews($ad);
      }
    });
    return false;
  },
  eOriginalAd: function(e) {
    e.preventDefault();
    var $ad = $(this).parents('.js-review-item');
    $ad.removeClass('ad-translated');
    return false;
  }
};

var ReviewTargets = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-search-form', cont);
      state.$form.on('submit', ReviewTargets.onSubmit);
      state.$searchField = $('.pr-search-input', cont);
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-search-reset', ReviewTargets.eClearSearch);
      cont.on('click.curPage', '.ad-approve-btn', ReviewTargets.eApproveAd);
      cont.on('click.curPage', '.ad-decline-btn', ReviewTargets.eDeclineAd);
      $(window).on('scroll resize', ReviewTargets.onScroll);
      ReviewTargets.onScroll();
    });
    Aj.onUnload(function(state) {
      state.$form.off('submit', ReviewTargets.onSubmit);
      Ads.fieldDestroy(state.$searchField);
      $(window).off('scroll resize', ReviewTargets.onScroll);
    });
  },
  onScroll: function() {
    $('.js-load-more').each(function() {
      var $loadMore = $(this);
      var top = $loadMore.offset().top - $(window).scrollTop();
      if (top < $(window).height() * 2) {
        ReviewTargets.load($loadMore);
      }
    });
  },
  load: function($loadMore) {
    var offset = $loadMore.attr('data-offset');
    if (!offset) {
      $loadMore.remove();
    }
    if ($loadMore.data('loading')) {
      return;
    }
    var params = Aj.state.filterParams;
    params.offset_id = offset;
    var $loadMoreBtn = $('.pr-load-more', $loadMore);
    $loadMoreBtn.data('old-text', $loadMoreBtn.text()).text($loadMoreBtn.data('loading')).addClass('dots-animated');
    $loadMore.data('loading', true);
    Aj.apiRequest('loadReviewedTargets', params, function(result) {
      $loadMore.data('loading', false);
      if (result.targets_html) {
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.targets_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        } else {
          var $loadMoreBtn = $('.pr-load-more', $loadMore);
          $loadMoreBtn.text($loadMoreBtn.data('old-text')).removeClass('dots-animated');
        }
        ReviewTargets.onScroll();
      }
    });
  },
  onSubmit: function(e) {
    e.preventDefault();
    var href = this.action;
    if (this.query.value) {
      href += href.indexOf('?') >= 0 ? '&' : '?';
      href += 'query=' + encodeURIComponent(this.query.value);
    }
    Aj.location(href);
  },
  eClearSearch: function(e) {
    Aj.state.$form.submit();
  },
  eApproveAd: function(e) {
    e.preventDefault();
    var $target     = $(this).parents('.js-review-item');
    var target      = $target.attr('data-target');
    var target_hash = $target.attr('data-target-hash');
    var $buttons    = $target.find('.pr-btn');

    if ($buttons.prop('disabled')) {
      return false;
    }
    $buttons.prop('disabled', true);
    Aj.apiRequest('approveTarget', {
      target: target,
      target_hash: target_hash
    }, function(result) {
      $buttons.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.status_html) {
        $target.find('.js-review-target-status').html(result.status_html);
      }
      if (result.buttons_html) {
        $target.find('.js-review-buttons').html(result.buttons_html);
      }
      if (result.targets_html) {
        var $loadMore = $('.js-load-next');
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.targets_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        }
      }
    });
    return false;
  },
  eDeclineAd: function(e) {
    e.preventDefault();
    var $target     = $(this).parents('.js-review-item');
    var target      = $target.attr('data-target');
    var target_hash = $target.attr('data-target-hash');
    var $buttons    = $target.find('.pr-btn');
    var reason_id   = $(this).attr('data-reason-id');

    if ($buttons.prop('disabled')) {
      return false;
    }
    $buttons.prop('disabled', true);
    Aj.apiRequest('declineTarget', {
      target: target,
      target_hash: target_hash,
      reason_id: reason_id
    }, function(result) {
      $buttons.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.status_html) {
        $target.find('.js-review-target-status').html(result.status_html);
      }
      if (result.buttons_html) {
        $target.find('.js-review-buttons').html(result.buttons_html);
      }
      if (result.targets_html) {
        var $loadMore = $('.js-load-next');
        var $loadMoreCont = $loadMore.closest('.pr-review-list');
        if ($loadMoreCont.size()) {
          $loadMore.remove();
          $loadMoreCont.append(result.targets_html);
          Ads.updateAdMessagePreviews($loadMoreCont);
        }
      }
    });
    return false;
  }
};

var EditAd = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.js-ad-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-promote-photo', NewAd.eReplacePromotePhoto);
      cont.on('change.curPage', '.js-promote-photo > .file-upload', NewAd.eUploadPromotePhoto);
      cont.on('click.curPage', '.js-ad-media', NewAd.ePlayAdMedia);
      cont.on('click.curPage', '.js-ad-media-remove', NewAd.eRemoveAdMedia);
      cont.on('click.curPage', '.js-add-media-btn', NewAd.eReplaceAdMedia);
      cont.on('change.curPage', '.js-add-media-btn > .file-upload', NewAd.eUploadAdMedia);
      cont.on('click.curPage', '.edit-ad-btn', EditAd.eSubmitForm);
      cont.on('click.curPage', '.js-clone-ad-btn', EditAd.eCloneAd);
      cont.on('click.curPage', '.js-send-to-review-btn', EditAd.eSendToReview);
      cont.on('click.curPage', '.delete-ad-btn', EditAd.deleteAd);
      cont.on('click.curPage', '.pr-form-select', EditAd.eSelectPlaceholder);
      cont.on('click.curPage', '.js-open-daily-budget', NewAd.eOpenDailyBudget);
      cont.on('click.curPage', '.js-remove-daily-budget', NewAd.eRemoveDailyBudget);
      cont.on('click.curPage', '.js-activate-date-link', NewAd.eOpenStartDate);
      cont.on('click.curPage', '.js-deactivate-date-link', NewAd.eOpenEndDate);
      cont.on('click.curPage', '.js-activate-date-remove', NewAd.eRemoveStartDate);
      cont.on('click.curPage', '.js-deactivate-date-remove', NewAd.eRemoveEndDate);
      cont.on('click.curPage', '.js-open-schedule', NewAd.eOpenSchedule);
      $('.js-schedule-overview', state.$form).html(NewAd.scheduleOverview(state.$form));
      NewAd.initSelectList(state);
      state.titleField = state.$form.field('title');
      state.titleField.on('change.curPage', NewAd.onTitleChange);
      state.textField = state.$form.field('text');
      state.textField.on('change.curPage', NewAd.onTextChange);
      state.textField.on('input.curPage', NewAd.onTextInput);
      state.promoteUrlField = state.$form.field('promote_url');
      state.promoteUrlField.on('change.curPage', NewAd.onPromoteUrlChange);
      state.websiteNameField = state.$form.field('website_name');
      state.websiteNameField.on('change.curPage', NewAd.onWebsiteNameChange);
      state.websitePhotoField = state.$form.field('website_photo');
      state.mediaField = state.$form.field('media');
      state.buttonField = state.$form.field('button');
      state.buttonField.on('ddchange.curPage', NewAd.onButtonChange);
      state.adInfoField = state.$form.field('ad_info');
      state.adInfoField.on('change.curPage', NewAd.onAdInfoChange);
      state.pictureCheckbox = state.$form.field('picture');
      state.pictureCheckbox.on('change.curPage', NewAd.onPictureChange);
      state.activeRadio = state.$form.field('active');
      state.activeRadio.fieldEl().on('change.curPage', NewAd.onActiveChange);
      state.useScheduleCheckbox = state.$form.field('use_schedule');
      state.useScheduleCheckbox.fieldEl().on('change.curPage', NewAd.onUseScheduleChange);
      NewAd.updateAdMedia(state.mediaField);
      NewAd.updateAdPreview(state.$form, state.previewData);
      Aj.onLoad(function(state) {
        state.initFormData = EditAd.getFormData(state.$form);
        state.initPreviewFormData = NewAd.getPreviewFormData();
        Aj.onBeforeUnload(function() {
          var curPreviewFormData = NewAd.getPreviewFormData();
          if (Aj.state.initPreviewFormData != curPreviewFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          var curFormData = EditAd.getFormData(state.$form);
          if (Aj.state.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
      state.titleField.off('.curPage');
      state.textField.off('.curPage');
      state.promoteUrlField.off('.curPage');
      state.websiteNameField.off('.curPage');
      state.buttonField.off('.curPage');
      state.adInfoField.off('.curPage');
      state.pictureCheckbox.off('.curPage');
      state.activeRadio.fieldEl().off('.curPage');
      state.useScheduleCheckbox.off('.curPage');
    });
  },
  getFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [
      $form.field('title').value(),
      $form.field('text').value(),
      $form.field('button').data('value'),
      $form.field('promote_url').value(),
      $form.field('website_name').value(),
      $form.field('website_photo').value(),
      $form.field('media').value(),
      $form.field('cpm').value(),
      $form.field('daily_budget').value(),
      $form.field('active').value(),
      $form.field('ad_activate_date').value(),
      $form.field('ad_activate_time').value(),
      $form.field('ad_deactivate_date').value(),
      $form.field('ad_deactivate_time').value(),
      $form.field('use_schedule').prop('checked') ? 1 : 0,
      $form.field('schedule').value(),
      $form.field('schedule_tz_custom').value(),
      $form.field('schedule_tz').value(),
      $form.field('views_per_user').value()
    ];
    if ($form.field('picture').prop('checked')) {
      values.push('picture');
    }
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var vals = $form.field(selectData.field).data('value') || [];
        values.push(selectData.single_value ? vals : vals.join(';'));
      }
    }
    return values.join('|');
  },
  eSelectPlaceholder: function() {
    Ads.showHint($('.pr-form-control-hint', this), 50, 2000);
  },
  initEditTitlePopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.titleField = layerState.$form.field('title');
      layerState.titleField.on('change.curPage', NewAd.onTitleChange);
      Aj.layer.one('popup:open', function() {
        layerState.titleField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditTitlePopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditTitlePopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditTitlePopupForm);
      layerState.titleField.off('.curPage');
    });
  },
  eSubmitEditTitlePopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var title    = $form.field('title').value();
    if ($form.data('disabled')) {
      return false;
    }
    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      title:    title
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAdTitle', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (owner_id == Aj.state.ownerId &&
          result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initEditCPMPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.cpmField = layerState.$form.field('cpm');
      Aj.layer.one('popup:open', function() {
        layerState.cpmField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditCPMPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditCPMPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditCPMPopupForm);
    });
  },
  eSubmitEditCPMPopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var cpm      = Ads.amountFieldValue($form, 'cpm');

    if ($form.data('disabled')) {
      return false;
    }
    if (cpm === false) {
      $form.field('cpm').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      cpm:      cpm
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAdCPM', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (owner_id == Aj.state.ownerId &&
          result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initEditBudgetPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.amountField = layerState.$form.field('amount');
      Aj.layer.one('popup:open', function() {
        layerState.amountField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditBudgetPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditBudgetPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditBudgetPopupForm);
    });
  },
  eSubmitEditBudgetPopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var amount   = Ads.amountFieldValue($form, 'amount');

    if ($form.data('disabled')) {
      return false;
    }
    if (amount === false) {
      $form.field('amount').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      amount:   amount,
      popup:    1
    };
    $form.data('disabled', true);
    Aj.apiRequest('incrAdBudget', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (owner_id == Aj.state.ownerId &&
          result.ad) {
        OwnerAds.updateAd(result.ad);
      }
      if (result.header_owner_budget) {
        $('.js-header_owner_budget').html(result.header_owner_budget);
      }
      if (result.owner_budget) {
        $('.js-owner_budget').html(result.owner_budget);
      }
      if (result.ad_budget_val) {
        $('.js-field-budget-val').value(result.ad_budget_val);
      }
    });
    return false;
  },
  initEditDailyBudgetPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.dailyBudgetField = layerState.$form.field('daily_budget');
      Aj.layer.one('popup:open', function() {
        layerState.dailyBudgetField.focusAndSelect(true);
      });
      layerState.$form.on('submit', EditAd.eSubmitEditDailyBudgetPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditDailyBudgetPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditDailyBudgetPopupForm);
    });
  },
  eSubmitEditDailyBudgetPopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var daily_budget = Ads.amountFieldValue($form, 'daily_budget');

    if ($form.data('disabled')) {
      return false;
    }
    if (daily_budget === false) {
      $form.field('daily_budget').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      daily_budget: daily_budget,
      popup:    1
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAdDailyBudget', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (owner_id == Aj.state.ownerId &&
          result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initEditStatusPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      cont.on('click.curPage', '.js-activate-date-link', NewAd.eOpenStartDate);
      cont.on('click.curPage', '.js-deactivate-date-link', NewAd.eOpenEndDate);
      cont.on('click.curPage', '.js-activate-date-remove', NewAd.eRemoveStartDate);
      cont.on('click.curPage', '.js-deactivate-date-remove', NewAd.eRemoveEndDate);
      cont.on('click.curPage', '.js-open-schedule', EditAd.eOpenEditStatusSchedule);
      $('.js-schedule-overview', layerState.$form).html(NewAd.scheduleOverview(layerState.$form));
      layerState.activeRadio = layerState.$form.field('active');
      layerState.activeRadio.fieldEl().on('change.curPage', NewAd.onActiveChange);
      layerState.useScheduleCheckbox = layerState.$form.field('use_schedule');
      layerState.useScheduleCheckbox.on('change.curPage', EditAd.onUseEditStatusScheduleChange);
      layerState.$form.on('submit', EditAd.eSubmitEditStatusForm);
      cont.on('click.curLayer', '.submit-form-btn', EditAd.eSubmitEditStatusForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', EditAd.eSubmitEditStatusForm);
    });
  },
  eOpenEditStatusSchedule: function(e) {
    e.preventDefault();
    NewAd.openSchedule(Aj.layerState);
  },
  onUseEditStatusScheduleChange: function() {
    var $form = Aj.layerState.$form;
    if ($form.field('use_schedule').prop('checked')) {
      var schedule = $form.field('schedule').value();
      if (schedule == '0;0;0;0;0;0;0') {
        NewAd.openSchedule(Aj.layerState);
      }
      $('.js-schedule-wrap', $form).slideShow();
    } else {
      $('.js-schedule-wrap', $form).slideHide();
    }
  },
  eSubmitEditStatusForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var active   = $form.field('active').value();
    var activate_date = Ads.dateTimeFieldValue($form, 'ad_activate_date', 'ad_activate_time');
    var deactivate_date = Ads.dateTimeFieldValue($form, 'ad_deactivate_date', 'ad_deactivate_time');
    var use_schedule = $form.field('use_schedule').prop('checked');
    var schedule    = $form.field('schedule').value();
    var schedule_tz_custom = $form.field('schedule_tz_custom').value();
    var schedule_tz = $form.field('schedule_tz').value();
    if ($form.data('disabled')) {
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      active:   active
    };
    if (activate_date) {
      params.activate_date = activate_date;
    }
    if (deactivate_date) {
      params.deactivate_date = deactivate_date;
    }
    if (use_schedule) {
      params.schedule = schedule;
      params.schedule_tz_custom = schedule_tz_custom;
      params.schedule_tz = schedule_tz;
    }
    $form.data('disabled', true);
    Aj.apiRequest('editAdStatus', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (owner_id == Aj.state.ownerId &&
          result.ad) {
        OwnerAds.updateAd(result.ad);
      }
    });
    return false;
  },
  initShareStatsPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$urlField = $('.js-share-url', cont);
      layerState.$copyBtn = $('.js-copy-link', cont);
      layerState.$revokeBtn = $('.js-revoke-link', cont);
      layerState.$urlField.on('click', EditAd.eSelectUrl);
      layerState.$copyBtn.on('click', EditAd.eCopyUrl);
      layerState.$revokeBtn.on('click', EditAd.eRevokeUrl);
    });
    Aj.onLayerUnload(function(layerState) {
      layerState.$urlField.off('click', EditAd.eSelectUrl);
      layerState.$copyBtn.off('click', EditAd.eCopyUrl);
      layerState.$revokeBtn.off('click', EditAd.eRevokeUrl);
    });
  },
  eSelectUrl: function() {
    Aj.layerState.$urlField.focusAndSelectAll();
  },
  eCopyUrl: function(copy) {
    Aj.layerState.$urlField.focusAndSelectAll();
    document.execCommand('copy');
    showToast(l('WEB_AD_STATS_LINK_COPIED', 'Copied.'));
  },
  eRevokeUrl: function(e) {
    e.preventDefault();
    var $btn = $(this);
    if ($btn.data('disabled')) {
      return false;
    }
    var params = {
      owner_id: Aj.layerState.ownerId,
      ad_id:    Aj.layerState.adId
    };
    $btn.data('disabled', true);
    Aj.apiRequest('revokeStatsUrl', params, function(result) {
      $btn.data('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.new_url) {
        Aj.layerState.$urlField.value(result.new_url);
      }
      if (result.toast) {
        showToast(result.toast);
      }
    });
    return false;
  },
  initIncrBudget: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('.pr-incr-budget-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', EditAd.eSubmitIncrBudgetForm);
      Aj.state.isDecr = Aj.state.$form.hasClass('decr');
      cont.on('click.curPage', '.js-toggle-sign', EditAd.onToggleAmountSign);
      cont.on('click.curPage', '.submit-form-btn', EditAd.eSubmitIncrBudgetForm);
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', EditAd.eSubmitIncrBudgetForm);
    });
  },
  onToggleAmountSign: function(e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) {
      EditAd.checkIncrBudgetForm(this, !Aj.state.isDecr);
    } else {
      Aj.state.isDecr = !Aj.state.isDecr;
      Aj.state.$form.toggleClass('decr', Aj.state.isDecr);
      var amountField = Aj.state.isDecr ? 'decr_amount' : 'amount';
      Aj.state.$form.field(amountField).focusAndSelectAll();
    }
  },
  eSubmitIncrBudgetForm: function(e) {
    e.preventDefault();
    var $form    = Aj.state.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();
    var amountField = Aj.state.isDecr ? 'decr_amount' : 'amount';
    var amount   = Ads.amountFieldValue($form, amountField);

    if ($form.data('disabled')) {
      return false;
    }
    if (amount === false) {
      $form.field(amountField).focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      amount:   amount
    };
    $form.data('disabled', true);
    Aj.apiRequest(Aj.state.isDecr ? 'decrAdBudget' : 'incrAdBudget', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      Aj.state.$form.reset();
      if (result.header_owner_budget) {
        $('.js-header_owner_budget').html(result.header_owner_budget);
      }
      if (result.owner_budget) {
        $('.js-owner_budget').html(result.owner_budget);
      }
      if (result.ad_budget) {
        $('.js-ad_budget').html(result.ad_budget);
      }
      if (result.history) {
        $('.js-history').html(result.history);
      }
    });
    return false;
  },
  checkIncrBudgetForm: function(link, isDecr) {
    var $form    = Aj.state.$form;
    var owner_id = $form.field('owner_id').value();
    var ad_id    = $form.field('ad_id').value();

    if ($form.data('disabled')) {
      return false;
    }
    var params = {
      owner_id: owner_id,
      ad_id:    ad_id,
      check_only: 1
    };
    $form.data('disabled', true);
    Aj.apiRequest(isDecr ? 'decrAdBudget' : 'incrAdBudget', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $(link).removeClass('disabled').trigger('click');
    });
    return false;
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form       = Aj.state.$form;
    var $button     = $(this);
    var title       = $form.field('title').value();
    var text        = $form.field('text').value();
    var button      = $form.field('button').data('value');
    var promote_url = $form.field('promote_url').value();
    var website_name = $form.field('website_name').value();
    var website_photo = $form.field('website_photo').value();
    var media       = $form.field('media').value();
    var ad_info     = $form.field('ad_info').value();
    var cpm         = Ads.amountFieldValue($form, 'cpm');
    var daily_budget = Ads.amountFieldValue($form, 'daily_budget');
    var active      = $form.field('active').value();
    var activate_date = Ads.dateTimeFieldValue($form, 'ad_activate_date', 'ad_activate_time');
    var deactivate_date = Ads.dateTimeFieldValue($form, 'ad_deactivate_date', 'ad_deactivate_time');
    var use_schedule = $form.field('use_schedule').prop('checked');
    var schedule    = $form.field('schedule').value();
    var schedule_tz_custom = $form.field('schedule_tz_custom').value();
    var schedule_tz = $form.field('schedule_tz').value();
    var views_per_user = $form.field('views_per_user').value();

    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    if (!promote_url.length) {
      $form.field('promote_url').focus();
      return false;
    }
    if (cpm === false) {
      $form.field('cpm').focus();
      return false;
    }
    if (daily_budget === false) {
      $form.field('daily_budget').focus();
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: Aj.state.adId,
      title: title,
      text: text,
      button: button,
      promote_url: promote_url,
      website_name: website_name,
      website_photo: website_photo,
      media: media,
      ad_info: ad_info,
      cpm: cpm,
      daily_budget: daily_budget,
      active: active,
      views_per_user: views_per_user
    };
    if ($form.field('picture').prop('checked')) {
      params.picture = 1;
    }
    if (Aj.state.selectList) {
      for (var i = 0; i < Aj.state.selectList.length; i++) {
        var selectData = Aj.state.selectList[i];
        var values = $form.field(selectData.field).data('value') || [];
        params[selectData.field] = selectData.single_value ? values : values.join(';');
      }
    }
    if (activate_date) {
      params.activate_date = activate_date;
    }
    if (deactivate_date) {
      params.deactivate_date = deactivate_date;
    }
    if (use_schedule) {
      params.schedule = schedule;
      params.schedule_tz_custom = schedule_tz_custom;
      params.schedule_tz = schedule_tz;
    }
    $button.prop('disabled', true);
    Aj.apiRequest('editAd', params, function(result) {
      if (result.error) {
        $button.prop('disabled', false);
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      Aj.state.initFormData = EditAd.getFormData($form);
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    });
    return false;
  },
  eSendToReview: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var $item = $button.parents('li');
    var ad_id = Aj.state.adId;
    if ($item.size()) {
      $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
      ad_id = $(this).parents('[data-ad-id]').attr('data-ad-id');
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: ad_id
    };
    $button.prop('disabled', true);
    Aj.apiRequest('sendTargetToReview', params, function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.toast) {
        showToast(result.toast);
      }
      $button.parents('.pr-decline-block').slideHide('remove');
    });
    return false;
  },
  eCloneAd: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var $item = $button.parents('li');
    var ad_id = Aj.state.adId;
    if ($item.size()) {
      $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
      ad_id = $(this).parents('[data-ad-id]').attr('data-ad-id');
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: ad_id
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        showConfirm(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('createDraftFromAd', params, onSuccess);
        }, result.confirm_btn);
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('createDraftFromAd', params, onSuccess);
    return false;
  },
  deletePopup: function (confirm_text, onConfirm) {
    var $confirm = $('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><h3 class="pr-layer-header">' + l('WEB_DELETE_AD_CONFIRM_HEADER') + '</h3><p class="pr-layer-text"></p><div class="popup-buttons"><div class="popup-button popup-cancel-btn">' + l('WEB_POPUP_CANCEL_BTN') + '</div><div class="popup-button popup-primary-btn">' + l('WEB_DELETE_AD_CONFIRM_BUTTON') + '</div></div></section></div>');
    var confirm = function() {
      onConfirm && onConfirm($confirm);
      closePopup($confirm);
    }
    $('.pr-layer-text', $confirm).html(confirm_text);
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
  deleteAd: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var $item = $button.parents('li');
    var ad_id = Aj.state.adId;
    if ($item.size()) {
      $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
      ad_id = $(this).parents('[data-ad-id]').attr('data-ad-id');
    }
    var params = {
      owner_id: Aj.state.ownerId,
      ad_id: ad_id
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        EditAd.deletePopup(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('deleteAd', params, onSuccess);
        });
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('deleteAd', params, onSuccess);
    return false;
  }
};

var TransferFunds = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$form = $('form.add-funds-form', cont);
      Ads.formInit(state.$form);
      state.$form.on('submit', preventDefault);
      cont.on('click.curPage', '.js-toggle-sign', TransferFunds.onToggleAmountSign);
      cont.on('click.curPage', '.transfer-funds-btn', TransferFunds.eSubmitForm);
      state.submitBtn = $('.transfer-funds-btn', cont);
      state.amountField = state.$form.field('amount');
      state.amountField.on('keyup.curPage change.curPage input.curPage', TransferFunds.onAmountChange);
      state.decrAmountField = state.$form.field('decr_amount');
      state.decrAmountField.on('keyup.curPage change.curPage input.curPage', TransferFunds.onAmountChange);
      state.curAmountField = state.$form.hasClass('decr') ? 'decr_amount' : 'amount';
      Ads.initSelect(state.$form, 'account', {
        items: Aj.state.accountItems || [],
        noMultiSelect: true,
        renderSelectedItem: function(val, item) {
          return '<div class="selected-item' + (item.photo ? ' has-photo' : '') + '" data-val="' + cleanHTML(val.toString()) + '">' + (item.photo ? '<div class="selected-item-photo">' + item.photo + '</div>' : '') + '<span class="close"></span><div class="label">' + item.name + '</div></div>';
        },
        appendToItems: function(query, result_count) {
          if (Aj.state.accountItemsLoading) {
            return '<div class="select-list-item select-list-loading dots-animated">' + l('WEB_SELECT_LOADING', 'Loading') + '</div>';
          }
          return '';
        },
        getData: function(query, items) {
          return TransferFunds.getAccountsData(items);
        },
        onEnter: TransferFunds.onAccountSearch,
        onChange: TransferFunds.onAccountChange
      });
    });
    Aj.onUnload(function(state) {
      Ads.formDestroy(state.$form);
      state.$form.off('submit', preventDefault);
      state.amountField.off('.curPage');
      clearTimeout(Aj.state.transferTo);
    });
  },
  getAccountsData: function(items) {
    if (Aj.state.accountItemsNextOffset === false) {
      return items;
    }
    Aj.state.accountItemsLoading = true;
    var owner_id = Aj.state.ownerId;
    var $fieldEl = Aj.state.$form.field('account');
    var next_offset = Aj.state.accountItemsNextOffset || 0;
    Aj.state.accountItemsNextOffset = false;
    TransferFunds.loadAccountsData({
      owner_id: owner_id,
      offset: next_offset
    }, {items: items}, function() {
      $fieldEl.trigger('contentchange');
    }, function() {
      Aj.state.accountItemsLoading = false;
      $fieldEl.trigger('dataready').trigger('datachange');
    });
    return items;
  },
  loadAccountsData: function(params, opts, onUpdate, onReady) {
    Aj.apiRequest('getAccountsForTransfer', params, function(result) {
      if (result.error) {
        if (result.field) {
          onReady && onReady();
          var $field = Aj.state.$form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        } else {
          if (!opts.retry) opts.retry = 1;
          else opts.retry++;
          setTimeout(function(){ TransferFunds.loadAccountsData(params, opts, onUpdate, onReady); }, opts.retry * 1000);
        }
      } else {
        if (opts.retry) {
          opts.retry = 0;
        }
        if (result.items) {
          var items = result.items;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item._values = [item.name.toLowerCase()];
            opts.items.push(item);
          }
          onUpdate && onUpdate();
        }
        if (result.next_offset) {
          params.offset = result.next_offset;
          TransferFunds.loadAccountsData(params, opts, onUpdate, onReady);
        } else {
          onReady && onReady();
        }
      }
    });
  },
  onToggleAmountSign: function(e) {
    e.preventDefault();
    Aj.state.$form.toggleClass('decr');
    Aj.state.curAmountField = Aj.state.$form.hasClass('decr') ? 'decr_amount' : 'amount';
    TransferFunds.onAmountChange();
    Aj.state.$form.field(Aj.state.curAmountField).focusAndSelectAll();
  },
  onAccountSearch: function(field, value) {
    var $fieldEl = Aj.state.$form.field(field);
    var $formGroup = $fieldEl.fieldEl().parents('.form-group');
    var prev_value = $fieldEl.data('prevval');
    if (prev_value && prev_value == value) {
      return false;
    }
    var owner_id = Aj.state.ownerId;
    $fieldEl.data('prevval', value);
    Ads.hideFieldError($fieldEl);
    if (!value) {
      return false;
    }
    $formGroup.addClass('field-loading');
    Aj.apiRequest('searchAccountForTransfer', {
      owner_id: owner_id,
      query: value
    }, function(result) {
      $formGroup.removeClass('field-loading');
      if (result.error) {
        Ads.showFieldError($fieldEl, result.error);
        return false;
      }
      if (result.account) {
        $fieldEl.trigger('selectval', [result.account, true]);
        $fieldEl.data('prevval', '');
      }
      else if (result.confirm_text) {
        showConfirm(result.confirm_text, function() {
          TransferFunds.linkAccount($fieldEl, owner_id, result.link_owner_id);
        }, result.confirm_btn);
      }
    });
  },
  linkAccount: function($fieldEl, owner_id, link_owner_id) {
    Aj.apiRequest('linkAccount', {
      owner_id: owner_id,
      link_owner_id: link_owner_id
    }, function(result) {
      if (result.error) {
        Ads.showFieldError($fieldEl, result.error);
        return false;
      }
      if (result.ok) {
        showAlert(result.ok);
      }
      if (result.account) {
        $fieldEl.trigger('selectval', [result.account, true]);
        $fieldEl.data('prevval', '');
      }
    });
  },
  onAccountChange: function(field, value, valueFull) {
    if (valueFull.budget) {
      $('.js-sel_account_budget', Aj.state.$form).toggleClass('disabled', !!valueFull.disabled).html(valueFull.budget);
    } else {
      $('.js-sel_account_budget', Aj.state.$form).addClass('disabled').html(Ads.wrapAmount(0));
    }
  },
  onAmountChange: function() {
    var decr = Aj.state.curAmountField == 'decr_amount';
    var amount = Ads.amountFieldValue(Aj.state.$form, Aj.state.curAmountField) || 0;
    if (amount) {
      var button_label = l(decr ? 'WEB_WITHDRAW_AMOUNT_BUTTON' : 'WEB_TRANSFER_AMOUNT_BUTTON', {amount: Ads.wrapAmount(amount, false, false, 6)});
    } else {
      var button_label = l(decr ? 'WEB_WITHDRAW_FUNDS_BUTTON' : 'WEB_TRANSFER_FUNDS_BUTTON');
    }
    Aj.state.submitBtn.prop('disabled', !amount).html(button_label);
  },
  eSubmitForm: function(e) {
    e.preventDefault();
    var $form        = Aj.state.$form;
    var $button      = $(this);
    var decr         = $form.hasClass('decr');
    var account_id   = $form.field('account').data('value');
    var amount_field = decr ? 'decr_amount' : 'amount';
    var amount       = Ads.amountFieldValue($form, amount_field);
    if ($button.prop('disabled')) {
      return false;
    }
    if (!account_id) {
      $form.field('account').trigger('click');
      return false;
    }
    if (amount === false) {
      $form.field(amount_field).focus();
      return false;
    }

    var method = decr ? 'transferWithdrawFunds' : 'transferFunds';
    var params = {
      owner_id: Aj.state.ownerId,
      account_id: account_id,
      amount: amount
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        if (result.budget) {
          $('.js-owner_budget').html(result.budget);
        }
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        showConfirm(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest(method, params, onSuccess);
        }, result.confirm_btn);
      } else if (result.request_id) {
        $button.prop('disabled', true);
        Aj.state.transferTo = setTimeout(function() {
          params.request_id = result.request_id;
          Aj.apiRequest(method, params, onSuccess);
        }, 400);
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest(method, params, onSuccess);
    return false;
  }
};

var Audiences = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$searchField = $('.pr-search-input');
      state.$searchResults = $('.js-audiences-table-body');
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-cell-sort', Audiences.eSortList);
      cont.on('click.curPage', '.js-create-audience-ad-btn', Audiences.createAudienceAd);
      cont.on('click.curPage', '.delete-audience-btn', Audiences.deleteAudience);
      state.$searchResults.on('mouseover mouseout click', '.js-hint-tooltip', Ads.eHintEvent);
      $(document).on('touchstart click', Ads.eHideAllHints);

      state.listInited = false;
      state.needUpdateState = false;
      state.$searchField.initSearch({
        $results: state.$searchResults,
        emptyQueryEnabled: true,
        updateOnInit: true,
        resultsNotScrollable: true,
        itemTagName: 'tr',
        enterEnabled: function() {
          return false;
        },
        renderItem: function(item, query) {
          return '<td><div class="pr-cell pr-cell-title">' + item.title + '</div></td><td><div class="pr-cell">' + Ads.formatTableDate(item.date) + '</div></td><td><div class="pr-cell">' + item.used + '</div></td><td><div class="pr-hinted-cell">' + item.users + (item.processing_hint ? '<span class="pr-cell-hint js-hint-tooltip"><div class="pr-cell-hint-tooltip"><div class="bubble"></div>' + item.processing_hint + '</div></span>' : '') + '</div></td><td><div class="pr-actions-cell">' + (item.need_update ? '' : Aj.state.audienceDropdownTpl.replace(/{audience_id}/g, item.audience_id)) + '</div></td>';
        },
        getData: function() {
          if (!state.listInited) {
            state.listInited = true;
            var items = Aj.state.audiencesList;
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              item.base_url = '/account/audience/' + item.audience_id;
              item._values = [item.title.toLowerCase()];
              if (item.need_update) {
                state.needUpdateState = true;
              }
            }
            Audiences.updateAudiencesState();
          }
          return Aj.state.audiencesList;
        }
      });
    });
    Aj.onUnload(function(state) {
      state.$searchResults.off('mouseover mouseout click', '.js-hint-tooltip', Ads.eHintEvent);
      $(document).off('touchstart click', Ads.eHideAllHints);
      clearTimeout(Aj.state.updateStateTo);
      Ads.fieldDestroy(state.$searchField);
      state.$searchField.destroySearch();
    });
  },
  eSortList: function(e) {
    var $sortEl = $(this);
    var sortBy  = $sortEl.attr('data-sort-by');
    var sortAsc = $sortEl.hasClass('sort-asc');
    if (sortBy == Aj.state.audiencesListSortBy) {
      Aj.state.audiencesListSortAsc = !sortAsc;
    } else {
      Aj.state.audiencesListSortBy = sortBy;
      Aj.state.audiencesListSortAsc = false;
    }
    Audiences.updateAudiencesList();
    Aj.state.$searchField.trigger('datachange');
  },
  updateAudiencesList: function() {
    if (Aj.state.audiencesList) {
      var sortBy  = Aj.state.audiencesListSortBy;
      var sortAsc = Aj.state.audiencesListSortAsc;
      $('.pr-cell-sort').each(function() {
        var $sortEl = $(this);
        var curSortBy  = $sortEl.attr('data-sort-by');
        $sortEl.toggleClass('sort-active', sortBy == curSortBy);
        $sortEl.toggleClass('sort-asc', sortAsc && sortBy == curSortBy);
      });
      Aj.state.audiencesList.sort(function(ad1, ad2) {
        var v1 = sortAsc ? ad1 : ad2;
        var v2 = sortAsc ? ad2 : ad1;
        return (v1[sortBy] - v2[sortBy]) || (v1.date - v2.date);
      });
    }
  },
  updateAudiencesState: function() {
    if (!Aj.state || !Aj.state.audiencesList || !Aj.state.needUpdateState) {
      return;
    }
    Aj.state.needUpdateState = false;
    Aj.state.updateStateTo = setTimeout(function() {
      Aj.apiRequest('updateAudiencesState', {
        owner_id: Aj.state.ownerId
      }, function(result) {
        if (result.error) {
          return showAlert(result.error);
        }
        if (result.audiences) {
          for (var i = 0; i < result.audiences.length; i++) {
            Audiences.updateAudience(result.audiences[i], true);
          }
          Audiences.updateAudiencesList();
          Aj.state.$searchField.trigger('contentchange');
          Audiences.updateAudiencesState();
        }
      });
    }, 400);
  },
  updateAudience: function(audience, no_update) {
    if (!Aj.state || !Aj.state.audiencesList) {
      return;
    }
    var audiencesList = Aj.state.audiencesList;
    for (var i = 0; i < audiencesList.length; i++) {
      if (audience.owner_id == audiencesList[i].owner_id &&
          audience.audience_id == audiencesList[i].audience_id) {
        audience.base_url = '/account/audience/' + audience.audience_id;
        audience._values = [audience.title.toLowerCase()];
        audiencesList[i] = audience;
        if (audience.need_update) {
          Aj.state.needUpdateState = true;
        }
        if (!no_update) {
          Audiences.updateAudiencesList();
          Aj.state.$searchField.trigger('contentchange');
          Audiences.updateAudiencesState();
        }
        return;
      }
    }
  },
  initCreatePopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.titleField = layerState.$form.field('title');
      layerState.titleField.on('change.curPage', NewAd.onTitleChange);
      Aj.layer.one('popup:open', function() {
        layerState.titleField.focusAndSelect(true);
      });
      layerState.$form.on('submit', Audiences.eSubmitCreatePopupForm);
      cont.on('click.curLayer', '.submit-form-btn', Audiences.eSubmitCreatePopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      if (Aj.layerState.uploadRequestXhr) {
        Aj.layerState.uploadRequestXhr.abort();
      }
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', Audiences.eSubmitCreatePopupForm);
      layerState.titleField.off('.curPage');
    });
  },
  eSubmitCreatePopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var title    = $form.field('title').value();
    var $fileEl  = $form.field('file');
    var file     = $fileEl.data('file');
    if ($form.data('disabled')) {
      return false;
    }
    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    if (!file) {
      $form.field('file').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      title:    title
    };
    var $formGroup = $fileEl.parents('.form-group');
    $formGroup.addClass('field-loading');
    $form.addClass('disabled').data('disabled', true);
    Aj.layerState.uploadRequestXhr = Aj.uploadRequest('createAudience', file, params, function(result) {
      Aj.layerState.uploadRequestXhr = null;
      $form.removeClass('disabled').data('disabled', false);
      $formGroup.removeClass('field-loading');
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.audience && Aj.state.audiencesList) {
        Aj.state.audiencesList.push(result.audience);
        Audiences.updateAudience(result.audience);
      }
      if (result.audience_opt && Aj.state.audienceItems) {
        Aj.state.audienceItems.push(result.audience_opt);
        for (var i = 0; i < Aj.state.selectList.length; i++) {
          var selectData = Aj.state.selectList[i];
          if (selectData.items_key == 'audienceItems') {
            var $fieldEl = Aj.state.$form.field(selectData.field);
            $fieldEl.trigger('datachange');
            if (selectData.add_new_audience) {
              $fieldEl.trigger('selectval', [result.audience_opt, true]);
            }
          }
        }
      }
    }, function(loaded, total) {
      var progress = total ? loaded / total : 0;
      $('.js-progress-value', $formGroup).html(Math.round(progress * 100) + '%');
      $formGroup.each(function() {
        this.style.setProperty('--upload-progress', progress);
      });
    });
    return false;
  },
  initEditTitlePopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.titleField = layerState.$form.field('title');
      layerState.titleField.on('change.curPage', NewAd.onTitleChange);
      Aj.layer.one('popup:open', function() {
        layerState.titleField.focusAndSelect(true);
      });
      layerState.$form.on('submit', Audiences.eSubmitEditTitlePopupForm);
      cont.on('click.curLayer', '.submit-form-btn', Audiences.eSubmitEditTitlePopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', Audiences.eSubmitEditTitlePopupForm);
      layerState.titleField.off('.curPage');
    });
  },
  eSubmitEditTitlePopupForm: function(e) {
    e.preventDefault();
    var $form       = Aj.layerState.$form;
    var owner_id    = $form.field('owner_id').value();
    var audience_id = $form.field('audience_id').value();
    var title       = $form.field('title').value();
    if ($form.data('disabled')) {
      return false;
    }
    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    var params = {
      owner_id:    owner_id,
      audience_id: audience_id,
      title:       title
    };
    $form.data('disabled', true);
    Aj.apiRequest('editAudienceTitle', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.audience) {
        Audiences.updateAudience(result.audience);
      }
    });
    return false;
  },
  initUpdateUsersPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.$form.on('submit', Audiences.eSubmitUpdateUsersPopupForm);
      cont.on('click.curLayer', '.submit-form-btn', Audiences.eSubmitUpdateUsersPopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      if (Aj.layerState.uploadRequestXhr) {
        Aj.layerState.uploadRequestXhr.abort();
      }
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', Audiences.eSubmitUpdateUsersPopupForm);
    });
  },
  eSubmitUpdateUsersPopupForm: function(e) {
    e.preventDefault();
    var $form       = Aj.layerState.$form;
    var owner_id    = $form.field('owner_id').value();
    var audience_id = $form.field('audience_id').value();
    var $fileEl     = $form.field('file');
    var file        = $fileEl.data('file');
    if ($form.data('disabled')) {
      return false;
    }
    if (!file) {
      $form.field('file').focus();
      return false;
    }
    var params = {
      owner_id:    owner_id,
      audience_id: audience_id
    };
    var $formGroup = $fileEl.parents('.form-group');
    $formGroup.addClass('field-loading');
    $form.addClass('disabled').data('disabled', true);
    var method = Aj.layerState.updateMethod;
    Aj.layerState.uploadRequestXhr = Aj.uploadRequest(method, file, params, function(result) {
      Aj.layerState.uploadRequestXhr = null;
      $form.removeClass('disabled').data('disabled', false);
      $formGroup.removeClass('field-loading');
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.audience) {
        Audiences.updateAudience(result.audience);
      }
    }, function(loaded, total) {
      var progress = total ? loaded / total : 0;
      $('.js-progress-value', $formGroup).html(Math.round(progress * 100) + '%');
      $formGroup.each(function() {
        this.style.setProperty('--upload-progress', progress);
      });
    });
    return false;
  },
  createAudienceAd: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var $item = $button.parents('li');
    var audience_id = Aj.state.audienceId;
    if ($item.size()) {
      $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
      audience_id = $(this).parents('[data-audience-id]').attr('data-audience-id');
    }
    var params = {
      owner_id: Aj.state.ownerId,
      audience_id: audience_id
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        showConfirm(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('createDraftFromAudience', params, onSuccess);
        }, result.confirm_btn);
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('createDraftFromAudience', params, onSuccess);
    return false;
  },
  deletePopup: function (confirm_text, onConfirm) {
    var $confirm = $('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><h3 class="pr-layer-header">' + l('WEB_DELETE_AUDIENCE_CONFIRM_HEADER') + '</h3><p class="pr-layer-text"></p><div class="popup-buttons"><div class="popup-button popup-cancel-btn">' + l('WEB_POPUP_CANCEL_BTN') + '</div><div class="popup-button popup-primary-btn">' + l('WEB_DELETE_AUDIENCE_CONFIRM_BUTTON') + '</div></div></section></div>');
    var confirm = function() {
      onConfirm && onConfirm($confirm);
      closePopup($confirm);
    }
    $('.pr-layer-text', $confirm).html(confirm_text);
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
  deleteAudience: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var $item = $button.parents('li');
    var audience_id = Aj.state.audienceId;
    if ($item.size()) {
      $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
      audience_id = $(this).parents('[data-audience-id]').attr('data-audience-id');
    }
    var params = {
      owner_id: Aj.state.ownerId,
      audience_id: audience_id
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        Audiences.deletePopup(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('deleteAudience', params, onSuccess);
        });
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('deleteAudience', params, onSuccess);
    return false;
  }
};

var Events = {
  init: function() {
    var cont = Aj.ajContainer;
    Aj.onLoad(function(state) {
      state.$searchField = $('.pr-search-input');
      state.$searchResults = $('.js-events-table-body');
      Ads.fieldInit(state.$searchField);
      cont.on('click.curPage', '.pr-cell-sort', Events.eSortList);
      cont.on('click.curPage', '.js-create-pixel-btn', Events.createPixel);
      cont.on('click.curPage', '.delete-event-btn', Events.deleteEvent);
      state.$searchResults.on('mouseover mouseout click', '.js-hint-tooltip', Ads.eHintEvent);
      $(document).on('touchstart click', Ads.eHideAllHints);

      state.listInited = false;
      state.needUpdateState = false;
      state.$searchField.initSearch({
        $results: state.$searchResults,
        emptyQueryEnabled: true,
        updateOnInit: true,
        resultsNotScrollable: true,
        itemTagName: 'tr',
        enterEnabled: function() {
          return false;
        },
        renderItem: function(item, query) {
          var mtime = item.mtime !== false ? '<small><br>' + Ads.formatTableDate(item.mtime) + '</small>' : '';
          return '<td><div class="pr-cell pr-cell-title">' + item.title + '<small><br>' + item.tag_id + '</small></div></td><td><div class="pr-cell">' + item.type + '</div></td><td><div class="pr-cell">' + item.status + mtime + '</div></td><td><div class="pr-cell">' + item.used + '</div></td><td><div class="pr-actions-cell">' + (item.can_edit ? Aj.state.eventDropdownTpl : Aj.state.eventReadonlyDropdownTpl).replace(/{event_id}/g, item.event_id) + '</div></td>';
        },
        getData: function() {
          if (!state.listInited) {
            state.listInited = true;
            var items = Aj.state.eventsList;
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              item.base_url = '/account/event/' + item.event_id;
              item._values = [item.title.toLowerCase()];
              if (item.need_update) {
                state.needUpdateState = true;
              }
            }
            Events.updateEventsState();
          }
          return Aj.state.eventsList;
        }
      });
    });
    Aj.onUnload(function(state) {
      state.$searchResults.off('mouseover mouseout click', '.js-hint-tooltip', Ads.eHintEvent);
      $(document).off('touchstart click', Ads.eHideAllHints);
      clearTimeout(Aj.state.updateStateTo);
      Ads.fieldDestroy(state.$searchField);
      state.$searchField.destroySearch();
    });
  },
  eSortList: function(e) {
    var $sortEl = $(this);
    var sortBy  = $sortEl.attr('data-sort-by');
    var sortAsc = $sortEl.hasClass('sort-asc');
    if (sortBy == Aj.state.eventsListSortBy) {
      Aj.state.eventsListSortAsc = !sortAsc;
    } else {
      Aj.state.eventsListSortBy = sortBy;
      Aj.state.eventsListSortAsc = false;
    }
    Events.updateEventsList();
    Aj.state.$searchField.trigger('datachange');
  },
  updateEventsList: function() {
    if (Aj.state.eventsList) {
      var sortBy  = Aj.state.eventsListSortBy;
      var sortAsc = Aj.state.eventsListSortAsc;
      $('.pr-cell-sort').each(function() {
        var $sortEl = $(this);
        var curSortBy  = $sortEl.attr('data-sort-by');
        $sortEl.toggleClass('sort-active', sortBy == curSortBy);
        $sortEl.toggleClass('sort-asc', sortAsc && sortBy == curSortBy);
      });
      Aj.state.eventsList.sort(function(ad1, ad2) {
        var v1 = sortAsc ? ad1 : ad2;
        var v2 = sortAsc ? ad2 : ad1;
        return (v1[sortBy] - v2[sortBy]) || (v1.date - v2.date);
      });
    }
  },
  updateEventsState: function() {
    if (!Aj.state || !Aj.state.eventsList || !Aj.state.needUpdateState) {
      return;
    }
    Aj.state.needUpdateState = false;
    Aj.state.updateStateTo = setTimeout(function() {
      Aj.apiRequest('updateEventsState', {
        owner_id: Aj.state.ownerId
      }, function(result) {
        if (result.error) {
          return showAlert(result.error);
        }
        if (result.events) {
          for (var i = 0; i < result.events.length; i++) {
            Events.updateEvent(result.events[i], true);
          }
          Events.updateEventsList();
          Aj.state.$searchField.trigger('contentchange');
          Events.updateEventsState();
        }
      });
    }, 400);
  },
  updateEvent: function(event, no_update) {
    if (!Aj.state || !Aj.state.eventsList) {
      return;
    }
    var eventsList = Aj.state.eventsList;
    for (var i = 0; i < eventsList.length; i++) {
      if (event.owner_id == eventsList[i].owner_id &&
          event.event_id == eventsList[i].event_id) {
        event.base_url = '/account/event/' + event.event_id;
        event._values = [event.title.toLowerCase()];
        eventsList[i] = event;
        if (event.need_update) {
          Aj.state.needUpdateState = true;
        }
        if (!no_update) {
          Events.updateEventsList();
          Aj.state.$searchField.trigger('contentchange');
          Events.updateEventsState();
        }
        return;
      }
    }
  },
  initCreatePopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.titleField = layerState.$form.field('title');
      layerState.titleField.on('change.curPage', NewAd.onTitleChange);
      Aj.layer.one('popup:open', function() {
        layerState.titleField.focusAndSelect(true);
      });
      layerState.$form.on('submit', Events.eSubmitCreatePopupForm);
      cont.on('click.curLayer', '.submit-form-btn', Events.eSubmitCreatePopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', Events.eSubmitCreatePopupForm);
      layerState.titleField.off('.curPage');
    });
  },
  eSubmitCreatePopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var title    = $form.field('title').value();
    var type     = $form.field('type').data('value');
    if ($form.data('disabled')) {
      return false;
    }
    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      title:    title,
      type:     type
    };
    $form.data('disabled', true);
    Aj.apiRequest('createEvent', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.event && Aj.state.eventsList) {
        Aj.state.eventsList.push(result.event);
        Events.updateEvent(result.event);
      }
      if (result.event_opt && Aj.state.convEventItems) {
        Aj.state.convEventItems.push(result.event_opt);
        for (var i = 0; i < Aj.state.selectList.length; i++) {
          var selectData = Aj.state.selectList[i];
          if (selectData.items_key == 'convEventItems') {
            var $fieldEl = Aj.state.$form.field(selectData.field);
            $fieldEl.trigger('datachange');
            if (selectData.add_new_event) {
              $fieldEl.trigger('selectval', [result.event_opt, true]);
            }
          }
        }
      }
      if (result.to_layer) {
        Aj.layerLocation(result.to_layer);
      }
    });
    return false;
  },
  initEditTitlePopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.pr-popup-edit-form', cont);
      Ads.formInit(layerState.$form);
      layerState.titleField = layerState.$form.field('title');
      layerState.titleField.on('change.curPage', NewAd.onTitleChange);
      Aj.layer.one('popup:open', function() {
        layerState.titleField.focusAndSelect(true);
      });
      layerState.$form.on('submit', Events.eSubmitEditTitlePopupForm);
      cont.on('click.curLayer', '.submit-form-btn', Events.eSubmitEditTitlePopupForm);
    });
    Aj.onLayerUnload(function(layerState) {
      Ads.formDestroy(layerState.$form);
      layerState.$form.off('submit', Events.eSubmitEditTitlePopupForm);
      layerState.titleField.off('.curPage');
    });
  },
  eSubmitEditTitlePopupForm: function(e) {
    e.preventDefault();
    var $form    = Aj.layerState.$form;
    var owner_id = $form.field('owner_id').value();
    var event_id = $form.field('event_id').value();
    var title    = $form.field('title').value();
    if ($form.data('disabled')) {
      return false;
    }
    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    var params = {
      owner_id: owner_id,
      event_id: event_id,
      title:    title
    };
    $form.data('disabled', true);
    Aj.apiRequest('editEventTitle', params, function(result) {
      $form.data('disabled', false);
      if (result.error) {
        if (result.field) {
          var $field = $form.field(result.field);
          if ($field.size()) {
            Ads.showFieldError($field, result.error, true);
            return false;
          }
        }
        return showAlert(result.error);
      }
      closePopup(Aj.layer);
      if (result.event) {
        Events.updateEvent(result.event);
      }
    });
    return false;
  },
  initSetupPopup: function() {
    var cont = Aj.layer;
    Aj.onLayerLoad(function(layerState) {
      cont.on('click.curLayer', '.js-copy-field-btn', Events.eCopyField);
    });
  },
  eCopyField: function(e) {
    e.preventDefault();
    var field = $(this).attr('data-field');
    var value = $(this).parents('.form-group').find('.form-control').val();
    copyToClipboard(value);
    showToast(l('WEB_CODE_SAMPLE_COPIED', 'Copied.'));
  },
  deletePopup: function (confirm_text, onConfirm) {
    var $confirm = $('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><h3 class="pr-layer-header">' + l('WEB_DELETE_EVENT_CONFIRM_HEADER') + '</h3><p class="pr-layer-text"></p><div class="popup-buttons"><div class="popup-button popup-cancel-btn">' + l('WEB_POPUP_CANCEL_BTN') + '</div><div class="popup-button popup-primary-btn">' + l('WEB_DELETE_EVENT_CONFIRM_BUTTON') + '</div></div></section></div>');
    var confirm = function() {
      onConfirm && onConfirm($confirm);
      closePopup($confirm);
    }
    $('.pr-layer-text', $confirm).html(confirm_text);
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
  createPixel: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var params = {
      owner_id: Aj.state.ownerId
    };
    $button.prop('disabled', true);
    Aj.apiRequest('createPixel', params, function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.redirect_to) {
        Aj.location(result.redirect_to);
      } else if (result.to_layer) {
        Aj.layerLocation(result.to_layer);
      }
    });
    return false;
  },
  deleteEvent: function(e) {
    e.preventDefault();
    var $button = $(this);
    if ($button.prop('disabled')) {
      return false;
    }
    var $item = $button.parents('li');
    var event_id = Aj.state.eventId;
    if ($item.size()) {
      $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
      event_id = $(this).parents('[data-event-id]').attr('data-event-id');
    }
    var params = {
      owner_id: Aj.state.ownerId,
      event_id: event_id
    };
    var onSuccess = function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.confirm_text && result.confirm_hash) {
        Events.deletePopup(result.confirm_text, function() {
          params.confirm_hash = result.confirm_hash;
          $button.prop('disabled', true);
          Aj.apiRequest('deleteEvent', params, onSuccess);
        });
      } else if (result.redirect_to) {
        Aj.location(result.redirect_to);
      }
    };
    $button.prop('disabled', true);
    Aj.apiRequest('deleteEvent', params, onSuccess);
    return false;
  }
};



(function(d){var c=function(a){this._options={checkOnLoad:!1,resetOnEnd:!1,loopCheckTime:50,loopMaxNumber:5,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ads-header ads-content",baitStyle:"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"};this._var={version:"3.2.1",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}};void 0!==a&&this.setOption(a);var b=this;a=function(){setTimeout(function(){!0===b._options.checkOnLoad&&(null===b._var.bait&&b._creatBait(),setTimeout(function(){b.check()},1))},1)};void 0!==d.addEventListener?d.addEventListener("load",a,!1):d.attachEvent("onload",a)};c.prototype._options=null;c.prototype._var=null;c.prototype._bait=null;c.prototype.setOption=function(a,b){if(void 0!==b){var e=a;a={};a[e]=b}for(var f in a)this._options[f]=a[f];return this};c.prototype._creatBait=function(){var a=document.createElement("div");a.setAttribute("class",this._options.baitClass);a.setAttribute("style",this._options.baitStyle);this._var.bait=d.document.body.appendChild(a);this._var.bait.offsetParent;this._var.bait.offsetHeight;this._var.bait.offsetLeft;this._var.bait.offsetTop;this._var.bait.offsetWidth;this._var.bait.clientHeight;this._var.bait.clientWidth};c.prototype._destroyBait=function(){d.document.body.removeChild(this._var.bait);this._var.bait=null};c.prototype.check=function(a){void 0===a&&(a=!0);this._var.checking=!0;null===this._var.bait&&this._creatBait();var b=this;this._var.loopNumber=0;!0===a&&(this._var.loop=setInterval(function(){b._checkBait(a)},this._options.loopCheckTime));setTimeout(function(){b._checkBait(a)},1);return!0};c.prototype._checkBait=function(a){var b=!1;null===this._var.bait&&this._creatBait();if(null!==d.document.body.getAttribute("abp")||null===this._var.bait.offsetParent||0==this._var.bait.offsetHeight||0==this._var.bait.offsetLeft||0==this._var.bait.offsetTop||0==this._var.bait.offsetWidth||0==this._var.bait.clientHeight||0==this._var.bait.clientWidth)b=!0;if(void 0!==d.getComputedStyle){var e=d.getComputedStyle(this._var.bait,null);!e||"none"!=e.getPropertyValue("display")&&"hidden"!=e.getPropertyValue("visibility")||(b=!0)}!0===a&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&this._stopLoop());if(!0===b)this._stopLoop(),this._destroyBait(),this.emitEvent(!0),!0===a&&(this._var.checking=!1);else if(null===this._var.loop||!1===a)this._destroyBait(),this.emitEvent(!1),!0===a&&(this._var.checking=!1)};c.prototype._stopLoop=function(a){clearInterval(this._var.loop);this._var.loop=null;this._var.loopNumber=0};c.prototype.emitEvent=function(a){a=this._var.event[!0===a?"detected":"notDetected"];for(var b in a)if(a.hasOwnProperty(b))a[b]();!0===this._options.resetOnEnd&&this.clearEvent();return this};c.prototype.clearEvent=function(){this._var.event.detected=[];this._var.event.notDetected=[]};c.prototype.on=function(a){this._var.event.detected.push(a);return this};d.ABC=c;void 0===d.AB&&(d.AB=new c({checkOnLoad:!0,resetOnEnd:!0}))})(window);
AB.on(function() {
  openPopup('<div class="popup-container hide alert-popup-container"><section class="pr-layer-popup pr-layer-delete-ad popup-no-close"><h3 class="pr-layer-header">' + l('WEB_AB_WARNING_HEADER') + '</h3><p class="pr-layer-text">' + l('WEB_AB_WARNING_TEXT') + '</p><div class="popup-buttons"><div class="popup-button popup-cancel-btn">' + l('WEB_POPUP_CLOSE_BTN', 'Close') + '</div></div></section></div>');
});

(function($) {

  $.fn.initSchedule = function() {
    function getTargetElement(e) {
      if (e.toElement) {
        return e.toElement;
      }
      if (e.type == 'touchstart' ||
          e.type == 'touchmove') {
        var x = e.originalEvent.touches[0].clientX;
        var y = e.originalEvent.touches[0].clientY;
      } else {
        var x = e.clientX;
        var y = e.clientY;
      }
      return document.elementFromPoint(x, y);
    }
    function onMouseDown(e) {
      var state = $(this).data('state');
      state.onMouseMove = function(e) {
        var target = getTargetElement(e);
        if (target.tagName == 'TD') {
          var cell = $(target).data('cell');
          state.hoverValue = rectValue(state.startCell, cell);
          updateTableHover(state, state.hoverValue);
        }
      };
      state.onMouseUp = function() {
        var intersectValue = intersectValues(state.curValue, state.hoverValue);
        if (compareValues(intersectValue, state.hoverValue)) {
          state.curValue = diffValues(state.curValue, state.hoverValue);
        } else {
          state.curValue = mergeValues(state.curValue, state.hoverValue);
        }
        updateTableHover(state, emptyValue());
        updateTableValue(state, state.curValue);
        $(document).off('touchmove mousemove', state.onMouseMove);
        $(document).off('touchend touchcancel mouseup', state.onMouseUp);
      };

      var target = getTargetElement(e);
      if (target.tagName == 'TD') {
        var cell = $(target).data('cell');
        state.startCell = cell;
        state.hoverValue = rectValue(cell, cell);
        updateTableHover(state, state.hoverValue);
        $(document).on('touchmove mousemove', state.onMouseMove);
        $(document).on('touchend touchcancel mouseup', state.onMouseUp);
      }
    }
    function onMouseOver(e) {
      var state = $(this).data('state');
      var target = getTargetElement(e);
      if (target.tagName == 'TD') {
        var cell = $(target).data('cell');
        if (typeof cell.w === 'undefined') {
          var hoverValue = rectValue({w: 0, h: cell.h}, {w: 6, h: cell.h});
        } else if (typeof cell.h === 'undefined') {
          var hoverValue = rectValue({w: cell.w, h: 0}, {w: cell.w, h: 23});
        } else {
          var hoverValue = rectValue(cell, cell);
        }
        updateTableHover(state, hoverValue);
      }
    }
    function onClick(e) {
      var state = $(this).data('state');
      if (e.target.tagName == 'TD') {
        var cell = $(e.target).data('cell');
        if (typeof cell.w === 'undefined') {
          var hoverValue = rectValue({w: 0, h: cell.h}, {w: 6, h: cell.h});
        } else if (typeof cell.h === 'undefined') {
          var hoverValue = rectValue({w: cell.w, h: 0}, {w: cell.w, h: 23});
        } else {
          var hoverValue = null;
        }
        if (hoverValue) {
          var intersectValue = intersectValues(state.curValue, hoverValue);
          if (compareValues(intersectValue, hoverValue)) {
            state.curValue = diffValues(state.curValue, hoverValue);
          } else {
            state.curValue = mergeValues(state.curValue, hoverValue);
          }
          updateTableHover(state, emptyValue());
          updateTableValue(state, state.curValue);
        }
      }
    }
    function onMouseOut(e) {
      var state = $(this).data('state');
      updateTableHover(state, emptyValue());
    }
    function eSetValue(e, value) {
      var state = $(this).data('state');
      setValue(state, value);
    }

    function emptyValue() {
      return [0, 0, 0, 0, 0, 0, 0];
    }
    function rectValue(start, end) {
      var res = emptyValue();
      var sw = Math.min(start.w, end.w);
      var ew = Math.max(start.w, end.w);
      var sh = Math.min(start.h, end.h);
      var eh = Math.max(start.h, end.h);
      for (var w = sw; w <= ew; w++) {
        for (var h = sh; h <= eh; h++) {
          res[w] |= 1 << h;
        }
      }
      return res;
    }
    function mergeValues(val1, val2) {
      var res = emptyValue();
      for (var w = 0; w < 7; w++) {
        res[w] = val1[w] | val2[w];
      }
      return res;
    }
    function intersectValues(val1, val2) {
      var res = emptyValue();
      for (var w = 0; w < 7; w++) {
        res[w] = val1[w] & val2[w];
      }
      return res;
    }
    function diffValues(val1, val2) {
      var res = emptyValue();
      for (var w = 0; w < 7; w++) {
        res[w] = val1[w] & ~val2[w];
      }
      return res;
    }
    function compareValues(val1, val2) {
      for (var w = 0; w < 7; w++) {
        if (val1[w] != val2[w]) {
          return false;
        }
      }
      return true;
    }
    function updateTableHover(state, val) {
      state.$table.find('tr').each(function(w) {
        $(this).find('td').each(function(h) {
          var sel = (val[w] & (1 << h)) > 0;
          $(this).toggleClass('hover', sel);
        });
      });
    }
    function updateTableValue(state, val) {
      state.$table.find('tr').each(function(w) {
        $(this).find('td').each(function(h) {
          var sel = (val[w] & (1 << h)) > 0;
          $(this).toggleClass('selected', sel);
        });
      });
      state.$input.value(val.join(';')).trigger('change');
    }

    function setValue(state, value) {
      value = value.toString();
      var init_val = value.split(';').slice(0, 7);
      for (var w = 0; w < 7; w++) {
        init_val[w] = parseInt(init_val[w]) || 0;
      }
      state.curValue = init_val;
      updateTableValue(state, state.curValue);
    }

    return this.each(function() {
      var $input = $(this);
      var $field = $input.parents('.js-schedule-input');
      var $table = $('.js-schedule-table', $field);
      var $table_weeks = $('.js-schedule-table-weeks', $field);
      var $table_hours = $('.js-schedule-table-hours', $field);
      var state = {
        curValue: emptyValue(),
        $input: $input,
        $field: $field,
        $table: $table,
        $table_weeks: $table_weeks,
        $table_hours: $table_hours
      };
      if ($input.data('inited')) {
        return;
      }
      $input.data('inited', true);
      $input.data('state', state);
      $input.on('selectval.tr-schedule', eSetValue);
      $table.find('tr').each(function(w) {
        $(this).find('td').each(function(h) {
          $(this).data('cell', {w: w, h: h});
        });
      });
      $table_weeks.find('td').each(function(w) {
        $(this).data('cell', {w: w});
      });
      $table_hours.find('td').each(function(h) {
        $(this).data('cell', {h: h});
      });
      if (!this.hasAttribute('readonly')) {
        $table.data('state', state);
        $table.on('mouseover.tr-schedule', onMouseOver);
        $table.on('mouseout.tr-schedule', onMouseOut);
        $table.on('touchstart.tr-schedule', onMouseDown);
        $table.on('mousedown.tr-schedule', onMouseDown);
        $table_weeks.data('state', state);
        $table_weeks.on('mouseover.tr-schedule', onMouseOver);
        $table_weeks.on('mouseout.tr-schedule', onMouseOut);
        $table_weeks.on('click.tr-schedule', onClick);
        $table_hours.data('state', state);
        $table_hours.on('mouseover.tr-schedule', onMouseOver);
        $table_hours.on('mouseout.tr-schedule', onMouseOut);
        $table_hours.on('click.tr-schedule', onClick);
      }
      setValue(state, $input.value());
    });
  };
  $.fn.destroySchedule = function() {
    return this.each(function() {
      var $input = $(this);
      var state = $input.data('state');
      $input.off('.tr-schedule');
      state.$table.off('.tr-schedule');
      state.$table_weeks.off('.tr-schedule');
      state.$table_hours.off('.tr-schedule');
    });
  };

  $.fn.initDatePicker = function() {

    function getStartOfDay(d) {
      if (isNaN(d)) {
        return null;
      }
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
    function getStartOfWeek(d) {
      if (isNaN(d)) {
        return null;
      }
      d = new Date(d.getFullYear(), d.getMonth(), 1);
      var day = d.getDay() || 7;
      d.setDate(2 - day);
      return d;
    }
    function getWeekDiff(d1, d2) {
      var diff = (d2.getTime() - d1.getTime()) / 86400000;
      return Math.round(diff / 7);
    }
    function getStartOfMonth(d) {
      if (isNaN(d)) {
        return null;
      }
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    function getDateValue(d) {
      if (isNaN(d) || d === null) {
        return '';
      }
      var y = d.getFullYear();
      var m = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'][d.getMonth()];
      var d = d.getDate();
      if (d < 10) {
        d = '0' + d;
      }
      return y + '-' + m + '-' + d;
    }
    function getDateText(d) {
      if (isNaN(d) || d === null) {
        return '';
      }
      var y = d.getFullYear();
      var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      var j = d.getDate();
      return j + ' ' + M + ' ' + y;
    }

    function openDatePicker(state, selD) {
      if (state.$dpPopup) {
        closePopup(state.$dpPopup);
      }
      var $dpPopup = $('<div class="popup-container hide alert-popup-container pr-popup-container"><section class="pr-layer-popup pr-layer-date-picker-popup popup-no-close"><h3 class="pr-layer-header js-header"></h3><div class="date-picker-controls"><div class="date-picker-button-up js-month-up"></div><div class="date-picker-button-down js-month-down"></div></div><div class="date-picker-wrap"><div class="date-picker-header"><div class="date-picker-header-content"><div class="date-picker-cell">Mon</div><div class="date-picker-cell">Tue</div><div class="date-picker-cell">Wed</div><div class="date-picker-cell">Thu</div><div class="date-picker-cell">Fri</div><div class="date-picker-cell">Sat</div><div class="date-picker-cell">Sun</div></div></div><div class="date-picker-body"><div class="date-picker-body-content js-body"></div></div></div><div class="popup-buttons"><div class="popup-button popup-button-left clear-form-btn">' + l('WEB_DATEPICKER_CLEAR', 'Clear') + '</div><div class="popup-button cancel-form-btn">' + l('WEB_DATEPICKER_CLOSE', 'Close') + '</div></div></section></div>');
      var $dpBody = $('.js-body', $dpPopup);
      var $dpMonthDown = $('.js-month-down', $dpPopup);
      var $dpMonthUp = $('.js-month-up', $dpPopup);

      function setHeader() {
        var year = currentD.getFullYear();
        var month = currentD.getMonth();
        var header = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month] + ' ' + year;
        $('.js-header', $dpPopup).html(header);
        var prevMonth = true, nextMonth = true, newD;
        newD = getStartOfMonth(currentD);
        newD.setMonth(month - 1);
        if (state.minMonthD && newD < state.minMonthD ||
            state.maxMonthD && newD > state.maxMonthD) {
          prevMonth = false;
        }
        newD = getStartOfMonth(currentD);
        newD.setMonth(month + 1);
        if (state.minMonthD && newD < state.minMonthD ||
            state.maxMonthD && newD > state.maxMonthD) {
          nextMonth = false;
        }
        $dpMonthDown.toggleClass('disabled', !nextMonth);
        $dpMonthUp.toggleClass('disabled', !prevMonth);
      }
      function cellWrap(d) {
        var curDate = d.getDate();
        var curMonth = d.getMonth();
        var curYear = d.getFullYear();
        var cellClass = ' month-' + curYear + '-' + curMonth;
        if (curYear == selYear && curMonth == selMonth && curDate == selDate) {
          cellClass += ' selected';
        }
        if (state.minDayD && d < state.minDayD ||
            state.maxDayD && d > state.maxDayD) {
          cellClass += ' disabled';
        }
        return '<div class="date-picker-cell' + cellClass + '" data-value="' + getDateValue(d) + '">' + curDate + '</div>';
      }
      function updateMonth() {
        var year = currentD.getFullYear();
        var month = currentD.getMonth();
        var body = '';
        var curD = getStartOfWeek(currentD);
        fromWeekD = new Date(curD);
        curWeekD  = new Date(curD);
        for (var i = 0; i < 42; i++) {
          body += cellWrap(curD);
          curD.setDate(curD.getDate() + 1);
        }
        toWeekD = new Date(curD);
        setHeader();
        $dpBody.animOff().html(body).cssProp('--row-offset', '').cssProp('--prepend-offset', '');
        $('.date-picker-cell.month-' + year + '-' + month, $dpBody).addClass('current');
        $dpBody.animOn();
      }
      function appendMonth(diff) {
        diff = diff > 0 ? 1 : -1;
        var newD = getStartOfMonth(currentD);
        newD.setMonth(newD.getMonth() + diff);
        if (state.minMonthD && newD < state.minMonthD ||
            state.maxMonthD && newD > state.maxMonthD) {
          return;
        }
        currentD = newD;
        var year = currentD.getFullYear();
        var month = currentD.getMonth();
        var body = '';
        var curD = getStartOfWeek(currentD);
        var weeks = getWeekDiff(curWeekD, curD);
        if (curD >= fromWeekD) {
          var curToD = new Date(curD);
          curToD.setDate(curToD.getDate() + 42);
          while (toWeekD < curToD) {
            body += cellWrap(toWeekD);
            toWeekD.setDate(toWeekD.getDate() + 1);
          }
          $dpBody.append(body).redraw();
        } else {
          var curFromD = new Date(curD);
          while (curD < fromWeekD) {
            body += cellWrap(curD);
            curD.setDate(curD.getDate() + 1);
          }
          fromWeekD = new Date(curFromD);
          var weeksOffset = getWeekDiff(fromWeekD, curWeekD);
          $dpBody.prepend(body).cssProp('--prepend-offset', -weeksOffset).redraw();
        }
        $dpBody.cssProp('--row-offset', -weeks);
        $('.date-picker-cell.current', $dpBody).removeClass('current');
        $('.date-picker-cell.month-' + year + '-' + month, $dpBody).addClass('current');
        setHeader();
      }
      function onKeyDown(e) {
        if (e.keyCode == Keys.DOWN) {
          e.preventDefault();
          appendMonth(1);
        }
        else if (e.keyCode == Keys.UP) {
          e.preventDefault();
          appendMonth(-1);
        }
        else if (e.keyCode == Keys.TAB) {
          e.preventDefault();
        }
      }
      function onSelect(e) {
        var value = $(this).attr('data-value');
        setValue(state, value);
        closePopup($dpPopup);
        if (state.$time) {
          state.$time.trigger('focusval');
        }
      }
      function datePickerClear() {
        setValue(state, '');
        closePopup($dpPopup);
        if (state.$time) {
          state.$time.trigger('selectval', ['']);
        }
      }
      function onMonthDown(e) {
        appendMonth(1);
      }
      function onMonthUp(e) {
        appendMonth(-1);
      }
      function onTransitionEnd(e) {
        if (this === e.target) {
          updateMonth();
        }
      }

      if (isNaN(selD) || selD === null) {
        selD = getStartOfDay(new Date);
      }
      if (state.minDayD && selD < state.minDayD) {
        selD = getStartOfDay(state.minDayD);
      }
      if (state.maxDayD && selD > state.maxDayD) {
        selD = getStartOfDay(state.maxDayD);
      }
      var selDate  = selD.getDate();
      var selMonth = selD.getMonth();
      var selYear  = selD.getFullYear();

      var fromWeekD, curWeekD, toWeekD;

      var currentD = getStartOfMonth(selD);
      updateMonth();

      $(document).on('keydown', onKeyDown);
      $dpMonthDown.on('click', onMonthDown);
      $dpMonthUp.on('click', onMonthUp);
      $dpBody.on('click', '.date-picker-cell', onSelect);
      $dpBody.on('transitionend', onTransitionEnd);

      var datePickerCancel = function() {
        closePopup($dpPopup);
      };
      var $clearBtn = $('.clear-form-btn', $dpPopup);
      $clearBtn.on('click', datePickerClear);
      var $cancelBtn = $('.cancel-form-btn', $dpPopup);
      $cancelBtn.on('click', datePickerCancel);
      $dpPopup.one('popup:close', function() {
        delete state.$dpPopup;
        $clearBtn.off('click', datePickerClear);
        $cancelBtn.off('click', datePickerCancel);
        $(document).off('keydown', onKeyDown);
        $dpMonthDown.off('click', onMonthDown);
        $dpMonthUp.off('click', onMonthUp);
        $dpBody.off('click', '.date-picker-cell', onSelect);
        $dpBody.off('transitionend', onTransitionEnd);
        $dpPopup.remove();
      });

      openPopup($dpPopup, {
        closeByClickOutside: '.popup-no-close'
      });
      state.$dpPopup = $dpPopup;
      return $dpPopup;
    }

    function onFocusValue(e) {
      var state = $(this).data('state');
      openDatePicker(state, state.curValue);
    }
    function onFocus(e) {
      var state = $(this).data('state');
      openDatePicker(state, state.curValue);
    }
    function onClick(e) {
      var state = $(this).data('state');
      openDatePicker(state, state.curValue);
    }
    function eSetValue(e, value) {
      var state = $(this).data('state');
      setValue(state, value);
    }

    function setValue(state, value) {
      state.curValue = getStartOfDay(new Date(value));
      state.$input.value(getDateValue(state.curValue)).trigger('change');
      state.$value.value(getDateText(state.curValue));
    }

    return this.each(function() {
      var $input = $(this);
      var $field = $input.parents('.js-date-input');
      var $value = $('.js-date-value', $field);
      var minValue = new Date($input.attr('min'));
      var maxValue = new Date($input.attr('max'));
      var state = {
        curValue: null,
        minDayD: getStartOfDay(minValue),
        maxDayD: getStartOfDay(maxValue),
        minMonthD: getStartOfMonth(minValue),
        maxMonthD: getStartOfMonth(maxValue),
        $input: $input,
        $field: $field,
        $value: $value
      };
      var $datetime = $input.parents('.datetime-group');
      if ($datetime.size()) {
        state.$time = $('input[type="time"]', $datetime);
      }
      if ($input.data('inited')) {
        return;
      }
      $input.data('inited', true);
      $input.data('state', state);
      $input.on('selectval.tr-datepicker', eSetValue);
      $input.on('focusval.tr-datepicker', onFocusValue);
      $value.data('state', state);
      $value.on('focus.tr-datepicker', onFocus);
      $value.on('click.tr-datepicker', onClick);
      setValue(state, $input.attr('value'));
    });
  };
  $.fn.destroyDatePicker = function() {
    return this.each(function() {
      var $input = $(this);
      var state = $input.data('state');
      $input.off('.tr-datepicker');
      state.$value.off('.tr-datepicker');
    });
  };

  $.fn.initTimePicker = function() {

    function selectHours(state) {
      state.hoursSelected = true;
      state.minutesSelected = false;
      updateSelection(state);
      state.curHoursStr = '';
    }
    function selectMinutes(state) {
      state.hoursSelected = false;
      state.minutesSelected = true;
      updateSelection(state);
      state.curMinutesStr = '';
    }
    function updateSelection(state) {
      state.$value.each(function(){
        if (state.hoursSelected) {
          this.setSelectionRange(0, 2);
        } else if (state.minutesSelected) {
          this.setSelectionRange(3, 5);
        }
      });
    }
    function updateValue(state, apply) {
      if (state.hasValue) {
        var h = state.curHours || 0;
        var m = state.curMinutes || 0;
        if (h < 10) h = '0' + h;
        if (h > 23) h = state.curHours = 23;
        if (m < 10) m = '0' + m;
        if (m > 59 && apply) m = state.curMinutes = 59;
        var val = h + ':' + m;
      } else {
        var val = '';
      }
      state.$value.val(val);
      if (apply) {
        state.$input.val(val).trigger('change');
      }
    }
    function getDateValue(d) {
      if (isNaN(d) || d === null) {
        return '';
      }
      var y = d.getFullYear();
      var m = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'][d.getMonth()];
      var d = d.getDate();
      if (d < 10) {
        d = '0' + d;
      }
      return y + '-' + m + '-' + d;
    }

    function onFocusValue(e) {
      var state = $(this).data('state');
      state.$value.focus();
    }
    function onFocus(e) {
      var state = $(this).data('state');
      if (!state.hasValue && state.$date && !state.$date.value()) {
        state.$date.trigger('focusval');
      } else {
        if (!state.hasValue) {
          setValue(state, new Date());
        } else {
          updateValue(state);
        }
        selectHours(state);
      }
    }
    function onBlur(e) {
      var state = $(this).data('state');
      updateValue(state, true);
    }
    function onKeyDown(e) {
      var state = $(this).data('state');
      if (e.keyCode == Keys.LEFT) {
        e.preventDefault();
        selectHours(state);
      }
      else if (e.keyCode == Keys.RIGHT) {
        e.preventDefault();
        selectMinutes(state);
      }
      else if (e.keyCode == Keys.TAB) {
        if (state.hoursSelected && !e.shiftKey) {
          selectMinutes(state);
          e.preventDefault();
        } else if (state.minutesSelected && e.shiftKey) {
          selectHours(state);
          e.preventDefault();
        }
      }
      else if (e.keyCode == Keys.BACKSPACE || e.keyCode == 46 || e.keyCode == 12) {
        e.preventDefault();
        if (state.hoursSelected) {
          state.curHoursStr = '';
          state.curHours = 0;
        } else if (state.minutesSelected) {
          state.curMinutesStr = '';
          state.curMinutes = 0;
        }
      }
      else if (e.keyCode >= 48 && e.keyCode < 58 || e.keyCode >= 96 && e.keyCode < 106) {
        e.preventDefault();
        var digit = e.keyCode >= 96 ? e.keyCode - 96 : e.keyCode - 48;
        if (state.hoursSelected) {
          state.curHoursStr += digit;
          state.curHours = parseInt(state.curHoursStr);
          if (state.curHoursStr.length == 2 || state.curHoursStr > 2) {
            selectMinutes(state);
          }
        } else if (state.minutesSelected) {
          state.curMinutesStr += digit;
          state.curMinutesStr = state.curMinutesStr.substr(-2);
          state.curMinutes = parseInt(state.curMinutesStr);
        }
      }
      updateValue(state);
      updateSelection(state);
    }
    function onSelect(e) {
      if (!(this.selectionStart == 0 && this.selectionEnd == 2) &&
          !(this.selectionStart == 3 && this.selectionEnd == 5)) {
        var state = $(this).data('state');
        if (this.selectionStart >= 3) {
          selectMinutes(state);
        } else {
          selectHours(state);
        }
      }
    }

    function eSetValue(e, value) {
      var state = $(this).data('state');
      setValue(state, value);
    }

    function setValue(state, value) {
      var curDate = '';
      if (state.$date) {
        curDate = state.$date.value();
      } else {
        curDate = getDateValue(new Date);
      }
      var curD = (value instanceof Date) ? value : new Date(curDate + 'T' + value);
      if (isNaN(curD)) {
        state.curHours = 0;
        state.curMinutes = 0;
        state.hasValue = false;
      } else {
        state.curHours = curD.getHours();
        state.curMinutes = curD.getMinutes();
        state.hasValue = true;
      }
      updateValue(state, true);
    }

    return this.each(function() {
      var $input = $(this);
      var $field = $input.parents('.js-time-input');
      var $value = $('.js-time-value', $field);
      var $timezone = $('.js-time-timezone', $field);
      var state = {
        hasValue: false,
        curHoursStr: '',
        curHours: 0,
        curMinutesStr: '',
        curMinutes: 0,
        hoursSelected: true,
        minutesSelected: false,
        $input: $input,
        $field: $field,
        $value: $value
      };
      var $datetime = $input.parents('.datetime-group');
      if ($datetime.size()) {
        state.$date = $('input[type="date"]', $datetime);
      }
      if ($input.data('inited')) {
        return;
      }
      $timezone.text(Ads.getTimezoneText());
      $input.data('inited', true);
      $input.data('state', state);
      $value.on('focus.tr-timepicker', onFocus);
      $value.on('click.tr-timepicker', onSelect);
      $value.on('blur.tr-timepicker', onBlur);
      $value.on('select.tr-timepicker', onSelect);
      $value.on('keydown.tr-timepicker', onKeyDown);
      $input.on('selectval.tr-timepicker', eSetValue);
      $input.on('focusval.tr-timepicker', onFocusValue);
      $value.data('state', state);
      setValue(state, $input.attr('value'));
    });
  };
  $.fn.destroyTimePicker = function() {
    return this.each(function() {
      var $input = $(this);
      var state = $input.data('state');
      $input.off('.tr-timepicker');
      state.$value.off('.tr-timepicker');
    });
  };

})(jQuery);

(function($) {
  $.fn.redraw = function() {
    return this.map(function(){ this.offsetTop; return this; });
  };
  $.fn.prepareSlideX = function(callback) {
    return this.map(function(){
      $(this).css({width: this.scrollWidth, overflow: 'hidden'});
      return this;
    }).one('transitionend', function(){
      $(this).css({width: '', overflow: ''});
      callback && callback.call(this);
    }).redraw();
  };
  $.fn.prepareSlideY = function(callback) {
    return this.map(function(){
      $(this).css({height: this.scrollHeight, overflow: 'hidden'});
      return this;
    }).one('transitionend', function(){
      $(this).css({height: '', overflow: ''});
      callback && callback.call(this);
    }).redraw();
  };
  $.fn.animOff = function(this_el) {
    if (this_el) {
      return this.css('transition', 'none').redraw();
    }
    return this.addClass('no-transition').redraw();
  };
  $.fn.animOn = function(this_el) {
    if (this_el) {
      return this.redraw().css('transition', '');
    }
    return this.redraw().removeClass('no-transition');
  };
  $.fn.fadeShow = function(callback) {
    return this.fadeToggle(true, callback);
  };
  $.fn.fadeHide = function(callback) {
    return this.fadeToggle(false, callback);
  };
  $.fn.isFadeHidden = function() {
    return this.hasClass('ohide');
  };
  $.fn.isFixed = function() {
    return this.parents().map(function(){ return $(this).css('position'); }).get().indexOf('fixed') != -1;
  };
  $.fn.focusField = function() {
    var field = this.get(0);
    if (field && field instanceof RadioNodeList) {
      if (field[0]) {
        field[0].focus();
      }
    } else {
      field.focus();
    }
    return this;
  };
  $.fn.focusAndSelect = function(select_all) {
    var field = this.get(0), len = this.value().length;
    if (field) {
      this.focusField();
      if (len > 0) {
        if (this.is('[contenteditable]')) {
          var range = document.createRange(), sel;
          range.selectNodeContents(field);
          if (!select_all) {
            range.collapse();
          }
          sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (field.setSelectionRange) {
          if (select_all) {
            field.setSelectionRange(0, len);
          } else {
            field.setSelectionRange(len, len);
          }
        }
      }
      if (field.scrollIntoViewIfNeeded) {
        field.scrollIntoViewIfNeeded();
      } else if (field.scrollIntoView) {
        field.scrollIntoView();
      }
    }
    return this;
  };
  $.fn.focusAndSelectAll = function() {
    return this.focusAndSelect(true);
  };
  $.fn.fadeToggle = function(state, callback) {
    if (state === true || state === false) {
      state = !state;
    }
    if (callback == 'remove') {
      callback = function(){ $(this).remove(); };
    }
    if (callback) {
      this.one('transitionend', callback);
    }
    return this.toggleClass('ohide', state);
  };
  $.fn.slideShow = function(callback) {
    if (this.hasClass('shide')) {
      return this.prepareSlideY(callback).removeClass('shide');
    }
    return this;
  };
  $.fn.slideHide = function(callback) {
    if (callback == 'remove') {
      callback = function(){ $(this).remove(); };
    }
    if (!this.hasClass('shide')) {
      return this.prepareSlideY(callback).addClass('shide');
    }
    return this;
  };
  $.fn.slideXShow = function(callback) {
    if (this.hasClass('sxhide')) {
      return this.prepareSlideX(callback).removeClass('sxhide');
    }
    return this;
  };
  $.fn.slideXHide = function(callback) {
    if (callback == 'remove') {
      callback = function(){ $(this).remove(); };
    }
    if (!this.hasClass('sxhide')) {
      return this.prepareSlideX(callback).addClass('sxhide');
    }
    return this;
  };
  $.fn.isSlideHidden = function() {
    return this.hasClass('shide');
  };
  $.fn.slideToggle = function(state, callback) {
    if (state === true || state === false) {
      state = !state;
    }
    if (!this.hasClass('shide') !== !state) {
      return this.prepareSlideY(callback).toggleClass('shide', state);
    }
    return this;
  };
  $.fn.highlight = function(delay) {
    var $this = this;
    $this.addClass('highlight');
    setTimeout(function() { $this.removeClass('highlight'); }, delay);
    return $this;
  };
  $.fn.scrollIntoView = function(options) {
    options = options || {};
    return this.first().each(function() {
      var position = options.position || 'auto',
          padding = options.padding || 0,
          duration = options.duration || 0;
      var $item       = $(this),
          $cont       = $item.scrollParent(),
          scrollTop   = $cont.scrollTop(),
          positionTop = 0,
          paddingTop  = 0,
          itemHeight  = $item.outerHeight(),
          isBody      = false;
      if ($cont.get(0) === document) {
        isBody     = true;
        $cont      = $(window);
        positionTop = $item.offset().top;
        paddingTop = $('header').height() + 1;
      } else {
        positionTop = $item.offset().top - $cont.offset().top + scrollTop;
      }
      if (options.slidedEl) {
        if (options.slidedEl === 'this') {
          options.slidedEl = this;
        }
        $(options.slidedEl, this).each(function() {
          itemHeight += (this.scrollHeight - this.clientHeight);
        });
      }
      var itemTop     = positionTop,
          itemBottom  = itemTop + itemHeight,
          contHeight  = $cont.height(),
          contTop     = scrollTop + padding + paddingTop,
          contBottom  = scrollTop + contHeight - padding,
          scrollTo    = null;
      if (position == 'auto') {
        if (itemTop < contTop) {
          scrollTo = itemTop - padding - paddingTop;
        } else if (itemBottom > contBottom) {
          if (itemHeight > contHeight - padding - padding) {
            scrollTo = itemTop - padding - paddingTop;
          } else {
            scrollTo = itemBottom - contHeight + padding;
          }
        }
      } else if (position == 'top' || position == 'center') {
        if (position == 'center' &&
            contHeight > itemHeight) {
          padding = (contHeight - paddingTop - itemHeight) / 2;
        }
        scrollTo = itemTop - padding - paddingTop;
      } else if (position == 'bottom') {
        if (itemHeight > contHeight - padding - padding) {
          scrollTo = itemTop - padding - paddingTop;
        } else {
          scrollTo = itemBottom - contHeight + padding;
        }
      }
      if (scrollTo) {
        if (duration) {
          if (isBody) {
            $cont = $('html');
          }
          $cont.stop().animate({scrollTop: scrollTo}, duration);
        } else {
          $cont.scrollTop(scrollTo);
        }
      }
    });
  };
  $.fn.initSearch = function(options) {
    return this.map(function(){
      var $field = $(this);
      var curValue = $field.value();
      var curSelectedIndex = false;
      var curResult = [];
      var curRenderedIndex = 0;
      var dataWaiting = false;
      var keyUpTimeout = null;
      var blurTimeout = null;
      var isFocused = false;
      options = options || {};
      if (!options.searchEnabled) {
        options.searchEnabled = function(){ return true; };
      }
      if (!options.enterEnabled) {
        options.enterEnabled = function(){ return true; };
      }
      if (!options.prepareQuery) {
        options.prepareQuery = function(str){ return str.toLowerCase(); };
      }
      $field.data('searchOptions', options);

      function onKeyDown(e) {
        switch (e.which) {
          case Keys.ESC:
            $field.blur();
            break;
          case Keys.RETURN:
            select(curSelectedIndex);
            break;
          case Keys.UP:
            var index;
            if (!curSelectedIndex) {
              if (options.$enter && options.enterEnabled()) {
                index = false;
              } else {
                break;
              }
            } else {
              index = curSelectedIndex - 1;
            }
            hover(index, true);
            break;
          case Keys.DOWN:
            var index;
            if (curSelectedIndex === false) {
              index = 0;
            } else {
              index = curSelectedIndex + 1;
            }
            if (index > curResult.length - 1) {
              break;
            }
            hover(index, true);
            break;
          default:
            return;
        }
        e.stopImmediatePropagation();
        e.preventDefault();
      }

      function onKeyUp(e) {
        clearTimeout(blurTimeout);
        var value = $field.value();
        clearTimeout(keyUpTimeout);
        if (curValue !== value) {
          // if (e.type == 'keyup') {
          //   keyUpTimeout = setTimeout(function() {
          //     valueChange();
          //   }, 50);
          // } else {
            options.onInputBeforeChange && options.onInputBeforeChange(value);
            valueChange();
            options.onInput && options.onInput(value);
            open();
          // }
        }
      }

      function onClick(e) {
        open();
      }

      function check(item, queryLower) {
        if (options.checkItem) {
          return options.checkItem(item, queryLower);
        }
        if (!queryLower.length) {
          return 0;
        }
        for (var j = 0; j < item._values.length; j++) {
          var valueLower = item._values[j];
          if (valueLower == queryLower) {
            item._fullmatch = true;
            return valueLower.length;
          }
        }
        for (var j = 0; j < item._values.length; j++) {
          var valueLower = item._values[j];
          var index = valueLower.indexOf(queryLower);
          var found = options.prefixOnly ? index === 0 : index !== -1;
          if (found) {
            return valueLower.length;
          }
        }
        return false;
      }

      function search(data, query) {
        var result = [];
        result.fullMatchIndex = null;
        if (!options.emptyQueryEnabled && !query.length) {
          return result;
        }
        var time = +(new Date);
        var queryLower = options.prepareQuery(query);
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          var valueScore = check(item, queryLower);
          if (valueScore !== false) {
            item._score = valueScore;
            if (item._top) item._score -= 10000000;
            else if (item._bottom) item._score += 10000000;
            item._i = i;
            result.push(item);
          }
        }
        result.sort(function(item1, item2) {
          return (item1._score - item2._score) || (item1._i - item2._i);
        });
        for (i = 0; i < result.length; i++) {
          var item = result[i];
          if (item._fullmatch) {
            delete item._fullmatch;
            if (result.fullMatchIndex === null) {
              result.fullMatchIndex = i;
            }
          }
          delete item._score;
          delete item._i;
        }
        console.log('search: ' + (((new Date) - time) / 1000) + 's');
        return result;
      }

      function render(result, query, from_index) {
        if (from_index && from_index >= result.length) {
          return;
        }
        var time = +(new Date);
        from_index = from_index || 0;
        var html = '';
        var render_limit = options.renderLimit || 50;
        if (result.length > 0) {
          for (var i = from_index, j = 0; i < result.length && j < render_limit; i++, j++) {
            var item = result[i];
            var tagName = options.itemTagName || 'div';
            var className = 'search-item' + (options.itemClass ? ' ' + options.itemClass : '') + (item.className ? ' ' + item.className : '');
            var item_html = '<' + tagName + ' class="' + className + '" data-i="' + i + '">' + options.renderItem(item, query) + '</' + tagName + '>';
            html += item_html;
          }
          curRenderedIndex = i;
        } else {
          html = options.renderNoItems ? options.renderNoItems(query) : '';
          curRenderedIndex = 0;
        }
        if (curRenderedIndex >= result.length) {
          html += options.appendToItems ? options.appendToItems(query, result.length) : '';
        }
        if (!result.length && html == '') {
          options.$results.fadeHide(function() {
            if (options.$results.isFadeHidden()) {
              options.$results.html(html);
            }
          });
        } else {
          if (options.$results.isFadeHidden()) {
            options.$results.fadeShow();
          }
          if (!from_index) {
            options.$results.html(html);
          } else if (html) {
            options.$results.append(html);
          }
        }
        updateScrollState();
        console.log('render: from ' + from_index + ', ' + j + ' lines, ' + (((new Date) - time) / 1000) + 's');
      }

      function renderLoading() {
        curRenderedIndex = 0;
        options.$results.html(options.renderLoading ? options.renderLoading() : '');
        updateScrollState();
      }

      function renderEmpty() {
        curRenderedIndex = 0;
        options.$results.html('');
        updateScrollState();
      }

      function close(no_anim) {
        console.log(+new Date, 'close', no_anim);
        clearTimeout(keyUpTimeout);
        if (!options.$results.hasClass('collapsed')) {
          if (options.$enter && options.enterEnabled()) {
            options.$enter.removeClass('selected');
          }
          if (no_anim) {
            options.$results.animOff();
          }
          options.$results.addClass('collapsed');
          options.onClose && options.onClose(curValue);
          if (no_anim) {
            options.$results.animOn();
          }
        }
      }

      function open() {
        if ($field.data('disabled')) {
          return false;
        }
        clearTimeout(blurTimeout);
        hover(curSelectedIndex, true);
        if (options.$results.hasClass('collapsed')) {
          options.$results.removeClass('collapsed');
          options.onOpen && options.onOpen();
        }
      }

      function onFocus() {
        isFocused = true;
        var value = $field.value();
        if (curValue != value ||
            options.searchEnabled() && options.getData(value) === false) {
          valueChange();
        }
        open();
      }

      function onBlur() {
        if (!isFocused) return;
        console.log(+new Date, 'onblur');
        isFocused = false;
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(close, 100, false);
        options.onBlur && options.onBlur(curValue);
      }

      function valueChange() {
        clearTimeout(blurTimeout);
        clearTimeout(keyUpTimeout);
        var value = $field.value();
        curValue = value;
        console.log('valueChange', options.searchEnabled());
        if (options.searchEnabled()) {
          var data = options.getData(value);
          if (data === false) {
            if (!dataWaiting) {
              dataWaiting = true;
              $field.one('dataready.search', function() {
                dataWaiting = false;
                valueChange();
              });
            }
            if (curValue.length || options.emptyQueryEnabled) {
              renderLoading();
            } else {
              renderEmpty();
            }
            return;
          }
          curResult = search(data, curValue);
          var index = false;
          var $scrollableEl = options.resultsNotScrollable ? $(window) : options.$results;
          $scrollableEl.scrollTop(0);
          if (curValue.length || options.emptyQueryEnabled) {
            render(curResult, curValue);
            if (curResult.length && (!options.enterEnabled())) {
              index = 0;
            }
            if (options.selectFullMatch && curResult.fullMatchIndex !== null) {
              index = curResult.fullMatchIndex;
            }
          } else {
            renderEmpty();
          }
        } else {
          curResult = [];
          var index = false;
          renderEmpty();
        }
        hover(index, true);
      }

      function hover(i, adjust_scroll, middle) {
        $('.search-item.selected', options.$results).removeClass('selected');
        curSelectedIndex = i;
        if (curSelectedIndex !== false) {
          var selectedEl = $('.search-item', options.$results).get(curSelectedIndex);
          if (!selectedEl) {
            curSelectedIndex = false;
          } else {
            $(selectedEl).addClass('selected');
            if (adjust_scroll) {
              adjustScroll($(selectedEl), middle);
            }
            if (Math.abs(curSelectedIndex - curRenderedIndex) < 5) {
              render(curResult, curValue, curRenderedIndex);
            }
          }
        }
        if (options.$enter && options.enterEnabled()) {
          options.$enter.toggleClass('selected', curSelectedIndex === false);
        }
      }

      function select(i) {
        if (i === false) {
          if (options.enterEnabled()) {
            if (!options.noCloseOnEnter) {
              $field.blur();
            }
            options.onEnter && options.onEnter(curValue);
            if (!options.noCloseOnEnter) {
              close(true);
            }
          }
          return;
        }
        if (!options.noCloseOnSelect) {
          $field.blur();
        }
        options.onSelect && options.onSelect(curResult[i]);
        if (!options.noCloseOnSelect) {
          close(true);
        }
      }

      function onItemHover() {
        hover($(this).data('i'), true, true);
      }

      function onItemMouseOver() {
        hover($(this).data('i'));
      }

      function updateScrollState() {
        var results = options.$results.get(0);
        if (results) {
          options.$results.toggleClass('topscroll', results.scrollTop > 0);
          options.$results.toggleClass('bottomscroll', results.scrollTop < results.scrollHeight - results.clientHeight);
        }
      }

      function onResultsScroll(e) {
        updateScrollState();
        if (options.resultsNotScrollable) {
          var bottom = options.$results.offset().top + options.$results.height() - $(window).scrollTop();
          if (bottom < $(window).height() * 2) {
            render(curResult, curValue, curRenderedIndex);
          }
        } else {
          if (this.scrollTop > this.scrollHeight - this.clientHeight - 1000) {
            render(curResult, curValue, curRenderedIndex);
          }
        }
      }

      function onItemClick(e) {
        if (e.metaKey || e.ctrlKey) return true;
        clearTimeout(blurTimeout);
        e.stopImmediatePropagation();
        e.preventDefault();
        select($(this).data('i'));
      }

      function adjustScroll($itemEl, middle) {
        var scrollTop   = options.$results.scrollTop(),
            itemTop     = $itemEl.position().top + scrollTop,
            itemHeight  = $itemEl.outerHeight(),
            itemBottom  = itemTop + itemHeight,
            contHeight  = options.$results.height() || 300;

        if (middle) {
          options.$results.scrollTop(itemTop - (contHeight - itemHeight) / 2);
        } else if (itemTop < scrollTop) {
          options.$results.scrollTop(itemTop);
        } else if (itemBottom > scrollTop + contHeight) {
          options.$results.scrollTop(itemBottom - contHeight);
        }
      }

      if (options.$enter && options.enterEnabled()) {
        options.$enter.on('mouseover.search', onItemMouseOver);
        options.$enter.on('mousedown.search', onItemClick);
        options.$enter.data('i', false);
      }
      options.$results.on('hover.search', '.search-item', onItemHover);
      options.$results.on('mouseover.search', '.search-item', onItemMouseOver);
      options.$results.on('mousedown.search', '.search-item', onItemClick);
      if (options.resultsNotScrollable) {
        $(window).on('scroll.search', onResultsScroll);
      } else {
        options.$results.on('scroll.search', onResultsScroll);
        if (options.$results.isFixed()) {
          options.$results.blockBodyScroll();
        }
      }
      if (options.initTextarea) {
        $field.initTextarea(options.initTextarea);
      }
      $field.on('keydown.search', onKeyDown);
      $field.on('keyup.search',   onKeyUp);
      $field.on('focus.search',   onFocus);
      $field.on('blur.search',    onBlur);
      $field.on('input.search',   onKeyUp);
      $field.on('click.search',   onClick);

      $field.on('disable.search', function(e, disable) {
        $field.data('disabled', disable);
        $field.attr('contenteditable', disable ? 'false' : 'true');
        close(true);
      });
      $field.on('datachange.search', function() {
        valueChange();
      });
      $field.on('contentchange.search', function() {
        if (options.resultsNotScrollable) {
          var scrolltop = $(window).scrollTop();
        } else {
          var scrolltop = options.$results.scrollTop();
        }
        var limit = options.renderLimit;
        options.renderLimit = curRenderedIndex;
        valueChange();
        options.renderLimit = limit;
        if (options.resultsNotScrollable) {
          $(window).scrollTop(scrolltop);
        } else {
          options.$results.scrollTop(scrolltop);
        }
      });

      options.$results.addClass('collapsed');

      if (options.updateOnInit) {
        valueChange();
      }
      return this;
    });
  };
  $.fn.destroySearch = function() {
    return this.map(function() {
      var $field = $(this);
      var options = $field.data('searchOptions');
      if (options) {
        if (options.$enter && options.enterEnabled()) {
          options.$enter.off('.search');
        }
        options.$results.off('.search');
        if (options.resultsNotScrollable) {
          $(window).off('.search');
        }
        if (options.initTextarea) {
          $field.destroyTextarea();
        }
      }
      $field.off('.search');
      return this;
    });
  };
  $.fn.initSelect = function(options) {
    return this.map(function() {
      var $select = $(this);
      var $field = $('.form-control', $select);
      var $selected = $('.selected-items', $select);
      var $results = $('.items-list', $select);
      var selectedVal = [], selectedMap = {};

      $select.data('options', options);

      function getValue(full) {
        if (options.multiSelect) {
          return full ? $.extend({}, selectedMap) : [].concat(selectedVal);
        } else {
          return selectedVal.length > 0 ? (full ? selectedMap[selectedVal[0]] : selectedVal[0]) : (full ? false : '');
        }
      }
      function setValue() {
        var selValue = getValue(), selValueFull = getValue(true);
        $select.data('value', selValue);
        $select.data('valueFull', selValueFull);
        options.onChange && options.onChange(selValue, selValueFull);
        $field.trigger('valuechange', [selValue, selValueFull]);
      }

      function toggleDD(open) {
        $select.toggleClass('open', open);
      }
      function addSelected(item, noupdate) {
        var val = (item.prefix || '') + item.val;
        if (!selectedMap[val]) {
          if (!options.multiSelect) {
            for (var i = 0; i < selectedVal.length; i++) {
              delete selectedMap[selectedVal[i]];
            }
            selectedVal = [];
          }
          else if (item.group) {
            for (var i = selectedVal.length - 1; i >= 0; i--) {
              if (selectedMap[selectedVal[i]].group == item.group) {
                delete selectedMap[selectedVal[i]];
                selectedVal.splice(i, 1);
              }
            }
          }
          selectedVal.push(val);
          selectedMap[val] = item;
          if (!noupdate) {
            setValue();
            updateSelected();
          }
        }
      }
      function delSelected(val) {
        if (selectedMap[val]) {
          delete selectedMap[val];
          for (var i = 0; i < selectedVal.length; i++) {
            if (selectedVal[i] == val) {
              selectedVal.splice(i, 1);
              break;
            }
          }
          setValue();
          updateSelected();
        }
      }
      function clearSelected() {
        for (var i = 0; i < selectedVal.length; i++) {
          var val = selectedVal[i];
          delete selectedMap[val];
        }
        selectedVal = [];
        setValue();
        updateSelected();
      }
      function updateSelected() {
        var html = '';
        for (var i = 0; i < selectedVal.length; i++) {
          var val = selectedVal[i];
          var item = selectedMap[val];
          html += options.renderSelectedItem ? options.renderSelectedItem(val, item) : '<div class="selected-item' + (item.class ? ' ' + item.class : '') + '" data-val="' + cleanHTML(val.toString()) + '"><span class="close"></span><div class="label">' + item.name + '</div></div>';
        }
        $('.selected-item', $selected).remove();
        $selected.prepend(html);
        options.onUpdate && options.onUpdate(getValue(), getValue(true));
        $field.trigger('valueupdate', [getValue(), getValue(true)]);
      }

      var initTextarea = null;
      var isContentEditable = $field.is('[contenteditable]');
      if (isContentEditable) {
        initTextarea = options.noSearch ? {
          singleLine: true,
          checkText: function() { return ''; }
        } : {
          singleLine: true
        };
      }
      $field.initSearch($.extend({
        $results: $results,
        emptyQueryEnabled: true,
        noCloseOnSelect: options.multiSelect,
        updateOnInit: true,
        renderItem: function(item) {
          return '<div class="select-list-item' + (item.class ? ' ' + item.class : '') + '">' + item.name + '</div>';
        },
        prepareQuery: function(str) {
          str = str.toLowerCase();
          if (options.searchByLastWord) {
            str = str.split(/\s+/).pop();
          }
          return str;
        },
        onOpen: function() {
          toggleDD(true);
        },
        onClose: function(curValue) {
          if (options.enterOnClose) {
            options.onEnter && options.onEnter(curValue);
          }
          toggleDD(false);
        }
      }, options, {
        getData: function(value) {
          var data = options.getData(value);
          if (data === false) {
            return false;
          }
          var filtered_data = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].hidden) continue;
            var val = (data[i].prefix || '') + data[i].val;
            if (!selectedMap[val] || !options.multiSelect) {
              filtered_data.push(data[i]);
            }
          }
          return filtered_data;
        },
        onSelect: function(item) {
          var newValue = '';
          if (options.searchByLastWord) {
            var oldValue = $field.value();
            var lastWord = oldValue.split(/\s+/).pop();
            newValue = oldValue;
            if (lastWord.length > 0) {
              newValue = oldValue.substr(0, oldValue.length - lastWord.length);
            }
            newValue = newValue.replace(/^\s+/, '');
          }
          $field.value(newValue);
          addSelected(item);
          if (options.multiSelect) {
            $field.trigger('contentchange').focusAndSelect();
          }
        },
        initTextarea: initTextarea
      }));
      if (options.noSearch) {
        $select.addClass('no-search');
      }
      if (!isContentEditable) {
        $field.on('keydown.select', function(e) {
          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey &&
              (e.which == Keys.BACKSPACE) &&
              this.selectionStart == this.selectionEnd &&
              !this.selectionStart) {
            $(this).trigger('backspaceonleft');
          }
        });
      }
      var defValue = $select.defaultValue();
      var defSelected = defValue.length ? defValue.split(';') : [], dataMap = {};
      if (defSelected.length) {
        var data = options.getData('');
        if (data !== false) {
          for (var i = 0; i < data.length; i++) {
            var val = (data[i].prefix || '') + data[i].val;
            dataMap[val] = data[i];
          }
        }
        for (var i = 0, item; i < defSelected.length; i++) {
          if (item = dataMap[defSelected[i]]) {
            addSelected(item, true);
          }
        }
      }
      $select.data('value', getValue());
      $select.data('valueFull', getValue(true));
      $select.on('selectval.select', function(e, val, clear) {
        addSelected(val);
        if (clear) {
          $field.value('');
        }
        $field.trigger('datachange');
      });
      $select.on('selectvals.select', function(e, vals, clear) {
        for (var i = 0; i < vals.length; i++) {
          addSelected(vals[i]);
        }
        if (clear) {
          $field.value('');
        }
        $field.trigger('datachange');
      });
      $select.on('deselectval.select', function(e, val) {
        delSelected(val);
        $field.trigger('datachange');
      });
      $select.on('disableselect.select', function(e, disable) {
        $select.toggleClass('select-disabled', disable);
        $field.trigger('disable', [disable]);
      });
      $select.on('reset.select', function(e) {
        $('.selected-item', $selected).each(function() {
          var val = $(this).attr('data-val');
          delSelected(val);
        });
        $field.trigger('datachange');
      });
      $select.on('contentchange.select', function(e) {
        if (e.target === this) {
          $field.trigger('contentchange');
        }
      });
      $select.on('datachange.select', function(e) {
        if (e.target === this) {
          $field.trigger('datachange');
        }
      });
      $field.on('backspaceonleft.select', function(e) {
        if (options.focusSelectedBeforeDelete) {
          var $focused = $('.selected-item.focused', $selected);
          if ($focused.size() > 0) {
            var val = $focused.eq(-1).attr('data-val');
            delSelected(val);
            $field.trigger('datachange');
          } else {
            $('.selected-item', $selected).eq(-1).addClass('focused');
          }
        } else {
          var $items = $('.selected-item', $selected);
          if ($items.size() > 0) {
            var val = $items.eq(-1).attr('data-val');
            delSelected(val);
            $field.trigger('datachange');
          }
        }
      });
      $field.on('focus.select', function() {
        $('.selected-item.focused', $selected).removeClass('focused');
      });
      $selected.on('click.select', '.selected-item', function(e) {
        $('.selected-item.focused', $selected).removeClass('focused');
        $(this).addClass('focused');
        var val = $(this).attr('data-val');
        options.onValueFocus && options.onValueFocus(val, selectedMap[val]);
        $field.trigger('valuefocus', [val, selectedMap[val]]);
        e.stopImmediatePropagation();
      });
      $selected.on('click.select', '.selected-item .close', function(e) {
        var val = $(this).parents('.selected-item').attr('data-val');
        delSelected(val);
        if (options.multiSelect) {
          $field.trigger('datachange').focusAndSelectAll();
        }
        e.stopImmediatePropagation();
      });
      $select.on('click.select', '.select-clear', function(e) {
        if ($field.value().length > 0) {
          $field.value('').trigger('input').focus();
          options.onClear && options.onClear();
        } else {
          clearSelected();
          $field.focus();
        }
        e.stopImmediatePropagation();
      });
      $select.on('click.select', function(e) {
        if ($(e.target).is('.select')) {
          $field.focus();
        }
      });
      if ($select.hasClass('select-disabled')) {
        $select.trigger('disableselect', [true]);
      }
      if (selectedVal.length) {
        updateSelected();
        $field.trigger('datachange');
      }
      $select.data('inited', true);
      return this;
    });
  };
  $.fn.destroySelect = function() {
    return this.map(function() {
      var $select = $(this);
      var $field = $('.form-control', $select);
      var $selected = $('.selected-items', $select);
      $field.destroySearch();
      $field.off('.select');
      $selected.off('.select');
      return this;
    });
  }
  $.fn.hasField = function(name) {
    return this.first().map(function() {
      if (this.tagName == 'FORM') {
        if (this[name]) {
          return true;
        }
        return $('.input[data-name]', this).filter(function() {
          return ($(this).attr('data-name') == name);
        }).size() > 0;
      }
      return false;
    }).get(0) || false;
  };
  $.fn.field = function(name) {
    return this.first().map(function() {
      if (this.tagName == 'FORM') {
        if (this[name]) {
          return this[name];
        }
        return $('.input[data-name],.select[data-name]', this).filter(function() {
          return ($(this).attr('data-name') == name);
        }).get(0);
      }
    });
  };
  $.fn.fieldEl = function(name) {
    var result = [];
    this.each(function() {
      $(this).each(function() {
        result.push(this);
      });
    });
    return $(result);
  };
  $.fn.fields = function() {
    return this.first().map(function() {
      if (this.tagName == 'FORM') {
        var fields = {};
        for (var i = 0; i < this.elements.length; i++) {
          var elem = this.elements[i];
          fields[elem.name] = elem.value;
        }
        return fields;
      }
    }).get(0) || {};
  };
  $.fn.reset = function(val) {
    return this.each(function() {
      if (this.tagName == 'FORM') {
        this.reset();
        $('.input[data-name]', this).each(function() {
          $(this).text($(this).attr('data-value')).trigger('input');
        });
        $('.select[data-name]', this).each(function() {
          $(this).trigger('reset');
        });
      }
    });
  };
  $.fn.scrollHeight = function() {
    return this.first().map(function() {
      return this.scrollHeight;
    }).get(0) || '';
  };
  $.fn.defaultValue = function(val) {
    if (typeof val !== 'undefined') {
      return this.each(function() {
        if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT') {
          this.defaultValue = val;
        } else {
          $(this).attr('data-value', val);
        }
      });
    }
    return this.first().map(function() {
      if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT') {
        return this.defaultValue || '';
      } else {
        return $(this).attr('data-value') || '';
      }
    }).get(0) || '';
  };
  $.fn.value = function(val) {
    if (typeof val !== 'undefined') {
      return this.each(function() {
        if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT' || this instanceof RadioNodeList) {
          if (this instanceof RadioNodeList && val === '') {
            for (var i = 0; i < this.length; i++) {
              this[i].checked = false;
            }
          } else {
            this.value = val;
          }
        } else {
          $(this).text(val).trigger('input');
        }
      });
    }
    return this.first().map(function() {
      if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT' || this instanceof RadioNodeList) {
        return this.value || '';
      } else {
        return $(this).text() || '';
      }
    }).get(0) || '';
  };
  $.fn.values = function(val) {
    if (typeof val !== 'undefined') {
      return this.value(val);
    }
    return this.map(function() {
      if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT') {
        return this.value || '';
      } else {
        return $(this).text() || '';
      }
    }).get() || [];
  };
  $.fn.cssProp = function(prop, val) {
    if (typeof val !== 'undefined') {
      return this.each(function() {
        if (this.style && this.style.setProperty) {
          this.style.setProperty(prop, val);
        }
      });
    }
    return this.first().map(function() {
      if (this.style && this.style.getPropertyValue) {
        return this.style.getPropertyValue(prop);
      } else {
        return '';
      }
    }).get(0) || '';
  };

  $.fn.initTextarea = function(options) {
    options = options || {};

    function getRangeText(range) {
      var div = document.createElement('DIV');
      div.appendChild(range.cloneContents());
      return getText(div, true);
    }
    function isBlockEl(el) {
      var blockTags = {ADDRESS: 1, ARTICLE: 1, ASIDE: 1, AUDIO: 1, BLOCKQUOTE: 1, CANVAS: 1, DD: 1, DIV: 1, DL: 1, FIELDSET: 1, FIGCAPTION: 1, FIGURE: 1, FIGURE: 1, FIGCAPTION: 1, FOOTER: 1, FORM: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, HEADER: 1, HGROUP: 1, HR: 1, LI: 1, MAIN: 1, NAV: 1, NOSCRIPT: 1, OL: 1, OUTPUT: 1, P: 1, PRE: 1, SECTION: 1, TABLE: 1, TFOOT: 1, UL: 1, VIDEO: 1};
      // return (el.nodeType == el.ELEMENT_NODE && blockTags[el.tagName]);
      if (el.nodeType == el.ELEMENT_NODE) {
        var display = $(el).css('display');
        if (!display) return blockTags[el.tagName];
        return (display == 'block' || display == 'table' || display == 'table-row');
      }
      return false;
    }
    function isMetadataEl(el) {
      var metadataTags = {HEAD: 1, TITLE: 1, BASE: 1, LINK: 1, META: 1, STYLE: 1, SCRIPT: 1};
      return (el.nodeType == el.ELEMENT_NODE && metadataTags[el.tagName]);
    }
    function getText(el, safe_last_br) {
      var child = el.firstChild, blocks = [], block = '';
      while (child) {
        if (child.nodeType == child.TEXT_NODE) {
          block += child.nodeValue;
        } else if (child.nodeType == child.ELEMENT_NODE && !isMetadataEl(child)) {
          if (child.tagName == 'BR') {
            block += '\n';
          } else if (child.tagName == 'IMG') {
            block += child.getAttribute('alt') || '';
          } else if (!isBlockEl(child)) {
            block += getText(child);
          } else {
            if (block.length > 0) {
              if (block.substr(-1) == '\n') {
                block = block.slice(0, -1);
              }
              blocks.push(block);
              block = '';
            }
            blocks.push(getText(child, safe_last_br));
          }
        }
        child = child.nextSibling;
      }
      if (block.length > 0) {
        if (!safe_last_br && block.substr(-1) == '\n') {
          block = block.slice(0, -1);
        }
        blocks.push(block);
      }
      return blocks.join('\n');
    }
    function getTextNodesIn(node) {
      var textNodes = [];
      if (node.nodeType == node.TEXT_NODE) {
        textNodes.push(node);
      } else {
        for (var i = 0, len = node.childNodes.length; i < len; ++i) {
          textNodes.push.apply(textNodes, getTextNodesIn(node.childNodes[i]));
        }
      }
      return textNodes;
    }
    function editableClosest(el) {
      while (el) {
        if (el.nodeType == el.ELEMENT_NODE &&
            el.getAttribute('contenteditable') == 'true') {
          return el;
        }
        el = el.parentNode;
      }
      return null;
    }
    function nonEditableClosest(el) {
      while (el) {
        if (el.tagName == 'MARK' &&
            el.getAttribute('contenteditable') == 'false') {
          return el;
        }
        el = el.parentNode;
      }
      return null;
    }
    function setSelectionRange(el, start, end) {
      var sel = window.getSelection();
      sel.removeAllRanges();
      var textNodes = getTextNodesIn(el);
      var charCount = 0, endCharCount, i, textNode, node, offset, nonEditEl;
      for (i = 0, charCount = 0; textNode = textNodes[i++]; ) {
        endCharCount = charCount + textNode.length;
        if (start >= charCount && (start < endCharCount ||
            (start == endCharCount && i <= textNodes.length))) {
          if (nonEditEl = nonEditableClosest(textNode)) {
            var range = document.createRange();
            if (start < end) range.setStartBefore(nonEditEl);
            else range.setStartAfter(nonEditEl);
            node = range.startContainer;
            offset = range.startOffset;
          } else {
            node = textNode;
            offset = start - charCount;
          }
          sel.collapse(node, offset);
          break;
        }
        charCount = endCharCount;
      }
      if (start != end) {
        for (i = 0, charCount = 0; textNode = textNodes[i++]; ) {
          endCharCount = charCount + textNode.length;
          if (end >= charCount && (end < endCharCount ||
              (end == endCharCount && i <= textNodes.length))) {
            if (nonEditEl = nonEditableClosest(textNode)) {
              var range = document.createRange();
              if (start < end) range.setStartAfter(nonEditEl);
              else range.setStartBefore(nonEditEl);
              node = range.startContainer;
              offset = range.startOffset;
            } else {
              node = textNode;
              offset = end - charCount;
            }
            sel.extend(node, offset);
            break;
          }
          charCount = endCharCount;
        }
      }
    }
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && !e.altKey &&
          e.which == 90) { // Z
        e.preventDefault();
        if (e.shiftKey) {
          redo(this);
        } else {
          undo(this);
        }
      }
      else if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey &&
               e.which == 89) { // Y
        e.preventDefault();
        redo(this);
      }
      else if (!e.shiftKey && !e.altKey && e.which == 13) { // Enter
        if ((e.metaKey || e.ctrlKey) || $(this).data('textOptions').singleLine) {
          e.preventDefault();
          $(this).parents('form').submit();
        }
      }
      else if ((e.metaKey || e.ctrlKey) &&
          !e.shiftKey && !e.altKey && e.which == 73 &&
          $(this).data('textOptions').allowTokens) { // I
        e.preventDefault();
        $(this).data('$tokens').filter(':not(.used)').eq(0).trigger('click');
      }
      else if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey &&
               (e.which == Keys.LEFT || e.which == Keys.RIGHT || e.which == Keys.BACKSPACE)) {
        var isLeft = e.which == Keys.LEFT || e.which == Keys.BACKSPACE;
        var isBackspace = e.which == Keys.BACKSPACE;
        var sel = window.getSelection();
        if (sel.isCollapsed && sel.focusNode) {
          if (sel.focusNode.nodeType == sel.focusNode.TEXT_NODE) {
            var newOffset = sel.focusOffset + (isLeft ? -1 : 1);
            if (newOffset < 0) {
              var prevNode = sel.focusNode.previousSibling;
              if (prevNode && prevNode.nodeType == prevNode.ELEMENT_NODE) {
                var range = document.createRange();
                range.setStartBefore(prevNode);
                if (isBackspace) {
                  range.setEnd(sel.focusNode, sel.focusOffset);
                  range.deleteContents();
                  $(sel.focusNode).closest('.input').trigger('input');
                } else {
                  sel.collapse(range.startContainer, range.startOffset);
                }
                e.preventDefault();
              } else {
                if (isBackspace) {
                  $(sel.focusNode).closest('.input').trigger('backspaceonleft');
                }
              }
            } else if (newOffset > sel.focusNode.nodeValue.length) {
              var nextNode = sel.focusNode.nextSibling;
              if (nextNode.nodeType == nextNode.ELEMENT_NODE && nextNode.tagName != 'BR') {
                var range = document.createRange();
                range.setStartAfter(nextNode);
                if (!isBackspace) {
                  sel.collapse(range.startContainer, range.startOffset);
                }
                e.preventDefault();
              }
            }
          }
          else if (sel.focusNode.nodeType == sel.focusNode.ELEMENT_NODE) {
            var curNode = sel.focusNode.childNodes[sel.focusOffset];
            if (isLeft) {
              var prevNode = curNode ? curNode.previousSibling : sel.focusNode.lastChild;
              while (prevNode &&
                     prevNode.nodeType == prevNode.TEXT_NODE &&
                     !prevNode.nodeValue.length) {
                prevNode = prevNode.previousSibling;
              }
              if (prevNode && prevNode.nodeType == prevNode.ELEMENT_NODE) {
                if (isBackspace) {
                  var range = document.createRange();
                  range.selectNode(prevNode);
                  range.deleteContents();
                  $(sel.focusNode).closest('.input').trigger('input');
                } else {
                  sel.collapse(sel.focusNode, sel.focusOffset - 1);
                }
                e.preventDefault();
              } else if (prevNode && prevNode.nodeType == prevNode.TEXT_NODE) {
                if (isBackspace) {
                  var range = document.createRange();
                  range.setStart(prevNode, prevNode.nodeValue.length - 1);
                  range.setEnd(prevNode, prevNode.nodeValue.length);
                  range.deleteContents();
                  $(sel.focusNode).closest('.input').trigger('input');
                } else {
                  sel.collapse(prevNode, prevNode.nodeValue.length - 1);
                }
                e.preventDefault();
              } else {
                if (isBackspace) {
                  $(sel.focusNode).closest('.input').trigger('backspaceonleft');
                }
              }
            } else {
              if (curNode && curNode.nodeType == curNode.ELEMENT_NODE && curNode.tagName != 'BR') {
                sel.collapse(sel.focusNode, sel.focusOffset + 1);
                e.preventDefault();
              } else if (curNode && curNode.nodeType == curNode.TEXT_NODE) {
                sel.collapse(curNode, 1);
                e.preventDefault();
              }
            }
          }
        }
      }
    }
    function getFieldRange(field) {
      var sel = window.getSelection();
      if (sel.anchorNode && sel.focusNode) {
        var rng = document.createRange();
        rng.setStart(field, 0);
        rng.setEnd(sel.anchorNode, sel.anchorOffset);
        var startOffset = getRangeText(rng).length;
        rng.setEnd(sel.focusNode, sel.focusOffset);
        var endOffset = getRangeText(rng).length;
        return {startOffset: startOffset, endOffset: endOffset};
      }
      var offset = field.childNodes.length;
      if (field.lastChild && field.lastChild.tagName == 'BR') {
        offset--;
      }
      return {startOffset: offset, endOffset: offset};
    }
    function setFieldRange(field, fieldRange) {
      if (fieldRange) {
        setSelectionRange(field, fieldRange.startOffset, fieldRange.endOffset);
      }
    }
    function onSetFocus() {
      setFieldRange(this, $(this).data('prevSelRange'));
    }
    function update(field, text, fieldRange) {
      var $field = $(field);
      var tokens = $field.data('tokens');
      var options = $field.data('textOptions');
      if (options.checkText) {
        text = options.checkText(text);
      }
      var html = cleanHTML(text), fhtml;
      if (options.allowTokens) {
        var avail_tokens = [];
        $.each(tokens, function(i, value) {
          avail_tokens[i] = cleanHTML(value);
        });
        var avail_count = tokens.length;
        var $tokens = $field.data('$tokens');
        if (avail_count > 0) {
          html = html.replace(TOKEN_REGEX, function(s) {
            var i = avail_tokens.indexOf(s);
            if (i >= 0) {
              avail_tokens[i] = null;
              avail_count--;
              var $token = $tokens.eq(i);
              if (!$token.hasClass('used')) {
                $token.prepareSlideX().addClass('used');
              }
              return '<mark class="token" contenteditable="false">' + s + '</mark>';
            } else {
              return s;
            }
          });
          $tokens.each(function(i) {
            if (avail_tokens[i] !== null) {
              var $token = $(this);
              if ($token.hasClass('used')) {
                $token.prepareSlideX().removeClass('used');
              }
            }
          });
        }
        $tokens.parents('.key-add-tokens-wrap').toggleClass('empty', !avail_count)
      }
      if (options.allowEmoji && options.emojiRE) {
        html = html.replace(options.emojiRE, function(s) {
          return '<mark class="emoji" contenteditable="false">' + EmojiSearch.emojiHtml(s) + '</mark>';
        });
      }
      html = html.split(getBR()).join('\n');
      if (options.singleLine) {
        html = html.replace(/^\n+|\n+$/g, '').replace(/\n+/g, ' ');
      }
      fhtml = $field.html();
      if (fhtml === html) {
        $field.append('<br/>').toggleClass('empty', !$field.text().length);
        return;
      }
      if (fhtml === html + getBR()) {
        $field.toggleClass('empty', !$field.text().length);
        return;
      }

      fieldRange = fieldRange || getFieldRange(field);
      $field.html(html + getBR()).toggleClass('empty', !$field.text().length);
      setFieldRange(field, fieldRange);
    }
    function onInput() {
      var field = this;
      var $field = $(this);
      var text = getText(field);
      update(field, text);

      var history = $field.data('history');
      var fieldRange = getFieldRange(field);
      var prevSelRange = $field.data('prevSelRange');
      var time = +(new Date);
      history.list = history.index >= 0 ? history.list.slice(0, history.index + 1) : [];
      if (history.index >= 0 && history.list[history.index]) {
        var entry = history.list[history.index];
        if (entry.text == text) {
          return;
        }
        if (time - entry.time < 1000 &&
            entry.redoSel.startOffset == entry.redoSel.endOffset &&
            (entry.text.length - entry.redoSel.endOffset) ==
            (text.length - fieldRange.endOffset)) {
          entry.text = text;
          entry.redoSel = fieldRange;
          return;
        }
        entry.undoSel = prevSelRange;
      }
      history.list.push({text: text, redoSel: fieldRange, time: time});
      history.index++;
    }
    function undo(field) {
      var $field = $(field);
      var history = $field.data('history');
      if (history.index > 0) {
        history.index--;
        var entry = history.list[history.index];
        update(field, entry.text, entry.undoSel);
      }
    }
    function redo(field) {
      var $field = $(field);
      var history = $field.data('history');
      if (history.index < history.list.length - 1) {
        history.index++;
        var entry = history.list[history.index];
        update(field, entry.text, entry.redoSel);
      }
    }
    function onSelectionChange() {
      $(this).data('prevSelRange', getFieldRange(this));
      var sel = window.getSelection();
      if (sel.isCollapsed) {
        var nonEditEl;
        if (nonEditEl = nonEditableClosest(sel.focusNode)) {
          var range = document.createRange();
          if (sel.focusOffset < $(nonEditEl).text().length / 2) {
            range.setStartBefore(nonEditEl);
          } else {
            range.setStartAfter(nonEditEl);
          }
          sel.collapse(range.startContainer, range.startOffset);
        }
        else if (sel.focusNode === this && sel.focusOffset == this.childNodes.length && this.lastChild && this.lastChild.nodeType == 'BR') {
          sel.collapse(this, this.childNodes.length - 1);
        }
        else if (sel.focusNode.nodeType == sel.focusNode.TEXT_NODE && sel.focusOffset == sel.focusNode.nodeValue.length) {
          var range = document.createRange();
          range.setStartAfter(sel.focusNode);
          sel.collapse(range.startContainer, range.startOffset);
        }
      }
    }

    if (!$(document).data('selectionchange_inited')) {
      $(document).data('selectionchange_inited', true);
      document.execCommand('autoUrlDetect', false, false);
      $(document).on('selectionchange', function() {
        var sel = window.getSelection();
        var anchorField, focusField;
        var field, offset;
        if (sel.anchorNode && (anchorField = editableClosest(sel.anchorNode))) {
          $(anchorField).triggerHandler('selectionchange');
        }
        if (sel.focusNode && (focusField = editableClosest(sel.focusNode)) &&
            anchorField != focusField) {
          $(focusField).triggerHandler('selectionchange');
        }
        if (!sel.focusNode &&
            document.activeElement &&
            document.activeElement.getAttribute('contenteditable') == 'true') {
          field = document.activeElement;
          offset = field.childNodes.length;
          if (field.lastChild.tagName == 'BR') {
            offset--;
          }
          sel.collapse(field, offset);
        }
      });
    }

    return this.each(function() {
      var field = this;
      var $field = $(field);
      var textOptions = $.extend({}, options);
      if ($field.data('inited')) {
        return;
      }
      $field.attr('contenteditable', 'true');
      $field.data('textOptions', textOptions);

      function insertTag(e) {
        e.preventDefault();
        document.execCommand('insertText', false, $(this).attr('data-token'));
        $field.focus();
      }

      $field.data('history', {list: [], index: -1});

      if (options.allowTokens) {
        var tokens_attr = $field.attr('data-tokens');
        var tokens = tokens_attr ? tokens_attr.split(' ') : [];

        var $tokensBtns = $('<div class="field-ins-btns"></div>');
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i] = tokens[i].replace('\xa0', ' ');
          var $token = $('<button class="field-ins-btn" tabindex="-1"></button>');
          $token.attr('data-token', token).appendTo($tokensBtns);
        }
        var ua = navigator.userAgent || '',
            is_mac = ua.indexOf('Mac') >= 0 ||
                     ua.indexOf('AppleWebKit') >= 0 &&
                     /Mobile\/\w+/.test(ua);
        var shortcut = is_mac ? '⌘I' : 'Ctrl+I';
        $tokensBtns.attr('data-shortcut', shortcut).wrap('<div class="key-add-tokens"></div>').parent().wrap('<div class="key-add-tokens-wrap"></div>').parent().toggleClass('empty', !tokens.length).insertAfter($field);
        var $tokens = $('.field-ins-btn', $tokensBtns);
        $tokens.on('click.tr-textarea', insertTag);
        $field.data('$tokens', $tokens);
        $field.data('tokens', tokens);
      }
      if ($field.is('[data-single-line]')) {
        textOptions.singleLine = true;
      }
      if ($field.is('[data-value]')) {
        $field.value($field.defaultValue());
      } else {
        $field.defaultValue($field.value());
      }

      $field.on('selectionchange.tr-textarea', onSelectionChange);
      $field.on('keydown.tr-textarea', onKeyDown);
      $field.on('input.tr-textarea', onInput);
      $field.on('setfocus.tr-textarea', onSetFocus);
      $field.trigger('input');
      $field.data('inited', true);
    });

  };
  $.fn.destroyTextarea = function() {
    return this.off('.tr-textarea').each(function() {
      $(this).data('inited', false);
      var $tokens = $(this).data('$tokens');
      if ($tokens) {
        $tokens.off('.tr-textarea');
      }
    });
  };

  $.fn.blockBodyScroll = function() {
    function onResultsMouseWheel(e) {
      var d = e.originalEvent.wheelDelta;
      if((this.scrollTop === (this.scrollHeight - this.clientHeight) && d < 0) ||
         (this.scrollTop === 0 && d > 0)) {
        e.preventDefault();
      }
    }
    return this.on('mousewheel', onResultsMouseWheel);
  };

  $.fn.closeDropdown = function() {
    return this.parents('.open').find('.dropdown-toggle').dropdown('toggle');
  };

  $.fn.initAutosize = function() {
    return this.map(function(){ autosize(this); return this; });
  };

  $.fn.updateAutosize = function() {
    return this.map(function(){ autosize.update(this); return this; });
  };

  $.fn.destroyAutosize = function() {
    return this.map(function(){ autosize.destroy(this); return this; });
  };

})(jQuery);

function getBR() {
  if (window._brHTML) return window._brHTML;
  return window._brHTML = $('<div><br/></div>').html();
}

function cleanHTML(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, getBR());
}
function uncleanHTML(value) {
  return $('<textarea>').html(value).val();
}
function cleanRE(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
function wrapHighlight(value, highlight, wrap_tag, prefix_only) {
  value = cleanHTML(value);
  if (highlight) {
    var pattern = cleanRE(cleanHTML(highlight));
    if (prefix_only) {
      pattern = '^' + pattern;
    }
    value = value.replace(new RegExp(pattern, 'gi'), '<strong>$&<\/strong>');
  }
  if (wrap_tag) {
    value = value.replace(TOKEN_REGEX, '<mark>$&</mark>');
  }
  return value;
}
function wrapSize(size) {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1048576) {
    return (Math.round(size * 10 / 1024.0) / 10) + ' KB';
  } else if (size < 1073741824) {
    return (Math.round(size * 10 / 1048576.0) / 10) + ' MB';
  } else {
    return (Math.round(size * 10 / 1073741824.0) / 10) + ' GB';
  }
}
function dataUrlToBlob(url) {
  try {
    var match = null;
    if (match = url.match(/^data:(image\/gif|image\/jpe?g|image\/png|video\/mp4);base64,(.*)$/)) {
      var type = match[1], b64 = match[2];
      var binary = atob(b64);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: type});
    }
  } catch (e) {}
  return false;
}
function copyToClipboard(str) {
  var $text = $('<textarea readonly>').css('position', 'fixed').css('left', '-9999px');
  $text.val(str).appendTo('body');
  var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  $text.focus().select();
  document.execCommand('copy');
  $text.remove();
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
function formatDateTime(datetime, short, full) {
  if (short) {
    var date = new Date(datetime);
    var cur_date = new Date();
    if (cur_date.getFullYear() == date.getFullYear() &&
        cur_date.getMonth() == date.getMonth() &&
        cur_date.getDate() == date.getDate() ||
        cur_date - date < 6*3600*1000) {
      return formatTime(datetime);
    }
    return formatDate(datetime, full);
  }
  return formatDate(datetime, full) + ' at ' + formatTime(datetime);
}
function formatDate(datetime, full) {
  var date = new Date(datetime);
  var cur_date = new Date();
  var j = date.getDate();
  var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
  var Y = date.getFullYear();
  if (full) {
    return j + ' ' + M + ' ' + Y;
  }
  if (cur_date.getFullYear() == date.getFullYear() ||
      cur_date - date < 90*86400*1000) {
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
function formatNumber(number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  var n = !isFinite(+number) ? 0 : +number
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  var s = ''
  var toFixedFix = function (n, prec) {
    if (('' + n).indexOf('e') === -1) {
      return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
    } else {
      var arr = ('' + n).split('e')
      var sig = ''
      if (+arr[1] + prec > 0) {
        sig = '+'
      }
      return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
    }
  }
  s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
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

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}
function preventDefault(e) {
  e.preventDefault();
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

/*!
  Autosize 3.0.20
  license: MIT
  http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),s="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(s)&&(s=0),l()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,e.style.overflowY=t}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){var t=e.style.height,n=o(e),r=document.documentElement&&document.documentElement.scrollTop;e.style.height="auto";var i=e.scrollHeight+s;return 0===e.scrollHeight?void(e.style.height=t):(e.style.height=i+"px",u=e.clientWidth,n.forEach(function(e){e.node.scrollTop=e.scrollTop}),void(r&&(document.documentElement.scrollTop=r)))}function l(){r();var t=Math.round(parseFloat(e.style.height)),o=window.getComputedStyle(e,null),i=Math.round(parseFloat(o.height));if(i!==t?"visible"!==o.overflowY&&(n("visible"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))):"hidden"!==o.overflowY&&(n("hidden"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))),a!==i){a=i;var l=d("autosize:resized");try{e.dispatchEvent(l)}catch(e){}}}if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var s=null,u=e.clientWidth,a=null,p=function(){e.clientWidth!==u&&l()},c=function(t){window.removeEventListener("resize",p,!1),e.removeEventListener("input",l,!1),e.removeEventListener("keyup",l,!1),e.removeEventListener("autosize:destroy",c,!1),e.removeEventListener("autosize:update",l,!1),Object.keys(t).forEach(function(n){e.style[n]=t[n]}),i.delete(e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",c,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",l,!1),window.addEventListener("resize",p,!1),e.addEventListener("input",l,!1),e.addEventListener("autosize:update",l,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",i.set(e,{destroy:c,update:l}),t()}}function o(e){var t=i.get(e);t&&t.destroy()}function r(e){var t=i.get(e);t&&t.update()}var i="function"==typeof Map?new Map:function(){var e=[],t=[];return{has:function(t){return e.indexOf(t)>-1},get:function(n){return t[e.indexOf(n)]},set:function(n,o){e.indexOf(n)===-1&&(e.push(n),t.push(o))},delete:function(n){var o=e.indexOf(n);o>-1&&(e.splice(o,1),t.splice(o,1))}}}(),d=function(e){return new Event(e,{bubbles:!0})};try{new Event("test")}catch(e){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(l=function(e){return e},l.destroy=function(e){return e},l.update=function(e){return e}):(l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},l.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=l});

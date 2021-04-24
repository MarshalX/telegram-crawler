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
  $.fn.focusAndSelect = function(select_all) {
    var field = this.get(0), len = this.value().length;
    if (field) {
      field.focus();
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
        } else {
          if (select_all) {
            field.setSelectionRange(0, len);
          } else {
            field.setSelectionRange(len, len);
          }
        }
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
    return this.prepareSlideY(callback).removeClass('shide');
  };
  $.fn.slideHide = function(callback) {
    if (callback == 'remove') {
      callback = function(){ $(this).remove(); };
    }
    return this.prepareSlideY(callback).addClass('shide');
  };
  $.fn.slideXShow = function(callback) {
    return this.prepareSlideX(callback).removeClass('sxhide');
  };
  $.fn.slideXHide = function(callback) {
    if (callback == 'remove') {
      callback = function(){ $(this).remove(); };
    }
    return this.prepareSlideX(callback).addClass('sxhide');
  };
  $.fn.isSlideHidden = function() {
    return this.hasClass('shide');
  };
  $.fn.slideToggle = function(state, callback) {
    if (state === true || state === false) {
      state = !state;
    }
    return this.prepareSlideY(callback).toggleClass('shide', state);
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
              if (options.enterEnabled()) {
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
        var queryLower = options.prepareQuery(query);
        from_index = from_index || 0;
        var html = '';
        var render_limit = options.renderLimit || 50;
        if (result.length > 0) {
          for (var i = from_index, j = 0; i < result.length && j < render_limit; i++, j++) {
            var item = result[i];
            var className = 'search-item' + (options.itemClass ? ' ' + options.itemClass : '') + (item.className ? ' ' + item.className : '');
            var item_html = '<div class="' + className + '" data-i="' + i + '">' + options.renderItem(item, query) + '</div>';
            html += item_html;
          }
          curRenderedIndex = i;
        } else {
          html = options.renderNoItems ? options.renderNoItems(query) : '';
          curRenderedIndex = 0;
        }
        if (curRenderedIndex >= result.length) {
          html += options.appendToItems ? options.appendToItems(query) : '';
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
          options.onClose && options.onClose();
          if (no_anim) {
            options.$results.animOn();
          }
        }
      }

      function open() {
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
            options.searchEnabled() && options.getData() === false) {
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
      }

      function valueChange() {
        clearTimeout(blurTimeout);
        clearTimeout(keyUpTimeout);
        var value = $field.value();
        curValue = value;
        console.log('valueChange', options.searchEnabled());
        if (options.searchEnabled()) {
          var data = options.getData();
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
            $field.blur();
            options.onEnter && options.onEnter(curValue);
            close(true);
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
          html += '<div class="selected-item' + (item.class ? ' ' + item.class : '') + '" data-val="' + cleanHTML(val.toString()) + '"><span class="close"></span><div class="label">' + item.name + '</div></div>';
        }
        $('.selected-item', $selected).remove();
        $selected.prepend(html);
        options.onUpdate && options.onUpdate(getValue(), getValue(true));
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
        onClose: function() {
          toggleDD(false);
        }
      }, options, {
        getData: function() {
          var data = options.getData();
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
        var data = options.getData();
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
        if (selectedVal.length) {
          updateSelected();
        }
      }
      $select.data('value', getValue());
      $select.data('valueFull', getValue(true));
      $select.on('reset.select', function(e) {
        $('.selected-item', $selected).each(function() {
          var val = $(this).attr('data-val');
          delSelected(val);
        });
        $field.trigger('datachange');
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
          this.value = val;
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
        var shortcut = is_mac ? 'âŒ˜I' : 'Ctrl+I';
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

})(jQuery);

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

function formatDateTime(datetime, short) {
  if (short) {
    var date = new Date(datetime);
    var cur_date = new Date();
    if (cur_date.getFullYear() == date.getFullYear() &&
        cur_date.getMonth() == date.getMonth() &&
        cur_date.getDate() == date.getDate() ||
        cur_date - date < 6*3600*1000) {
      return formatTime(datetime);
    }
    return formatDate(datetime);
  }
  return formatDate(datetime) + ' at ' + formatTime(datetime);
}

function formatDate(datetime) {
  var date = new Date(datetime);
  var cur_date = new Date();
  var j = date.getDate();
  var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
  var Y = date.getFullYear();
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

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}
function preventDefault(e) {
  e.preventDefault();
}

var Bugtracker = {
  init: function() {
    Aj.onLoad(function(state) {
      Bugtracker.updateTime(Aj.ajContainer);
      $('.logout-link').on('click', Bugtracker.eLogOut);
    });
    Aj.onUnload(function(state) {
      $('.logout-link').off('click', Bugtracker.eLogOut);
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
      Bugtracker.updateField($fieldEl, true);
    } else if (e.type == 'blur' || e.type == 'focusout') {
      Bugtracker.updateField($fieldEl, false);
    } else {
      Bugtracker.updateField($fieldEl);
    }
  },
  updateField: function($fieldEl, focused) {
    var $formGroup = $fieldEl.parents('.form-group');
    if (typeof focused !== 'undefined') {
      $formGroup.toggleClass('field-focused', focused);
    }
    var $files = $formGroup.find('.bt-issue-files');
    var hasValue = false;
    if ($files.size() > 0) {
      var filesCnt = $('.cd-issue-file:not(.shide)', $files).size();
      hasValue = filesCnt > 0;
    } else {
      var $select = $fieldEl.parents('.select');
      var selectedCnt = $select.find('.selected-item').size();
      $formGroup.toggleClass('noinput', $select.hasClass('no-search') && !selectedCnt);
      hasValue = $fieldEl.value().length > 0 || selectedCnt > 0;
    }
    $formGroup.toggleClass('field-has-value', hasValue);
  },
  onFilesUpdate: function(e) {
    Bugtracker.updateField($(this));
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
  formInit: function(form) {
    var $form = $(form);
    $('.bt-form-input .cd-form-control', $form).on('focus blur keyup change input', Bugtracker.eUpdateField);
    $('.bt-attach-btn', $form).on('focus blur', Bugtracker.eUpdateField);
    $('input.checkbox,input.radio', $form).on('focus blur', Bugtracker.eUpdateField);
    $('.bt-issue-files', $form).on('update', Bugtracker.onFilesUpdate);
    $form.on('focus.curPage', '.cd-issue-form', Bugtracker.checkAuth);
    $form.on('change.curPage', '.file-upload', Upload.eSelectFile);
    $form.on('click.curPage', '.bt-attach-btn', Upload.eAttachFile);
    $form.on('click.curPage', '.file-upload', stopImmediatePropagation);
    $form.on('click.curPage', '.cd-issue-file-close', Upload.eDeleteFile);
    $('.bt-form-input > div.input[contenteditable]', $form).initTextarea();
    $('.cd-input-field > div.input[contenteditable]', $form).initTextarea();
    $('.bt-issue-files', $form).trigger('update');
    $('.bt-markdown-control', $form).each(function() {
      var field = this;
      var editor = CodeMirror.fromTextArea(field, {
        mode: {
          name: 'gfm',
          emoji: false,
          taskLists: false,
          gitHubSpice: false
        },
        extraKeys: {
          'Tab': false,
          'Shift-Tab': false
        },
        matchBrackets: true,
        lineWrapping: true,
        theme: 'default',
        height: 'dynamic'
      });
      editor._onChangeHandler = function(cm) {
        cm.save();
        Bugtracker.eUpdateField.call(field, {type: 'change'});
      }
      editor._onFocusHandler = function(cm) {
        Bugtracker.eUpdateField.call(field, {type: 'focus'});
      }
      editor._onBlurHandler = function(cm) {
        Bugtracker.eUpdateField.call(field, {type: 'blur'});
      }
      editor.on('change', editor._onChangeHandler);
      editor.on('focus', editor._onFocusHandler);
      editor.on('blur', editor._onBlurHandler);
      $(this).data('cm-editor', editor);
      if (Aj.layer) {
        Aj.layer.one('popup:open', function() {
          editor.refresh();
        });
      }
    });
  },
  formDeinit: function(form) {
    var $form = $(form);
    $('.bt-form-input .cd-form-control', $form).off('focus blur keyup change input', Bugtracker.eUpdateField);
    $('.bt-attach-btn', $form).off('focus blur', Bugtracker.eUpdateField);
    $('input.checkbox,input.radio', $form).off('focus blur', Bugtracker.eUpdateField);
    $('.bt-issue-files', $form).off('update', Bugtracker.onFilesUpdate);
    $form.off('.curPage');
    $('.bt-form-input > div.input[contenteditable]', $form).destroyTextarea();
    $('.cd-input-field > div.input[contenteditable]', $form).destroyTextarea();
    $('.bt-markdown-control', $form).each(function() {
      var editor = $(this).data('cm-editor');
      if (editor) {
        editor.off('change', editor._onChangeHandler);
        editor.off('focus', editor._onFocusHandler);
        editor.off('blur', editor._onBlurHandler);
        editor.toTextArea();
      }
    });
  },
  initTagsSelect: function($form, field, options) {
    var $tagsEl = $form.field(field);
    var $tagsInput = $('.input', $tagsEl);
    options = options || {};
    Aj.onLayerLoad(function(layerState) {
      $tagsEl.initSelect({
        multiSelect: true,
        noCloseOnSelect: false,
        enterEnabled: function() {
          return false;
        },
        prepareQuery: function(str) {
          return $.trim(str).toLowerCase();
        },
        renderNoItems: function(q) {
          return q ? '<div class="select-list-no-results">' + l('WEB_NO_TAGS_FOUND') + '</div>' : '';
        },
        getData: function() {
          var data = Aj.layerState[field + 'List'];
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item._values = [item.name.toLowerCase()];
          }
          return data;
        },
        onChange: options.onChange,
        onUpdate: function(value, valueFull) {
          Bugtracker.updateField($tagsInput);
          options.onUpdate && options.onUpdate(value, valueFull);
        }
      });
      Bugtracker.updateField($tagsInput);
    });
    Aj.onLayerUnload(function(layerState) {
      $tagsEl.destroySelect();
    });
  },
  eShowMedia: function(e) {
    if (e.metaKey || e.ctrlKey) return true;
    e.preventDefault();
    e.stopImmediatePropagation();
    var src = $(this).attr('href');
    var options = {
      width: parseInt($(this).attr('data-width')),
      height: parseInt($(this).attr('data-height')),
      cover: $(this).attr('data-cover')
    };
    var is_video = this.hasAttribute('data-video');
    showMedia(src, is_video, options);
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

var Upload = {
  eFilePaste: function(e) {
    var $form = $(this);
    var files = e.originalEvent.clipboardData && e.originalEvent.clipboardData.files || [];
    if (files.length > 0) {
      e.preventDefault();
      Upload.addFiles($form, files);
    }
  },
  eSelectFile: function(e) {
    var $form = $(this).parents('form');
    var files = this.files || [];
    if (files.length > 0) {
      Upload.addFiles($form, files);
    }
  },
  isTypeAccepted(type) {
    return (type == 'image/gif' ||
            type == 'image/jpeg' ||
            type == 'image/jpg' ||
            type == 'image/png' ||
            type == 'video/mp4');
  },
  addFiles: function($form, files) {
    var form = $form.get(0),
        $files = $('.bt-issue-files', $form),
        limit = Aj.state.fileLimit || 5,
        size_limit = Aj.state.fileSizeLimit || 1048576,
        alert_shown = false;
    if (files != null) {
      files = Array.prototype.slice.apply(files);
      files.forEach(function(file) {
        if (!Upload.isTypeAccepted(file.type)) {
          return;
        }
        if (file.size > size_limit) {
          if (!alert_shown) {
            alert_shown = true;
            showAlert(l('WEB_FILE_IS_TOO_BIG', {
              file_name: cleanHTML(file.name),
              file_size: cleanHTML(wrapSize(file.size)),
              file_size_max: cleanHTML(wrapSize(size_limit)),
            }));
          }
          return false;
        }
        if ($(form.file).values().length >= limit) {
          showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
          return false;
        }
        var file_parts = (file.name || '').split('.'),
            file_ext = file_parts.length > 1 ? '.' + file_parts.pop() : '',
            file_name_without_ext = file_parts.join('.'),
            $file_delete = $('<span class="cd-issue-file-close close"></span>'),
            $file_thumb = $('<div class="cd-issue-file-thumb"><svg class="circle-progress-wrap" viewPort="0 0 66 66" width="66px" height="66px"><circle class="circle-progress-bg" cx="50%" cy="50%"></circle><circle class="circle-progress" cx="50%" cy="50%" stroke-dashoffset="106"></circle></svg></div>'),
            $file_title = $('<div class="cd-issue-file-title"></div>').append($('<span class="filename"/>').text(file_name_without_ext)).append($('<span class="ext"/>').text(file_ext)).attr('title', file_name_without_ext + file_ext),
            $file_loaded = $('<span class="cd-issue-file-loaded" data-loaded="Generating thumb... "></span>'),
            $file_label = $('<div class="bt-issue-file-label"></div>').text(wrapSize(file.size)).prepend($file_loaded);

        var $file = $('<div class="cd-issue-file shide"></div>').append($file_delete).append($file_thumb).append($file_title).append($file_label).appendTo($files).slideShow();
        $files.trigger('update');

        Upload.getThumb(file, 480, function onSuccess(thumb) {
          if (thumb) {
            var thumb_url = URL.createObjectURL(thumb);
            $file_thumb.css('background-image', "url('" + thumb_url + "')");
          }
          var xhr = Upload.uploadFile(file, thumb, function onSuccess(file) {
            if (file.thumb_src &&
                !$file_thumb.css('background-image')) {
              var thumb_src = Aj.state.uploadBaseUrl + file.thumb_src;
              $file_thumb.css('background-image', "url('" + thumb_src + "')");
            }
            if (file.src) {
              var src = Aj.state.uploadBaseUrl + file.src;
              $file_thumb.wrap('<a href="' + src + '" class="bt-view-media" data-width="' + (file.width || '') + '" data-height="' + (file.height || '') + '" data-cover="' + (file.cover_src || '') + '"' + (file.is_video ? ' data-video' : '') + ' target="_blank" tabindex="-1" />');
            }
            $('<input type="hidden" name="file">').value(file.file_data).prependTo($file);
            $file_loaded.slideXHide('remove');
            $file.removeClass('file-loading').addClass('file-loaded');
          }, function onProgress(loaded, total) {
            progress = total ? loaded / total : 0;
            progress = Math.max(0, Math.min(progress, 1));
            $file_loaded.attr('data-loaded', 'Uploading... ' + wrapSize(progress * file.size) + '\xa0/\xa0');
            $('.circle-progress', $file_thumb).attr('stroke-dashoffset', 106 * (1 - progress));
          }, function onError(error) {
            if (xhr.aborted) return;
            $file.slideHide('remove');
            showAlert(error);
          });
          $file.data('xhr', xhr);
          $file.addClass('file-loading');
        });
      });
    }
  },
  getThumb: function(file, width, onResult) {
    var thumb = false, got = false
        ready = function() {
          clearTimeout(thumbTo);
          if (!got) {
            got = true; onResult(thumb);
          }
        },
        thumbTo = setTimeout(ready, 2000);
    try {
      var url = URL.createObjectURL(file);
      var finishThumb = function(el, w, h) {
        try {
          var max = Math.max(w, h);
          var scale = width / max;
          var dw = Math.round(w * scale);
          var dh = Math.round(h * scale);
          if (dw && dh) {
            var canvas = document.createElement('canvas'), blob;
            canvas.width = dw
            canvas.height = dh;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, dw, dh);
            ctx.drawImage(el, 0, 0, dw, dh);
            URL.revokeObjectURL(url);
            if (canvas.toBlob) {
              canvas.toBlob(function(blob) {
                if (blob) { thumb = blob; }
                ready();
              }, 'image/jpeg', 0.92);
            } else {
              var blob = dataUrlToBlob(canvas.toDataURL('image/jpeg', 0.92));
              if (blob) { thumb = blob; }
              ready();
            }
          }
        } catch (e) { ready(); }
      }
      if (file.type == 'video/mp4') {
        var video = document.createElement('video');
        video.src = url;
        video.load();
        video.addEventListener('loadedmetadata', function metadataLoaded() {
          video.removeEventListener('loadedmetadata', metadataLoaded);
          video.addEventListener('timeupdate', function timeUpdated() {
            video.removeEventListener('timeupdate', timeUpdated);
            finishThumb(video, video.videoWidth, video.videoHeight);
          });
          video.currentTime = 0;
        });
        video.addEventListener('error', function onError() {
          video.removeEventListener('error', onError);
          ready();
        });
      } else {
        var image = document.createElement('img');
        image.src = url;
        image.addEventListener('load', function imgLoaded() {
          image.removeEventListener('load', imgLoaded);
          finishThumb(image, image.naturalWidth, image.naturalHeight);
        });
        image.addEventListener('error', function onError() {
          image.removeEventListener('error', onError);
          ready();
        });
      }
    } catch (e) { ready(); }
  },
  uploadFile: function(file, thumb, onSuccess, onProgress, onError) {
    var data = new FormData();
    data.append('file', file, file.name);
    if (thumb) {
      data.append('thumb', thumb, 'thumb.jpg');
    }
    return $.ajax({
      url: Aj.state.uploadUrl,
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
  },
  eAttachFile: function(e) {
    e && e.stopImmediatePropagation();
    e && e.preventDefault();
    if (Aj.needAuth()) return false;
    var limit = Aj.state.fileLimit || 5;
    if ($(this.form.file).values().length >= limit) {
      showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
      return false;
    }
    $('<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4" class="file-upload hide" multiple>').appendTo(this).click();
  },
  eDeleteFile: function(e) {
    var $file = $(this).parents('.cd-issue-file');
    if ($file.hasClass('file-loading')) {
      var xhr = $file.data('xhr');
      if (xhr) {
        xhr.aborted = true;
        xhr.abort();
      }
    }
    $file.slideHide('remove');
    $file.parents('.bt-issue-files').trigger('update');
  },
  cleanFiles: function(context) {
    var $files = $('.bt-issue-files', context);
    $('.cd-issue-file.file-loading', context).each(function() {
      var xhr = $file.data('xhr');
      if (xhr) {
        xhr.aborted = true;
        xhr.abort();
      }
    });
    $files.empty().trigger('update');
  }
};

var Filters = {
  init: function() {
    Aj.onLoad(function(state) {
      Bugtracker.formInit('.bt-main-search-form');
      $(document).on('submit.curPage', '.bt-main-search-form', preventDefault);
      $(document).on('click.curPage', '.bt-init-dialog-btn', Dialog.eInitDialog);
      $(document).on('click.curPage', '.bt-load-more', Filters.onLoadIssues);
      $(window).on('scroll.curPage', Filters.onScroll);
      var $form = $('.bt-main-search-form');
      var $filtersEl = $form.field('filters');
      var $filtersInput = $form.field('query');
      $filtersEl.initSelect({
        multiSelect: true,
        noCloseOnSelect: false,
        searchByLastWord: true,
        selectFullMatch: true,
        $enter: $('.select-enter'),
        getData: function() {
          var data = Aj.state.queryValues;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item._values = [item.name.toLowerCase()];
          }
          return data;
        },
        onChange: function() {
          Filters.updateForm();
        },
        onUpdate: function(value, valueFull) {
          Bugtracker.updateField($filtersInput);
        },
        onEnter: function(query) {
          Filters.updateForm();
        },
        onClear: function(query) {
          Filters.updateForm();
        }
      });
      Bugtracker.updateField($filtersInput);
      $(document).on('click.curPage', '.bt-tab-filter-btn', Filters.eTabFilterChange);
      $('.cd-content').on('click.curPage', '.bt-sort-item', Filters.eFilterChange);
      var params = Filters.getFormParams();
      state.curFormHref = Filters.getFormHref(params);
      Filters.updateSticky();
    });
    Aj.onUnload(function(state) {
      Bugtracker.formDeinit('.bt-main-search-form');
      var $form = $('.bt-main-search-form');
      $form.field('tags').destroySelect();
      $('.cd-content').off('.curPage');
      $(window).off('.curPage');
    });
  },
  eFilterChange: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if ($(this).hasClass('selected')) return;
    var value = $(this).data('value');
    var $sortWrap = $(this).parents('.bt-sort-wrap');
    $sortWrap.data('value', value);
    $('.bt-sort-item.selected', $sortWrap).removeClass('selected');
    $(this).addClass('selected');
    Filters.updateForm();
  },
  eTabFilterChange: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $item = $(this).parents('li');
    $item.parents('.open').find('.dropdown-toggle').dropdown('toggle');
    if ($item.hasClass('selected')) return;
    var value = $(this).data('value');
    var $wrap = $(this).parents('.bt-search-tab-wrap');
    $wrap.data('value', value);
    $('.bt-dropdown-item.selected', $wrap).removeClass('selected');
    $item.addClass('selected');
    Filters.updateForm();
  },
  getFormParams: function() {
    var $form   = $('.bt-main-search-form');
    var filters = $form.field('filters').data('valueFull');
    var query   = $.trim($form.field('query').value());
    var type    = $form.field('type').value();
    var sort    = $('.bt-sort-wrap').data('value');
    var params  = {};
    var filters_data = {};
    for (var val in filters) {
      var filter = filters[val];
      if (filter.group) {
        filters_data[filter.field] = filter.val;
      } else {
        if (!filters_data[filter.field]) {
          filters_data[filter.field] = [];
        }
        filters_data[filter.field].push(filter.val);
      }
    }
    for (var field in filters_data) {
      if (filters_data[field].join) {
        params[field] = filters_data[field].join(',');
      } else {
        params[field] = filters_data[field];
      }
    }
    if (Aj.state.emptyValues) {
      for (var field in Aj.state.emptyValues) {
        if (typeof params[field] === 'undefined') {
          params[field] = Aj.state.emptyValues[field];
        }
      }
    }
    $('.bt-search-tab-wrap[data-filter]').each(function() {
      var filter = $(this).data('filter');
      var value = $(this).data('value');
      if (value) {
        params[filter] = value;
      }
    });
    if (type) {
      params.type = type;
    }
    if (sort) {
      params.sort = sort;
    }
    if (query.length) {
      params.query = query;
    }
    return params;
  },
  getFormHref: function(params) {
    var form = $('.bt-main-search-form').get(0);
    var path_type = (form && form.hasAttribute('data-path-type') || false);
    var href = '/', querystring = '';
    for (var k in params) {
      if (path_type && k == 'type') continue;
      querystring += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]).split('%2C').join(',');
    }
    if (path_type && params.type) {
      href += encodeURI(params.type);
    }
    if (querystring.length > 1) {
      href += '?' + querystring.substr(1);
    }
    return href;
  },
  updateForm: function(just_reload) {
    var params = Filters.getFormParams();
    var href = Filters.getFormHref(params);
    if (!just_reload && Aj.state.curFormHref == href) {
      return;
    }
    var now = +(new Date), min_delay = 1000;
    clearTimeout(Aj.state.searchTimeout);
    if (Aj.state.lastSearch) {
      var delay = now - Aj.state.lastSearch;
      if (delay < min_delay) {
        var delay_left = min_delay - delay;
        Aj.state.searchTimeout = setTimeout(Filters.updateForm, delay_left);
        return;
      }
    }
    if (Aj.state.searchXhr) {
      Aj.state.searchXhr.abort();
    }
    Aj.state.lastSearch = +(new Date);
    Aj.state.searchXhr = Aj.apiRequest(Aj.state.searchMethod, params, function(result) {
      Aj.state.searchXhr = null;
      if (result.error) {
        return showAlert(result.error);
      } else {
        if (!Aj.layer && !just_reload) {
          Aj.setLocation(href);
        }
        if (result.tabs_html) {
          $('.bt-search-tabs').html(result.tabs_html);
        }
        if (result.rows_html) {
          var $issues_wrap = $('.cd-content');
          $issues_wrap.html(result.rows_html);
        }
        Bugtracker.updateTime('.cd-content');
        Aj.state.curFormHref = href;
      }
    });
  },
  onLoadIssues: function() {
    var $loadMore = $(this).closest('.js-load-more');
    Filters.load($loadMore);
  },
  onScroll: function() {
    Filters.updateSticky();
    $('.js-load-more').each(function() {
      var $loadMore = $(this);
      var top = $loadMore.offset().top - $(window).scrollTop();
      if (top < $(window).height() * 2) {
        Filters.load($loadMore);
      }
    });
  },
  updateSticky: function() {
    var $sticky = $('header.sticky');
    var sticky = $sticky.get(0);
    if (sticky) {
      var $sticky_box = $('.sticky-box', sticky);
      var rect = sticky.getBoundingClientRect();
      var need_fixed = (rect.top <= -3);
      var is_fixed = $sticky.hasClass('fixed');
      if (need_fixed !== is_fixed) {
        if (need_fixed) {
          var h = $sticky_box.height();
          $sticky.height(h);
          $sticky.addClass('fixed');
        } else {
          $sticky.removeClass('fixed');
          $sticky.height('');
        }
      }
    }
  },
  load: function($loadMore) {
    var offset    = $loadMore.attr('data-offset');
    if (!offset) {
      $loadMore.remove();
    }
    if ($loadMore.data('loading')) {
      return;
    }
    var params = Filters.getFormParams();
    params.offset = offset;
    var $loadMoreBtn = $('.bt-load-more', $loadMore);
    $loadMoreBtn.data('old-text', $loadMoreBtn.text()).text($loadMoreBtn.data('loading')).addClass('dots-animated');
    $loadMore.data('loading', true);
    Aj.apiRequest(Aj.state.searchMethod, params, function(result) {
      $loadMore.data('loading', false);
      var $loadMoreBtn = $('.bt-load-more', $loadMore);
      $loadMoreBtn.text($loadMoreBtn.data('old-text')).removeClass('dots-animated');
      if (result.error) {
        return showAlert(result.error);
      } else {
        if (result.rows_html) {
          var $loadMoreCont = $loadMore.closest('.cd-content');
          $loadMore.remove();
          $loadMoreCont.append(result.rows_html);
        }
        Bugtracker.updateTime('.cd-content');
      }
    });
  },
  updateIssue: function(issue_id, issue_html) {
    $('.bt-card-row[data-card-id]').each(function() {
      if ($(this).attr('data-card-id') == issue_id) {
        if (issue_html === true ||
            issue_html === false) {
          if ($(this).hasClass('hide') === issue_html) {
            $(this).toggleClass('hide', !issue_html);
            Filters.updateIssuesCount(issue_html ? 1 : -1);
          }
        } else {
          $(this).replaceWith(issue_html);
        }
      }
    });
  },
  updateIssuesCount: function(delta) {
    var $header = $('.bt-header[data-count]');
    var count = parseInt($header.attr('data-count')) || 0;
    count += delta;
    var lang_key = count > 0 ? Aj.state.headerLangKey : Aj.state.headerNullLangKey;
    if (lang_key) {
      $header.attr('data-count', count).html(l(lang_key, {n: count}));
    }
  },
  updateIssueStatus: function(issue_id, status, status_html, is_fixed) {
    $('.bt-card-row[data-card-id]').each(function() {
      if ($(this).attr('data-card-id') == issue_id) {
        $('.bt-card-status', this).html(status_html);
        var params = Filters.getFormParams();
        $('.bt-card-status', this).toggleClass('filtered', status == params.status);
        $('.bt-card-thumb', this).toggleClass('fixed', !!is_fixed);
      }
    });
  },
  updateIssueCounters: function(issue_id, counters_html) {
    $('.bt-card-row[data-card-id]').each(function() {
      if ($(this).attr('data-card-id') == issue_id) {
        $('.bt-issue-counters', this).html(counters_html);
      }
    });
  }
};

var EditIssue = {
  init: function() {
    var $form = $('.cd-issue-form', Aj.layer);
    Aj.onLayerLoad(function(layerState) {
      Bugtracker.formInit($form);
      var issue_id = $form.field('issue_id').value();
      if (issue_id > 0) {
        Aj.layer.addClass('popup-no-close');
        Aj.layer.addClass('popup-ignore-esc');
        layerState.onClose = function() {
          $('.layer-close-btn', Aj.layer).trigger('click');
        };
        Aj.layer.on('click.curLayer', function(e) {
          if ($(e.target).closest('body').length &&
             !$(e.target).closest('.bt-layer-content').length) {
            Aj.layerState.onClose();
          }
        });
        $(document).on('keydown.curLayer', function(e) {
          if (e.keyCode == Keys.ESC &&
              Aj.layer &&
              Aj.layerState && Aj.layerState.onClose) {
            e.stopImmediatePropagation();
            e.preventDefault();
            Aj.layerState.onClose();
          }
        });
      }
      Aj.layer.on('submit.curPage', '.cd-issue-form', EditIssue.eSubmitIssueForm);
      Aj.layer.on('click.curPage', '.bt-view-media', Bugtracker.eShowMedia);
      Aj.layer.on('click.curPage', '.bt-type-dd-wrap .bt-dropdown-item', EditIssue.eChangeType);
      Aj.layer.on('paste.curPage', '.cd-issue-form', Upload.eFilePaste);
      $('.bt-form-input .cd-form-control', $form).on('focus blur keyup change input', Bugtracker.eUpdateField);
      for (var i = 0; i < layerState.tagFields.length; i++) {
        var field = layerState.tagFields[i];
        Bugtracker.initTagsSelect($form, field, {
          onUpdate: EditIssue.onTagsUpdate
        });
      }
      var $title = $form.field('title');
      $title.on('change blur', EditIssue.updateTitle);
      Aj.layer.one('popup:open', function() {
        if (!$title.value()) {
          $title.focusAndSelect();
        } else {
          $form.field('description').focusAndSelect();
        }
      });
      Aj.onLayerLoad(function(layerState) {
        layerState.initFormData = EditIssue.getIssueFormData($form);
        Aj.onBeforeLayerUnload(function () {
          var curFormData = EditIssue.getIssueFormData($form);
          if (Aj.layerState.initFormData != curFormData) {
            return l('WEB_LEAVE_PAGE_CONFIRM_TEXT');
          }
          return false;
        });
      });
    });
    Aj.onLayerUnload(function(layerState) {
      Bugtracker.formDeinit($form);
      var $title = $form.field('title');
      $title.off('change blur', EditIssue.updateTitle);
      $(document).off('keydown.curLayer');
    });
  },
  updateTitle: function() {
    var $form = $('.cd-issue-form', Aj.layer);
    var issue_title = $form.field('title').value();
    var issue_id = $form.field('issue_id').value();
    var lang_key;
    if (issue_title.length > 0) {
      lang_key = issue_id ? 'WEB_EDIT_CARD_TITLE' : 'WEB_NEW_CARD_TITLE';
    } else {
      lang_key = issue_id ? 'WEB_EDIT_CARD_EMPTY_TITLE' : 'WEB_NEW_CARD_EMPTY_TITLE';
    }
    document.title = l(lang_key, {title: issue_title});
  },
  onTagsUpdate: function() {
    var $form = $('.cd-issue-form', Aj.layer);
    var $issue_type = $form.field('type'), cur_type;
    if ($issue_type.data('prevSaved')) {
      cur_type = $issue_type.data('prevValue');
    } else {
      cur_type = $issue_type.value();
    }
    var force_type = EditIssue.shouldForceType($form);
    var $items = $('.bt-type-dd-wrap .dropdown-menu > li', Aj.layer);
    $items.removeClass('disabled');
    if (force_type !== false) {
      $items.each(function() {
        var $item = $('.bt-dropdown-item', this);
        var type = $item.attr('data-value');
        if (type == force_type) {
          return false;
        }
        $(this).addClass('disabled');
        if (type == cur_type) {
          if (!$issue_type.data('prevSaved')) {
            $issue_type.data('prevValue', $issue_type.value());
            $issue_type.data('prevSaved', true);
          }
          $issue_type.value(force_type);
          EditIssue.updateTypeDropdown();
        }
      });
    } else {
      if ($issue_type.data('prevSaved')) {
        $issue_type.value(cur_type);
        $issue_type.data('prevSaved', false);
        EditIssue.updateTypeDropdown();
      }
    }
  },
  shouldForceType: function($form) {
    var tag_types = {};
    for (var i = 0; i < Aj.layerState.tagFields.length; i++) {
      var field = Aj.layerState.tagFields[i];
      var sel_tags = $form.field(field).data('valueFull') || [];
      var tags = Aj.layerState[field + 'List'] || [];
      for (var j = 0; j < tags.length; j++) {
        if (sel_tags[tags[j].val] && sel_tags[tags[j].val].issue_type) {
          tag_types[sel_tags[tags[j].val].issue_type] = true;
        }
      }
    }
    var $items = $('.bt-type-dd-wrap .bt-dropdown-item', Aj.layer);
    for (var i = $items.length - 1; i >= 0; i--) {
      var check_type = $items.eq(i).attr('data-value');
      if (tag_types[check_type]) {
        return check_type;
      }
    }
    return false;
  },
  updateTypeDropdown: function() {
    var $dd = $('.bt-type-dd', Aj.layer);
    var $form = $('.cd-issue-form', Aj.layer);
    var val = $form.field('type').value();
    $('.bt-type-dd-wrap .dropdown-menu > li', Aj.layer).each(function() {
      var $item = $('.bt-dropdown-item', this);
      var $label = $('.bt-card-type', this);
      var label_class = $label.attr('data-class');
      var sel = $item.attr('data-value') == val;
      $(this).toggleClass('selected', sel);
      $dd.removeClass(label_class);
      if (sel) {
        $dd.addClass(label_class);
        $('> .bt-card-type', $dd).replaceWith($label.clone());
      }
    });
    $('.bt-type-dd-tip', Aj.layer).each(function() {
      var sel = $(this).attr('data-type') == val;
      $(this).toggleClass('hide', !sel);
    });
  },
  eChangeType: function(e) {
    var $form = $('.cd-issue-form', Aj.layer);
    var val = $(this).attr('data-value');
    if ($(this).hasClass('disabled')) {
      return false;
    }
    $form.field('type').value(val);
    EditIssue.updateTypeDropdown();
  },
  getIssueFormData: function($form) {
    var form = $form.get(0);
    if (!form) return false;
    var values = [
      $form.field('title').value(),
      $form.field('description').value(),
      $form.field('found_in').value(),
      $form.field('fixed_in').value(),
      $form.field('additional').value(),
      $form.field('type').value()
    ];
    var files = $(form.file).values();
    values.push(files.join(';'));
    for (var i = 0; i < Aj.layerState.tagFields.length; i++) {
      var field   = Aj.layerState.tagFields[i];
      var tag_ids = $form.field(field).data('value');
      values.push(tag_ids.join(';'));
    }
    return values.join('|');
  },
  eSubmitIssueForm: function(e) {
    e.preventDefault();
    var form        = this;
    var $form       = $(this);
    var $button     = $('.cd-submit-issue-btn', this);
    var attach_btn  = $('.bt-attach-btn', this).get(0);
    var issue_id    = $form.field('issue_id').value();
    var title       = $form.field('title').value();
    var description = $form.field('description').value();
    var found_in    = $form.field('found_in').value();
    var fixed_in    = $form.field('fixed_in').value();
    var additional  = $form.field('additional').value();
    var type        = $form.field('type').value();
    var files       = $(this.file).values();

    if (!title.length) {
      $form.field('title').focus();
      return false;
    }
    if (!description.length) {
      $form.field('description').focus();
      return false;
    }
    var limit = Aj.state.fileLimit || 5;
    if (files.length > limit) {
      showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
      return false;
    }
    if ($('.file-loading', this).size()) {
      showAlert(l('WEB_UPLOADING_IN_PROGRESS'));
      return false;
    }
    var params = {
      issue_id: issue_id,
      title: title,
      description: description,
      files: files.join(';'),
      found_in: found_in,
      fixed_in: fixed_in,
      additional: additional,
      type: type
    };
    for (var i = 0; i < Aj.layerState.tagFields.length; i++) {
      var field   = Aj.layerState.tagFields[i];
      var tag_ids = $form.field(field).data('value');
      params[field] = tag_ids.join(';');
    }
    var submitIssue = function() {
      $button.prop('disabled', true);
      var method = issue_id ? 'editIssue' : 'createIssue';
      Aj.apiRequest(method, params, function(result) {
        $button.prop('disabled', false);
        if (result.error) {
          return showAlert(result.error);
        }
        Aj.layerState.initFormData = EditIssue.getIssueFormData($form);
        if (result.to_layer) {
          Aj.layerLocation(result.to_layer);
        }
        if (!issue_id) {
          Filters.updateForm(true);
        }
      });
    };
    if (!files.length && !issue_id) {
      var confirm_text = l('WEB_ADD_ATTACH_CONFIRM_TEXT');
      showConfirm(confirm_text, function() {
        Upload.eAttachFile.apply(attach_btn);
      }, l('WEB_ADD_ATTACH_CONFIRM_BUTTON'), function() {
        submitIssue();
      }, l('WEB_ADD_ATTACH_SKIP_BUTTON'));
    } else {
      submitIssue();
    }
    return false;
  }
};

var Issue = {
  UPDATE_PERIOD: 3000,
  ONBLUR_UPDATE_PERIOD: 30000,
  init: function(options) {
    options = options || {};
    var $form = $('.cd-comment-form', Aj.layer);
    Aj.onLayerLoad(function(layerState) {
      Bugtracker.formInit($form);
      layerState.issue_id = $form.field('issue_id').value();
      Aj.layer.on('click.curPage', '.cd-issue-like.bt-active-btn', Issue.eLikeIssue.pbind('liked'));
      Aj.layer.on('click.curPage', '.cd-issue-dislike.bt-active-btn', Issue.eLikeIssue.pbind('disliked'));
      Aj.layer.on('click.curPage', 'a.bt-header-label', Issue.eSwitchTab);
      Aj.layer.on('click.curPage', '.bt-set-status-btn', Issue.eSetStatus);
      Aj.layer.on('click.curPage', '.bt-copy', Issue.eCopy);
      Aj.layer.on('click.curPage', '.bt-issue-copy-link', Issue.eCopyLink);
      Aj.layer.on('click.curPage', '.bt-delete-issue-btn', Issue.eDeleteIssue);
      Aj.layer.on('click.curPage', '.bt-restore-issue-btn', Issue.eRestoreIssue);
      Aj.layer.on('click.curPage', '.bt-delete-comment-btn', Issue.eDeleteIssueComment);
      Aj.layer.on('click.curPage', '.bt-restore-comment-btn', Issue.eRestoreIssueComment);
      Aj.layer.on('click.curPage', '.bt-issue-subscribe.bt-active-btn', Issue.eSubscribe);
      Aj.layer.on('click.curPage', '.bt-view-media', Bugtracker.eShowMedia);
      $(window).on('focus blur', Issue.onFocusChange);
      var $commentsWrap = $('.bt-comments-wrap', Aj.layer);
      Issue.initCommentsForm($commentsWrap);
      Issue.initComments($commentsWrap);
      Issue.requestCommentsUpdate();
      if (options.comment_id) {
        Aj.layer.one('popup:open', function() {
          Issue.highlightComment(options.comment_id, true);
        });
      }
      if (layerState.foundIssueHtml) {
        Filters.updateIssue(layerState.issueId, layerState.foundIssueHtml);
      }
    });
    Aj.onLayerUnload(function(layerState) {
      Bugtracker.formDeinit($form);
      $('.bt-comments-wrap', Aj.layer).off('.curPage');
      $('div.input[contenteditable]', Aj.layer).destroyTextarea();
      $(window).off('focus blur', Issue.onFocusChange);
      clearTimeout(Aj.layerState.updateTo);
    });
  },
  initCommentsForm: function($commentsWrap) {
    $commentsWrap.on('submit.curPage', '.cd-comment-form', Issue.eSubmitCommentForm);
    $commentsWrap.on('paste.curPage', '.cd-comment-form', Upload.eFilePaste);
    $commentsWrap.on('click.curPage', '.bt-reply-close', Issue.eCancelReplyComment);
    $commentsWrap.on('click.curPage', '.bt-reply-btn', Issue.eReplyComment);
    $commentsWrap.on('click.curPage', 'a[data-comment-link]', Issue.eCommentHighlight);
    $commentsWrap.on('click.curPage', '.bt-toggle-comment-form', Issue.eOpenComments);
    $commentsWrap.on('click.curPage', '.bt-comments-more', Issue.eLoadMore);
  },
  eCommentHighlight: function(e) {
    var comment_id = $(this).attr('data-comment-link');
    if (comment_id) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Issue.highlightComment(comment_id);
    }
  },
  highlightComment: function(comment_id, noload) {
    var found = false;
    $('.bt-comment[data-comment-id]', Aj.layer).each(function() {
      if ($(this).attr('data-comment-id') == comment_id) {
        var $comment = $(this);
        $comment.scrollIntoView({position: 'center', padding: 15});
        $comment.highlight(1500);
        found = true;
      }
    });
    if (!found && !noload) {
      Issue.loadComment(comment_id);
    }
  },
  initComments: function(context) {
    Bugtracker.updateTime(context);
    $('div.input[contenteditable]', context).initTextarea();
  },
  eLoadMore: function(e) {
    e.preventDefault();
    $moreEl = $(this);
    var loading = $moreEl.data('loading');
    if (loading) {
      return false;
    }
    var before = $moreEl.attr('data-before');
    var after  = $moreEl.attr('data-after');
    $moreEl.data('loading', true);
    $moreEl.addClass('dots-animated');

    var $form = $('.cd-comment-form', Aj.layer);
    var issue_id = $form.field('issue_id').value();
    var team     = $form.field('team').value();
    if (!issue_id) {
      return false;
    }

    var _load = function(issue_id, team, before, after) {
      if (after) {
        Issue.requestCommentsUpdate();
      }
      Aj.apiRequest('loadComments', {
        issue_id: issue_id,
        team: team,
        before_id: before,
        after_id:  after
      }, function(result) {
        if (result.error) {
          var timeout = $moreEl.data('timeout') || 1000;
          $moreEl.data('timeout', timeout > 60000 ? timeout : timeout * 2);
          setTimeout(function(){ _load(issue_id, team, before, after); }, timeout);
        } else {
          var $form = $('.cd-comment-form', Aj.layer);
          if (issue_id != $form.field('issue_id').value() ||
              team     != $form.field('team').value()) {
            Issue.requestCommentsUpdate();
            return false;
          }
          var $comments = $(result.comments_html);
          Issue.initComments($comments);
          if (before) {
            var $cont = $moreEl.scrollParent();
            var y = $moreEl.offset().top + $moreEl.outerHeight(true) - $cont.scrollTop();
            $comments.insertBefore($moreEl);
            var st = $moreEl.offset().top - y;
            $moreEl.remove();
            $cont.scrollTop(st);
          } else {
            $comments.insertBefore($moreEl);
            $moreEl.remove();
          }
          if (result.comments_cnt > 0) {
            $('.cd-list-empty-wrap', Aj.layer).remove();
          }
          if (result.header_cnts) {
            Issue.updateHeaderCounters(result.header_cnts);
          }
          if (typeof result.counters_html !== 'undefined') {
            Filters.updateIssueCounters(issue_id, result.counters_html);
          }
          Issue.requestCommentsUpdate();
        }
      });
    };
    _load(issue_id, team, before, after);
  },
  onFocusChange: function() {
    if (document.hasFocus()) {
      if ((new Date) - Aj.layerState.lastUpdate > Issue.UPDATE_PERIOD / 2) {
        Issue.updateComments();
      } else {
        Issue.requestCommentsUpdate();
      }
    }
  },
  updateHeaderCounters: function(counters) {
    $('.bt-header-tab', Aj.layer).each(function() {
      var mode = $(this).attr('data-mode');
      if (typeof counters[mode] !== 'undefined') {
        $('.bt-header-cnt', this).text(counters[mode] || '');
      }
    });

  },
  requestCommentsUpdate: function() {
    clearTimeout(Aj.layerState.updateTo);
    Aj.layerState.updateTo = setTimeout(Issue.updateComments, document.hasFocus() ? Issue.UPDATE_PERIOD : Issue.ONBLUR_UPDATE_PERIOD);
  },
  updateComments: function() {
    clearTimeout(Aj.layerState.updateTo);
    var $moreEl = $('.bt-comments-more[data-after]', Aj.layer);
    if (!$moreEl.size() || !$moreEl.hasClass('cd-autoload')) {
      Issue.requestCommentsUpdate();
      return false;
    }
    var after = $moreEl.attr('data-after');
    $moreEl.data('loading', true);

    var $form = $('.cd-comment-form', Aj.layer);
    var issue_id = Aj.layerState.issueId;
    var team     = $form.field('team').value();
    if (!issue_id || Aj.layerState.issueDeleted) {
      return false;
    }

    var _load = function(issue_id, team, after) {
      Aj.apiRequest('loadComments', {
        issue_id: issue_id,
        team: team,
        after_id:  after,
        auto: 1
      }, function(result) {
        Aj.layerState.lastUpdate = +(new Date);
        if (result.error) {
          var timeout = $moreEl.data('timeout') || 1000;
          $moreEl.data('timeout', timeout > 60000 ? timeout : timeout * 2);
          setTimeout(function(){ _load(issue_id, team, after); }, timeout);
        } else {
          var $form = $('.cd-comment-form', Aj.layer);
          if (issue_id != $form.field('issue_id').value() ||
              team     != $form.field('team').value()) {
            return false;
          }
          var $curMoreEl = $('.bt-comments-more.cd-autoload[data-after]', Aj.layer);
          if (!$curMoreEl.size()) {
            Issue.requestCommentsUpdate();
            return false;
          }
          if ($curMoreEl.attr('data-after') != after) {
            Issue.requestCommentsUpdate();
            return false;
          }
          var $comments = $(result.comments_html);
          Issue.initComments($comments);
          $comments.insertBefore($curMoreEl);
          $curMoreEl.remove();
          if (result.comments_cnt > 0) {
            $('.cd-list-empty-wrap', Aj.layer).remove();
          }
          if (result.header_cnts) {
            Issue.updateHeaderCounters(result.header_cnts);
          }
          if (typeof result.counters_html !== 'undefined') {
            Filters.updateIssueCounters(issue_id, result.counters_html);
          }
          Issue.requestCommentsUpdate();
        }
      });
    };
    _load(issue_id, team, after);
  },
  loadComment: function(comment_id) {
    var $comments = $('.bt-comments');
    var loading = $comments.data('loading');
    if (loading) {
      return false;
    }
    $comments.data('loading', true);

    var $form = $('.cd-comment-form', Aj.layer);
    var issue_id = $form.field('issue_id').value();
    var team     = $form.field('team').value();
    if (!issue_id) {
      return false;
    }

    Aj.apiRequest('loadComments', {
      issue_id: issue_id,
      team: team,
      comment_id: comment_id
    }, function(result) {
      if (!result.error) {
        var $form = $('.cd-comment-form', Aj.layer);
        if (issue_id != $form.field('issue_id').value() ||
            team     != $form.field('team').value()) {
          return false;
        }
        if (result.comments_html) {
          $comments.html(result.comments_html);
          Issue.initComments($comments);
          Issue.requestCommentsUpdate();
        }
        if (result.header_cnts) {
          Issue.updateHeaderCounters(result.header_cnts);
        }
        if (typeof result.counters_html !== 'undefined') {
          Filters.updateIssueCounters(issue_id, result.counters_html);
        }
        Issue.highlightComment(comment_id, true);
        $comments.data('loading', false);
      }
    });
  },
  scrollDown: function(timeout) {
    var scroll_fn = function() {
      Aj.layer.scrollTop(Aj.layer.scrollHeight());
    };
    if (timeout) {
      setTimeout(scroll_fn, timeout);
    } else {
      scroll_fn();
    }
  },
  eOpenComments: function(e) {
    e && e.preventDefault();
    e && e.stopImmediatePropagation();
    var $footer = $('.bt-comments-footer', Aj.layer);
    $footer.removeClass('collapsed');
    $('.cd-issue-input', $footer).focus();
  },
  eSwitchTab: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $tab  = $(this);
    var tab_href = $tab.attr('href');
    var mode = $tab.parents('.bt-header-tab').attr('data-mode');
    if ($tab.data('submiting')) {
      return false;
    }
    $tab.data('submiting', true);
    Aj.apiRequest('getLayerComments', {
      issue_id: Aj.layerState.issue_id,
      mode: mode
    }, function(result) {
      $tab.data('submiting', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.comments_html) {
        var $form = $('.cd-comment-form', Aj.layer);
        var $commentsWrap = $('.bt-comments-wrap', Aj.layer);
        Bugtracker.formDeinit($form);
        $commentsWrap.off('.curPage');
        $('div.input[contenteditable]', Aj.layer).destroyTextarea();
        clearTimeout(Aj.layerState.updateTo);

        $commentsWrap.replaceWith(result.comments_html);

        var $form = $('.cd-comment-form', Aj.layer);
        var $commentsWrap = $('.bt-comments-wrap', Aj.layer);
        Bugtracker.formInit($form);
        Issue.initCommentsForm($commentsWrap);
        Issue.initComments($commentsWrap);
        Issue.requestCommentsUpdate();
        Aj.setLayerLocation(tab_href);
      }
    });
    return false;
  },
  eSetStatus: function(e) {
    e.preventDefault();
    var $button  = $(this);
    var $item    = $button.parents('li');
    var issue_id = Aj.layerState.issueId;
    var status   = $button.attr('data-status');
    var $dd_wrap = $button.parents('.bt-dropdown-wrap');
    var $dd      = $('.dropdown-toggle', $dd_wrap);
    if ($dd.data('submiting')) {
      return false;
    }
    $dd.data('submiting', true);
    $dd.addClass('disabled');
    Aj.apiRequest('saveIssueStatus', {
      issue_id: issue_id,
      status: status
    }, function(result) {
      $dd.data('submiting', false);
      $dd.removeClass('disabled');
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.status_html) {
        $dd_wrap.replaceWith(result.status_html);
        Issue.updateComments();
      }
      if (result.status_str) {
        Filters.updateIssueStatus(issue_id, result.status_id, result.status_str, result.is_fixed);
      }
    });
    return false;
  },
  eSubmitCommentForm: function(e) {
    e.preventDefault();
    var form        = this;
    var $form       = $(this);
    var $button     = $('.cd-submit-issue-btn', this);
    var attach_btn  = $('.bt-attach-btn', this).get(0);
    var issue_id    = $form.field('issue_id').value();
    var reply_to_id = $form.field('reply_to_id').value();
    var team        = $form.field('team').value();
    var text        = $form.field('text').value();
    var files       = $(this.file).values();
    if ($('.file-loading', this).size()) {
      showAlert(l('WEB_UPLOADING_IN_PROGRESS'));
      return false;
    }
    if (!text.length && !files.length) {
      $form.field('text').focus();
      return false;
    }
    var limit = Aj.state.fileLimit || 5;
    if (files.length > limit) {
      showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
      return false;
    }
    if ($form.data('submiting')) {
      return false;
    }
    var $moreEl = $('.bt-comments-more[data-after]', Aj.layer);
    var after   = $moreEl.attr('data-after') || 0;
    $form.data('submiting', true);
    $button.prop('disabled', true);
    Aj.apiRequest('addComment', {
      issue_id: issue_id,
      reply_to_id: reply_to_id,
      team: team,
      after_id: after,
      text: text,
      files: files.join(';')
    }, function(result) {
      $form.data('submiting', false);
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $form.reset();
      Upload.cleanFiles($form);
      Issue.eCancelReplyComment();
      if (result.comments_html) {
        var $comments = $(result.comments_html);
        Issue.initComments($comments);
        if (result.replace) {
          $('.bt-comments', Aj.layer).html(result.comments_html);
        } else {
          $comments.insertBefore($moreEl);
          $moreEl.remove();
        }
        if (result.comments_cnt > 0) {
          $('.cd-list-empty-wrap', Aj.layer).remove();
        }
        if (result.header_cnts) {
          Issue.updateHeaderCounters(result.header_cnts);
        }
        if (typeof result.counters_html !== 'undefined') {
          Filters.updateIssueCounters(issue_id, result.counters_html);
        }
        Issue.requestCommentsUpdate();
      }
      Issue.scrollDown(50);
    });
    return false;
  },
  eReplyComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (Aj.unauth) return false;
    var $commentEl = $(this).parents('.bt-comment');
    var reply_to_id = $commentEl.attr('data-comment-id');
    if ($commentEl.hasClass('bt-noreply')) {
      return false;
    }
    var $replyEl = $('<a class="bt-comment-reply-content"><div class="bt-reply-close close"></div><div class="bt-comment-head"></div></a>').attr('data-comment-link', reply_to_id);
    var $replyWrapEl = $('<div class="bt-comment-reply-wrap"><div class="bt-comment-reply"></div></div>');
    var $formEl = $('.cd-comment-form', Aj.layer);
    var authorHtml = $('.bt-comment-author-name', $commentEl).html();
    var $textEl = $('.bt-comment-body > .bt-comment-text', $commentEl).clone();
    var $files = $('.bt-issue-files', $commentEl);
    var thumbUrl = $files.attr('data-thumb-src');
    var $replyToInput = $('<input type="hidden" name="reply_to_id">').attr('value', reply_to_id);
    $('br', $textEl).replaceWith(' ');
    $('a', $textEl).wrapInner('<span>').find('>span').unwrap();
    $('.bt-comment-head', $replyEl).append($(authorHtml));
    if (thumbUrl) {
      var $fileEL = $('<div class="bt-comment-thumb">').css('background-image', "url('" + thumbUrl + "')");
      $replyEl.prepend($fileEL);
      if (!$textEl.html()) {
        $textEl.append($('<span class="bt-comment-reply-file"></span>').text($files.attr('data-attach')));
      }
    }
    $replyEl.prepend($replyToInput);
    $replyEl.append($textEl);
    $prevReplyWrapEl = $('.bt-comment-reply-wrap', $formEl);
    $('.bt-comment-reply', $replyWrapEl).append($replyEl);
    if ($prevReplyWrapEl.filter(':not(.shide)').size() > 0) {
      $prevReplyWrapEl.remove();
      $formEl.prepend($replyWrapEl.removeClass('shide'));
    } else {
      $formEl.prepend($replyWrapEl);
    }
    $replyWrapEl.data('$commentEl', $commentEl);
    Issue.eOpenComments();
    setTimeout(function() {
      Issue.scrollDown();
      $('.cd-issue-input', $formEl).focus();
    }, 100);
  },
  eCancelReplyComment: function(e) {
    e && e.preventDefault();
    e && e.stopImmediatePropagation();
    $replyWrapEl = $('.cd-comment-form .bt-comment-reply-wrap', Aj.layer);
    $replyWrapEl.remove();
  },
  eDeleteIssueComment: function(e) {
    var $btn       = $(this);
    var $comment   = $btn.parents('.bt-comment');
    var comment_id = $comment.attr('data-comment-id');
    var issue_id   = Aj.layerState.issueId;
    $btn.parents('.open').find('.dropdown-toggle').dropdown('toggle');
    if ($btn.data('submiting') || !comment_id || !issue_id) {
      return false;
    }
    $comment.addClass('deleted');
    $btn.data('submiting', true);
    Aj.apiRequest('deleteComment', {
      issue_id: issue_id,
      comment_id: comment_id
    }, function(result) {
      $btn.data('submiting', false);
      if (result.error) {
        $comment.removeClass('deleted');
        return showAlert(result.error);
      }
      if (result.header_cnts) {
        Issue.updateHeaderCounters(result.header_cnts);
      }
      if (typeof result.counters_html !== 'undefined') {
        Filters.updateIssueCounters(issue_id, result.counters_html);
      }
    });
    return false;
  },
  eRestoreIssueComment: function(e) {
    e.preventDefault();
    var $btn       = $(this);
    var $comment   = $btn.parents('.bt-comment');
    var comment_id = $comment.attr('data-comment-id');
    var issue_id   = Aj.layerState.issueId;
    if ($btn.data('submiting') || !comment_id || !issue_id) {
      return false;
    }
    $comment.removeClass('deleted');
    $btn.data('submiting', true);
    Aj.apiRequest('restoreComment', {
      issue_id: issue_id,
      comment_id: comment_id
    }, function(result) {
      $btn.data('submiting', false);
      if (result.error) {
        $comment.addClass('deleted');
        return showAlert(result.error);
      }
      if (result.header_cnts) {
        Issue.updateHeaderCounters(result.header_cnts);
      }
      if (typeof result.counters_html !== 'undefined') {
        Filters.updateIssueCounters(issue_id, result.counters_html);
      }
    });
    return false;
  },
  eDeleteIssue: function(e) {
    var $btn     = $(this);
    var issue_id = Aj.layerState.issueId;
    $btn.parents('.open').find('.dropdown-toggle').dropdown('toggle');
    if ($btn.data('submiting') || !issue_id) {
      return false;
    }
    var confirm_text = l('WEB_DELETE_ISSUE_CONFIRM_TEXT');
    showConfirm(confirm_text, function() {
      $btn.data('submiting', true);
      Aj.apiRequest('deleteIssue', {
        issue_id: issue_id
      }, function(result) {
        $btn.data('submiting', false);
        if (result.error) {
          return showAlert(result.error);
        }
        if (Aj.layer) {
          Aj.layer.addClass('deleted');
          Aj.layerState.issueDeleted = true;
          Filters.updateIssue(issue_id, false);
        } else {
          Aj.location('/');
        }
      });
    }, l('WEB_DELETE_ISSUE_CONFIRM_BUTTON'));
    return false;
  },
  eRestoreIssue: function(e) {
    e.preventDefault();
    var $btn     = $(this);
    var issue_id = Aj.layerState.issueId;
    $btn.parents('.open').find('.dropdown-toggle').dropdown('toggle');
    if ($btn.data('submiting') || !issue_id) {
      return false;
    }
    $btn.data('submiting', true);
    Aj.apiRequest('restoreIssue', {
      issue_id: issue_id
    }, function(result) {
      $btn.data('submiting', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (Aj.layer &&
          Aj.layerState.issueDeleted) {
        Aj.layer.removeClass('deleted');
        delete Aj.layerState.issueDeleted;
        Filters.updateIssue(issue_id, true);
        Issue.requestCommentsUpdate();
      } else if (result.to_layer) {
        Aj.layerLocation(result.to_layer);
      }
    });
    return false;
  },
  eLikeIssue: function(state, e) {
    e.stopPropagation();
    e.preventDefault();
    if (Aj.needAuth()) return false;
    var $likesWrap = $(this).parents('.likes-wrap');
    var issue_id = Aj.layerState.issueId;
    var cur_state = '';
    if ($likesWrap.hasClass('liked')) cur_state = 'liked';
    if ($likesWrap.hasClass('disliked')) cur_state = 'disliked';
    var prev_likes = {
      likes: +$('.cd-issue-like .value', $likesWrap).attr('data-value') || 0,
      dislikes: +$('.cd-issue-dislike .value', $likesWrap).attr('data-value') || 0,
      state: cur_state
    };
    var likes = $.extend({}, prev_likes);
    var method;
    if (state == 'liked') {
      if ($likesWrap.hasClass('liked')) {
        method = 'unlikeIssue';
        likes.state = '';
        likes.likes--;
      } else {
        if ($likesWrap.hasClass('disliked')) {
          likes.dislikes--;
        }
        method = 'likeIssue';
        likes.state = state;
        likes.likes++;
      }
    } else if (state == 'disliked') {
      if ($likesWrap.hasClass('disliked')) {
        method = 'unlikeIssue';
        likes.state = '';
        likes.dislikes--;
      } else {
        if ($likesWrap.hasClass('liked')) {
          likes.likes--;
        }
        method = 'dislikeIssue';
        likes.state = state;
        likes.dislikes++;
      }
    }
    Aj.apiRequest(method, {
      issue_id: issue_id
    }, function(result) {
      if (result.error) {
        Issue.updateIssueLikes($likesWrap, prev_likes);
        return showAlert(result.error);
      }
      Issue.updateIssueLikes($likesWrap, result);
      if (typeof result.counters_html !== 'undefined') {
        Filters.updateIssueCounters(issue_id, result.counters_html);
      }
    });
    Issue.updateIssueLikes($likesWrap, likes);
    return false;
  },
  updateIssueLikes: function($likesWrap, likes) {
    if (likes.likes) {
      $('.cd-issue-like .value', $likesWrap).text(likes.likes);
    }
    $('.cd-issue-like .value', $likesWrap).attr('data-value', likes.likes).toggleClass('empty', !(likes.likes > 0));
    if (likes.dislikes) {
      $('.cd-issue-dislike .value', $likesWrap).text(likes.dislikes);
    }
    $('.cd-issue-dislike .value', $likesWrap).attr('data-value', likes.dislikes).toggleClass('empty', !(likes.dislikes > 0));
    $likesWrap.removeClass('liked').removeClass('disliked');
    if (likes.state) {
      $likesWrap.addClass(likes.state);
    }
  },
  eCopy: function(e) {
    var sel = window.getSelection();
    if (sel.isCollapsed) {
      var text = $(this).attr('data-copy');
      if (text) {
        copyToClipboard(text);
        showToast(l('WEB_COPIED_TOAST'));
      }
    }
  },
  eCopyLink: function(e) {
    if (e.metaKey || e.ctrlKey) return true;
    e.preventDefault();
    e.stopImmediatePropagation();
    $(this).parents('.open').find('.dropdown-toggle').dropdown('toggle');
    var text = $(this).attr('data-copy');
    if (text) {
      copyToClipboard(text);
      showToast('<a href="' + cleanHTML(text) + '" style="white-space:nowrap">' + cleanHTML(text) + '</a><br>' + l('WEB_LINK_COPIED_TOAST'));
    }
  },
  eSubscribe: function(e) {
    e.preventDefault();
    var $btn     = $(this);
    var issue_id = Aj.layerState.issueId;
    $btn.parents('.open').find('.dropdown-toggle').dropdown('toggle');
    if (!issue_id || $btn.data('processing')) {
      return false;
    }
    var unsubscribe = $btn.hasClass('subscribed');
    $btn.data('processing', true);
    $btn.prop('disabled', true);
    $btn.toggleClass('subscribed', !unsubscribe);
    Aj.apiRequest('subscribeToComments', {
      issue_id: issue_id,
      unsubscribe: unsubscribe ? 1 : 0
    }, function(result) {
      $btn.data('processing', false);
      $btn.prop('disabled', false);
      if (result.error) {
        $btn.toggleClass('subscribed', !!unsubscribe);
        return showAlert(result.error);
      }
      $btn.toggleClass('subscribed', result.subscribed);
      if (result.toast) {
        showToast(result.toast, 3500);
      }
      if (typeof result.counters_html !== 'undefined') {
        Filters.updateIssueCounters(issue_id, result.counters_html);
      }
    });
    return false;
  }
};

var Dialog = {
  init: function() {
    var $form = $('.cd-comment-form', Aj.layer);
    Aj.onLayerLoad(function(layerState) {
      Bugtracker.formInit($form);
      Aj.layer.on('click.curPage', '.bt-init-dialog-btn', Dialog.eInitDialog);
      Aj.layer.on('submit.curPage', '.cd-comment-form', Dialog.eSubmitCommentForm);
      Aj.layer.on('paste.curPage', '.cd-comment-form', Upload.eFilePaste);
      Aj.layer.on('change.curPage', '.cd-dialog-options .radio', Dialog.eSelectOption);
      Aj.layer.on('click.curPage', '.bt-view-media', Bugtracker.eShowMedia);
    });
    Aj.onLayerUnload(function(layerState) {
      Bugtracker.formDeinit($form);
    });
  },
  updateOptions: function(e) {
    $('.cd-dialog-options', Aj.layer).slice(0, -1).each(function() {
      $(this).addClass('disabled');
      $('.radio', this).prop('disabled', true);
    });
  },
  updateMessages: function(result) {
    $('.cd-comment-form', Aj.layer).toggleClass('hide', !result.need_text_reply);
    $('.bt-restart-form', Aj.layer).toggleClass('hide', !result.need_restart);
    if (result.messages_html) {
      var $comments = $(result.messages_html);
      var $commentsWrap = $('.bt-comments', Aj.layer);
      if (result.replace) {
        $commentsWrap.empty();
      }
      $comments.appendTo($commentsWrap);
      Dialog.updateOptions();
      $('.bt-comments .bt-comment', Aj.layer).last().scrollIntoView({position: 'top', padding: -1});
    }
  },
  eInitDialog: function(e) {
    e.preventDefault();
    if (Aj.needAuth()) return false;
    var $button = $(this);
    var mode = $button.attr('data-mode');
    var init_hash = $button.attr('data-init-hash');
    var params = Filters.getFormParams();
    var query = params.query || '';
    if ($button.prop('disabled')) {
      return false;
    }
    $button.prop('disabled', true);
    Aj.apiRequest('initDialog', {
      mode: mode,
      init_hash: init_hash,
      query: query
    }, function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.to_layer) {
        Aj.layerLocation(result.to_layer);
      }
    });
    return false;
  },
  eSelectOption: function(e) {
    e.preventDefault();
    var $form = $(this.form);
    if ($form.hasClass('disabled')) {
      return false;
    }
    var msg_id = $form.field('msg_id').value();
    var opt    = $form.field('opt').value();
    if ($form.data('submiting')) {
      return false;
    }
    $form.data('submiting', true);
    $form.addClass('disabled');
    $('.radio', $form).prop('disabled', true);
    Aj.apiRequest('selectDialogOption', {
      msg_id: msg_id,
      opt: opt
    }, function(result) {
      $form.data('submiting', false);
      if (result.error) {
        $form.removeClass('disabled');
        $('.radio', $form).prop('disabled', false);
        return showAlert(result.error);
      }
      Dialog.updateMessages(result);
    });
    return false;
  },
  eSubmitCommentForm: function(e) {
    e.preventDefault();
    var form        = this;
    var $form       = $(this);
    var $button     = $('.cd-submit-issue-btn', this);
    var attach_btn  = $('.bt-attach-btn', this).get(0);
    var text        = $form.field('text').value();
    var files       = $(this.file).values();
    if ($('.file-loading', this).size()) {
      showAlert(l('WEB_UPLOADING_IN_PROGRESS'));
      return false;
    }
    if (!text.length && !files.length) {
      $form.field('text').focus();
      return false;
    }
    var limit = Aj.state.fileLimit || 1;
    if (files.length > limit) {
      showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
      return false;
    }
    if ($form.data('submiting')) {
      return false;
    }
    $form.data('submiting', true);
    $button.prop('disabled', true);
    Aj.apiRequest('sendDialogMessage', {
      text: text,
      files: files.join(';')
    }, function(result) {
      $form.data('submiting', false);
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $form.reset();
      Upload.cleanFiles($form);
      Dialog.updateMessages(result);
    });
    return false;
  }
};

var Settings = {
  init: function() {
    Aj.onLayerLoad(function(layerState) {
      layerState.$form = $('.bt-subscriptions-form', Aj.layer);
      Bugtracker.formInit(layerState.$form);
      $('.cd-form-select .select', Aj.layer).each(function() {
        Settings.initTagsSelect(this);
      });
      Aj.layer.on('submit.curPage', '.bt-subscriptions-form', preventDefault);
      Aj.layer.on('click.curPage', '.btn-subscribe-btn', Settings.eSubscriptionSubmit);
      Aj.layer.on('click.curPage', '.bt-subscription-delete-btn', Settings.eSubscriptionDelete);
    });
    Aj.onLayerUnload(function(layerState) {
      Bugtracker.formDeinit(layerState.$form);
    });
  },
  initTagsSelect: function(select, options) {
    var $tagsEl = $(select);
    var $tagsInput = $('.input', $tagsEl);
    options = options || {};
    Aj.onLayerLoad(function(layerState) {
      $tagsEl.initSelect({
        multiSelect: true,
        noCloseOnSelect: false,
        enterEnabled: function() {
          return false;
        },
        prepareQuery: function(str) {
          return $.trim(str).toLowerCase();
        },
        renderNoItems: function(q) {
          return q ? '<div class="select-list-no-results">' + l('WEB_NO_TAGS_FOUND') + '</div>' : '';
        },
        getData: function() {
          var data = Aj.layerState.values;
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item._values = [item.name.toLowerCase()];
          }
          return data;
        },
        onUpdate: function(value, valueFull) {
          Bugtracker.updateField($tagsInput);
        }
      });
      Bugtracker.updateField($tagsInput);
    });
    Aj.onLayerUnload(function(layerState) {
      $tagsEl.destroySelect();
    });
  },
  eSubscriptionSubmit: function(e) {
    e.preventDefault();
    var $btn    = $(this);
    var $form   = $btn.parents('.bt-subscriptions-form');
    var tag_ids = $form.field('tags').data('value');
    if ($btn.data('submiting')) {
      return false;
    }
    $btn.data('submiting', true);
    Aj.apiRequest('subscribeToTags', {
      tags: tag_ids.join(';')
    }, function(result) {
      $btn.data('submiting', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $('.bt-subscriptions-form', Aj.layer).toggleClass('hide', !result.can_add);
      if (result.subscriptions_html) {
        $('.bt-subscriptions.by-tags', Aj.layer).html(result.subscriptions_html);
      }
      $form.reset();
    });
    return false;
  },
  eSubscriptionDelete: function(e) {
    e.preventDefault();
    var $btn   = $(this);
    var name   = $btn.attr('data-name');
    var value  = $btn.attr('data-value');
    var method = 'subscribeToComments';
    var params = {unsubscribe: 1};
    if (name == 'tags') {
      method = 'subscribeToTags';
      params.tags = value;
    } else {
      params.issue_id = value;
    }
    if ($btn.data('submiting')) {
      return false;
    }
    $btn.data('submiting', true);
    Aj.apiRequest(method, params, function(result) {
      $btn.data('submiting', false);
      if (result.error) {
        return showAlert(result.error);
      }
      $btn.parents('.bt-subscription').remove();
      if (name == 'tags') {
        var $wrap = $('.bt-subscriptions.by-tags', Aj.layer);
        $('.bt-subscription-empty', $wrap).toggleClass('hide', $('.bt-subscription', $wrap).size() > 0);
        $('.bt-subscriptions-form', Aj.layer).toggleClass('hide', !result.can_add);
      } else {
        var $wrap = $('.bt-subscriptions:not(.by-tags)', Aj.layer);
        $('.bt-subscription-empty', $wrap).toggleClass('hide', $('.bt-subscription', $wrap).size() > 0);
        if (result.toast) {
          showToast(result.toast, 3500);
        }
        if (typeof result.counters_html !== 'undefined') {
          Filters.updateIssueCounters(value, result.counters_html);
        }
      }
    });
    return false;
  }
};

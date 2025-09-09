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
  $.fn.fadeShow = function() {
    return this.removeClass('ohide');
  };
  $.fn.fadeHide = function() {
    return this.addClass('ohide');
  };
  $.fn.isFadeHidden = function() {
    return this.hasClass('ohide');
  };
  $.fn.fadeToggle = function(state) {
    if (state === true || state === false) {
      state = !state;
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
    options = options || {}
    return this.first().each(function() {
      var padding = options.padding || 0,
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
      if (itemTop < contTop) {
        scrollTo = itemTop - padding - paddingTop;
      } else if (itemBottom > contBottom) {
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
    var $field = this;
    var curValue = $field.val();
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
    $field.data('options', options);

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
      console.log(+new Date, 'cancelblur3');
      clearTimeout(blurTimeout);
      var value = $field.val();
      clearTimeout(keyUpTimeout);
      if (curValue !== value) {
        // if (e.type == 'keyup') {
        //   keyUpTimeout = setTimeout(function() {
        //     valueChange();
        //   }, 50);
        // } else {
          valueChange();
          options.onInput && options.onInput(value);
        // }
      }
    }

    function check(item, queryLower) {
      if (!queryLower.length) {
        return 0;
      }
      for (var j = 0; j < item._values.length; j++) {
        var valueLower = item._values[j];
        if (valueLower == queryLower) {
          return valueLower.length;
        }
      }
      for (var j = 0; j < item._values.length; j++) {
        var valueLower = item._values[j];
        if (valueLower.indexOf(queryLower) !== -1) {
          return valueLower.length;
        }
      }
      return false;
    }

    function search(data, query) {
      if (!query.length) {
        return [];
      }
      var time = +(new Date);
      var queryLower = query.toLowerCase();
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var valueScore = check(item, queryLower);
        if (valueScore !== false) {
          item._score = valueScore;
          item._i = i;
          result.push(item);
        }
      }
      result.sort(function(item1, item2) {
        return (item1._score - item2._score) || (item1._i - item2._i);
      });
      for (i = 0; i < result.length; i++) {
        var item = result[i];
        delete item._score;
        delete item._i;
      }
      console.log('search: ' + (((new Date) - time) / 1000) + 's');
      return result;
    }

    function render(result, query, from_index) {
      var time = +(new Date);
      var queryLower = query.toLowerCase();
      from_index = from_index || 0;
      var html = '';
      if (result.length > 0) {
        for (var i = from_index, j = 0; i < result.length && j < 50; i++, j++) {
          var item = result[i];
          var item_html = '<div class="search-item" data-i="' + i + '">' + options.renderItem(item, query) + '</div>';
          html += item_html;
        }
        curRenderedIndex = i;
      } else {
        html = options.renderNoItems ? options.renderNoItems(query) : '';
        curRenderedIndex = 0;
      }
      if (!from_index) {
        options.$results.html(html);
      } else if (html) {
        options.$results.append(html);
      }
      console.log('render: from ' + from_index + ', ' + j + ' lines, ' + (((new Date) - time) / 1000) + 's');
    }

    function renderLoading() {
      curRenderedIndex = 0;
      options.$results.html(options.renderLoading ? options.renderLoading() : '');
    }

    function renderEmpty() {
      curRenderedIndex = 0;
      options.$results.html('');
    }

    function close() {
      console.log(+new Date, 'close');
      clearTimeout(keyUpTimeout);
      if (!options.$results.hasClass('collapsed')) {
        if (options.$enter && options.enterEnabled()) {
          options.$enter.removeClass('selected');
        }
        options.$results.addClass('collapsed');
        options.onClose && options.onClose();
      }
    }

    function open() {
      clearTimeout(blurTimeout);
      hover(curSelectedIndex, true);
      options.$results.removeClass('collapsed');
      options.onOpen && options.onOpen();
    }

    function onFocus() {
      isFocused = true;
      var value = $field.val();
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
      blurTimeout = setTimeout(close, 100);
    }

    function valueChange() {
      console.log(+new Date, 'cancelblur1');
      clearTimeout(blurTimeout);
      clearTimeout(keyUpTimeout);
      var value = $field.val();
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
          if (curValue.length) {
            renderLoading();
          } else {
            renderEmpty();
          }
          return;
        }
        curResult = search(data, curValue);
        var index = false;
        if (curValue.length) {
          render(curResult, curValue);
          if (curResult.length && (!options.$enter || !options.enterEnabled())) {
            index = 0;
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

    function hover(i, adjust_scroll) {
      $('.search-item.selected', options.$results).removeClass('selected');
      curSelectedIndex = i;
      if (curSelectedIndex !== false) {
        var selectedEl = $('.search-item', options.$results).get(curSelectedIndex);
        if (!selectedEl) {
          curSelectedIndex = false;
        } else {
          $(selectedEl).addClass('selected');
          if (adjust_scroll) {
            adjustScroll($(selectedEl));
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
        if (options.$enter && options.enterEnabled()) {
          $field.blur();
          options.onEnter(curValue);
          close();
        }
        return;
      }
      $field.blur();
      options.onSelect(curResult[i]);
      close();
    }

    function onItemMouseOver() {
      hover($(this).data('i'));
    }

    function onResultsScroll(e) {
      if (this.scrollTop > this.scrollHeight - this.clientHeight - 1000) {
        render(curResult, curValue, curRenderedIndex);
      }
    }

    function onResultsMouseWheel(e) {
      var d = e.originalEvent.wheelDelta;
      if((this.scrollTop === (this.scrollHeight - this.clientHeight) && d < 0) ||
         (this.scrollTop === 0 && d > 0)) {
        e.preventDefault();
      }
    }

    function onItemClick(e) {
      if (e.metaKey || e.ctrlKey) return true;
      console.log(+new Date, 'cancelblur2');
      clearTimeout(blurTimeout);
      e.stopImmediatePropagation();
      e.preventDefault();
      select($(this).data('i'));
    }

    function adjustScroll($itemEl) {
      var scrollTop   = options.$results.scrollTop(),
          itemTop     = $itemEl.position().top + scrollTop,
          itemHeight  = $itemEl.outerHeight(),
          itemBottom  = itemTop + itemHeight,
          contHeight  = options.$results.height() || 300;

      if (itemTop < scrollTop) {
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
    options.$results.on('mouseover.search', '.search-item', onItemMouseOver);
    options.$results.on('mousedown.search', '.search-item', onItemClick);
    options.$results.on('scroll.search', onResultsScroll);
    options.$results.on('mousewheel.search', onResultsMouseWheel);
    $field.on('keydown.search', onKeyDown);
    $field.on('keyup.search',   onKeyUp);
    $field.on('focus.search',   onFocus);
    $field.on('blur.search',    onBlur);
    $field.on('input.search',   onKeyUp);

    $field.on('datachange.search', function() {
      valueChange();
    });

    options.$results.addClass('collapsed');
    return this;
  };
  $.fn.destroySearch = function() {
    var $field = this;
    var options = $field.data('options');
    if (options.$enter && options.enterEnabled()) {
      options.$enter.off('.search');
    }
    options.$results.off('.search');
    $field.off('.search');
    return this;
  };
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
        return $('.input[data-name]', this).filter(function() {
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
      }
    });
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
        if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT') {
          this.value = val;
        } else {
          $(this).text(val).trigger('input');
        }
      });
    }
    return this.first().map(function() {
      if (this.tagName == 'TEXTAREA' || this.tagName == 'INPUT') {
        return this.value || '';
      } else {
        return $(this).text() || '';
      }
    }).get(0) || '';
  };

  $.fn.initTextarea = function() {
    function getRangeText(range) {
      var div = document.createElement('DIV');
      div.appendChild(range.cloneContents());
      return getText(div, true);
    }
    function isBlockEl(el) {
      var blockTags = {ADDRESS: 1, ARTICLE: 1, ASIDE: 1, AUDIO: 1, BLOCKQUOTE: 1, CANVAS: 1, DD: 1, DIV: 1, DL: 1, FIELDSET: 1, FIGCAPTION: 1, FIGURE: 1, FIGURE: 1, FIGCAPTION: 1, FOOTER: 1, FORM: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, HEADER: 1, HGROUP: 1, HR: 1, LI: 1, MAIN: 1, NAV: 1, NOSCRIPT: 1, OL: 1, OUTPUT: 1, P: 1, PRE: 1, SECTION: 1, TABLE: 1, TFOOT: 1, UL: 1, VIDEO: 1};
      return (el.nodeType == el.ELEMENT_NODE && blockTags[el.tagName]);
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
        if (el.tagName == 'INS' &&
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
      else if ((e.metaKey || e.ctrlKey) &&
          !e.shiftKey && !e.altKey && e.which == 73) { // I
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
              if (prevNode.nodeType == prevNode.ELEMENT_NODE) {
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
    function update(field, text, fieldRange) {
      var tokens = $(field).data('tokens');
      var avail_tokens = [];
      $.each(tokens, function(i, value) {
        avail_tokens[i] = cleanHTML(value);
      });
      var avail_count = tokens.length;
      var $tokens = $(field).data('$tokens');
      var html = cleanHTML(text);
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
            return '<ins contenteditable="false">' + s + '</ins>';
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
      $tokens.parents('.key-add-tokens-wrap').toggleClass('empty', !avail_count);
      html = html.replace(/<br\/>/g, '\n') + '<br/>';
      if ($(field).html() === html) return;

      fieldRange = fieldRange || getFieldRange(field);
      $(field).html(html);
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
      $field.attr('contenteditable', 'true');

      function insertTag(e) {
        e.preventDefault();
        document.execCommand('insertText', false, $(this).attr('data-token'));
        $field.focus();
      }

      $field.data('history', {list: [], index: -1});

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

      $field.on('selectionchange.tr-textarea', onSelectionChange);
      $field.on('keydown.tr-textarea', onKeyDown);
      $field.on('input.tr-textarea', onInput);
      $field.trigger('input');
    });

  };
  $.fn.destroyTextarea = function() {
    return this.off('.tr-textarea').each(function() {
      $(this).data('$tokens').off('.tr-textarea');
    });
  };

})(jQuery);


var Auth = {
  login: function(user) {
    $.ajax({
      url: '/auth/login',
      type: 'POST',
      data: user,
      dataType: 'json',
      success: function (result) {
        location.reload();
      },
      error: function (xhr) {
        alert(xhr.responseText || 'Unknown error');
      }
    });
  }
};

var Nav = {
  init: function() {
    $(window).resize(Nav.update);
    Nav.update();
  },
  update: function() {
    var $nav_menu = $('.nav-menu');
    $nav_menu.addClass('nav-menu-can-fix');
    if ($nav_menu.css('position') == 'fixed') {
      $nav_menu.width($nav_menu.parent().width());
    } else {
      $nav_menu.css('width', 'auto');
    }
  }
};

function wrapLangValue(lang_value, is_rtl, highlight) {
  var html = '';
  var rtl_class = (is_rtl ? ' rtl' : '');
  if ($.isArray(lang_value) ||
      $.isPlainObject(lang_value)) {
    html += '<span class="pluralized' + rtl_class + '">';
    for (var p = 0; p < 6; p++) {
      if (typeof lang_value[p] === 'undefined') continue;
      html += '<span class="p-value' + rtl_class + '" data-label="' + l('WEB_PLURALIZED_LABEL_' + p).toLowerCase() + '"><span class="value">' + wrapHighlight(lang_value[p], highlight, true) + '</span></span>';
      first = false;
    }
    html += '</span>';
    return html;
  }
  return '<span class="p-value' + rtl_class + '"><span class="value">' + wrapHighlight(lang_value, highlight, true) + '</span></span>';
}

function cleanHTML(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br/>');
}

function wrapHighlight(value, highlight, wrap_tag) {
  value = cleanHTML(value);
  if (highlight) {
    var pattern = cleanHTML(highlight).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
    value = value.replace(new RegExp(pattern, 'gi'), '<strong>$&<\/strong>');
  }
  if (wrap_tag) {
    value = value.replace(TOKEN_REGEX, '<ins>$&</ins>');
  }
  return value;
}








function tableFiltersInit() {
Aj.onLoad(function(state) {
  $('.tr-round-tab').on('click', function(e) {
    $(this).parent().find('.tr-round-tab').removeClass('tr-round-tab-current');
    $(this).addClass('tr-round-tab-current');
    var filter = $(this).data('filter');
    var $tbody = $('tbody.tbody-' + filter);
    $tbody.parent().find('tbody').hide();
    $tbody.show();
  });
});
Aj.onUnload(function(state) {
  $('.tr-round-tab').off('click');
});
}

function myStatsInit() {

Aj.onLoad(function(state) {
  $('.bio-edit-btn').on('click', function(e) {
    $('.bio-saved').hide();
    $('.bio-edit').show();
  });
  $('.bio-save-btn').on('click', function(e) {
    Aj.apiRequest('saveBio', {
      bio: $('.bio-input').val()
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
      if (result.ok) {
        $('.bio-value').html(result.bio_html);
        var input = $('.bio-input').get(0);
        input.value = input.defaultValue = result.bio_text;
        $('.bio-saved').show();
        $('.bio-edit').hide();
      }
    });
  });
  $('.bio-cancel-btn').on('click', function(e) {
    $('.bio-saved').show();
    $('.bio-edit').hide();
    var input = $('.bio-input').get(0);
    input.value = input.defaultValue;
  });
  $('.graph-checkbox').on('change', function(e) {
    Aj.apiRequest('saveGraphAvail', {
      avail: $('.graph-checkbox').prop('checked') ? 1 : 0
    }, function(result) {
      if (result.error) {
        return showAlert(result.error);
      }
    });
  });
});
Aj.onUnload(function(state) {
  $('.bio-edit-btn').off('click');
  $('.bio-save-btn').off('click');
  $('.bio-cancel-btn').off('click');
  $('.graph-checkbox').off('change');
});
}

function rightsInit() {

Aj.onLoad(function(state) {
  $('.tr-members-add-form').on('submit', function(e) {
    e.preventDefault();
    var form = this;
    var blockEl = $(this).parents('.tr-members-block');
    Aj.apiRequest('rightsSearchMember', {
      number: form.short_number.value,
      query: this.query.value
    }, function(result) {
      if (result.member_html) {
        var rowEl = $(result.member_html);
        var phone = rowEl.attr('data-phone');
        if (!$('.tr-member-row-wrap[data-phone="' + phone + '"]', blockEl).size()) {
          rowEl.addClass('shide').prependTo($('.tr-members', blockEl)).slideShow();
          openEditMember(rowEl);
        }
      }
      if (result.error) {
        return showAlert(result.error);
      }
      form.reset();
      form.query.blur();
    });
  });
  function openEditMember(rowEl) {
    var nameEl = $('.tr-member-name-short', rowEl);
    var inputEl = $('.tr-member-name-input', rowEl);
    var width = nameEl.width();
    nameEl.width(width);
    inputEl.width(width + 50);
    rowEl.addClass('tr-member-row-edit');
    setTimeout(function() {
      $('.tr-member-name-input', rowEl).focus().select();
    }, 100);
  }
  function editMember(rowEl, add) {
    if (!add && $(rowEl).hasClass('tr-member-row-add')) {
      return;
    }
    var nameEl = $('.tr-member-name-short', rowEl);
    var inputEl = $('.tr-member-name-input', rowEl);
    var inputDom = inputEl.get(0);
    if (add || inputDom.value != inputDom.defaultValue) {
      var name = inputEl.val();
      var phone = rowEl.attr('data-phone');
      var blockEl = rowEl.parents('.tr-members-block');
      var form = $('.tr-members-add-form', blockEl);
      Aj.apiRequest('rightsEditAgent', {
        number: form.get(0).short_number.value,
        phone: phone,
        name: name
      }, function(result) {
        if (result.error) {
          return showAlert(result.error);
        }
      });
      if (add) {
        rowEl.removeClass('tr-member-row-add');
        var blockEl = rowEl.parents('.tr-members-block');
        $('.tr-header-counter', blockEl).text($('.tr-member-row-wrap:not(.tr-member-row-add)', blockEl).size() || '');
      }
      $('.tr-member-row-wrap[data-phone="' + phone + '"]').each(function() {
        var nameEl = $('.tr-member-name-short', this);
        var inputEl = $('.tr-member-name-input', this);
        var inputDom = inputEl.get(0);
        nameEl.text(name);
        nameEl.attr('style', 'width:auto!important');
        var width = nameEl.width();
        nameEl.width(width);
        inputEl.width(width);
        inputDom.defaultValue = name;
      });
    }
    rowEl.removeClass('tr-member-row-edit');
  }
  $(document).on('submit', '.tr-member-edit-form', function(e) {
    e.preventDefault();
    var rowEl = $(this).parents('.tr-member-row-wrap');
    editMember(rowEl);
  });
  $(document).on('blur', '.tr-member-name-input', function() {
    var rowEl = $(this).parents('.tr-member-row-wrap');
    editMember(rowEl);
  });
  $(document).on('click', '.tr-member-name-short', function() {
    var rowEl = $(this).parents('.tr-member-row-wrap');
    openEditMember(rowEl);
  });
  $(document).on('click', '.add-member-btn', function() {
    var rowEl = $(this).parents('.tr-member-row-wrap');
    editMember(rowEl, true);
  });
  $(document).on('click', '.cancel-member-btn', function() {
    var rowEl = $(this).parents('.tr-member-row-wrap');
    rowEl.slideHide('remove');
  });
  $(document).on('click', '.delete-member-btn', function() {
    var blockEl = $(this).parents('.tr-members-block');
    var form = $('.tr-members-add-form', blockEl);
    var rowEl = $(this).parents('.tr-member-row-wrap');
    Aj.apiRequest('rightsDeleteAgent', {
      number: form.get(0).short_number.value,
      phone: rowEl.attr('data-phone'),
    }, function(result) {
      if (result.ok) {
        rowEl.slideHide(function() {
          $(this).remove();
          $('.tr-header-counter', blockEl).text($('.tr-member-row-wrap:not(.tr-member-row-add)', blockEl).size() || '');
        });
      }
      if (result.error) {
        return showAlert(result.error);
      }
    });
  });
});
Aj.onUnload(function(state) {
  $('.tr-members-add-form').off('submit');
  $(document).off('submit', '.tr-member-edit-form');
  $(document).off('blur', '.tr-member-name-input');
  $(document).off('click', '.tr-member-name-short');
  $(document).off('click', '.add-member-btn');
  $(document).off('click', '.cancel-member-btn');
  $(document).off('click', '.delete-member-btn');
});
}





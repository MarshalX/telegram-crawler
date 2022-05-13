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
  $.fn.isFixed = function() {
    return this.parents().map(function(){ return $(this).css('position'); }).get().indexOf('fixed') != -1;
  };
  $.fn.focusAndSelectAll = function() {
    var range = document.createRange(), field, sel;
    if (field = this.get(0)) {
      field.focus();
      range.selectNodeContents(field);
      sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    return this;
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
function urlToDataUrl(url, callback) {
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    try {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext('2d').drawImage(this, 0, 0);
      callback(canvas.toDataURL());
    } catch (e) {
      callback(false);
    }
  };
  img.onerror = function() {
    callback(false);
  };
  img.src = url;
}
function parseStr(value) {
  var arr = value.split('&'), kv, str, result = {};
  for (var i = 0; i < arr.length; i++) {
    kv = arr[i].split('=');
    result[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
  }
  return result;
}
function validateSlug(value) {
  if (value.match(/[A-Za-z0-9\-_=]{16,32}/)) {
    return true;
  }
  return false;
}

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}
function preventDefault(e) {
  e.preventDefault();
}

var Editor = {
  init: function(options) {
    Aj.onLoad(function(state) {
      state.fileContent = options.content;
      state.thumbKeys = options.thumb_keys || {};
      state.builtinSlug = options.builtin_slug || '';
      state.canEdit = options.can_edit || false;
      state.options = options;
      var mac = /Mac/.test(navigator.platform) ||
                /AppleWebKit/.test(navigator.userAgent) &&
                /Mobile\/\w+/.test(navigator.userAgent);
      $source_code = $('.th-theme-source-code');
      state.editor = CodeMirror.fromTextArea($source_code.get(0), {
        tabSize: 2,
        lineWrapping: true,
        styleActiveLine: {nonEmpty: true},
        viewportMargin: Infinity,
        readOnly: !state.canEdit,
        cursorBlinkRate: state.canEdit ? 530 : -1,
        colorpicker: {
          mode: state.canEdit ? 'edit' : 'view',
          hideDelay: 5000,
          outputFormat: 'hex',
          included_token: ['valcol', 'val'],
          colorSets: [
            { name : 'Custom', edit: true, colors: options.colorset },
          ]
        },
        extraKeys: mac ? {
          'Cmd-S': Editor.cmSave,
          'Tab': Editor.cmTab,
          'Shift-Tab': Editor.cmShiftTab
        } : {
          'Ctrl-S': Editor.cmSave,
          'Tab': Editor.cmTab,
          'Shift-Tab': Editor.cmShiftTab
        }
      });
      state.editor.setValue(options.content);
      state.editor.on('changes', Editor.onContentChange);
      $('.th-theme-source-code-wrap').fadeShow();
      $('.th-theme-save-btn').on('click', Editor.eSaveTheme);
      $('.th-theme-create-btn').on('click', Editor.eCreateThemeFormat);
      $(document).on('click.curPage', '.th-theme-import-btn', Editor.eImportFile);
      $(document).on('click.curPage', '.file-upload', stopImmediatePropagation);
      $(document).on('change.curPage', '.file-upload', Editor.eSelectImportFile);
      Aj.onBeforeUnload(function (e) {
        if (!Aj.state.editor) return false;
        var fileContent = Aj.state.editor.getValue();
        if (Aj.state.fileContent !== false &&
            Aj.state.fileContent != fileContent) {
          return 'You have unsaved changes, you really want to leave this page?';
        }
        return false;
      });
      Editor.onContentChange();
      $(window).on('scroll', Editor.onScroll);
    });
    Aj.onUnload(function(state) {
      state.editor.off('changes', Editor.onContentChange);
      $('.th-theme-save-btn').off('click', Editor.eSaveTheme);
      $('.th-theme-create-btn').off('click', Editor.eCreateThemeFormat);
      $(window).off('scroll', Editor.onScroll);
    });
  },
  cmSave: function(cm) {
    Editor.saveTheme();
  },
  cmTab: function(cm) {
    var cursor = cm.getCursor('to'), line = cursor.line, ch = cursor.ch;
    var looped = false;
    while (true) {
      var str = cm.getLine(line).split('//')[0];
      var match = /:(\s*)(.*\S|)\s*$/.exec(str), val_index = null, val_len = 0;
      if (match) {
        val_index = match.index + 1 + match[1].length;
        val_len = match[2].length;
        if (ch < val_index || ch == val_index && val_len > 0) {
          cm.doc.setSelection({line: line, ch: val_index + val_len}, {line: line, ch: val_index});
          if (Aj.state.canEdit) {
            var val = match[2], col_val = Editor.parseColor(val);
            if (col_val) {
              cm.state.colorpicker.popup_color_picker();
            } else {
              cm.state.colorpicker.close_color_picker();
            }
          }
          break;
        }
      }
      ++line; ch = 0;
      if (line >= cm.lineCount()) {
        if (looped) break;
        looped = true;
        line = 0;
      }
    }
  },
  cmShiftTab: function(cm) {
    var cursor = cm.getCursor('from'), line = cursor.line, ch = cursor.ch;
    var looped = false;
    while (true) {
      var str = cm.getLine(line).split('//')[0];
      var match = /:(\s*)(.*\S|)\s*$/.exec(str), val_index = null, val_len = 0;
      if (match) {
        val_index = match.index + 1 + match[1].length;
        val_len = match[2].length;
        if (ch > val_index + val_len || ch == val_index + val_len && val_len > 0) {
          cm.doc.setSelection({line: line, ch: val_index + val_len}, {line: line, ch: val_index});
          if (Aj.state.canEdit) {
            var val = match[2], col_val = Editor.parseColor(val);
            if (col_val) {
              cm.state.colorpicker.popup_color_picker();
            } else {
              cm.state.colorpicker.close_color_picker();
            }
          }
          break;
        }
      }
      --line; ch = Infinity;
      if (line < 0) {
        if (looped) break;
        looped = true;
        line = cm.lineCount() - 1;
      }
    }
  },
  onScroll: function() {
    var scrollTop = $(window).scrollTop();
    $('body').toggleClass('header-btn-oshow', scrollTop > 50);
  },
  onContentChange: function() {
    Editor.redrawThumb($('.th-theme-thumb'));
    Editor.updateColumns();
  },
  updateColumns: function() {
    var key_max_len = 30, key_max_el = null;
    $('.cm-keycol').each(function() {
      var key_len = $(this).text().length;
      if (key_len > key_max_len) {
        key_max_len = key_len;
        key_max_el = this;
      }
    });
    if (key_max_el) {
      key_max_el.style.minWidth = '0px';
      key_max_width = key_max_el.offsetWidth;
      key_max_el.style.minWidth = '';
    } else {
      key_max_width = 230;
    }
    var old_style = $('#th-content-style').html();
    var new_style = '.cm-keycol{min-width:' + key_max_width + 'px}';
    if (new_style != old_style) {
      $('#th-content-style').html(new_style);
    }
  },
  parseColor: function(color_value) {
    if ($.isArray(color_value)) {
      return color_value;
    }
    var color_val = $.trim(color_value), match, r, g, b, a = 1;
    if (match = color_val.match(/^(rgba?)\(\s*(\d+)\s*,\s*(\d+)\s*\s*,\s*(\d+)\s*(?:,\s*((?:0?\.)?\d+)\s*)?\)/)) {
      r = parseInt(match[2]);
      g = parseInt(match[3]);
      b = parseInt(match[4]);
      if (match[1] == 'rgba' && match[5]) {
        a = parseFloat(match[5]);
      }
      return [r, g, b, a, match[0]];
    } else if (match = color_val.match(/^#?([0-9a-f]{3,8})(?::((?:0?\.)?\d+))?/i)) {
      var val = match[1], val_len = val.length, sr, sg, sb, sa;
      if (val_len == 3 || val_len == 4) {
        sr = val.substr(0, 1); r = parseInt(sr + sr, 16);
        sg = val.substr(1, 1); g = parseInt(sg + sg, 16);
        sb = val.substr(2, 1); b = parseInt(sb + sb, 16);
        if (val_len == 4) {
          sa = val.substr(3, 1); $a = parseInt(sa + sa, 16) / 255;
        }
      } else if (val_len == 6 || val_len == 8) {
        sr = val.substr(0, 2); r = parseInt(sr, 16);
        sg = val.substr(2, 2); g = parseInt(sg, 16);
        sb = val.substr(4, 2); b = parseInt(sb, 16);
        if (val_len == 8) {
          sa = val.substr(6, 2); a = parseInt(sa, 16) / 255;
        }
      } else {
        return false;
      }
      if ((val_len == 3 || val_len == 6) && match[2]) {
        a = parseFloat(match[2]);
      }
      return [r, g, b, a, match[0]];
    }
    return false;
  },
  formatColor: function(color_value) {
    var color_arr = Editor.parseColor(color_value);
    if (!color_arr) {
      return false;
    }
    if (color_arr[3] < 1) {
      return 'rgba(' + color_arr[0] + ',' + color_arr[1] + ',' + color_arr[2] + ',' + color_arr[3] + ')';
    }
    var color_int = ((color_arr[0] & 255) << 16) | ((color_arr[1] & 255) << 8) | (color_arr[2] & 255);
    return '#' + ('000000' + color_int.toString(16)).substr(-6);
  },
  parseWallpaperValue(value) {
    var match, bg_slug, options, arr, result = {};
    if (!value) {
      return result;
    }
    if (value == 'builtin') {
      result.slug = Aj.state.builtinSlug;
    } else if (match = value.match(/^(?:https?:\/\/)?t\.me\/bg\/(\S+)/i)) {
      arr = match[1].split('?');
      if (match = arr[0].match(/^[0-9a-f]{6}-[0-9a-f]{6}$/i)) {
        result.gradient = arr[0].split('-');
        for (var k = 0; k < result.gradient.length; k++) {
          result.gradient[k] = Editor.formatColor(result.gradient[k]);
        }
        options = arr[1] ? parseStr(arr[1]) : {};
        if (options.rotation) {
          var rot = parseInt(options.rotation);
          if (rot && rot < 360 && !(rot % 45)) {
            result.rotation = parseInt(options.rotation);
          }
        }
      }
      else if (match = arr[0].match(/^[0-9a-f]{6}(~[0-9a-f]{6}){1,3}$/i)) {
        result.gradient = arr[0].split('~');
        for (var k = 0; k < result.gradient.length; k++) {
          result.gradient[k] = Editor.formatColor(result.gradient[k]);
        }
        options = arr[1] ? parseStr(arr[1]) : {};
        if (options.rotation) {
          var rot = parseInt(options.rotation);
          if (rot && rot < 360 && !(rot % 45)) {
            result.rotation = parseInt(options.rotation);
          }
        }
      }
      else if (validateSlug(arr[0])) {
        result.slug = arr[0];
        options = arr[1] ? parseStr(arr[1]) : {};
        if (options.bg_color) {
          if (match = options.bg_color.match(/^[0-9a-f]{6}-[0-9a-f]{6}$/i)) {
            result.gradient = options.bg_color.split('-');
            for (var k = 0; k < result.gradient.length; k++) {
              result.gradient[k] = Editor.formatColor(result.gradient[k]);
            }
          }
          else if (match = options.bg_color.match(/^[0-9a-f]{6}(~[0-9a-f]{6}){1,3}$/i)) {
            result.gradient = options.bg_color.split('~');
            for (var k = 0; k < result.gradient.length; k++) {
              result.gradient[k] = Editor.formatColor(result.gradient[k]);
            }
          } else {
            result.color = Editor.formatColor(options.bg_color);
          }
        }
        if (options.intensity) {
          result.intensity = parseInt(options.intensity);
        }
        if (options.rotation) {
          var rot = parseInt(options.rotation);
          if (rot && rot < 360 && !(rot % 45)) {
            result.rotation = parseInt(options.rotation);
          }
        }
        if (options.mode) {
          result.mode = options.mode;
        }
      } else if (arr[0]) {
        result.color = Editor.formatColor(arr[0]);
      }
    } else {
      result.color = Editor.formatColor(value);
    }
    return result;
  },
  formatWallpaperUrl(bg_slug) {
    return bg_slug ? location.origin + '/bg/' + bg_slug : '';
  },
  getContentValue: function(content, key) {
    if (!key) return null;
    var re = new RegExp('\\b' + cleanRE(key) + '\\s*:\\s*(.*)(?:\n|$)', 'i');
    var match = content.match(re);
    return match && match[1] || null;
  },
  redrawThumb: function($parent, callback) {
    var fileContent = Aj.state.editor.getValue();
    var wallpaper = Editor.parseWallpaperValue(Editor.getContentValue(fileContent, Aj.state.thumbKeys.bg));
    var bg_url = Editor.formatWallpaperUrl(wallpaper.slug);
    var bg_color_val = Editor.formatColor(Editor.getContentValue(fileContent, Aj.state.thumbKeys.bg_color)) || '#6ea8f3';
    var bubble_in_val = Editor.formatColor(Editor.getContentValue(fileContent, Aj.state.thumbKeys.bubble_in)) || '#fff';
    var bubble_out_val = Editor.formatColor(Editor.getContentValue(fileContent, Aj.state.thumbKeys.bubble_out)) || '#d4f1ff';
    if (wallpaper.color) {
      bg_color_val = wallpaper.color;
    } else if (wallpaper.gradient) {
      var bg_grad = $('#bg_gradient', $parent).get(0);
      if (bg_grad) {
        bg_grad.setAttribute('gradientTransform', 'rotate(' + (wallpaper.rotation || 0) + ' 0.5 0.5)');
      }
      $('#bg_gradient_color1', $parent).attr('stop-color', wallpaper.gradient[0]);
      $('#bg_gradient_color2', $parent).attr('stop-color', wallpaper.gradient[1]);
      bg_color_val = "url('#bg_gradient')";
    }
    if (wallpaper.intensity) {
      var opacity = Math.max(10, Math.min(wallpaper.intensity, 100));
      $('#thumb_bg_image', $parent).attr('opacity', opacity / 100);
    } else {
      $('#thumb_bg_image', $parent).attr('opacity', 1);
    }
    if (/\bblur\b/i.test(wallpaper.mode || '')) {
      $('#thumb_bg_image', $parent).attr('filter', 'url(\'#thumb_blur\')');
    } else {
      $('#thumb_bg_image', $parent).attr('filter', '');
    }
    $('#thumb_bg_image', $parent).attr('xlink:href', bg_url);
    $('#thumb_bg_color', $parent).attr('fill', bg_color_val);
    $('#thumb_bubble_in', $parent).attr('fill', bubble_in_val);
    $('#thumb_bubble_out', $parent).attr('fill', bubble_out_val);
    if (callback) {
      urlToDataUrl(bg_url, function(bg_url) {
        if (bg_url) {
          $('#thumb_bg_image', $parent).attr('xlink:href', bg_url);
        }
        callback();
      });
    }
  },
  prepareThumb: function(callback) {
    var $svg = $('<div><svg height="46" viewBox="0 0 74 46" width="74" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><filter id="thumb_blur"><feGaussianBlur stdDeviation="3" /></filter><defs><linearGradient id="bg_gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" id="bg_gradient_color1" /><stop offset="100%" id="bg_gradient_color2" /></linearGradient><pattern id="thumb_bg" patternUnits="userSpaceOnUse" width="74" height="46"><rect id="thumb_bg_color" fill="" width="100%" height="100%"/><image id="thumb_bg_image" xlink:href="" x="-5" y="-5" width="84" height="56" preserveAspectRatio="xMidYMid slice" /></pattern></defs><g fill="none" fill-rule="evenodd"><rect fill="url(\'#thumb_bg\')" height="46" width="74"/><rect id="thumb_bubble_in" fill="" height="12" rx="3" width="40" x="8" y="8"/><rect id="thumb_bubble_out" fill="" height="12" rx="3" width="40" x="26" y="26"/></g></svg></div>');
    Editor.redrawThumb($svg, function() {
      callback($svg.html());
    });
  },
  generateThumb: function(callback) {
    Editor.prepareThumb(function(svg) {
      var image = document.createElement('img');
      image.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
      image.addEventListener('load', function imgLoaded() {
        image.removeEventListener('load', imgLoaded);
        try {
          var canvas = document.createElement('canvas'), blob;
          canvas.width = 296;
          canvas.height = 184;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          if (canvas.toBlob) {
            canvas.toBlob(callback, 'image/jpeg', 0.92);
          } else {
            callback(dataUrlToBlob(canvas.toDataURL('image/jpeg', 0.92)));
          }
        } catch (e) {}
      });
      image.addEventListener('error', function imgFailed() {
        callback(null);
      });
    });
  },
  eCreateThemeFormat: function(e) {
    $('.th-container').removeClass('th-no-content');
  },
  eImportFile: function(e) {
    if (!Aj.state.canEdit) return;
    e && e.stopImmediatePropagation();
    e && e.preventDefault();
    $('<input type="file" class="file-upload hide">').appendTo(this).click();
  },
  eSelectImportFile: function(e) {
    if (!Aj.state.canEdit) return;
    var input       = this;
    var $import_btn = $('.th-theme-import-btn');
    var theme_raw   = $import_btn.attr('data-theme-raw');
    var format      = $import_btn.attr('data-format');
    var data        = new FormData();
    var fileContent = Aj.state.editor.getValue();
    var theme_name  = Editor.getContentValue(fileContent, 'name') || '';
    var theme_shortname = Editor.getContentValue(fileContent, 'shortname') || '';
    data.append('method', 'importFile');
    data.append('theme_name', theme_name);
    data.append('theme_shortname', theme_shortname);
    data.append('format', format);
    data.append('file', input.files[0]);
    $import_btn.prop('disabled', true);
    $.ajax(Aj.apiUrl, {
      type: 'POST',
      enctype: 'multipart/form-data',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function(result) {
        $import_btn.prop('disabled', false);
        if (result._dlog) {
          $('#dlog').append(result._dlog);
        }
        if (result.error) {
          return showAlert(result.error);
        }
        if (result.content) {
          Aj.state.editor.setValue(result.content);
          Editor.onContentChange();
          $('.th-container').removeClass('th-no-content');
        }
      },
      error: function(xhr) {
        if (xhr.status == 401) {
          location.href = '/auth';
        } else {
          location.reload();
        }
      }
    });
  },
  eSaveTheme: function(e) {
    e.preventDefault();
    Editor.saveTheme();
  },
  saveTheme: function() {
    var $save_btn = $('.th-theme-save-btn');
    if (Aj.state.saving) {
      return false;
    }
    var content = Aj.state.editor.getValue();
    if (!content) {
      Aj.state.editor.focus();
      return false;
    }
    var file = new Blob([content], {type: 'text/plain'});
    $save_btn.prop('disabled', true);
    Aj.state.saving = true;
    Aj.state.savingContent = content;
    Editor.generateThumb(function (thumb) {
      Editor.saveThemeRequest(file, thumb);
    });
    return false;
  },
  saveThemeRequest: function(file, thumb, payload) {
    var $save_btn = $('.th-theme-save-btn');
    var theme_raw = $save_btn.attr('data-theme-raw');
    var format    = $save_btn.attr('data-format');
    var data      = new FormData();
    data.append('method', 'saveTheme');
    data.append('theme_raw', theme_raw);
    data.append('format', format);
    data.append('content', file, 'content');
    data.append('thumb', thumb, 'thumb');
    if (payload) {
      data.append('payload', payload);
    }
    $.ajax(Aj.apiUrl, {
      type: 'POST',
      enctype: 'multipart/form-data',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function(result) {
        if (result._dlog) {
          $('#dlog').append(result._dlog);
        }
        if (result.need_pack) {
          return Editor.packFile(result.need_pack, thumb, result.payload);
        }
        $save_btn.prop('disabled', false);
        Aj.state.saving = false;
        if (result.error) {
          return showAlert(result.error);
        }
        Aj.state.fileContent = Aj.state.savingContent;
        var cur_loc = Aj.location();
        if (result.slug && cur_loc.pathname != '/theme/' + result.slug) {
          cur_loc.pathname = '/theme/' + result.slug;
          return Aj.location(cur_loc.href);
        }
        if (result.title) {
          $('.js-theme-title').html(result.title);
        }
      },
      error: function(xhr) {
        if (xhr.status == 401) {
          location.href = '/auth';
        } else {
          location.reload();
        }
      }
    });
    return false;
  },
  packFile: function(files, thumb, payload) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (file.url) {
        return JSZipUtils.getBinaryContent(file.url, function(err, data) {
          if (err) {
            $('.th-theme-save-btn').prop('disabled', false);
            Aj.state.saving = false;
            return showAlert('Can\'t fetch file');
          }
          file.content = data;
          delete file.url;
          Editor.packFile(files, thumb, payload);
        });
      }
    }
    var zip = new JSZip();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      zip.file(file.name, file.content, {binary: file.binary});
    }
    zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE'
    }).then(function (zip_file) {
      Editor.saveThemeRequest(zip_file, thumb, payload);
    });
  }
};


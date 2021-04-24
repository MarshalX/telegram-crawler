var $header                = $('header');
var $header_panel          = $('#header-panel');
var $progress_bar          = $('#progress-bar');
var $section_list          = $('#section-list');
var $url_form              = $('#url-form');
var $url_field             = $('#url-field');
var $url_share             = $('#url-share');
var $url_mark_btn          = $('#url-mark-btn');
var $reload_link           = $('#reload-link');
var $original_section      = $('#original-section');
var $original_loaded_label = $('#original-loaded-label');
var $original_wrap         = $('#original-wrap');
var $original_frame        = $('#original-frame');
var $original_popup_button = $('#original-popup-button');
var $rules_wrap            = $('#rules-wrap');
var $rules_header          = $('#rules-header');
var $rules_section         = $('#rules-section');
var $rules_field           = $('#rules-field');
var $save_link             = $('#save-link');
var $after_rules_field     = $('#after-rules-field');
var $result_section        = $('#result-section');
var $result_preview_wrap   = $('#result-preview-wrap');
var $result_wrap           = $('#result-wrap');
var $result_frame          = $('#result-frame');
var $result_preview        = $('#result-preview');
var $footer                = $('#footer');
var $debug_block           = $('#debug-block');
var $debug_wrap            = $('#debug-wrap');
var $status_section        = $('#status-section');
var $status_wrap           = $('#status-wrap');
var $process_time          = $('#process-time');

var original_frame = $original_frame.get(0);
var result_frame   = $result_frame.get(0);

var App = {};
var Popups = [];

function apiRequest(method, data, onSuccess, try_num) {
  $.ajax(App.baseUrl, {
    type: 'POST',
    data: $.extend(data, {method: method}),
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: onSuccess,
    error: function(xhr) {
      if (xhr.status == 401) {
        location.href = '/auth';
      } else if (xhr.status >= 500) {
        try_num = try_num || 0;
        if (++try_num < 5) {
          setTimeout(function() {
            apiRequest(method, data, onSuccess, try_num);
          }, 300 * try_num);
        }
      } else {
        location.reload();
      }
    }
  });
}

function escapeHtml(text) {
  var map = {
    '&':  '&amp;',
    '<':  '&lt;',
    '>':  '&gt;',
    '"':  '&quot;',
    "'":  '&#039;',
    "\n": '<br>'
  };
  return text.replace(/[&<>"'\n]/g, function(m){ return map[m]; });
}

function showProgress($el) {
  clearTimeout($el.data('to'));
  var to         = setTimeout(showProgress, 400, $el),
      value      = $el.data('value') || 0,
      next_value = value + (99 - value) / 4;
  if (!value) {
    $el.addClass('no-transition').css('width', 0);
    $el.offset();
    $el.removeClass('no-transition');
  }
  $el.data('to', to).data('value', next_value);
  $el.removeClass('no-shown').css('width', value + '%');
}

function hideProgress($el, cancel) {
  clearTimeout($el.data('to'));
  $el.data('to', false).data('value', 0);
  $el.css('width', cancel ? '0%' : '100%');
  setTimeout(function() { $el.addClass('no-shown'); }, 400);
}

function setDebug(debug_items) {
  var debug_block = $debug_block.get(0);
  if (debug_block) {
    var st = debug_block.scrollTop;
    var sb = Math.max(0, debug_block.scrollHeight - debug_block.offsetHeight);
    $debug_wrap.html(debug_items.join(''));
    if (st == sb) {
      debug_block.scrollTop = debug_block.scrollHeight;
    }
    $footer.toggleClass('more', debug_items.length > 0);
    if (debug_items.length > 0 && !App.state.footer_collapsed) {
      $footer.removeClass('collapsed');
      debug_block.scrollTop = debug_block.scrollHeight;
    }
    if (!debug_items.length) {
      $footer.addClass('collapsed');
    }
  }
}
function setStatus(status) {
  if ($status_wrap.html() != status) {
    $status_wrap.html(status);
  }
}

function openPopup(popup) {
  if (!popup) return false;
  var $popup = $(popup);
  var popup_id = $popup.data('puid');
  if (!popup_id) {
    if (!Popups._pid) Popups._pid = 0;
    popup_id = ++Popups._pid;
    $popup.data('puid', popup_id);
  }
  var i = Popups.indexOf(popup_id);
  if (i >= 0) {
    Popups.splice(i, 1);
  }
  Popups.push(popup_id);
  $('body').css('overflow', 'hidden');
  $popup.appendTo('body');
  $popup.removeClass('hide');
  // $popup.on('click', function(e) {
  //   if (!$(e.target).closest('.popup').length) {
  //     closePopup($popup);
  //   }
  // });
  $('.popup-cancel-btn', $popup).on('click', function(e) {
    closePopup($popup);
  });
  $popup.trigger('popup:open');
}

function closePopup(popup) {
  if (!Popups.length) return false;
  var $popup, popup_id;
  if (popup) {
    $popup = $(popup);
    popup_id = $popup.data('puid');
  } else {
    popup_id = Popups.pop();
    var $popups = $('.popup-container');
    var found = false;
    for (var i = 0; i < $popups.length; i++) {
      $popup = $popups.eq(i);
      if (popup_id == $popup.data('puid')) {
        found = true
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  var i = Popups.indexOf(popup_id);
  if (i >= 0) {
    Popups.splice(i, 1);
  }
  if (!Popups.length) {
    $('body').css('overflow', '');
  }
  // $popup.off('click');
  $('.popup-cancel-btn', $popup).off('click');
  $popup.addClass('hide');
  $popup.trigger('popup:close');
}

$(document).on('keydown', function(e) {
  if (e.keyCode == 27 && Popups.length > 0) {
    closePopup();
  }
});
$(document).on('keydown', 'textarea', function(e) {
  if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
    $(this.form).submit();
  }
});

function showAlert(html, options) {
  options = options || {};
  var $alert = $('<div class="popup-container hide alert-popup-container"><div class="popup"><div class="popup-body"><section><p class="popup-text"></p><div class="popup-buttons">' + (options.second_btn ? '<a' + (options.second_btn_href ? ' href="' + options.second_btn_href + '"' : '') + ' class="btn btn-link btn-lg">' + options.second_btn + '</a>' : '') + '<a class="btn btn-link btn-lg popup-cancel-btn">' + (options.close_btn || 'Close') + '</a></div></section></div></div></div>');
  $('.popup-text', $alert).html(html);
  $alert.on('popup:close', function() {
    $alert.remove();
  });
  openPopup($alert);
}

function showConfirm(html, onConfirm, confirm_btn) {
  var $confirm = $('<div class="popup-container hide alert-popup-container"><div class="popup"><div class="popup-body"><section><p class="popup-text"></p><div class="popup-buttons"><a class="btn btn-link btn-lg popup-cancel-btn">Cancel</a><a class="btn btn-link btn-lg popup-primary-btn">' + (confirm_btn || 'OK') + '</a></div></section></div></div></div>');
  $('.popup-text', $confirm).html(html);
  $('.popup-primary-btn', $confirm).on('click', function() {
    onConfirm && onConfirm($confirm);
    closePopup($confirm);
  });
  $confirm.on('popup:close', function() {
    $('.popup-primary-btn', $confirm).off('click');
    $confirm.remove();
  });
  openPopup($confirm);
}

function openUrlField(no_focus) {
  $header.addClass('url-form-opened');
  if (!no_focus) {
    $url_field.focus();
  }
  $url_field.select();
}

function closeUrlField() {
  $header.removeClass('url-form-opened');
}

function initFrameRegions(frame, no_edit, regions) {
  sendPostMessage(frame, {event: 'init_regions', no_edit: no_edit || false, regions: regions || ''});
}

function updateFrame(frame, doc_url) {
  frame.onload = function(e) {
    e.target.loaded = true;
    if (frame.onloadCallbacks && frame.onloadCallbacks.length > 0) {
      for (var i = 0; i < frame.onloadCallbacks.length; i++) {
        frame.onloadCallbacks[i]();
      }
    }
  }
  frame.src = doc_url;
  return frame;
}

function updateOriginalFrame() {
  updateFrame(original_frame, App.state.original_doc_url);
  updateOriginalLabels();
}

function updateOriginalLabels() {
  var time_label = $original_loaded_label.attr('data-time') || '';
  var date_label = $original_loaded_label.attr('data-date') || '';
  var label = formatDate(App.state.loaded_date, time_label, date_label);
  $original_loaded_label.text(label);

  $original_section.removeClass('original-loading');
  if (!App.state.rules_id) {
    $original_section.addClass('original-loaded');
  }
  $original_section.toggleClass('original-saved', !!App.state.original_saved);
  $original_section.toggleClass('original-readonly', !!(App.state.readonly || App.state.demo));
}

function updateResult() {
  updateFrame(result_frame, App.state.result_doc_url);

  $result_preview_wrap.toggleClass('hide', !App.state.preview_html);
  if (App.state.result_empty) {
    $result_preview.html(App.state.preview_html);
    $result_wrap.addClass('collapsed');
  } else {
    if (!App.state.result_collapsed) {
      setTimeout(function() {
        $result_preview.html(App.state.preview_html);
      }, 200);
      $result_wrap.removeClass('collapsed');
    } else {
      $result_preview.html(App.state.preview_html);
    }
  }

  if (App.state.checked) {
    $result_section.attr('class', 'result-not-modified');
    $url_mark_btn.addClass('disabled').removeClass('btn-primary');
  } else {
    if (App.state.can_check) {
      if (App.state.not_tracked) {
        $result_section.attr('class', 'result-not-tracked');
      } else {
        $result_section.attr('class', 'result-modified');
      }
    } else {
      $result_section.attr('class', App.state.is_error ? 'result-error' : '');
    }
    if (App.state.can_check && App.state.can_add) {
      $url_mark_btn.addClass('btn-primary').removeClass('disabled');
    } else {
      $url_mark_btn.addClass('disabled').removeClass('btn-primary');
    }
  }
  $url_mark_btn.text($url_mark_btn.attr(App.state.not_tracked ? 'data-track' : 'data-mark'));
  $result_section.toggleClass('result-readonly', !$url_mark_btn.length);
  if (App.state.is_error) {
    $url_share.addClass('disabled').removeClass('btn-info');
  } else {
    $url_share.addClass('btn-info').removeClass('disabled');
  }
  $result_section.removeClass('result-processing');

  if (App.state.result_debug) {
    setDebug(App.state.result_debug);
  }
  if (App.state.result_status) {
    setStatus(App.state.result_status);
  }
  if (App.state.process_time) {
    $process_time.html(App.state.process_time);
  }
  if (App.state.mark_after_process) {
    App.state.mark_after_process = false;
    if (!$url_mark_btn.hasClass('disabled')) {
      markUrlAsChecked();
    }
  }
}

function sendPostMessage(frame, data) {
  try {
    if (frame.loaded) {
      frame.contentWindow.postMessage(JSON.stringify(data), App.frameOrigin);
    } else {
      if (!frame.onloadCallbacks) frame.onloadCallbacks = [];
      frame.onloadCallbacks.push(function() {
        frame.contentWindow.postMessage(JSON.stringify(data), App.frameOrigin);
      });
    }
  } catch(e) {}
}

function postMessageHandler(event) {
  if (event.source !== original_frame.contentWindow &&
      event.source !== result_frame.contentWindow ||
      event.origin != App.frameOrigin) {
    return;
  }
  try {
    var data = JSON.parse(event.data);
  } catch(e) {
    var data = {};
  }
  if (data.event == 'regions_change') {
    if (event.source === original_frame.contentWindow) {
      App.state.originalRegions = data.regions;
    } else if (event.source === result_frame.contentWindow) {
      App.state.resultRegions = data.regions;
    }
  } else if (data.event == 'link_click') {
    $url_field.val(data.url);
    $url_form.submit();
  }
}
window.onmessage = postMessageHandler;

function initIssuePage(url, page_data) {
  App.state = {
    result_url:       url,
    original_doc_url: false,
    sections:         [],
    rules:            '',
    saved_rules:      false,
    section:          page_data.section || '',
    rules_id:         page_data.rules_id || 0,
    issue_id:         page_data.issue_id || 0,
    originalRegions:  '',
    resultRegions:    ''
  };

  var regions = (page_data.regions || '').split(';');
  var original_regions = regions[0];
  var result_regions = regions[1];

  updateFrame(original_frame, page_data.original_doc_url);
  initFrameRegions(original_frame, true, original_regions);

  updateFrame(result_frame, page_data.result_doc_url);
  initFrameRegions(result_frame, true, result_regions);

  var result_collapsed = false;
  $result_preview_wrap.toggleClass('hide', !page_data.preview_html);
  if (page_data.result_empty) {
    $result_preview.html(page_data.preview_html);
    $result_wrap.addClass('collapsed');
  } else {
    if (!result_collapsed) {
      setTimeout(function() {
        $result_preview.html(page_data.preview_html);
      }, 200);
      $result_wrap.removeClass('collapsed');
    } else {
      $result_preview.html(page_data.preview_html);
    }
  }
  if (page_data.is_error) {
    $url_share.addClass('disabled').removeClass('btn-info');
  } else {
    $url_share.addClass('btn-info').removeClass('disabled');
  }

  $result_preview_wrap.click(function(e) {
    $result_wrap.toggleClass('collapsed');
    result_collapsed = $result_wrap.hasClass('collapsed');
  });

  $('.issue-comment-photo').click(function(e) {
    var src = $(this).attr('data-src');
    var $alert = $('<div class="popup-container hide photo-popup-container"><div class="popup-image-wrap"><img class="popup-image" /></div></div>');
    $('img', $alert).attr('src', src);
    $alert.on('popup:open', function() {
      $alert.on('click', function(e) {
        closePopup($alert);
      });
    });
    $alert.on('popup:close', function() {
      $alert.off('click');
      $alert.remove();
    });
    openPopup($alert);
  });

  initOriginalPopupButton();
}

function updateRulesField() {
  if (!App.editor) return;
  var field_value = App.editor.getValue();
  if (App.state.saved_rules !== false && App.state.saved_rules != field_value) {
    $rules_section.addClass('rules-changed');
  } else {
    $rules_section.removeClass('rules-changed');
  }
}

function reloadOriginal() {
  apiRequest('reloadOriginal', {
    url:     App.state.result_url,
    section: App.state.section
  }, onReloadOriginal);
}

function onReloadOriginal(result) {
  if (!result.error) {
    App.state.pending = true;
    loadUrlData();
  } else {
    showAlert(result.error);
  }
}

function saveRules() {
  clearTimeout(App.state.rules_timeout);
  processRules(App.editor.getValue());
}

function acHint(cm, callback, option) {
  var cursor = cm.getCursor(), line = cm.getLine(cursor.line);
  var start = cursor.ch, end = cursor.ch;
  if (end < line.length && /[a-z0-9_]/i.test(line.charAt(end))) {
    return;
  }
  while (start && /[a-z0-9_]/i.test(line.charAt(start - 1))) {
    --start;
  }
  var before = line.slice(0, start), comp;
  var tab = (before.match(/^\s+/) || [''])[0];
  before = before.replace(/^\s+/, '');
  if (before == '?' || before == '!') {
    comp = App.autocomplete.conditions;
  } else if (before == '@') {
    comp = [].concat(App.autocomplete.functions);
    for (var j = 0; j < App.autocomplete.block_functions.length; j++) {
      var text = App.autocomplete.block_functions[j];
      comp.push({text: text + '(  ) {\n' + tab + '  \n' + tab + '}', displayText: text, ch_offset: text.length + 2, hint: function(cm, data, completion) {
        cm.replaceRange(completion.text, data.from, data.to, 'complete');
        cm.doc.setCursor(CodeMirror.Pos(data.from.line, data.from.ch + (completion.ch_offset || 0)));
      }});
    }
  } else if (before == '~') {
    comp = [];
    for (var j = 0; j < App.autocomplete.options.length; j++) {
      var opt = App.autocomplete.options[j];
      if (typeof opt === 'string') {
        opt = {text: opt};
      }
      var defValue = opt.defValue || '';
      comp.push({text: opt.text + ': "' + defValue + '"', displayText: opt.text, ch_offset: opt.text.length + 3, ch_len: defValue.length, hint: function(cm, data, completion) {
        cm.replaceRange(completion.text, data.from, data.to, 'complete');
        var from = data.from.ch + (completion.ch_offset || 0);
        var to   = from + (completion.ch_len || 0);
        cm.doc.setSelection(CodeMirror.Pos(data.from.line, to), CodeMirror.Pos(data.from.line, from));
      }});
    }
  } else if (!before && end - start > 0) {
    comp = App.autocomplete.properties;
  } else if (/[\s:,]\$$/i.test(before)) {
    comp = getVariables();
  } else {
    return;
  }
  var prefix = line.slice(start, end).toLowerCase();
  var list = [];
  for (var i = 0; i < comp.length; i++) {
    var cmp = comp[i].displayText || comp[i];
    if (cmp == prefix && !comp[i].displayText) continue;
    if (cmp.indexOf(prefix) == 0) list.push(comp[i]);
  }
  if (!list.length) return;
  return callback({
    list: list,
    from: CodeMirror.Pos(cursor.line, start),
    to:   CodeMirror.Pos(cursor.line, end)
  });
}
acHint.async = true;

function getVariables() {
  var variables = {'$': 1, '@': 1};
  for (var i = 0; i < App.editor.lineCount(); i++) {
    var tokens = App.editor.getLineTokens(i);
    for (var j = 0; j < tokens.length; j++) {
      if (tokens[j].type == 'variable-2') {
        var variable = tokens[j].string;
        if (variable [0] == '$') {
          variable = variable.substr(1);
        }
        variables[variable] = 1;
      }
    }
  }
  var list = Object.keys(variables);
  list.sort();
  return list;
}

function betterTab(shift) {
  if (shift) {
    return function(cm) {
      cm.indentSelection('subtract');
    };
  }
  return function(cm) {
    if (cm.somethingSelected()) {
      cm.indentSelection('add');
    } else {
      if (cm.getOption('indentWithTabs')) {
        cm.replaceSelection('\t', 'end', '+input');
      } else {
        cm.execCommand('insertSoftTab');
      }
    }
  };
}
function duplicate() {
  return function(cm) {
    var current_cursor = cm.doc.getCursor('to');
    if (cm.somethingSelected()) {
      var sel_content = cm.doc.getSelection();
      cm.doc.setCursor(current_cursor);
      cm.doc.replaceSelection(sel_content, 'around');
    } else {
      var line_content = cm.doc.getLine(current_cursor.line);
      CodeMirror.commands.goLineEnd(cm);
      CodeMirror.commands.newlineAndIndent(cm);
      cm.doc.replaceSelection(line_content);
      cm.doc.setCursor(current_cursor.line + 1, current_cursor.ch);
    }
  }
};

function formatDate(timestamp, time_format, date_format) {
  if (!timestamp) return '';
  var cur = new Date();
  var date = new Date(timestamp * 1000);
  if (+cur - date < 79200000) {
    var hours = date.getHours();
    var mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;
    return (time_format || '')
      .replace('{hours}', (hours % 12) || 12)
      .replace('{mins}', mins)
      .replace('{am_pm}', (hours < 12 ? 'AM' : 'PM'));
  }
  var day = date.getDate();
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
  var year = (+cur - date < 14688000000) ? '' : date.getFullYear();
  return (date_format || '')
    .replace('{date}', day)
    .replace('{month}', month)
    .replace('{year}', year)
    .replace(/\s+$/, '');
}

function initWorkspace(url, url_data) {
  App.state = {
    result_url:       url,
    original_doc_url: false,
    sections:         [],
    rules:            '',
    saved_rules:      false,
    contest:          url_data.contest || false,
    originalRegions:  '',
    resultRegions:    ''
  };
  App.autocomplete = {
    conditions: ['domain', 'domain_not', 'path', 'path_not', 'exists', 'not_exists', 'false', 'true'],
    functions: ['debug', 'remove', 'match', 'replace', 'urlencode', 'urldecode', 'htmlencode', 'htmldecode', 'datetime', 'set_attr', 'set_attrs', 'style_to_attrs', 'background_to_image', 'json_to_xml', 'html_to_dom', 'prepend_to', 'append_to', 'before_el', 'after_el', 'prepend', 'append', 'before', 'after', 'replace_tag', 'wrap', 'wrap_inner', 'clone', 'detach', 'split_parent', 'pre', 'combine', 'inline', 'load', 'unsupported', 'simplify'],
    block_functions: ['if', 'if_not', 'map', 'repeat', 'while', 'while_not'],
    properties: ['title', 'subtitle', 'kicker', 'author', 'author_url', 'published_date', 'description', 'image_url', 'document_url', 'cover', 'channel', 'site_name', 'body'],
    options: [{text: 'version', defValue: '2.1'}, 'allowed_origin']
  };

  var mac = /Mac/.test(navigator.platform) ||
            /AppleWebKit/.test(navigator.userAgent) &&
            /Mobile\/\w+/.test(navigator.userAgent);

  if ($rules_field.length) {
    App.editor = CodeMirror.fromTextArea($rules_field.get(0), {
      mode: 'instantview',
      tabSize: 2,
      lineWrapping: true,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      viewportMargin: 50,
      readOnly: 'nocursor',
      extraKeys: mac ? {
        'Cmd-D': duplicate(), 'Shift-Cmd-D': duplicate(),
        'Cmd-S': saveRules, 'Cmd-/': 'toggleComment',
        'Tab': betterTab(), 'Shift-Tab': betterTab(true),
        "Alt-F": 'findPersistent'
      } : {
        'Ctrl-D': duplicate(), 'Shift-Ctrl-D': duplicate(),
        'Ctrl-S': saveRules, 'Ctrl-/': 'toggleComment',
        'Tab': betterTab(), 'Shift-Tab': betterTab(true),
        "Alt-F": 'findPersistent'
      }
    });
    App.editor.on('change', function() {
      updateRulesField();
      clearTimeout(App.state.rules_timeout);
      App.state.rules_timeout = setTimeout(saveRules, 5000);
      App.editor.showHint({hint: acHint, completeSingle: false});
    });
    App.afterTpl = CodeMirror.fromTextArea($after_rules_field.get(0), {
      mode: 'instantview',
      tabSize: 2,
      lineWrapping: true,
      lineNumbers: true,
      viewportMargin: 1000,
      readOnly: true,
      cursorBlinkRate: -1
    });
  } else {
    App.editor = false;
    App.afterTpl = false;
  }

  $url_mark_btn.click(function() {
    if ($url_mark_btn.hasClass('disabled')) {
      return;
    }
    markUrlAsChecked();
  });

  $rules_header.click(function(e) {
    $rules_wrap.toggleClass('collapsed');
  });

  $reload_link.click(function(e) {
    e.preventDefault();
    reloadOriginal();
  });

  $save_link.click(function(e) {
    e.preventDefault();
    saveRules();
  });

  $result_preview_wrap.click(function(e) {
    $result_wrap.toggleClass('collapsed');
    App.state.result_collapsed = $result_wrap.hasClass('collapsed');
  });

  $debug_wrap.on('click', '.rule-ref', function() {
    var ref = $(this).text().split(':');
    var source = ref[0];
    var after_tpl = (source == '..after');
    var collapsed = $rules_wrap.hasClass('collapsed');
    var timeout = 0;
    if (!collapsed != !after_tpl) {
      $rules_wrap.toggleClass('collapsed', after_tpl);
      timeout = 150;
    }
    setTimeout(function() {
      var cm = after_tpl ? App.afterTpl : App.editor;
      var ln = ref[1].split('-');
      var line_from = ln[0] - 1, line_to = ln[1] ? ln[1] - 1 : line_from;
      if (line_from >= 0 && line_to >= 0) {
        var y = cm.heightAtLine(line_from, 'local');
        var ch = cm.getScrollInfo().clientHeight;
        var scroll_top = y - (ch - cm.defaultTextHeight() * (line_to - line_from + 1)) / 2;
        cm.scrollTo(null, scroll_top);
        for (var l = line_from; l <= line_to; l++) {
          cm.doc.addLineClass(l, 'text', 'line-highlight');
        }
        setTimeout(function() {
          for (var l = line_from; l <= line_to; l++) {
            cm.doc.removeLineClass(l, 'text', 'line-highlight');
          }
        }, 50);
      }
    }, timeout);
  });

  $status_section.click(function(e) {
    if (!$footer.hasClass('more')) {
      return;
    }
    $footer.toggleClass('collapsed');
    App.state.footer_collapsed = $footer.hasClass('collapsed');
  });

  window.onbeforeunload = function (e) {
    if (App.state.popup) {
      try { App.state.popup.close(); } catch(e) {}
    }
    if (!App.editor) return;
    var field_value = App.editor.getValue();
    if (App.state.saved_rules !== false && App.state.saved_rules != field_value) {
      var message = 'You have unsaved changes, you really want to leave this page?';
      if (typeof e === 'undefined') e = window.e;
      if (e) {
        e.returnValue = message;
      }
      return message;
    }
  }

  initOriginalPopupButton();
  showProgress($progress_bar);
  onLoadUrlData(url_data);
}

function initOriginalPopupButton() {
  $original_popup_button.attr('href', App.state.result_url);
  $original_popup_button.click(function(e) {
    if (e.metaKey || e.ctrlKey) return true;
    e.preventDefault();
    var winX = window.screenLeft ? window.screenLeft : window.screenX;
    var winY = window.screenTop  ? window.screenTop  : window.screenY;
    var winH = window.outerHeight;
    var popupW = $original_wrap.outerWidth(),
        popupH = winH - 200,
        popupX = winX + $original_wrap.offset().left,
        popupY = winY + 100,
        params = [
          'width=' + popupW,
          'height=' + popupH,
          'left=' + popupX,
          'top=' + popupY,
        ].join(',');
      var popup = App.state.popup;
      if (popup && !popup.closed) {
        if (App.state.popup_url != App.state.result_url) {
          App.state.popup_url = App.state.result_url;
          popup.location.href = App.state.popup_url;
        }
        try {
          popup.resizeTo(popupW, popupH);
          popup.moveTo(popupX, popupY);
        } catch(e) {}
      } else {
        App.state.popup_url = App.state.result_url;
        App.state.popup = window.open(App.state.popup_url, 'iv-original', params);
      }
      if (App.state.popup) {
        try { App.state.popup.focus(); } catch(e) {}
      }
  });
}

function loadUrlData() {
  if (!App.state.pending) {
    return;
  }
  clearTimeout(App.state.timeout);
  $original_section.addClass('original-loading');
  App.editor && App.editor.setOption('readOnly', 'nocursor');
  $url_mark_btn.addClass('disabled').removeClass('btn-primary');
  apiRequest('getUrlData', {
    url:      App.state.result_url,
    section:  App.state.section,
    rules_id: App.state.rules_id
  }, onLoadUrlData);
}

function onLoadUrlData(url_data) {
  if (url_data.pending) {
    clearTimeout(App.state.timeout);
    App.state.pending  = true;
    App.state.section  = url_data.section;
    App.state.rules_id = url_data.rules_id || '';
    App.state.timeout  = setTimeout(loadUrlData, 1000);
  }
  else if (url_data.error) {
    hideProgress($progress_bar, true);
    showAlert(url_data.error);
  }
  else {
    if (App.state.result_url != url_data.result_url) {
      location.href = '?url=' + encodeURIComponent(url_data.result_url);
      return;
    }
    App.state.pending          = false;
    App.state.original_doc_url = url_data.original_doc_url || '';
    App.state.original_saved   = url_data.original_saved || false;
    App.state.loaded_date      = url_data.loaded_date || 0;
    App.state.section          = url_data.section || '';
    App.state.rules_id         = url_data.rules_id || '';
    App.state.rules            = false;
    App.state.readonly         = url_data.readonly;
    App.state.demo             = url_data.demo;
    App.state.saved_rules      = App.state.rules;

    if (App.editor) {
      App.editor.setValue(url_data.rules);
      App.editor.setOption('readOnly', !!App.state.readonly);
      App.editor.setOption('cursorBlinkRate', App.state.readonly ? -1 : 530);
    }

    updateOriginalFrame();
    processRules(url_data.rules);
  }
}

function processRules(rules) {
  if (App.state.rules === rules) {
    return;
  }
  App.state.rules           = rules;
  App.state.random_id       = false;

  showProgress($progress_bar);
  $rules_section.addClass('rules-saving');
  $result_section.addClass('result-processing');
  return processPageByRules();
}

function processPageByRules() {
  clearTimeout(App.state.process_timeout);
  apiRequest('processByRules', {
    url:       App.state.result_url,
    section:   App.state.section,
    rules:     App.state.random_id ? '' : App.state.rules,
    rules_id:  App.state.rules_id,
    random_id: App.state.random_id || ''
  }, onProcessPageByRules);
}

function onProcessPageByRules(page_data) {
  if (typeof page_data.saved_rules !== 'undefined') {
    App.state.saved_rules = page_data.saved_rules;
    $rules_section.removeClass('rules-saving');
    if (App.state.demo) {
      $rules_section.addClass('rules-demo');
    } else if (App.state.readonly) {
      $rules_section.addClass('rules-readonly');
    } else {
      $rules_section.addClass('rules-saved');
    }
    updateRulesField();
  }
  if (page_data.pending) {
    clearTimeout(App.state.process_timeout);
    App.state.random_id = page_data.random_id;
    if (page_data.debug) {
      setDebug(page_data.debug);
    }
    if (page_data.status) {
      setStatus(page_data.status);
    }
    if (page_data.process_time) {
      $process_time.html(page_data.process_time);
    }
    App.state.process_timeout = setTimeout(processPageByRules, 400);
  }
  else if (page_data.error) {
    hideProgress($progress_bar, true);
    $rules_section.removeClass('rules-saving');
    $result_section.removeClass('result-processing');
    App.state.mark_after_process = false;
    showAlert(page_data.error);
  }
  else {
    hideProgress($progress_bar);
    App.state.random_id      = page_data.random_id;
    App.state.result_empty   = page_data.result_empty;
    App.state.result_doc_url = page_data.result_doc_url;
    App.state.preview_html   = page_data.preview_html;
    App.state.result_debug   = page_data.debug;
    App.state.result_status  = page_data.status;
    App.state.process_time   = page_data.process_time;
    App.state.checked        = page_data.checked;
    App.state.can_check      = page_data.can_check;
    App.state.not_tracked    = page_data.not_tracked;
    App.state.can_add        = page_data.can_add;
    App.state.is_error       = page_data.result_error;
    if (page_data.original_saved) {
      App.state.original_saved = true;
      updateOriginalLabels();
    }
    updateResult();
    if (!page_data.contest) {
      onUpdateSectionList(page_data.section_data);
    }
    $(document).trigger('iv:result:updated');
  }
}

function markUrlAsChecked() {
  apiRequest('markUrlAsChecked', {
    url:       App.state.result_url,
    section:   App.state.section,
    random_id: App.state.random_id
  }, onMarkUrlAsChecked);
}

function onMarkUrlAsChecked(result) {
  if (!result.error) {
    if (result) {
      if (result.contest_ready) {
        $('.contest-ready-tooltip-wrap').removeClass('tooltip-hidden');
        $('.contest-ready-tooltip-wrap').click(function() {
          var $tt = $(this);
          $tt.addClass('tooltip-hidden');
          setTimeout(function(){ $tt.remove(); }, 1000);
        });
      }
      $result_section.attr('class', App.state.not_tracked ? 'result-tracked' : 'result-saved');
      $url_mark_btn.addClass('disabled').removeClass('btn-primary');
      $url_mark_btn.text($url_mark_btn.attr('data-mark'));
      App.state.original_saved = true;
      updateOriginalLabels();
      updateSectionList();
    } else {
      $url_mark_btn.addClass('disabled').removeClass('btn-primary');
      var field_value = App.editor.getValue();
      if (App.state.saved_rules != field_value) {
        return saveRules();
      }
      App.state.random_id = false;
      App.state.mark_after_process = true;
      showProgress($progress_bar);
      $result_section.addClass('result-processing');
      return processPageByRules();
    }
  } else {
    showAlert(result.error);
  }
}

function updateSectionList() {
  clearTimeout(App.state.list_timeout);
  apiRequest('getSectionData', {
    url:       App.state.result_url,
    section:   App.state.section
  }, onUpdateSectionList);
}

function onUpdateSectionList(section_data) {
  if (!section_data || section_data.values.updating) {
    clearTimeout(App.state.list_timeout);
    if (!App.state.list_tries) {
      App.state.list_tries = 0;
    }
    App.state.list_tries++;
    if (App.state.list_tries < 30) {
      App.state.list_timeout = setTimeout(updateSectionList, 700);
    } else {
      App.state.list_tries = 0;
    }
  } else {
    App.state.list_tries = 0;
  }
  $section_list.html(section_data.items);
  for (var key in section_data.values) {
    var val = section_data.values[key];
    $('#count-' + key).width(val + '%').toggleClass('no-shown', !val);
  }
}



function initHeader() {
  $url_field.keydown(function(e) {
    if (e.keyCode == 27) {
      $url_form.get(0).reset();
      closeUrlField();
      e.preventDefault();
      return;
    }
  });
  $url_field.focus(function(e) {
    openUrlField(true);
  });
  $('.url-status').click(function(e) {
    openUrlField();
  });
  $('.dropdown', $url_form).on('show.bs.dropdown', function() {
    closeUrlField();
  });
  $(document).click(function(e) {
    if ($(e.target).closest('#url-form .input-dropdown, .url-status').length) {
      return;
    }
    closeUrlField();
  });
}

function updateNavBar() {
  var $nav_menu = $('.nav-menu');
  $nav_menu.addClass('nav-menu-can-fix');
  if ($nav_menu.css('position') == 'fixed') {
    $nav_menu.width($nav_menu.parent().width());
  } else {
    $nav_menu.css('width', 'auto');
  }
}

function initRulesList() {
  $('main.rules section .list-group-row').click(function(e) {
    e.preventDefault();
    $(this).addClass('hide');
    $('+ .list-group', this).removeClass('hide');
  });
  $('main.rules .list-group button.close').click(function(e) {
    e.preventDefault();
    var $btn = $(this);
    showConfirm(App.lang.delete_url_confirmation, function() {
      var url = $btn.attr('data-url');
      var section = $btn.parents('section').attr('data-section');
      apiRequest('deleteUrlData', {
        url:     url,
        section: section
      }, function(result) {
        if (!result.error) {
          var $list_group = $btn.parents('.list-group');
          var $section = $btn.parents('section');
          $btn.parents('.list-group-item').remove();
          if (!$('.list-group-item', $list_group).length) {
            $section.remove();
          }
          $('.contest-btn', $section).toggleClass('inactive', !result.contest_ready);
        } else {
          showAlert(result.error);
        }
      });
    }, App.lang.delete_url_confirm_button);
  });
  $('main.rules section .contest-btn').click(function(e) {
    e.preventDefault();
    var $btn = $(this);
    if ($btn.hasClass('inactive')) {
      return showAlert(App.lang.not_ready_for_contest_alert);
    }
    var confirm_text = ($btn.hasClass('in-contest') ? App.lang.submit_for_contest_confirmation : App.lang.submit_template_confirmation) || '';
    var confirm_btn = ($btn.hasClass('in-contest') ? App.lang.submit_for_contest_confirm_button : App.lang.submit_template_confirm_button) || '';
    var section = $btn.parents('section').attr('data-section');
    confirm_text = confirm_text.replace(/\{domain\}/g, section);
    showConfirm(confirm_text, function() {
      apiRequest('sendToContest', {
        section: section
      }, function(result) {
        if (!result.error) {
          if (result) {
            var $label1 = $btn.parents('.contest-label1-wrap');
            var $label2 = $label1.next('.contest-label2-wrap');
            var $status = $('.contest-rules-status', $label2);
            $status.html('');
            $label2.removeClass('hide');
            $('.contest-resend-btn', $label2).addClass('hide');
            $label1.addClass('hide');
            if (result.ok) {
              $status.html(result.status || '');
              showAlert(result.ok, result.ok_options);
            }
          }
        } else {
          showAlert(result.error);
        }
      });
    }, confirm_btn);
  });
  $('main.rules section .contest-remove-btn').click(function(e) {
    e.preventDefault();
    var $btn = $(this);
    var $label2 = $(this).parents('.contest-label2-wrap');
    var confirm_text = ($btn.hasClass('in-contest') ? App.lang.revoke_from_contest_confirmation : App.lang.revoke_template_confirmation) || '';
    var confirm_btn = ($btn.hasClass('in-contest') ? App.lang.revoke_from_contest_confirm_button : App.lang.revoke_template_confirm_button) || '';
    showConfirm(confirm_text, function() {
      var section = $label2.parents('section').attr('data-section');
      apiRequest('removeFromContest', {
        section: section
      }, function(result) {
        if (!result.error) {
          if (result) {
            var $label1 = $label2.prev('.contest-label1-wrap');
            var $status = $('.contest-rules-status', $label1);
            $status.html('');
            $label1.removeClass('hide');
            $('.contest-resend-btn', $label2).addClass('hide');
            $label2.addClass('hide');
            if (result.ok) {
              $status.html(result.status || '');
            }
          }
        } else {
          showAlert(result.error);
        }
      });
    }, confirm_btn);
  });
  $('main.rules section .contest-resend-btn').click(function(e) {
    e.preventDefault();
    var $btn = $(this);
    var confirm_text = ($btn.hasClass('in-contest') ? App.lang.resubmit_for_contest_confirmation : App.lang.resubmit_template_confirmation) || '';
    var confirm_btn = ($btn.hasClass('in-contest') ? App.lang.resubmit_for_contest_confirm_button : App.lang.resubmit_template_confirm_button) || '';
    var section = $btn.parents('section').attr('data-section');
    confirm_text = confirm_text.replace(/\{domain\}/g, section);
    showConfirm(confirm_text, function() {
      apiRequest('removeFromContest', {
        section: section
      }, function(result) {
        if (result.error) {
          return showAlert(result.error);
        }
        $btn.addClass('hide');
        setTimeout(function() {
          apiRequest('sendToContest', {
            section: section
          }, function(result) {
            if (result.error) {
              showAlert(result.error);
            } else if (result.ok) {
              showAlert(result.ok, result.ok_options);
              var $label2 = $btn.parents('.contest-label2-wrap');
              $('.contest-rules-status', $label2).html(result.status || '');
            }
          });
        }, 1500);
      });
    }, confirm_btn);
  });
  $(document).on('click', '.list-feedback-message-more', function(e) {
    e.preventDefault();
    var $btn = $(this);
    var section = $btn.parents('section').attr('data-section');
    var url_hash = $btn.attr('data-url-hash');
    var offset = $btn.attr('data-offset');
    apiRequest('getFeedbackComments', {
      section: section,
      url_hash: url_hash,
      offset: offset
    }, function(result) {
      if (!result.error) {
        if (result.comments) {
          $btn.parents('.list-feedback-message').after(result.comments);
        }
        $btn.remove();
      } else {
        showAlert(result.error);
      }
    });
  });
}

function initDeadlines() {
  if (!App.deadlineInitTime) {
    App.deadlineInitTime = Math.floor((new Date()).getTime() / 1000);
    setTimeout(updateDeadlines, 100);
  }
}

function formatDeadLinePeriod(period, short) {
  if (period <= 0) {
    return short ? 'checking' : '0 sec';
  }
  var hours = Math.floor(period / 3600);
  if (hours > 1) {
    return hours + (short ? 'h left' : ' hours');
  }
  var mins = Math.floor(period / 60);
  if (mins > 1) {
    return mins + (short ? 'm left' : ' min');
  }
  return period + (short ? 's left' : ' sec');
}

function updateDeadlines() {
  var nowTime = Math.floor((new Date()).getTime() / 1000);
  $('.iv-deadline[data-period]').map(function() {
    var period = this.getAttribute('data-period');
    var short = this.getAttribute('data-short');
    period -= nowTime - App.deadlineInitTime;
    var text = formatDeadLinePeriod(period, short);
    if (this.innerText != text) {
      if ($(this).hasClass('highlight')) {
        $(this).toggleClass('soon', period > 0 && period < 86400);
      }
      $(this).text(text);
    }
    return this;
  });
  setTimeout(updateDeadlines, 100);
}

$('body').removeClass('no-transition');

/*!
  Autosize 3.0.20
  license: MIT
  http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),s="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(s)&&(s=0),l()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,e.style.overflowY=t}function o(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}function r(){var t=e.style.height,n=o(e),r=document.documentElement&&document.documentElement.scrollTop;e.style.height="auto";var i=e.scrollHeight+s;return 0===e.scrollHeight?void(e.style.height=t):(e.style.height=i+"px",u=e.clientWidth,n.forEach(function(e){e.node.scrollTop=e.scrollTop}),void(r&&(document.documentElement.scrollTop=r)))}function l(){r();var t=Math.round(parseFloat(e.style.height)),o=window.getComputedStyle(e,null),i=Math.round(parseFloat(o.height));if(i!==t?"visible"!==o.overflowY&&(n("visible"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))):"hidden"!==o.overflowY&&(n("hidden"),r(),i=Math.round(parseFloat(window.getComputedStyle(e,null).height))),a!==i){a=i;var l=d("autosize:resized");try{e.dispatchEvent(l)}catch(e){}}}if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!i.has(e)){var s=null,u=e.clientWidth,a=null,p=function(){e.clientWidth!==u&&l()},c=function(t){window.removeEventListener("resize",p,!1),e.removeEventListener("input",l,!1),e.removeEventListener("keyup",l,!1),e.removeEventListener("autosize:destroy",c,!1),e.removeEventListener("autosize:update",l,!1),Object.keys(t).forEach(function(n){e.style[n]=t[n]}),i.delete(e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",c,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",l,!1),window.addEventListener("resize",p,!1),e.addEventListener("input",l,!1),e.addEventListener("autosize:update",l,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",i.set(e,{destroy:c,update:l}),t()}}function o(e){var t=i.get(e);t&&t.destroy()}function r(e){var t=i.get(e);t&&t.update()}var i="function"==typeof Map?new Map:function(){var e=[],t=[];return{has:function(t){return e.indexOf(t)>-1},get:function(n){return t[e.indexOf(n)]},set:function(n,o){e.indexOf(n)===-1&&(e.push(n),t.push(o))},delete:function(n){var o=e.indexOf(n);o>-1&&(e.splice(o,1),t.splice(o,1))}}}(),d=function(e){return new Event(e,{bubbles:!0})};try{new Event("test")}catch(e){d=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}var l=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(l=function(e){return e},l.destroy=function(e){return e},l.update=function(e){return e}):(l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},l.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e}),t.exports=l});

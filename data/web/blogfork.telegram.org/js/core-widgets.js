function fixColor(color) {
  color = color.toUpperCase();
  if (color.length == 1 || color.length == 2) {
    color = color + color + color;
  } else if (color.length > 3 && color.length < 6) {
    color = color.substr(0, 3);
  } else if (color.length > 6) {
    color = color.substr(0, 6);
  }
  return color;
}

function isColorLight(color, k) {
  var hsl = rgb2hsl(color);
  if (typeof k === 'undefined') k = 0.8;
  if (k > 0) return (hsl.l > k);
  return (hsl.l < (1 + k));
}

function rgb2hsl(rgb) {
  rgb = fixColor(rgb);
  if (rgb.length == 3) {
    rgb = rgb[0] + rgb[0] + rgb[1] + rgb[1] + rgb[2] + rgb[2];
  }
  var r = parseInt(rgb.substr(0, 2), 16);
  var g = parseInt(rgb.substr(2, 2), 16);
  var b = parseInt(rgb.substr(4, 2), 16);
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {h: h, s: s, l: l};
}

var PostWidget = {
  options: {},
  init: function(options) {
    var form = $('#post_widget_config').get(0);
    if (!form) return;
    PostWidget.options = options || {};
    $('.form-telegram input.form-control[type="text"]').on('change blur', function() {
      PostWidget.update();
    });
    $('.form-telegram input.radio, .form-telegram input.checkbox').on('change', function() {
      var is_dark = (this.getAttribute('name') == 'dark');
      PostWidget.update(is_dark);
    });
    $('.widget-accent-color-item input.radio').on('change', function() {
      if (this.value == 'custom') {
        $('.widget-accent-color-field').select();
      }
      PostWidget.update();
    });
    $('.widget-accent-color-field').on('input', function() {
      var val = this.value;
      this.value = val.toUpperCase().replace(/[^0-9A-F]+/g, '');
      var color = fixColor(this.value);
      $('.widget-color-circle-custom').css('color', color ? '#' + color : '').toggleClass('light', isColorLight(color)).toggleClass('bordered', isColorLight(color, 0.95));
    });
    $('.widget-accent-color-field').on('focus', function() {
      $('.widget-accent-color-item .radio[value="custom"]').prop('checked', true);
      PostWidget.update();
    });
    PostWidget.update();
    initRipple();
  },
  update: function(toggle_dark) {
    var options = PostWidget.options || {};
    var form = $('#post_widget_config').get(0);
    if (!form) return;
    var tfi = $('#post_link').parents('.textfield-item');
    var post_link = $('#post_link').val() || options.default_link,
        match;
    if (match = post_link.match(/^(?:(?:https?):\/\/)?(?:t\.me|telegram\.me|telegram\.dog)\/([a-zA-Z0-9_]+\/\d+)(?:\?(.*))?$/i)) {
      var post_id = match[1], suffix = match[2] || '';
      var querystring = suffix.split('#')[0];
      var str_values = querystring.split('&');
      var query = {};
      for (var i = 0; i < str_values.length; i++) {
        var key_value = str_values[i].split('=');
        var key = decodeURIComponent(key_value[0]);
        var value = key_value.length > 1 ? decodeURIComponent(key_value[1]) : null;
        query[key] = value;
      }
      var single = typeof query.single !== 'undefined';
      var comment_id = parseInt(query.comment);
    } else {
      tfi.addClass('is-invalid');
      $('#post_link_error').html(options.link_error);
      $('#post_link').one('input', function() {
        tfi.removeClass('is-invalid');
      });
      return;
    }
    tfi.removeClass('is-invalid');
    var width = form.width.value;
    if (!width) width = '100%';
    var author_photo = form.author_photo.value;
    var dark = form.dark.checked;
    var dark_colors = {};
    $('.widget-accent-color-item[data-color]').each(function() {
      var color = $(this).attr('data-color');
      var dark_color = $(this).attr('data-dark-color');
      var bg_color = $(this).attr(dark ? 'data-dark-color' : 'data-bg-color');
      var text = $(this).attr(dark ? 'data-dark-text' : 'data-text');
      var cur_color = dark && dark_color ? dark_color : color;
      dark_colors[color] = dark_color;
      $('.widget-color-circle', this).css('backgroundColor', '#' + bg_color).toggleClass('light', isColorLight(cur_color)).toggleClass('bordered', isColorLight(cur_color, 0.95));
      if (text) {
        $('.widget-color-label', this).text(text);
      }
    });
    var color = form.color.value;
    var dark_color = '';
    var customcolor = form.customcolor.value;
    if (color == 'default') {
      color = '';
      dark_color = '';
    } else if (color == 'custom') {
      color = fixColor(customcolor);
      if (color != customcolor) {
        form.customcolor.value = color;
        $('.widget-color-circle-custom').css('color', color ? '#' + color : '').toggleClass('light', isColorLight(color)).toggleClass('bordered', isColorLight(color, 0.95));
      }
      dark_color = color;
    } else {
      dark_color = dark_colors[color] || color;
    }
    if (!color) {
      color = '';
      dark_color = '';
      $('.widget-accent-color-item .radio[value="default"]').prop('checked', true);
      var custom_default = form.customcolor.defaultValue;
      form.customcolor.value = custom_default;
      $('.widget-color-circle-custom').css('color', custom_default ? '#' + custom_default : '').toggleClass('light', isColorLight(custom_default)).toggleClass('bordered', isColorLight(custom_default, 0.95));
    }
    var code = '<script async src="' + options.widget_script + '" data-telegram-post="' + escapeHTML(post_id) + '"' + (comment_id ? ' data-comment="' + comment_id + '"' : '') + ' data-width="' + escapeHTML(width) + '"' + (author_photo ? ' data-userpic="' + author_photo + '"' : '') + (single ? ' data-single' : '') + (color ? ' data-color="' + color + '"' : '') + (dark ? ' data-dark="1"' : '') + (dark_color && dark_color != color ? ' data-dark-color="' + dark_color + '"' : '') + '></script>';
    $('#embed_code').val(code);
    $('#embed_code').height(0);
    $('#embed_code').height($('#embed_code').get(0).scrollHeight);
    if (PostWidget.lastCode != code) {
      PostWidget.lastCode = code;
      $('#widget_container').toggleClass('dark', !!dark);
      if (toggle_dark) {
        var frame = $('#widget_container iframe').get(0);
        Telegram.setWidgetOptions({dark: dark}, frame);
      } else {
        $('#widget_container').html(code);
      }
    }
  }
};

var DiscussionWidget = {
  options: {},
  init: function(options) {
    var form = $('#discussion_widget_config').get(0);
    if (!form) return;
    DiscussionWidget.options = options || {};
    $('.form-telegram input.form-control[type="text"]').on('change blur', function() {
      DiscussionWidget.update();
    });
    $('.form-telegram input.checkbox').on('change', function() {
      var is_dark = (this.getAttribute('name') == 'dark');
      DiscussionWidget.update(is_dark);
    });
    $('.widget-accent-color-item input.radio').on('change', function() {
      if (this.value == 'custom') {
        $('.widget-accent-color-field').select();
      }
      DiscussionWidget.update();
    });
    $('.widget-accent-color-field').on('input', function() {
      var val = this.value;
      this.value = val.toUpperCase().replace(/[^0-9A-F]+/g, '');
      var color = fixColor(this.value);
      $('.widget-color-circle-custom').css('color', color ? '#' + color : '').toggleClass('light', isColorLight(color)).toggleClass('bordered', isColorLight(color, 0.95));
    });
    $('.widget-accent-color-field').on('focus', function() {
      $('.widget-accent-color-item .radio[value="custom"]').prop('checked', true);
      DiscussionWidget.update();
    });
    DiscussionWidget.update();
    initRipple();
  },
  update: function(toggle_dark) {
    var options = DiscussionWidget.options || {};
    var form = $('#discussion_widget_config').get(0);
    if (!form) return;
    var tfi = $('#post_link').parents('.textfield-item');
    var post_link = $('#post_link').val() || options.default_link,
        match;
    var post_full_id = '', post_id = 0;
    if (match = post_link.match(/^(?:(?:https?):\/\/)?(?:t\.me|telegram\.me|telegram\.dog)\/([a-zA-Z0-9_]+(\/\d+)?)/i)) {
      post_full_id = match[1];
      post_id = match[2] || 0;
    } else {
      tfi.addClass('is-invalid');
      $('#post_link_error').html(options.link_error);
      $('#post_link').one('input', function() {
        tfi.removeClass('is-invalid');
      });
      return;
    }
    $('.canonical-helper', form).toggleClass('hide', !!post_id);
    tfi.removeClass('is-invalid');
    var limit = parseInt(form.comments_limit.value) || 5;
    var real_limit = Math.max(3, Math.min(50, limit));
    form.comments_limit.value = real_limit;
    var height = parseInt(form.height.value) || 0;
    var real_height = height > 0 ? Math.max(300, height) : 0;
    form.height.value = real_height || '';
    var dark = form.dark.checked;
    var dark_colors = {};
    $('.widget-accent-color-item[data-color]').each(function() {
      var color = $(this).attr('data-color');
      var dark_color = $(this).attr('data-dark-color');
      var bg_color = $(this).attr(dark ? 'data-dark-color' : 'data-bg-color');
      var text = $(this).attr(dark ? 'data-dark-text' : 'data-text');
      var cur_color = dark && dark_color ? dark_color : color;
      dark_colors[color] = dark_color;
      $('.widget-color-circle', this).css('backgroundColor', '#' + bg_color).toggleClass('light', isColorLight(cur_color)).toggleClass('bordered', isColorLight(cur_color, 0.95));
      if (text) {
        $('.widget-color-label', this).text(text);
      }
    });
    var color = form.color.value;
    var dark_color = '';
    var customcolor = form.customcolor.value;
    if (color == 'default') {
      color = '';
      dark_color = '';
    } else if (color == 'custom') {
      color = fixColor(customcolor);
      if (color != customcolor) {
        form.customcolor.value = color;
        $('.widget-color-circle-custom').css('color', color ? '#' + color : '').toggleClass('light', isColorLight(color)).toggleClass('bordered', isColorLight(color, 0.95));
      }
      dark_color = color;
    } else {
      dark_color = dark_colors[color] || color;
    }
    if (!color) {
      color = '';
      dark_color = '';
      $('.widget-accent-color-item .radio[value="default"]').prop('checked', true);
      var custom_default = form.customcolor.defaultValue;
      form.customcolor.value = custom_default;
      $('.widget-color-circle-custom').css('color', custom_default ? '#' + custom_default : '').toggleClass('light', isColorLight(custom_default)).toggleClass('bordered', isColorLight(custom_default, 0.95));
    }
    var colorful = form.colorful.checked;
    var code = '<script async src="' + options.widget_script + '" data-telegram-discussion="' + escapeHTML(post_full_id) + '" data-comments-limit="' + escapeHTML(real_limit.toString()) + '"' + (real_height > 0 ? ' data-height="' + escapeHTML(real_height.toString()) + '"' : '') + (colorful ? ' data-colorful="1"' : '') + (color ? ' data-color="' + color + '"' : '') + (dark ? ' data-dark="1"' : '') + (dark_color && dark_color != color ? ' data-dark-color="' + dark_color + '"' : '') + '></script>';
    $('#embed_code').val(code);
    $('#embed_code').height(0);
    $('#embed_code').height($('#embed_code').get(0).scrollHeight);
    if (DiscussionWidget.lastCode != code) {
      DiscussionWidget.lastCode = code;
      $('#widget_container').toggleClass('dark', !!dark);
      if (toggle_dark) {
        var frame = $('#widget_container iframe').get(0);
        Telegram.setWidgetOptions({dark: dark}, frame);
      } else {
        $('#widget_container').html(code);
      }
    }
  }
};

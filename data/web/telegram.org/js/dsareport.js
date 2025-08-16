var DSA = {
  options: {},
  init: function(options) {
    DSA.options = options || {};
    Dialog.init();
  },
  eUpdateField: function(e) {
    var $fieldEl = $(this);
    if (e.type == 'focus' || e.type == 'focusin') {
      DSA.updateField($fieldEl, true);
    } else if (e.type == 'blur' || e.type == 'focusout') {
      DSA.updateField($fieldEl, false);
    } else {
      DSA.updateField($fieldEl);
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
    DSA.updateField($(this));
  },
  apiRequest: function(method, data, onSuccess) {
    return $.ajax(DSA.options.apiUrl, {
      type: 'POST',
      data: $.extend(data, {method: method}),
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function(result) {
        if (result._dlog) {
          $('#dlog').append(result._dlog);
        }
        onSuccess && onSuccess(result);
      },
      error: function(xhr) {
        if (!xhr.readyState && !xhr.status) {
          // was aborted
        } else if (xhr.status == 401) {
          location.href = '/auth';
        } else if (xhr.readyState > 0) {
          location.reload();
        }
      }
    });
  }
};

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}
function preventDefault(e) {
  e.preventDefault();
}

var Login = {
  init: function(options) {
    Telegram.Login.init(options, function(user) {
      Login.authRequest(user);
    });
  },
  open: function() {
    Telegram.Login.open();
  },
  authRequest: function(data) {
    $.ajax('/dsa-report/auth', {
      type: 'POST',
      data: data,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function(result, s, xhr) {
        if (result.pending) {
          setTimeout(function() {
            Login.authRequest(data);
          }, 200);
        } else {
          location.reload();
        }
      }
    });
  },
  doLogout: function (e) {
    e && e.preventDefault();
    var logout_hash = $(this).attr('data-logout-hash');
    authRequest({logout_hash: logout_hash});
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
            type == 'video/mp4' ||
            type == 'application/pdf' ||
            type == 'application/msword' ||
            type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  },
  addFiles: function($form, files) {
    var form = $form.get(0),
        $files = $('.bt-issue-files', $form),
        limit = DSA.options.fileLimit || 5,
        size_limit = DSA.options.fileSizeLimit || 1048576,
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
              var thumb_src = DSA.options.uploadBaseUrl + file.thumb_src;
              $file_thumb.css('background-image', "url('" + thumb_src + "')");
            }
            if (file.src) {
              var src = DSA.options.uploadBaseUrl + file.src;
              $file_thumb.wrap('<a href="' + src + '" class="bt-view-media" data-width="' + (file.width || '') + '" data-height="' + (file.height || '') + '" data-cover="' + (file.cover_src || '') + '"' + (file.is_video ? ' data-video' : '') + ' target="_blank" tabindex="-1" />');
            }
            $('<input type="hidden" name="file">').value(file.file_data).prependTo($file);
            $file_loaded.slideXHide('remove');
            $file.removeClass('file-loading').addClass('file-loaded');
          }, function onProgress(loaded, total) {
            var progress = total ? loaded / total : 0;
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
      url: DSA.options.uploadUrl,
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
    var limit = DSA.options.fileLimit || 5;
    if ($(this.form.file).values().length >= limit) {
      showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
      return false;
    }
    $('<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" class="file-upload hide" multiple>').appendTo(this).click();
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

var Dialog = {
  init: function() {
    var $cont = $('.bt-dialog');
    var $form = $('.cd-comment-form');
    $('.bt-form-input .cd-form-control', $form).on('focus blur keyup change input', DSA.eUpdateField);
    $('.bt-attach-btn', $form).on('focus blur', DSA.eUpdateField);
    $('input.checkbox,input.radio', $form).on('focus blur', DSA.eUpdateField);
    $('.bt-issue-files', $form).on('update', DSA.onFilesUpdate);
    $form.on('change.curPage', '.file-upload', Upload.eSelectFile);
    $form.on('click.curPage', '.bt-attach-btn', Upload.eAttachFile);
    $form.on('click.curPage', '.file-upload', stopImmediatePropagation);
    $form.on('click.curPage', '.cd-issue-file-close', Upload.eDeleteFile);
    $('.bt-form-input > div.input[contenteditable]', $form).initTextarea();
    $('.cd-input-field > div.input[contenteditable]', $form).initTextarea();
    $('.bt-issue-files', $form).trigger('update');

    $($cont).on('click.curPage', '.bt-init-dialog-btn', Dialog.eInitDialog);
    $($cont).on('submit.curPage', '.cd-comment-form', Dialog.eSubmitCommentForm);
    $($cont).on('paste.curPage', '.cd-comment-form', Upload.eFilePaste);
    $($cont).on('change.curPage', '.cd-dialog-options .radio', Dialog.eSelectOption);
  },
  updateOptions: function(e) {
    $('.cd-dialog-options').slice(0, -1).each(function() {
      $(this).addClass('disabled');
      $('.radio', this).prop('disabled', true);
    });
  },
  updateMessages: function(result) {
    $('.cd-comment-form').toggleClass('hide', !result.need_text_reply);
    $('.cd-comment-input-wrap').toggleClass('with-attach', !!result.need_file_reply);
    $('.bt-restart-form').toggleClass('hide', !result.need_restart);
    if (result.messages_html) {
      var $comments = $(result.messages_html);
      var $commentsWrap = $('.bt-comments');
      if (result.replace) {
        $commentsWrap.empty();
      }
      $comments.appendTo($commentsWrap);
      Dialog.updateOptions();
      $('.bt-comments .bt-comment').last().scrollIntoView({position: 'top', padding: -1});
    }
  },
  eInitDialog: function(e) {
    e.preventDefault();
    var $button = $(this);
    var init_hash = $button.attr('data-init-hash');
    if ($button.prop('disabled')) {
      return false;
    }
    $button.prop('disabled', true);
    DSA.apiRequest('initDialog', {
      init_hash: init_hash
    }, function(result) {
      $button.prop('disabled', false);
      if (result.error) {
        return showAlert(result.error);
      }
      location.reload();
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
    DSA.apiRequest('selectDialogOption', {
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
    var limit = DSA.options.fileLimit || 1;
    if (files.length > limit) {
      showAlert(l('WEB_TOO_MANY_FILES', {limit: limit}));
      return false;
    }
    if ($form.data('submiting')) {
      return false;
    }
    $form.data('submiting', true);
    $button.prop('disabled', true);
    DSA.apiRequest('sendDialogMessage', {
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

var BotList = {
  init() {
    $('input[name=query]').on('input', BotList.eSearchInput);
    $('.js-form-clear').on('click', function () {
      $('input', this.closest('.tm-field')).val('').trigger('input');
    });
  },
  eSearchInput() {
    var value = this.value || '';
    var empty = true;
    $('.tm-row').each((i, el) => {
      let hide = el.classList.contains('tm-row-add') || !fuzzyMatch(value, el.textContent);
      hide = hide && !!value;
      empty = empty && hide;
      $(el).toggleClass('hidden', hide);
    });
    $('.js-results-empty').toggleClass('hidden', !empty);
    $('.js-results-empty-help').text(l('WEB_BOTFATHER_NO_RESULTS_INFO', {query: value}))
  }
}

var CreateBot = {
  init() {
    WebApp.MainButton.onClick(CreateBot.submit);
    WebApp.MainButton.setText('Create Bot');
    WebApp.MainButton.show();

    Aj.onUnload(() => {
      WebApp.MainButton.offClick(CreateBot.submit);
      WebApp.MainButton.hide();
    });

    Aj.state.files = {};

    Aj.onLoad(() => {
      Aj.state.username_valid = false;
    });

    $('#bot_form').on('input', CreateBot.validateForm);

    var usernameDebounce = Aj.state.usernameDebounce = debounce();

    $('input[name=username]').on('change', (ev) => {
      usernameDebounce(CreateBot.checkUsername, 0);
    });
    $('.js-upload-button').click(CreateBot.uploadUserpic);
    
    $('input[name=username]').on('input', (ev) => {
      var $hint = $('.hint-text[data-for=username]');
      $hint.attr('class', 'hint-text hint-text-loading');
      $hint.text('Checking username');
      usernameDebounce(CreateBot.checkUsername, 400);
    })

  },
  checkUsername() {
    var $hint = $('.hint-text[data-for=username]');
    var $input = $('input[name=username]');
    var value = $input.val();
    $hint.attr('class', 'hint-text hint-text-loading');
    $hint.text('Checking username');
    Aj.apiRequest('checkBotUsername', { username: value }, res => {
      if ($input.val() !== value) return;
      if (res.ok) {
        Aj.state.username_valid = true;
        $hint.attr('class', 'hint-text hint-text-success');
        $hint.text(value + ' is available.');
      } else {
        Aj.state.username_valid = false;
        $hint.attr('class', 'hint-text hint-text-error');
        $hint.html(res.error);
      }
    });
  },
  uploadUserpic() {
    let replace = this.dataset.replace ? $(this.dataset.replace) : $(this);
    let target = this.dataset.target;

    requestUpload('bot_userpic', res => { 
      if (res.ok) {
        $(this).attr('src', res.media.src);
      }
    });
  },
  submit() {
    var title = $('input[name="title"]').val()?.trim();

    if (!title) {
      TWebApp.showErrorToast('Name is required.');
      var title = $('input[name="title"]').focus();
      return;
    }

    if (!Aj.state.username_valid) {
      TWebApp.showErrorToast('Username is required.');
      var title = $('input[name="username"]').focus();
      return;
    }

    WebApp.MainButton.showProgress();
    Aj.apiRequest('createBot', {
        title: title,
        about: $('textarea[name="about"]').val(),
        username: $('input[name="username"]').val(),
        userpic: Aj.state.files?.['bot_userpic']?.photo_id || '',
    }, res => {
        WebApp.MainButton.hideProgress();
        if (res.ok) {
          Aj.location(`/botfather/bot/${res.bot_id}`);
          Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        }
        if (res.error) {
          TWebApp.showErrorToast(res.error);
        }
    });
  }
}

var BotProfile = {
  init() {
    Aj.state.files ||= {};
    WebApp.MainButton.setText(l('WEB_PROFILE_UPDATE'));
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotProfile.eMainClick);

    Aj.state.savedModel = BotProfile.model();

    $(document).on('click.curPage', '.js-set-lang', BotProfile.eClickLang);

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotProfile.eMainClick);
    });

    Aj.onBeforeUnload(() => {
      if (BotProfile.hasChanges()) {
        return uncleanHTML(l('WEB_UNSAVED_CHANGES'));
      }
    });

    $('textarea[name=welcome_msg]').on('input', function () {
      var value = this.value.trim();
      $('.tm-welcome-message-content').text(value);
    });

    $('.js-delete-welcome-pic').on('click', BotProfile.eClickRemoveWelcomePic);
    $('.js-upload-button').on('click', BotProfile.eUploadClick);
    $('.js-welcome-pic').on('click', function (e) {
      if ($(this).hasClass('empty')) {
        e.stopPropagation();
        var $upload_btn = $('.js-upload-button[data-target=welcome_msg_pic]');
        BotProfile.eUploadClick.call($upload_btn[0]);
      }
    });
  },
  setWelcomePic(src, loading = false) {
    $pic = $('.js-welcome-pic');
    if (!src) {
      $pic.attr('style', '').addClass('empty');
      Aj.state.files['welcome_msg_pic'] = 0;
      return;
    }

    $pic.removeClass('empty');

    var blur = loading ? 'blur(15px)' : 'blur(0px)';
    $pic.css({ 
      'background-image': `url(${src})`,
      'background-size': 'cover',
      'filter': blur,
      'border': 'none',
    });  
  },
  eClickRemoveWelcomePic() {
    BotProfile.setWelcomePic(false);
  },
  eUploadClick() {
    var target = this.dataset.target;
    if (!target) return;

    if (Aj.state.lang) {
      WebApp.showAlert('Media localization is not available. Please switch to default localization.');
      return;
    }

    if (target == 'bot_userpic') {
      requestUpload(target, res => {
        if (res.ok) {
          $('.tm-main-intro-picture').attr('src', res.media.src);
        }
      }); 
    }

    var bg = null;
    if (target == 'welcome_msg_pic') {
      requestUpload(target, res => {
        if (res.cancel) {
          return;
        }
        if (!res.ok) {
          BotProfile.setWelcomePic(false);
          return;
        }
        BotProfile.setWelcomePic(bg || res.media.src);
      }, 
      {
        onSelected(file) {
          if (!file) return;
          var src = URL.createObjectURL(file);
          bg = src;
          BotProfile.setWelcomePic(src, true);
        }
      });
    }
  },
  eClickLang() {
    var lang = $(this).data('value');
    if (lang == Aj.state.lang) return;
    var href = '?lang=' + lang;

    if (BotProfile.hasChanges()) {
      WebApp.showPopup({
        message: 'Do you want to apply current changes?',
        buttons: [
          { type: 'default', text: 'Save', id: 'save' },
          { type: 'cancel' },
          { type: 'destructive', text: 'Don\'t save', id: 'ignore' },
        ]
      }, button_id => {
        if (button_id == 'ignore') {
          Aj.state.savedModel = BotProfile.model();
          Aj.location(href);
        } else if (button_id == 'save') {
          BotProfile.submit(href);
        }
      });
      return;
    }

    Aj.location(href);
  },
  hasChanges() {
    var old = Aj.state.savedModel;
    var model = BotProfile.model();
    return JSON.stringify(old) != JSON.stringify(model);
  },
  model() {
    return {
      bid: Aj.state.botId,
      title: $('input[name=title]').val(),
      about: $('textarea[name=about]').val(),
      userpic: Aj.state.files['bot_userpic']?.photo_id || '',
      welcome_msg: $('textarea[name=welcome_msg]').val(),
      welcome_msg_pic: Aj.state.files['welcome_msg_pic']?.photo_id || '',
      lang_code: Aj.state.lang,
    };
  },
  eMainClick() {
    BotProfile.submit(`/botfather/bot/${Aj.state.botId}`);
  },
  submit(redirect = false) {
    WebApp.MainButton.showProgress();
    var model = BotProfile.model();
    Aj.apiRequest('updateBotProfile', {...model}, res => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.state.savedModel = model;
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        if (redirect) {
          Aj.location(redirect);          
        }
      }
      if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
    })
  }
}

var BotCommandsList = {
  init() {
    $('.js-edit-command-list').sortable({items: '.js-sortable'}).on('sortchange', function( event, ui ) {
      WebApp.HapticFeedback.selectionChanged();
    });

    Aj.state.edit = false;
    $('.js-edit-command-list').sortable('disable');

    $(document).on('click.curPage', '.js-set-lang', function (e) {
      var lang = $(this).data('value');
      if (lang == Aj.state.lang) return;
      var href = '?lang=' + lang;
      Aj.location(href);
    });

    $('.js-edit-command-list').on('click', '.tm-row-close', function(e) {
      e.stopPropagation()
      this.closest('.tm-row')?.remove();
      WebApp.HapticFeedback.impactOccurred('light');
      if ($('.js-sortable').length == 0) {
        BotCommandsList.toggleEdit(false);
        $('.js-commands-header').addClass('hidden');
      }
    });

    $('.js-edit-command-list').on('click', '.tm-row-link', function () {
      var command = this.dataset.command;
      if (!Aj.state.edit && command) {
        var q = Aj.state.lang ? '?lang=' + Aj.state.lang : '';
        Aj.location('/botfather/bot/' + Aj.state.botId + '/commands/' + command + q);
      }
    });

    Aj.state.$editBtn = $('.edit-button').on('click', BotCommandsList.toggleEdit);
  },
  toggleEdit(value) {
    var edit = value !== undefined ? !Aj.state.edit : value;
    Aj.state.edit = edit;
    if (!edit) {
      BotCommandsList.submit();
    }
    $('.js-edit-command-list').toggleClass('list-prevent-edit', !edit);
    $('.js-edit-command-list').sortable(edit ? 'enable' : 'disable');
    Aj.state.$editBtn.text(edit ? l('WEB_COMMANDS_DONE_BTN') : l('WEB_COMMANDS_EDIT_BTN'));
  },
  submit() {
    var commands = $('.js-edit-command-list .js-sortable').toArray().map(el => {
      var name = $('.js-command-name', el).text().replace('/', '');
      return name;
    });

    Aj.apiRequest('reorderCommands', { 
      bid: Aj.state.botId,
      lang_code: Aj.state.lang,
      commands: commands,
    }, (res) => {
      if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
    })
  }
}

function botChangeSettings(key, value, callback = false) {
  Aj.apiRequest('changeSettings', { settings: { [key]: value }, bid: Aj.state.botId }, res => {
      if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
      if (callback) callback(res);
    });
}

var BotCommandEdit = {
  init() {
    WebApp.MainButton.setText(l('WEB_COMMANDS_ADD'));
    if (Aj.state.editingCommand) {
      WebApp.MainButton.setText(l('WEB_COMMANDS_SAVE'));
    }
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotCommandEdit.submit);

    var $command = $('#command');
    var $desc = $('#desc');

    $('.tm-row-toggle').on('click', function () {
      $('.tm-toggle', this).toggleClass('tm-toggle-on');
      WebApp.HapticFeedback.impactOccurred('light');
    });

    $command.on('input', function () {
      var filtered = $command.val().toLowerCase().replaceAll(/[^a-z0-9_]/g, '');
      $command.val(filtered);
    });

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotCommandEdit.submit);
    })
  },
  submit() {
    var value = $('#command').val().trim();
    var desc  = $('#desc').val().trim();

    if (!value) {
      TWebApp.showErrorToast('Command is required');
      $('#command').focus();
      return;
    }
    if (!desc) {
      TWebApp.showErrorToast('Description is required');
      $('#desc').focus();
      return;
    }

    var scopes = [];
    $('[data-field=scope]').each(function () {
      var value = $('.tm-toggle', this).hasClass('tm-toggle-on');
      if (value) {
        scopes.push($(this).data('value'));
      }
    })

    var ephemeral = $('.tm-toggle', '[data-field=ephemeral]').hasClass('tm-toggle-on');

    WebApp.MainButton.showProgress();
    Aj.apiRequest('setCommand', { 
      bid: Aj.state.botId,
      lang_code: Aj.state.lang || '',
      scopes: scopes,
      command: value, 
      description: desc,
      replace: Aj.state.editingCommand || '',
      ephemeral: ephemeral,
    }, (res) => {
      if (res.error) {
        WebApp.MainButton.hideProgress();
        TWebApp.showErrorToast(res.error);
      }
      if (res.ok) {
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        setTimeout(() => {
          WebApp.MainButton.hideProgress();
          TBackButton.onClick();
        }, 1000); // temp hack
      }
    });
  }
}


var BotGeneral = {
  init() {
    Aj.onLoad(() => {
      $('.tm-api-token-actions .tm-active-button').on('click', BotGeneral.copyToken);
      $('.tm-api-token-actions .tm-revoke-button').on('click', BotGeneral.askRevoke);
      $('.js-delete-button').on('click', BotGeneral.eDeleteClick)
      $('.js-usernames').on('click', BotGeneral.eUsernameClick);
      $('.js-spoiler').each(function () {
        SimpleSpoiler.init(this);
      });
      $('body').on('click', '.js-spoiler', BotGeneral.eClickSpoiler);
    });
    Aj.onUnload(() => {
      $('body').off('click', '.js-spoiler', BotGeneral.eClickSpoiler);
    });
  },
  eClickSpoiler() {
    if (this.classList.contains('js-spoiler-revealed')) {
      return BotGeneral.copyToken();
    }
    SimpleSpoiler.destroy(this);
    this.classList.add('js-spoiler-revealed');
  },
  copyToken() {
    var token = $('.tm-api-token').text().trim();
    navigator.clipboard.writeText(token);
    TWebApp.showSuccessToast(l('WEB_TOKEN_COPY_SUCCESS'));
  },
  eUsernameClick() {
    WebApp.openTelegramLink(this.dataset.href);
  },
  eDeleteClick() {
    WebApp.requestWriteAccess(() => {
      Aj.apiRequest('requestDeleteBot', { bid: Aj.state.botId }, res => {
        if (res.ok) {
          WebApp.openTelegramLink(res.open);
          TWebApp.iosChatFix();
          Aj.location('/botfather');
        }
      });
    });
  },
  askRevoke() {
    WebApp.showPopup({
      title: uncleanHTML(l('WEB_API_TOKEN_REVOKE_TITLE')),
      message: uncleanHTML(l('WEB_API_TOKEN_REVOKE_TEXT')),
      buttons: [
        {
          type: 'cancel',
        },
        {
          id: 'revoke',
          text: uncleanHTML(l('WEB_API_TOKEN_REVOKE_BTN')),
          type: 'destructive',
        }
      ]
    }, (result) => {
      if (result === 'revoke') {
        Aj.apiRequest('revokeAccessToken', {
          bid: Aj.state.botId,
        }, (response) => {
          if (response.error) {
            TWebApp.showErrorToast(response.error);
          } 
          if (response.ok) {
            $('.tm-api-token').html(`<span class="js-spoiler">${response.token}</span>`);
            $('.tm-api-token .js-spoiler').each(function () {
              SimpleSpoiler.init(this);
            });
            TWebApp.showSuccessToast(l('WEB_TOKEN_REVOKE_SUCCESS'));
          }
        });
      }
    });
  }
}

var BotSettings = {
  init() {
    var cont = Aj.ajContainer;

    $('.js-add-allowed-url').on('click', function () {
      var field_type = this.dataset.type;
      var container = field_type == 'redirect_uri' ? '.js-redirect-uris' : '.js-trusted-origins';
      $(container).append(`<div class="tm-row tm-field">
        <input type="url" class="form-control tm-input" name="allowed_url[]" data-type="${field_type}" placeholder="Enter URL" autocomplete="off" spellcheck="false" />
        <span class="icon-before icon-delete-item js-delete-allowed-url"></span>
      </div>`);
    });

    $('.tm-row-toggle').on('click', function () {
      var toggleEl = this.querySelector('.tm-toggle');
      var value = toggleEl.classList.toggle('tm-toggle-on');
      WebApp.HapticFeedback.impactOccurred('light');
      var field = this.dataset.field;

      if (!field) return;
      if (!value) value = 0;

      if (field == 'biz') {
        botChangeSettings(field, value);
      }
      if (field == 'btfrm') {
        botChangeSettings(field, value);
      }
      if (field == 'btfnu') {
        botChangeSettings(field, value);
      }
      if (field == 'grps') {
        botChangeSettings(field, value);
      }
      if (field == 'priv') {
        botChangeSettings(field, value);
      }
      if (field == 'flskp') {
        botChangeSettings(field, value);
      }
      if (field == 'mgr') {
        botChangeSettings(field, value);
      }
      if (field == 'loop') {
        botChangeSettings(field, value);
      }
      if (field == 'gst') {
        botChangeSettings(field, value);
      }
      if (field == 'grd') {
        botChangeSettings(field, value);
      }
      if (field == 'access') {
        botChangeSettings(field, value);
        $('.js-access-users').toggleClass('hidden', !value);
      }
    });

    function updateAccessUsersUI(label, plusLabel, clearVisible) {
      var $status = $('.js-access-users-status');
      var $pill = $('.js-access-users-pill');
      var $plus = $('.js-access-users-plus');
      $status.text(label);
      $plus.text(plusLabel);
      $pill.toggleClass('hidden', !clearVisible);
    }

    $('.js-access-users').on('click', function(e) {
      if ($(e.target).closest('.js-access-users-clear').length) {
        return;
      }
      if ($(e.target).closest('.js-access-users-pill').length) {
        e.stopPropagation();
        botChangeSettings('access_clear', true, function (res) {
          if (res.ok) {
            updateAccessUsersUI(res.label, res.plus_label, res.clear_visible);
          }
        });
        return;
      }
      Aj.apiRequest('requestBotAccessUsers', { bid: Aj.state.botId }, function(res) {
        if (res.error) {
          TWebApp.showErrorToast(res.error);
          return;
        }
        WebApp.requestChat(res.webapp_req_id, function(sent) {
          if (sent) {
            setTimeout(function () {
              Aj.apiRequest('getBotAccessInfo', { bid: Aj.state.botId }, function(res) {
                if (res.ok) {
                  updateAccessUsersUI(res.label, res.plus_label, res.clear_visible);
                }
              });
            }, 2000);
          }
        });
      });
    });

    $('.js-access-users-clear').on('click', function(e) {
      e.stopPropagation();
      botChangeSettings('access_clear', true, function (res) {
        if (res.ok) {
          updateAccessUsersUI(res.label, res.plus_label, res.clear_visible);
        }
      });
    });

    $('.js-group-admin-rights-toggle').on('click', () => {
      $('.js-group-admin-rights').toggleClass('hidden');
      WebApp.HapticFeedback.impactOccurred('soft');
    });

    $('.js-broadcast-admin-rights-toggle').on('click', () => {
      $('.js-broadcast-admin-rights').toggleClass('hidden');
      WebApp.HapticFeedback.impactOccurred('soft');
    });

    $('.js-threaded-mode-toggle').on('click', () => {
      $('.js-threaded-mode-nouser-toggle').toggleClass('hidden');
      WebApp.HapticFeedback.impactOccurred('soft');
    });

    Aj.state.privacyUrlDebounce = debounce();
    function submitPrivacy() {
      var val = $('input[name=privacy_url]').val();
      Aj.apiRequest('changeSettings', {
        settings: {
          privacy_policy_url: val,
        },
        bid: Aj.state.botId,
      }, res => {
        if (res.error) {
          $('.hint-text[data-for=privacy]').text('URL is invalid').toggleClass('hint-text-error', true);
        } else {
          $('.hint-text[data-for=privacy]').text('');
        }
      })
    }
    $('input[name=privacy_url]').on('input', () => {
      Aj.state.privacyUrlDebounce(submitPrivacy, 600);
    });
    $('input[name=privacy_url]').on('change', () => {
      Aj.state.privacyUrlDebounce(submitPrivacy, 0);
    });

    $(cont).on('click.curPage', '.js-delete-allowed-url', function () {
      $(this).parent('.tm-row').remove();
      BotSettings.updateAllowedUrls();
    });

    $(cont).on('change.curPage', 'input[name="allowed_url[]"]', BotSettings.updateAllowedUrls);
    $(cont).on('input.curPage', 'input[name="allowed_url[]"]', function () {
      $(this).removeClass('error');
    });

    Aj.state.webLoginDebounce = debounce();
    function submitWebLogic() {
      var val = $('input[name=web_login]').val();
      Aj.apiRequest('changeSettings', {
        settings: {
          domain: val,
        },
        bid: Aj.state.botId,
      }, res => {
        if (res.error) {
          $('.hint-text[data-for=web_login]').text('Domain is invalid').toggleClass('hint-text-error', true);
        } else {
          $('.js-migrate-oauth-section').toggleClass('hidden', !!val);
          $('.hint-text[data-for=web_login]').text('').toggleClass('hint-text-error', false);
        }
      })
    }
    $('input[name=web_login]').on('input', () => {
      Aj.state.webLoginDebounce(submitWebLogic, 600);
    });
    $('input[name=web_login]').on('change', () => {
      Aj.state.webLoginDebounce(submitWebLogic, 0);
    });

    $('.js-group-admin-rights-toggle .tm-toggle').on('click', function (event) {
      event.stopPropagation();

      var $this = $(this);
      $this.toggleClass('tm-toggle-on');
      var newState = $this.hasClass('tm-toggle-on');

      $('.js-group-admin-rights').toggleClass('hidden', !newState);
      Aj.state.blockChecks = true;
      $('.js-group-admin-rights input').prop('checked', newState);
      Aj.state.blockChecks = false;
      updateAdminRights();
    });

    function updateAdminRights() {
      var new_values = [];
      var total = 0;
      $('.js-group-admin-rights input').each((i, el) => {
        total++;
        if (el.checked) {
          new_values.push(el.name);
        }
      });
      $('.js-group-admin-rights-toggle .tm-row-count').text(new_values.length + '/' + total);
      if (new_values.length === 0) {
        new_values = null;
        $('.js-group-admin-rights-toggle .tm-toggle').removeClass('tm-toggle-on');
      } else {
        $('.js-group-admin-rights-toggle .tm-toggle').addClass('tm-toggle-on');
      }
      botChangeSettings('group_admin_rights', new_values);
    }

    $('.js-group-admin-rights input').on('change', function () {
      if (Aj.state.blockChecks) return;
      updateAdminRights();
    })

    $('.js-broadcast-admin-rights-toggle .tm-toggle').on('click', function (event) {
      event.stopPropagation();
    
      var $this = $(this);
      $this.toggleClass('tm-toggle-on');
      var newState = $this.hasClass('tm-toggle-on');

      $('.js-broadcast-admin-rights').toggleClass('hidden', !newState);
      Aj.state.blockChecks = true;
      $('.js-broadcast-admin-rights input').prop('checked', newState);
      Aj.state.blockChecks = false;
      updateBroadcastAdminRights();
    });

    function updateBroadcastAdminRights() {
      var new_values = [];
      var total = 0;
      $('.js-broadcast-admin-rights input').each((i, el) => {
        total++;
        if (el.checked) {
          new_values.push(el.name);
        }
      });
      $('.js-broadcast-admin-rights-toggle .tm-row-count').text(new_values.length + '/' + total);
      if (new_values.length === 0) {
        new_values = null;
        $('.js-broadcast-admin-rights-toggle .tm-toggle').removeClass('tm-toggle-on');
      } else {
        $('.js-broadcast-admin-rights-toggle .tm-toggle').addClass('tm-toggle-on');
      }
      botChangeSettings('broadcast_admin_rights', new_values);
    }

    $('.js-broadcast-admin-rights input').on('change', function () {
      if (Aj.state.blockChecks) return;
      updateBroadcastAdminRights();
    });

    $('.js-spoiler').each(function () {
      SimpleSpoiler.init(this);
    });
    $('body').on('click', '.js-spoiler', BotSettings.eClickSpoiler);

    $(cont).on('click.curPage', '.copy-btn', function () {
      navigator.clipboard.writeText(this.dataset.value);
      TWebApp.showSuccessToast(l('WEB_GENERIC_COPY_SUCCESS'));
    })

    $('.js-revoke-client-secret').on('click', function () {
      BotSettings.askRevokeClientSecret();
    })

    $('.js-migrate-oauth').on('click', function () {
      BotSettings.askMigrateOauth();
    });

    $(cont).on('click.curPage', '.js-add-native-app-platform', function () {
      var platform = this.dataset.platform;
      BotSettings.addNativeAppEntry(platform);
    });

    $(cont).on('click.curPage', '.js-delete-native-app', function () {
      var $entry = $(this).closest('.js-native-app-entry');
      var hash = $entry.data('hash');
      if (hash) {
        Aj.apiRequest('removeNativeApp', { bid: Aj.state.botId, app_hash: hash }, res => {
          if (res.error) {
            TWebApp.showErrorToast(res.error);
            return;
          }
          $entry.remove();
        });
      } else {
        $entry.remove();
      }
    });

    $(cont).on('change.curPage', '.js-native-app-field1, .js-native-app-field2', function () {
      var $entry = $(this).closest('.js-native-app-entry');
      BotSettings.submitNativeApp($entry);
    });

    $('.js-login-alg-item').on('click', function () {
      var value = this.dataset.value;
      $('.js-login-alg-value').text(this.text);
      $('li.selected:has(.js-login-alg-item)').toggleClass('selected');
      $(this).parent().toggleClass('selected');
      botChangeSettings('oauth_alg', value);
    });
  },

  addNativeAppEntry(platform) {
    var platformLabel = platform == 'android' ? l('WEB_NATIVE_APP_PLATFORM_ANDROID') : l('WEB_NATIVE_APP_PLATFORM_IOS');
    var platformClass = platform == 'android' ? 'tm-native-app-chip-android' : 'tm-native-app-chip-ios';
    var field1Placeholder = platform == 'android' ? l('WEB_NATIVE_APP_PACKAGE_NAME') : l('WEB_NATIVE_APP_TEAM_ID');
    var field2Placeholder = platform == 'android' ? l('WEB_NATIVE_APP_SHA256_FINGERPRINT') : l('WEB_NATIVE_APP_BUNDLE_ID');

    var html = `<div class="tm-native-app-entry js-native-app-entry" data-platform="${platform}">
      <div class="tm-row" style="gap: 8px; padding: 8px 16px;">
        <span class="tm-native-app-chip ${platformClass}">${platformLabel}<span class="js-delete-native-app"></span></span>
      </div>
      <div class="tm-field" style="margin-bottom: 1px;">
        <input type="text" class="form-control tm-input js-native-app-field1" value="" placeholder="${field1Placeholder}" autocomplete="off" spellcheck="false" />
      </div>
      <div class="tm-field" style="margin-bottom: 1px;">
        <input type="text" class="form-control tm-input js-native-app-field2" value="" placeholder="${field2Placeholder}" autocomplete="off" spellcheck="false" />
      </div>
      <div class="tm-row js-native-app-url-row" style="align-items: stretch; flex-direction: column; display:none;">
        <span class="tm-table-header">${l('WEB_NATIVE_APP_URL')}</span>
        <div class="tm-api-token tm-api-token-client-secret">
          <span class="js-native-app-url-value" style="flex-grow: 1; word-break: break-all;"></span>
          <div class="copy-btn" data-value=""></div>
        </div>
      </div>
    </div>`;

    $('.js-native-apps-list').append(html);
    WebApp.HapticFeedback.impactOccurred('soft');
  },

  submitNativeApp($entry) {
    var platform = $entry.data('platform');
    var field1 = $entry.find('.js-native-app-field1').val()?.trim();
    var field2 = $entry.find('.js-native-app-field2').val()?.trim();

    if (!field1 || !field2) return;

    var oldHash = $entry.data('hash') || '';
    var params = { bid: Aj.state.botId, platform: platform, app_hash: oldHash };
    if (platform == 'android') {
      params.package_name = field1;
      params.sha256_fingerprint = field2;
    } else {
      params.team_id = field1;
      params.bundle_id = field2;
    }

    $entry.find('.js-native-app-field1, .js-native-app-field2').removeClass('error');

    Aj.apiRequest('addNativeApp', params, res => {
      if (res.error) {
        TWebApp.showErrorToast(res.error);
        if (res.field == 'field1') $entry.find('.js-native-app-field1').addClass('error');
        if (res.field == 'field2') $entry.find('.js-native-app-field2').addClass('error');
        return;
      }
      if (res.ok && res.native_app_url) {
        $entry.data('hash', res.hash);
        $entry.attr('data-hash', res.hash);
        var $urlRow = $entry.find('.js-native-app-url-row');
        $urlRow.show();
        $urlRow.find('.js-native-app-url-value').text(res.native_app_url);
        $urlRow.find('.copy-btn').attr('data-value', res.native_app_url);
        TWebApp.showSuccessToast(l('WEB_NATIVE_APP_REGISTERED'));
      }
    });
  },

  updateAllowedUrls() {
    var inputAllowedUrls = [];
    $('input[name="allowed_url[]"]').each(function () {
      var url = URL.parse(this.value)?.href || this.value;
      inputAllowedUrls.push({type: this.dataset.type, url: url})
    });

    var reqNumber = (Aj.state.allowedUrlsReq || 0) + 1;
    Aj.state.allowedUrlsReq = reqNumber;

    Aj.apiRequest('setAllowedUrls', {
      allowed_urls: inputAllowedUrls,
      bid: Aj.state.botId,
    }, res => {
      if (reqNumber != Aj.state.allowedUrlsReq) {
        return;
      }
      if (res.allowed_urls) {
        $('input[name="allowed_url[]"]').each(function (i) {
          $(this).val(res.allowed_urls[i].url);
          if (res.allowed_urls[i].error) {
            $(this).addClass('error');
          }
        })
      }
    })
  },

  eClickSpoiler() {
    SimpleSpoiler.destroy(this);
    this.classList.add('js-spoiler-revealed');
  },

  askMigrateOauth() {
    WebApp.showPopup({
      title: uncleanHTML(l('WEB_LOGIN_MIGRATE_TITLE')),
      message: uncleanHTML(l('WEB_LOGIN_MIGRATE_TEXT')),
      buttons: [
        {
          id: 'confirm',
          text: uncleanHTML(l('WEB_LOGIN_MIGRATE_CONFIRM_BTN')),
          type: 'default',
        },
        {
          type: 'cancel',
        },
      ]
    }, (result) => {
      if (result === 'confirm') {
        Aj.apiRequest('revokeOIDCClientSecret', {
          bid: Aj.state.botId,
        }, (response) => {
          if (response.error) {
            TWebApp.showErrorToast(response.error);
          } 
          if (response.ok) {
            location.reload();
          }
        });
      }
    });
  },

  askRevokeClientSecret() {
    WebApp.showPopup({
      title: uncleanHTML(l('WEB_CLIENT_SECRET_REVOKE_TITLE')),
      message: uncleanHTML(l('WEB_CLIENT_SECRET_REVOKE_TEXT')),
      buttons: [
        {
          type: 'cancel',
        },
        {
          id: 'revoke',
          text: uncleanHTML(l('WEB_API_TOKEN_REVOKE_BTN')),
          type: 'destructive',
        }
      ]
    }, (result) => {
      if (result === 'revoke') {
        Aj.apiRequest('revokeOIDCClientSecret', {
          bid: Aj.state.botId,
        }, (response) => {
          if (response.error) {
            TWebApp.showErrorToast(response.error);
          } 
          if (response.ok) {
            $('.js-spoiler.js-secret-val').html(response.token);
            $('.copy-btn.js-secret-val').data('value', response.token);

            $('.js-spoiler.js-secret-val').each(function () {
              SimpleSpoiler.init(this);
            });
            TWebApp.showSuccessToast(l('WEB_CLIENT_SECRET_REVOKE_SUCCESS'));
          }
        });
      }
    });
  }
}

var BotSettingsInline = {
  init() {
    $('.tm-row-toggle').on('click', function () {
      var toggleEl = this.querySelector('.tm-toggle');
      var value = toggleEl.classList.toggle('tm-toggle-on');
      WebApp.HapticFeedback.impactOccurred('light');
      var field = this.dataset.field;
      if (!field) return;
      if (!value) value = 0;

      if (field == 'inline') {
        $('.tr-enter').toggleClass('hidden', !value);
        botChangeSettings(field, value);
      }
      if (field == 'ingeo') {
        botChangeSettings(field, value);
      }
    });

    $('.js-infdb-dd-item').on('click', function () {
      var value = this.dataset.value;
      $('.js-infdb-value').text(this.text);
      $('li.selected:has(.js-infdb-dd-item)').toggleClass('selected');
      $(this).parent().toggleClass('selected');
      botChangeSettings('infdb', value);
    });

    $('input[name=inph]').on('change', function () {
      botChangeSettings('inph', this.value);
    })
  },
}

var BotGames = {
  init() {
    $('.tm-row-toggle').on('click', function () {
      var toggleEl = this.querySelector('.tm-toggle');
      var value = toggleEl.classList.toggle('tm-toggle-on');
      WebApp.HapticFeedback.impactOccurred('light');
      var field = this.dataset.field;
      if (!field) return;
      if (!value) value = 0;

      if (field == 'inline') {
        $('.tr-enter').toggleClass('hidden', !value);
        botChangeSettings(field, value);
      }
    });

    $('.js-game-copy').on('click', function (e) {
      // e.stopPropagation();
      navigator.clipboard.writeText(this.dataset.value);
      TWebApp.showToast(l('WEB_LINK_COPIED'), { class: 'success' });
      WebApp.HapticFeedback.notificationOccurred('success');
    })

    $('.js-game-delete').on('click', function (e) {
      // e.stopPropagation();
      var gameId = this.dataset.id;
      WebApp.showPopup({
        title: uncleanHTML(l('WEB_GAMES_DELETE_CONFIRM_TITLE')),
        message: uncleanHTML(l('WEB_GAMES_DELETE_CONFIRM_BODY')),
        buttons: [
          {
            id: 'delete',
            text: uncleanHTML(l('WEB_GAMES_DELETE')),
            type: 'destructive',
          },
          {
            type: 'cancel',
          },
        ]
      }, (result) => {
        if (result !== 'delete') return;
        Aj.apiRequest('setApp', {
          bid: Aj.state.botId,
          type: 'game',
          game_id: gameId,
          delete: true,
        }, res => {
          if (res.error) {
            TWebApp.showErrorToast(res.error);
          } else {
            TWebApp.showSuccessToast(res.msg);
            this.closest('.tm-row').remove();
          }
        });
      });
    });
  }
}

var BotGameEdit = {
  init() {
    if (!Aj.state.editingGame) {
      WebApp.MainButton.setText('Create');
    } else {
      WebApp.MainButton.setText('Save');
    }
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotGameEdit.submit);

    Aj.state.files = Aj.state.files || {};

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotGameEdit.submit);
    })

    $('input[name=short_name]').on('input', function () {
      var value = this.value.trim();
      value = value.toLowerCase();
      value = value.replaceAll(/[^a-z0-9_]/g, '');
      value = value.replaceAll(/^[_0-9]/g, '');
      this.value = value || '';
    });

    $('input[name=title]').on('input', function () {
      var value = this.value.trim();
      $('.tm-welcome-message-title').text(value);
    });

    $('textarea[name=description]').on('input', function () {
      var value = this.value.trim();
      $('.tm-welcome-message-content').text(value);
    });

    $('.js-upload-button').on('click', function () {
      var target = this.dataset.target;
      if (!target) return;

      if (target == 'game_pic') {
        requestUpload(target, res => {
          if (res.ok) {
            $('.tm-image-input-container').css({
              'background-image': `url(${res.media.src})`,
              'background-size': 'cover',
              'filter': 'none',
              'border': 'none',
            });
          } else {
            $('.tm-image-input-container').attr('style', '');
          }
        }, {
          onSelected(file) {
            if (!file) return;

            if (file) {
              var src = URL.createObjectURL(file);
              $('.tm-image-input-container').css({
                'background-image': `url(${src})`,
                'background-size': 'cover',
                'filter': 'blur(15px)',
                'border': 'none',
              });
            }
          }
        });
      }
    });
  },
  submit() {
    var short_name = $('input[name=short_name]').val()?.trim() || (Aj.state.editingGame ? 'b92389418239' : '');
    var title = $('input[name=title]').val()?.trim();
    var description = $('textarea[name=description]').val()?.trim();
    var game_pic = Aj.state.files['game_pic']?.photo_id || '';

    if (!short_name || short_name.length < 3) {
      TWebApp.showErrorToast('Short name must be at least 3 characters long.');
      $('input[name=short_name]').focus();
      return;
    }
    if (!title) {
      TWebApp.showErrorToast('Title is required.');
      $('input[name=title]').focus();
      return;
    }
    if (!game_pic) {
      TWebApp.showErrorToast('Picture is required.');
      return;
    }
    WebApp.MainButton.showProgress();
    Aj.apiRequest('setApp', {
      bid: Aj.state.botId,
      type: 'game',
      game_id: Aj.state.editingGame || '',
      short_name: short_name,
      title: title,
      desc: description,
      app_pic: game_pic,
    }, res => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        Aj.location(`/botfather/bot/${Aj.state.botId}/games`);
      } else if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
    });
  }
}

var BotAppEdit = {
  init() {
    if (!Aj.state.editingGame) {
      WebApp.MainButton.setText('Create');
    } else {
      WebApp.MainButton.setText('Save');
    }
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotAppEdit.submit);

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotAppEdit.submit);
    })

    $('input[name=short_name]').on('input', function () {
    var value = this.value.trim();
      value = value.toLowerCase();
      value = value.replaceAll(/[^a-z0-9_]/g, '');
      value = value.replaceAll(/^[_0-9]/g, '');
      this.value = value || '';
    });

    $('input[name=title]').on('input', function () {
      var value = this.value.trim();
      $('.tm-welcome-message-title').text(value);
    });

    $('textarea[name=description]').on('input', function () {
      var value = this.value.trim();
      $('.tm-welcome-message-content').text(value);
    });

    $('.js-upload-button').on('click', function () {
      var target = this.dataset.target;
      if (!target) return;

      if (target == 'game_pic') {
        requestUpload(target, res => {
          if (res.ok) {
            $('.tm-image-input-container').css({
              'background-image': `url(${res.media.src})`,
              'background-size': 'cover',
              'filter': 'none',
              'border': 'none',
            });
          } else {
            $('.tm-image-input-container').attr('style', '');
          }
        }, {
          onSelected(file) {
            if (!file) return;

            if (file) {
              var src = URL.createObjectURL(file);
              $('.tm-image-input-container').css({
                'background-image': `url(${src})`,
                'background-size': 'cover',
                'filter': 'blur(15px)',
                'border': 'none',
              });
            }
          }
        });
      }
    });
  },
  submit() {
    var short_name = $('input[name=short_name]').val()?.trim() || '';
    var title = $('input[name=title]').val()?.trim();
    var description = $('textarea[name=description]').val()?.trim();
    var webview_url = $('input[name=url]').val()?.trim();
    var game_pic = Aj.state.files['game_pic']?.photo_id || '';

    if (!webview_url) {
      $('input[name=url]').focus();
      TWebApp.showErrorToast('URL is required.');
      return;
    }
    if (!title) {
      $('input[name=title]').focus();
      TWebApp.showErrorToast('Title is required.');
      return;
    }
    if (!description) {
      var description = $('textarea[name=description]').focus();
      TWebApp.showErrorToast('Description is required.');
      return;
    }
    if (short_name.length < 3 && !Aj.state.editingGame) {
      $('input[name=short_name]').focus();
      TWebApp.showErrorToast('App Link is required.');
      return;
    }
    if (!game_pic) {
      TWebApp.showErrorToast('Picture is required.');
      return;
    }
    WebApp.MainButton.showProgress();
    Aj.apiRequest('setApp', {
      bid: Aj.state.botId,
      type: 'app',
      game_id: Aj.state.editingGame || '',
      short_name: short_name,
      title: title,
      desc: description,
      webview_url: webview_url,
      app_pic: game_pic,
    }, res => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        Aj.location(`/botfather/bot/${Aj.state.botId}/apps`);
      } else if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
    });
  }
}

var BotApps = {
  init() {
    $('.tm-row-toggle').on('click', function () {
      var toggleEl = this.querySelector('.tm-toggle');
      var value = toggleEl.classList.toggle('tm-toggle-on');
      WebApp.HapticFeedback.impactOccurred('light');
      var field = this.dataset.field;
      if (!field) return;
      if (!value) value = 0;
      if (field == 'sor') {
        botChangeSettings(field, value);
        $('.js-sameorigin-opt-out-wrap').addClass('hidden');
      }
    });

    $('.js-sameorigin-opt-out').on('click', function () {
      WebApp.showPopup({
        title: l('WEB_MINIAPPS_SAME_ORIGIN_OPT_OUT_TITLE'),
        message: l('WEB_MINIAPPS_SAME_ORIGIN_OPT_OUT_DESC'),
        buttons: [
          {
            id: 'delete',
            text: l('WEB_MINIAPPS_SAME_ORIGIN_OPT_OUT_BTN'),
            type: 'destructive',
          },
          {
            type: 'cancel',
          },
        ]
      }, (result) => {
        if (result != 'delete') return;
        botChangeSettings('sor', 0);
        $('[data-field=sor] .tm-toggle').removeClass('tm-toggle-on');
        $('.js-sameorigin-opt-out-wrap').addClass('hidden');
      });
    });

    $('.js-game-copy').on('click', function (e) {
      navigator.clipboard.writeText(this.dataset.value);
      TWebApp.showToast(l('WEB_LINK_COPIED'), { class: 'success' });
      WebApp.HapticFeedback.notificationOccurred('success');
    });

    $('.js-game-delete').on('click', function (e) {
      var gameId = this.dataset.id;
      WebApp.showPopup({
        title: uncleanHTML(l('WEB_GAMES_DELETE_CONFIRM_TITLE')),
        message: uncleanHTML(l('WEB_GAMES_DELETE_APP_CONFIRM_BODY')),
        buttons: [
          {
            id: 'delete',
            text: uncleanHTML(l('WEB_GAMES_DELETE')),
            type: 'destructive',
          },
          {
            type: 'cancel',
          },
        ]
      }, (result) => {
        if (result !== 'delete') return;
        Aj.apiRequest('setApp', {
          bid: Aj.state.botId,
          type: 'app',
          game_id: gameId,
          delete: true,
        }, res => {
          if (res.error) {
            TWebApp.showErrorToast(res.error)
          } else {
            TWebApp.showSuccessToast(res.msg);
            this.closest('.tm-row').remove();
          }
        });
      });
    });
  }
}

var BotMainApp = {
  init() {
    WebApp.MainButton.setText('Save');
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotMainApp.submit);

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotMainApp.submit);
    });

    $('.tm-mode-button').on('click', function () {
      var mode = this.dataset.value;
      if (mode === Aj.state.mode) return;
      Aj.state.mode = mode;

      $('.tm-mode-button.active').toggleClass('active', false);
      $(this).addClass('active');

      WebApp.HapticFeedback.impactOccurred('soft');
    });

    $('.js-delete-mainapp-button').on('click', function () {
      WebApp.showPopup({
        title: uncleanHTML(l('WEB_MENUBTN_DISABLE_TITLE')),
        message: uncleanHTML(l('WEB_MAINAPP_DISABLE_CONFIRM')),
        buttons: [
          {
            id: 'delete',
            text: uncleanHTML(l('WEB_MENUBTN_POPUP_DISABLE')),
            type: 'destructive',
          },
          {
            type: 'cancel',
          },
        ]
      }, (result) => {
        if (result !== 'delete') return;
        Aj.apiRequest('updateMainApp', {
          bid: Aj.state.botId,
          webview_url: '',
        }, res => {
          if (res.error) {
            TWebApp.showErrorToast(res.error)
          } else {
            Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
            Aj.location('/botfather/bot/' + Aj.state.botId + '/apps')
          }
        });
      });
    });
  },
  submit() {
    var url = $('input[name=url]').val()?.trim();

    if (!url) {
      TWebApp.showErrorToast('All fields are required.');
      return;
    }
    WebApp.MainButton.showProgress();
    Aj.apiRequest('updateMainApp', {
      mode: Aj.state.mode,
      bid: Aj.state.botId,
      webview_url: $('input[name=url]').val(),
    }, res => {
      WebApp.MainButton.hideProgress();
      if (res.error) {
        TWebApp.showErrorToast(res.error)
      } else {
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        Aj.location('/botfather/bot/' + Aj.state.botId + '/apps')
      }
    })
  }
}

var BotMenuApp = {
  init() {
    WebApp.MainButton.setText('Save');
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotMenuApp.submit);

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotMenuApp.submit);
    });

    $('input[name=title]').on('input', function () {
      var value = this.value.trim();
      $('.tm-preview-menu-button span').text(value || 'Open');
    });

    $('.js-delete-menu-button').on('click', function () {
      WebApp.showPopup({
        title: uncleanHTML(l('WEB_MENUBTN_DISABLE_TITLE')),
        message: uncleanHTML(l('WEB_MENUBTN_DISABLE_CONFIRM')),
        buttons: [
          {
            id: 'delete',
            text: uncleanHTML(l('WEB_MENUBTN_POPUP_DISABLE')),
            type: 'destructive',
          },
          {
            type: 'cancel',
          },
        ]
      }, (result) => {
        if (result !== 'delete') return;
        Aj.apiRequest('changeSettings', {
          settings: {
            menu_button: null,
          },
          bid: Aj.state.botId,
        }, res => {
          if (res.ok) {
            Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
            Aj.location(`/botfather/bot/${Aj.state.botId}/apps`);
          } else if (res.error) {
            TWebApp.showErrorToast(res.error);
          }
        });
      });
    });

    $('input[name=url]').on('input', function () {
      var value = this.value.trim();
      // $('.tm-menu-button-url').text(value);
    });
  },
  submit() {
    var title = $('input[name=title]').val()?.trim();
    var url = $('input[name=url]').val()?.trim();

    if (!title) {
      TWebApp.showErrorToast('Title is required.');
      $('input[name=title]').focus();
      return;
    }
    if (!url) {
      TWebApp.showErrorToast('URL is required.');
      $('input[name=url]').focus();
      return;
    }
    WebApp.MainButton.showProgress();
    Aj.apiRequest('changeSettings', {
      settings: {
        menu_button: {
          title: title,
          url: url,
        }
      },
       bid: Aj.state.botId,
    }, res => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        Aj.location(`/botfather/bot/${Aj.state.botId}/apps`);
      } else if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
    });
  }
}

var BotLaunchScreen = {
  init() {
    WebApp.MainButton.setText('Save');
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotLaunchScreen.submit);

    Aj.onUnload(() => {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotLaunchScreen.submit);
    });

    $('.js-theme-tabs').on('click', '.tm-tab', function () {
      var $tab = $(this);
      if ($tab.hasClass('active')) return;
      $tab.addClass('active').siblings().removeClass('active');

      WebApp.HapticFeedback.impactOccurred('soft');
      Aj.state.mode = $tab.data('mode');
      BotLaunchScreen.updateColorValues();
    });

    $('input[type=color]').on('change', function () {
      var value = this.value;
      var color = this.dataset.color;
      var darkColor = color.replace('_color', '_dark_color');
      if (Aj.state.mode === 'light') {
        if (Aj.state[color] === Aj.state[darkColor]) {
          Aj.state[darkColor] = value;
        }
        Aj.state[color] = value;
      } else {
        Aj.state[darkColor] = value;
      }
      BotLaunchScreen.updateColorValues();
    });

    $('.js-colors-reset').on('click', function () {
      Aj.state.bg_color = '';
      Aj.state.bg_dark_color = '';
      Aj.state.header_color = '';
      Aj.state.header_dark_color = '';
      BotLaunchScreen.updateColorValues();
    });

    $('.js-color-picker').on('click', function () {
      var color = this.dataset.color;
      if (!color) return;
      var $input = $(`input[data-color="${color}"]`);
      $input.focus();
      $input.click();
    });

    $('.js-upload-button').on('click', BotLaunchScreen.uploadIcon);

    BotLaunchScreen.updateColorValues();
  },
  uploadIcon() {
    var $input = $('<input type="file" accept="image/svg+xml,image/webp,*.tgs" style="display: none;">');
    $input.on('change', function () {
      var file = this.files[0];
      if (!file) return;
      var size = file.size;
      var type = file.type;
      if (type !== 'image/svg+xml' && type !== 'image/webp')
      if (size > 1024 * 100 && type == 'image/svg+xml') {
        TWebApp.showErrorToast('SVG file is too big');
        return;
      }
      if (size > 1024 * 1024) {
        TWebApp.showErrorToast('File is too big');
        return;
      }
      Aj.uploadRequest('uploadIcon', file, {}, res => {
        if (res.ok) {
          $('.js-icon-preview').html(res.svg);
          Aj.state.placeholder_path = res.path;
        } else {
          TWebApp.showErrorToast(res.error);
        }
      });
    });
    $('body').append($input);
    $input.click();
  },
  updateColorValues() {
    var style = $('.tm-launch-screen-preview')[0].style;
    var colors = {};
    var isLight = Aj.state.mode === 'light';
    colors.bg_color = isLight ? Aj.state.bg_color : Aj.state.bg_dark_color;
    colors.header_color = isLight ? Aj.state.header_color : Aj.state.header_dark_color;
    style.setProperty('--bg_color', colors.bg_color || 'var(--tg-theme-bg-color)');
    style.setProperty('--header_color', colors.header_color || 'var(--tg-theme-header-bg-color)');
    style.setProperty('--icon_color', BotLaunchScreen.getIconColor());

    $('.js-color-picker').each(function () {
      var color = this.dataset.color;
      if (!color) return;
      $('.js-color-value', this).text(colors[color] || 'Default');
      if (!colors[color]) return;
      $(`input[data-color="${color}"]`).val(colors[color]);
    });
  },
  getIconColor() {
    var color;
    if (Aj.state.mode === 'light') {
      color = Aj.state.bg_color;
      if (!color) return '#000';
    } else {
      color = Aj.state.bg_dark_color;
      if (!color) return '#fff';
    }
    var r = parseInt(color.slice(1, 3), 16);
    var g = parseInt(color.slice(3, 5), 16);
    var b = parseInt(color.slice(5, 7), 16);
    return ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.7) ? '#000' : '#fff';
  },
  submit() {
    WebApp.MainButton.showProgress();
    Aj.apiRequest('changeSettings', {
      settings: {
        splashscreen: {
          bg_color: Aj.state.bg_color,
          bg_dark_color: Aj.state.bg_dark_color,
          header_color: Aj.state.header_color,
          header_dark_color: Aj.state.header_dark_color,
          placeholder_path: Aj.state.placeholder_path,
        }
      },
      bid: Aj.state.botId,
    }, res => {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        Aj.onUnload(() => TWebApp.showSuccessToast(res.msg));
        Aj.location(`/botfather/bot/${Aj.state.botId}/apps`);
      } else if (res.error) {
        TWebApp.showErrorToast(res.error);
      }
    });
  }
}

var TransferBot = {
  init() {
    Aj.onLoad(() => {
      $('input[name=query]').on('change', TransferBot.searchSubmit);
      $('.js-form-clear').on('click', TransferBot.clear);

      WebApp.MainButton.onClick(TransferBot.transferSubmit);
      WebApp.MainButton.setText('Continue');
      WebApp.MainButton.show();
      WebApp.MainButton.enable();
    });

    Aj.onUnload(() => {
      WebApp.MainButton.offClick(TransferBot.transferSubmit);
      WebApp.MainButton.hide();
    });
  },
  transferSubmit() {
    if (!Aj.state.recipientId) {
      TransferBot.searchSubmit();
      return;
    };
    WebApp.MainButton.showProgress();
    Aj.apiRequest('requestTransferBot', { recipient_id: Aj.state.recipientId, bid: Aj.state.botId }, res => {
      WebApp.MainButton.hideProgress();
      if (res.error) {
        WebApp.showErrorToast(res.error);
      } else {
        WebApp.openTelegramLink(res.open);
        TWebApp.iosChatFix();
        Aj.location('/botfather');
      }
    });
  },
  searchSubmit() {
    var query  = $('input[name=query]').value();
    if (!query.length) {
      $form.field('query').focus();
      return;
    }
    $('.js-transfer-search-field').addClass('loading').removeClass('play').redraw().addClass('play');
    Aj.apiRequest('checkTransferRecipient', {
      bid: Aj.state.botId,
      username: query
    }, function(result) {
      TransferBot.updateResult(result);
      $('.js-transfer-search-field').removeClass('loading');
    });
  },
  clear() {
    var $form = Aj.state.$starsSearchForm;
    var $field = $('.js-transfer-search-field');

    WebApp.MainButton.setText('Continue');
    Aj.state.recipientId = null;
    $('input[name=query]').value('').prop('disabled', false).focus();
    $field.removeClass('found');
    $field.removeClass('error');
    $('.hint-text[data-for=recipient]').html('');
  },
  updateResult(result) {
    var $field = $('.js-transfer-search-field');
    if (result.error) {
      $('.hint-text[data-for=recipient]').html(result.error);
      $field.addClass('error').removeClass('found');
      $('input[name=query]').prop('disabled', false);
    } else {
      WebApp.MainButton.setText('Transfer');
      $('.hint-text[data-for=recipient]').html('');
      $field.removeClass('error');
      if (result.ok) {
        if (result.userpic) {
          $('.js-stars-search-photo', $field).html(`<img src="${result.userpic}">`);
        }
        if (result.name) {
          var $form = Aj.state.$starsSearchForm;
          $('input[name=query]').value(uncleanHTML(result.name));
        }
        Aj.state.recipientId = result.id;
        $field.addClass('found');
        $('input[name=query]').prop('disabled', true);
      } else {
        $form.removeClass('myself');
        $form.field('recipient').value('');
        $field.removeClass('found');
        $form.field('query').prop('disabled', false);
      }
    }
  },
}

var BotPayments = {
  init() {
    $('.js-copy-token').click(function() {
      navigator.clipboard.writeText(this.dataset.token);
      TWebApp.showSuccessToast(l('WEB_PAYMENTS_TOKEN_COPY_SUCCESS'));
    });
  }
}

function requestUpload(target, callback = null, options = {}) {
  options = {  
    accept: '.jpg,.png,.jpeg',
    preventError: false,
    onSelected: null,
    ...options 
  }

  $input = $(`<input type="file" accept="${options.accept}" style="display: none">`);
  Aj.state.fileLoading = Aj.state.fileLoading || 0;
  Aj.state.files = Aj.state.files || {};

  let upload = (file) => {
    Aj.uploadRequest('uploadMedia', file, { target: target }, res => {
      Aj.state.fileLoading--;

      if (res.ok) {
        Aj.state.files[target] = res.media;
      }
      if (res.error && !options.preventError) {
        TWebApp.showErrorToast(res.error);
      }
      if (callback) {
        callback(res);        
      }
    });
  }

  $input.on('change', () => {
    let file = $input[0].files[0];
    if (!file) return;

    processImage(file, res => upload(res), target);

    options.onSelected?.(file);

    Aj.state.fileLoading++;
    
    $input.remove();
  });
  $input.on('cancel', () => {
    callback({ cancel: true });

    $input.remove();
  })
  $('body').append($input);
  $input.click();
}


function processImage(file, callback, target='game_pic') {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (target == 'game_pic' || target == 'welcome_msg_pic') {
        canvas.width = 640;
        canvas.height = 360;
      } else {
        canvas.width = 800;
        canvas.height = 800;
      }

      const srcAspect = img.width / img.height;
      let dstAspect = canvas.width / canvas.height;

      let sx, sy, sw, sh;
      if (srcAspect > dstAspect) {
        sh = img.height;
        sw = sh * dstAspect;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / dstAspect;
        sx = 0;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(function(blob) {
        file = new File([blob], file.name + '.jpg', { type: 'image/jpeg' });
        callback(file);
      }, 'image/jpeg', 0.92);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function fuzzyMatch(needle, haystack) {
  var needle = needle.toLowerCase();
  var haystack = haystack.toLowerCase();
  for (var i = 0, j = 0; j < haystack.length; j++) {
    if (needle[i] === haystack[j]) {
      i++;
    }
    if (i === needle.length) {
      return true;
    }
  }
  return false;
}

var SimpleSpoiler = {
  init: function(el) {
    el.style.position = 'relative';
    var el_w = el.offsetWidth;
    var el_h = el.offsetHeight;
    var max_d = 5;
    var fps = 30;
    var lsec = 0.6;
    var count = 300;
    console.log(count)
    var points = [];
    for (var i = 0; i < count; i++) {
      var b = document.createElement('b');
      b.className = 'point';
      var point = {
        b: b,
        mx: el_w,
        my: el_h,
        md: max_d,
        cnt: count,
        fps: fps,
        lsec: lsec,
        t: SimpleSpoiler.random(0, fps * lsec)
      };
      SimpleSpoiler.resetPoint(point);
      SimpleSpoiler.updatePoint(point);
      el.appendChild(b);
      points.push(point);
    }
    var userAgent = window.navigator.userAgent;
    var isSafari = !!window.safari ||
                   !!(userAgent && (/\b(iPad|iPhone|iPod)\b/.test(userAgent) || (!!userAgent.match('Safari') && !userAgent.match('Chrome'))));
    var isRAF = isSafari;
    var interval = 1000 / fps;
    var last_render = +(new Date);
    var doRedraw = function() {
      var now = +Date.now();
      if (now - last_render >= interval) {
        for (var i = 0; i < spoiler.points.length; i++) {
          var point = spoiler.points[i];
          if (++point.t >= fps * lsec) {
            point.t = 0;
            SimpleSpoiler.resetPoint(point);
          }
          SimpleSpoiler.updatePoint(point);
        }
        last_render = now;
      }
      if (isRAF) {
        spoiler.raf = requestAnimationFrame(doRedraw)
      } else {
        var delay = interval - (now - last_render);
        spoiler.to = setTimeout(doRedraw, delay);
      }
    };
    var spoiler = {
      points: points
    };
    if (isRAF) {
      spoiler.raf = requestAnimationFrame(doRedraw)
    } else {
      spoiler.to = setTimeout(doRedraw, 20);
    }
    el._spoiler = spoiler;
  },
  destroy: function(el) {
    var spoiler = el._spoiler;
    if (spoiler.raf) {
      cancelAnimationFrame(spoiler.raf);
    }
    if (spoiler.to) {
      clearTimeout(spoiler.to);
    }
    for (var i = 0; i < spoiler.points.length; i++) {
      var point = spoiler.points[i];
      var b = point.b;
      b.parentNode && b.parentNode.removeChild(b);
    }
  },
  random: function(x, y) {
    return x + Math.floor(Math.random() * (y + 1 - x));
  },
  resetPoint: function(point) {
    var v = SimpleSpoiler.generateVector(point.cnt);
    point.x = SimpleSpoiler.random(point.md, point.mx - point.md);
    point.y = SimpleSpoiler.random(point.md, point.my - point.md);
    point.dx = v.dx;
    point.dy = v.dy;
    point.s = SimpleSpoiler.random(60, 80) * point.my / 3600;
  },
  updatePoint: function(point) {
    var b = point.b;
    var t = point.t;
    var d = point.fps * point.lsec / 3;
    var k = 360 / point.lsec / point.fps
    var x = point.x + k * t * point.dx;
    var y = point.y + k * t * point.dy;
    b.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + point.s + ')';
    b.style.opacity = (t < d ? (t / d) : (t < d*2 ? 1 : (d*3 - t) / d)) * 0.95;
  },
  generateVector: function(count) {
    var speedMax = 8;
    var speedMin = 4;
    var lifetime = 600;
    var value = SimpleSpoiler.random(0, 2 * count + 2);
    var negative = (value < count + 1);
    var mod = (negative ? value : (value - count - 1));
    var speed = speedMin + (((speedMax - speedMin) * mod) / count);
    var max = Math.ceil(speedMax * lifetime);
    var k = speed / lifetime;
    var x = (SimpleSpoiler.random(0, 2 * max + 1) - max) / max;
    var y = Math.sqrt(1 - x * x) * (negative ? -1 : 1);
    return {
      dx: k * x,
      dy: k * y,
    };
  }
};

var BotServerless = {
  init() {
    $('.js-serverless-toggle').on('click', function () {
      var toggleEl = this.querySelector('.tm-toggle');
      var isOn = toggleEl.classList.contains('tm-toggle-on');
      if (isOn) {
        WebApp.showPopup({
          title: uncleanHTML(l('WEB_CLOUD_DISABLE_CONFIRM_TITLE')),
          message: uncleanHTML(l('WEB_CLOUD_DISABLE_CONFIRM_BODY')),
          buttons: [
            { type: 'cancel' },
            { id: 'disable', text: l('WEB_CLOUD_DISABLE'), type: 'destructive' },
          ]
        }, (result) => {
          if (result !== 'disable') return;
          toggleEl.classList.remove('tm-toggle-on');
          Aj.apiRequest('disableCloud', { bid: Aj.state.botId }, (res) => {
            if (res.error) {
              toggleEl.classList.add('tm-toggle-on');
              TWebApp.showErrorToast(res.error);
            } else {
              Aj.onUnload(() => TWebApp.showSuccessToast(l('WEB_CLOUD_DISABLED')));
              Aj.location('/botfather/bot/' + Aj.state.botId + '/cloud');
            }
          });
        });
      } else {
        toggleEl.classList.add('tm-toggle-on');
        Aj.apiRequest('enableCloud', { bid: Aj.state.botId }, (res) => {
          if (res.error) {
            toggleEl.classList.remove('tm-toggle-on');
            TWebApp.showErrorToast(res.error);
          } else {
            Aj.onUnload(() => TWebApp.showSuccessToast(l('WEB_CLOUD_ENABLED')));
            Aj.location('/botfather/bot/' + Aj.state.botId + '/cloud');
          }
        });
      }
    });
  },
};

var BotCliAccess = {
  init() {
    $('.js-spoiler').each(function () {
      SimpleSpoiler.init(this);
    });
    $('body').on('click', '.js-spoiler', BotCliAccess.eClickSpoiler);

    $(document).on('click.cli', '.copy-btn', function () {
      navigator.clipboard.writeText(this.dataset.value);
      TWebApp.showSuccessToast(l('WEB_GENERIC_COPY_SUCCESS'));
    });

    $('.js-revoke-cli-token').on('click', BotCliAccess.askRevoke);

    Aj.onUnload(() => {
      $('body').off('click', '.js-spoiler', BotCliAccess.eClickSpoiler);
      $(document).off('click.cli', '.copy-btn');
    });
  },
  eClickSpoiler() {
    SimpleSpoiler.destroy(this);
    this.classList.add('js-spoiler-revealed');
  },
  askRevoke() {
    WebApp.showPopup({
      title: uncleanHTML(l('WEB_CLI_TOKEN_REVOKE_TITLE')),
      message: uncleanHTML(l('WEB_CLI_TOKEN_REVOKE_TEXT')),
      buttons: [
        { type: 'cancel' },
        { id: 'revoke', text: uncleanHTML(l('WEB_CLI_TOKEN_REVOKE_BTN')), type: 'destructive' },
      ]
    }, (result) => {
      if (result !== 'revoke') return;
      Aj.apiRequest('revokeCloudToken', { bid: Aj.state.botId }, (response) => {
        if (response.error) {
          TWebApp.showErrorToast(response.error);
        }
        if (response.ok) {
          $('.js-spoiler.js-cli-token').html(response.token);
          $('.copy-btn.js-cli-token').attr('data-value', response.token);
          $('.js-spoiler.js-cli-token').each(function () {
            SimpleSpoiler.init(this);
          }).removeClass('js-spoiler-revealed');
          TWebApp.showSuccessToast(l('WEB_CLI_TOKEN_REVOKE_SUCCESS'));
        }
      });
    });
  },
};

var BotCodeEditor = {
  savedCode: '',
  cm: null,
  apiMethod: '',
  apiParams: {},
  savedLangKey: '',
  saveErrorLangKey: '',

  init(elementId, opts) {
    var editorEl = document.getElementById(elementId);
    if (!editorEl) return;

    BotCodeEditor.savedCode = Aj.state.editorCode;
    BotCodeEditor.apiMethod = opts.apiMethod;
    BotCodeEditor.apiParams = opts.apiParams || {};
    BotCodeEditor.savedLangKey = opts.savedLangKey;
    BotCodeEditor.saveErrorLangKey = opts.saveErrorLangKey;
    BotCodeEditor.onSaveSuccess = opts.onSaveSuccess || null;

    var isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    var hintConfig = Aj.state.hintConfig;

    var cmOpts = {
      value: BotCodeEditor.savedCode,
      mode: 'javascript',
      theme: 'custom',
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      json: false,
      placeholder: opts.placeholder || '',
      extraKeys: $.extend({
        [(isMac ? 'Cmd' : 'Ctrl') + '-/']: 'toggleComment',
        [(isMac ? 'Cmd' : 'Ctrl') + '-Space']: function(cm) {
          if (hintConfig && hintConfig.custom) {
            cm.showHint({ hint: CodeMirror.hint.cloudjs, hintConfig: hintConfig });
          }
        },
        'Ctrl-`': function() {
          if (BotConsole.cm) BotConsole.cm.focus();
        },
      }, opts.extraKeys || {}),
    };

    BotCodeEditor.cm = CodeMirror(editorEl, cmOpts);

    BotCodeEditor.cm.on('inputRead', opts.inputRead || function(cm, event) {
      if (event.text[0] && /[\w.]/.test(event.text[0])) {
        if (hintConfig && hintConfig.custom) {
          cm.showHint({ hint: CodeMirror.hint.cloudjs, completeSingle: false, hintConfig: hintConfig });
        }
      }
    });

    BotCodeEditor.cm.on('change', BotCodeEditor.onEditorChange);

    WebApp.MainButton.setText(uncleanHTML(l('WEB_EDITOR_SAVE')));
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(BotCodeEditor.onSave);

    Aj.onUnload(function() {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotCodeEditor.onSave);
    });

    Aj.onBeforeUnload(function() {
      if (BotCodeEditor.cm && BotCodeEditor.cm.getValue() !== BotCodeEditor.savedCode) {
        return uncleanHTML(l('WEB_UNSAVED_CHANGES'));
      }
    });
  },

  onEditorChange() {
  },

  onSave() {
    var code = BotCodeEditor.cm.getValue();
    WebApp.MainButton.showProgress();
    var params = $.extend({ bid: Aj.state.botId, code: code }, BotCodeEditor.apiParams);
    Aj.apiRequest(BotCodeEditor.apiMethod, params, function(res) {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        if (BotCodeEditor.onSaveSuccess) {
          BotCodeEditor.savedCode = code;
          BotCodeEditor.onSaveSuccess(res);
        } else {
          BotCodeEditor.savedCode = code;
          Aj.onUnload(function() { TWebApp.showSuccessToast(l(BotCodeEditor.savedLangKey)); });
          TBackButton.onClick();
        }
      } else {
        TWebApp.showErrorToast(res.error || l(BotCodeEditor.saveErrorLangKey));
      }
    });
  },
};

var BotLibrary = {
  init() {
    var isNew = Aj.state.isLibraryNew;
    var $input = $('#library-name');

    if (isNew) {
      $input.on('input', function() {
        var filtered = $input.val().replace(/[^a-zA-Z0-9_\/-]/g, '');
        if (filtered.indexOf('//') !== -1) {
          filtered = filtered.replace(/\/+/g, '/');
        }
        $input.val(filtered);
      });
    }

    BotCodeEditor.init('library-editor', {
      apiMethod: 'saveCloudLibraryFile',
      apiParams: isNew ? {} : { name: Aj.state.libraryPath },
      savedLangKey: 'WEB_LIBRARY_FILE_SAVED',
      saveErrorLangKey: 'WEB_LIBRARY_FILE_SAVE_ERROR',
      placeholder: l('WEB_LIBRARY_CODE_PLACEHOLDER'),
    });

    if (isNew) {
      WebApp.MainButton.offClick(BotCodeEditor.onSave);
      WebApp.MainButton.onClick(BotLibrary.onSave);
      Aj.onUnload(function() { WebApp.MainButton.offClick(BotLibrary.onSave); });
    }

    if (!isNew) {
      $(document).on('click.libcopy', '.js-copy-lib-path', function() {
        navigator.clipboard.writeText(this.dataset.value);
        TWebApp.showSuccessToast(l('WEB_GENERIC_COPY_SUCCESS'));
      });
      $(document).on('click.curPage', '.js-editor-delete', function() {
        WebApp.showPopup({
          title: uncleanHTML(l('WEB_LIBRARY_DELETE_CONFIRM_TITLE')),
          message: uncleanHTML(l('WEB_LIBRARY_DELETE_CONFIRM_BODY')),
          buttons: [
            { id: 'delete', text: uncleanHTML(l('WEB_EDITOR_DELETE')), type: 'destructive' },
            { type: 'cancel' },
          ]
        }, function(result) {
          if (result !== 'delete') return;
          Aj.apiRequest('deleteCloudLibraryFile', { bid: Aj.state.botId, name: Aj.state.libraryPath }, function(res) {
            if (res.ok) {
              Aj.onUnload(function() { TWebApp.showSuccessToast(l('WEB_LIBRARY_FILE_DELETED')); });
              TBackButton.onClick();
            } else {
              TWebApp.showErrorToast(res.error);
            }
          });
        });
      });
    }
  },
  onSave() {
    var name = $('#library-name').val().trim();
    if (!name || !/^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+$/.test(name)) {
      TWebApp.showErrorToast(l('WEB_LIBRARY_FILE_PLACEHOLDER'));
      $('#library-name').focus();
      return;
    }
    var existing = Aj.state.existingLibraries || [];
    if (existing.indexOf(name) !== -1) {
      TWebApp.showErrorToast(l('WEB_LIBRARY_FILE_EXISTS'));
      $('#library-name').focus();
      return;
    }

    var code = BotCodeEditor.cm.getValue();
    WebApp.MainButton.showProgress();
    Aj.apiRequest('saveCloudLibraryFile', {
      bid: Aj.state.botId,
      name: name,
      code: code,
    }, function(res) {
      WebApp.MainButton.hideProgress();
      if (res.ok) {
        BotCodeEditor.savedCode = code;
        Aj.onUnload(function() { TWebApp.showSuccessToast(l('WEB_LIBRARY_FILE_SAVED')); });
        TBackButton.onClick();
      } else {
        TWebApp.showErrorToast(res.error || l('WEB_LIBRARY_FILE_SAVE_ERROR'));
      }
    });
  },
};

var BotDatabase = {
  init() {
    BotCodeEditor.init('database-editor', {
      apiMethod: 'saveCloudDatabase',
      savedLangKey: 'WEB_DATABASE_SAVED',
      saveErrorLangKey: 'WEB_DATABASE_SAVE_ERROR',
      onSaveSuccess: function(res) {
        if (res.error) {
          TWebApp.showErrorToast(res.error || l('WEB_DATABASE_SAVE_ERROR'));
        } else {
          TWebApp.showSuccessToast(l('WEB_DATABASE_SAVED'));
          $('#js-database-status').html(res.status_html);
        }
      },
    });
  },
};

var BotMigration = {
  currentStep: 0,
  totalSteps: 0,
  appliedIds: {},
  skippedIds: {},

  init() {
    BotMigration.totalSteps = Aj.state.migrationSteps ? Aj.state.migrationSteps.length : 0;
    BotMigration.currentStep = 0;

    WebApp.MainButton.onClick(BotMigration.onMainButton);
    WebApp.SecondaryButton.onClick(BotMigration.onSkip);
    Aj.onUnload(function() {
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(BotMigration.onMainButton);
      WebApp.SecondaryButton.hide();
      WebApp.SecondaryButton.offClick(BotMigration.onSkip);
    });

    BotMigration.updateButtons();
  },

  showScreen(screenId) {
    $('.migration-screen').hide();
    $('#' + screenId).show();
  },

  updateProgress() {
    $('#migration-step-label').text(l('WEB_MIGRATION_STEP').replace('{current}', BotMigration.currentStep).replace('{total}', BotMigration.totalSteps));
    var pct = (BotMigration.currentStep / BotMigration.totalSteps * 100);
    $('#migration-progress-bar').css('width', pct + '%');
  },

  updateButtons() {
    WebApp.MainButton.hideProgress();

    if (BotMigration.currentStep == 0) {
      WebApp.MainButton.setText(uncleanHTML(l('WEB_MIGRATION_START')));
      WebApp.MainButton.show();
      WebApp.SecondaryButton.hide();
      return;
    }

    if (BotMigration.currentStep <= BotMigration.totalSteps) {
      var stepInfo = Aj.state.migrationSteps[BotMigration.currentStep - 1];
      if (stepInfo.type == 'safe') {
        WebApp.MainButton.setText(uncleanHTML(l('WEB_MIGRATION_APPLY_CHANGES', {count: stepInfo.changeIds.length})));
        WebApp.MainButton.show();
        WebApp.SecondaryButton.setText(uncleanHTML(l('WEB_MIGRATION_SKIP')));
        WebApp.SecondaryButton.setParams({ position: 'bottom' });
        WebApp.SecondaryButton.show();
      } else if (stepInfo.type == 'warning') {
        WebApp.MainButton.setText(l('WEB_MIGRATION_APPLY_CHANGES', {count: 1}));
        WebApp.MainButton.show();
        WebApp.SecondaryButton.setText(uncleanHTML(l('WEB_MIGRATION_SKIP')));
        WebApp.SecondaryButton.setParams({ position: 'bottom' });
        WebApp.SecondaryButton.show();
      } else {
        WebApp.MainButton.setText(uncleanHTML(l('WEB_MIGRATION_CONTINUE')));
        WebApp.MainButton.show();
        WebApp.SecondaryButton.hide();
      }
    }
  },

  onMainButton() {
    if (BotMigration.currentStep == 0) {
      if (BotMigration.totalSteps == 0) {
        BotMigration.finishMigration();
      } else {
        BotMigration.currentStep = 1;
        $('#migration-header').show();
        BotMigration.showScreen('migration-step-1');
        BotMigration.updateProgress();
        BotMigration.updateButtons();
      }
    } else if (BotMigration.currentStep <= BotMigration.totalSteps) {
      var stepInfo = Aj.state.migrationSteps[BotMigration.currentStep - 1];
      if (stepInfo.type == 'manual' || stepInfo.type == 'undocumented') {
        BotMigration.advanceStep();
      } else if (stepInfo.type == 'warning') {
        WebApp.showPopup({
          title: uncleanHTML(l('WEB_MIGRATION_APPLY_CONFIRM')),
          message: uncleanHTML(stepInfo.warningText || l('WEB_MIGRATION_APPLY_CONFIRM_TEXT')),
          buttons: [
            { id: 'delete', text: uncleanHTML(l('WEB_MIGRATION_APPLY')), type: 'destructive' },
            { type: 'cancel' },
          ]
        }, function(result) {
          if (result !== 'delete') return;
          BotMigration.onApply();
        });
      } else {
        BotMigration.onApply();
      }
    }
  },

  onSkip() {
    var stepInfo = Aj.state.migrationSteps[BotMigration.currentStep - 1];
    if (!stepInfo) return;
    for (var i = 0; i < stepInfo.changeIds.length; i++) {
      BotMigration.skippedIds[stepInfo.changeIds[i]] = true;
    }
    BotMigration.advanceStep();
  },

  onApply() {
    var stepInfo = Aj.state.migrationSteps[BotMigration.currentStep - 1];
    if (!stepInfo) return;
    WebApp.MainButton.showProgress();
    Aj.apiRequest('migrateCloudDatabase', {
      bid: Aj.state.botId,
      apply: stepInfo.changeIds,
    }, function(res) {
      WebApp.MainButton.hideProgress();
      if (res.toast) {
        TWebApp.showSuccessToast(res.toast);
      }
      if (res.ok) {
        for (var i = 0; i < stepInfo.changeIds.length; i++) {
          BotMigration.appliedIds[stepInfo.changeIds[i]] = true;
        }
        BotMigration.advanceStep();
      } else {
        WebApp.showPopup({
          title: uncleanHTML(l('WEB_MIGRATION_APPLY_ERROR')),
          message: uncleanHTML(res.error || 'Unknown error')
        });
        WebApp.MainButton.setText(uncleanHTML(l('WEB_MIGRATION_RETRY')));
        WebApp.SecondaryButton.setText(uncleanHTML(l('WEB_MIGRATION_SKIP')));
        WebApp.SecondaryButton.setParams({ position: 'bottom' });
        WebApp.SecondaryButton.show();
      }
    });
  },

  advanceStep() {
    BotMigration.currentStep++;
    if (BotMigration.currentStep <= BotMigration.totalSteps) {
      BotMigration.showScreen('migration-step-' + BotMigration.currentStep);
      BotMigration.updateProgress();
      BotMigration.updateButtons();
    } else {
      BotMigration.finishMigration();
    }
  },

  finishMigration() {
    var skippedCount = 0;
    for (var i = 0; i < Aj.state.migrationSteps.length; i++) {
      var stepInfo = Aj.state.migrationSteps[i];
      for (var j = 0; j < stepInfo.changeIds.length; j++) {
        if (!BotMigration.appliedIds[stepInfo.changeIds[j]]) {
          skippedCount++;
        }
      }
    }
    var dbUrl = '/botfather/bot/' + Aj.state.botId + '/serverless/database';
    Aj.onUnload(function() {
      if (skippedCount > 0) {
        TWebApp.showWarningToast(l('WEB_MIGRATION_INCOMPLETED'));
      } else {
        TWebApp.showSuccessToast(l('WEB_MIGRATION_COMPLETED'));
      }
    });
    Aj.location(dbUrl);
  },

};

var BotHandler = {
  init() {
    BotCodeEditor.init('handler-editor', {
      apiMethod: 'saveCloudHandler',
      apiParams: { type: Aj.state.handlerType },
      savedLangKey: 'WEB_HANDLER_SAVED',
      saveErrorLangKey: 'WEB_HANDLER_SAVE_ERROR',
    });

    BotConsole.init(Aj.state.handlerType);

    if (!Aj.state.isHandlerNew) {
      $(document).on('click.curPage', '.js-editor-delete', function() {
        WebApp.showPopup({
          title: uncleanHTML(l('WEB_HANDLER_DELETE_CONFIRM_TITLE')),
          message: uncleanHTML(l('WEB_HANDLER_DELETE_CONFIRM_BODY')),
          buttons: [
            { id: 'delete', text: uncleanHTML(l('WEB_EDITOR_DELETE')), type: 'destructive' },
            { type: 'cancel' },
          ]
        }, function(result) {
          if (result !== 'delete') return;
          Aj.apiRequest('deleteCloudHandler', { bid: Aj.state.botId, type: Aj.state.handlerType }, function(res) {
            if (res.ok) {
              Aj.onUnload(function() { TWebApp.showSuccessToast(l('WEB_HANDLER_DELETED')); });
              TBackButton.onClick();
            } else {
              TWebApp.showErrorToast(res.error);
            }
          });
        });
      });
    }
  },
};

var BotHandlers = {
  init() {
    $(document).on('click.curPage', '.js-webhook-sync', BotHandlers.onSync);
  },

  onSync() {
    var $row = $('.js-webhook-sync');
    if ($row.hasClass('js-webhook-syncing')) return;
    $row.addClass('js-webhook-syncing');
    $row.find('.js-status-action').html(l('WEB_WEBHOOK_SYNCING'));
    Aj.apiRequest('syncCloudWebhook', { bid: Aj.state.botId }, function(res) {
      if (res.ok) {
        $('#js-webhook-status').html(res.status_html);
        TWebApp.showSuccessToast(l('WEB_WEBHOOK_SYNCED'));
      } else {
        $row.removeClass('js-webhook-syncing');
        $row.find('.js-status-action').html(l('WEB_WEBHOOK_SYNC'));
        TWebApp.showErrorToast(res.error || l('WEB_WEBHOOK_SYNC_ERROR'));
      }
    });
  },
};

var BotConsole = {
  cm: null,
  guarded: null,
  history: [],
  historyIndex: 0,
  draft: '',
  isRunning: false,

  init(functionName) {
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    var el = document.getElementById('console-editor');
    if (!el) return;

    BotConsole.cm = CodeMirror(el, {
      mode: 'javascript',
      theme: 'custom',
      lineNumbers: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      guardedRegion: {
        prefix: BotConsole.getPrefix(functionName),
        suffix: '});',
        placeholder: l('WEB_CONSOLE_PLACEHOLDER'),
        prefixClassName: functionName ? '' : 'cm-guarded-default',
      },
      extraKeys: {
        'Up': BotConsole.onUp,
        'Down': BotConsole.onDown,
        'Ctrl-`': function() {
          if (BotCodeEditor.cm) BotCodeEditor.cm.focus();
        },
      },
    });
    BotConsole.cm.addKeyMap({
      'Enter': BotConsole.onSubmit,
      'Shift-Enter': BotConsole.onShiftEnter,
    });

    BotConsole.guarded = BotConsole.cm.getGuardedRegion();
  },

  getPrefix(name) {
    return (name || l('WEB_FUNCTION_NAME_PLACEHOLDER')) + '({';
  },

  updatePrefix(name) {
    if (!BotConsole.cm || !BotConsole.guarded) return;
    BotConsole.guarded.setPrefix(BotConsole.getPrefix(name));
    BotConsole.guarded.setPrefixClassName(name ? '' : 'cm-guarded-default');
  },

  onShiftEnter(cm) {
    const explodeIfBetweenPair = function(cm) {
      var conf = cm.state.closeBrackets;
      var explode = (typeof conf === 'object' && conf && conf.explode) || '[]{}';
      if (!explode || cm.getOption('disableInput')) return CodeMirror.Pass;

      var ranges = cm.listSelections();
      for (var i = 0; i < ranges.length; i++) {
        if (!ranges[i].empty()) return CodeMirror.Pass;
        var h = ranges[i].head;
        var around = cm.getRange(
          { line: h.line, ch: h.ch - 1 },
          { line: h.line, ch: h.ch + 1 }
        );
        if (around.length !== 2 || explode.indexOf(around) % 2 !== 0) {
          return CodeMirror.Pass;
        }
      }
      cm.operation(function () {
        var sep = cm.lineSeparator() || '\n';
        cm.replaceSelection(sep + sep, null);
        cm.execCommand('goCharLeft');
        var rs = cm.listSelections();
        for (var i = 0; i < rs.length; i++) {
          cm.indentLine(rs[i].head.line, null, true);
          cm.indentLine(rs[i].head.line + 1, null, true);
        }
      });
      return true;
    };
    if (explodeIfBetweenPair(cm) !== CodeMirror.Pass) return;
    cm.execCommand('newlineAndIndent');
  },

  onSubmit() {
    if (BotConsole.isRunning) return CodeMirror.Pass;

    var editable = BotConsole.guarded.getEditable();
    var isHandler = Aj.state.consoleMethod === 'runCloudHandler';
    var moduleName = '';
    if (isHandler) {
      moduleName = Aj.state.handlerType;
    } else if (Aj.state.isFunctionNew) {
      moduleName = ($('#function-name').val() || '').trim();
    } else {
      moduleName = Aj.state.functionName;
    }

    $('#console .tm-console-line').remove();

    if (BotConsole.history.length === 0 || BotConsole.history[BotConsole.history.length - 1] !== editable) {
      BotConsole.history.push(editable);
    }
    BotConsole.historyIndex = BotConsole.history.length;
    BotConsole.draft = '';

    BotConsole.addHistoryLine();
    BotConsole.guarded.setEditable('');
    $('#console-spin-line').removeClass('hide');

    var argsObj = null;
    if (editable) {
      try {
        argsObj = JSON5.parse('{' + editable + '}');
      } catch (e) {
        BotConsole.addLine('error', 'Cannot parse arguments');
        BotConsole.cm.refresh();
        BotConsole.cm.focus();
        return;
      }
    }

    var code = BotCodeEditor.cm.getValue();
    BotConsole.isRunning = true;
    $('#console-input-line').addClass('hide');

    var params = {
      bid: Aj.state.botId,
      code: code,
      args: argsObj ? JSON.stringify(argsObj) : '{}',
    };
    if (isHandler) {
      params.type = moduleName;
    } else {
      params.name = moduleName;
    }

    Aj.apiRequest(Aj.state.consoleMethod, params, function(res) {
      BotConsole.isRunning = false;
      if (res.log && res.log.length) {
        let prev_t = 0;
        for (var i = 0; i < res.log.length; i++) {
          var entry = res.log[i], str;
          if (entry.M) {
            str = entry.M + ' [...]';
          } else {
            str = entry.m || '';
          }
          var delta = entry.t - prev_t;
          prev_t = entry.t;
          BotConsole.addLine(entry._, str, '+' + BotConsole.formatDuration(delta));
        }
      }
      $('#console-spin-line').addClass('hide');
      if (res.error) {
        BotConsole.addLine('error', res.error, BotConsole.formatDuration(res.time));
      } else {
        let content = res.result;
        if (res.format == 'json') {
          content = JSON.parse(content);
        }
        try { content = JSON5.stringify(content); } catch(e) {}
        BotConsole.addLine('output', content, BotConsole.formatDuration(res.time));
      }
      $('#console-input-line').removeClass('hide');
      BotConsole.cm.refresh();
      BotConsole.cm.focus();
    });
  },

  addHistoryLine() {
    var $inputLine = $('#console-input-line');
    var $line = $('<div class="tm-console-line">');
    $line.append($('<div class="tm-console-gutter tm-console-gutter--in">').text('>'));
    var $body = $('<div class="tm-console-body">');
    var $pre = $('<pre class="cm-s-custom">');
    CodeMirror.runMode(BotConsole.cm.getValue(), 'javascript', $pre[0]);
    $body.append($pre);
    $line.append($body);
    $line.insertBefore($inputLine);
  },

  formatDuration(dur) {
    let ms = Math.round(dur * 1000);
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  },

  addLine(type, content, time) {
    var $inputLine = $('#console-input-line');
    var $line = $('<div class="tm-console-line tm-console-line--' + BotConsole.lineClass(type) + '">');
    $line.append($('<div class="tm-console-gutter">').text(BotConsole.gutterChar(type)));
    var $body = $('<div class="tm-console-body">');
    $body.append($('<pre>').text(String(content)));
    if (time) {
      $body.append($('<span class="tm-console-time">').text(time));
    }
    $line.append($body);
    $line.insertBefore($inputLine);
  },

  onUp() {
    var cursor = BotConsole.cm.getCursor();
    var startPos = BotConsole.cm.posFromIndex(BotConsole.guarded.prefix.length);
    if (cursor.line > startPos.line) {
      return CodeMirror.Pass;
    }
    if (BotConsole.historyIndex <= 0) return CodeMirror.Pass;
    if (BotConsole.historyIndex === BotConsole.history.length) {
      BotConsole.draft = BotConsole.guarded.getEditable();
    }
    BotConsole.historyIndex--;
    BotConsole.guarded.setEditable(BotConsole.history[BotConsole.historyIndex]);
    return false;
  },

  onDown() {
    var cursor = BotConsole.cm.getCursor();
    var endPos = BotConsole.cm.posFromIndex(BotConsole.cm.getValue().length - BotConsole.guarded.suffix.length);
    if (cursor.line < endPos.line) {
      return CodeMirror.Pass;
    }
    if (BotConsole.historyIndex >= BotConsole.history.length) return CodeMirror.Pass;
    BotConsole.historyIndex++;
    if (BotConsole.historyIndex === BotConsole.history.length) {
      BotConsole.guarded.setEditable(BotConsole.draft);
    } else {
      BotConsole.guarded.setEditable(BotConsole.history[BotConsole.historyIndex]);
    }
    return false;
  },

  lineClass(type) {
    if (type === 'input') return 'in';
    if (type === 'output') return 'out';
    if (type === 'error' || type === 'err') return 'err';
    if (type === 'wrn') return 'wrn';
    if (type === 'inf') return 'inf';
    if (type === 'log' || type === 'dbg') return 'log';
    return 'in';
  },

  gutterChar(type) {
    if (type === 'input') return '>';
    if (type === 'output') return '<';
    if (type === 'error' || type === 'err') return 'x';
    if (type === 'wrn') return '!';
    if (type === 'dbg') return '·';
    if (type === 'inf') return 'i';
    if (type === 'log' || type === 'dbg') return '';
    return '>';
  },
};


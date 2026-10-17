# Javascript SDK


The Javascript SDK helps you easily integrate Telegram Passport requests into your website. Check out our [GitHub repository](https://github.com/TelegramMessenger/TGPassportPHPSample) to see samples using this SDK.

### Installation

[Download](https://github.com/TelegramMessenger/TGPassportJsSDK) and include the Javascript SDK in the head section of your page:

	<script src="telegram-passport.js"></script>
    
### Usage

Simply call [Telegram.Passport.createAuthButton](#createauthbutton) to create the default Telegram Passport button:

	<div id="telegram_passport_auth"></div>
	<script>
      Telegram.Passport.createAuthButton('telegram_passport_auth', {
        bot_id:       123456, // place id of your bot here
        scope:        {data: [{type: 'id_document', selfie: true}, 'address_document', 'phone_number', 'email'], v: 1},
        public_key:   '-----BEGIN PUBLIC KEY----- ...', // place public key of your bot here
        nonce:        'ab2df83746a87d2f3bd6...', // place nonce here
        callback_url: 'https://example.com/callback/' // place callback url here
      });
    </script>
    
> Note that if you use a [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) header with the [frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src)/[child-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/child-src) directive you should allow `tg:` source to prevent errors in some browsers (e.g. Firefox)

#### createAuthButton
    
| Parameters | Type | Required | Description |
| --- | --- | --- | --- |
|element|String or DOMNode|Yes|ID of the element or the element which will be the container for the button|
|auth_params|[AuthParameters](#authparameters) or Function|Yes|Javascript object with auth parameters or a function which returns [AuthParameters](#authparameters)|
|options|[AuthButtonOptions](#authbuttonoptions)|Optional|Button options|

#### AuthParameters
    
| Field | Type | Description |
| --- | --- | --- |
|bot_id|Integer|Unique identifier for the bot|
|scope|[PassportScope](/passport.md#passportscope)|A JSON-serialized object describing the data you want to request|
|public_key|String|Public key of your bot|
|nonce|String|Bot-specified nonce|
|callback_url|String|_Optional._ URL to which the user will be redirected.|

#### AuthButtonOptions
    
| Field | Type | Description |
| --- | --- | --- |
|text|String|_Optional._ Text on the button. Defaults to "Log In With Telegram".|
|radius|Integer|_Optional._ Radius of the button and tooltip in px. Defaults to 23.|
|tooltip_text|String|_Optional._ Text on the tooltip. Defaults to "Please <u>install Telegram</u> to use this option.".|
|tooltip_position|String|_Optional._ Tooltip position. One of "top", "bottom", "left", "right". Defaults to "bottom".|
|tooltip_force|Boolean|_Optional._ Always show a tooltip. Defaults to _false_.|

You can also create your custom button. Do not forget about the tooltip. You should add an `onclick` listener to the button which calls the `Telegram.Passport.auth(auth_params, tooltip_toggle);` method:

	<button id="telegram_passport_auth">Log In With Telegram</button>
	<script>
      var auth_button = document.getElementById('telegram_passport_auth');
      var auth_params = {
        bot_id:        XXXXXX, // place id of your bot here
        scope:         {data: [{type: 'id_document', selfie: true}, 'address_document', 'phone_number', 'email'], v: 1},
        public_key:    '-----BEGIN PUBLIC KEY----- ...', // place public key of your bot here
        nonce:         'ab2df83746a87d2f3bd6...', // place nonce here
        callback_url:  'https://example.com/callback/' // place callback url here
      };
      auth_button.addEventListener('click', function() {
      	Telegram.Passport.auth(auth_params, function(show) {
          if (show) {
            // some code to show tooltip
          } else {
            // some code to hide tooltip
          }
        });
      }, false);
    </script>
    
### Receiving information

When the user confirms your request by pressing the "Authorize" button, it will be redirected to the URL specified in the *callback_url* with the parameter `tg_passport=success` and the Bot API will send the bot an [Update](/bots/api/types/update.md) with the field *passport_data* which contains encrypted [Telegram Passport data](/bots/api/types/passportdata.md).

If the user cancels your request, it will be redirected to the URL specified in the *callback_url* with the parameter `tg_passport=cancel`.

If an error occurs during the request, the user will be redirected to the URL specified in the *callback_url* with the parameter `tg_passport=error`. The parameter `error` will contain one of the following values: **BOT_INVALID**, **PUBLIC_KEY_REQUIRED**, **PUBLIC_KEY_INVALID**, **SCOPE_EMPTY**, **NONCE_EMPTY**.


# auth.Authorization

Object contains info on user authorization.

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;

---functions---

auth.signUp#aac7b717 flags:# no_joined_notifications:flags.0?true phone_number:string phone_code_hash:string first_name:string last_name:string = auth.Authorization;
auth.signIn#8d52a951 flags:# phone_number:string phone_code_hash:string phone_code:flags.0?string email_verification:flags.1?EmailVerification = auth.Authorization;
auth.importAuthorization#a57a7dad id:long bytes:bytes = auth.Authorization;
auth.importBotAuthorization#67a3ff2c flags:int api_id:int api_hash:string bot_auth_token:string = auth.Authorization;
auth.checkPassword#d18b4d16 password:InputCheckPasswordSRP = auth.Authorization;
auth.recoverPassword#37096c70 flags:# code:string new_settings:flags.0?account.PasswordInputSettings = auth.Authorization;
auth.importWebTokenAuthorization#2db873a9 api_id:int api_hash:string web_auth_token:string = auth.Authorization;
auth.finishPasskeyLogin#9857ad07 flags:# credential:InputPasskeyCredential from_dc_id:flags.0?int from_auth_key_id:flags.0?long = auth.Authorization;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [auth.authorization](/constructor/auth.authorization.md) | Contains user authorization info. |
| [auth.authorizationSignUpRequired](/constructor/auth.authorizationSignUpRequired.md) | An account with this phone number doesn't exist on telegram: the user has to [enter basic information and sign up](/api/auth.md) |

### Methods

| Method | Description |
| --- | --- |
| [auth.signUp](/method/auth.signUp.md) | Registers a validated phone number in the system. |
| [auth.signIn](/method/auth.signIn.md) | Signs in a user with a validated phone number. |
| [auth.importAuthorization](/method/auth.importAuthorization.md) | Logs in a user using a key transmitted from his native data-center. |
| [auth.importBotAuthorization](/method/auth.importBotAuthorization.md) | Login as a bot |
| [auth.checkPassword](/method/auth.checkPassword.md) | Try logging to an account protected by a [2FA password](/api/srp.md). |
| [auth.recoverPassword](/method/auth.recoverPassword.md) | Reset the [2FA password](/api/srp.md) using the recovery code sent using [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md). |
| [auth.importWebTokenAuthorization](/method/auth.importWebTokenAuthorization.md) | Login by importing an authorization token |
| [auth.finishPasskeyLogin](/method/auth.finishPasskeyLogin.md) | Complete login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info.\
\
Must be sent to the user's native DC, as specified by the `user_handle` (`dcId:userId`) returned in the passkey assertion, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for the full flow. |
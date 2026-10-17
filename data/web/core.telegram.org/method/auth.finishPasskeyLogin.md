# auth.finishPasskeyLogin

Complete login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info.

Must be sent to the user's native DC, as specified by the `user_handle` (`dcId:userId`) returned in the passkey assertion, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for the full flow.

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.finishPasskeyLogin#9857ad07 flags:# credential:InputPasskeyCredential from_dc_id:flags.0?int from_auth_key_id:flags.0?long = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **credential** | [InputPasskeyCredential](/type/InputPasskeyCredential.md) | Passkey assertion result. |
| **from\_dc\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | DC ID used for the initial [auth.initPasskeyLogin](/method/auth.initPasskeyLogin.md) request; set only if the user's DC is different from the DC used for the initial [auth.initPasskeyLogin](/method/auth.initPasskeyLogin.md). |
| **from\_auth\_key\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Auth key ID for the connection to `from_dc_id` (use the permanent auth key ID if PFS is enabled); set only if the user's DC is different from the DC used for the initial [auth.initPasskeyLogin](/method/auth.initPasskeyLogin.md). |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 500 | AUTH\_RESTART | Restart the authorization process. |
| 400 | CREDENTIAL\_INVALID | The specified credential is invalid. |
| 400 | PASSKEY\_ORIGIN\_MISMATCH | Third-party clients currently don't support passkeys even when changing the origin. |

### Related pages

#### [auth.initPasskeyLogin](/method/auth.initPasskeyLogin.md)
Initialize login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info.

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
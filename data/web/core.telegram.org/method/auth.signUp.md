# auth.signUp

Registers a validated phone number in the system.

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.signUp#aac7b717 flags:# no_joined_notifications:flags.0?true phone_number:string phone_code_hash:string first_name:string last_name:string = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_joined\_notifications** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, users on Telegram that have already added `phone_number` to their contacts will *not* receive signup notifications about this user. |
| **phone\_number** | [string](/type/string.md) | Phone number in the international format |
| **phone\_code\_hash** | [string](/type/string.md) | SMS-message ID |
| **first\_name** | [string](/type/string.md) | New user first name |
| **last\_name** | [string](/type/string.md) | New user last name |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FIRSTNAME\_INVALID | The first name is invalid. |
| 400 | LASTNAME\_INVALID | The last name is invalid. |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 400 | PHONE\_CODE\_INVALID | The provided phone code is invalid. |
| 400 | PHONE\_NUMBER\_FLOOD | You asked for the code too many times. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 400 | PHONE\_NUMBER\_OCCUPIED | The phone number is already in use. |
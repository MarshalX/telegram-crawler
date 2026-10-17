# auth.requestFirebaseSms

Request an SMS code via Firebase.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.requestFirebaseSms#8e39261e flags:# phone_number:string phone_code_hash:string safety_net_token:flags.0?string play_integrity_token:flags.2?string ios_push_secret:flags.1?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **phone\_number** | [string](/type/string.md) | Phone number |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash returned by [auth.sendCode](/method/auth.sendCode.md) |
| **safety\_net\_token** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | On Android, a JWS object obtained as described in the [auth documentation »](/api/auth.md) |
| **play\_integrity\_token** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | On Android, an object obtained as described in the [auth documentation »](/api/auth.md) |
| **ios\_push\_secret** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Secret token received via an apple push notification |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
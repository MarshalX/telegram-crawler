# auth.sentCodeTypeFirebaseSms

An authentication code should be delivered via SMS after Firebase attestation, as described in the [auth documentation »](/api/auth.md).

```tl
auth.sentCodeTypeFirebaseSms#9fd736 flags:# nonce:flags.0?bytes play_integrity_project_id:flags.2?long play_integrity_nonce:flags.2?bytes receipt:flags.1?string push_timeout:flags.1?int length:int = auth.SentCodeType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **nonce** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | On Android, the nonce to be used as described in the [auth documentation »](/api/auth.md) |
| **play\_integrity\_project\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | Google Play Integrity project ID |
| **play\_integrity\_nonce** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[bytes](/type/bytes.md) | Play Integrity API nonce |
| **receipt** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | On iOS, must be compared with the `receipt` extracted from the received push notification. |
| **push\_timeout** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | On iOS: if a push notification with the `ios_push_secret` isn't received within `push_timeout` seconds, the `next_type` authentication method must be used, with [auth.resendCode](/method/auth.resendCode.md). |
| **length** | [int](/type/int.md) | Length of the code that will be delivered. |

### Type
[auth.SentCodeType](/type/auth.SentCodeType.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.

#### [auth.resendCode](/method/auth.resendCode.md)
Resend the login code via another medium, the phone code type is determined by the return value of the previous auth.sendCode/auth.resendCode: see [login](/api/auth.md) for more info.
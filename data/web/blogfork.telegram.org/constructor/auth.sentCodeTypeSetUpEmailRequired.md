# auth.sentCodeTypeSetUpEmailRequired

The user should add and verify an email address in order to login as described [here »](/api/auth.md#email-verification).

```tl
auth.sentCodeTypeSetUpEmailRequired#a5491dea flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true = auth.SentCodeType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **apple\_signin\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether authorization through Apple ID is allowed |
| **google\_signin\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether authorization through Google ID is allowed |

### Type
[auth.SentCodeType](/type/auth.SentCodeType.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
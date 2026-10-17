# auth.authorizationSignUpRequired

An account with this phone number doesn't exist on telegram: the user has to [enter basic information and sign up](/api/auth.md)

```tl
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **terms\_of\_service** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[help.TermsOfService](/type/help.TermsOfService.md) | Telegram's terms of service: the user must read and accept the terms of service before signing up to telegram |

### Type
[auth.Authorization](/type/auth.Authorization.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
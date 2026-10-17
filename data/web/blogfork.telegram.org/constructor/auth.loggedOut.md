# auth.loggedOut

[Future auth token »](/api/auth.md#future-auth-tokens) to be used on subsequent authorizations

```tl
auth.loggedOut#c3a2835f flags:# future_auth_token:flags.0?bytes = auth.LoggedOut;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **future\_auth\_token** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | [Future auth token »](/api/auth.md#future-auth-tokens) to be used on subsequent authorizations |

### Type
[auth.LoggedOut](/type/auth.LoggedOut.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
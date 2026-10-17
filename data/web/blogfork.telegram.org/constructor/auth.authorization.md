# auth.authorization

Contains user authorization info.

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **setup\_password\_required** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Suggests the user to set up a 2-step verification password to be able to log in again |
| **otherwise\_relogin\_days** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If and only if setup\_password\_required is set and the user declines to set a 2-step verification password, they will be able to log into their account via SMS again only after this many days pass. |
| **tmp\_sessions** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Number of [parallel sessions](/api/datacenter.md#parallel-sessions) the client may open to the main connection of its home DC to increase throughput; if absent or `≤ 1`, a single main session must be used |
| **future\_auth\_token** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[bytes](/type/bytes.md) | A [future auth token](/api/auth.md#future-auth-tokens) |
| **user** | [User](/type/User.md) | Info on authorized user |

### Type
[auth.Authorization](/type/auth.Authorization.md)

### Related pages

#### [Working with Different Data Centers](/api/datacenter.md)
How to connect to the closest DC access point for faster interaction with the API, and things to watch out for when developing a client.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
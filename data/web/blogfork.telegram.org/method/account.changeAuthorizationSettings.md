# account.changeAuthorizationSettings

Change settings related to a session.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.changeAuthorizationSettings#40f48462 flags:# confirmed:flags.3?true hash:long encrypted_requests_disabled:flags.0?Bool call_requests_disabled:flags.1?Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **confirmed** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, [confirms a newly logged in session »](/api/auth.md#confirming-login). |
| **hash** | [long](/type/long.md) | Session ID from the [authorization](/constructor/authorization.md) constructor, fetchable using [account.getAuthorizations](/method/account.getAuthorizations.md) |
| **encrypted\_requests\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | Whether to enable or disable receiving encrypted chats: if the flag is not set, the previous setting is not changed |
| **call\_requests\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Bool](/type/Bool.md) | Whether to enable or disable receiving calls: if the flag is not set, the previous setting is not changed |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | HASH\_INVALID | The provided hash is invalid. |

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.

#### [authorization](/constructor/authorization.md)
Logged-in session

#### [account.getAuthorizations](/method/account.getAuthorizations.md)
Get logged-in sessions
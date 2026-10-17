# authorization

Logged-in session

```tl
authorization#ad01d61d flags:# current:flags.0?true official_app:flags.1?true password_pending:flags.2?true encrypted_requests_disabled:flags.3?true call_requests_disabled:flags.4?true unconfirmed:flags.5?true hash:long device_model:string platform:string system_version:string api_id:int app_name:string app_version:string date_created:int date_active:int ip:string country:string region:string = Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **current** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is the current session |
| **official\_app** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the session is from an official app |
| **password\_pending** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the session is still waiting for a 2FA password |
| **encrypted\_requests\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this session will accept encrypted chats |
| **call\_requests\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this session will accept phone calls |
| **unconfirmed** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the session is [unconfirmed, see here »](/api/auth.md#confirming-login) for more info. |
| **hash** | [long](/type/long.md) | Identifier |
| **device\_model** | [string](/type/string.md) | Device model |
| **platform** | [string](/type/string.md) | Platform |
| **system\_version** | [string](/type/string.md) | System version |
| **api\_id** | [int](/type/int.md) | [API ID](/api/obtaining_api_id.md) |
| **app\_name** | [string](/type/string.md) | App name |
| **app\_version** | [string](/type/string.md) | App version |
| **date\_created** | [int](/type/int.md) | When was the session created |
| **date\_active** | [int](/type/int.md) | When was the session last active |
| **ip** | [string](/type/string.md) | Last known IP |
| **country** | [string](/type/string.md) | Country determined from IP |
| **region** | [string](/type/string.md) | Region determined from IP |

### Type
[Authorization](/type/Authorization.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.

#### [Creating your Telegram Application](/api/obtaining_api_id.md)
How to get your application identifier and create a new Telegram app.
# initConnection

Initialize connection

```tl
---functions---
initConnection#c1cd5ea9 {X:Type} flags:# api_id:int device_model:string system_version:string app_version:string system_lang_code:string lang_pack:string lang_code:string proxy:flags.0?InputClientProxy params:flags.1?JSONValue query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **api\_id** | [int](/type/int.md) | Application identifier (see. [App configuration](/myapp)) |
| **device\_model** | [string](/type/string.md) | Device model |
| **system\_version** | [string](/type/string.md) | Operation system version |
| **app\_version** | [string](/type/string.md) | Application version |
| **system\_lang\_code** | [string](/type/string.md) | Code for the language used on the device's OS, ISO 639-1 standard |
| **lang\_pack** | [string](/type/string.md) | Platform identifier (i.e. `android`, `tdesktop`, etc). |
| **lang\_code** | [string](/type/string.md) | Either an ISO 639-1 language code or a language pack name obtained from a [language pack link](/api/links.md#language-pack-links). |
| **proxy** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputClientProxy](/type/InputClientProxy.md) | Info about an MTProto proxy |
| **params** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[JSONValue](/type/JSONValue.md) | Additional initConnection parameters. \
For now, only the `tz_offset` field is supported, for specifying the timezone offset in seconds. |
| **query** | !X | The query itself |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CONNECTION\_LAYER\_INVALID | Layer invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
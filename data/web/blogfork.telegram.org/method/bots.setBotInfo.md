# bots.setBotInfo

Set localized name, about text and description of a bot (or of the current account, if called by a bot).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.setBotInfo#10cf3123 flags:# bot:flags.2?InputUser lang_code:string name:flags.3?string about:flags.0?string description:flags.1?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputUser](/type/InputUser.md) | If called by a user, **must** contain the peer of a bot we own. |
| **lang\_code** | [string](/type/string.md) | Language code, if left empty update the fallback about text and description |
| **name** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | New bot name |
| **about** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | New about text |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | New description |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | USER\_BOT\_INVALID | User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts. |
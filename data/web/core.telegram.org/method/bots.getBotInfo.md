# bots.getBotInfo

Get localized name, about text and description of a bot (or of the current account, if called by a bot).

```tl
bots.botInfo#e8a775b0 name:string about:string description:string = bots.BotInfo;
---functions---
bots.getBotInfo#dcd914fd flags:# bot:flags.0?InputUser lang_code:string = bots.BotInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputUser](/type/InputUser.md) | If called by a user, **must** contain the peer of a bot we own. |
| **lang\_code** | [string](/type/string.md) | Language code, if left empty this method will return the fallback about text and description. |

### Result
[bots.BotInfo](/type/bots.BotInfo.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | LANG\_CODE\_INVALID | The specified language code is invalid. |
| 400 | USER\_BOT\_INVALID | User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts. |
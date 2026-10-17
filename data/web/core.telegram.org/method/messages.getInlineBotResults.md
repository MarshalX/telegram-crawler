# messages.getInlineBotResults

Query an inline bot

```tl
messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;
---functions---
messages.getInlineBotResults#514e999d flags:# bot:InputUser peer:InputPeer geo_point:flags.0?InputGeoPoint query:string offset:string = messages.BotResults;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot** | [InputUser](/type/InputUser.md) | The bot to query |
| **peer** | [InputPeer](/type/InputPeer.md) | The currently opened chat |
| **geo\_point** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputGeoPoint](/type/InputGeoPoint.md) | The geolocation, if requested |
| **query** | [string](/type/string.md) | The query |
| **offset** | [string](/type/string.md) | The offset within the results, will be passed directly as-is to the bot. |

### Result
[messages.BotResults](/type/messages.BotResults.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INLINE\_DISABLED | This bot can't be used in inline mode. |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | BOT\_RESPONSE\_TIMEOUT | A timeout occurred while fetching data from the bot. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| -503 | Timeout | Timeout while fetching data. |
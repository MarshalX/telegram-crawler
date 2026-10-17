# messages.BotResults

Result of a query to an inline bot

```tl
messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;

---functions---

messages.getInlineBotResults#514e999d flags:# bot:InputUser peer:InputPeer geo_point:flags.0?InputGeoPoint query:string offset:string = messages.BotResults;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.botResults](/constructor/messages.botResults.md) | Result of a query to an inline bot |

### Methods

| Method | Description |
| --- | --- |
| [messages.getInlineBotResults](/method/messages.getInlineBotResults.md) | Query an inline bot |
# BotInlineResult

Results of an inline query

```tl
botInlineResult#11965f3a flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?WebDocument content:flags.5?WebDocument send_message:BotInlineMessage = BotInlineResult;
botInlineMediaResult#17db940b flags:# id:string type:string photo:flags.0?Photo document:flags.1?Document title:flags.2?string description:flags.3?string send_message:BotInlineMessage = BotInlineResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [botInlineResult](/constructor/botInlineResult.md) | Generic result |
| [botInlineMediaResult](/constructor/botInlineMediaResult.md) | Media result |
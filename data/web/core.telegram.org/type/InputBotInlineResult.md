# InputBotInlineResult

Inline bot result

```tl
inputBotInlineResult#88bf9319 flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?InputWebDocument content:flags.5?InputWebDocument send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultPhoto#a8d864a7 id:string type:string photo:InputPhoto send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultDocument#fff8fdc4 flags:# id:string type:string title:flags.1?string description:flags.2?string document:InputDocument send_message:InputBotInlineMessage = InputBotInlineResult;
inputBotInlineResultGame#4fa417f2 id:string short_name:string send_message:InputBotInlineMessage = InputBotInlineResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputBotInlineResult](/constructor/inputBotInlineResult.md) | An inline bot result |
| [inputBotInlineResultPhoto](/constructor/inputBotInlineResultPhoto.md) | Photo |
| [inputBotInlineResultDocument](/constructor/inputBotInlineResultDocument.md) | Document (media of any type except for photos) |
| [inputBotInlineResultGame](/constructor/inputBotInlineResultGame.md) | Game |
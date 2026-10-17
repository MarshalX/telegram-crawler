# botInlineResult

Generic result

```tl
botInlineResult#11965f3a flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?WebDocument content:flags.5?WebDocument send_message:BotInlineMessage = BotInlineResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [string](/type/string.md) | Result ID |
| **type** | [string](/type/string.md) | Result type (see [bot API docs](/bots/api/types/inlinequeryresult.md)) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Result title |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Result description |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | URL of article or webpage |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[WebDocument](/type/WebDocument.md) | Thumbnail for the result |
| **content** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[WebDocument](/type/WebDocument.md) | Content of the result |
| **send\_message** | [BotInlineMessage](/type/BotInlineMessage.md) | Message to send |

### Type
[BotInlineResult](/type/BotInlineResult.md)

### Related pages

#### [Telegram Bot API](/bots/api.md)
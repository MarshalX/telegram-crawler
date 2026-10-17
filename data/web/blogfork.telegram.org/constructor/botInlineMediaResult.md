# botInlineMediaResult

Media result

```tl
botInlineMediaResult#17db940b flags:# id:string type:string photo:flags.0?Photo document:flags.1?Document title:flags.2?string description:flags.3?string send_message:BotInlineMessage = BotInlineResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [string](/type/string.md) | Result ID |
| **type** | [string](/type/string.md) | Result type (see [bot API docs](/bots/api/types/inlinequeryresult.md)) |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Photo](/type/Photo.md) | If type is `photo`, the photo to send |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Document](/type/Document.md) | If type is `document`, the document to send |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Result title |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Description |
| **send\_message** | [BotInlineMessage](/type/BotInlineMessage.md) | Depending on the `type` and on the [constructor](/type/BotInlineMessage.md), contains the caption of the media or the content of the message to be sent **instead** of the media |

### Type
[BotInlineResult](/type/BotInlineResult.md)

### Related pages

#### [Telegram Bot API](/bots/api.md)

#### [BotInlineMessage](/type/BotInlineMessage.md)
Inline message
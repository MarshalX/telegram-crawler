# inputBotInlineResultDocument

Document (media of any type except for photos)

```tl
inputBotInlineResultDocument#fff8fdc4 flags:# id:string type:string title:flags.1?string description:flags.2?string document:InputDocument send_message:InputBotInlineMessage = InputBotInlineResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [string](/type/string.md) | Result ID |
| **type** | [string](/type/string.md) | Result type (see [bot API docs](/bots/api/types/inlinequeryresult.md)) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Result title |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Result description |
| **document** | [InputDocument](/type/InputDocument.md) | Document to send |
| **send\_message** | [InputBotInlineMessage](/type/InputBotInlineMessage.md) | Message to send when the result is selected |

### Type
[InputBotInlineResult](/type/InputBotInlineResult.md)

### Related pages

#### [Telegram Bot API](/bots/api.md)
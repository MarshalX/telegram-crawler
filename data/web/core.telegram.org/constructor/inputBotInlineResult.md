# inputBotInlineResult

An inline bot result

```tl
inputBotInlineResult#88bf9319 flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?InputWebDocument content:flags.5?InputWebDocument send_message:InputBotInlineMessage = InputBotInlineResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [string](/type/string.md) | ID of result |
| **type** | [string](/type/string.md) | Result type (see [bot API docs](/bots/api/types/inlinequeryresult.md)) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Result title |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Result description |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | URL of result |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[InputWebDocument](/type/InputWebDocument.md) | Thumbnail for result |
| **content** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[InputWebDocument](/type/InputWebDocument.md) | Result contents |
| **send\_message** | [InputBotInlineMessage](/type/InputBotInlineMessage.md) | Message to send when the result is selected |

### Type
[InputBotInlineResult](/type/InputBotInlineResult.md)

### Related pages

#### [Telegram Bot API](/bots/api.md)
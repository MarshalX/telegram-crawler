# inputBotInlineMessageMediaWebPage

Specifies options that will be used to generate the link preview for the message, or even a standalone link preview without an attached message.

```tl
inputBotInlineMessageMediaWebPage#bddcc510 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true optional:flags.6?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **force\_large\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, specifies that a large media preview should be used. |
| **force\_small\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, specifies that a small media preview should be used. |
| **optional** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | If **not** set, a `WEBPAGE_NOT_FOUND` RPC error will be emitted if a webpage preview cannot be generated for the specified `url`; otherwise, no error will be emitted (unless the provided message is also empty, in which case a `MESSAGE_EMPTY` will be emitted, instead). |
| **message** | [string](/type/string.md) | The message, can be empty. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **url** | [string](/type/string.md) | The URL to use for the link preview. |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Inline keyboard |

### Type
[InputBotInlineMessage](/type/InputBotInlineMessage.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
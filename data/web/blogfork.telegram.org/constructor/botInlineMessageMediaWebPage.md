# botInlineMessageMediaWebPage

Specifies options that must be used to generate the link preview for the message, or even a standalone link preview without an attached message.

```tl
botInlineMessageMediaWebPage#809ad9a6 flags:# invert_media:flags.3?true force_large_media:flags.4?true force_small_media:flags.5?true manual:flags.7?true safe:flags.8?true message:string entities:flags.1?Vector<MessageEntity> url:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **force\_large\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, specifies that a large media preview should be used. |
| **force\_small\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, specifies that a small media preview should be used. |
| **manual** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, indicates that the URL used for the webpage preview was specified manually using [inputMediaWebPage](/constructor/inputMediaWebPage.md), and may not be related to any of the URLs specified in the message. |
| **safe** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, the link can be opened directly without user confirmation. |
| **message** | [string](/type/string.md) | The message, can be empty. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **url** | [string](/type/string.md) | The URL to use for the link preview. |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Reply markup for sending bot buttons |

### Type
[BotInlineMessage](/type/BotInlineMessage.md)

### Related pages

#### [inputMediaWebPage](/constructor/inputMediaWebPage.md)
Specifies options that will be used to generate the link preview for the caption, or even a standalone link preview without an attached message.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
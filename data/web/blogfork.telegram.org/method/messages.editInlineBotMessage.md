# messages.editInlineBotMessage

Edit an inline bot message

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.editInlineBotMessage#83557dba flags:# no_webpage:flags.1?true invert_media:flags.16?true id:InputBotInlineMessageID message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_webpage** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Disable webpage preview |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **id** | [InputBotInlineMessageID](/type/InputBotInlineMessageID.md) | Sent inline message ID |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | Message |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[InputMedia](/type/InputMedia.md) | Media |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Reply markup for inline keyboards |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUTTON\_DATA\_INVALID | The data of one or more of the buttons you provided is invalid. |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MESSAGE\_NOT\_MODIFIED | The provided message data is identical to the previous message data, the message wasn't modified. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
# messages.getWebPagePreview

Get preview of webpage

```tl
messages.webPagePreview#8c9a88ac media:MessageMedia chats:Vector<Chat> users:Vector<User> = messages.WebPagePreview;
---functions---
messages.getWebPagePreview#570d6f6f flags:# message:string entities:flags.3?Vector<MessageEntity> = messages.WebPagePreview;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **message** | [string](/type/string.md) | Message from which to extract the preview |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |

### Result
[messages.WebPagePreview](/type/messages.WebPagePreview.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | MESSAGE\_EMPTY | The provided message is empty. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
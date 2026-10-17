# draftMessage

Represents a message [draft](/api/drafts.md).

```tl
draftMessage#96eaa5eb flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia date:int effect:flags.7?long suggested_post:flags.8?SuggestedPost = DraftMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_webpage** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether no webpage preview will be generated |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the message should be sent in reply to the specified message or story. |
| **message** | [string](/type/string.md) | The draft |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | Message [entities](/api/entities.md) for styled text. |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[InputMedia](/type/InputMedia.md) | Media. |
| **date** | [int](/type/int.md) | Date of last update of the draft. |
| **effect** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[long](/type/long.md) | A [message effect that should be played as specified here »](/api/effects.md). |
| **suggested\_post** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[SuggestedPost](/type/SuggestedPost.md) | Used to [suggest a post to a channel, see here »](/api/suggested-posts.md) for more info on the full flow. |

### Type
[DraftMessage](/type/DraftMessage.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.

#### [Message drafts](/api/drafts.md)
How to handle message drafts
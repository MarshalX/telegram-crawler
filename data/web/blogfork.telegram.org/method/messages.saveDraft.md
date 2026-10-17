# messages.saveDraft

Save a message [draft](/api/drafts.md) associated to a chat.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.saveDraft#54ae308e flags:# no_webpage:flags.1?true invert_media:flags.6?true reply_to:flags.4?InputReplyTo peer:InputPeer message:string entities:flags.3?Vector<MessageEntity> media:flags.5?InputMedia effect:flags.7?long suggested_post:flags.8?SuggestedPost = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_webpage** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Disable generation of the webpage preview |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the message should be sent in reply to the specified message or story. |
| **peer** | [InputPeer](/type/InputPeer.md) | Destination of the message that should be sent |
| **message** | [string](/type/string.md) | The draft |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | Message [entities](/api/entities.md) for styled text |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[InputMedia](/type/InputMedia.md) | Attached media |
| **effect** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[long](/type/long.md) | Specifies a [message effect »](/api/effects.md) to use for the message. |
| **suggested\_post** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[SuggestedPost](/type/SuggestedPost.md) | Used to [suggest a post to a channel, see here »](/api/suggested-posts.md) for more info on the full flow. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.

#### [Message drafts](/api/drafts.md)
How to handle message drafts
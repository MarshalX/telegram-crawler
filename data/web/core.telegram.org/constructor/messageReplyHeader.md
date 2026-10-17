# messageReplyHeader

Message replies and [thread](/api/threads.md) information

```tl
messageReplyHeader#1b97dd66 flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_ephemeral:flags.13?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int todo_item_id:flags.11?int poll_option:flags.12?bytes = MessageReplyHeader;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **reply\_to\_scheduled** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | This is a reply to a scheduled message. |
| **forum\_topic** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this message was sent in a [forum topic](/api/forum.md#forum-topics) (except for the General topic). |
| **quote** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether this message is quoting a part of another message. |
| **reply\_to\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | ID of message to which this message is replying |
| **reply\_to\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | For replies sent in [channel discussion threads](/api/threads.md) of which the current user is not a member, the discussion group ID |
| **reply\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[MessageFwdHeader](/type/MessageFwdHeader.md) | When replying to a message sent by a certain peer to another chat, contains info about the peer that originally sent the message to that other chat. |
| **reply\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[MessageMedia](/type/MessageMedia.md) | When replying to a media sent by a certain peer to another chat, contains the media of the replied-to message. |
| **reply\_to\_top\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | ID of the message that started this [message thread](/api/threads.md) |
| **quote\_text** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[string](/type/string.md) | Used to quote-reply to only a certain section (specified here) of the original message. |
| **quote\_entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) from the `quote_text` field. |
| **quote\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Offset of the message `quote_text` within the original message (in [UTF-16 code units](/api/entities.md#entity-length)). |
| **todo\_item\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | Can be set to reply to the specified item of a [todo list »](/api/todo.md). |
| **poll\_option** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[bytes](/type/bytes.md) | If the message is a [reply to a specific poll answer option »](/api/poll.md#replying-to-poll-options), the `option` bytes of the answer the reply is directed at. |

### Type
[MessageReplyHeader](/type/MessageReplyHeader.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Checklists and to-do lists](/api/todo.md)
Premium users can now create collaborative checklists in any chat to track tasks and coordinate teams — or manage shopping and to-do lists.

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.
# inputReplyToMessage

Reply to a message.

```tl
inputReplyToMessage#3bd4b7c2 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int monoforum_peer_id:flags.5?InputPeer todo_item_id:flags.6?int poll_option:flags.7?bytes = InputReplyTo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **reply\_to\_msg\_id** | [int](/type/int.md) | The message ID to reply to. |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | This field must contain the topic ID **only** when replying to messages in forum topics different from the "General" topic (i.e. `reply_to_msg_id` is set and `reply_to_msg_id != topicID` and `topicID != 1`).  \
If the replied-to message is deleted before the method finishes execution, the value in this field will be used to send the message to the correct topic, instead of the "General" topic. |
| **reply\_to\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | Used to reply to messages sent to another chat (specified here), can only be used for non-`protected` chats and messages. |
| **quote\_text** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Used to quote-reply to only a certain section (specified here) of the original message. The maximum UTF-8 length for quotes is specified in the [quote\_length\_max](/api/config.md#quote-length-max) config key. |
| **quote\_entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) from the `quote_text` field. |
| **quote\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Offset of the message `quote_text` within the original message (in [UTF-16 code units](/api/entities.md#entity-length)). |
| **monoforum\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[InputPeer](/type/InputPeer.md) | Must be set to the ID of the topic when replying to a message within a [monoforum topic](/api/monoforum.md). |
| **todo\_item\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Can be set to reply to the specified item of a [todo list »](/api/todo.md). |
| **poll\_option** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[bytes](/type/bytes.md) | If set, sends the message as a [reply to a specific poll answer option »](/api/poll.md#replying-to-poll-options), containing the `option` bytes of the desired answer. |

### Type
[InputReplyTo](/type/InputReplyTo.md)

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Checklists and to-do lists](/api/todo.md)
Premium users can now create collaborative checklists in any chat to track tasks and coordinate teams — or manage shopping and to-do lists.

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.
# messages.getMessageReactionsList

Get [message reaction](/api/reactions.md) list, along with the sender of each reaction.

```tl
messages.messageReactionsList#31bd492d flags:# count:int reactions:Vector<MessagePeerReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.MessageReactionsList;
---functions---
messages.getMessageReactionsList#461b3f48 flags:# peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = messages.MessageReactionsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |
| **id** | [int](/type/int.md) | Message ID |
| **reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Reaction](/type/Reaction.md) | Get only reactions of this type |
| **offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Offset for pagination (taken from the `next_offset` field of the returned [messages.MessageReactionsList](/type/messages.MessageReactionsList.md)); empty in the first request. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[messages.MessageReactionsList](/type/messages.MessageReactionsList.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | BROADCAST\_FORBIDDEN | Channel poll voters and reactions cannot be fetched to prevent deanonymization. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [messages.MessageReactionsList](/type/messages.MessageReactionsList.md)
List of peers that reacted to a specific message

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
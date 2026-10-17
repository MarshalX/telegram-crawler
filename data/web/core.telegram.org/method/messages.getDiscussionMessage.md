# messages.getDiscussionMessage

Get [discussion message](/api/threads.md) from the [associated discussion group](/api/discussion.md) of a channel to show it on top of the comment section, without actually joining the group

```tl
messages.discussionMessage#a6341782 flags:# messages:Vector<Message> max_id:flags.0?int read_inbox_max_id:flags.1?int read_outbox_max_id:flags.2?int unread_count:int chats:Vector<Chat> users:Vector<User> = messages.DiscussionMessage;
---functions---
messages.getDiscussionMessage#446972fd peer:InputPeer msg_id:int = messages.DiscussionMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | [Channel ID](/api/channel.md) |
| **msg\_id** | [int](/type/int.md) | Message ID |

### Result
[messages.DiscussionMessage](/type/messages.DiscussionMessage.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TOPIC\_ID\_INVALID | The specified topic ID is invalid. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.
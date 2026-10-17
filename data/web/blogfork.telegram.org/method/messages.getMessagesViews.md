# messages.getMessagesViews

Get and increase the view counter of a message sent or forwarded from a [channel](/api/channel.md)

```tl
messages.messageViews#b6c4f543 views:Vector<MessageViews> chats:Vector<Chat> users:Vector<User> = messages.MessageViews;
---functions---
messages.getMessagesViews#5784d3e1 peer:InputPeer id:Vector<int> increment:Bool = messages.MessageViews;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the message was found |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | ID of message |
| **increment** | [Bool](/type/Bool.md) | Whether to mark the message as viewed and increment the view counter |

### Result
[messages.MessageViews](/type/messages.MessageViews.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
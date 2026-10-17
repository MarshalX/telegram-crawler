# stats.getMessagePublicForwards

Obtains a list of messages, indicating to which other public channels was a channel message forwarded.  
Will return a list of [messages](/constructor/message.md) with `peer_id` equal to the public channel to which this message was forwarded.

```tl
stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;
---functions---
stats.getMessagePublicForwards#5f150144 channel:InputChannel msg_id:int offset:string limit:int = stats.PublicForwards;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Source channel |
| **msg\_id** | [int](/type/int.md) | Source message ID |
| **offset** | [string](/type/string.md) | Offset for [pagination](/api/offsets.md), empty string on first call, then use the `next_offset` field of the returned constructor (if present, otherwise no more results are available). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stats.PublicForwards](/type/stats.PublicForwards.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [message](/constructor/message.md)
A message
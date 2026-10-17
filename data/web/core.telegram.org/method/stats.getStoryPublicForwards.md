# stats.getStoryPublicForwards

Obtain forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels.

```tl
stats.publicForwards#93037e20 flags:# count:int forwards:Vector<PublicForward> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stats.PublicForwards;
---functions---
stats.getStoryPublicForwards#a6437ef6 peer:InputPeer id:int offset:string limit:int = stats.PublicForwards;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the story was originally posted |
| **id** | [int](/type/int.md) | [Story](/api/stories.md) ID |
| **offset** | [string](/type/string.md) | Offset for pagination, from [stats.PublicForwards](/constructor/stats.publicForwards.md).`next_offset`. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stats.PublicForwards](/type/stats.PublicForwards.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [stats.publicForwards](/constructor/stats.publicForwards.md)
Contains info about the forwards of a [story](/api/stories.md) as a message to public chats and reposts by public channels.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
# stories.getAlbumStories

Get stories in a [story album »](/api/stories.md#story-albums).

```tl
stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;
---functions---
stories.getAlbumStories#ac806d61 peer:InputPeer album_id:int offset:int limit:int = stories.Stories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the album is posted. |
| **album\_id** | [int](/type/int.md) | ID of the album. |
| **offset** | [int](/type/int.md) | Offset for [pagination](/api/offsets.md). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stories.Stories](/type/stories.Stories.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
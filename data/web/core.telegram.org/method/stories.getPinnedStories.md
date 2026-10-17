# stories.getPinnedStories

Fetch the [stories](/api/stories.md#pinned-or-archived-stories) pinned on a peer's profile.

```tl
stories.stories#63c3dd0a flags:# count:int stories:Vector<StoryItem> pinned_to_top:flags.0?Vector<int> chats:Vector<Chat> users:Vector<User> = stories.Stories;
---functions---
stories.getPinnedStories#5821a5dc peer:InputPeer offset_id:int limit:int = stories.Stories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer whose pinned stories should be fetched |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stories.Stories](/type/stories.Stories.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
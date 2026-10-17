# stories.getStoryReactionsList

Get the [reaction](/api/reactions.md) and interaction list of a [story](/api/stories.md) posted to a channel, along with the sender of each reaction.

Can only be used by channel admins.

```tl
stories.storyReactionsList#aa5f789c flags:# count:int reactions:Vector<StoryReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryReactionsList;
---functions---
stories.getStoryReactionsList#b9b2881f flags:# forwards_first:flags.2?true peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = stories.StoryReactionsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **forwards\_first** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, returns forwards and reposts first, then reactions, then other views; otherwise returns interactions sorted just by interaction date. |
| **peer** | [InputPeer](/type/InputPeer.md) | Channel |
| **id** | [int](/type/int.md) | [Story](/api/stories.md) ID |
| **reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Reaction](/type/Reaction.md) | Get only reactions of this type |
| **offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Offset for pagination (taken from the `next_offset` field of the returned [stories.StoryReactionsList](/type/stories.StoryReactionsList.md)); empty in the first request. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stories.StoryReactionsList](/type/stories.StoryReactionsList.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [stories.StoryReactionsList](/type/stories.StoryReactionsList.md)
List of peers that reacted to a specific [story](/api/stories.md)

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
# stories.getStoryViewsList

Obtain the list of users that have viewed a specific [story we posted](/api/stories.md)

```tl
stories.storyViewsList#59d78fc5 flags:# count:int views_count:int forwards_count:int reactions_count:int views:Vector<StoryView> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = stories.StoryViewsList;
---functions---
stories.getStoryViewsList#7ed23c57 flags:# just_contacts:flags.0?true reactions_first:flags.2?true forwards_first:flags.3?true peer:InputPeer q:flags.1?string id:int offset:string limit:int = stories.StoryViewsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **just\_contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to only fetch view reaction/views made by our [contacts](/api/contacts.md) |
| **reactions\_first** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to return [storyView](/constructor/storyView.md) info about users that reacted to the story (i.e. if set, the server will first sort results by view date as usual, and then also additionally sort the list by putting [storyView](/constructor/storyView.md)s with an associated reaction first in the list). Ignored if `forwards_first` is set. |
| **forwards\_first** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, returns forwards and reposts first, then reactions, then other views; otherwise returns interactions sorted just by interaction date. |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the story was posted |
| **q** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Search for specific peers |
| **id** | [int](/type/int.md) | Story ID |
| **offset** | [string](/type/string.md) | Offset for pagination, obtained from [stories.storyViewsList](/constructor/stories.storyViewsList.md).`next_offset` |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stories.StoryViewsList](/type/stories.StoryViewsList.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORY\_ID\_INVALID | The specified story ID is invalid. |

### Related pages

#### [Contact list](/api/contacts.md)
Working with contacts.

#### [storyView](/constructor/storyView.md)
[Story](/api/stories.md) view date and reaction information

#### [stories.storyViewsList](/constructor/stories.storyViewsList.md)
Reaction and view counters for a [story](/api/stories.md)

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
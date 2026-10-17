# storyItemSkipped

Represents an active story, whose full information was omitted for space and performance reasons; use [stories.getStoriesByID](/method/stories.getStoriesByID.md) to fetch full info about the skipped story when and if needed.

```tl
storyItemSkipped#ffadc913 flags:# close_friends:flags.8?true live:flags.9?true id:int date:int expire_date:int = StoryItem;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **close\_friends** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Whether this story can only be viewed by [our close friends, see here »](/api/privacy.md) for more info |
| **live** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether this story is a [live video stream »](/api/stories.md). |
| **id** | [int](/type/int.md) | Story ID |
| **date** | [int](/type/int.md) | When was the story posted. |
| **expire\_date** | [int](/type/int.md) | When does the story expire. |

### Type
[StoryItem](/type/StoryItem.md)

### Related pages

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [stories.getStoriesByID](/method/stories.getStoriesByID.md)
Obtain full info about a set of [stories](/api/stories.md) by their IDs.
# stories.searchPosts

Globally search for [stories](/api/stories.md) using a hashtag or a [location media area](/api/stories.md#location-tags), see [here »](/api/stories.md#searching-stories) for more info on the full flow.

Either `hashtag` **or** `area` **must** be set when invoking the method.

```tl
stories.foundStories#e2de7737 flags:# count:int stories:Vector<FoundStory> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = stories.FoundStories;
---functions---
stories.searchPosts#d1810907 flags:# hashtag:flags.0?string area:flags.1?MediaArea peer:flags.2?InputPeer offset:string limit:int = stories.FoundStories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **hashtag** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Hashtag (without the `#`) |
| **area** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[MediaArea](/type/MediaArea.md) | A [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md) or a [mediaAreaVenue](/constructor/mediaAreaVenue.md).  \
Note [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md) areas may be searched only if they have an associated `address`. |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPeer](/type/InputPeer.md) | If set, returns only stories posted by this peer. |
| **offset** | [string](/type/string.md) | Offset for [pagination](/api/offsets.md): initially an empty string, then the `next_offset` from the previously returned [stories.foundStories](/constructor/stories.foundStories.md). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[stories.FoundStories](/type/stories.FoundStories.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | HASHTAG\_INVALID | The specified hashtag is invalid. |

### Related pages

#### [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md)
Represents a geolocation tag attached to a [story](/api/stories.md).

#### [mediaAreaVenue](/constructor/mediaAreaVenue.md)
Represents a location tag attached to a [story](/api/stories.md), with additional venue information.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [stories.foundStories](/constructor/stories.foundStories.md)
Stories found using [global story search »](/api/stories.md#searching-stories).

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
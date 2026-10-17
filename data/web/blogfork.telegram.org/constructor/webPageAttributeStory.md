# webPageAttributeStory

Webpage preview of a Telegram story

```tl
webPageAttributeStory#2e94c3e7 flags:# peer:Peer id:int story:flags.0?StoryItem = WebPageAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | Peer that posted the story |
| **id** | [int](/type/int.md) | [Story ID](/api/stories.md#watching-stories) |
| **story** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[StoryItem](/type/StoryItem.md) | May contain the story, if not the story should be fetched when and if needed using [stories.getStoriesByID](/method/stories.getStoriesByID.md) with the above `id` and `peer`. |

### Type
[WebPageAttribute](/type/WebPageAttribute.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [stories.getStoriesByID](/method/stories.getStoriesByID.md)
Obtain full info about a set of [stories](/api/stories.md) by their IDs.
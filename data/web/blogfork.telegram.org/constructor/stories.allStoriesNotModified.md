# stories.allStoriesNotModified

The list of active (or active and hidden) [stories](/api/stories.md#watching-stories) has not changed.

```tl
stories.allStoriesNotModified#1158fe3e flags:# state:string stealth_mode:StoriesStealthMode = stories.AllStories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **state** | [string](/type/string.md) | State to use to ask for updates |
| **stealth\_mode** | [StoriesStealthMode](/type/StoriesStealthMode.md) | Current [stealth mode](/api/stories.md#stealth-mode) information |

### Type
[stories.AllStories](/type/stories.AllStories.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
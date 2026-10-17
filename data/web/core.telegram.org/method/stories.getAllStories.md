# stories.getAllStories

Fetch the List of active (or active and hidden) stories, see [here »](/api/stories.md#watching-stories) for more info on watching stories.

```tl
stories.allStoriesNotModified#1158fe3e flags:# state:string stealth_mode:StoriesStealthMode = stories.AllStories;
stories.allStories#6efc5e81 flags:# has_more:flags.0?true count:int state:string peer_stories:Vector<PeerStories> chats:Vector<Chat> users:Vector<User> stealth_mode:StoriesStealthMode = stories.AllStories;
---functions---
stories.getAllStories#eeb0d625 flags:# next:flags.1?true hidden:flags.2?true state:flags.0?string = stories.AllStories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **next** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If `next` and `state` are both set, uses the passed `state` to paginate to the next results; if neither `state` nor `next` are set, fetches the initial page; if `state` is set and `next` is not set, check for changes in the active/hidden peerset, see [here »](/api/stories.md#watching-stories) for more info on the full flow. |
| **hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, fetches the hidden active story list, otherwise fetches the active story list, see [here »](/api/stories.md#watching-stories) for more info on the full flow. |
| **state** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If `next` and `state` are both set, uses the passed `state` to paginate to the next results; if neither `state` nor `next` are set, fetches the initial page; if `state` is set and `next` is not set, check for changes in the active/hidden peerset, see [here »](/api/stories.md#watching-stories) for more info on the full flow. |

### Result
[stories.AllStories](/type/stories.AllStories.md)

### Only users can use this method

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
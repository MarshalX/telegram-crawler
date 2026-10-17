# messageMediaStory

Represents a forwarded [story](/api/stories.md) or a story mention.

```tl
messageMediaStory#68cb6283 flags:# via_mention:flags.1?true peer:Peer id:int story:flags.0?StoryItem = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_mention** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, indicates that this someone has mentioned us in this story (i.e. by tagging us in the description) or vice versa, we have mentioned the other peer (if the message is outgoing). |
| **peer** | [Peer](/type/Peer.md) | Peer that posted the story. |
| **id** | [int](/type/int.md) | Story ID |
| **story** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[StoryItem](/type/StoryItem.md) | The story itself, if absent fetch it using [stories.getStoriesByID](/method/stories.getStoriesByID.md) and the `peer`/`id` parameters specified above. |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [stories.getStoriesByID](/method/stories.getStoriesByID.md)
Obtain full info about a set of [stories](/api/stories.md) by their IDs.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
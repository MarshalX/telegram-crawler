# publicForwardStory

Contains info about a forward of a [story](/api/stories.md) as a repost by a public channel.

```tl
publicForwardStory#edf3add0 peer:Peer story:StoryItem = PublicForward;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | The channel that reposted the story. |
| **story** | [StoryItem](/type/StoryItem.md) | The reposted story (may be different from the original story). |

### Type
[PublicForward](/type/PublicForward.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
# updateNewStoryReaction

Represents a new [reaction to a story](/api/reactions.md#notifications-about-reactions).

```tl
updateNewStoryReaction#1824e40b story_id:int peer:Peer reaction:Reaction = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **story\_id** | [int](/type/int.md) | [Story ID](/api/stories.md). |
| **peer** | [Peer](/type/Peer.md) | The peer where the story was posted. |
| **reaction** | [Reaction](/type/Reaction.md) | The [reaction](/api/reactions.md). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
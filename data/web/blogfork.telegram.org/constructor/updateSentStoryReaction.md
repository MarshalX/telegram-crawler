# updateSentStoryReaction

Indicates we [reacted to a story »](/api/stories.md#reactions).

```tl
updateSentStoryReaction#7d627683 peer:Peer story_id:int reaction:Reaction = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | The peer that sent the story |
| **story\_id** | [int](/type/int.md) | ID of the story we reacted to |
| **reaction** | [Reaction](/type/Reaction.md) | The reaction that was sent |

### Type
[Update](/type/Update.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
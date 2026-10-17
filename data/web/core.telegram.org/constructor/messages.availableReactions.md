# messages.availableReactions

Animations and metadata associated with [message reactions »](/api/reactions.md)

```tl
messages.availableReactions#768e3aad hash:int reactions:Vector<AvailableReaction> = messages.AvailableReactions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **reactions** | [Vector](/type/Vector%20t)&lt;[AvailableReaction](/type/AvailableReaction.md)&gt; | Animations and metadata associated with [message reactions »](/api/reactions.md) |

### Type
[messages.AvailableReactions](/type/messages.AvailableReactions.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
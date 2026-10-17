# messages.getAvailableReactions

Obtain available [message reactions »](/api/reactions.md)

```tl
messages.availableReactionsNotModified#9f071957 = messages.AvailableReactions;
messages.availableReactions#768e3aad hash:int reactions:Vector<AvailableReaction> = messages.AvailableReactions;
---functions---
messages.getAvailableReactions#18dea0ac hash:int = messages.AvailableReactions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.AvailableReactions](/type/messages.AvailableReactions.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
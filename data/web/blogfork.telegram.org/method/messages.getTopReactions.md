# messages.getTopReactions

Got popular [message reactions](/api/reactions.md)

```tl
messages.reactionsNotModified#b06fdbdf = messages.Reactions;
messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;
---functions---
messages.getTopReactions#bb8125ba limit:int hash:long = messages.Reactions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.Reactions](/type/messages.Reactions.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
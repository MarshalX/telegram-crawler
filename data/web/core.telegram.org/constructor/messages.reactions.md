# messages.reactions

List of [message reactions](/api/reactions.md)

```tl
messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Hash used for caching, can also be locally regenerated using the algorithm specified [here »](/api/reactions.md#recent-reactions). |
| **reactions** | [Vector](/type/Vector%20t)&lt;[Reaction](/type/Reaction.md)&gt; | Reactions |

### Type
[messages.Reactions](/type/messages.Reactions.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
# reactionCount

Reactions

```tl
reactionCount#a3d1cb80 flags:# chosen_order:flags.0?int reaction:Reaction count:int = ReactionCount;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **chosen\_order** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, indicates that the current user also sent this reaction. \
The integer value indicates when was the reaction added: the bigger the value, the newer the reaction. |
| **reaction** | [Reaction](/type/Reaction.md) | The reaction. |
| **count** | [int](/type/int.md) | Number of users that reacted with this emoji. |

### Type
[ReactionCount](/type/ReactionCount.md)
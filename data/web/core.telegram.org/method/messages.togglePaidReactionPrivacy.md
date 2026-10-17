# messages.togglePaidReactionPrivacy

Changes the privacy of already sent [paid reactions](/api/reactions.md#paid-reactions) on a specific message.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.togglePaidReactionPrivacy#435885b5 peer:InputPeer msg_id:int private:PaidReactionPrivacy = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The channel |
| **msg\_id** | [int](/type/int.md) | The ID of the message to which we sent the paid reactions |
| **private** | [PaidReactionPrivacy](/type/PaidReactionPrivacy.md) | If true, makes the current anonymous in the top sender leaderboard for this message; otherwise, does the opposite. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | REACTION\_EMPTY | Empty reaction provided. |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
# messages.deleteParticipantReactions

As an admin, remove all of a specific participant's [reactions](/api/reactions.md) from every message in a group or channel.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.deleteParticipantReactions#a0b80cf8 peer:InputPeer participant:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The group or channel where the participant's reactions should be removed |
| **participant** | [InputPeer](/type/InputPeer.md) | The participant whose reactions should be removed |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
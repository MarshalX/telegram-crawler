# updatePaidReactionPrivacy

Contains the current [default paid reaction privacy, see here »](/api/reactions.md#paid-reactions) for more info.

Clients should invoke [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md) on startup to fetch the current default reaction privacy because this update is only sent to currently online sessions and cannot be fetched using getDifference on client startup.

```tl
updatePaidReactionPrivacy#8b725fce private:PaidReactionPrivacy = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **private** | [PaidReactionPrivacy](/type/PaidReactionPrivacy.md) | Paid reaction privacy settings. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md)
Fetches an [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) update with the current [default paid reaction privacy, see here »](/api/reactions.md#paid-reactions) for more info.
# PaidReactionPrivacy

[Paid reaction privacy settings »](/api/reactions.md#paid-reactions)

```tl
paidReactionPrivacyDefault#206ad49e = PaidReactionPrivacy;
paidReactionPrivacyAnonymous#1f0c1ad9 = PaidReactionPrivacy;
paidReactionPrivacyPeer#dc6cfcf0 peer:InputPeer = PaidReactionPrivacy;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [paidReactionPrivacyDefault](/constructor/paidReactionPrivacyDefault.md) | Uses the default reaction privacy, set using [messages.togglePaidReactionPrivacy](/method/messages.togglePaidReactionPrivacy.md). |
| [paidReactionPrivacyAnonymous](/constructor/paidReactionPrivacyAnonymous.md) | Send paid reactions anonymously. |
| [paidReactionPrivacyPeer](/constructor/paidReactionPrivacyPeer.md) | Send paid reactions as the specified peer, fetched using [channels.getSendAs](/method/channels.getSendAs.md) with the `for_paid_reactions` flag set. |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
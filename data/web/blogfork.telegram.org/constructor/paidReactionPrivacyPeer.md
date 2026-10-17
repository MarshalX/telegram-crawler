# paidReactionPrivacyPeer

Send paid reactions as the specified peer, fetched using [channels.getSendAs](/method/channels.getSendAs.md) with the `for_paid_reactions` flag set.

```tl
paidReactionPrivacyPeer#dc6cfcf0 peer:InputPeer = PaidReactionPrivacy;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer to send reactions as. |

### Type
[PaidReactionPrivacy](/type/PaidReactionPrivacy.md)

### Related pages

#### [channels.getSendAs](/method/channels.getSendAs.md)
Obtains a list of peers that can be displayed as the sender in a specific context. With `for_live_stories`, returns peers that may author [live story in-call messages »](/api/group-calls.md#in-call-messages).
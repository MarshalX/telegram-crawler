# messageActionSuggestedPostApproval

A [suggested post »](/api/suggested-posts.md) was approved or rejected.

```tl
messageActionSuggestedPostApproval#ee7a1596 flags:# rejected:flags.0?true balance_too_low:flags.1?true reject_comment:flags.2?string schedule_date:flags.3?int price:flags.4?StarsAmount = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **rejected** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the suggested post was rejected. |
| **balance\_too\_low** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the post was approved but the user's balance is too low to pay for the suggested post. |
| **reject\_comment** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | If the suggested post was rejected, can optionally contain a rejection comment. |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Scheduling date. |
| **price** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[StarsAmount](/type/StarsAmount.md) | Price for the suggested post. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.
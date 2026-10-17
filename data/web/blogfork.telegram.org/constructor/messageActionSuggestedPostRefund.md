# messageActionSuggestedPostRefund

A [suggested post »](/api/suggested-posts.md) was accepted and posted or scheduled, but either the channel deleted the posted/scheduled post before [stars\_suggested\_post\_age\_min](/api/config.md#stars-suggested-post-age-min) seconds have elapsed, or the user refunded the payment for the stars used to pay for the suggested post.

```tl
messageActionSuggestedPostRefund#69f916f8 flags:# payer_initiated:flags.0?true = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **payer\_initiated** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the user refunded the payment for the stars used to pay for the suggested post. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
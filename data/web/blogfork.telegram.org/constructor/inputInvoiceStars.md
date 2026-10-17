# inputInvoiceStars

Used to top up the [Telegram Stars](/api/stars.md) balance of the current account or someone else's account, or to start a [Telegram Star giveaway »](/api/giveaways.md#star-giveaways).

```tl
inputInvoiceStars#65f00ce3 purpose:InputStorePaymentPurpose = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purpose** | [InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md) | An [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md), [inputStorePaymentStarsTopup](/constructor/inputStorePaymentStarsTopup.md) or [inputStorePaymentStarsGift](/constructor/inputStorePaymentStarsGift.md). |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md)
Used to pay for a [star giveaway, see here »](/api/giveaways.md#star-giveaways) for more info.

#### [inputStorePaymentStarsTopup](/constructor/inputStorePaymentStarsTopup.md)
Used to top up the [Telegram Stars balance](/api/stars.md) of the current account.

#### [inputStorePaymentStarsGift](/constructor/inputStorePaymentStarsGift.md)
Used to gift [Telegram Stars](/api/stars.md) to a friend.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.
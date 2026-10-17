# inputInvoicePremiumGiftCode

Used if the user wishes to start a channel/supergroup [giveaway](/api/giveaways.md) or send some [giftcodes](/api/giveaways.md) to members of a channel/supergroup, in exchange for [boosts](/api/boost.md).

```tl
inputInvoicePremiumGiftCode#98986c0d purpose:InputStorePaymentPurpose option:PremiumGiftCodeOption = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purpose** | [InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md) | Should be populated with [inputStorePaymentPremiumGiveaway](/constructor/inputStorePaymentPremiumGiveaway.md) for [giveaways](/api/giveaways.md) and [inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md) for [gifts](/api/giveaways.md). |
| **option** | [PremiumGiftCodeOption](/type/PremiumGiftCodeOption.md) | Should be populated with one of the giveaway options returned by [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md), see the [giveaways »](/api/giveaways.md) documentation for more info. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [inputStorePaymentPremiumGiveaway](/constructor/inputStorePaymentPremiumGiveaway.md)
Used to pay for a [giveaway, see here »](/api/giveaways.md) for more info.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md)
Used to gift [Telegram Premium](/api/premium.md) subscriptions only to some specific subscribers of a channel/supergroup or to some of our contacts, see [here »](/api/giveaways.md) for more info on giveaways and gifts.

#### [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md)
Obtain a list of Telegram Premium [giveaway/gift code »](/api/giveaways.md) options.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.
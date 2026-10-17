# InputStorePaymentPurpose

Info about a Telegram Premium purchase

```tl
inputStorePaymentPremiumSubscription#a6751e66 flags:# restore:flags.0?true upgrade:flags.1?true = InputStorePaymentPurpose;
inputStorePaymentGiftPremium#616f7fe8 user_id:InputUser currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentPremiumGiftCode#fb790393 flags:# users:Vector<InputUser> boost_peer:flags.0?InputPeer currency:string amount:long message:flags.1?TextWithEntities = InputStorePaymentPurpose;
inputStorePaymentPremiumGiveaway#160544ca flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStarsTopup#f9a2a6cb flags:# stars:long currency:string amount:long spend_purpose_peer:flags.0?InputPeer = InputStorePaymentPurpose;
inputStorePaymentStarsGift#1d741ef7 user_id:InputUser stars:long currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStarsGiveaway#751f08fa flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true stars:long boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long users:int = InputStorePaymentPurpose;
inputStorePaymentAuthCode#3fc18057 flags:# restore:flags.0?true phone_number:string phone_code_hash:string premium_days:int currency:string amount:long = InputStorePaymentPurpose;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputStorePaymentPremiumSubscription](/constructor/inputStorePaymentPremiumSubscription.md) | Info about a Telegram Premium purchase |
| [inputStorePaymentGiftPremium](/constructor/inputStorePaymentGiftPremium.md) | Info about a gifted Telegram Premium purchase |
| [inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md) | Used to gift [Telegram Premium](/api/premium.md) subscriptions only to some specific subscribers of a channel/supergroup or to some of our contacts, see [here »](/api/giveaways.md) for more info on giveaways and gifts. |
| [inputStorePaymentPremiumGiveaway](/constructor/inputStorePaymentPremiumGiveaway.md) | Used to pay for a [giveaway, see here »](/api/giveaways.md) for more info. |
| [inputStorePaymentStarsTopup](/constructor/inputStorePaymentStarsTopup.md) | Used to top up the [Telegram Stars balance](/api/stars.md) of the current account. |
| [inputStorePaymentStarsGift](/constructor/inputStorePaymentStarsGift.md) | Used to gift [Telegram Stars](/api/stars.md) to a friend. |
| [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md) | Used to pay for a [star giveaway, see here »](/api/giveaways.md#star-giveaways) for more info. |
| [inputStorePaymentAuthCode](/constructor/inputStorePaymentAuthCode.md) | Indicates payment for a login code. |
# inputStorePaymentPremiumGiftCode

Used to gift [Telegram Premium](/api/premium.md) subscriptions only to some specific subscribers of a channel/supergroup or to some of our contacts, see [here »](/api/giveaways.md) for more info on giveaways and gifts.

```tl
inputStorePaymentPremiumGiftCode#fb790393 flags:# users:Vector<InputUser> boost_peer:flags.0?InputPeer currency:string amount:long message:flags.1?TextWithEntities = InputStorePaymentPurpose;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **users** | [Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | The users that will receive the [Telegram Premium](/api/premium.md) subscriptions. |
| **boost\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | If set, the gifts will be sent on behalf of a channel/supergroup we are an admin of, which will also assign some [boosts](/api/boost.md) to it. Otherwise, the gift will be sent directly from the currently logged in user, and we will gain some extra [boost slots](/api/boost.md). See [here »](/api/giveaways.md) for more info on giveaways and gifts. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Message attached with the gift |

### Type
[InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Bot Payments API](/bots/payments.md)
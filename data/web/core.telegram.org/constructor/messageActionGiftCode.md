# messageActionGiftCode

Contains a [Telegram Premium giftcode link](/api/links.md#premium-giftcode-links).

```tl
messageActionGiftCode#31c48347 flags:# via_giveaway:flags.0?true unclaimed:flags.5?true boost_peer:flags.1?Peer days:int slug:string currency:flags.2?string amount:flags.2?long crypto_currency:flags.3?string crypto_amount:flags.3?long message:flags.4?TextWithEntities = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_giveaway** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this gift code was received from a [giveaway »](/api/giveaways.md) started by a channel/supergroup we're subscribed to. |
| **unclaimed** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, the link was not [redeemed](/api/links.md#premium-giftcode-links) yet. |
| **boost\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | Identifier of the channel/supergroup that created the gift code [either directly or through a giveaway](/api/giveaways.md): if we import this giftcode link, we will also automatically [boost](/api/boost.md) this channel/supergroup. |
| **days** | [int](/type/int.md) | Duration of the gifted Telegram Premium subscription, in days. |
| **slug** | [string](/type/string.md) | Slug of the [Telegram Premium giftcode link](/api/links.md#premium-giftcode-links) |
| **currency** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **crypto\_currency** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | If set, the gift was made using the specified cryptocurrency. |
| **crypto\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | If `crypto_currency` is set, contains the paid amount, in the smallest units of the cryptocurrency. |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[TextWithEntities](/type/TextWithEntities.md) | Message attached with the gift |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Bot Payments API](/bots/payments.md)
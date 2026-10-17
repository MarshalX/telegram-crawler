# StarsTransactionPeer

Source of an incoming [Telegram Star transaction](/api/stars.md), or its recipient for outgoing [Telegram Star transactions](/api/stars.md).

```tl
starsTransactionPeerUnsupported#95f2bfe4 = StarsTransactionPeer;
starsTransactionPeerAppStore#b457b375 = StarsTransactionPeer;
starsTransactionPeerPlayMarket#7b560a0b = StarsTransactionPeer;
starsTransactionPeerPremiumBot#250dbaf8 = StarsTransactionPeer;
starsTransactionPeerFragment#e92fd902 = StarsTransactionPeer;
starsTransactionPeer#d80da15d peer:Peer = StarsTransactionPeer;
starsTransactionPeerAds#60682812 = StarsTransactionPeer;
starsTransactionPeerAPI#f9677aad = StarsTransactionPeer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [starsTransactionPeerUnsupported](/constructor/starsTransactionPeerUnsupported.md) | Describes a [Telegram Star](/api/stars.md) transaction that cannot be described using the current layer. |
| [starsTransactionPeerAppStore](/constructor/starsTransactionPeerAppStore.md) | Describes a [Telegram Star](/api/stars.md) transaction with the App Store, used when purchasing Telegram Stars through the App Store. |
| [starsTransactionPeerPlayMarket](/constructor/starsTransactionPeerPlayMarket.md) | Describes a [Telegram Star](/api/stars.md) transaction with the Play Store, used when purchasing Telegram Stars through the Play Store. |
| [starsTransactionPeerPremiumBot](/constructor/starsTransactionPeerPremiumBot.md) | Describes a [Telegram Star](/api/stars.md) transaction made using [@PremiumBot](https://t.me/premiumbot) (i.e. using the [inputInvoiceStars](/constructor/inputInvoiceStars.md) flow described [here »](/api/stars.md#buying-or-gifting-stars)). |
| [starsTransactionPeerFragment](/constructor/starsTransactionPeerFragment.md) | Describes a [Telegram Star](/api/stars.md) transaction with [Fragment](https://fragment.com), used when purchasing Telegram Stars through [Fragment](https://fragment.com). |
| [starsTransactionPeer](/constructor/starsTransactionPeer.md) | Describes a [Telegram Star](/api/stars.md) transaction with another peer. |
| [starsTransactionPeerAds](/constructor/starsTransactionPeerAds.md) | Describes a [Telegram Star](/api/stars.md) transaction used to pay for [Telegram ads as specified here »](/api/stars.md#paying-for-ads). |
| [starsTransactionPeerAPI](/constructor/starsTransactionPeerAPI.md) | Describes a [Telegram Star](/api/stars.md) transaction used to pay for paid API usage, such as [paid bot broadcasts](/bots/faq.md#how-can-i-message-all-of-my-bot-39s-subscribers-at-once). |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
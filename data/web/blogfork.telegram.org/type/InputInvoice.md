# InputInvoice

An invoice

```tl
inputInvoiceMessage#c5b56859 peer:InputPeer msg_id:int = InputInvoice;
inputInvoiceSlug#c326caef slug:string = InputInvoice;
inputInvoicePremiumGiftCode#98986c0d purpose:InputStorePaymentPurpose option:PremiumGiftCodeOption = InputInvoice;
inputInvoiceStars#65f00ce3 purpose:InputStorePaymentPurpose = InputInvoice;
inputInvoiceChatInviteSubscription#34e793f1 hash:string = InputInvoice;
inputInvoiceStarGift#e8625e92 flags:# hide_name:flags.0?true include_upgrade:flags.2?true peer:InputPeer gift_id:long message:flags.1?TextWithEntities = InputInvoice;
inputInvoiceStarGiftUpgrade#4d818d5d flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = InputInvoice;
inputInvoiceStarGiftTransfer#4a5f5bd9 stargift:InputSavedStarGift to_id:InputPeer = InputInvoice;
inputInvoicePremiumGiftStars#dabab2ef flags:# user_id:InputUser months:int message:flags.0?TextWithEntities = InputInvoice;
inputInvoiceBusinessBotTransferStars#f4997e42 bot:InputUser stars:long = InputInvoice;
inputInvoiceStarGiftResale#c39f5324 flags:# ton:flags.0?true slug:string to_id:InputPeer = InputInvoice;
inputInvoiceStarGiftPrepaidUpgrade#9a0b48b8 peer:InputPeer hash:string = InputInvoice;
inputInvoicePremiumAuthCode#3e77f614 purpose:InputStorePaymentPurpose = InputInvoice;
inputInvoiceStarGiftDropOriginalDetails#923d8d1 stargift:InputSavedStarGift = InputInvoice;
inputInvoiceStarGiftAuctionBid#1ecafa10 flags:# hide_name:flags.0?true update_bid:flags.2?true peer:flags.3?InputPeer gift_id:long bid_amount:long message:flags.1?TextWithEntities = InputInvoice;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputInvoiceMessage](/constructor/inputInvoiceMessage.md) | An invoice contained in a [messageMediaInvoice](/constructor/messageMediaInvoice.md) message or [paid media »](/api/paid-media.md). |
| [inputInvoiceSlug](/constructor/inputInvoiceSlug.md) | An invoice slug taken from an [invoice deep link](/api/links.md#invoice-links) or from the [`premium_invoice_slug` app config parameter »](/api/config.md#premium-invoice-slug) |
| [inputInvoicePremiumGiftCode](/constructor/inputInvoicePremiumGiftCode.md) | Used if the user wishes to start a channel/supergroup [giveaway](/api/giveaways.md) or send some [giftcodes](/api/giveaways.md) to members of a channel/supergroup, in exchange for [boosts](/api/boost.md). |
| [inputInvoiceStars](/constructor/inputInvoiceStars.md) | Used to top up the [Telegram Stars](/api/stars.md) balance of the current account or someone else's account, or to start a [Telegram Star giveaway »](/api/giveaways.md#star-giveaways). |
| [inputInvoiceChatInviteSubscription](/constructor/inputInvoiceChatInviteSubscription.md) | Used to pay for a [Telegram Star subscription »](/api/stars.md#star-subscriptions). |
| [inputInvoiceStarGift](/constructor/inputInvoiceStarGift.md) | Used to buy a [Telegram Star Gift, see here »](/api/gifts.md) for more info. |
| [inputInvoiceStarGiftUpgrade](/constructor/inputInvoiceStarGiftUpgrade.md) | Used to [pay to upgrade a Gift to a collectible gift](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift), see the [collectible gifts »](/api/gifts.md#collectible-gifts) documentation for more info on the full flow. |
| [inputInvoiceStarGiftTransfer](/constructor/inputInvoiceStarGiftTransfer.md) | Used to [pay to transfer a collectible gift to another peer](/api/gifts.md#transferring-collectible-gifts), see the [gifts »](/api/gifts.md#transferring-collectible-gifts) documentation for more info. |
| [inputInvoicePremiumGiftStars](/constructor/inputInvoicePremiumGiftStars.md) | Used to gift a [Telegram Premium](/api/premium.md) subscription to another user, paying with [Telegram Stars](/api/stars.md). |
| [inputInvoiceBusinessBotTransferStars](/constructor/inputInvoiceBusinessBotTransferStars.md) | Transfer stars from the balance of a user account [connected to a business bot](/api/bots/connected-business-bots.md), to the balance of the [business bot](/api/bots/connected-business-bots.md), see [here »](/api/stars.md#transferring-stars-from-a-business-account-to-the-business-bot) for more info on the full flow. |
| [inputInvoiceStarGiftResale](/constructor/inputInvoiceStarGiftResale.md) | Used to buy a [collectible gift](/api/gifts.md#collectible-gifts) currently up on resale, see [here](/api/gifts.md#reselling-collectible-gifts) for more info on the full flow. |
| [inputInvoiceStarGiftPrepaidUpgrade](/constructor/inputInvoiceStarGiftPrepaidUpgrade.md) | [Separately prepay for the upgrade of a gift »](/api/gifts.md#prepaying-for-someone-elses-upgrade). |
| [inputInvoicePremiumAuthCode](/constructor/inputInvoicePremiumAuthCode.md) | Used to pay for login codes, in case of high cost of SMS verification codes for the user's country/provider, see [here »](/api/auth.md#paid-auth) for more info. |
| [inputInvoiceStarGiftDropOriginalDetails](/constructor/inputInvoiceStarGiftDropOriginalDetails.md) | Used to pay for for the removal of the [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute from a collectible gift, see [here »](/api/gifts.md#dropping-the-original-details-of-an-upgraded-gift) for the full flow. |
| [inputInvoiceStarGiftAuctionBid](/constructor/inputInvoiceStarGiftAuctionBid.md) | Used to place a bid in a [collectible gift auction »](/api/auctions.md). |
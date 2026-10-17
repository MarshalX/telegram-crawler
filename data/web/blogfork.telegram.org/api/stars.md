# Telegram Stars


Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.  

This page describes the methods used to buy, use and withdraw [Telegram Stars](https://telegram.org/blog/mini-app-bar-paid-media-and-more#rewards-for-content-creators-and-developers), as well as view detailed revenue stats and make purchases using Telegram Stars.  

Clients should disable Telegram Stars support for the current user if the [stars_purchase_blocked field is equal to `true`&nbsp;&raquo;](/api/config.md#stars-purchase-blocked) due to regional limitations.  

### Balance and transaction history

    inputStarsTransaction#206ae6d1 flags:# refund:flags.0?true id:string = InputStarsTransaction;

    starsTransactionPeerAppStore#b457b375 = StarsTransactionPeer;
    starsTransactionPeerPlayMarket#7b560a0b = StarsTransactionPeer;
    starsTransactionPeerPremiumBot#250dbaf8 = StarsTransactionPeer;
    starsTransactionPeerFragment#e92fd902 = StarsTransactionPeer;
    starsTransactionPeer#d80da15d peer:Peer = StarsTransactionPeer;
    starsTransactionPeerAds#60682812 = StarsTransactionPeer;
    starsTransactionPeerUnsupported#95f2bfe4 = StarsTransactionPeer;

    starsTransaction#13659eb0 flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true gift:flags.10?true reaction:flags.11?true stargift_upgrade:flags.18?true business_transfer:flags.21?true stargift_resale:flags.22?true posts_search:flags.24?true stargift_prepaid_upgrade:flags.25?true stargift_drop_original_details:flags.26?true phonegroup_message:flags.27?true stargift_auction_bid:flags.28?true offer:flags.29?true id:string amount:StarsAmount date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> subscription_period:flags.12?int giveaway_post_id:flags.13?int stargift:flags.14?StarGift floodskip_number:flags.15?int starref_commission_permille:flags.16?int starref_peer:flags.17?Peer starref_amount:flags.17?StarsAmount paid_messages:flags.19?int premium_gift_months:flags.20?int ads_proceeds_from_date:flags.23?int ads_proceeds_to_date:flags.23?int = StarsTransaction;
    
    payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;

    updateStarsBalance#4e80a379 balance:StarsAmount = Update;

    ---functions---

    payments.getStarsStatus#4ea9b3bf flags:# ton:flags.0?true peer:InputPeer = payments.StarsStatus;

    payments.getStarsTransactions#69da4557 flags:# inbound:flags.0?true outbound:flags.1?true ascending:flags.2?true ton:flags.4?true subscription_id:flags.3?string peer:InputPeer offset:string limit:int = payments.StarsStatus;

    payments.getStarsTransactionsByID#2dca16b8 flags:# ton:flags.0?true peer:InputPeer id:Vector<InputStarsTransaction> = payments.StarsStatus;

Use [payments.getStarsStatus](/method/payments.getStarsStatus.md) to get the current stars balance of the current account (with peer=[inputPeerSelf](/constructor/inputPeerSelf.md)), or the stars balance of the bot or channel specified in `peer`.  

The channel/bot ad revenue transaction history and balance in **nanograms** (`1/1_000_000_000`th of a Gram) may also be fetched by channel/bot admins by setting the `ton` flag of all methods listed above, if the [channelFull](/constructor/channelFull.md).`can_view_revenue`/[userFull](/constructor/userFull.md).`can_view_revenue` flag is set.

The method will also return the last 5 [star transactions&nbsp;&raquo;](/constructor/starsTransaction.md).  
To return all [star transactions&nbsp;&raquo;](/constructor/starsTransaction.md) (and optionally search using filters), use [payments.getStarsTransactions](/method/payments.getStarsTransactions.md), paginating through the transactions passing the returned `next_offset` (if set) to `offset` [as usual](/api/offsets.md).  

[payments.getStarsTransactionsByID](/method/payments.getStarsTransactionsByID.md) may be used to fetch info about specific Telegram Star transactions (or refunds) using their IDs, passed as [inputStarsTransaction](/constructor/inputStarsTransaction.md) constructors.  

Changes in the star balance (through [topups](#buying-or-gifting-stars) or [purchases](#using-stars)) will be notified by the server via an [updateStarsBalance](/constructor/updateStarsBalance.md) update.

### Revenue statistics

    starsRevenueStatus#febe5491 flags:# withdrawal_enabled:flags.0?true current_balance:StarsAmount available_balance:StarsAmount overall_revenue:StarsAmount next_withdrawal_at:flags.1?int = StarsRevenueStatus;

    payments.starsRevenueStats#6c207376 flags:# top_hours_graph:flags.0?StatsGraph revenue_graph:StatsGraph status:StarsRevenueStatus usd_rate:double = payments.StarsRevenueStats;

    updateStarsRevenueStatus#a584b019 peer:Peer status:StarsRevenueStatus = Update;

    ---functions---

    payments.getStarsRevenueStats#d91ffad6 flags:# dark:flags.0?true ton:flags.1?true peer:InputPeer = payments.StarsRevenueStats;

Telegram Star revenue statistics may be fetched by bot owners, and by channel admins if the [channelFull](/constructor/channelFull.md).`can_view_stars_revenue` flag is set.  

Channel/bot ad revenue statistics in **nanograms** (`1/1_000_000_000`th of a Gram) may be also fetched by channel/bot admins by setting the `ton` flag, if the [channelFull](/constructor/channelFull.md).`can_view_revenue`/[userFull](/constructor/userFull.md).`can_view_revenue` flag is set.

Use [payments.getStarsRevenueStats](/method/payments.getStarsRevenueStats.md) to fetch statistics about earned Telegram Stars/nanograms; the returned [StatsGraph](/type/StatsGraph.md) graphs can be rendered [as described here&nbsp;&raquo;](/api/stats.md#graph-visualization).

Specifically:

* `revenue_graph` - Star revenue graph (number of earned stars)
* `status` - Current balance, current withdrawable balance and overall earned Telegram Stars
* `usd_rate` - Current conversion rate of Telegram Stars to USD
* `top_hours_graph` - Ad impressions graph, for channel/bot ad revenue statistics

The server will emit an [updateStarsRevenueStatus](/constructor/updateStarsRevenueStatus.md) every time the balance changes; if the client is currently in the Monetization tab of the channel or bot, this update should apply the new balances (contained in the update), and refresh the transaction list using [payments.getStarsTransactions](/method/payments.getStarsTransactions.md) as specified [here&nbsp;&raquo;](#balance-and-transaction-history).  

### Buying or gifting stars

    starsTopupOption#bd915c0 flags:# extended:flags.1?true stars:long store_product:flags.0?string currency:string amount:long = StarsTopupOption;

    starsGiftOption#5e0589f1 flags:# extended:flags.1?true stars:long store_product:flags.0?string currency:string amount:long = StarsGiftOption;

    inputStorePaymentStarsTopup#f9a2a6cb flags:# stars:long currency:string amount:long spend_purpose_peer:flags.0?InputPeer = InputStorePaymentPurpose;
    inputStorePaymentStarsGift#1d741ef7 user_id:InputUser stars:long currency:string amount:long = InputStorePaymentPurpose;

    inputInvoiceStars#65f00ce3 purpose:InputStorePaymentPurpose = InputInvoice;

    ---functions---

    payments.getStarsTopupOptions#c00ec7d3 = Vector<StarsTopupOption>;

    payments.getStarsGiftOptions#d3c96bc8 flags:# user_id:flags.0?InputUser = Vector<StarsGiftOption>;

To purchase telegram stars for ourselves, first invoke the [payments.getStarsTopupOptions](/method/payments.getStarsTopupOptions.md) method, to obtain a list of topup options as [starsTopupOption](/constructor/starsTopupOption.md) constructors.  

To purchase telegram stars for a friend, first invoke the [payments.getStarsGiftOptions](/method/payments.getStarsGiftOptions.md) method, to obtain a list of gift options as [starsGiftOption](/constructor/starsGiftOption.md) constructors.  

**Note**: Star gifting functionality should only be enabled if the [stars_gifts_enabled&nbsp;&raquo;](/api/config.md#stars-gifts-enabled) flag is equal to true.  

Once the user has chosen a specific star topup/gift option, invoke [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoiceStars](/constructor/inputInvoiceStars.md), with either [inputStorePaymentStarsTopup](/constructor/inputStorePaymentStarsTopup.md) or [inputStorePaymentStarsGift](/constructor/inputStorePaymentStarsGift.md), populated with the values from the chosen [starsTopupOption](/constructor/starsTopupOption.md)/[starsGiftOption](/constructor/starsGiftOption.md).

The `spend_purpose_peer` of [inputStorePaymentStarsTopup &raquo;](/constructor/inputStorePaymentStarsTopup.md) should be populated with the peer where the topup process was initiated due to low funds (i.e. a bot for bot payments, a channel for paid media/reactions, etc); leave this flag unpopulated if the topup flow was not initiated when attempting to spend more Stars than currently available on the account's balance.  

Then, follow the [invoice payment flow as described in the payments documentation&nbsp;&raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

More alternative payment flows are also available:

- Payment via [Fragment](https://fragment.com), which also allows making larger purchases.
- The store-based subscription flow based on [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md)/[payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md), currently not available to third-party apps.  

For gifts, once the payment is successfully processed, the user to which the gift was sent will automatically receive a [messageService](/constructor/messageService.md) from the user that sent the gift, containing a [messageActionGiftStars](/constructor/messageActionGiftStars.md) constructor with further info about the price and duration of the gifted Telegram Stars.  
Clients should display this message, along with a sticker from the [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md) [stickerset](/api/stickers.md): here's an [example](https://telegram.org/blog/w3-browser-mini-app-store#gifting-stars-to-friends).  

The price in US dollars of 1000 Telegram Stars can be fetched using the [`stars_usd_sell_rate_x1000` config parameter &raquo;](/api/config.md#stars-usd-sell-rate-x1000).

The Star topup page should also be activated, if [some conditions](/api/links.md#stars-topup-link) are met, when the user clicks on a [topup deep link &raquo;](/api/links.md#stars-topup-link).  

### Star rating

    starsRating#1b0e4f07 flags:# level:int current_level_stars:long stars:long next_level_stars:flags.0?long = StarsRating;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

Telegram profiles now show a badge with a numerical rating based on the total volume of successful transactions they've made with Telegram Stars.  

It highlights your Telegram level and helps channel owners see that you can be trusted for Suggested Posts and other requests.

Purchasing [gifts](#star-gifts), sending [Paid Messages](#paid-messages) and funding [Suggested Posts](#suggested-posts) with Stars increases your rating. However, if you refund Star purchases or [convert gifts to Stars](/api/gifts.md) your rating will decrease.  

The rating is contained in the [starsRating](/constructor/starsRating.md) constructor, from [userFull](/constructor/userFull.md).`stars_rating`.  

A star rating is represented by the `level` (a possibly negative integer) and a `rating` (a possibly negative integer): the user can level up or level down by reaching certain thresholds in the `rating`.  

We may also see the pending star rating in [userFull](/constructor/userFull.md).`stars_my_pending_rating` only for ourselves, which will be applied at [userFull](/constructor/userFull.md).`stars_my_pending_rating_date`.  

[stars_rating_learnmore_url](/api/config.md#stars-rating-learnmore-url) will contain a URL that can be shown to users, leading to a page with more info about the Star Rating system.  

### Using stars

    payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;

    payments.paymentReceiptStars#dabbf83a flags:# date:int bot_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice currency:string total_amount:long transaction_id:string users:Vector<User> = payments.PaymentReceipt;

    ---functions---

    payments.sendStarsForm#7998c914 form_id:long invoice:InputInvoice = payments.PaymentResult;

    payments.refundStarsCharge#25ae8f4a user_id:InputUser charge_id:string = Updates;

The full flow to make purchases using Telegram Stars is described alongside the traditional payment flow in the [payments documentation&nbsp;&raquo;](/api/payments.md): all invoices and constructors working with currency amounts will use the currency code `XTR`, and the amounts will be in Telegram Stars.  

#### Paid media

Telegram Stars are used to pay for [paid media](/api/paid-media.md), which may be posted on channels by administrators as specified [here&nbsp;&raquo;](/api/paid-media.md).  

Purchasing paid media will transfer Telegram Stars to the channel's balance.  
Channel owners can then [withdraw Stars as Gram&nbsp;&raquo;](#withdrawing-revenue), or [use Stars to place ads for the channel&nbsp;&raquo;](#paying-for-ads).

[Star revenue statistics](#revenue-statistics) and [balance information](#balance-and-transaction-history) is also available to channel owners.  

#### Paid messages

Telegram Stars can be used to pay for sending messages to users and channels that have configured [paid messages &raquo;](/api/paid-messages.md), requiring a payment for every message sent to them.  

Purchasing paid media will transfer Telegram Stars to the balance of the channel or the user.  

#### Paid reactions

Users can now directly support their favorite channels and content creators by sending them Telegram Stars using a new Star reaction.

Channel owners receive 100% of the stars — and can convert them into Gram cryptocurrency rewards or subsidized ads.

See [here &raquo;](/api/reactions.md#paid-reactions) for the full flow.

#### Suggested posts

Telegram offers a powerful monetization feature to channel administrators: **suggested posts**.  

See [here &raquo;](/api/suggested-posts.md) for the full flow.

#### Bot payments

Telegram Stars are also used to pay for digital services in bots, using [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) and [the usual payment flow&nbsp;&raquo;](/api/payments.md), with `currency="XTR"`.  

Purchasing paid media will transfer Telegram Stars to the bot's balance.  
Bot owners can then [withdraw Stars as Gram&nbsp;&raquo;](#withdrawing-revenue), or [use Stars to place ads for the channel&nbsp;&raquo;](#paying-for-ads).

[Star revenue statistics](#revenue-statistics) and [balance information](#balance-and-transaction-history) is also available to bot owners.  

#### Star referrals

Developers can open affiliate programs for their [mini app](/api/bots/webapps.md) – allowing **content creators**, other **mini app developers** and **any Telegram user** to promote it and earn commissions on purchases made by people they referred.

See [here &raquo;](/api/bots/referrals.md) for more info on the full flow. 

#### Star subscriptions

Bots and channels may create subscriptions, periodically charging users a certain amount of [Telegram Stars](/api/stars.md) in exchange for content and services.

See [here &raquo;](/api/subscriptions.md) for the full flow.  

#### Star giveaways

Star giveaways are similar to [normal giveaways](/api/giveaways.md#giveaways-and-giftcodes), with the only difference that instead of giving away gifts or [Telegram Premium subscriptions](/api/premium.md), the giveaway will automatically distribute Telegram Stars among the winners.

See [here &raquo;](/api/giveaways.md#star-giveaways) for the full flow.  

#### Star gifts

Users can send **Gifts** to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars. 

See [here &raquo;](/api/gifts.md) for the full flow.  

### Withdrawing revenue

    payments.starsRevenueWithdrawalUrl#1dab80b7 url:string = payments.StarsRevenueWithdrawalUrl;
    ---functions---

    payments.getStarsRevenueWithdrawalUrl#2433dc92 flags:# ton:flags.0?true peer:InputPeer amount:flags.1?long password:InputCheckPasswordSRP = payments.StarsRevenueWithdrawalUrl;

To withdraw funds from the star balance of a channel or bot we own, invoke [payments.getStarsRevenueWithdrawalUrl](/method/payments.getStarsRevenueWithdrawalUrl.md), passing the current account's [2FA password](/api/srp.md) as an [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) constructor, generated [as specified here&nbsp;&raquo;](/api/srp.md).  

To withdraw a channel/bot's ad revenue, invoke the same method in the same manner, while also setting the `ton` flag.  

Only the channel/bot owner can invoke this method, and only if the balance is bigger than or equal to [stars_revenue_withdrawal_min&nbsp;&raquo;](/api/config.md#stars-revenue-withdrawal-min) and the `status.withdrawal_enabled` flag returned by [payments.getStarsRevenueStats](/method/payments.getStarsRevenueStats.md) is set.  

[stars_revenue_withdrawal_max&nbsp;&raquo;](/api/config.md#stars-revenue-withdrawal-max) specifies the maximum amount of [Telegram Stars](/api/stars.md) that can be [withdrawn &raquo;](/api/stars.md#withdrawing-revenue) from a channel or bot's balance.  
To withdraw more stars, restart the withdrawal process.

The method will return a unique URL to a [Fragment](https://fragment.com/) page where the user will be able to specify and submit the address of the TON wallet where the funds will be sent.  

By withdrawing one thousand stars, the user will receive the equivalent of [`stars_usd_withdraw_rate_x1000` US dollars, as specified by the client configuration &raquo;](/api/config.md#stars-usd-withdraw-rate-x1000).  

### Paying for ads

    starsTransactionPeerAds#60682812 = StarsTransactionPeer;

    payments.starsRevenueAdsAccountUrl#394e7f21 url:string = payments.StarsRevenueAdsAccountUrl;

    ---functions---

    payments.getStarsRevenueAdsAccountUrl#d1d7efc5 peer:InputPeer = payments.StarsRevenueAdsAccountUrl;

Channel/bot owners may place Telegram advertisements for channels/bots they own using the Telegram Ad platform, paying using the **Stars** currently available on the bot/channel's balance at a special rate with a **30% discount** – creating a **cost-effective** way of reaching new users.  

To use Stars for ads, go to your bot's or channels' Balance or Monetization section and tap '*Buy Ads*'.  
Clicking on the button should invoke [payments.getStarsRevenueAdsAccountUrl](/method/payments.getStarsRevenueAdsAccountUrl.md) (passing the bot/channel in `peer`).  
The returned `url` will lead to a page where the user will be able to place ads for the channel/bot passed in `peer`.  

[Transactions](#balance-and-transaction-history) for ad payments will be of type [starsTransactionPeerAds](/constructor/starsTransactionPeerAds.md).  

### Transferring stars from a business account to the business bot

    inputInvoiceBusinessBotTransferStars#f4997e42 bot:InputUser stars:long = InputInvoice;

    payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;

    ---functions---

    payments.getStarsStatus#4ea9b3bf flags:# ton:flags.0?true peer:InputPeer = payments.StarsStatus;

[inputInvoiceBusinessBotTransferStars](/constructor/inputInvoiceBusinessBotTransferStars.md) may be used to transfer stars from the balance of a user account [connected to a business bot](/api/bots/connected-business-bots.md), to the balance of the business bot.  

The number of available stars on the user's balance may be fetched by invoking [payments.getStarsStatus](/method/payments.getStarsStatus.md) with peer=[inputPeerSelf](/constructor/inputPeerSelf.md) over the business connection.  

To transfer the stars, invoke [payments.getPaymentForm](/method/payments.getPaymentForm.md) with [inputInvoiceBusinessBotTransferStars](/constructor/inputInvoiceBusinessBotTransferStars.md) (with `bot`=[inputPeerSelf](/constructor/inputPeerSelf.md)), and follow the usual [payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product), **with all method calls executed over the business connection**.  

### My Stars deep links

[My Stars deep links &raquo;](/api/links.md#my-stars-links) and [my Gram deep links &raquo;](/api/links.md#my-grams-links) can be used to bring the user to the My Stars/My Gram page, containing the topup button, the Star/TON transaction history, statistics, and much more, as specified in the above sections.

### Gram

    starsTonAmount#74aee3e0 amount:long = StarsAmount;

    messageActionGiftTon#a8a3c699 flags:# currency:string amount:long crypto_currency:string crypto_amount:long transaction_id:flags.0?string = MessageAction;

    inputStickerSetTonGifts#1cf671a0 = InputStickerSet;

In some places in the API, it's possible to use Grams instead of Stars: in this case, a [starsTonAmount](/constructor/starsTonAmount.md) constructor will be used instead of [starsAmount](/constructor/starsAmount.md), specifying an amount of TONs in the smallest unit of the cryptocurrency, currently *nanograms*, `1/1_000_000_000`th (a billionth) of a Gram.

When TONs are gifted to the user, a [messageActionGiftTon](/constructor/messageActionGiftTon.md) is received: this constructor, along with its contents, should be displayed next to the appropriate sticker from the [inputStickerSetTonGifts &raquo;](/constructor/inputStickerSetTonGifts.md) [stickerset &raquo;](/api/stickers.md#stickersets):

* If `crypto_amount <= 10_000_000_000`, choose the sticker with emoji equal to "2️⃣"
* If `crypto_amount <= 50_000_000_000`, choose the sticker with emoji equal to "1️⃣"
* Otherwise, choose the sticker with emoji equal to "3️⃣" 

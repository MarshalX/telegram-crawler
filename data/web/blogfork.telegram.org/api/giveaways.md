# Giveaways and gifts


Telegram [channel and supergroup](/api/channel.md) administrators with any set of [rights](/api/rights.md) may launch giveaways to randomly distribute [Telegram Premium](/api/premium.md) subscriptions and other gifts among their followers, in exchange for [boosts](/api/boost.md).

### Giveaways and giftcodes

This functionality should only be enabled if the [giveaway_gifts_purchase_available](/api/config.md#giveaway-gifts-purchase-available) config value is set to true.  

Note that the flow described below can also be used to gift Premium subscriptions to multiple friends, and is different from the [old gift flow](/api/premium.md#gifting-telegram-premium), which allowed gifting only one subscription with some extra limitations, not present in this flow.  

Note that [premium multigift links](/api/links.md#premium-multigift-links) lead to a page that uses the new gift flow described below.  

Schema:

    premiumGiftCodeOption#257e962b flags:# users:int months:int store_product:flags.0?string store_quantity:flags.1?int currency:string amount:long = PremiumGiftCodeOption;

    inputStorePaymentPremiumGiveaway#160544ca flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long = InputStorePaymentPurpose;
    inputStorePaymentPremiumGiftCode#fb790393 flags:# users:Vector<InputUser> boost_peer:flags.0?InputPeer currency:string amount:long message:flags.1?TextWithEntities = InputStorePaymentPurpose;

    inputInvoicePremiumGiftCode#98986c0d purpose:InputStorePaymentPurpose option:PremiumGiftCodeOption = InputInvoice;

    prepaidGiveaway#b2539d54 id:long months:int quantity:int date:int = PrepaidGiveaway;

    premium.boostsStatus#4959427a flags:# my_boost:flags.2?true level:int current_level_boosts:int boosts:int gift_boosts:flags.4?int next_level_boosts:flags.0?int premium_audience:flags.1?StatsPercentValue boost_url:string prepaid_giveaways:flags.3?Vector<PrepaidGiveaway> my_boost_slots:flags.2?Vector<int> = premium.BoostsStatus;

    messageMediaGiveaway#aa073beb flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.2?true channels:Vector<long> countries_iso2:flags.1?Vector<string> prize_description:flags.3?string quantity:int months:flags.4?int stars:flags.5?long until_date:int = MessageMedia;
    
    messageActionGiveawayLaunch#a80f51e4 flags:# stars:flags.0?long = MessageAction;
    messageActionGiveawayResults#87e2f155 flags:# stars:flags.0?true winners_count:int unclaimed_count:int = MessageAction;

    messageActionGiftCode#31c48347 flags:# via_giveaway:flags.0?true unclaimed:flags.5?true boost_peer:flags.1?Peer days:int slug:string currency:flags.2?string amount:flags.2?long crypto_currency:flags.3?string crypto_amount:flags.3?long message:flags.4?TextWithEntities = MessageAction;

    payments.giveawayInfo#4367daa0 flags:# participating:flags.0?true preparing_results:flags.3?true start_date:int joined_too_early_date:flags.1?int admin_disallowed_chat_id:flags.2?long disallowed_country:flags.4?string = payments.GiveawayInfo;
    payments.giveawayInfoResults#e175e66f flags:# winner:flags.0?true refunded:flags.1?true start_date:int gift_code_slug:flags.3?string stars_prize:flags.4?long finish_date:int winners_count:int activated_count:flags.2?int = payments.GiveawayInfo;

    payments.checkedGiftCode#eb983f8f flags:# via_giveaway:flags.2?true from_id:flags.4?Peer giveaway_msg_id:flags.3?int to_id:flags.0?long date:int days:int used_date:flags.1?int chats:Vector<Chat> users:Vector<User> = payments.CheckedGiftCode;

    ---functions---

    payments.getPremiumGiftCodeOptions#2757ba54 flags:# boost_peer:flags.0?InputPeer = Vector<PremiumGiftCodeOption>;
    
    payments.getPaymentForm#37148dbb flags:# invoice:InputInvoice theme_params:flags.0?DataJSON = payments.PaymentForm;

    premium.getBoostsStatus#042f1f61 peer:InputPeer = premium.BoostsStatus;

    payments.launchPrepaidGiveaway#5ff58f20 peer:InputPeer giveaway_id:long purpose:InputStorePaymentPurpose = Updates;

    payments.getGiveawayInfo#f4239425 peer:InputPeer msg_id:int = payments.GiveawayInfo;

    payments.checkGiftCode#8e51b4c1 slug:string = payments.CheckedGiftCode;
    payments.applyGiftCode#f6e26854 slug:string = Updates;

First of all, invoke [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md) to obtain a list of [premiumGiftCodeOption](/constructor/premiumGiftCodeOption.md) constructors, containing a list of giveaway options that may be chosen by the admin, indicating the number and duration of the of [Telegram Premium](/api/premium.md) subscriptions that will be gifted in the giveaway, along with their price (`amount`) in the specified `currency` (see the [constructor page&nbsp;&raquo;](/constructor/premiumGiftCodeOption.md) for more info on these fields).  

Once the admin has chosen a specific gift code option, invoke [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoicePremiumGiftCode](/constructor/inputInvoicePremiumGiftCode.md), with the chosen [premiumGiftCodeOption](/constructor/premiumGiftCodeOption.md) in `option` and a `purpose` containing either:

* [inputStorePaymentPremiumGiveaway](/constructor/inputStorePaymentPremiumGiveaway.md) to create a giveaway, where Telegram will randomly select `option.users` subscribers to the channel/supergroup specified in `purpose.boost_peer` (only new subscribers starting from the giveaway creation date if the `purpose.only_new_subscribers` field is set).  
  Additional channels/supergroups that the user must join to participate to the giveaway can be specified in `additional_peers`.  
  The set of users that can participate to the giveaway can be restricted by passing an explicit whitelist of up to [giveaway_countries_max](/api/config.md#giveaway-countries-max) countries, specified as two-letter ISO 3166-1 alpha-2 country codes in `countries_iso2`.  
  The end date of the giveaway must be specified in `until_date`, and it must be at most [giveaway_period_max](/api/config.md#giveaway-period-max) seconds in the future; at that date, Telegram will randomly choose `option.users` subscribers according to the conditions specified above, and send them a Telegram Premium giftcode as a [messageActionGiftCode](/constructor/messageActionGiftCode.md) constructor, that should be used client-side to generate a [giftcode link](/api/links.md#premium-giftcode-links).  
  The channel/supergroup specified in `boost_peer` will receive [giveaway_boosts_per_premium](/api/config.md#giveaway-boosts-per-premium) [boosts](/api/boost.md) from each winner, that cannot be reassigned to another channel/supergroup for the duration of the gifted subscription.  
* or [inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md), to gift [Telegram Premium](/api/premium.md) subscriptions only to some specific subscribers (`purpose.users`, max [giveaway_add_peers_max](/api/config.md#giveaway-add-peers-max) users) of the channel/supergroup specified in `purpose.boost_peer`, which will receive [giveaway_boosts_per_premium](/api/config.md#giveaway-boosts-per-premium) [boosts](/api/boost.md) from each user, that cannot be reassigned to another channel/supergroup for the duration of the gifted subscription.  
  Users may also use this method to simply gift subscriptions to contacts by **not** setting the `boost_peer` field: in this case, gifting a [Telegram Premium](/api/premium.md) subscription to another user will create [boosts_per_sent_gift](/api/config.md#boosts-per-sent-gift) [boost slots&nbsp;&raquo;](/api/boost.md) for us, and one boost slot for the destination user.  

Then, follow the [invoice payment flow as described in the payments documentation&nbsp;&raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

More alternative payment flows are also available:

- The Premium Bot flow, by contacting [premium_bot_username](/api/config.md#premium-bot-username), and following the inline keyboard payment flow for giveaways (the final keyboard with the prices will contain buttons with [invoice deep links&nbsp;&raquo;](/api/links.md#invoice-links) that should be used to make the payment).
- Payment via [Fragment](https://fragment.com), which also allows making larger purchases.
- The store-based subscription flow based on [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md)/[payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md), currently not available to third-party apps.  

Then:

* If the payment was made using the [payments.getPaymentForm](/method/payments.getPaymentForm.md) or [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md)/[payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md) payment flows, the giveaway will launch as soon as the payment is complete.

* Otherwise, if the [Premium bot](/api/config.md#premium-bot-username) or [Fragment](https://fragment.com) flows were used, once the payment for the giveaway is made, invoke [premium.getBoostsStatus](/method/premium.getBoostsStatus.md), passing to `peer` the ID of the channel/supergroup that we selected when paying for the giveaway, to obtain a [prepaidGiveaway](/constructor/prepaidGiveaway.md) constructor in [premium.boostsStatus](/constructor/premium.boostsStatus.md).`prepaid_giveaways`, containing info about the prepaid giveaway.  

  To actually launch the giveaway for the Fragment and bot flows, invoke [payments.launchPrepaidGiveaway](/method/payments.launchPrepaidGiveaway.md), passing [prepaidGiveaway](/constructor/prepaidGiveaway.md).`id` to `giveaway_id`, the ID of the channel/supergroup to `peer` and giveaway settings in `purpose` (populated as specified above).  

Finally:

* If the payment succeeds and we're launching a giveaway using [inputStorePaymentPremiumGiveaway](/constructor/inputStorePaymentPremiumGiveaway.md): a [messageActionGiveawayLaunch](/constructor/messageActionGiveawayLaunch.md) service message and a media message containing a [messageMediaGiveaway](/constructor/messageMediaGiveaway.md) will be sent to the channel/supergroup.  
  
  Once the giveaway is over, a [messageActionGiveawayResults](/constructor/messageActionGiveawayResults.md) will be sent to the channel/supergroup and the winners will automatically receive a [messageActionGiftCode](/constructor/messageActionGiftCode.md) service message from Telegram's service user, containing the `slug` that can be used to generate a [giftcode link](/api/links.md#premium-giftcode-links) to redeem the Premium subscription.  
  The [messageActionGiftCode](/constructor/messageActionGiftCode.md).`via_giveaway` flag will be set.  

* If the payment succeeds and we're simply gifting some subscriptions to specific users [inputStorePaymentPremiumGiftCode](/constructor/inputStorePaymentPremiumGiftCode.md): the specified users will automatically receive a [messageActionGiftCode](/constructor/messageActionGiftCode.md) service message from Telegram's service user, containing the `slug` that can be used to generate a [giftcode link](/api/links.md#premium-giftcode-links) to redeem the Premium subscription.  
  The [messageActionGiftCode](/constructor/messageActionGiftCode.md).`via_giveaway` flag will not be set.  

  Note that if the payment was made on behalf of the user (i.e. if `boost_peer` was **not** set), then the users to which the gift was sent will instead receive a [messageService](/constructor/messageService.md) from the user that sent the gift, containing a [messageActionGiftPremium](/constructor/messageActionGiftPremium.md) constructor with further info about the price and duration of the gifted Telegram Premium subscription.  
  Clients should display this message, along with a sticker from the [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md) [stickerset](/api/stickers.md): here's an [example](https://telegram.org/blog/custom-emoji#gifting-telegram-premium).  

The [messageActionGiftCode](/constructor/messageActionGiftCode.md).`slug` should be used to generate a [giftcode link](/api/links.md#premium-giftcode-links), that the user can use to redeem the subscription, or re-gift it to someone else.  

If `winners_are_visible` flag is set while starting a giveaway, giveaway winners are public and will be listed in a [messageMediaGiveawayResults](/constructor/messageMediaGiveawayResults.md) message that will be automatically sent to the channel/supergroup once the giveaway ends.  

Any user can invoke [payments.checkGiftCode](/method/payments.checkGiftCode.md) with the link's slug to obtain info about the giveaway, such as the channel/supergroup that gifted the subscription (`from_id`), and the user that originally received the gift (`to_id`).  
This can also be useful to channel/supergroup administrators to precisely determine the winners of a giveaway, for example if the giveaway also included some extra gifts apart from Premium subscriptions (*like Teslas*): the winners can simply send their link as indisputable proof that they won the giveaway, because the user that received the gift can be viewed in the `to_id` field returned by Telegram when invoking [payments.checkGiftCode](/method/payments.checkGiftCode.md) on the slug.  
Another way for admins to check who received the gifts is to simply use [premium.getBoostsList](/method/premium.getBoostsList.md) while the boosts received by the gifts are still active.  

To claim the [Telegram Premium](/api/premium.md) subscription, simply invoke [payments.applyGiftCode](/method/payments.applyGiftCode.md), passing the link's `slug`.  

### Star giveaways

    starsGiveawayOption#94ce852a flags:# extended:flags.0?true default:flags.1?true stars:long yearly_boosts:int store_product:flags.2?string currency:string amount:long winners:Vector<StarsGiveawayWinnersOption> = StarsGiveawayOption;
    
    starsGiveawayWinnersOption#54236209 flags:# default:flags.0?true users:int per_user_stars:long = StarsGiveawayWinnersOption;

    inputInvoiceStars#65f00ce3 purpose:InputStorePaymentPurpose = InputInvoice;
    
    inputStorePaymentStarsGiveaway#751f08fa flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true stars:long boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long users:int = InputStorePaymentPurpose;

    ---functions---

    payments.getStarsGiveawayOptions#bd1efd3e = Vector<StarsGiveawayOption>;

    payments.getPaymentForm#37148dbb flags:# invoice:InputInvoice theme_params:flags.0?DataJSON = payments.PaymentForm;

Star giveaways are similar to [normal giveaways](#giveaways-and-giftcodes), with the only difference that instead of giving away gifts or [Telegram Premium subscriptions](/api/premium.md), the giveaway will automatically distribute [Telegram Stars](/api/stars.md) among the winners.

First of all, invoke [payments.getStarsGiveawayOptions](/method/payments.getStarsGiveawayOptions.md) to obtain a list of [starsGiveawayOption](/constructor/starsGiveawayOption.md) constructors, containing a list of giveaway options that may be chosen by the admin, indicating the number of winners of the giveaway, the number of [Telegram Stars](/api/stars.md) that will be gifted in the giveaway, along with their price (`amount`) in the specified `currency` (see the [constructor page&nbsp;&raquo;](/constructor/starsGiveawayOption.md) for more info on these and all the remaining fields).  

Once the admin has chosen a specific giveaway option, invoke [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoiceStars](/constructor/inputInvoiceStars.md), containing an [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md) constructor, with:

- The `stars`, `currency` and `amount` from the chosen [starsGiveawayOption](/constructor/starsGiveawayOption.md) and some extra options, as specified in the [constructor page &raquo;](/constructor/inputStorePaymentStarsGiveaway.md).
- Additional channels/supergroups that the user must join to participate to the giveaway can be specified in `additional_peers`.  
- The set of users that can participate to the giveaway can be restricted by passing an explicit whitelist of up to [giveaway_countries_max](/api/config.md#giveaway-countries-max) countries, specified as two-letter ISO 3166-1 alpha-2 country codes in `countries_iso2`.  
- The end date of the giveaway must be specified in `until_date`, and it must be at most [giveaway_period_max](/api/config.md#giveaway-period-max) seconds in the future; at that date, Telegram will randomly choose `users` subscribers according to the conditions specified above, and send them `per_user_stars` Telegram Stars as a [messageActionPrizeStars](/constructor/messageActionPrizeStars.md) constructor.  
  A [messageActionPrizeStars](/constructor/messageActionPrizeStars.md) with the `unclaimed` flag set may also be emitted, refunding the remaining stars to the creator of a giveaway if, when the giveaway ends, the number of members in the channel is smaller than the number of winners in the giveaway.
- The channel/supergroup specified in `boost_peer` will receive [starsGiveawayOption](/constructor/starsGiveawayOption.md).`yearly_boosts` [boosts](/api/boost.md) for one year.  

Then, follow the [invoice payment flow as described in the payments documentation&nbsp;&raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

More alternative payment flows are also available:

- The Premium Bot flow, by contacting [premium_bot_username](/api/config.md#premium-bot-username), and following the inline keyboard payment flow for star giveaways (the final keyboard with the prices will contain buttons with [invoice deep links&nbsp;&raquo;](/api/links.md#invoice-links) that should be used to make the payment).
- The store-based subscription flow based on [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md)/[payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md), currently not available to third-party apps.  

Then:

* If the payment was made using the [payments.getPaymentForm](/method/payments.getPaymentForm.md) or [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md)/[payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md) payment flows, the giveaway will launch as soon as the payment is complete.

* Otherwise, if the [Premium bot](/api/config.md#premium-bot-username) flow was used, once the payment for the giveaway is made, invoke [premium.getBoostsStatus](/method/premium.getBoostsStatus.md), passing to `peer` the ID of the channel/supergroup that we selected when paying for the giveaway, to obtain a [prepaidStarsGiveaway](/constructor/prepaidStarsGiveaway.md) constructor in [premium.boostsStatus](/constructor/premium.boostsStatus.md).`prepaid_giveaways`, containing info about the prepaid star giveaway.  
  To actually launch the giveaway for the bot flow, invoke [payments.launchPrepaidGiveaway](/method/payments.launchPrepaidGiveaway.md), passing [prepaidStarsGiveaway](/constructor/prepaidStarsGiveaway.md).`id` to `giveaway_id`, the ID of the channel/supergroup to `peer` and giveaway settings in `purpose` (populated in the [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md) created above).  

# Telegram Gifts


Users can send **Gifts** to their friends. The recipients of gifts can display them on their profile pages or turn them into [Telegram Stars &raquo;](/api/stars.md). Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

### Sending gifts

    payments.starGiftsNotModified#a388a368 = payments.StarGifts;
    payments.starGifts#2ed82995 hash:int gifts:Vector<StarGift> chats:Vector<Chat> users:Vector<User> = payments.StarGifts;

    starGift#313a9547 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true require_premium:flags.7?true limited_per_user:flags.8?true peer_color_available:flags.10?true auction:flags.11?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int availability_resale:flags.4?long convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long resell_min_stars:flags.4?long title:flags.5?string released_by:flags.6?Peer per_user_total:flags.8?int per_user_remains:flags.8?int locked_until_date:flags.9?int auction_slug:flags.11?string gifts_per_round:flags.11?int auction_start_date:flags.11?int upgrade_variants:flags.12?int background:flags.13?StarGiftBackground = StarGift;

    payments.checkCanSendGiftResultOk#374fa7ad = payments.CheckCanSendGiftResult;
    payments.checkCanSendGiftResultFail#d5e58274 reason:TextWithEntities = payments.CheckCanSendGiftResult;

    inputInvoiceStarGift#e8625e92 flags:# hide_name:flags.0?true include_upgrade:flags.2?true peer:InputPeer gift_id:long message:flags.1?TextWithEntities = InputInvoice;
    inputInvoiceStarGiftResale#c39f5324 flags:# ton:flags.0?true slug:string to_id:InputPeer = InputInvoice;

    messageActionStarGift#ea2c31d3 flags:# name_hidden:flags.0?true saved:flags.2?true converted:flags.3?true upgraded:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true prepaid_upgrade:flags.13?true upgrade_separate:flags.16?true auction_acquired:flags.17?true gift:StarGift message:flags.1?TextWithEntities convert_stars:flags.4?long upgrade_msg_id:flags.5?int upgrade_stars:flags.8?long from_id:flags.11?Peer peer:flags.12?Peer saved_id:flags.12?long prepaid_upgrade_hash:flags.14?string gift_msg_id:flags.15?int to_id:flags.18?Peer gift_num:flags.19?int = MessageAction;

    inputPrivacyKeyStarGiftsAutoSave#e1732341 = InputPrivacyKey;
    privacyKeyStarGiftsAutoSave#2ca4fdf8 = PrivacyKey;
    
    ---functions---

    payments.getStarGifts#c4563590 hash:int = payments.StarGifts;
    payments.getResaleStarGifts#7a5fa236 flags:# sort_by_price:flags.1?true sort_by_num:flags.2?true for_craft:flags.4?true stars_only:flags.5?true attributes_hash:flags.0?long gift_id:long attributes:flags.3?Vector<StarGiftAttributeId> offset:string limit:int = payments.ResaleStarGifts;
    payments.checkCanSendGift#c0c4edc9 gift_id:long = payments.CheckCanSendGiftResult;
    payments.saveStarGift#2a2a697c flags:# unsave:flags.0?true stargift:InputSavedStarGift = Bool;

If the [userFull](/constructor/userFull.md).`display_gifts_button` flag of both us and another user is set (changed through [globalPrivacySettings](/constructor/globalPrivacySettings.md)), a gift button should always be displayed in the text field in private chats with the other user: once clicked, the gift UI should be displayed, offering the user options to gift [Telegram Premium &raquo;](/api/premium.md#gifting-telegram-premium) subscriptions or [Telegram Gifts &raquo;](/api/gifts.md). 

The same gifting UI should always be (unconditionally) available through a chat picker, activated by a "Send a Gift" entry in the app's settings.  

Users may disallow the reception of specific gift types by populating the [globalPrivacySettings](/constructor/globalPrivacySettings.md).`disallowed_gifts` flag, visible to other users in [userFull](/constructor/userFull.md).`disallowed_gifts`.  

* Use [payments.getStarGifts](/method/payments.getStarGifts.md) to obtain the full list of available [starGifts](/constructor/starGift.md); this method may return some sold-out gifts that have the `availability_resale` flag set, which indicates that some gifts of this type are on [resale &raquo;](#reselling-collectible-gifts)
* Use [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) to fetch gifts currently on resale.  
  Pass the returned [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`next_offset` to the `offset` of the next method call to fetch the next result page.  
  
  The `sort_by_price` and `sort_by_num` parameters are mutually exclusive, if neither are set results are sorted by the unixtime (descending) when their resell price was last changed.

  The same method can also be used to fetch the full list of available attributes ([payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes`) for the specified gift type: to fetch it, the `attributes_hash` field **must** be populated and equal to `0`.  
  The `attributes_hash` parameter can also be set to a previously returned [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes_hash`, to avoid refetching the attributes if they haven't changed.  

  If at least one of the following is true:  

  * The `attributes_hash` parameter of the method is *not* set
  * The `offset` parameter is non-empty
  * The passed `attributes_hash` is equal to the server-side value
  
  ...the [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes` field will **not** be returned, because the [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes` field is related to all gifts of a specific type, not just to the ones on the current page.  
  Setting the `attributes` filter parameter of the method will also not affect the returned [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes` in any way.  

  The returned [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`counters` field is related to the [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes` field, it indicates the total number of gifts that have a specific attribute: the `counters` field *will* be returned even if the `attributes_hash` parameter is not set, but it won't be returned if the `offset` field is non-empty.  
  
  Finally, the `attributes` parameter of [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) may also be set to only fetch gifts that have the specified attributes.  
  If the flag is populated but no attributes of a specific type are specified, all attributes of that type are allowed.  
  Note that this will not affect the returned `attributes` and `counters`.  

[starGift](/constructor/starGift.md)s with the `limited_per_user` flag set and `per_user_remains <= 0` cannot be bought by the current user, since they already bought `per_user_total` gifts of the same type (either for themselves or for someone else).  

[starGift](/constructor/starGift.md)s with the `locked_until_date` flag set *possibly* cannot be bought until the specified unixtime: to verify if that is the case, invoke [payments.checkCanSendGift](/method/payments.checkCanSendGift.md).  
This method will return a [payments.checkCanSendGiftResultFail](/constructor/payments.checkCanSendGiftResultFail.md) if the gift cannot be sent, along with a localized description specifying why it cannot be sent yet.  
Otherwise, it will return [payments.checkCanSendGiftResultOk](/constructor/payments.checkCanSendGiftResultOk.md), in which case the client should still check if the [starGift](/constructor/starGift.md).`require_premium` flag is set, and if yes, require the user to purchase a [Telegram Premium](/api/premium.md) subscription (if they aren't subscribed already).  

[starGift](/constructor/starGift.md)s with the `auction` flag set cannot be bought using the normal [inputInvoiceStarGift](/constructor/inputInvoiceStarGift.md) flow: they must instead be handled as [collectible gift auctions &raquo;](#collectible-gift-auctions).  

Once the user chooses a sendable, (non-`sold_out`) gift, they may buy it spending [starGift](/constructor/starGift.md).`stars` [Telegram Stars](/api/stars.md) from their balance by invoking [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoiceStarGift](/constructor/inputInvoiceStarGift.md), passing the following parameters:

* `peer`: Identifier of the user or channel (only if [channelFull](/constructor/channelFull.md).`stargifts_available` is set) that will receive the gift
* `gift_id`: Identifier of the gift, from [starGift](/constructor/starGift.md).`id`
* `message`: Optional message, attached with the gift: the maximum length for this field is specified in the [stargifts_message_length_max client configuration value &raquo;](/api/config.md#stargifts-message-length-max).
* `hide_name`: If set, your name will be hidden if the destination peer decides to display the gift on their profile (they will still see that you sent the gift)
* `include_upgrade`: Set this flag to additionally prepay [starGift](/constructor/starGift.md).`upgrade_stars` [Telegram Stars](/api/stars.md), allowing the receiver to convert the gift to a [collectible gift &raquo;](#collectible-gifts) without paying anything.  
  Note that this flag can only be set if [starGift](/constructor/starGift.md).`upgrade_stars` is set.  

When buying a gift from the list of gifts currently on [resale &raquo;](#reselling-collectible-gifts), pass an [inputInvoiceStarGiftResale](/constructor/inputInvoiceStarGiftResale.md) instead:

* `slug`: Taken from the returned [starGiftUnique](/constructor/starGiftUnique.md).`slug`, or from the link
* `to_id`: Identifier of the user or channel that will receive the gift

Then, follow the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

Once the payment is completed, the destination peer will receive a [messageService](/constructor/messageService.md) with a [messageActionStarGift](/constructor/messageActionStarGift.md) from us, containing info about the received gift.  

The peer may then choose to display the received gift on their profile using [payments.saveStarGift](/method/payments.saveStarGift.md).  
Received gifts may also be automatically displayed on the profile, depending on the destination peer's [privacy settings](/api/privacy.md) ([inputPrivacyKeyStarGiftsAutoSave](/constructor/inputPrivacyKeyStarGiftsAutoSave.md) key).  

If the user decides to display the received gift on their profile, it will be fetchable by all users as specified [here &raquo;](#list-all-received-gifts).  
The same method may also be used to fetch all gifts received by owned peers from any user.  

Note that gift support must be disabled if the [`stargifts_blocked` client configuration flag &raquo;](/api/config.md) is set to true.

### Converting a gift back into stars

    ---functions---

    payments.convertStarGift#74bf076b stargift:InputSavedStarGift = Bool;

An owned gift may be converted into [Telegram Stars](/api/stars.md) using [payments.convertStarGift](/method/payments.convertStarGift.md); the latter operation will permanently destroy the gift, converting it into [starGift](/constructor/starGift.md).`convert_stars` Telegram Stars, added to the user's balance (note that [starGift](/constructor/starGift.md).`convert_stars` will be less than the buying price ([starGift](/constructor/starGift.md).`stars`) of the gift).  

A gift can be converted back into [Telegram Stars](/api/stars.md) only if it was received less than [`stargifts_convert_period_max` seconds ago, as specified by the client configuration &raquo;](/api/config.md#stargifts-convert-period-max) and if the [starGift](/constructor/starGift.md).`convert_stars` field is not equal to `0`.  

Gifts acquired through [collectible gift auctions &raquo;](#collectible-gift-auctions) cannot be converted back into [Telegram Stars](/api/stars.md).  

### List all received gifts

    payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;

    ---functions---

    payments.getSavedStarGifts#a319e569 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_unique:flags.4?true sort_by_value:flags.5?true exclude_upgradable:flags.7?true exclude_unupgradable:flags.8?true peer_color_available:flags.9?true exclude_hosted:flags.10?true peer:InputPeer collection_id:flags.6?int offset:string limit:int = payments.SavedStarGifts;

[payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) may be used to fetch the full list of gifts received by a peer, such as:

* A user, with peer=[inputPeerUser](/constructor/inputPeerUser.md) (including users different from us)
* A channel, with peer=[inputPeerChannel](/constructor/inputPeerChannel.md) (including channels not owned by the currently logged in user)
* A [connected business user](/api/bots/connected-business-bots.md) (when executing the method as a bot, over the business connection), with peer=[inputPeerUser](/constructor/inputPeerUser.md) of the controlled user

The method's parameters may be used to filter out gifts based on various criteria, see the [method page](/method/payments.getSavedStarGifts.md) for more info.  

Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned to the profile) for users and channels owned/controlled by the currently logged in user, depending on the passed flags.  

By default, the method may also return [hosted collectible gifts &raquo;](#hosted-collectible-gifts); set `exclude_hosted` to return only gifts actually owned or received by `peer`.  

### List specific owned gifts

    inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
    inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
    inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;

    payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;

    ---functions---
    
    payments.getSavedStarGift#b455a106 stargift:Vector<InputSavedStarGift> = payments.SavedStarGifts;

[payments.getSavedStarGift](/method/payments.getSavedStarGift.md) may be used to fetch info about specific gifts owned by a peer controlled by the currently logged in user.  

Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned to the profile).  

### Notifications for received channel gifts

    ---functions---

    payments.toggleChatStarGiftNotifications#60eaefa1 flags:# enabled:flags.0?true peer:InputPeer = Bool;

[payments.toggleChatStarGiftNotifications](/method/payments.toggleChatStarGiftNotifications.md) can be used to enable or disable the reception of notifications every time a [gift &raquo;](/api/gifts.md) is received by the specified channel: it can only be invoked by admins with `post_messages` [admin rights](/constructor/chatAdminRights.md).

The notifications will be received in the form of [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) and [messageActionStarGift](/constructor/messageActionStarGift.md) service messages from the channel.

### Pinning a received gift

    ---functions---

    payments.toggleStarGiftsPinnedToTop#1513e7b0 peer:InputPeer stargift:Vector<InputSavedStarGift> = Bool;

A received gift can be pinned on top of the profile of the user or owned channels by using [payments.toggleStarGiftsPinnedToTop](/method/payments.toggleStarGiftsPinnedToTop.md).

The maximum number of gifts that can be pinned to a profile is specified in the [stargifts_pinned_to_top_limit client configuration key &raquo;](/api/config.md#stargifts-pinned-to-top-limit).  

### Gift collections

    inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
    inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
    inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;

    starGiftCollection#9d6b13b0 flags:# collection_id:int title:string icon:flags.0?Document gifts_count:int hash:long = StarGiftCollection;

    payments.starGiftCollectionsNotModified#a0ba4f17 = payments.StarGiftCollections;
    payments.starGiftCollections#8a2932f3 collections:Vector<StarGiftCollection> = payments.StarGiftCollections;

    ---functions---
    
    payments.createStarGiftCollection#1f4a0e87 peer:InputPeer title:string stargift:Vector<InputSavedStarGift> = StarGiftCollection;
    payments.getStarGiftCollections#981b91dd peer:InputPeer hash:long = payments.StarGiftCollections;
    payments.updateStarGiftCollection#4fddbee7 flags:# peer:InputPeer collection_id:int title:flags.0?string delete_stargift:flags.1?Vector<InputSavedStarGift> add_stargift:flags.2?Vector<InputSavedStarGift> order:flags.3?Vector<InputSavedStarGift> = StarGiftCollection;
    payments.reorderStarGiftCollections#c32af4cc peer:InputPeer order:Vector<int> = Bool;
    payments.deleteStarGiftCollection#ad5648e8 peer:InputPeer collection_id:int = Bool;

    payments.getSavedStarGifts#a319e569 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_unique:flags.4?true sort_by_value:flags.5?true exclude_upgradable:flags.7?true exclude_unupgradable:flags.8?true peer_color_available:flags.9?true exclude_hosted:flags.10?true peer:InputPeer collection_id:flags.6?int offset:string limit:int = payments.SavedStarGifts;

Gift collections group together multiple owned or [hosted collectible gifts &raquo;](#hosted-collectible-gifts); each gift may be part of one or more collections.  

Use [payments.createStarGiftCollection](/method/payments.createStarGiftCollection.md) to create a collection.  

Use [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) with the `collection_id` flag set to fetch gifts within a collection.  

Use [payments.getStarGiftCollections](/method/payments.getStarGiftCollections.md) to list all star gift collections of a given peer.  

**Note**: the `hash` parameter of [payments.getStarGiftCollections](/method/payments.getStarGiftCollections.md) is generated by passing the [starGiftCollection](/constructor/starGiftCollection.md).`hash` field (**not** the `collection_id` field) of all previously returned collections, to avoid returning any results if the available collections and their content hasn't changed.  

Use [payments.updateStarGiftCollection](/method/payments.updateStarGiftCollection.md) to add, remove or reorder gifts in the collection or rename the collection.  

Use [payments.reorderStarGiftCollections](/method/payments.reorderStarGiftCollections.md) to reorder the collections on an owned peer's profile.  

Use [payments.deleteStarGiftCollection](/method/payments.deleteStarGiftCollection.md) to delete a gift collection.  

A profile can contain a maximum of [stargifts_collections_limit &raquo;](/api/config.md#stargifts-collections-limit) gift collections, each containing a maximum of [stargifts_collection_gifts_limit](/api/config.md#stargifts-collection-gifts-limit) gifts.  

[Gift collection deep links &raquo;](/api/links.md#gift-collection-links) can be used to share a gift collection.  

### Collectible gifts

A [received gift](#sending-gifts) may be upgraded to a [collectible gift](https://telegram.org/blog/collectible-gifts-and-more#collectible-gifts).  

Collectible gifts have **special attributes** and can be **transferred** to other users or **auctioned** on NFT marketplaces.  

When you upgrade a gift it unlocks a **new appearance** from dozens of **custom variations** made by Telegram artists. Collectibles also receive a random set of **secondary attributes**, including a background color, icon and number. This means every collectible gift is a **unique work of art** — and that some will be **more rare** than others.  

#### Upgrade a gift to a collectible gift

    messageActionStarGift#ea2c31d3 flags:# name_hidden:flags.0?true saved:flags.2?true converted:flags.3?true upgraded:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true prepaid_upgrade:flags.13?true upgrade_separate:flags.16?true auction_acquired:flags.17?true gift:StarGift message:flags.1?TextWithEntities convert_stars:flags.4?long upgrade_msg_id:flags.5?int upgrade_stars:flags.8?long from_id:flags.11?Peer peer:flags.12?Peer saved_id:flags.12?long prepaid_upgrade_hash:flags.14?string gift_msg_id:flags.15?int to_id:flags.18?Peer gift_num:flags.19?int = MessageAction;
    savedStarGift#41df43fc flags:# name_hidden:flags.0?true unsaved:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true pinned_to_top:flags.12?true upgrade_separate:flags.17?true from_id:flags.1?Peer date:int gift:StarGift message:flags.2?TextWithEntities msg_id:flags.3?int saved_id:flags.11?long convert_stars:flags.4?long upgrade_stars:flags.6?long can_export_at:flags.7?int transfer_stars:flags.8?long can_transfer_at:flags.13?int can_resell_at:flags.14?int collection_id:flags.15?Vector<int> prepaid_upgrade_hash:flags.16?string drop_original_details_stars:flags.18?long gift_num:flags.19?int can_craft_at:flags.20?int = SavedStarGift;

    starGift#313a9547 flags:# limited:flags.0?true sold_out:flags.1?true birthday:flags.2?true require_premium:flags.7?true limited_per_user:flags.8?true peer_color_available:flags.10?true auction:flags.11?true id:long sticker:Document stars:long availability_remains:flags.0?int availability_total:flags.0?int availability_resale:flags.4?long convert_stars:long first_sale_date:flags.1?int last_sale_date:flags.1?int upgrade_stars:flags.3?long resell_min_stars:flags.4?long title:flags.5?string released_by:flags.6?Peer per_user_total:flags.8?int per_user_remains:flags.8?int locked_until_date:flags.9?int auction_slug:flags.11?string gifts_per_round:flags.11?int auction_start_date:flags.11?int upgrade_variants:flags.12?int background:flags.13?StarGiftBackground = StarGift;

    starGiftAttributeRarity#36437737 permille:int = StarGiftAttributeRarity;
    starGiftAttributeRarityUncommon#dbce6389 = StarGiftAttributeRarity;
    starGiftAttributeRarityRare#f08d516b = StarGiftAttributeRarity;
    starGiftAttributeRarityEpic#78fbf3a8 = StarGiftAttributeRarity;
    starGiftAttributeRarityLegendary#cef7e7a8 = StarGiftAttributeRarity;

    starGiftAttributeModel#565251e2 flags:# crafted:flags.0?true name:string document:Document rarity:StarGiftAttributeRarity = StarGiftAttribute;
    starGiftAttributePattern#4e7085ea name:string document:Document rarity:StarGiftAttributeRarity = StarGiftAttribute;
    starGiftAttributeBackdrop#9f2504e4 name:string backdrop_id:int center_color:int edge_color:int pattern_color:int text_color:int rarity:StarGiftAttributeRarity = StarGiftAttribute;
    starGiftAttributeOriginalDetails#e0bff26c flags:# sender_id:flags.0?Peer recipient_id:Peer date:int message:flags.1?TextWithEntities = StarGiftAttribute;
    
    starGiftBackground#aff56398 center_color:int edge_color:int text_color:int = StarGiftBackground;

    starGiftUpgradePrice#99ea331d date:int upgrade_stars:long = StarGiftUpgradePrice;

    payments.starGiftUpgradePreview#3de1dfed sample_attributes:Vector<StarGiftAttribute> prices:Vector<StarGiftUpgradePrice> next_prices:Vector<StarGiftUpgradePrice> = payments.StarGiftUpgradePreview;

    payments.starGiftUpgradeAttributes#46c6e36f attributes:Vector<StarGiftAttribute> = payments.StarGiftUpgradeAttributes;

    inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
    inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
    inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;

    ---functions---
    
    payments.getStarGiftUpgradePreview#9c9abcb1 gift_id:long = payments.StarGiftUpgradePreview;
    payments.getStarGiftUpgradeAttributes#6d038b58 gift_id:long = payments.StarGiftUpgradeAttributes;
    payments.upgradeStarGift#aed6e4f5 flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = Updates;

A received gift can be upgraded to a collectible gift if the [messageActionStarGift](/constructor/messageActionStarGift.md)/[savedStarGift](/constructor/savedStarGift.md).`can_upgrade` flag is set.

To obtain a preview of the future upgrade prices and possible **attributes** (chosen randomly) the gift can receive after the upgrade, invoke [payments.getStarGiftUpgradePreview](/method/payments.getStarGiftUpgradePreview.md).  

#### Listing all possible collectible variants

To obtain the **full** list of just the collectible attributes that may appear for that gift type, invoke [payments.getStarGiftUpgradeAttributes](/method/payments.getStarGiftUpgradeAttributes.md) with `gift_id` equal to [starGift](/constructor/starGift.md).`id`.  

[payments.getStarGiftUpgradeAttributes](/method/payments.getStarGiftUpgradeAttributes.md) returns all possible [starGiftAttributeModel](/constructor/starGiftAttributeModel.md), [starGiftAttributePattern](/constructor/starGiftAttributePattern.md) and [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md) constructors that may be assigned when gifts of that type are turned into [collectible gifts »](#collectible-gifts).  

Each attribute has a [StarGiftAttributeRarity](/type/StarGiftAttributeRarity.md) constructor, which describes the chances of getting this attribute.  

The method also returns models with the [starGiftAttributeModel](/constructor/starGiftAttributeModel.md).`crafted` flag set: these are reserved for [crafting »](#crafting-collectible-gifts), and should be filtered out from regular upgrade previews. Conversely, crafting UIs should only show craft-only models.  

[starGift](/constructor/starGift.md).`upgrade_variants` contains the total number of collectible variants available for the gift type, and may be combined with a few sample [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) entries from [payments.getStarGiftUpgradeAttributes](/method/payments.getStarGiftUpgradeAttributes.md) to render preview UIs.

[starGift](/constructor/starGift.md).`background` contains the default background palette for that gift type, used when rendering gift cards and [auction &raquo;](#collectible-gift-auctions) previews before a specific collectible backdrop is chosen.  

If [starGift](/constructor/starGift.md).`peer_color_available` is set, collectible gifts of this type may also be used to generate a [message color palette and pattern »](/api/colors.md#collectible-message-palettes).

The current price of the upgrade is contained in [starGift](/constructor/starGift.md).`upgrade_stars`.  

[payments.starGiftUpgradePreview](/constructor/payments.starGiftUpgradePreview.md).`next_prices` contains the current upgrade price and a list of future prices, each associated to a UNIX timestamp that indicates when the price comes in effect (the current price is valid only until the next one comes into effect, and so on for all prices in the list).  

[payments.starGiftUpgradePreview](/constructor/payments.starGiftUpgradePreview.md).`prices` contains a similar list of upgrade prices and timestamps, not as granular as in `next_prices` (i.e. prices are approximately 1 month apart), to be used mainly to scale the price graph, and to show a more general future overview of the upgrade price.  

To upgrade a received gift, pay [starGift](/constructor/starGift.md).`upgrade_stars` [Telegram Stars](/api/stars.md) by invoking [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoiceStarGiftUpgrade](/constructor/inputInvoiceStarGiftUpgrade.md) with the following parameters:

* `stargift`: The identifier of the received gift
* `keep_original_details`: Set this flag to keep the original gift text, sender and receiver in the upgraded gift as a [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute.  
  This information can later be removed using [inputInvoiceStarGiftDropOriginalDetails](/constructor/inputInvoiceStarGiftDropOriginalDetails.md) as specified [here &raquo;](#dropping-the-original-details-of-an-upgraded-gift).  

Then, follow the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

If the original sender of the gift has already paid for the upgrade [as specified here &raquo;](#prepaying-for-someone-elses-upgrade) (signaled by specific flags listed [here &raquo;](#prepaying-for-someone-elses-upgrade)), simply invoke [payments.upgradeStarGift](/method/payments.upgradeStarGift.md) with the same flags instead of using the [payments.getPaymentForm](/method/payments.getPaymentForm.md) payment flow.  

Upgrading a gift will emit a [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md), containing info about the newly upgraded gift as a [starGiftUnique](/constructor/starGiftUnique.md) and some extra information.

##### Dropping the original details of an upgraded gift

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

    savedStarGift#41df43fc flags:# name_hidden:flags.0?true unsaved:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true pinned_to_top:flags.12?true upgrade_separate:flags.17?true from_id:flags.1?Peer date:int gift:StarGift message:flags.2?TextWithEntities msg_id:flags.3?int saved_id:flags.11?long convert_stars:flags.4?long upgrade_stars:flags.6?long can_export_at:flags.7?int transfer_stars:flags.8?long can_transfer_at:flags.13?int can_resell_at:flags.14?int collection_id:flags.15?Vector<int> prepaid_upgrade_hash:flags.16?string drop_original_details_stars:flags.18?long gift_num:flags.19?int can_craft_at:flags.20?int = SavedStarGift;

    inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
    inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
    inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;

    inputInvoiceStarGiftDropOriginalDetails#923d8d1 stargift:InputSavedStarGift = InputInvoice;

    starsTransaction#13659eb0 flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true gift:flags.10?true reaction:flags.11?true stargift_upgrade:flags.18?true business_transfer:flags.21?true stargift_resale:flags.22?true posts_search:flags.24?true stargift_prepaid_upgrade:flags.25?true stargift_drop_original_details:flags.26?true phonegroup_message:flags.27?true stargift_auction_bid:flags.28?true offer:flags.29?true id:string amount:StarsAmount date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> subscription_period:flags.12?int giveaway_post_id:flags.13?int stargift:flags.14?StarGift floodskip_number:flags.15?int starref_commission_permille:flags.16?int starref_peer:flags.17?Peer starref_amount:flags.17?StarsAmount paid_messages:flags.19?int premium_gift_months:flags.20?int ads_proceeds_from_date:flags.23?int ads_proceeds_to_date:flags.23?int = StarsTransaction;

When [upgrading a gift to a collectible gift &raquo;](#upgrade-a-gift-to-a-collectible-gift), if the `keep_original_details` flag is set, the upgraded gift will have a [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute containing the original gift text, sender and receiver.  

If the `drop_original_details_stars` flag of [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)/[savedStarGift](/constructor/savedStarGift.md) is set, this information can be removed by paying the amount of [stars](/api/stars.md) specified in `drop_original_details_stars` using [inputInvoiceStarGiftDropOriginalDetails](/constructor/inputInvoiceStarGiftDropOriginalDetails.md), passing it to the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product), along with an [InputSavedStarGift](/type/InputSavedStarGift.md) pointing to the owned gift.  

The resulting [transaction](/constructor/starsTransaction.md) will have the `stargift_drop_original_details` flag set.  

##### Prepaying for someone else's upgrade

    messageActionStarGift#ea2c31d3 flags:# name_hidden:flags.0?true saved:flags.2?true converted:flags.3?true upgraded:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true prepaid_upgrade:flags.13?true upgrade_separate:flags.16?true auction_acquired:flags.17?true gift:StarGift message:flags.1?TextWithEntities convert_stars:flags.4?long upgrade_msg_id:flags.5?int upgrade_stars:flags.8?long from_id:flags.11?Peer peer:flags.12?Peer saved_id:flags.12?long prepaid_upgrade_hash:flags.14?string gift_msg_id:flags.15?int to_id:flags.18?Peer gift_num:flags.19?int = MessageAction;

    inputInvoiceStarGiftPrepaidUpgrade#9a0b48b8 peer:InputPeer hash:string = InputInvoice;
    
    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

When sending a gift, the sender can pay for the upgrade by setting [inputInvoiceStarGift](/constructor/inputInvoiceStarGift.md).`include_upgrade` when buying the gift.  
The resulting [messageActionStarGift](/constructor/messageActionStarGift.md) will have the `prepaid_upgrade` flag set, and the associated [savedStarGift](/constructor/savedStarGift.md) **will** have the `upgrade_stars` flag set and populated with the amount paid.  

It's also possible to pay to upgrade someone else's gift (even if the currently logged in user did not send them that gift) after the fact, by using [inputInvoiceStarGiftPrepaidUpgrade](/constructor/inputInvoiceStarGiftPrepaidUpgrade.md), passing the peer where the gift was sent and the upgrade hash from [messageActionStarGift](/constructor/messageActionStarGift.md).`prepaid_upgrade_hash` or [savedStarGift](/constructor/savedStarGift.md).`prepaid_upgrade_hash`.  

Then, follow the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

Upon completion, a new [messageActionStarGift](/constructor/messageActionStarGift.md) will be emitted with the `upgrade_separate` flag set, and the `gift_msg_id` flag populated with the ID of the [messageActionStarGift](/constructor/messageActionStarGift.md) with the upgraded gift only valid for the receiver of the message.   

#### Sharing and getting info about a collectible gift
    
    starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;

    payments.uniqueStarGift#416c56e8 gift:StarGift chats:Vector<Chat> users:Vector<User> = payments.UniqueStarGift;

    payments.uniqueStarGiftValueInfo#512fe446 flags:# last_sale_on_fragment:flags.1?true value_is_average:flags.6?true currency:string value:long initial_sale_date:int initial_sale_stars:long initial_sale_price:long last_sale_date:flags.0?int last_sale_price:flags.0?long floor_price:flags.2?long average_price:flags.3?long listed_count:flags.4?int fragment_listed_count:flags.5?int fragment_listed_url:flags.5?string = payments.UniqueStarGiftValueInfo;

    ---functions---

    payments.getUniqueStarGift#a1974d72 slug:string = payments.UniqueStarGift;
    payments.getUniqueStarGiftValueInfo#4365af6b slug:string = payments.UniqueStarGiftValueInfo;

Info about a unique gift may be shared by creating a [collectible gift link &raquo;](/api/links.md#collectible-gift-link) using the slug in [starGiftUnique](/constructor/starGiftUnique.md).`slug`.  

When parsing a received collectible gift link, invoke [payments.getUniqueStarGift](/method/payments.getUniqueStarGift.md) to obtain info about the gift.  

The slug is also used when buying a gift currently on [resale &raquo;](#reselling-collectible-gifts).  

The slug of an **owned or hosted** collectible gift may also be used in any place in the API where an [InputSavedStarGift](/type/InputSavedStarGift.md) is accepted, passing an [inputSavedStarGiftSlug](/constructor/inputSavedStarGiftSlug.md).  

[payments.getUniqueStarGiftValueInfo](/method/payments.getUniqueStarGiftValueInfo.md) may also be used to obtain info about the value of a collectible gift.  

#### Hosted collectible gifts

    starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

    ---functions---
    
    payments.getSavedStarGifts#a319e569 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_unique:flags.4?true sort_by_value:flags.5?true exclude_upgradable:flags.7?true exclude_unupgradable:flags.8?true peer_color_available:flags.9?true exclude_hosted:flags.10?true peer:InputPeer collection_id:flags.6?int offset:string limit:int = payments.SavedStarGifts;

A [collectible gift &raquo;](#collectible-gifts) located on the [TON blockchain &raquo;](#withdraw-a-collectible-gift-to-the-ton-blockchain) may be linked to a Telegram user or channel profile without transferring ownership to that peer. In this case, [starGiftUnique](/constructor/starGiftUnique.md).`host_id` contains the profile that hosts the gift, while ownership remains with the TON wallet in [starGiftUnique](/constructor/starGiftUnique.md).`owner_address`.  

The owner can [transfer &raquo;](#transferring-collectible-gifts), [resell &raquo;](#reselling-collectible-gifts) or [export &raquo;](#withdraw-a-collectible-gift-to-the-ton-blockchain) the gift. The owner or host can display or hide it on the hosted profile, add it to [gift collections &raquo;](#gift-collections), use it as an [emoji status &raquo;](#setting-a-collectible-gift-as-emoji-status), use it as a [message palette and pattern &raquo;](#setting-a-collectible-gift-as-message-palette-and-pattern), or use it as a [chat theme &raquo;](#setting-a-collectible-gift-as-chat-theme).  

When a gift is linked from the TON blockchain to a Telegram profile, the profile's [Saved Messages &raquo;](/api/saved-messages.md) receives a [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) service message with the `assigned` flag set.  

Use [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) with `exclude_hosted` to hide gifts whose `host_id` is equal to `peer`, returning only gifts owned or received by `peer`.  

#### Crafting collectible gifts

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

    savedStarGift#41df43fc flags:# name_hidden:flags.0?true unsaved:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true pinned_to_top:flags.12?true upgrade_separate:flags.17?true from_id:flags.1?Peer date:int gift:StarGift message:flags.2?TextWithEntities msg_id:flags.3?int saved_id:flags.11?long convert_stars:flags.4?long upgrade_stars:flags.6?long can_export_at:flags.7?int transfer_stars:flags.8?long can_transfer_at:flags.13?int can_resell_at:flags.14?int collection_id:flags.15?Vector<int> prepaid_upgrade_hash:flags.16?string drop_original_details_stars:flags.18?long gift_num:flags.19?int can_craft_at:flags.20?int = SavedStarGift;

    starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;

    updateStarGiftCraftFail#ac072444 = Update;

    ---functions---

    payments.getCraftStarGifts#fd05dd00 gift_id:long offset:string limit:int = payments.SavedStarGifts;
    payments.craftStarGift#b0f9684f stargift:Vector<InputSavedStarGift> = Updates;

1 to 4 owned collectible gifts of the same gift type (i.e. with the same [starGiftUnique](/constructor/starGiftUnique.md).`gift_id`) may be combined to craft a new collectible of the same underlying gift type.  

Gifts that can be used for crafting will have the [savedStarGift](/constructor/savedStarGift.md).`can_craft_at`/[messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md).`can_craft_at` flag set: if present, the gift only becomes craftable starting from the specified date.  

To obtain a list of owned gifts of the same type that can be used for crafting, invoke [payments.getCraftStarGifts](/method/payments.getCraftStarGifts.md) with `gift_id` equal to the first chosen [starGiftUnique](/constructor/starGiftUnique.md).`gift_id` (from [savedStarGift](/constructor/savedStarGift.md).`gift`/[messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md).`gift`).  

You may also use [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) with the `for_craft` flag set to [list collectible gifts of the same type currently on resale &raquo;](#reselling-collectible-gifts) that can be used for crafting (the [starGiftUnique](/constructor/starGiftUnique.md).`craft_chance_permille` success rate of each listed gift should also be rendered in this case).  

[payments.getStarGiftUpgradeAttributes](/method/payments.getStarGiftUpgradeAttributes.md) returns all possible [starGiftAttributeModel](/constructor/starGiftAttributeModel.md), [starGiftAttributePattern](/constructor/starGiftAttributePattern.md) and [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md) constructors that may be assigned when gifts of that type are turned into [collectible gifts »](#collectible-gifts).  

The method also returns models with the [starGiftAttributeModel](/constructor/starGiftAttributeModel.md).`crafted` flag set: these are reserved for [crafting »](#crafting-collectible-gifts), and should be filtered out from regular upgrade previews. Conversely, crafting UIs should only show craft-only models.  

To start crafting, invoke [payments.craftStarGift](/method/payments.craftStarGift.md) with 1 to 4 [InputSavedStarGift](/type/InputSavedStarGift.md) references pointing to gifts of the same type.

Crafting has a specific success rate, expressed as a percentage in the UI, and as a permilleage in the API.  

The success rate is computed by adding the [starGiftUnique](/constructor/starGiftUnique.md).`craft_chance_permille` fields of all passed gifts, so passing more gifts to crafting methods increases the chances of a successful craft.  

To display the summed `craft_chance_permille` in the UI, round it up by adding `5`, then divide by `10` to obtain a percentage.  

When showing the attribute preview for the crafting UI, use the [`stargifts_craft_attribute_permilles` client configuration value &raquo;](/api/config.md#stargifts-craft-attribute-permilles) to display the probability that an attribute from the input gifts will persist in the crafted gift.  

This is an array of 4 arrays of integers: the subarray with index N has N+1 integers, each containing a probability in permille.  

First, select the subarray corresponding to the number of chosen gifts for crafting (index equal to `count(craft_input_gifts)-1`):

```
attr_probability := stargifts_craft_attribute_permilles[count(craft_input_gifts)-1]
```

Then, for each gift in `craft_input_gifts`, group together into `grouped_attrs`:

- pattern attributes with the same pattern document ID.  
- backdrop attributes with the same `backdrop_id`

```
grouped_attr_patterns := Map<long, Vector<starGiftAttributePattern>>
grouped_attr_backdrop := Map<int, Vector<starGiftAttributeBackdrop>>

for gift := range craft_input_gifts {
    for attr := range gift.attributes {
        if cons(attr) == starGiftAttributePattern {
            grouped_attr_patterns[attr.document.id].append(attr)
        } else if cons(attr) == starGiftAttributeBackdrop {
            grouped_attr_backdrop[attr.backdrop_id].append(attr)
        }
    }
}
```

For each grouped attribute, the permille probability of obtaining that specific attribute in the crafted gift is equal to `attr_probability[count(grouped_attrs)-1]`:  

```
grouped_attr_pattern_probabilities := Map<long, int>
grouped_attr_backdrop_probabilities := Map<int, int>

for idx, grouped_attrs := range grouped_attr_patterns {
    probability := attr_probability[count(grouped_attrs)-1]

    grouped_attr_pattern_probabilities[idx] = probability
}

for idx, grouped_attrs := range grouped_attr_backdrop {
    probability := attr_probability[count(grouped_attrs)-1]

    grouped_attr_backdrop_probabilities[idx] = probability
}
```

For example, if we're passing three gifts to crafting, and the selected gifts use a green backdrop two times and a black backdrop once, and the third row of `stargifts_craft_attribute_permilles` is `[60, 180, 450]`, the green backdrop has an 18% persistence probability and the black one has a 6% persistence probability.  

For both patterns and backdrops, UI should display either the attribute with the highest probability or cycle through the selected attributes every few seconds.  

Regardless of the outcome of crafting (except for cases where crafting fails for other reasons, like passing gifts of different types, non-craftable gifts or not yet craftable gifts according to `can_craft_at`, or other reasons that make any of the passed gifts unusable for crafting), all gifts passed to [payments.craftStarGift](/method/payments.craftStarGift.md) will be burned (destroyed): the [starGiftUnique](/constructor/starGiftUnique.md).`burned` attribute will be set, and the gift won't be usable anymore.  

If crafting succeeds, a [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) gift will be emitted with the `craft` flag set (the corresponding [starGiftUnique](/constructor/starGiftUnique.md) will also have the `crafted` flag set), and the first gift's `id` will be reused for the newly crafted gift (so the first passed gift must **not** be [located on the TON blockchain](#withdraw-a-collectible-gift-to-the-ton-blockchain)).  

If crafting fails, an [updateStarGiftCraftFail](/constructor/updateStarGiftCraftFail.md) will be emitted by the method call.  

#### Collectible gift auctions

To guarantee fair distribution of collectible gifts, new gift releases will be based on **auctions** — allowing users to place bids with Stars for new gifts over several rounds, see [here &raquo;](/api/auctions.md) for more info. 

#### Reselling collectible gifts

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

    inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
    inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
    inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;
    
    payments.resaleStarGifts#947a12df flags:# count:int gifts:Vector<StarGift> next_offset:flags.0?string attributes:flags.1?Vector<StarGiftAttribute> attributes_hash:flags.1?long chats:Vector<Chat> counters:flags.2?Vector<StarGiftAttributeCounter> users:Vector<User> = payments.ResaleStarGifts;

    ---functions---

    payments.updateStarGiftPrice#edbe6ccb stargift:InputSavedStarGift resell_amount:StarsAmount = Updates;

    payments.getResaleStarGifts#7a5fa236 flags:# sort_by_price:flags.1?true sort_by_num:flags.2?true for_craft:flags.4?true stars_only:flags.5?true attributes_hash:flags.0?long gift_id:long attributes:flags.3?Vector<StarGiftAttributeId> offset:string limit:int = payments.ResaleStarGifts;

An owned [collectible gift &raquo;](#collectible-gifts) can be put up for sale on the [gift marketplace &raquo;](https://telegram.org/blog/gift-marketplace-and-more) by using [payments.updateStarGiftPrice](/method/payments.updateStarGiftPrice.md), specifying the price in `resell_stars`.  

Note that if the [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)/[savedStarGift](/constructor/savedStarGift.md).`can_resell_at` flag is set, the gift can be put up for sale only starting from the specified date.  

The minimum and maximum resale prices are specified in the [stars_stargift_resale_amount_min &raquo;](/api/config.md#stars-stargift-resale-amount-min)/[stars_stargift_resale_amount_max &raquo;](/api/config.md#stars-stargift-resale-amount-max) client configuration parameters; passing `0` will unlist the gift from the marketplace.  
If someone buys the gift, you will get `price*`[stars_stargift_resale_commission_permille &raquo;](/api/config.md#stars-stargift-resale-commission-permille) `/1000` stars.  

When specifying the price in nanograms, the minimum and maximum resale prices are specified in the [ton_stargift_resale_amount_min &raquo;](/api/config.md#ton-stargift-resale-amount-min)/[ton_stargift_resale_amount_max &raquo;](/api/config.md#ton-stargift-resale-amount-max) client configuration parameters; passing `0` will unlist the gift from the marketplace.

If someone buys the gift, you will get `price*`[ton_stargift_resale_commission_permille &raquo;](/api/config.md#ton-stargift-resale-commission-permille) `/1000` nanograms.

Use [payments.getStarGifts](/method/payments.getStarGifts.md) to obtain the full list of available [starGifts](/constructor/starGift.md); this method may return some sold-out gifts that have the `availability_resale` flag set, which indicates that some gifts of this type are on [resale &raquo;](#reselling-collectible-gifts), use [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) to fetch them.  

See [here &raquo;](/api/gifts.md#sending-gifts) for detailed documentation on the [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) method.  

To buy a gift on resale, follow the usual [payment flow &raquo;](#collectible-gifts), passing an [inputInvoiceStarGiftResale](/constructor/inputInvoiceStarGiftResale.md).  

#### Collectible gift purchase offers

    starsAmount#bbb6b4a3 amount:long nanos:int = StarsAmount;
    starsTonAmount#74aee3e0 amount:long = StarsAmount;

    starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;

    messageActionStarGiftPurchaseOffer#774278d4 flags:# accepted:flags.0?true declined:flags.1?true gift:StarGift price:StarsAmount expires_at:int = MessageAction;

    messageActionStarGiftPurchaseOfferDeclined#73ada76b flags:# expired:flags.0?true gift:StarGift price:StarsAmount = MessageAction;

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

    starsTransaction#13659eb0 flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true gift:flags.10?true reaction:flags.11?true stargift_upgrade:flags.18?true business_transfer:flags.21?true stargift_resale:flags.22?true posts_search:flags.24?true stargift_prepaid_upgrade:flags.25?true stargift_drop_original_details:flags.26?true phonegroup_message:flags.27?true stargift_auction_bid:flags.28?true offer:flags.29?true id:string amount:StarsAmount date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> subscription_period:flags.12?int giveaway_post_id:flags.13?int stargift:flags.14?StarGift floodskip_number:flags.15?int starref_commission_permille:flags.16?int starref_peer:flags.17?Peer starref_amount:flags.17?StarsAmount paid_messages:flags.19?int premium_gift_months:flags.20?int ads_proceeds_from_date:flags.23?int ads_proceeds_to_date:flags.23?int = StarsTransaction;

    ---functions---

    payments.sendStarGiftOffer#8fb86b41 flags:# peer:InputPeer slug:string price:StarsAmount duration:int random_id:long allow_paid_stars:flags.0?long = Updates;

    payments.resolveStarGiftOffer#e9ce781c flags:# decline:flags.0?true offer_msg_id:int = Updates;

When viewing a collectible gift on a user's [profile &raquo;](/api/profile.md), you can now **make an offer** to buy the gift with Stars or TON.

Gift offers are **protected by Telegram** and allow for a **convenient** and **secure way** to make direct sales in Telegram — keeping both **buyers** and **gift owners** safe from scams.  

You can make an offer to buy a gift if the [starGiftUnique](/constructor/starGiftUnique.md).`offer_min_stars` flag if set.  

When specifying the price in [Stars](/api/stars.md):

- The minimum offer price is specified in the [starGiftUnique](/constructor/starGiftUnique.md).`offer_min_stars` flag
- The maximum offer price is specified in the [stars_stargift_resale_amount_max &raquo;](/api/config.md#stars-stargift-resale-amount-max) client configuration parameter.  
- If the offer is accepted, you will get `price*`[stars_stargift_resale_commission_permille &raquo;](/api/config.md#stars-stargift-resale-commission-permille) `/1000` stars.  

When specifying the price in nanograms:

- The minimum offer price is specified in [starGiftUnique](/constructor/starGiftUnique.md).`offer_min_stars` flag, converted to USD using the conversion rate in [stars_usd_sell_rate_x1000](/api/config.md#stars-usd-sell-rate-x1000), then to TON using the conversion rate in [ton_usd_rate](/api/config.md#ton-usd-rate), then to nanograms by multiplying the obtained value by 1 million (1 ton = 1 billion nanograms, but since `stars_usd_sell_rate_x1000` already multiplied the value by 1000, we just need to multiply by 1 million).
- The maximum offer price is specified in the [ton_stargift_resale_amount_max &raquo;](/api/config.md#ton-stargift-resale-amount-max) client configuration parameter.  
- If the offer is accepted, you will get `price*`[ton_stargift_resale_commission_permille &raquo;](/api/config.md#ton-stargift-resale-commission-permille) `/1000` nanograms.

To make an offer, invoke [payments.sendStarGiftOffer](/method/payments.sendStarGiftOffer.md), passing the following params:
- `peer`: equal to [starGiftUnique](/constructor/starGiftUnique.md).`owner_id` (`owner_id` will always be set if [starGiftUnique](/constructor/starGiftUnique.md).`offer_min_stars` is set)
- `slug`: equal to [starGiftUnique](/constructor/starGiftUnique.md).`slug`
- `price`: the offer price
- `duration`: duration of the offer, in seconds; must be one of 21600, 43200, 86400, 129600, 172800, or 259200. Can also be 120 in testmode.
- `random_id`: A random 64-bit integer, used to avoid sending the same offer twice in case of network issues.  
- `allow_paid_stars`: If the destination peer has [paid messages »](/api/paid-messages.md) enabled, specifies the amount of [Telegram Stars](/api/stars.md) the sending user has agreed to pay in order to send the offer (in addition to the amount for the offer itself, contained in `price`).

This will emit a [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md) service message, reserving the specified amount of stars for the duration of the offer. If the offer is rejected or expires, your full payment is instantly refunded.  

Clients rendering the [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md) should show how close the offer amount is to its estimated value contained in [starGiftUnique](/constructor/starGiftUnique.md).`value_usd_amount`; star/ton prices can be converted to USD using [stars_usd_sell_rate_x1000](/api/config.md#stars-usd-sell-rate-x1000) and [ton_usd_rate](/api/config.md#ton-usd-rate).  

The receiver of the offer may accept or reject the offer using [payments.resolveStarGiftOffer](/method/payments.resolveStarGiftOffer.md), passing the ID of the [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md) service message and populating the `decline` flag according to the user's choice.  

If the offer is declined or if it expires, a [messageActionStarGiftPurchaseOfferDeclined](/constructor/messageActionStarGiftPurchaseOfferDeclined.md) is emitted, and a refund is issued automatically.  

If the offer is accepted, the gift is automatically transferred to the buyer and a [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) with the `from_offer` flag set is emitted.  

All transactions related to gift offers, including the initial transaction reserving the needed amount of stars and eventual refund transactions will have the [starsTransaction](/constructor/starsTransaction.md).`offer` flag set.  

#### Transferring collectible gifts

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;
    
    starGiftUnique#85f0a9cd flags:# require_premium:flags.6?true resale_ton_only:flags.7?true theme_available:flags.9?true burned:flags.14?true crafted:flags.15?true id:long gift_id:long title:string slug:string num:int owner_id:flags.0?Peer owner_name:flags.1?string owner_address:flags.2?string attributes:Vector<StarGiftAttribute> availability_issued:int availability_total:int gift_address:flags.3?string resell_amount:flags.4?Vector<StarsAmount> released_by:flags.5?Peer value_amount:flags.8?long value_currency:flags.8?string value_usd_amount:flags.8?long theme_peer:flags.10?Peer peer_color:flags.11?PeerColor host_id:flags.12?Peer offer_min_stars:flags.13?int craft_chance_permille:flags.16?int = StarGift;

    inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
    inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
    inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;

    inputInvoiceStarGiftTransfer#4a5f5bd9 stargift:InputSavedStarGift to_id:InputPeer = InputInvoice;

    ---functions---

    payments.transferStarGift#7f18176a stargift:InputSavedStarGift to_id:InputPeer = Updates;

A collectible gift may be transferred to another user.

To transfer a collectible gift, pay [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)/[savedStarGift](/constructor/savedStarGift.md).`transfer_stars` [Telegram Stars](/api/stars.md) by invoking [payments.getPaymentForm](/method/payments.getPaymentForm.md), passing an [inputInvoiceStarGiftTransfer](/constructor/inputInvoiceStarGiftTransfer.md) with the following parameters:

* `stargift`: The identifier of the received gift
* `to_id`: The destination peer

Then, follow the [usual payment flow &raquo;](/api/payments.md#22-getting-invoice-info-about-the-product).  

If [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)/[savedStarGift](/constructor/savedStarGift.md).`transfer_stars` is not set, the gift may be transferred for free: in this case, simply invoke [payments.transferStarGift](/method/payments.transferStarGift.md).  

#### Withdraw a collectible gift to the TON blockchain

    messageActionStarGiftUnique#e6c31522 flags:# upgrade:flags.0?true transferred:flags.1?true saved:flags.2?true refunded:flags.5?true prepaid_upgrade:flags.11?true assigned:flags.13?true from_offer:flags.14?true craft:flags.16?true gift:StarGift can_export_at:flags.3?int transfer_stars:flags.4?long from_id:flags.6?Peer peer:flags.7?Peer saved_id:flags.7?long resale_amount:flags.8?StarsAmount can_transfer_at:flags.9?int can_resell_at:flags.10?int drop_original_details_stars:flags.12?long can_craft_at:flags.15?int = MessageAction;

    savedStarGift#41df43fc flags:# name_hidden:flags.0?true unsaved:flags.5?true refunded:flags.9?true can_upgrade:flags.10?true pinned_to_top:flags.12?true upgrade_separate:flags.17?true from_id:flags.1?Peer date:int gift:StarGift message:flags.2?TextWithEntities msg_id:flags.3?int saved_id:flags.11?long convert_stars:flags.4?long upgrade_stars:flags.6?long can_export_at:flags.7?int transfer_stars:flags.8?long can_transfer_at:flags.13?int can_resell_at:flags.14?int collection_id:flags.15?Vector<int> prepaid_upgrade_hash:flags.16?string drop_original_details_stars:flags.18?long gift_num:flags.19?int can_craft_at:flags.20?int = SavedStarGift;

    payments.starGiftWithdrawalUrl#84aa3a9c url:string = payments.StarGiftWithdrawalUrl;

    ---functions---

    payments.getStarGiftWithdrawalUrl#d06e93a8 stargift:InputSavedStarGift password:InputCheckPasswordSRP = payments.StarGiftWithdrawalUrl;

A collectible gift can be converted to an NFT on the TON blockchain by using [payments.getStarGiftWithdrawalUrl](/method/payments.getStarGiftWithdrawalUrl.md): the method requires the current user's 2FA password, passed as [specified here &raquo;](/api/srp.md), and it returns a URL that can be used to import the NFT on Fragment.

Note that if the [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)/[savedStarGift](/constructor/savedStarGift.md).`can_export_at` flag is set, the gift can be exported to the blockchain only starting from the specified date.  

#### Setting a collectible gift as emoji status

[Owned or hosted collectible gifts &raquo;](#hosted-collectible-gifts) may be set as emoji statuses (also updating the [profile's backdrop palette and pattern &raquo;](/api/colors.md)): see [here &raquo;](/api/emoji-status.md#collectibles-as-emoji-statuses) for more info on the full flow.

#### Setting a collectible gift as message palette and pattern

[Owned or hosted collectible gifts &raquo;](#hosted-collectible-gifts) may be used to generate a [message color palette and pattern &raquo;](/api/colors.md#collectible-message-palettes): see [here &raquo;](/api/colors.md#collectible-message-palettes) for more info on the full flow.

#### Setting a collectible gift as chat theme

Some [owned or hosted collectible gifts &raquo;](#hosted-collectible-gifts) (those with the [starGiftUnique](/constructor/starGiftUnique.md).`theme_available` flag set) may be set as chat themes: see [here &raquo;](/api/themes.md#chat-themes) for more info on the full flow.

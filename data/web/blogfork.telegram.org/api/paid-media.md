# Paid media


Content creators can accept [Stars](/api/stars.md) by publishing **paid photos or videos** on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.  

Creators can then [withdraw Stars using the Gram cryptocurrency&nbsp;&raquo;](/api/stars.md#withdrawing-revenue), or use them to [advertise their channel](/api/stars.md#paying-for-ads) and get even more subscribers – all of this with next to **0 commission** from Telegram.

### Posting paid media

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    inputMediaPaidMedia#c4103386 flags:# stars_amount:long extended_media:Vector<InputMedia> payload:flags.0?string = InputMedia;

    ---functions---
    
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    
[Channel](/api/channel.md) administrators may forward or post paid media if the [channelFull](/constructor/channelFull.md).`paid_media_allowed` flag is set.  

To post paid media, use [messages.sendMedia](/method/messages.sendMedia.md), passing an [inputMediaPaidMedia](/constructor/inputMediaPaidMedia.md) constructor, containing:

- In `stars_amount`, the amount of [Telegram Stars](/api/stars.md) users must pay to obtain access to the media.  
  The maximum value that can be passed here is specified in the [stars_paid_post_amount_max client configuration value&nbsp;&raquo;](/api/config.md#stars-paid-post-amount-max).
- In `extended_media`, the actual media files (currently only photos and videos are supported).
  To send albums, do **not** use [messages.sendMultiMedia](/method/messages.sendMultiMedia.md), but rather pass all the medias in the `extended_media` array.  

### Viewing paid media

    messageExtendedMediaPreview#ad628cc8 flags:# w:flags.0?int h:flags.0?int thumb:flags.1?PhotoSize video_duration:flags.2?int = MessageExtendedMedia;
    messageExtendedMedia#ee479c64 media:MessageMedia = MessageExtendedMedia;

    messageMediaPaidMedia#a8852491 stars_amount:long extended_media:Vector<MessageExtendedMedia> = MessageMedia;
    
    inputInvoiceMessage#c5b56859 peer:InputPeer msg_id:int = InputInvoice;

    updateMessageExtendedMedia#d5a41724 peer:Peer msg_id:int extended_media:Vector<MessageExtendedMedia> = Update;
    updateBotPurchasedPaidMedia#283bd312 user_id:long payload:string qts:int = Update;

    starsTransaction#13659eb0 flags:# refund:flags.3?true pending:flags.4?true failed:flags.6?true gift:flags.10?true reaction:flags.11?true stargift_upgrade:flags.18?true business_transfer:flags.21?true stargift_resale:flags.22?true posts_search:flags.24?true stargift_prepaid_upgrade:flags.25?true stargift_drop_original_details:flags.26?true phonegroup_message:flags.27?true stargift_auction_bid:flags.28?true offer:flags.29?true id:string amount:StarsAmount date:int peer:StarsTransactionPeer title:flags.0?string description:flags.1?string photo:flags.2?WebDocument transaction_date:flags.5?int transaction_url:flags.5?string bot_payload:flags.7?bytes msg_id:flags.8?int extended_media:flags.9?Vector<MessageMedia> subscription_period:flags.12?int giveaway_post_id:flags.13?int stargift:flags.14?StarGift floodskip_number:flags.15?int starref_commission_permille:flags.16?int starref_peer:flags.17?Peer starref_amount:flags.17?StarsAmount paid_messages:flags.19?int premium_gift_months:flags.20?int ads_proceeds_from_date:flags.23?int ads_proceeds_to_date:flags.23?int = StarsTransaction;

    ---functions---
    
    messages.getExtendedMedia#84f80814 peer:InputPeer id:Vector<int> = Updates;

Paid media is represented by a [messageMediaPaidMedia](/constructor/messageMediaPaidMedia.md) constructor, containing:

- In `stars_amount`, the price of the media in [Telegram Stars](/api/stars.md)
- In `extended_media`, a vector of [MessageExtendedMedia](/type/MessageExtendedMedia.md) constructors, which will **all** be either:
  - [messageExtendedMediaPreview](/constructor/messageExtendedMediaPreview.md), for media the current user hasn't bought yet, **optionally** contains basic info about the media (width, height, [extremely low resolution thumbnail](/api/files.md#stripped-thumbnails), video duration for videos).  
  - [messageExtendedMedia](/constructor/messageExtendedMedia.md), for media the current user has already purchased, containing the actual [messageMediaPhoto](/constructor/messageMediaPhoto.md)/[messageMediaDocument](/constructor/messageMediaDocument.md) (video) that can be downloaded and viewed [as usual&nbsp;&raquo;](/api/files.md).  

To purchase paid media, follow the [usual payment flow&nbsp;&raquo;](/api/payments.md#22-getting-invoice-info-about-the-product), passing an [inputInvoiceMessage](/constructor/inputInvoiceMessage.md) with the peer and message ID of the paid media.  

Once the payment succeeds, an [updateMessageExtendedMedia](/constructor/updateMessageExtendedMedia.md) will be emitted, replacing the [messageExtendedMediaPreview](/constructor/messageExtendedMediaPreview.md) constructors associated with the message with [messageExtendedMedia](/constructor/messageExtendedMedia.md) constructors.  
If the media was posted by a bot, it will also receive an [updateBotPurchasedPaidMedia](/constructor/updateBotPurchasedPaidMedia.md).  
No other updates will be emitted (i.e. **no** [updateEditChannelMessage](/constructor/updateEditChannelMessage.md) updates will be emitted for the message containing the paid media, even if re-fetching the same messages through other means like [messages.getHistory](/method/messages.getHistory.md) *will* return the revealed [messageExtendedMedia](/constructor/messageExtendedMedia.md) constructors).

The associated [starsTransaction](/constructor/starsTransaction.md) that will be generated will be of type [starsTransactionPeer](/constructor/starsTransactionPeer.md) (with `peer` equal to the channel), `msg_id` equal to the message ID of the paid media and `extended_media` set to the revealed paid media.  

**Note**: the [updateMessageExtendedMedia](/constructor/updateMessageExtendedMedia.md) update does not have a `pts`/`qts` field.  
This means that this update can only be received passively via the socket ([see here&nbsp;&raquo;](/api/updates.md#event-sequences)), and it **cannot** be returned by [updates.getDifference](/method/updates.getDifference.md) or [updates.getChannelDifference](/method/updates.getChannelDifference.md).  
This implies that if a certain client is offline, and another session purchases a paid media, the first client will not receive the revealed [messageExtendedMedia](/constructor/messageExtendedMedia.md) constructors when it reconnects to the server, and it would have no way to know that a cached paid media can be revealed to the user.  

To bypass this issue, if:

* One or more messages containing not-yet-bought paid media are visible to the user.
* From the messages selected above, include only messages received *before* the client last went offline (i.e. exclude paid media messages that were received and cached via updates or getHistory/getMessages/etc N seconds ago, and the client connected to the server M >= N seconds ago).
* From the messages selected above, include only messages for which [messages.getExtendedMedia](/method/messages.getExtendedMedia.md) was called more than 15 seconds ago.  
* For all messages satisfying the above conditions, make a single query to [messages.getExtendedMedia](/method/messages.getExtendedMedia.md), aggregating matching message IDs in `id`.  
  The method will return an array of [updateMessageExtendedMedia](/constructor/updateMessageExtendedMedia.md) updates, only for passed messages containing **already bought** paid media.  
  No information will be returned for passed messages containing not yet bought paid media, or not containing paid media.  
  
  Repeat the method call every 15 seconds if at least one of the messages satisfying the above conditions is still visible.  
  Repeat the method call immediately if a new paid message satisfying the above conditions scrolls into view.  

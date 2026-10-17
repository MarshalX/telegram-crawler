# Channel and bot ad revenue


Telegram has one of the **most generous reward systems** in the history of social media. Telegram channel and bot owners can now receive **50%** of the revenue from ads displayed in their channels and bots.

This page describes the methods used to withdraw channel and bot ad revenue, as well as view detailed revenue stats.  

See [here&nbsp;&raquo;](/api/sponsored-messages.md) for more info on how to display the ads in the client UI.  

### Balance and transaction history

See [here &raquo;](/api/stars.md#balance-and-transaction-history) for more info on how to fetch the channel/bot ad revenue transaction history.  

### Revenue statistics 

See [here &raquo;](/api/stars.md#revenue-statistics) for more info on how to fetch the channel/bot ad revenue statistics.  

### Withdrawing revenue

See [here &raquo;](/api/stars.md#withdrawing-revenue) for more info on how to withdraw channel/bot ad revenue.  

#### Disable ads on the channel

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---
    
    channels.restrictSponsoredMessages#9ae91519 channel:InputChannel restricted:Bool = Updates;

After reaching at least the boost level specified in the [`channel_restrict_sponsored_level_min`&nbsp;&raquo;](/api/config.md#channel-restrict-sponsored-level-min) config parameter, channel owners may disable ads on the channel for all users using [channels.restrictSponsoredMessages](/method/channels.restrictSponsoredMessages.md).  

If ads are disabled on the channel, the [channelFull](/constructor/channelFull.md).`restricted_sponsored` flag will be set (owners only).  
# Channel and supergroup boosts


[Telegram Premium](/api/premium.md) users can grant their favorite channels and supergroups additional features like the ability to post [stories](/api/stories.md) by giving them **boosts**.  

Channels and supergroups level up as they gain more boosts – and for each level, they gain additional features.  

Additionally, channel admins may gain even more boosts by starting [giveaways&nbsp;&raquo;](/api/giveaways.md).  

The maximum possible boost level for a channel is specified in the [boosts_channel_level_max](/api/config.md#boosts-channel-level-max) config key.

Schema:

    myBoost#c448415c flags:# slot:int peer:flags.0?Peer date:int expires:int cooldown_until_date:flags.1?int = MyBoost;

    premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;
    

    prepaidGiveaway#b2539d54 id:long months:int quantity:int date:int = PrepaidGiveaway;

    premium.boostsStatus#4959427a flags:# my_boost:flags.2?true level:int current_level_boosts:int boosts:int gift_boosts:flags.4?int next_level_boosts:flags.0?int premium_audience:flags.1?StatsPercentValue boost_url:string prepaid_giveaways:flags.3?Vector<PrepaidGiveaway> my_boost_slots:flags.2?Vector<int> = premium.BoostsStatus;

    boost#4b3e14d6 flags:# gift:flags.1?true giveaway:flags.2?true unclaimed:flags.3?true id:string user_id:flags.0?long giveaway_msg_id:flags.2?int date:int expires:int used_gift_slug:flags.4?string multiplier:flags.5?int stars:flags.6?long = Boost;

    premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    messageActionBoostApply#cc02aa6d boosts:int = MessageAction;
    messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;

    ---functions---

    premium.getMyBoosts#0be77b4a = premium.MyBoosts;
    premium.applyBoost#6b7da746 flags:# slots:flags.0?Vector<int> peer:InputPeer = premium.MyBoosts;

    premium.getBoostsStatus#042f1f61 peer:InputPeer = premium.BoostsStatus;
    
    premium.getUserBoosts#39854d1f peer:InputPeer user_id:InputUser = premium.BoostsList;

    premium.getBoostsList#60f67660 flags:# gifts:flags.0?true peer:InputPeer offset:string limit:int = premium.BoostsList;

Each user has a certain number of boost slots that can be assigned to channels and supergroups: the precise number depends on whether they bought or were gifted a [Premium](/api/premium.md) subscription, and can be fetched using [premium.getMyBoosts](/method/premium.getMyBoosts.md), along with info about the channels and supergroups currently occupying each slot, if any.  

[Gifting a Telegram Premium](/api/premium.md#gifting-telegram-premium) subscription to another user will create [boosts_per_sent_gift](/api/config.md#boosts-per-sent-gift) new boost slots for us, and one boost slot for the destination user.  

Use [premium.applyBoost](/method/premium.applyBoost.md) to assign some of your boost slots to a channel or supergroup.  

A `PREMIUM_ACCOUNT_REQUIRED` error will be returned if the current account does not have a [Telegram Premium](/api/premium.md) subscription.  
A `BOOST_NOT_MODIFIED` RPC error will be returned when calling any of the two methods if the user is already boosting the specified channel or supergroup with the same slots.  

After assigning a slot a channel or supergroup, the user may not change the boosted channel or supergroup for that slot for a certain cooldown period, specified in the [myBoost](/constructor/myBoost.md).`cooldown_until_date` field: if the cooldown period isn't over yet, the method will return a 420 `FLOOD_WAIT_X` error, indicating the number of seconds left before a different channel or supergroup can be boosted.  

Users may also invoke [premium.getBoostsStatus](/method/premium.getBoostsStatus.md), to get the current boost status of a channel or supergroup as a [premium.boostsStatus](/constructor/premium.boostsStatus.md) constructor, check out the [constructor page](/constructor/premium.boostsStatus.md) for more info.

The number of boosts we have currently assigned to the channel/supergroup will also be visible in [channelFull](/constructor/channelFull.md).`boosts_applied`.  

Channel or supergroup administrators may invoke [premium.getBoostsList](/method/premium.getBoostsList.md) to fetch the list of users currently boosting the channel or supergroup, and [premium.getUserBoosts](/method/premium.getUserBoosts.md) to get info about the boosts sent to a channel or supergroup by a specific user.

Boosting a channel or supergroup will emit (not immediately, after max 15 seconds to allow grouping of repeated boosts) a [messageService](/constructor/messageService.md) with a [messageActionBoostApply](/constructor/messageActionBoostApply.md) to all users (supergroups) or for just the sender (channels), with `from_id` equal to the sender of the boosts.  

### Features

#### Posting stories as a channel or supergroup

With each boost, channels and supergroups can post 1 additional story per day to their subscribers' story feeds.

    inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;

    messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;

    ---functions---

    stories.getChatsToSend#a56a8b60 = messages.Chats;

Everything works exactly the same as when [posting stories as a user](/api/stories.md#posting-stories), with the only difference that clients should pass the appropriate [inputPeerChannel](/constructor/inputPeerChannel.md) instead of [inputPeerSelf](/constructor/inputPeerSelf.md) to [stories.canSendStory](/method/stories.canSendStory.md), [stories.sendStory](/method/stories.sendStory.md) and all the other story methods, see the [main documentation&nbsp;&raquo;](/api/stories.md#posting-stories) for more info.  

Use [stories.getChatsToSend](/method/stories.getChatsToSend.md) to obtain a list of channels or supergroups where the user can post stories; [stories.canSendStory](/method/stories.canSendStory.md) must still be used before uploading a story to make sure no other limit was reached, as described in the [main documentation&nbsp;&raquo;](/api/stories.md#posting-stories).

#### Boost indicator for supergroup messages

In incoming supergroup messages from non-anonymous group members only, [message](/constructor/message.md).`from_boosts_applied` contains the number of boosts that the message's author has assigned to the supergroup.  
This counter should be shown in the UI, in the header of the message.  
Note that [message](/constructor/message.md).`from_boosts_applied` should be locally overridden for non-anonymous *outgoing* supergroup messages, according to the current value of [channelFull](/constructor/channelFull.md).`boosts_applied`, to ensure the value is correct even for messages sent by the current user before a supergroup was boosted (or after a boost has expired or the number of boosts has changed); do not update this value for incoming messages from other users, even if their boosts have changed.

#### Channel autotranslation

After reaching at least the boost level specified in the [`channel_autotranslation_level_min` config parameter](/api/config.md#channel-autotranslation-level-min), channels gain the ability to enable [autotranslation for all users &raquo;](/api/translation.md#autotranslation-for-channels).

#### Changing message accent color

After reaching at least the boost level specified in the `channel_min_level` field of the [help.peerColorOption](/constructor/help.peerColorOption.md) constructor for the chosen palette, (only) channels gain the ability to change their [message accent palette&nbsp;&raquo;](/api/colors.md).  

#### Changing message accent emoji

After reaching at least the boost level specified in the [`channel_bg_icon_level_min` config parameter](/api/config.md#channel-bg-icon-level-min), (only) channels gain the ability to change the emoji used in the [message accent palette&nbsp;&raquo;](/api/colors.md).  

#### Changing profile accent color/emoji

After reaching at least the boost level specified in the [`channel_profile_bg_icon_level_min`&nbsp;&raquo;](/api/config.md#channel-profile-bg-icon-level-min)/[`group_profile_bg_icon_level_min`&nbsp;&raquo;](/api/config.md#group-profile-bg-icon-level-min) config parameters and the boost level specified in the `channel_min_level`/`group_min_level` field of the [help.peerColorOption](/constructor/help.peerColorOption.md) constructor for the chosen palette, channels/supergroups gain the ability to change the emoji and color used in the [profile accent palette&nbsp;&raquo;](/api/colors.md).  

#### Setting wallpapers

After reaching at least the boost level specified in the [`channel_wallpaper_level_min`&nbsp;&raquo;](/api/config.md#channel-wallpaper-level-min)/[`group_wallpaper_level_min`&nbsp;&raquo;](/api/config.md#group-wallpaper-level-min) config parameters, channels/supergroups gain the ability to set a [fill channel/supergroup wallpaper, see here &raquo; for more info](/api/wallpapers.md#channel-and-supergroup-wallpapers).  
After reaching at least the boost level specified in the [`channel_custom_wallpaper_level_min`&nbsp;&raquo;](/api/config.md#channel-custom-wallpaper-level-min)/[`group_custom_wallpaper_level_min`&nbsp;&raquo;](/api/config.md#group-custom-wallpaper-level-min) config parameters, channels/supergroups gain the ability to set any custom [wallpaper](/api/wallpapers.md), not just [fill channel/supergroup wallpapers, see here &raquo; for more info](/api/wallpapers.md).  

#### Setting a custom emoji status

After reaching at least the boost level specified in the [`channel_emoji_status_level_min`&nbsp;&raquo;](/api/config.md#channel-emoji-status-level-min)/[`group_emoji_status_level_min`&nbsp;&raquo;](/api/config.md#group-emoji-status-level-min) config parameters, channels/supergroups gain the ability to change their [status emoji&nbsp;&raquo;](/api/emoji-status.md).  

#### Bypass slowmode and chat restrictions

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---

    channels.setBoostsToUnblockRestrictions#ad399cee channel:InputChannel boosts:int = Updates;

Supergroup admins with [ban_users admin rights&nbsp;&raquo;](/constructor/chatAdminRights.md) may allow users that apply a certain number of boosts to the group to bypass [slow mode&nbsp;&raquo;](/method/channels.toggleSlowMode.md) and [other&nbsp;&raquo;](/api/rights.md#default-rights) supergroup restrictions using [channels.setBoostsToUnblockRestrictions](/method/channels.setBoostsToUnblockRestrictions.md).  

The number of required boosts must be specified in the `boosts` parameter (1-8, 0 to disable), and will be returned in [channelFull](/constructor/channelFull.md).`boosts_unrestrict`.  

#### Setting a custom emoji stickerset for supergroups

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    channelAdminLogEventActionChangeEmojiStickerSet#46d840ab prev_stickerset:InputStickerSet new_stickerset:InputStickerSet = ChannelAdminLogEventAction;

    ---functions---

    channels.setEmojiStickers#3cd930b7 channel:InputChannel stickerset:InputStickerSet = Bool;

After reaching at least the boost level specified in the [`group_emoji_stickers_level_min`&nbsp;&raquo;](/api/config.md#group-emoji-stickers-level-min) config parameter, supergroups gain the ability to associate a [custom emoji stickerset&nbsp;&raquo;](/api/custom-emoji.md), which can be used by all users of the group (including non-[Premium](/api/premium.md) users!), for messages sent within the group.  

This feature is the custom emoji stickerset counterpart of the supergroup stickerset feature, available through [channels.setStickers](/method/channels.setStickers.md).  

Invoke [channels.setEmojiStickers](/method/channels.setEmojiStickers.md) to choose the custom emoji stickerset to associate to the supergroup, which will be available to users in [channelFull](/constructor/channelFull.md).`emojiset`, and should be prioritized when choosing a custom emoji; a [channelAdminLogEventActionChangeEmojiStickerSet](/constructor/channelAdminLogEventActionChangeEmojiStickerSet.md) will be emitted to the [admin log](/api/recent-actions.md) after invoking that method.  

#### Unlimited voice message transcriptions for supergroups

After reaching at least the boost level specified in the [`group_transcribe_level_min`&nbsp;&raquo;](/api/config.md#group-transcribe-level-min) config parameter, non-[Premium](/api/premium.md) users in the supergroup gain the ability to [transcribe any voice message](/api/transcribe.md), without using up their free transcription quota.

#### Disable ads on the channel

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---
    
    channels.restrictSponsoredMessages#9ae91519 channel:InputChannel restricted:Bool = Updates;

After reaching at least the boost level specified in the [`channel_restrict_sponsored_level_min`&nbsp;&raquo;](/api/config.md#channel-restrict-sponsored-level-min) config parameter, channel owners may disable ads on the channel for all users using [channels.restrictSponsoredMessages](/method/channels.restrictSponsoredMessages.md).  

If ads are disabled on the channel, the [channelFull](/constructor/channelFull.md).`restricted_sponsored` flag will be set (owners only).  
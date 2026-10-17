# Content protection


**Users** and **bots** who want to keep their messages private, as well as **Group** and **Channel** owners who want to keep their content members-only can enable **content protection**, which prevents screenshots, copying, disables message forwards and limits the ability to save media from posts.  

### For groups and channels

    chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;
    
    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;
    
    ---functions---

    messages.toggleNoForwards#b2081a35 flags:# peer:InputPeer enabled:Bool request_msg_id:flags.0?int = Updates;

To enable or disable content protection in a [basic group, supergroup or channel](/api/channel.md) simply invoke [messages.toggleNoForwards](/method/messages.toggleNoForwards.md), passing `true` or `false` to `enabled` (ignore the `request_msg_id` flag, it's only used when [protecting private chats &raquo;](#for-users)).  

This method can only be invoked by the owner of a group/channel (so only by users, as bots cannot own groups/channels).  

Groups and channels where content protection is enabled will have the [chat](/constructor/chat.md).`noforwards`/[channel](/constructor/channel.md).`noforwards` flag set.  

Note that the [message](/constructor/message.md).`noforwards` flag will **not** be set for groups/channels with channel/group-wide protection enabled, as that flag is only usable by [bots &raquo;](#for-bots): however, all messages received from protected groups/chats must still be treated as if the [message](/constructor/message.md).`noforwards` flag was set (i.e. forwards, downloads, copying, screenshots must be disabled).  

Attempting to forward messages from a protected chat/channel will emit a `CHAT_FORWARDS_RESTRICTED` RPC error.  

### For bots

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    // All other message sending methods also have the `noforwards` flag

Bots can send standalone protected messages to any private chat, group or channel, regardless of the chat-wide protection status, by simply setting the `noforwards` flag of [messages.sendMessage](/method/messages.sendMessage.md) and all other message sending methods.  

This will set the [message](/constructor/message.md).`noforwards` flag of the outgoing messages; for these messages, forwards, downloads, copying, screenshots must be disabled.  

Attempting to forward protected messages will emit a `CHAT_FORWARDS_RESTRICTED` RPC error.  

### For users

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    messageActionNoForwardsToggle#bf7d6572 prev_value:Bool new_value:Bool = MessageAction;
    messageActionNoForwardsRequest#3e2793ba flags:# expired:flags.0?true prev_value:Bool new_value:Bool = MessageAction;
    
    ---functions---

    messages.toggleNoForwards#b2081a35 flags:# peer:InputPeer enabled:Bool request_msg_id:flags.0?int = Updates;

To enable or disable content protection in a private chat simply invoke [messages.toggleNoForwards](/method/messages.toggleNoForwards.md), passing `true` or `false` to `enabled`.  

This method can only be invoked by users, in a private chat with another user: private chats with bots and official Telegram support accounts cannot be protected.  

A [Telegram Premium](/api/premium.md) subscription is required to protect private chats ([pm_noforwards feature identifier &raquo;](/api/premium.md#pm-noforwards)), [groups and channels can be protected even without a Premium subscription](#for-groups-and-channels).  

Protecting/unprotecting a private chat will emit a [messageActionNoForwardsToggle](/constructor/messageActionNoForwardsToggle.md) service message.  

This service message will only be emitted if:

- The protection state actually changed (i.e. re-protecting a protected chat or unprotecting an unprotected chat will not emit updates nor RPC errors) OR
- A valid `request_msg_id` is provided, in which case a [messageActionNoForwardsToggle](/constructor/messageActionNoForwardsToggle.md) will always be emitted even when not changing the protection state (in this case, both `prev_value` and `new_value` will be equal to the current protection state), in order to mark the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) as read (see below).  

Private chats where content protection was enabled by our side/the other side will have the [userFull](/constructor/userFull.md).`noforwards_my_enabled`/`noforwards_peer_enabled` flag set.  
Only one of the two flags will be set, depending on who disabled forwards first; if the chat was protected by the other side first, re-protecting the private chat on our side won't change the values of the flags (and vice versa).  

If the `noforwards_peer_enabled` flag is set (i.e. the chat was protected by the other peer, not by us), invoking [messages.toggleNoForwards](/method/messages.toggleNoForwards.md) will **not** unprotect the chat: instead, a [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) service message will be emitted, indicating to the other peer that we requested to disable content protection in the chat.  

The other peer can then choose to accept or refuse the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) by invoking [messages.toggleNoForwards](/method/messages.toggleNoForwards.md), populating the `enabled` flag with `true` to refuse the request, `false` to accept the request and the `request_msg_id` flag with the ID of the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) service message; this will have the following consequences:

- A new [messageActionNoForwardsToggle](/constructor/messageActionNoForwardsToggle.md) will be emitted replying to the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) (i.e. `reply_to` will be populated with the ID of the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md)).  
  
  As mentioned above, this service message will always be emitted, even if the protection state wasn't changed (i.e. when re-protecting a protected chat or unprotecting an unprotected chat by clicking on the accept/refuse buttons of multiple requests in the same chat), in order to mark the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) as read.  

  Note that i.e. accepting a request and then refusing the next will have the effect of disabling and then re-enabling content protection in the chat.  
- The mentioned [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) will be automatically expired, setting the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md).`expired` flag on the server (i.e. the updated value will be available to clients fetching the message history/updates): attempting to reuse the same `request_msg_id` will emit a `REQUEST_MSG_EXPIRED` RPC error.  
- Note that no update will be emitted to explicitly set the [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md).`expired` flag, if the original [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md) was already received by the client using updates: clients should automatically expire locally cached [messageActionNoForwardsRequest](/constructor/messageActionNoForwardsRequest.md)s as soon as a [messageActionNoForwardsToggle](/constructor/messageActionNoForwardsToggle.md) replying to the request is received.  
  
  Unrelated [messageActionNoForwardsToggle](/constructor/messageActionNoForwardsToggle.md)s not replying to any request, or replying to other requests must **not** expire unrelated pending requests.  

  Pending requests also **won't** be expired if protection is disabled by the side that enabled it without passing a `request_msg_id`.  

Pending requests will automatically expire [no_forwards_request_expire_period &raquo;](/api/config.md#no-forwards-request-expire-period) seconds after they're sent, unless they are manually accepted or rejected, first.  

Note that the [message](/constructor/message.md).`noforwards` flag will **not** be set for private chats with protection enabled, as that flag is only usable by [bots &raquo;](#for-bots): however, all messages received from protected private chats must still be treated as if the [message](/constructor/message.md).`noforwards` flag was set (i.e. forwards, downloads, copying, screenshots must be disabled).  

Attempting to forward messages from a protected private chat will emit a `CHAT_FORWARDS_RESTRICTED` RPC error.  

### For stories

    storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;

    ---functions---

    stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;

A [story](/api/stories.md) can also be protected by setting the `noforwards` flag of [stories.sendStory](/method/stories.sendStory.md) and other related methods.  

This will generate a [storyItem](/constructor/storyItem.md) with the `noforwards` flag set: for these stories, forwards, downloads, copying and screenshots must be disabled.  


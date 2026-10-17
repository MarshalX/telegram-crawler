# Paid messages


Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured [Star Messages &raquo;](https://telegram.org/blog/star-messages-gateway-2-0-and-more#stay-in-control-of-your-inbox-with-star-messages), requiring a payment for every message sent to them.  

### Toggling paid messages

    globalPrivacySettings#fe41b34f flags:# archive_and_mute_new_noncontact_peers:flags.0?true keep_archived_unmuted:flags.1?true keep_archived_folders:flags.2?true hide_read_marks:flags.3?true new_noncontact_peers_require_premium:flags.4?true display_gifts_button:flags.7?true noncontact_peers_paid_stars:flags.5?long disallowed_gifts:flags.6?DisallowedGiftsSettings = GlobalPrivacySettings;

    peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;

    inputPrivacyKeyNoPaidMessages#bdc597b4 = InputPrivacyKey;
    
    privacyKeyNoPaidMessages#17d348d2 = PrivacyKey;

    account.paidMessagesRevenue#1e109708 stars_amount:long = account.PaidMessagesRevenue;
    
    messageActionPaidMessagesRefunded#ac1f1fcd count:int stars:long = MessageAction;
    
    messageActionPaidMessagesPrice#84b88578 flags:# broadcast_messages_allowed:flags.0?true stars:long = MessageAction;

    updateMonoForumNoPaidException#9f812b08 flags:# exception:flags.0?true channel_id:long saved_peer_id:Peer = Update;

    ---functions---
    
    account.setGlobalPrivacySettings#1edaaac2 settings:GlobalPrivacySettings = GlobalPrivacySettings;
    channels.updatePaidMessagesPrice#4b12327b flags:# broadcast_messages_allowed:flags.0?true channel:InputChannel send_paid_messages_stars:long = Updates;
    
    account.toggleNoPaidMessagesException#fe2eda76 flags:# refund_charged:flags.0?true require_payment:flags.2?true parent_peer:flags.1?InputPeer user_id:InputUser = Bool;

    messages.getPeerSettings#efd9a6a2 peer:InputPeer = messages.PeerSettings;

    account.getPaidMessagesRevenue#19ba4a67 flags:# parent_peer:flags.0?InputPeer user_id:InputUser = account.PaidMessagesRevenue;

The amount of stars required to send us messages can be specified:

* For private messages to us, in the [globalPrivacySettings](/constructor/globalPrivacySettings.md).`noncontact_peers_paid_stars` [global privacy setting](/api/privacy.md#global-privacy-settings); can be toggled only if [stars_paid_messages_available](/api/config.md#stars-paid-messages-available) is equal to true and the current user has a [Premium subscription](/api/premium.md).
* For [supergroups and direct messages to channels](/api/channel.md), using [channels.updatePaidMessagesPrice](/method/channels.updatePaidMessagesPrice.md).  
  When choosing the price for [direct channel messages](/api/monoforum.md), the UI should display [stars_paid_messages_channel_amount_default &raquo;](/api/config.md#stars-paid-messages-channel-amount-default) as the initial default value.  

The maximum allowed amount of stars is specified in [stars_paid_message_amount_max &raquo;](/api/config.md#stars-paid-message-amount-max).  

After enabling paid messages, the only users that won't be required to pay to send us a message are:

* For private messages:  
  * Users that are in our contact list
  * Users that we have messaged first
  * Users we have explicitly exempted from paying using the [inputPrivacyKeyNoPaidMessages](/constructor/inputPrivacyKeyNoPaidMessages.md) [privacy setting &raquo;](/api/privacy.md) with [inputPrivacyValueAllowUsers](/constructor/inputPrivacyValueAllowUsers.md).  
    Note that we can also exempt from payment all users that contact us for the first time through one of our messages in a chat using [inputPrivacyValueAllowChatParticipants](/constructor/inputPrivacyValueAllowChatParticipants.md) (implemented using [min locations &raquo;](/api/min.md)).  
  * Users we have explicitly exempted from paying using [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md): this is just another way to edit the [inputPrivacyKeyNoPaidMessages](/constructor/inputPrivacyKeyNoPaidMessages.md) privacy allowlist for individual peers, without fetching the full current list.  
    Note that this method can only add users to the [inputPrivacyValueAllowUsers](/constructor/inputPrivacyValueAllowUsers.md) allowlist, not remove them.  

  All users that must pay to send us private messages will have the [peerSettings](/constructor/peerSettings.md).`charge_paid_message_stars` flag set *only for us*, containing the amount of required stars.  
* For supergroups:
  * Administrators, only if [channelFull](/constructor/channelFull.md).`paid_messages_available` is set.
* For [direct messages to a channel aka monoforums &raquo;](/api/monoforum.md):
  * Users we have explicitly exempted from paying using [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md) with `parent_peer` set to the ID of the monoforum.  
  Exempted users will have the [monoForumDialog](/constructor/monoForumDialog.md).`nopaid_messages_exception` flag set, and changes will emit an [updateMonoForumNoPaidException](/constructor/updateMonoForumNoPaidException.md) to other monoforum admins and to other sessions of the currently logged in monoforum admin.  
    Note that unlike for users, when acting on monoforums this method can both add and remove users from the allowlist.  

Enabling, disabling or changing the price of paid messages will emit a [messageActionPaidMessagesPrice](/constructor/messageActionPaidMessagesPrice.md) service message to the related private chat, supergroup or channel (the latter for direct messages in the associated monoforum).  

The amount of received stars will be equal to the sent amount multiplied by [stars_paid_message_commission_permille &raquo;](/api/config.md#stars-paid-message-commission-permille) divided by 1000.  

[account.getPaidMessagesRevenue](/method/account.getPaidMessagesRevenue.md) can be used to fetch the total number of non-refunded Telegram Stars a user has spent on sending us messages either directly or through a channel, according to the value of `parent_peer`.

When using [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md), the `refund_charged` flag may be set to refund all the not yet refunded stars the user has already paid us to send us messages (directly or via a monoforum; the exact number can be fetched using [account.getPaidMessagesRevenue](/method/account.getPaidMessagesRevenue.md)): this will emit an [messageActionPaidMessagesRefunded](/constructor/messageActionPaidMessagesRefunded.md) service message.  

### Sending paid messages

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;
    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;
    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    ---functions---

    users.getRequirementsToContact#d89a83a3 id:Vector<InputUser> = Vector<RequirementToContact>;

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    messages.forwardMessages#13704a7c flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int reply_to:flags.22?InputReplyTo schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long video_timestamp:flags.20?int allow_paid_stars:flags.21?long suggested_post:flags.23?SuggestedPost = Updates;
    messages.sendInlineBotResult#c0cf7646 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut allow_paid_stars:flags.21?long = Updates;
    messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;

Anyone wishing to send a message to a peer that has [configured paid messages, &raquo;](#toggling-paid-messages) must pay the required amount of [Telegram Stars &raquo;](/api/stars.md) by specifying the required amount in the `allow_paid_stars` parameter of [messages.sendMessage](/method/messages.sendMessage.md), and all other methods used to send or forward messages.  

To check if a peer requires payment to receive messages, check if the following flags are present:

* [user](/constructor/user.md).`send_paid_messages_stars` for users
* [channel](/constructor/channel.md).`send_paid_messages_stars` for monoforums (only for the ID of the monoforum, not for the ID of the associated channel)

These flags will contain the required amount of [Stars](/api/stars.md) to send that peer a message.  

Note, however, that the above flags do not indicate if we were explicitly exempted from paying [for any of the reasons specified above &raquo;](#toggling-paid-messages): this information is contained in:

* [userFull](/constructor/userFull.md).`send_paid_messages_stars` for users
* [channelFull](/constructor/channelFull.md).`send_paid_messages_stars` for monoforums (both for the ID of the monoforum, and for the ID of the associated channel)

These flags will contain the required amount of [Stars](/api/stars.md) to send that peer a message, or `0` (the flag will be set) if we were exempted; the flag won't be set for peers that don't require payment to receive messages.  

If not already cached, the [userFull](/constructor/userFull.md)/[channelFull](/constructor/channelFull.md) constructors should only be fetched:

* If [user](/constructor/user.md).`send_paid_messages_stars`/[channel](/constructor/channel.md).`send_paid_messages_stars` are set AND
* The client is currently displaying a message bar in a private chat with the user/direct message to the specified monoforum, or another UI element involved in sending a message to a peer.  

If the client needs to obtain the `send_paid_messages_stars` flag of multiple users in bulk, for example when example while displaying the chat list in the sharing UI (to display a currency sign near the avatar of each user that requires payment, with an appropriate informative tooltip), the [users.getRequirementsToContact](/method/users.getRequirementsToContact.md) method may be invoked instead, passing the list of users currently visible in the UI, returning a list of conditions (including [requirementToContactPaidMessages](/constructor/requirementToContactPaidMessages.md) with the value of the flag); this method can't be used for monoforums, which should use [channels.getFullChannel](/method/channels.getFullChannel.md) as usual (if not already cached).  

Note that [users.getRequirementsToContact](/method/users.getRequirementsToContact.md) should only be invoked for users whose full info ([userFull](/constructor/userFull.md)/[channelFull](/constructor/channelFull.md)) is not cached yet, as the same info can be computed locally if all the mentioned information is available.  
Also, it cannot be used for supergroups and monoforums, fetch the full [channelFull](/constructor/channelFull.md) for those, instead (if uncached, alternatively to avoid making too many queries, simply handle the `ALLOW_PAYMENT_REQUIRED_%d` that will occur when sending messages to a paid monoforum without paying).  

If paid messages are enabled but the flag isn't set, or if the amount passed in `allow_paid_stars` is smaller than the required amount (for example, the required amount was changed and an update notifying the change wasn't received yet), a `ALLOW_PAYMENT_REQUIRED_%d` RPC error with code 403 will be emitted when attempting to send a message, with `%d` indicating the correct required amount of stars.  
Additionally, if the amount passed in `allow_paid_stars` is bigger than the actually required amount (again, if the required amount was recently changed), only the actually required amount of stars (or no stars, if paid messages were disabled) will be charged.  

The amount of stars the **sender has paid** (i.e. not the amount received, the flag will be the same for both sender and receiver regardless of [stars_paid_message_commission_permille &raquo;](/api/config.md#stars-paid-message-commission-permille)) will be specified in the [message](/constructor/message.md).`paid_message_stars` flag.  

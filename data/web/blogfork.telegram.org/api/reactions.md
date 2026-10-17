# Message reactions


Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.  

### React to a message

    reactionEmoji#1b2286b8 emoticon:string = Reaction;
    reactionCustomEmoji#8935fc73 document_id:long = Reaction;
    reactionPaid#523da4eb = Reaction;

    reactionCount#a3d1cb80 flags:# chosen_order:flags.0?int reaction:Reaction count:int = ReactionCount;
    
    messagePeerReaction#8c79b63c flags:# big:flags.0?true unread:flags.1?true my:flags.2?true peer_id:Peer date:int reaction:Reaction = MessagePeerReaction;

    messageReactions#a339f0b flags:# min:flags.0?true can_see_list:flags.2?true reactions_as_tags:flags.3?true results:Vector<ReactionCount> recent_reactions:flags.1?Vector<MessagePeerReaction> top_reactors:flags.4?Vector<MessageReactor> = MessageReactions;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;

    updateMessageReactions#1e297bfa flags:# peer:Peer msg_id:int top_msg_id:flags.0?int saved_peer_id:flags.1?Peer reactions:MessageReactions = Update;

    messages.messageReactionsList#31bd492d flags:# count:int reactions:Vector<MessagePeerReaction> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.MessageReactionsList;

    ---functions---

    messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;
    messages.getMessagesReactions#8bba90e6 peer:InputPeer id:Vector<int> = Updates;
    messages.getMessageReactionsList#461b3f48 flags:# peer:InputPeer id:int reaction:flags.0?Reaction offset:flags.1?string limit:int = messages.MessageReactionsList;

    messages.getUnreadReactions#bd7f90ac flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
    messages.readReactions#9ec44f93 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;

    messages.reportReaction#3f64c076 peer:InputPeer id:int reaction_peer:InputPeer = Bool;

Users can react to a message with one or more reactions using [messages.sendReaction](/method/messages.sendReaction.md); you can also react to [service messages &raquo;](/constructor/messageService.md) that have the `reactions_are_possible` flag set.  
After sending the reaction, the `chosen_order` field of [reactionCount](/constructor/reactionCount.md) (in [messageReactions](/constructor/messageReactions.md)) will be set for the reaction. The integer value indicates when was the reaction added: the bigger the value, the newer the reaction, use this value to appropriately sort the `messages.sendReaction:reaction` vector when adding new reactions.  
Reactions should be sent in **ascending order** (new reactions at the end in the `messages.sendReaction:reaction` vector), and when adding more reactions to the same message, older reactions should be removed to keep the total number of sent reactions within [reactions_user_max_default](/api/config.md#reactions-user-max-default)/[reactions_user_max_premium](/api/config.md#reactions-user-max-premium) reactions.  
The [reactions_uniq_max](/api/config.md#reactions-uniq-max) configuration field also indicates the maximum number of unique reactions that can be added to a message: for example, if there are 2000 👍 and 1000 custom emoji 😁 reactions and reactions_uniq_max = 2, you can't add a 👎 reaction, because that would raise the number of unique reactions to 3 > 2.  

Chats and channels may also configure a custom limit of unique reactions; this info will be available to users in [channelFull](/constructor/channelFull.md).`reactions_limit` and [chatFull](/constructor/chatFull.md).`reactions_limit`.  

The `big` flag can be optionally set to elicit a bigger reaction.  
Send a [reactionEmoji](/constructor/reactionEmoji.md) to react using a normal emoji, and a [reactionCustomEmoji](/constructor/reactionCustomEmoji.md) to react using a [custom emoji](/api/custom-emoji.md).  
Message authors will receive an [updateMessageReactions](/constructor/updateMessageReactions.md) update when a user reacts to their message, if enabled as specified [here&nbsp;&raquo;](#notifications-about-reactions).  

[messages.getMessagesReactions](/method/messages.getMessagesReactions.md) can be used to fetch a full list of reactions for one or more messages.  
Apps should short-poll reactions for visible messages (that weren't sent by the user) once every 15-30 seconds, but only if `message.reactions` is set.  

In groups, [messages.getMessageReactionsList](/method/messages.getMessageReactionsList.md) can be used to fetch the reaction list, along with the sender of each reaction.  
In groups, [messages.reportReaction](/method/messages.reportReaction.md) can be used to report a certain [custom emoji](/api/custom-emoji.md) reaction, specifying the `peer`, the message `id` and the user that sent the reaction (`reaction_peer`).  

[messages.getUnreadReactions](/method/messages.getUnreadReactions.md) is used to fetch messages with unread reactions.  
Use [messages.readReactions](/method/messages.readReactions.md) to mark all reactions as read in a certain chat.

For [saved messages](/api/saved-messages.md), if the `reactions_as_tags` flag of [messageReactions](/constructor/messageReactions.md) is set, or if there are no reactions, all present and future reactions should be treated as [message tags, see here &raquo; for more info](/api/saved-messages.md#tags).

### Paid reactions

    reactionPaid#523da4eb = Reaction;

    ---functions---

    messages.setChatAvailableReactions#864b2581 flags:# peer:InputPeer available_reactions:ChatReactions reactions_limit:flags.0?int paid_enabled:flags.1?Bool = Updates;

    messages.sendPaidReaction#58bbcb50 flags:# peer:InputPeer msg_id:int count:int random_id:long private:flags.0?PaidReactionPrivacy = Updates;

Paid reactions (aka Star reactions) may be sent to channel posts by invoking [messages.sendPaidReaction](/method/messages.sendPaidReaction.md): this will transfer `count` Telegram Stars to the channel's balance and increment by `count` the reaction counter of the Star reaction with type [reactionPaid](/constructor/reactionPaid.md).  

**Note**: the `random_id` argument of [messages.sendPaidReaction](/method/messages.sendPaidReaction.md) **must** be composed of a 64-bit integer where the lower 32 bits are random, and the higher 32 bits **are equal to the current unixtime**, i.e. `uint64_t random_id = (time() << 32) | ((uint64_t)random_uint32_t())`: this differs from the `random_id` format of all other methods in the API, which just take 64 random bits.  

To enable paid reactions, channel admins must invoke [messages.setChatAvailableReactions](/method/messages.setChatAvailableReactions.md), passing [boolTrue](/constructor/boolTrue.md) to `paid_enabled` and the previously configured reaction set in `available_reactions` (`reactions_limit` can be omitted, as omitting the flag will keep the previously configured value).  

Users can determine whether a channel supports paid reactions by checking the value of the [channelFull](/constructor/channelFull.md).`paid_reactions_available` flag.  

The maximum number of paid reactions that may be sent on a post is specified in the [stars_paid_reaction_amount_max &raquo;](/api/config.md#stars-paid-reaction-amount-max) client configuration value.

#### Paid reaction privacy

    paidReactionPrivacyDefault#206ad49e = PaidReactionPrivacy;
    paidReactionPrivacyAnonymous#1f0c1ad9 = PaidReactionPrivacy;
    paidReactionPrivacyPeer#dc6cfcf0 peer:InputPeer = PaidReactionPrivacy;

    updatePaidReactionPrivacy#8b725fce private:PaidReactionPrivacy = Update;

    updateMessageReactions#1e297bfa flags:# peer:Peer msg_id:int top_msg_id:flags.0?int saved_peer_id:flags.1?Peer reactions:MessageReactions = Update;

    messageReactions#a339f0b flags:# min:flags.0?true can_see_list:flags.2?true reactions_as_tags:flags.3?true results:Vector<ReactionCount> recent_reactions:flags.1?Vector<MessagePeerReaction> top_reactors:flags.4?Vector<MessageReactor> = MessageReactions;

    messageReactor#4ba3a95a flags:# top:flags.0?true my:flags.1?true anonymous:flags.2?true peer_id:flags.3?Peer count:int = MessageReactor;

    channels.sendAsPeers#f496b0c6 peers:Vector<SendAsPeer> chats:Vector<Chat> users:Vector<User> = channels.SendAsPeers;

    ---functions---

    messages.getPaidReactionPrivacy#472455aa = Updates;

    messages.sendPaidReaction#58bbcb50 flags:# peer:InputPeer msg_id:int count:int random_id:long private:flags.0?PaidReactionPrivacy = Updates;

    messages.togglePaidReactionPrivacy#435885b5 peer:InputPeer msg_id:int private:PaidReactionPrivacy = Bool;

    messages.getMessagesReactions#8bba90e6 peer:InputPeer id:Vector<int> = Updates;

    channels.getSendAs#e785a43f flags:# for_paid_reactions:flags.0?true for_live_stories:flags.1?true peer:InputPeer = channels.SendAsPeers;

Each post with star reactions has a leaderboard with the top senders, but users can opt out of appearing there if they prefer more privacy, by specifying the appropriate [PaidReactionPrivacy](/type/PaidReactionPrivacy.md) object; not populating it will use the default reaction privacy, stored on the server and synced to clients using [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) (see below for more info).  

A reaction can also be sent on behalf of a channel we own; invoke [channels.getSendAs](/method/channels.getSendAs.md) with the `for_paid_reactions` flag to obtain the list of channels that can be used to send reactions.  

To change the privacy of already sent paid reactions, invoke [messages.togglePaidReactionPrivacy](/method/messages.togglePaidReactionPrivacy.md), passing the ID of the message, the channel and the desired privacy setting.  

Explicitly specifying a custom reaction privacy, or changing the reaction privacy of already sent reactions will update the default reaction privacy stored on the server: if the new value is different from the old one, an [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) update will be emitted.  
Clients should invoke [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md) on startup to fetch the current default reaction privacy (because the [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) update is only sent to currently online sessions and cannot be fetched using getDifference on client startup).  

To fetch the paid reactions leaderboard, invoke [messages.getMessagesReactions](/method/messages.getMessagesReactions.md): the returned [updateMessageReactions](/constructor/updateMessageReactions.md) constructor will contain a `top_reactors` vector of [messageReactor](/constructor/messageReactor.md)s, containing the paid reactions leaderboard for that message.  

### React to a story

See [here&nbsp;&raquo;](/api/stories.md#reactions) for more info on how to react to a story.

### Removing participant reactions

    ---functions---

    messages.deleteParticipantReaction#e3b7f82c peer:InputPeer msg_id:int participant:InputPeer = Updates;
    messages.deleteParticipantReactions#a0b80cf8 peer:InputPeer participant:InputPeer = Bool;

Admins of a group or channel can moderate reactions left by a specific participant.  

Use [messages.deleteParticipantReaction](/method/messages.deleteParticipantReaction.md) to remove all reactions left by `participant` on a single message (identified by `msg_id`) in `peer`.  

Use [messages.deleteParticipantReactions](/method/messages.deleteParticipantReactions.md) to remove all reactions left by `participant` across every message in `peer`.  

### Notifications about reactions

    reactionNotificationsFromContacts#bac3a61a = ReactionNotificationsFrom;
    reactionNotificationsFromAll#4b9e22a0 = ReactionNotificationsFrom;

    reactionsNotifySettings#71e4ea58 flags:# messages_notify_from:flags.0?ReactionNotificationsFrom stories_notify_from:flags.1?ReactionNotificationsFrom poll_votes_notify_from:flags.2?ReactionNotificationsFrom sound:NotificationSound show_previews:Bool = ReactionsNotifySettings;

    updateNewStoryReaction#1824e40b story_id:int peer:Peer reaction:Reaction = Update;
    updateMessageReactions#1e297bfa flags:# peer:Peer msg_id:int top_msg_id:flags.0?int saved_peer_id:flags.1?Peer reactions:MessageReactions = Update;

    ---functions---

    account.setReactionsNotifySettings#316ce548 settings:ReactionsNotifySettings = ReactionsNotifySettings;
    account.getReactionsNotifySettings#6dd654c = ReactionsNotifySettings;

Users may choose to receive notifications about reactions sent to their messages and stories by any user, only by contacts, or completely disable them.  

These reaction notification settings may be changed using [account.setReactionsNotifySettings](/method/account.setReactionsNotifySettings.md), and fetched using [account.getReactionsNotifySettings](/method/account.getReactionsNotifySettings.md).  

A custom [notification sound&nbsp;&raquo;](/api/ringtones.md) may also be set for reactions in the `sound` field of the [reactionsNotifySettings](/constructor/reactionsNotifySettings.md).  

If `show_previews=false`, [push notifications&nbsp;&raquo;](/api/push-updates.md) about message/story reactions will only be of type `REACT_HIDDEN`/`REACT_STORY_HIDDEN`, without any information about the reacted-to story or the reaction itself.  

### Animated normal emojis

    reactionEmoji#1b2286b8 emoticon:string = Reaction;

    availableReaction#c077ec01 flags:# inactive:flags.0?true premium:flags.2?true reaction:string title:string static_icon:Document appear_animation:Document select_animation:Document activate_animation:Document effect_animation:Document around_animation:flags.1?Document center_icon:flags.1?Document = AvailableReaction;

    messages.availableReactionsNotModified#9f071957 = messages.AvailableReactions;
    messages.availableReactions#768e3aad hash:int reactions:Vector<AvailableReaction> = messages.AvailableReactions;

    inputStickerSetEmojiGenericAnimations#04c4d4ce = InputStickerSet;

    ---functions---

    messages.getAvailableReactions#18dea0ac hash:int = messages.AvailableReactions;

[messages.getAvailableReactions](/method/messages.getAvailableReactions.md) can be used to fetch a list of animations to play when reacting with a normal [reactionEmoji](/constructor/reactionEmoji.md).  
The returned vector of [availableReaction](/constructor/availableReaction.md) constructors contains multiple fields with lottie [animated stickers](/api/stickers.md) and simple images that should be positioned, displayed and played appropriately in the UI, as described in the [constructor page&nbsp;&raquo;](/constructor/availableReaction.md).  

Users can also react using [custom emojis&nbsp;&raquo;](/api/custom-emoji.md), in which case the `appear_animation` and `select_animation` are equal to the custom emoji itself that can be fetched [as described here&nbsp;&raquo;](/api/custom-emoji.md).  
For custom emojis, the `effect_animation` must be equal to the `effect_animation` of the associated normal emoji: if no effect animation is present for the normal emoji associated to a custom emoji, a random [animated sticker](/api/stickers.md) should be played from the [inputStickerSetEmojiGenericAnimations](/constructor/inputStickerSetEmojiGenericAnimations.md) stickerset, fetched using [messages.getStickerSet](/method/messages.getStickerSet.md) as described [here&nbsp;&raquo;](/api/stickers.md#stickersets).

### Available reactions in group or channel

    reactionEmoji#1b2286b8 emoticon:string = Reaction;
    reactionCustomEmoji#8935fc73 document_id:long = Reaction;

    chatReactionsNone#eafc32bc = ChatReactions;
    chatReactionsAll#52928bca flags:# allow_custom:flags.0?true = ChatReactions;
    chatReactionsSome#661d4037 reactions:Vector<Reaction> = ChatReactions;

    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;
    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    channelAdminLogEventActionChangeAvailableReactions#be4e0ef8 prev_value:ChatReactions new_value:ChatReactions = ChannelAdminLogEventAction;

    ---functions---

    messages.setChatAvailableReactions#864b2581 flags:# peer:InputPeer available_reactions:ChatReactions reactions_limit:flags.0?int paid_enabled:flags.1?Bool = Updates;

Chat and channel administrators can use [messages.setChatAvailableReactions](/method/messages.setChatAvailableReactions.md) to restrict the set of reactions that can be used in a chat or channel, see [here&nbsp;&raquo;](/type/ChatReactions.md) for a list of possible configuration values.  
The set [ChatReactions](/type/ChatReactions.md) constructor can then be fetched by users using [messages.getFullChat](/method/messages.getFullChat.md), and will be contained in the `available_reactions` field of the returned full info constructor.  

The `reactions_limit` limit flag may be used to impose a custom limit of unique reactions (i.e. a customizable version of [appConfig.reactions_uniq_max](/api/config.md#reactions-uniq-max)); this field and the other info set by the method will then be available to users in [channelFull](/constructor/channelFull.md) and [chatFull](/constructor/chatFull.md).  

The [reactions_in_chat_max](/api/config.md#reactions-in-chat-max) configuration field indicates the maximum number of reactions that can be specified in [chatReactionsSome](/constructor/chatReactionsSome.md).

### Recent reactions

    reactionEmoji#1b2286b8 emoticon:string = Reaction;
    reactionCustomEmoji#8935fc73 document_id:long = Reaction;

    messages.reactionsNotModified#b06fdbdf = messages.Reactions;
    messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;

    updateRecentReactions#6f7863f4 = Update;

    ---functions---

    messages.getRecentReactions#39461db2 limit:int hash:long = messages.Reactions;
    messages.clearRecentReactions#9dfeefb4 = Bool;

    messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;

Recently used reactions can be fetched using [messages.getRecentReactions](/method/messages.getRecentReactions.md): the list can be cleared using [messages.clearRecentReactions](/method/messages.clearRecentReactions.md).  

The `add_to_recent` flag of [messages.sendReaction](/method/messages.sendReaction.md) must be set if and only if:

* The user reacts to a message using the extended reactions menu (as opposed to the reaction bubble)
* The user hasn't reacted with a [paid reaction](#paid-reactions)

Setting the `add_to_recent` flag of [messages.sendReaction](/method/messages.sendReaction.md) will update the recent reaction list, triggering an [updateRecentReactions](/constructor/updateRecentReactions.md) update on other logged-in sessions.  

When receiving [updateRecentReactions](/constructor/updateRecentReactions.md), clients should invoke [messages.getRecentReactions](/method/messages.getRecentReactions.md) to refresh the locally cached list.  

The client that invoked [messages.sendReaction](/method/messages.sendReaction.md) will not get an [updateRecentReactions](/constructor/updateRecentReactions.md): in this case, the client can choose to manually invoke [messages.getRecentReactions](/method/messages.getRecentReactions.md) every time a reaction is sent with `add_to_recent`, or, to avoid making the extra call, it can update the local list manually, regenerating the `hash` using the following algorithm:

```
reactions.prepend(new_reaction)

string remove_emoji_selectors(string emoji) {
  string str;
  for (i = 0; i < len(emoji); i++) {
    if (i + 3 <= len(emoji) && emoji[i] == '\xEF' && emoji[i + 1] == '\xB8' && emoji[i + 2] == '\x8F') {
      // skip \uFE0F
      i += 2;
    } else {
      str += emoji[i];
    }
  }
  return str;
}

// Take the char at the specified offset, zero-pad it to a 32-bit integer.  
uint32 get_char(string str, int offset) {
    uint8 char = str[offset];
    return (uint32) char;
}

vector<uint64> hash_ints = [];
foreach (reactions as reaction) {
  if reaction instanceof reactionEmoji {
    string emoji = remove_emoji_selectors(reaction.emoticon);
    // Binary md5 hash, not hex
    string hash = md5(emoji);

    hash_ints.append(0);

    // First cast to signed int32, then signed int64, then unsigned 64-bit integer.
    // In other words, cast to a signed int, sign-extend to 64-bit, 
    // then cast back to an unsigned integer.  
    //
    hash_ints.append((uint64) ((int64) (
        (int32)(
            (
                get_char(hash, 0) << 24
            ) + (
                get_char(hash, 1) << 16
            ) + (
                get_char(hash, 2) << 8
            ) + get_char(hash, 3)
        )
    )));
  } else if reaction instanceof reactionCustomEmoji {
    hash_ints.append(reaction.document_id >> 32)
    hash_ints.append(reaction.document_id & 0xFFFFFFFF)
  }
} 
```

The generated list of 64-bit integers must then be passed to the [usual hashing algorithm](/api/offsets.md#hash-generation).  

### Featured reactions

    reactionEmoji#1b2286b8 emoticon:string = Reaction;
    reactionCustomEmoji#8935fc73 document_id:long = Reaction;

    messages.reactionsNotModified#b06fdbdf = messages.Reactions;
    messages.reactions#eafdf716 hash:long reactions:Vector<Reaction> = messages.Reactions;

    ---functions---

    messages.getTopReactions#bb8125ba limit:int hash:long = messages.Reactions;

A list of featured emoji and [custom emoji](/api/custom-emoji.md) reactions can be fetched using [messages.getTopReactions](/method/messages.getTopReactions.md).  

### Set default reaction

    reactionEmoji#1b2286b8 emoticon:string = Reaction;
    reactionCustomEmoji#8935fc73 document_id:long = Reaction;

    config#cc1a241e flags:# default_p2p_contacts:flags.3?true preload_featured_stickers:flags.4?true revoke_pm_inbox:flags.6?true blocked_mode:flags.8?true force_try_ipv6:flags.14?true date:int expires:int test_mode:Bool this_dc:int dc_options:Vector<DcOption> dc_txt_domain_name:string chat_size_max:int megagroup_size_max:int forwarded_count_max:int online_update_period_ms:int offline_blur_timeout_ms:int offline_idle_timeout_ms:int online_cloud_timeout_ms:int notify_cloud_delay_ms:int notify_default_delay_ms:int push_chat_period_ms:int push_chat_limit:int edit_time_limit:int revoke_time_limit:int revoke_pm_time_limit:int rating_e_decay:int stickers_recent_limit:int channels_read_media_period:int tmp_sessions:flags.0?int call_receive_timeout_ms:int call_ring_timeout_ms:int call_connect_timeout_ms:int call_packet_timeout_ms:int me_url_prefix:string autoupdate_url_prefix:flags.7?string gif_search_username:flags.9?string venue_search_username:flags.10?string img_search_username:flags.11?string static_maps_provider:flags.12?string caption_length_max:int message_length_max:int webfile_dc_id:int suggested_lang_code:flags.2?string lang_pack_version:flags.2?int base_lang_pack_version:flags.2?int reactions_default:flags.15?Reaction autologin_token:flags.16?string = Config;

    updateConfig#a229dd06 = Update;

    ---functions---

    messages.setDefaultReaction#4f47a016 reaction:Reaction = Bool;

    help.getConfig#c4f9186b = Config;

[messages.setDefaultReaction](/method/messages.setDefaultReaction.md) can be used to change the default emoji reaction to use in the quick reaction menu.  
This value is synced across devices through [updateConfig](/constructor/updateConfig.md) and can be fetched using [help.getConfig](/method/help.getConfig.md), `reactions_default` field.

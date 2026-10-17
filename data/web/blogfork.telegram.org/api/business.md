# Telegram Business


Users can turn their Telegram account into a **business account**, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

All Telegram Business features are available for free to [Premium&nbsp;&raquo;](/api/premium.md) subscribers.  

Additionally, [connected bots&nbsp;&raquo;](/api/bots/connected-business-bots.md) are also available to non-Premium users. 

### Opening hours

    timezone#ff9289f5 id:string name:string utc_offset:int = Timezone;

    help.timezonesListNotModified#970708cc = help.TimezonesList;
    help.timezonesList#7b74ed71 timezones:Vector<Timezone> hash:int = help.TimezonesList;

    businessWeeklyOpen#120b1ab9 start_minute:int end_minute:int = BusinessWeeklyOpen;

    businessWorkHours#8c92b098 flags:# open_now:flags.0?true timezone_id:string weekly_open:Vector<BusinessWeeklyOpen> = BusinessWorkHours;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.updateBusinessWorkHours#4b00e066 flags:# business_work_hours:flags.0?BusinessWorkHours = Bool;

    help.getTimezonesList#49b30240 hash:int = help.TimezonesList;

Businesses can display their hours of operation; this info will be contained in [userFull](/constructor/userFull.md).`business_work_hours`.  
To set this information use [account.updateBusinessWorkHours](/method/account.updateBusinessWorkHours.md), passing a [businessWorkHours](/constructor/businessWorkHours.md) constructor with:

* `weekly_open` - A list of time intervals (max 28) represented by [businessWeeklyOpen](/constructor/businessWeeklyOpen.md), indicating the opening hours of their business.  
  The time intervals in [businessWeeklyOpen](/constructor/businessWeeklyOpen.md).`start/end_minute` are specified in minutes of the week.  
  For example, `61` is `Monday 01:01`, but can also be `7*24*60+61` for `end_minute` (see below).  
  
  When modifying these values, the client should validate them with the following actions (executed in the specified order):

  - Sort intervals by `start_minute` before uploading, also to facilitate client-side validation.
  - All intervals that do not satisfy the following conditions must be removed:
    - `end_minute - start_minute` must be `>= 1`
    - `start_minute` must range from `0` to `7*24*60` inclusively
    - `end_minute` must range from `1` to `8*24*60` inclusively (`8` and not `7` because this allows to specify intervals that, for example, start on `Sunday 21:00` and end on `Monday 04:00` (`6*24*60+21*60` to `7*24*60+4*60`) without violating the first condition)
  - Intersecting intervals and intervals that start and end on the same minute of the day must be merged into a single interval before uploading, for example:
    - `Monday 00:00-Monday 00:01` and `Monday 00:01-Monday 00:10` => `Monday 00:00-Monday 00:10`
    - `Monday 00:00-Monday 00:05` and `Monday 00:01-Monday 00:10` => `Monday 00:00-Monday 00:10`
    - `Monday 00:00-Monday 01:00` and `Monday 00:01-Monday 00:10` => `Monday 00:00-Monday 01:00`
    - `Sunday 16:00-Monday 01:00` and `Monday 01:00-Monday 03:00` => `Sunday 16:00-Monday 03:00`

    Note that in the last example, the first interval ended on `7*60*24+60` but the second interval started on `60`, and they were still merged (i.e., all intervals must be checked modulo `7*24*60`).  

    There is a special case where two such intersecting/adjacent intervals must still generate two distinct intervals instead of one, when:
    - The starting minute of the original first interval is `<= 7*24*60`
    - AND the ending minute of the original second interval is `>= 1*24*60`.  

    This special case cannot be merged into a single interval, as the resulting `end_minute` would be `>= 8*24*60`.  
    Thus, the merge result of this special intersection case is two intervals, the first ending on `7*24*60` the second starting at `0`, splitting the first interval even if it originally spanned two or more days including Sunday and Monday.  

    Examples:
    - `Sunday 16:00-Monday 01:00` and `Monday 00:30-Thursday 03:00` => `Sunday 16:00-Sunday 23:59` and `Monday 00:00-Thursday 03:00`
    - `Sunday 16:00-Monday 01:00` and `Monday 01:00-Thursday 03:00` => `Sunday 16:00-Sunday 23:59` and `Monday 00:00-Thursday 03:00`
    
  - If `end_minute - start_minute` is `> 7*24*60`, `end_minute` must be set equal to `start_minute + 7*24*60` (there must be no intervals longer than 1 week).  
  - Recursively repeat the last two steps until no more changes are made.  
- `timezone_id` - An ID of one of the timezones returned by [help.getTimezonesList](/method/help.getTimezonesList.md).  
  The timezone ID is contained [timezone](/constructor/timezone.md).`id`, a human-readable, localized name of the timezone is available in [timezone](/constructor/timezone.md).`name` and the [timezone](/constructor/timezone.md).`utc_offset` field contains the UTC offset in seconds, which may be displayed in hh:mm format by the client together with the human-readable name (i.e. `$name UTC -01:00`).
- `open_now` - Ignored when passed by the client, only populated by the server in [userFull](/constructor/userFull.md).`business_work_hours`, indicating whether the business is currently open according to the current time and the values in `weekly_open` and `timezone`.  

Changing the opening hours will emit an [updateUser](/constructor/updateUser.md).  

To remove all info about opening hours, invoke [account.updateBusinessWorkHours](/method/account.updateBusinessWorkHours.md) without populating the `business_work_hours` flag.  

### Location

    businessLocation#ac5c1af7 flags:# geo_point:flags.0?GeoPoint address:string = BusinessLocation;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.updateBusinessLocation#9e6b131a flags:# geo_point:flags.1?InputGeoPoint address:flags.0?string = Bool;

Businesses may advertise their location using [account.updateBusinessLocation](/method/account.updateBusinessLocation.md); this information is then returned to users in [userFull](/constructor/userFull.md).`business_location`.  

The method takes two parameters:
- `address` - Mandatory when setting/updating the location, contains a textual description of the address (max 96 UTF-8 chars).
- `geo_point` - Optional, contains a set of geographical coordinates.

To remove business location information invoke the method without setting any of the parameters.  

If a `geo_point` is set, the business' location will also be advertised to geographically close users using the nearby users feature, [as described here&nbsp;&raquo;](/api/nearby/#fetching-nearby-users-and-geogroups).  

Note that even if just the `address` is set (with or without a `geo_point`), the current geolocation of the user may not be changed using [contacts.getLocated](/method/contacts.getLocated.md) method (i.e. for the [nearby users feature](/api/nearby.md#advertising-our-current-location)): it will return a `BUSINESS_ADDRESS_ACTIVE` error, indicating that the location may only be changed (or removed) using [account.updateBusinessLocation&nbsp;&raquo;](/method/account.updateBusinessLocation.md).  

Changing the location will emit an [updateUser](/constructor/updateUser.md).  

### Quick reply shortcuts

Telegram Business allows you to create **quick replies**.  
Quick replies are shortcuts for sending preset messages that may contain several messages and support text formatting, links, stickers, media, and files.  

A quick reply shortcut has a name (shown to the user), a numeric ID and a set of associated [message](/constructor/message.md)s.  

#### Fetch existing quick reply shortcuts

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    
    quickReply#697102b shortcut_id:int shortcut:string top_message:int count:int = QuickReply;

    messages.quickReplies#c68d6695 quick_replies:Vector<QuickReply> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.QuickReplies;
    messages.quickRepliesNotModified#5f91eb5b = messages.QuickReplies;

    ---functions---

    messages.getQuickReplies#d483f2a8 hash:long = messages.QuickReplies;
    messages.getQuickReplyMessages#94a495c3 flags:# shortcut_id:int id:flags.0?Vector<int> hash:long = messages.Messages;

To fetch basic info about all existing quick reply shortcuts, use [messages.getQuickReplies](/method/messages.getQuickReplies.md).  

The method will return the ID and name of each shortcut, along with the number of messages in the shortcut and the ID of (only) the last message of each shortcut (along with the message itself in `messages`).  

Note that the `hash` is used for caching, and is generated **not** by using the message IDs, but rather the following set of integers, passed to the [usual hashing algorithm](/api/offsets.md#hash-generation).  

```
vector<uint64> hash_ints = [];
foreach (quick_replies as quick_reply) {
  hash_ints.append((uint64) quick_reply.shortcut_id);
  hash_ints.append((uint64) hexdec(substr(md5(quick_reply.shortcut), 0, 16)));
  hash_ints.append((uint64) quick_reply.top_message);
  hash_ints.append((uint64) (top_message.edit_date || 0));
}
```

The method will return [messages.quickRepliesNotModified](/constructor/messages.quickRepliesNotModified.md) if the passed hash is equal to the server-side hash, meaning that the order, names and last messages of the quick replies haven't changed.  

Editing some intermediate message in a quick reply will not change the hash, which is why [messages.getQuickReplyMessages](/method/messages.getQuickReplyMessages.md) should be used to fetch (a subset or all) messages in a quick reply shortcut, and its hash is generated as follows:

```
vector<uint64> hash_ints = [];
foreach (messages as message) {
  hash_ints.append((uint64) message.id);
  hash_ints.append((uint64) message.edit_date || 0);
}
```

The generated list of integers must then be passed to the [usual hashing algorithm](/api/offsets.md#hash-generation).  

#### Adding a message to a quick reply shortcut

    inputQuickReplyShortcut#24596d41 shortcut:string = InputQuickReplyShortcut;
    inputQuickReplyShortcutId#1190cf1 shortcut_id:int = InputQuickReplyShortcut;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    quickReply#697102b shortcut_id:int shortcut:string top_message:int count:int = QuickReply;

    updateNewQuickReply#f53da717 quick_reply:QuickReply = Update;
    updateQuickReplyMessage#3e050d0f message:Message = Update;

    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;
    messages.sendInlineBotResult#c0cf7646 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut allow_paid_stars:flags.21?long = Updates;
    messages.forwardMessages#13704a7c flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int reply_to:flags.22?InputReplyTo schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long video_timestamp:flags.20?int allow_paid_stars:flags.21?long suggested_post:flags.23?SuggestedPost = Updates;

    messages.checkQuickReplyShortcut#f1d0fbd3 shortcut:string = Bool;

To add a message to a quick reply shortcut, use [messages.sendMessage](/method/messages.sendMessage.md), [messages.sendMedia](/method/messages.sendMedia.md), [messages.sendMultiMedia](/method/messages.sendMultiMedia.md), [messages.sendInlineBotResult](/method/messages.sendInlineBotResult.md) or [messages.forwardMessages](/method/messages.forwardMessages.md) with `peer=`[inputPeerSelf](/constructor/inputPeerSelf.md), populating the `quick_reply_shortcut` flag with an [InputQuickReplyShortcut](/type/InputQuickReplyShortcut.md) constructor.  

The [InputQuickReplyShortcut](/type/InputQuickReplyShortcut.md) constructor can be either:
- [inputQuickReplyShortcut](/constructor/inputQuickReplyShortcut.md) to use the shortcut name (used to create a new shortcut)
- [inputQuickReplyShortcutId](/constructor/inputQuickReplyShortcutId.md) to use the shortcut ID (used to edit an existing shortcut)

If the specified quick reply does not exist, it will be created when invoking the above methods, emitting an additional [updateNewQuickReply](/constructor/updateNewQuickReply.md) to all logged-in sessions.  

The numeric ID of the (newly created or existing) shortcut will be contained in the `quick_reply_shortcut_id` field of the [message](/constructor/message.md)s contained in the [updateQuickReplyMessage](/constructor/updateQuickReplyMessage.md) updates returned by invoking the above methods.  
The returned messages will use a common message `id` sequence, unrelated to any other message ID sequence used in API.  

A maximum of [appConfig.`quick_replies_limit`](/api/config.md#quick-replies-limit) shortcuts may be created, otherwise a `400 QUICK_REPLIES_TOO_MUCH` error will be emitted by the methods above.

Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](/api/config.md#quick-reply-messages-limit) messages, otherwise a `400 REPLY_MESSAGES_TOO_MUCH` error will be emitted by the methods above.

Make sure to invoke [messages.checkQuickReplyShortcut](/method/messages.checkQuickReplyShortcut.md) passing the shortcut name before offering the user the choice to add a message to a quick reply shortcut, to make sure that none of the limits specified above were reached.  

#### Sending a quick reply shortcut

    ---functions---

    messages.sendQuickReplyMessages#6c750de1 peer:InputPeer shortcut_id:int id:Vector<int> random_id:Vector<long> = Updates;

To send a quick reply shortcut to a user, use [messages.sendQuickReplyMessages](/method/messages.sendQuickReplyMessages.md), passing the shortcut ID.  

Quick replies may only be sent by users, in private chats with other users.
The UI used to select quick replies should be similar to the one used for [bot commands](/api/bots/commands.md), using the shortcut name instead of the bot command name.   

You may specify a subset of the messages in the `id` field to send only some of the shortcut messages (if empty, defaults to all of them).  

#### Editing a quick reply shortcut message

    updateQuickReplyMessage#3e050d0f message:Message = Update;

    ---functions---

    messages.editMessage#51e842e1 flags:# no_webpage:flags.1?true invert_media:flags.16?true peer:InputPeer id:int message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.15?int schedule_repeat_period:flags.18?int quick_reply_shortcut_id:flags.17?int = Updates;

Use [messages.editMessage](/method/messages.editMessage.md) to edit a message in a quick reply shortcut, passing the message ID in `id` and the shortcut ID in `quick_reply_shortcut_id`.

This will emit an [updateQuickReplyMessage](/constructor/updateQuickReplyMessage.md) update.

#### Deleting a quick reply shortcut message

    updateDeleteQuickReplyMessages#566fe7cd shortcut_id:int messages:Vector<int> = Update;

    ---functions---

    messages.deleteQuickReplyMessages#e105e910 shortcut_id:int id:Vector<int> = Updates;

To delete one or more messages from a quick reply shortcut, use [messages.deleteQuickReplyMessages](/method/messages.deleteQuickReplyMessages.md), passing the shortcut ID, and the list of message IDs to delete.  
This will also emit an [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) update.  

#### Renaming a quick reply shortcut

    updateQuickReplies#f9470ab2 quick_replies:Vector<QuickReply> = Update;

    ---functions---

    messages.editQuickReplyShortcut#5c003cef shortcut_id:int shortcut:string = Bool;

Use [messages.editQuickReplyShortcut](/method/messages.editQuickReplyShortcut.md) to rename a shortcut.  
This will emit an [updateQuickReplies](/constructor/updateQuickReplies.md) update to other logged-in sessions.  

#### Reordering quick reply shortcuts

    updateQuickReplies#f9470ab2 quick_replies:Vector<QuickReply> = Update;

    ---functions---

    messages.reorderQuickReplies#60331907 order:Vector<int> = Bool;

Use [messages.reorderQuickReplies](/method/messages.reorderQuickReplies.md) to reorder quick reply shortcuts (not the messages within them); pass in `order` the IDs of all created quick reply shortcuts, in the desired order.  
This will emit an [updateQuickReplies](/constructor/updateQuickReplies.md) update to other logged-in sessions.  

#### Deleting a quick reply shortcut

    updateDeleteQuickReply#53e6f1ec shortcut_id:int = Update;

    ---functions---

    messages.deleteQuickReplyShortcut#3cc04740 shortcut_id:int = Bool;

To completely delete a quick reply shortcut, use [messages.deleteQuickReplyShortcut](/method/messages.deleteQuickReplyShortcut.md).  
This will also emit an [updateDeleteQuickReply](/constructor/updateDeleteQuickReply.md) update to other logged-in sessions (and *no* [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) updates, even if all the messages in the shortcut are also deleted by this method).  

### Greeting messages

    inputBusinessRecipients#6f8b32aa flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<InputUser> = InputBusinessRecipients;

    inputBusinessGreetingMessage#194cb3b shortcut_id:int recipients:InputBusinessRecipients no_activity_days:int = InputBusinessGreetingMessage;

    businessRecipients#21108ff7 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> = BusinessRecipients;

    businessGreetingMessage#e519abab shortcut_id:int recipients:BusinessRecipients no_activity_days:int = BusinessGreetingMessage;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.updateBusinessGreetingMessage#66cdafc4 flags:# message:flags.0?InputBusinessGreetingMessage = Bool;

Telegram Business allows to configure a set of greeting messages, automatically sent to new users writing to us in private for the first time, or after a certain inactivity period.  

Use [account.updateBusinessGreetingMessage](/method/account.updateBusinessGreetingMessage.md) to set a (list of) greeting messages in `message`; to disable greetings, call the method without populating the `message` field.  

If populated, the `message` field must contain a [inputBusinessGreetingMessage](/constructor/inputBusinessGreetingMessage.md), see [the constructor page&nbsp;&raquo;](/constructor/inputBusinessGreetingMessage.md) for a description of its contents and the length limits for the intro title and description.  

The currently configured business greeting can be fetched by the current user through [userFull](/constructor/userFull.md).`business_greeting_message`, represented by a [businessGreetingMessage constructor&nbsp;&raquo;](/constructor/businessGreetingMessage.md), equivalent to the input counterpart.  

### Away messages

    inputBusinessRecipients#6f8b32aa flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<InputUser> = InputBusinessRecipients;

    businessAwayMessageScheduleAlways#c9b9e2b9 = BusinessAwayMessageSchedule;
    businessAwayMessageScheduleOutsideWorkHours#c3f2f501 = BusinessAwayMessageSchedule;
    businessAwayMessageScheduleCustom#cc4d9ecc start_date:int end_date:int = BusinessAwayMessageSchedule;

    inputBusinessAwayMessage#832175e0 flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:InputBusinessRecipients = InputBusinessAwayMessage;

    businessRecipients#21108ff7 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> = BusinessRecipients;

    businessAwayMessage#ef156a5c flags:# offline_only:flags.0?true shortcut_id:int schedule:BusinessAwayMessageSchedule recipients:BusinessRecipients = BusinessAwayMessage;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.updateBusinessAwayMessage#a26a7fa5 flags:# message:flags.0?InputBusinessAwayMessage = Bool;

Telegram Business allows to configure a set of "away" messages, automatically sent to users writing to us when we're offline, during closing hours, while we're on vacation, or in some other custom time period when we cannot immediately answer to the user.  

Use [account.updateBusinessAwayMessage](/method/account.updateBusinessAwayMessage.md) to set a (list of) away messages in `message`; to disable greetings, call the method without populating the `message` field.  

If populated, the `message` field must contain a [inputBusinessAwayMessage](/constructor/inputBusinessAwayMessage.md), see [the constructor page&nbsp;&raquo;](/constructor/inputBusinessAwayMessage.md) for a description of its contents.  

The currently configured business away message can be fetched by the current user through [userFull](/constructor/userFull.md).`business_away_message`, represented by a [businessAwayMessage constructor&nbsp;&raquo;](/constructor/businessAwayMessage.md), equivalent to the input counterpart.  

### Business introduction

    inputBusinessIntro#09c469cd flags:# title:string description:string sticker:flags.0?InputDocument = InputBusinessIntro;

    businessIntro#5a0a066d flags:# title:string description:string sticker:flags.0?Document = BusinessIntro;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.updateBusinessIntro#a614d034 flags:# intro:flags.0?InputBusinessIntro = Bool;

Telegram Business allows to configure the message and sticker of the [profile introduction&nbsp;&raquo;](/api/profile.md#introduction), shown to new users that don't have a private chat with us.  

Use [account.updateBusinessIntro](/method/account.updateBusinessIntro.md) to set a custom business introduction; invoke the same method without setting the `intro` flag to remove the custom business introduction, defaulting to a randomly-chosen introduction message and sticker (see [here&nbsp;&raquo;](/api/profile.md) for more info on default profile introductions).  

Changing the business introduction will emit an [updateUser](/constructor/updateUser.md), and the business introduction will be contained in [userFull](/constructor/userFull.md).`intro`.  

Note that the greeting sticker selection UI should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria, see [here&nbsp;&raquo;](/api/emoji-categories.md) for more info.  

### Business chat links

    inputBusinessChatLink#11679fa7 flags:# message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string = InputBusinessChatLink;

    businessChatLink#b4ae666f flags:# link:string message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string views:int = BusinessChatLink;

    account.businessChatLinks#ec43a2d1 links:Vector<BusinessChatLink> chats:Vector<Chat> users:Vector<User> = account.BusinessChatLinks;

    account.resolvedBusinessChatLinks#9a23af21 flags:# peer:Peer message:string entities:flags.0?Vector<MessageEntity> chats:Vector<Chat> users:Vector<User> = account.ResolvedBusinessChatLinks;

    ---functions---

    account.createBusinessChatLink#8851e68e link:InputBusinessChatLink = BusinessChatLink;
    account.getBusinessChatLinks#6f70dde1 = account.BusinessChatLinks;
    account.editBusinessChatLink#8c3410af slug:string link:InputBusinessChatLink = BusinessChatLink;
    account.deleteBusinessChatLink#60073674 slug:string = Bool;

    account.resolveBusinessChatLink#5492e5ee slug:string = account.ResolvedBusinessChatLinks;

[Business chat deep links](/api/links.md#business-chat-links) allow business owners to share pre-made links to their Telegram business account, optionally filling out the message input field with a pre-prepared message (with support for [styled text entities&nbsp;&raquo;](/api/entities.md)).  

There is no additional limit (apart from the usual [message_length_max](/constructor/config.md)) on the prepared message length (because the message text is *not* present in the URL's query string, rather it's fetched from the server using the link slug); each created business chat deep link also has a view counter.  

Use [account.createBusinessChatLink](/method/account.createBusinessChatLink.md) to create a business chat link, specifying in [inputBusinessChatLink](/constructor/inputBusinessChatLink.md) the message to pre-fill when users open the link, as well as a human-readable name for the link in `title`, useful when managing created links.  
The created [deep link](/api/links.md#business-chat-links) is returned in the `link` field, and may be shared directly or as a QR code.  

Use [account.getBusinessChatLinks](/method/account.getBusinessChatLinks.md) to fetch info about all created business chat links (including the view counter, indicating the number of times a business chat link was resolved (clicked on, scanned) by a user).  

Use [account.editBusinessChatLink](/method/account.editBusinessChatLink.md) to edit the information of a business chat link.  

Use [account.deleteBusinessChatLink](/method/account.deleteBusinessChatLink.md) to delete a business chat link.  

Use [account.resolveBusinessChatLink](/method/account.resolveBusinessChatLink.md) to open a business chat link, obtaining the peer to contact and (if set) the message to pre-fill, also increasing the link's view counter. 
 
The last three methods listed above take a business chat link slug, which should be extracted from a business chat link as specified [here&nbsp;&raquo;](/api/links.md#business-chat-links).  

All listed methods except [account.resolveBusinessChatLink](/method/account.resolveBusinessChatLink.md) require a Telegram Business subscription (currently included in [Telegram Premium](/api/premium.md) subscriptions).

An account may create a maximum of [business_chat_links_limit](/api/config.md#business-chat-links-limit) business chat links: attempts to exceed this limit will emit a `CHATLINKS_TOO_MUCH` RPC error, prompting the user to delete older links.  

### Connected bots

Users can connect Telegram bots that will process and answer messages **on their behalf**. This allows them to **seamlessly integrate** any existing tools and workflows, or add **AI assistants** that manage their chats.  

See [here &raquo;](/api/bots/connected-business-bots.md) for full documentation on business bots connected to business user accounts.  

### Re-enable ads

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.toggleSponsoredMessages#b9d9a38d enabled:Bool = Bool;

Since Telegram Business is currently included with the [Telegram Premium](/api/premium.md) subscription, and Telegram Premium subscribers do not see [sponsored messages in channels](/api/sponsored-messages.md).  

This may be problematic for business owners that may want to launch and view their own Telegram ads via the [Telegram ad platform&nbsp;&raquo;](https://ads.telegram.org).  

For this reason, the Telegram Business settings page should contain a toggle to re-enable Telegram ads for the current account, which should trigger a call to [account.toggleSponsoredMessages](/method/account.toggleSponsoredMessages.md).  

The current value of the toggle will be stored in [userFull](/constructor/userFull.md).`sponsored_enabled`.  

### Folder tags

Telegram Business users can use [folder tags, see here&nbsp;&raquo;](/api/folders.md#folder-tags) for more info.  

### Business features promo page

Telegram Business offers a set of additional features and raised limits: clients should be aware of the current subscription status to accordingly modify client behavior.  

    ---functions---
    
    help.getAppConfig#61e3f854 hash:int = help.AppConfig;

Clients should show a Telegram Business button in the settings.  
Clicking on this button in the settings should open a Telegram Business modal.  

[help.getAppConfig](/method/help.getAppConfig.md) to fetch info on how to build the Telegram Business modal, returning a list of Business feature identifiers in the [`business_promo_order` appConfig field](/api/config.md#business-promo-order): the modal should contain a row for each returned feature, ordered as specified in the returned array.  

Possible feature identifiers:

<!-- start business features 4 -->

#### `business_location`

Business users can set a [business location](#location)

#### `business_hours`

Business users can set [opening hours](#opening-hours)

#### `quick_replies`

Business users can create and use [quick reply shortcuts](#quick-reply-shortcuts)

#### `greeting_message`

Business users can set a [greeting message](#greeting-messages)

#### `away_message`

Business users can set an [away message](#away-messages)

#### `business_links`

Business users can create [business chat links](#business-chat-links)

#### `business_intro`

Business users can set a custom [business chat introduction](#business-introduction)

#### `business_bots`

Users can [connect business bots to their account&nbsp;&raquo;](/api/bots/connected-business-bots.md)

#### `emoji_status`

Business users can set a [custom emoji status](/api/emoji-status.md).

#### `folder_tags`

Business users can enable [folder tags](/api/folders.md#folder-tags).

#### `stories`

Business users can use [stories](/api/stories.md) to showcase products (i.e. no additional functionality needs to be implemented by clients, it's just another way to use stories).

<!-- end business features -->

# Forum topics


Telegram allows creating forums with multiple distinct topics.  

Bots can also make use of topics, if enabled through [@botfather](https://t.me/botfather).  

### Group forums

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    ---functions---

    channels.createChannel#91006707 flags:# broadcast:flags.0?true megagroup:flags.1?true for_import:flags.3?true forum:flags.5?true title:string about:string geo_point:flags.2?InputGeoPoint address:flags.2?string ttl_period:flags.4?int = Updates;

    channels.toggleForum#3ff75734 channel:InputChannel enabled:Bool tabs:Bool = Updates;

Forums may be created either by invoking [channels.createChannel](/method/channels.createChannel.md) with the `megagroup` and `forum` flags set, or by converting an existing [supergroup](/api/channel.md) into a forum using [channels.toggleForum](/method/channels.toggleForum.md) with `enabled=true`.  
If the group is a [basic group](/api/channel.md#basic-groups), it should be [upgraded to a supergroup](/api/channel.md#migration) before converting it into a forum.  

Forums can also be converted back to [supergroups](/api/channel.md) using [channels.toggleForum](/method/channels.toggleForum.md) with `enabled=false`.  

Note that the [channels.toggleForum](/method/channels.toggleForum.md) method can only be invoked by admins with owner rights.

Forums have the [channel](/constructor/channel.md).`forum` flag set, and conversation happens in distinct [forum topics](#forum-topics).  

Only users with [`manage_topics` admin rights](/api/rights.md) can create, modify and delete group forum topics.  

### Bot forums

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

Bots can also behave like forums if **Threaded mode** is enabled via [@botfather](https://t.me/botfather), this mode is especially useful for [AI chatbots &raquo;](/api/bots/ai.md).  

Note: this feature is subject to an additional fee for Telegram Star purchases as described in [Section 6.2.6](https://telegram.org/tos/bot-developers#6-2-6-enabling-topics-in-private-chats) of our Terms of Service for Bot Developers.

Bots with threaded mode enabled have the [user](/constructor/user.md).`bot_forum_view` flag set, and conversation happens in distinct [forum topics](#forum-topics).  

The bot will be able to create, modify and delete [bot forum topics &raquo;](#forum-topics) in chats with users, using the methods [specified below &raquo;](#forum-topics).    

If the bot's [user](/constructor/user.md).`bot_forum_can_manage_topics` flag is set, users will also be able to create, modify and delete bot forum topics in their private chat with the bot as specified below: this flag is controlled by the "Disallow users to create new threads" option in [@botfather](https://t.me/botfather).  

Note: while the API always allows users to send topic-less messages (that end up in the "General" topic) regardless of the value of the bot's [user](/constructor/user.md).`bot_forum_can_manage_topics`, graphical clients should prevent users from sending topic-less messages if the bot's [user](/constructor/user.md).`bot_forum_can_manage_topics` flag is set: in this case, before sending/forwarding the message(s), a new topic must first be created by invoking [messages.createForumTopic](/method/messages.createForumTopic.md), and the messages should be sent to the newly created topic, instead.  
In this case, the topic UI for the "General" topic should be replaced with the [View as messages &raquo;](#view-as-messages) UI, but should always show a "Type any message to create a new thread" bubble pinned to the bottom, letting the user know that sending a new message in the "General" topic will actually create a new topic and send that message there, instead.  

On the other hand, if [user](/constructor/user.md).`bot_forum_can_manage_topics` is **not** set, users cannot create, modify and delete bot forum topics (doing so will emit an `BOT_FORUM_CREATE_FORBIDDEN` RPC error), and the client should allow sending messages to the "General" topic.  

### Forum topics

    forumTopic#fcdad815 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true title_missing:flags.7?true id:int date:int peer:Peer title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;

Group forums and bot forums can have multiple topics where users may interact.  

Topics have a name (`title`) and an icon: the icon can be a [custom emoji](/api/custom-emoji.md) specified by the `icon_emoji_id`, or a default chat icon if `icon_emoji_id` is not set, filled with the color specified in `icon_color`.  
Topics can be temporarily `closed`, preventing further messages from being sent to the topic.  
Additionally, (only) the "General" topic may also be `hidden`.  

Note that [Telegram Premium](/api/premium.md) users can pass any custom emoji to `icon_emoji_id`, while other users can only use the custom emojis contained in the [inputStickerSetEmojiDefaultTopicIcons](/constructor/inputStickerSetEmojiDefaultTopicIcons.md) emoji pack.  
If the default chat icon is used, its color cannot be modified after creating the topic.  

#### Managing topics

    forumTopic#fcdad815 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true title_missing:flags.7?true id:int date:int peer:Peer title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;
    forumTopicDeleted#023f109b id:int = ForumTopic;

    inputStickerSetEmojiDefaultTopicIcons#44c1f8e9 = InputStickerSet;

    messageActionTopicCreate#d999256 flags:# title_missing:flags.1?true title:string icon_color:int icon_emoji_id:flags.0?long = MessageAction;
    messageActionTopicEdit#c0944820 flags:# title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = MessageAction;

    updatePinnedForumTopic#683b2c52 flags:# pinned:flags.0?true peer:Peer topic_id:int = Update;
    updatePinnedForumTopics#def143d0 flags:# peer:Peer order:flags.0?Vector<int> = Update;

    updateDeleteChannelMessages#c32d5b12 channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
    updateDeleteMessages#a20db0e5 messages:Vector<int> pts:int pts_count:int = Update;

    ---functions---

    messages.createForumTopic#2f98c3d5 flags:# title_missing:flags.4?true peer:InputPeer title:string icon_color:flags.0?int icon_emoji_id:flags.3?long random_id:long send_as:flags.2?InputPeer = Updates;
    messages.editForumTopic#cecc1134 flags:# peer:InputPeer topic_id:int title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = Updates;

    messages.deleteTopicHistory#d2816f10 peer:InputPeer top_msg_id:int = messages.AffectedHistory;

    messages.updatePinnedForumTopic#175df251 peer:InputPeer topic_id:int pinned:Bool = Updates;
    messages.reorderPinnedForumTopics#e7841f0 flags:# force:flags.0?true peer:InputPeer order:Vector<int> = Updates;

All of the topic modification methods specified above can only be invoked by users/bots with [`manage_topics` admin rights](/api/rights.md) (for [group forums &raquo;](#group-forums)), by bots (for [bot forums &raquo;](#bot-forums)), or by any user (for [bot forums &raquo;](#bot-forums) if the bot's [user](/constructor/user.md).`bot_forum_can_manage_topics` flag is set).  

Topics can be created by using the [messages.createForumTopic](/method/messages.createForumTopic.md) method, and may be modified with the [messages.editForumTopic](/method/messages.editForumTopic.md) method: these actions will generate [messageActionTopicCreate](/constructor/messageActionTopicCreate.md)/[messageActionTopicEdit](/constructor/messageActionTopicEdit.md) service messages.  

All topics except for the "General" topic can be deleted by invoking [messages.deleteTopicHistory](/method/messages.deleteTopicHistory.md), with the topic ID.  
For [bot forums &raquo;](#bot-forums), this method may be invoked both by the bot and (if the bot's [user](/constructor/user.md).`bot_forum_can_manage_topics` flag is set) by the user chatting with the bot.  

There is no dedicated update emitted when a topic is deleted; instead, topic deletion is propagated to clients (including bots) through two complementary mechanisms.

Firstly, deleting a topic deletes **all** of its messages, including the [messageActionTopicCreate](/constructor/messageActionTopicCreate.md) service message that created the topic (whose `id` is equal to the topic ID itself, see [below &raquo;](#interacting-within-topics)).  
These deletions are delivered as ordinary message deletion updates: [updateDeleteChannelMessages](/constructor/updateDeleteChannelMessages.md) for [group forums &raquo;](#group-forums) (i.e. when the forum is a [channel/supergroup](/api/channel.md)), or [updateDeleteMessages](/constructor/updateDeleteMessages.md) for [bot forums &raquo;](#bot-forums) (i.e. when the forum is hosted in a private chat with a bot, and is thus identified by a [user](/constructor/user.md) peer).  
When the deleted message IDs contain the topic's root message (the message with `id` equal to the topic ID), clients and bots should treat the entire topic as deleted.  

Secondly, when refreshing the state of one or more topics – for example after receiving the message deletion updates above, or after receiving an [updatePinnedForumTopic](/constructor/updatePinnedForumTopic.md) for an unknown topic – clients fetch them again using [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md): the response will contain a [forumTopicDeleted](/constructor/forumTopicDeleted.md) constructor (instead of a [forumTopic](/constructor/forumTopic.md)) for each topic that no longer exists, confirming the deletion.  

Topics may be pinned or unpinned using [messages.updatePinnedForumTopic](/method/messages.updatePinnedForumTopic.md), emitting [updatePinnedForumTopic](/constructor/updatePinnedForumTopic.md) or [updatePinnedForumTopics](/constructor/updatePinnedForumTopics.md) updates.  
Use [messages.reorderPinnedForumTopics](/method/messages.reorderPinnedForumTopics.md) to reorder pinned topics.  
You can pin at most `topics_pinned_limit` topics per forum, as specified by the [client configuration parameters&nbsp;&raquo;](/api/config.md#client-configuration).

#### Fetching topics

    messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;

    ---functions---

    messages.getForumTopics#3ba47bff flags:# peer:InputPeer q:flags.0?string offset_date:int offset_id:int offset_topic:int limit:int = messages.ForumTopics;
    messages.getForumTopicsByID#af0a4a08 peer:InputPeer topics:Vector<int> = messages.ForumTopics;

To fetch the topic list of a forum, use [messages.getForumTopics](/method/messages.getForumTopics.md); the same method can be used to search topics by their name.  
To fetch information about one or more topics by their ID, use [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md).  

Messages and updates from forum topics will have the `top_msg_id` flag set and populated with the topic ID (except for the "General" topic).  

#### Interacting within topics

    messageActionTopicCreate#d999256 flags:# title_missing:flags.1?true title:string icon_color:int icon_emoji_id:flags.0?long = MessageAction;

    forumTopic#fcdad815 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true title_missing:flags.7?true id:int date:int peer:Peer title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;
    forumTopicDeleted#023f109b id:int = ForumTopic;

    inputReplyToMessage#3bd4b7c2 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int monoforum_peer_id:flags.5?InputPeer todo_item_id:flags.6?int poll_option:flags.7?bytes = InputReplyTo;

Every forum has a non-deletable "General" topic, with `id=1`; other topics will have other IDs, equal to the [messageActionTopicCreate](/constructor/messageActionTopicCreate.md) service message that created the topic.  

To send messages to the "General" topic, just use [messages.sendMessage](/method/messages.sendMessage.md) as usual, as if you were writing to a normal supergroup.  
On the other hand, topics with `id != 1` are just the [message thread](/api/threads.md) of the [messageActionTopicCreate](/constructor/messageActionTopicCreate.md) service message that created that topic.  
This means that topics should be treated similarly to [message threads](/api/threads.md) by the client.  
To send messages to these topics, pass the topic ID to the `reply_to_msg_id` parameter of [inputReplyToMessage](/constructor/inputReplyToMessage.md), passed to `reply_to` when invoking [messages.sendMessage](/method/messages.sendMessage.md), [messages.sendMedia](/method/messages.sendMedia.md) et cetera.  

To reply to messages within a topic, pass the ID of the message to reply to [inputReplyToMessage](/constructor/inputReplyToMessage.md).`reply_to_msg_id`, and, unless we're replying to a message in the "General" topic, pass the topic ID to [inputReplyToMessage](/constructor/inputReplyToMessage.md).`top_msg_id`.  
Note that when replying to messages in a topic, the [inputReplyToMessage](/constructor/inputReplyToMessage.md).`top_msg_id` field must contain the topic ID **if and only if** we're replying to messages in [forum topics](/api/forum.md#forum-topics) different from the "General" topic (i.e. `reply_to_msg_id` is set and `reply_to_msg_id != topicID` and `topicID != 1`): this way, if the replied-to message is deleted before the method finishes execution, the value in this field will be used to send the message to the correct topic, instead of the "General" topic.  
Also note that since [message threads](/api/threads.md) can't have nested message threads, topics (except for the "General" topic) also can't have message threads (so replies to messages within topics won't generate further message threads).  

#### View as messages

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    updateChannelViewForumAsMessages#7b68920 channel_id:long enabled:Bool = Update;

    ---functions---

    channels.toggleViewForumAsMessages#9738bb15 channel:InputChannel enabled:Bool = Updates;

Only applicable to supergroup forums.  

Users may also choose to display messages from all topics as if they were sent to a normal group, using a "View as messages" setting in the local client.  
This setting only affects the current account, and is synced to other logged in sessions using the [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md) method; invoking this method will update the value of the `view_forum_as_messages` flag of [channelFull](/constructor/channelFull.md) or [dialog](/constructor/dialog.md) and emit an [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md).  

#### Tabbed or list-based forum UI

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    ---functions---

    channels.toggleForum#3ff75734 channel:InputChannel enabled:Bool tabs:Bool = Updates;

Only applicable to supergroup forums.  

Supergroup forums can use either a tabbed or list-based UI for topic selection, according to the value of the [channel](/constructor/channel.md).`forum_tabs` flag.  

This flag can be toggled using [channels.toggleForum](/method/channels.toggleForum.md), by passing `enabled=true` and `tabs=true|false` to enable or disable the tabbed UI.  

### Monoforums

Monoforums are a special kind of forum, used to implement direct messages to channels.  

While in the API they are sometimes called "monoforums", they actually share more similarities with the saved messages API: see [here &raquo;](/api/monoforum.md) for the full documentation on direct channel messages.  
# Discussion groups


[Groups](/api/channel.md) can be associated to a [channel](/api/channel.md) as a [discussion group](https://telegram.org/blog/privacy-discussions-web-bots), to allow users to discuss about posts.  

### Channel comments

    boolFalse#bc799737 = Bool;
    boolTrue#997275b5 = Bool;
    
    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
    
    messageReplies#83d60fc2 flags:# comments:flags.0?true replies:int replies_pts:int recent_repliers:flags.1?Vector<Peer> channel_id:flags.0?long max_id:flags.2?int read_max_id:flags.3?int = MessageReplies;

    messages.discussionMessage#a6341782 flags:# messages:Vector<Message> max_id:flags.0?int read_inbox_max_id:flags.1?int read_outbox_max_id:flags.2?int unread_count:int chats:Vector<Chat> users:Vector<User> = messages.DiscussionMessage;

    ---functions---

    channels.setDiscussionGroup#40582bb2 broadcast:InputChannel group:InputChannel = Bool;
    channels.getGroupsForDiscussion#f5dad378 = messages.Chats;

    messages.getDiscussionMessage#446972fd peer:InputPeer msg_id:int = messages.DiscussionMessage;

A discussion group can be associated to a channel using [channels.setDiscussionGroup](/method/channels.setDiscussionGroup.md).  
The discussion group can be accessed in the client by clicking on the discuss button of the channel, or by accessing the [comment section](/api/threads.md) of a specific post; the discussion group ID is also present in the `linked_chat_id` field of the [channelFull](/constructor/channelFull.md) constructor.  

All messages sent to the channel will also be forwarded to the linked group (with sender peer `from_id` equal to the peer of the linked channel); those messages will also be automatically [pinned](/api/pin.md) in the group.  

The comment section of a channel post is simply the [message thread](/api/threads.md) of the automatically forwarded channel message in the linked discussion supergroup.  
Thus, the comment section of a particular post can be disabled by removing the auto-forwarded channel post message from the discussion group.  

A [messageReplies](/constructor/messageReplies.md) constructor will be attached to the channel post in the original channel, containing information about the comment section, specifically:

* `replies.channel_id` will contain the ID of the linked discussion supergroup
* `replies.recent_repliers` will contain information about the last few comment posters for a specific thread, to show a small list of commenter profile pictures in client previews.
* `replies.replies` will contain the total number of replies in the comment section.
* `replies.max_id` *may* contain the ID of the latest message in the comment section, if any.
* `replies.replies_pts` *may* contain the PTS of the auto-forwarded channel message that started the comment section.

The same [messageReplies](/constructor/messageReplies.md) constructor with the usual flags for a [thread](/api/threads.md) (i.e. without `channel_id`, `recent_replies`) will also be present in the message automatically forwarded to the discussion group, as for all group messages that start a [thread](/api/threads.md).  

Use [messages.getDiscussionMessage](/method/messages.getDiscussionMessage.md) to obtain the initial messages of the [message thread](/api/threads.md) of the auto-forwarded channel message in the linked discussion supergroup.  

The messages are returned in a reverse chronological order (i.e., in order of decreasing message ID); thus the last message returned by the method will be the auto-forwarded channel message that started the comment section.  

#### @replies

    messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;
    
    messageReplyHeader#1b97dd66 flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int todo_item_id:flags.11?int poll_option:flags.12?bytes = MessageReplyHeader;
    
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
    updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;

    ---functions---

    contacts.blockFromReplies#29a8962c flags:# delete_message:flags.0?true delete_history:flags.1?true report_spam:flags.2?true msg_id:int = Updates;

    contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;

Since a user can comment in channel posts without joining the actual [discussion supergroup](/api/discussion.md), there must be a way for them to receive notifications about replies in comment sections.  
For this reason, a special `@replies` username is provided.
Its ID for main and testing endpoints can be seen in the [tdlib sources](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3010).  

When someone replies to one of our messages in the comment section of a channel post, and the user is not subscribed to the discussion group, the client will receive two updates:

* An [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) from the discussion group itself, structured just like any other update coming from a subscribed group, with:
    * `id` set to the ID of the reply
    * `from_id` set to the peer that replied to us
    * `peer_id` set to the peer of the [discussion group](/api/discussion.md)
    * `reply_to.reply_to_msg_id` set to the ID of our message
    * `reply_to.reply_to_top_id` set to the [thread ID](/api/threads.md).  
* An [updateNewMessage](/constructor/updateNewMessage.md)
    * `id` set to the common ID sequence for users
    * `from_id` set to the peer of `@replies`
    * `peer_id` set to our own peer
    * `fwd_from.saved_from_msg_id` set to the ID of the reply
    * `fwd_from.from_id` set to the peer that replied to us
    * `reply_to.reply_to_peer_id` set to the peer of the [discussion group](/api/discussion.md)
    * `reply_to.reply_to_msg_id` set to the ID of our message
    * `reply_to.reply_to_top_id` set to the [thread ID](/api/threads.md)

Clients should display messages coming from `@replies` as a read-only supergroup, with each reply displayed as a separate message from the author of the reply, with a "View in chat" button like for channel comments.  

[contacts.blockFromReplies](/method/contacts.blockFromReplies.md) may be used to stop getting notifications about thread replies from a certain user in `@replies`.

### Linking a discussion group

To obtain a list of administered supergroups that a channel admin can possibly associate with a channel, use [channels.getGroupsForDiscussion](/method/channels.getGroupsForDiscussion.md).  
Returned [basic group chats](/api/channel.md#basic-groups) must be first [upgraded to supergroups](/api/channel.md#migration) before they can be set as a discussion group.  
Before linking a supergroup to a channel, access to the supergroup's old messages must also be enabled using [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md).  

To set a returned supergroup as a discussion group use [channels.setDiscussionGroup](/method/channels.setDiscussionGroup.md).

Schema:  

    boolFalse#bc799737 = Bool;
    boolTrue#997275b5 = Bool;

    messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
    
    ---functions---

    channels.setDiscussionGroup#40582bb2 broadcast:InputChannel group:InputChannel = Bool;
    channels.getGroupsForDiscussion#f5dad378 = messages.Chats;
    
    channels.togglePreHistoryHidden#eabbb94c channel:InputChannel enabled:Bool = Updates;

### Requiring users to join the group

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    ---functions---

    channels.toggleJoinToSend#e4cb9580 channel:InputChannel enabled:Bool = Updates;

Admins may use [channels.toggleJoinToSend](/method/channels.toggleJoinToSend.md) to force users to join a discussion group before commenting.  
The [`channel.join_to_send`](/constructor/channel.md) flag will be set accordingly, and all attempts by non-members to send a message to the group will return a `CHAT_GUEST_SEND_FORBIDDEN` RPC error.  

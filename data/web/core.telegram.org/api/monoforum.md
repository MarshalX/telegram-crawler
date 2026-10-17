# Direct messages to channels


Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.  

### Direct messages

While in the API direct channel message groups are sometimes called "monoforums" they actually share more similarities with the [saved messages API](/api/saved-messages.md).  

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;
    
    inputReplyToMonoForum#69d66c45 monoforum_peer_id:InputPeer = InputReplyTo;
    inputReplyToMessage#3bd4b7c2 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int monoforum_peer_id:flags.5?InputPeer todo_item_id:flags.6?int poll_option:flags.7?bytes = InputReplyTo;

    monoForumDialog#64407ea7 flags:# unread_mark:flags.3?true nopaid_messages_exception:flags.4?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_reactions_count:int draft:flags.1?DraftMessage = SavedDialog;
    
    updateReadMonoForumInbox#77b0e372 channel_id:long saved_peer_id:Peer read_max_id:int = Update;
    updateReadMonoForumOutbox#a4a79376 channel_id:long saved_peer_id:Peer read_max_id:int = Update;

    updateDraftMessage#edfc111e flags:# peer:Peer top_msg_id:flags.0?int saved_peer_id:flags.1?Peer draft:DraftMessage = Update;
    updateChannelReadMessagesContents#25f324f7 flags:# channel_id:long top_msg_id:flags.0?int saved_peer_id:flags.1?Peer messages:Vector<int> = Update;
    updateDialogUnreadMark#b658f23e flags:# unread:flags.0?true peer:DialogPeer saved_peer_id:flags.1?Peer = Update;
    updateMessageReactions#1e297bfa flags:# peer:Peer msg_id:int top_msg_id:flags.0?int saved_peer_id:flags.1?Peer reactions:MessageReactions = Update;

    ---functions---
    
    channels.updatePaidMessagesPrice#4b12327b flags:# broadcast_messages_allowed:flags.0?true channel:InputChannel send_paid_messages_stars:long = Updates;

    messages.getSavedDialogs#1e91fc99 flags:# exclude_pinned:flags.0?true parent_peer:flags.1?InputPeer offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.SavedDialogs;
    messages.getSavedDialogsByID#6f6f9c96 flags:# parent_peer:flags.1?InputPeer ids:Vector<InputPeer> = messages.SavedDialogs;
    messages.getSavedHistory#998ab009 flags:# parent_peer:flags.0?InputPeer peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
    messages.readSavedHistory#ba4a3b5b parent_peer:InputPeer peer:InputPeer max_id:int = Bool;
    messages.deleteSavedHistory#4dc5085f flags:# parent_peer:flags.0?InputPeer peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
    messages.getSearchCounters#1bbcf300 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer top_msg_id:flags.0?int filters:Vector<MessagesFilter> = Vector<messages.SearchCounter>;
    messages.getSearchResultsCalendar#6aa3f6bd flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int offset_date:int = messages.SearchResultsCalendar;
    messages.getSearchResultsPositions#9c7f2f10 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int limit:int = messages.SearchResultsPositions;

    messages.markDialogUnread#8c5006f8 flags:# unread:flags.0?true parent_peer:flags.1?InputPeer peer:InputDialogPeer = Bool;
    messages.getDialogUnreadMarks#21202222 flags:# parent_peer:flags.0?InputPeer = Vector<DialogPeer>;

    messages.updatePinnedMessage#d2aaf7ec flags:# silent:flags.0?true unpin:flags.1?true pm_oneside:flags.2?true peer:InputPeer id:int = Updates;
    messages.unpinAllMessages#62dd747 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;

    messages.getUnreadReactions#bd7f90ac flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
    messages.readReactions#9ec44f93 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;
    
    channels.getMessageAuthor#ece2a0e6 channel:InputChannel id:int = User;

Direct channel messages can be toggled using [channels.updatePaidMessagesPrice](/method/channels.updatePaidMessagesPrice.md), passing the ID of the channel to `channel`: the same method can also be used to set a price in [Telegram Stars](/api/stars.md) users must pay to send direct messages to the channel (or to send messages to the supergroup, see [paid messages &raquo;](/api/paid-messages.md)).  

Once enabled, the [channel](/constructor/channel.md).`broadcast_messages_allowed` flag will be set and the [channel](/constructor/channel.md).`linked_monoforum_id` will be automatically populated with the ID of a new special [supergroup](/api/channel.md), also called a **monoforum**.  

To send a direct message to the channel, users simply have to send a message to the associated monoforum: unlike for normal supergroups/forums there's no need to join it.  

Monoforums have the following special characteristics:

* The [channel](/constructor/channel.md).`id` of a monoforum will have a range different from those of normal supergroups and channels (this is especially relevant when generating and categorizing the associated [bot API ID, see here &raquo;](/api/bots/ids.md#monoforum-ids) for the correct procedure to use for monoforum IDs).  
* The [channel](/constructor/channel.md).`monoforum` flag will be set **only** for the monoforum.
* The [channel](/constructor/channel.md).`broadcast_messages_allowed` flag will be set **only** for the associated channel.
* The [channel](/constructor/channel.md).`linked_monoforum_id` of the monoforum will be set to the ID of the associated channel.  
  * As mentioned above, the [channel](/constructor/channel.md).`linked_monoforum_id` of the associated channel will be set to the ID of the associated monoforum.  
* All messages sent to the monoforum are split into "topics", reusing the same UI used for [tabbed forums](/api/forum.md#tabbed-or-list-based-forum-ui) (note: monoforums should use the tabbed forum UI regardless of the value of [channel](/constructor/channel.md).`forum_tabs`).  

  Each topic is associated to exactly one user, and contains only the direct message history between the user and the channel itself.  

  Topics are identified by the `saved_peer_id` field of [message](/constructor/message.md) and [messageService](/constructor/messageService.md), which will be equal to the ID of the user.  

  Of course, this means monoforum topics do **not** share their implementation with forum topics (which is based on threads): this also means that, unlike normal forums, monoforums fully support [message threads](/api/threads.md), as they are not used for topics.  
  
  Note that the [message](/constructor/message.md).`saved_peer_id` field is also used to implement a distinct feature, [saved message dialogs &raquo;](/api/saved-messages.md#saved-message-dialogs): in this case, the `peer_id` will be equal to the ID of the currently logged in user, instead of the ID of a monoforum. 

* Administrators of the channel **with the [manage_direct_messages admin right &raquo;](/constructor/chatAdminRights.md)** can view and reply to all messages sent by all topics of the monoforum.  

  To send messages to a specific monoforum topic/user, when invoking [messages.sendMessage](/method/messages.sendMessage.md) and the other methods, channel administrators must pass an [inputReplyToMonoForum](/constructor/inputReplyToMonoForum.md) to `reply_to`, with `monoforum_peer_id` equal to the topic ID (aka `saved_peer_id`): the resulting outgoing message will have a `saved_peer_id` equal to the passed `monoforum_peer_id` (equal and set for both for the administrator, and for the receiving user).  

  The message will be sent on behalf of the channel associated to the monoforum (i.e. `send_as` will be forcefully set by the server to the [(monoforum's) channel](/constructor/channel.md).`linked_monoforum_id`): custom `send_as` values are not allowed and are simply ignored.  

  Monoforum admins (users only, not bots) can invoke [channels.getMessageAuthor](/method/channels.getMessageAuthor.md) to get the original sender of a message sent by other monoforum admins to the monoforum, on behalf of the channel associated to the monoforum.  

  To reply to a message within a monoforum topic, pass [inputReplyToMessage](/constructor/inputReplyToMessage.md) with the `reply_to_msg_id` and other flags populated as usual, and `monoforum_peer_id` equal to the topic ID (aka `saved_peer_id`); unlike for normal forums, do **not** populate `top_msg_id`.  

  The following methods can all be used by channel administrators to work with monoforums.  

  * Use [messages.getSavedDialogs](/method/messages.getSavedDialogs.md)/[messages.getSavedDialogsByID](/method/messages.getSavedDialogsByID.md) with `parent_peer` equal to the ID of the monoforum to obtain the topic list, or a subset of the topic list, always returned as a [monoForumDialog](/constructor/monoForumDialog.md).  

  The following methods require `parent_peer` to be set to the ID of the monoforum, and `peer` to be set to the ID of the topic (otherwise, they will affect saved/normal dialogs instead of monoforum topics):
  
  * Use [messages.getSavedHistory](/method/messages.getSavedHistory.md) to fetch messages from the message history of a topic (should only be used in newly logged in clients that don't have these messages already cached, as during normal operation monoforum topic messages are automatically delivered to the client using [updates](/api/updates.md) as usual).  
  * Use [messages.readSavedHistory](/method/messages.readSavedHistory.md) to mark topic messages as read.  
  * Use [messages.deleteSavedHistory](/method/messages.deleteSavedHistory.md) to bulk-delete messages from a topic.  
  * Use [messages.markDialogUnread](/method/messages.markDialogUnread.md), [messages.getDialogUnreadMarks](/method/messages.getDialogUnreadMarks.md) to mark/unmark specific monoforum topics as unread, and to fetch existing unread marks.  
  * Use [messages.getUnreadReactions](/method/messages.getUnreadReactions.md), [messages.readReactions](/method/messages.readReactions.md) to work with reactions 
  
  [messages.updatePinnedMessage](/method/messages.updatePinnedMessage.md) can be used to pin a message in a topic just by passing the monoforum ID to `peer` and the message ID to `id` (the message will be automatically pinned in the containing topic, not in all topics); messages pinned in a topic can be fetched [as described here &raquo;](/api/pin.md#getting-pinned-messages), with the difference that when invoking [messages.search](/method/messages.search.md), `peer` must be equal to the ID of the monoforum and `saved_peer_id`=id of the topic. 
  Use [messages.unpinAllMessages](/method/messages.unpinAllMessages.md) to unpin all messages in a monoforum, and optionally set the `saved_peer_id` flag to unpin only messages within the specified topic.  
  
  
  To search for messages within a monoforum, use the usual [messages.search](/method/messages.search.md), [messages.getSearchCounters](/method/messages.getSearchCounters.md), [messages.getSearchResultsCalendar](/method/messages.getSearchResultsCalendar.md), [messages.getSearchResultsPositions](/method/messages.getSearchResultsPositions.md) methods with `peer`=ID of the monoforum.  
  To search for messages within a monoforum topic, additionally set the `saved_peer_id` to the id of the topic.  

  [messages.getPinnedSavedDialogs](/method/messages.getPinnedSavedDialogs.md), [messages.toggleSavedDialogPin](/method/messages.toggleSavedDialogPin.md), [messages.reorderPinnedSavedDialogs](/method/messages.reorderPinnedSavedDialogs.md) can only be used for [saved messages](/api/saved-messages.md), **not** monoforums.

  Admins will receive [updateReadMonoForumInbox](/constructor/updateReadMonoForumInbox.md)/[updateReadMonoForumOutbox](/constructor/updateReadMonoForumOutbox.md) updates instead of [updateReadChannelInbox](/constructor/updateReadChannelInbox.md)/[updateReadChannelOutbox](/constructor/updateReadChannelOutbox.md).  

  Admins will also receive an additional `saved_peer_id` flag in [updateDraftMessage](/constructor/updateDraftMessage.md), [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md), [updateDialogUnreadMark](/constructor/updateDialogUnreadMark.md), [updateMessageReactions](/constructor/updateMessageReactions.md) updates received from monoforums, containing the topic ID.  

* Non-administrators can only view and send messages to their own topic.  
  
  To send a direct message to the channel, users simply have to send a message to the associated monoforum: unlike for normal supergroups/forums there's no need to join the monoforum.  
  
  Outgoing and incoming monoforum messages will still be identified by the `saved_peer_id`, but there's no need to set [inputReplyToMonoForum](/constructor/inputReplyToMonoForum.md) or [inputReplyToMessage](/constructor/inputReplyToMessage.md).`monoforum_peer_id` when sending messages to the monoforum.  
  
  From the user side monoforums are, as the name implies, single-topic forums, so they should be treated similarly to supergroups when working with the API.  
  
  For graphical clients, the user-side UI should be similar to the one used for one-to-one chats.  

  To interact with messages in a monoforum as a non-admin user, use all the methods usually used for supergroups, **not** the `messages.*Saved*` variants, without any of the modified `saved_*` arguments listed above, which can only be used by monoforum admins.  

  The same goes for *some* updates: non-admin users will never receive an additional `saved_peer_id` flag in [updateDraftMessage](/constructor/updateDraftMessage.md), [updateDialogUnreadMark](/constructor/updateDialogUnreadMark.md), but they **will** receive it for [updateMessageReactions](/constructor/updateMessageReactions.md), [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md).  

  Likewise, non-admin users will never receive [updateReadMonoForumInbox](/constructor/updateReadMonoForumInbox.md)/[updateReadMonoForumOutbox](/constructor/updateReadMonoForumOutbox.md) updates instead of [updateReadChannelInbox](/constructor/updateReadChannelInbox.md)/[updateReadChannelOutbox](/constructor/updateReadChannelOutbox.md)

### Paid direct messages

    ---functions---

    channels.updatePaidMessagesPrice#4b12327b flags:# broadcast_messages_allowed:flags.0?true channel:InputChannel send_paid_messages_stars:long = Updates;

The channel owner can choose to charge a certain amount of [stars](/api/stars.md) to users that wish to send them direct messages.  

To enable or disable paid direct messages, populate the `send_paid_messages_stars` field of [channels.updatePaidMessagesPrice](/method/channels.updatePaidMessagesPrice.md) accordingly: remember, always pass to `channel` the ID of the channel, **not** the ID of the linked monoforum (this is in contrast with paid messages in supergroups or normal forums, where `channel` must take the ID of the supergroup/monoforum).  

See [here &raquo;](/api/paid-messages.md) for more info on the full flow.  

### Suggested posts

Telegram offers a powerful monetization feature to channel administrators: **suggested posts**. 

Posts can be suggested through the channel's monoforum, see [here &raquo;](/api/suggested-posts.md) for the full flow.  

### Monoforum links

Monoforum links can be used to open the direct messages chat (aka monoforum) associated to a channel, see [here for more info on monoforum &raquo;](/api/links.md#monoforum-links).  

**Note**: when sharing messages sent to a monoforum, use [normal message links &raquo;](/api/links.md#message-links) with the ID of the monoforum, not the ID of the associated channel; the same rule applies for all other chat-related links involving a monoforum.  

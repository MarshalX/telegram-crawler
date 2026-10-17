# Message threads


Telegram allows commenting on a [channel post](/api/channel.md) or on a generic [supergroup message](/api/channel.md), thanks to message threads.

### Message threads

Schema:

    messageReplyHeader#1b97dd66 flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int todo_item_id:flags.11?int poll_option:flags.12?bytes = MessageReplyHeader;
    
    messageReplies#83d60fc2 flags:# comments:flags.0?true replies:int replies_pts:int recent_repliers:flags.1?Vector<Peer> channel_id:flags.0?long max_id:flags.2?int read_max_id:flags.3?int = MessageReplies;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    ---functions---

    messages.search#29ee847a flags:# peer:InputPeer q:string from_id:flags.0?InputPeer saved_peer_id:flags.2?InputPeer saved_reaction:flags.3?Vector<Reaction> top_msg_id:flags.1?int filter:MessagesFilter min_date:int max_date:int offset_id:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;

Threads are usually automatically created when replying to any message in a group.  
For example, all replies to a message with ID `420` are associated to thread with ID `420`, unique to this group; this thread ID is contained in the `reply_to_top_id` field of `reply_to` [messageReplyHeader](/constructor/messageReplyHeader.md), along with an eventual `reply_to_msg_id`, for replies to messages within a thread.  
Replies to messages in a thread are part of the same thread, and do not spawn new threads.  

When receiving a [message](/constructor/message.md) from a group that is also the top of a thread (the message with ID `420`), the `replies` optional field will contain a [messageReplies](/constructor/messageReplies.md) constructor, containing the message ID and [PTS](/api/updates.md) of the latest reply in the thread, and the message ID of the latest read thread reply, along with the total number of replies in the thread.  

Replies to a thread can also be manually fetched using [messages.search](/method/messages.search.md), providing to `top_msg_id` the thread ID.  

### Channel comments

The same [messageReplies](/constructor/messageReplies.md) constructor seen above will also be contained in channel posts, this time containing information about the comment section of a specific channel post, see [here&nbsp;&raquo;](/api/discussion.md) for more info.
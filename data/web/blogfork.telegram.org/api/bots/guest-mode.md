# Guest mode for bots


Guest bots can be queried by username from **any** non-secret private chat, group and supergroup (except for groups/supergroups with [content protection &raquo;](/api/content-protection.md#for-groups-and-channels) enabled), posting their results directly into the chat, even if they're not a member.  

Guest mode is similar to [inline queries&nbsp;&raquo;](/api/bots/inline.md), except that the bot itself directly posts the resulting message as a guest in the chat.  

A bot supports guest mode if the [user](/constructor/user.md).`bot_guestchat` flag is set on its profile.  

### Invoking a guest bot

    topPeerCategoryBotsGuestChat#6c24f3dd = TopPeerCategory;

    ---functions---

    contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;

To invoke a guest bot, the user mentions its `@username` in a chat (up to 3 guest bots can be mentioned at the same time): the username must [resolve](/method/contacts.resolveUsername.md) to a bot whose [user](/constructor/user.md).`bot_guestchat` flag is set.  

The list of frequently used guest bots is available via the [topPeerCategoryBotsGuestChat](/constructor/topPeerCategoryBotsGuestChat.md) [top peer rating&nbsp;&raquo;](/api/top-rating.md) category, fetched by setting the `bots_guestchat` flag when invoking [contacts.getTopPeers](/method/contacts.getTopPeers.md).  

### Handling guest queries (bot side)

    updateBotGuestChatQuery#cdd4093d flags:# query_id:long message:Message reference_messages:flags.0?Vector<Message> qts:int = Update;

    ---functions---

    messages.setBotGuestChatResult#b8f106e3 query_id:long result:InputBotInlineResult = InputBotInlineMessageID;

When a user invokes a guest bot, the bot receives an [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md) update (delivered to bots through the `qts` [update sequence&nbsp;&raquo;](/api/updates.md)), containing:

* `query_id` — the query identifier, to be passed back when answering.
* `message` — the message that triggered the query.
* `reference_messages` — additional context messages referenced by the triggering message (for example replied-to messages).

The bot answers the query by invoking [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md), passing the `query_id` and an [InputBotInlineResult](/type/InputBotInlineResult.md) describing the message to post into the chat (the same result format used when [answering inline queries&nbsp;&raquo;](/api/bots/inline.md#2-answering-to-an-inline-query)).  

The method returns an [InputBotInlineMessageID](/type/InputBotInlineMessageID.md) identifying the posted message.  

### Guest messages
    
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

Messages posted by a guest bot have their [message](/constructor/message.md).`guestchat_via_from` field set to the peer (user or chat) that invoked the guest bot.  

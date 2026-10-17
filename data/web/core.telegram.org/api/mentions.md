# Mentions and replies


Telegram allows mentioning other users in case of urgent duckling matters, and quickly navigating to those mentions in order to read them as swiftly as possible.

    messageEntityMention#fa04579d offset:int length:int = MessageEntity;
    messageEntityMentionName#dc7b1140 offset:int length:int user_id:long = MessageEntity;
    inputMessageEntityMentionName#208e68c9 offset:int length:int user_id:InputUser = MessageEntity;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    
    channelParticipantsMentions#e04b5ceb flags:# q:flags.0?string top_msg_id:flags.1?int = ChannelParticipantsFilter;
    
    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
    
    channels.getParticipants#77ced9d0 channel:InputChannel filter:ChannelParticipantsFilter offset:int limit:int hash:long = channels.ChannelParticipants;

Mentions are implemented as [message entities](/api/entities.md), passed to the [messages.sendMessage](/method/messages.sendMessage.md) method:

* [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md) - Used when sending messages, allows mentioning a user [inline, even for users that don't have a @username](https://t.me/botfather)
* [messageEntityMentionName](/constructor/messageEntityMentionName.md) - Incoming message counterpart of [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md)
* [messageEntityMention](/constructor/messageEntityMention.md) - [@botfather](https://t.me/botfather) (this entity is generated automatically server-side for @usernames in messages, no need to provide it manually)

Incoming [messages](/constructor/message.md) mentioning to the current user will have the `mentioned` flag set, and will contain one or more [messageEntityMention](/constructor/messageEntityMention.md) and [messageEntityMentionName](/constructor/messageEntityMentionName.md) constructors.  

Graphical clients can show a list of mentionable users when the user starts entering an `@` in the text bar; for this purpose, the [channelParticipantsMentions](/constructor/channelParticipantsMentions.md) filter can be used in [channels.getParticipants](/method/channels.getParticipants.md).  
This filter can be enhanced by providing an additional query string `q` (anything the user enters after `@`); it will also return non-participant users, in case of channel users commenting in [post comment sections](/api/discussion.md).  

### Dialog mentions

    dialog#fc89f7f3 flags:# pinned:flags.2?true unread_mark:flags.3?true view_forum_as_messages:flags.6?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int notify_settings:PeerNotifySettings pts:flags.0?int draft:flags.1?DraftMessage folder_id:flags.4?int ttl_period:flags.5?int = Dialog;
    
    ---functions---
    
    messages.getUnreadMentions#f107e790 flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
    messages.readMentions#36e5bf4d flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;

Graphical clients are supposed to show a blue mention indicator next to the message counter of chats in the dialog list.  
The [dialog](/constructor/dialog.md) constructor contains an `unread_mentions_count` field to isolate chats with unread mentions; the actual mention counter should be shown inside of the chat itself, above an `@` button that can be used, by clicking multiple times, to navigate back (using [messages.getUnreadMentions](/method/messages.getUnreadMentions.md)) through the mention history.  

When the last unread mention is read, or when long-clicking on the `@` button, all mentions for a chat should marked as read using [messages.readMentions](/method/messages.readMentions.md).

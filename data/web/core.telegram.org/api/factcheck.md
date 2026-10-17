# Fact checks


Telegram clients support displaying fact-checks added to messages by independent fact-checkers.

### Displaying fact-checks

    factCheck#b89bfccf flags:# need_check:flags.0?true country:flags.1?string text:flags.1?TextWithEntities hash:long = FactCheck;
    
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    ---functions---

    messages.getFactCheck#b9cdc5ee peer:InputPeer msg_id:Vector<int> = Vector<FactCheck>;

Fact-checks are represented by [factCheck](/constructor/factCheck.md) constructors, contained in the `factcheck` field of the [message](/constructor/message.md) constructor.  

Sometimes (i.e. for performance reasons), even if a message *does* have a factcheck, it may not be returned in the `text` field of the [factCheck](/constructor/factCheck.md) associated to the [message](/constructor/message.md): in this case, the [factCheck](/constructor/factCheck.md).`need_check` flag will be set and the `country`/`text` flags won't be set, and the client should request the full text of the fact check manually using [messages.getFactCheck](/method/messages.getFactCheck.md) when the message scrolls into view.  

These manual requests should be bundled: every time a new ID is added to the queue of factchecks to manually fetch, postpone fetching by 80ms.  

Store all *full* (i.e. those with a `country`/`text`) factchecks in a local database, using the `hash` as key.  
Avoid fetching *min* (i.e. those where `need_check` is set) factchecks if a factcheck with the same `hash` is already cached in the local database.  

Example implementation: [android](https://github.com/DrKLO/Telegram/blob/eee720ef5e48e1c434f4c5a83698dc4ada34aaa9/TMessagesProj/src/main/java/org/telegram/messenger/FactCheckController.java).

### Editing fact-checks

    factCheck#b89bfccf flags:# need_check:flags.0?true country:flags.1?string text:flags.1?TextWithEntities hash:long = FactCheck;

    ---functions---

    messages.editFactCheck#0589ee75 peer:InputPeer msg_id:int text:TextWithEntities = Updates;
    messages.deleteFactCheck#d1da940c peer:InputPeer msg_id:int = Updates;

Fact-checks may be created, deleted and edited by independent fact-checkers using [messages.editFactCheck](/method/messages.editFactCheck.md) and [messages.deleteFactCheck](/method/messages.deleteFactCheck.md).  

Those methods can be used by independent fact-checkers, which will have the [appConfig.can_edit_factcheck](/api/config.md#can-edit-factcheck) configuration flag set to `true`.  

If the flag mentioned above is set to `true`, the maximum UTF-8 length for a fact check will be specified in the [appConfig.factcheck_length_limit](/api/config.md#factcheck-length-limit) field.

# Imported messages


Telegram allows importing messages and media from foreign chat apps.

>Note: This article is intended for MTProto API developers. If you're looking for a way to move history from other chat apps into Telegram, check out the related [Telegram blog post](https://telegram.org/blog/move-history).

### 1. Validate the chat export file

    messages.historyImportParsed#5e0fb7b9 flags:# pm:flags.0?true group:flags.1?true title:flags.2?string = messages.HistoryImportParsed;
    
    ---functions---

    messages.checkHistoryImport#43fe19f3 import_head:string = messages.HistoryImportParsed;

The import process begins by calling [messages.checkHistoryImport](/method/messages.checkHistoryImport.md), passing to `import_head` up to 100 lines of the chat export file, starting from the beginning of the file.

The returned constructor contains information about the exported chat, including its title or type.
If the `pm` flag is set, the chat export file was generated from a private chat.
If the `group` flag is set, the chat export file was generated from a group chat.
If neither the `pm` or `group` flags are set, the specified chat export was generated from a chat of unknown type.

### 2. Choosing a destination Telegram chat

    messages.checkedHistoryImportPeer#a24de717 confirm_text:string = messages.CheckedHistoryImportPeer;
    
    ---functions---

    messages.checkHistoryImportPeer#5dc60f03 peer:InputPeer = messages.CheckedHistoryImportPeer;

Using [messages.checkHistoryImportPeer](/method/messages.checkHistoryImportPeer.md), check whether chat history exported from another chat app can be imported into a specific Telegram `peer`, chosen by the user.  
Typically, history imports are allowed for private chats with a mutual contact or [supergroups](/api/channel.md) with [`change_info` administrator rights »](/api/rights.md).

If the check succeeds, and no RPC errors are returned, a [messages.CheckedHistoryImportPeer](/type/messages.CheckedHistoryImportPeer.md) constructor will be returned, with a confirmation text to be shown to the user in a confirmation prompt.  
Upon final user confirmation, [the import process is initialized](#3-initialize-the-import).  

### 3. Initialize the import

    messages.historyImport#1662af0b id:long = messages.HistoryImport;

    ---functions---

    messages.initHistoryImport#34090c3b peer:InputPeer file:InputFile media_count:int = messages.HistoryImport;

Use [messages.initHistoryImport](/method/messages.initHistoryImport.md) to initialize the import process, passing the following parameters:  
* `peer` - The Telegram chat where the history should be imported.
* `file` - The chat export file.
* `media_count` - The number of media files associated with the export, to be uploaded in [the next step](#4-uploading-media).  

### 4. Uploading media

    ---functions---

    messages.uploadImportedMedia#2a862092 peer:InputPeer import_id:long file_name:string media:InputMedia = MessageMedia;

Use [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md) to upload media files eventually associated with the chat export.  
`import_id` is the `id` contained in the [messages.historyImport](/constructor/messages.historyImport.md) constructor, returned by [messages.initHistoryImport](/method/messages.initHistoryImport.md) [in the previous step](#3-initialize-the-import).  

### 5. Finalize the import

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    
    messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;

    ---functions---

    messages.startHistoryImport#b43df344 peer:InputPeer import_id:long = Bool;

Finally, invoke [messages.startHistoryImport](/method/messages.startHistoryImport.md) to complete the [history import process](/api/import.md), importing all messages into the chat.  
As usual, `import_id` is the `id` contained in the [messages.historyImport](/constructor/messages.historyImport.md) constructor, returned by [messages.initHistoryImport](/method/messages.initHistoryImport.md).  

Imported messages will show in the chat history as [messages](/constructor/message.md) containing a `fwd_from` [messageFwdHeader](/constructor/messageFwdHeader.md) constructor with the `imported` flag, and should be appropriately marked in the UI as messages imported from a foreign chat app.


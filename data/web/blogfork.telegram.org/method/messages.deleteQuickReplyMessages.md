# messages.deleteQuickReplyMessages

Delete one or more messages from a [quick reply shortcut](/api/business.md#quick-reply-shortcuts). This will also emit an [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) update.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.deleteQuickReplyMessages#e105e910 shortcut_id:int id:Vector<int> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | [Shortcut ID](/api/business.md#quick-reply-shortcuts). |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of shortcut messages to delete. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SHORTCUT\_INVALID | The specified shortcut is invalid. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md)
One or more messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) were deleted.
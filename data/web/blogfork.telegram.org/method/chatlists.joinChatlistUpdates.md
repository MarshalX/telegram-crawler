# chatlists.joinChatlistUpdates

Join channels and supergroups recently added to a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
chatlists.joinChatlistUpdates#e089f8f5 chatlist:InputChatlist peers:Vector<InputPeer> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | The folder |
| **peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | List of new chats to join, fetched using [chatlists.getChatlistUpdates](/method/chatlists.getChatlistUpdates.md) and filtered as specified in the [documentation »](/api/folders.md#shared-folders). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_INCLUDE\_EMPTY | The include_peers vector of the filter is empty. |

### Related pages

#### [chatlists.getChatlistUpdates](/method/chatlists.getChatlistUpdates.md)
Fetch new chats associated with an imported [chat folder deep link »](/api/links.md#chat-folder-links). Must be invoked at most every `chatlist_update_period` seconds (as per the related [client configuration parameter »](/api/config.md#chatlist-update-period)).

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
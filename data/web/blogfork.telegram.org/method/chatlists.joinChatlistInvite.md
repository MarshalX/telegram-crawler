# chatlists.joinChatlistInvite

Import a [chat folder deep link »](/api/links.md#chat-folder-links), joining some or all the chats in the folder.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
chatlists.joinChatlistInvite#a6b1e39a slug:string peers:Vector<InputPeer> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | `slug` obtained from a [chat folder deep link »](/api/links.md#chat-folder-links). |
| **peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | List of new chats to join, fetched using [chatlists.checkChatlistInvite](/method/chatlists.checkChatlistInvite.md) and filtered as specified in the [documentation »](/api/folders.md#shared-folders). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNELS\_TOO\_MUCH | You have joined too many channels/supergroups. |
| 400 | CHATLISTS\_TOO\_MUCH | You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits&nbsp;&raquo;](/api/config.md#chatlist-invites-limit-default). |
| 400 | FILTER\_INCLUDE\_EMPTY | The include_peers vector of the filter is empty. |
| 400 | INVITE\_SLUG\_EMPTY | The specified invite slug is empty. |
| 400 | INVITE\_SLUG\_EXPIRED | The specified chat folder link has expired. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [chatlists.checkChatlistInvite](/method/chatlists.checkChatlistInvite.md)
Obtain information about a [chat folder deep link »](/api/links.md#chat-folder-links).

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
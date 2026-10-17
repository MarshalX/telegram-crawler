# channels.editBanned

Ban/unban/kick a user in a [supergroup/channel](/api/channel.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
channels.editBanned#96e6cd81 channel:InputChannel participant:InputPeer banned_rights:ChatBannedRights = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The [supergroup/channel](/api/channel.md). |
| **participant** | [InputPeer](/type/InputPeer.md) | Participant to ban |
| **banned\_rights** | [ChatBannedRights](/type/ChatBannedRights.md) | The banned rights |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | BANNED\_RIGHTS\_INVALID | You provided some invalid flags in the banned rights. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PARTICIPANT\_ID\_INVALID | The specified participant ID is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_ADMIN\_INVALID | You're not an admin. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
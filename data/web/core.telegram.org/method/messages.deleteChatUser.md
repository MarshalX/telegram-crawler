# messages.deleteChatUser

Deletes a user from a chat and sends a service message on it.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.deleteChatUser#a2185cab flags:# revoke_history:flags.0?true chat_id:long user_id:InputUser = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoke\_history** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Remove the entire chat history of the specified user in this chat. |
| **chat\_id** | [long](/type/long.md) | Chat ID |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID to be deleted |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_NOT\_PARTICIPANT | You're not a member of this supergroup/channel. |
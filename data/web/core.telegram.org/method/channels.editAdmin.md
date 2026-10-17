# channels.editAdmin

Modify the admin rights of a user in a [supergroup/channel](/api/channel.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
channels.editAdmin#9a98ad68 flags:# channel:InputChannel user_id:InputUser admin_rights:ChatAdminRights rank:flags.0?string = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel** | [InputChannel](/type/InputChannel.md) | The [supergroup/channel](/api/channel.md). |
| **user\_id** | [InputUser](/type/InputUser.md) | The ID of the user whose admin rights should be modified |
| **admin\_rights** | [ChatAdminRights](/type/ChatAdminRights.md) | The admin rights |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Indicates the role (rank) of the admin in the group: just an arbitrary string. If the flag is not set, the rank is left unchanged. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ADMINS\_TOO\_MUCH | There are too many admins. |
| 400 | ADMIN\_RANK\_EMOJI\_NOT\_ALLOWED | An admin rank cannot contain emojis. |
| 400 | ADMIN\_RANK\_INVALID | The specified admin rank is invalid. |
| 400 | BOTS\_TOO\_MUCH | There are too many bots in this chat/channel. |
| 400 | BOT\_CHANNELS\_NA | Bots can't edit admin privileges. |
| 400 | BOT\_GROUPS\_BLOCKED | This bot can't be added to groups. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_INVITE\_REQUIRED | You do not have the rights to do this. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 406 | FRESH\_CHANGE\_ADMINS\_FORBIDDEN | You were just elected admin, you can't add or modify other admins yet. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | RIGHT\_FORBIDDEN | Your admin rights do not allow you to do this. |
| 400 | USERS\_TOO\_MUCH | The maximum number of users has been exceeded (to create a chat, for example). |
| 400 | USER\_BLOCKED | User blocked. |
| 403 | USER\_CHANNELS\_TOO\_MUCH | One of the users you tried to add is already in too many channels/supergroups. |
| 400 | USER\_CREATOR | For channels.editAdmin: you've tried to edit the admin rights of the owner, but you're not the owner; for channels.leaveChannel: you can't leave this channel, because you're its creator. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_KICKED | This user was kicked from this supergroup/channel. |
| 403 | USER\_NOT\_MUTUAL\_CONTACT | The provided user is not a mutual contact. |
| 403 | USER\_PRIVACY\_RESTRICTED | The user's privacy settings do not allow you to do this. |
| 403 | USER\_RESTRICTED | You're spamreported, you can't create channels or chats. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
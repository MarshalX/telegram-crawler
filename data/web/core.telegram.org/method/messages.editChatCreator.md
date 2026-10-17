# messages.editChatCreator

Transfer the ownership of a basic group, supergroup or channel to another user, see [here »](/api/channel.md#transferring-ownership-of-a-group-channel) for the full flow.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.editChatCreator#f743b857 peer:InputPeer user_id:InputUser password:InputCheckPasswordSRP = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Owned group/supergroup/channel. |
| **user\_id** | [InputUser](/type/InputUser.md) | ID of the new owner. |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | The current account's [2FA password](/api/srp.md). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNELS\_ADMIN\_PUBLIC\_TOO\_MUCH | You're admin of too many public channels, make some channels private to change the username of this channel. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_MEMBER\_ADD\_FAILED | Could not add participants. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |
| 400 | PASSWORD\_MISSING | You must [enable 2FA](/api/srp.md) before executing this operation. |
| 400 | PASSWORD\_TOO\_FRESH\_%d | The password was modified less than 24 hours ago, try again in %d seconds. |
| 400 | SESSION\_TOO\_FRESH\_%d | This session was created less than 24 hours ago, try again in %d seconds. |
| 400 | SRP\_ID\_INVALID | Invalid SRP ID provided. |
| 400 | USERS\_TOO\_MUCH | The maximum number of users has been exceeded (to create a chat, for example). |
| 403 | USER\_CHANNELS\_TOO\_MUCH | One of the users you tried to add is already in too many channels/supergroups. |
| 400 | USER\_NOT\_MUTUAL\_CONTACT | The provided user is not a mutual contact. |
| 403 | USER\_PRIVACY\_RESTRICTED | The user's privacy settings do not allow you to do this. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
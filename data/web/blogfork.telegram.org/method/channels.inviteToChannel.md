# channels.inviteToChannel

Invite users to a channel/supergroup

```tl
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;
---functions---
channels.inviteToChannel#c9e33d54 channel:InputChannel users:Vector<InputUser> = messages.InvitedUsers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel/supergroup |
| **users** | [Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | Users to invite |

### Result
[messages.InvitedUsers](/type/messages.InvitedUsers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOTS\_TOO\_MUCH | There are too many bots in this chat/channel. |
| 400 | BOT\_GROUPS\_BLOCKED | This bot can't be added to groups. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_INVALID | Invalid chat. |
| 400 | CHAT\_MEMBER\_ADD\_FAILED | Could not add participants. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | USERS\_TOO\_MUCH | The maximum number of users has been exceeded (to create a chat, for example). |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | USER\_BLOCKED | User blocked. |
| 400 | USER\_BOT | Bots can only be admins in channels. |
| 403 | USER\_CHANNELS\_TOO\_MUCH | One of the users you tried to add is already in too many channels/supergroups. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_KICKED | This user was kicked from this supergroup/channel. |
| 403 | USER\_NOT\_MUTUAL\_CONTACT | The provided user is not a mutual contact. |
| 403 | USER\_PRIVACY\_RESTRICTED | The user's privacy settings do not allow you to do this. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
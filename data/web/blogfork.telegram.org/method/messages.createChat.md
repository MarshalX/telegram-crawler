# messages.createChat

Creates a new chat.

```tl
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;
---functions---
messages.createChat#92ceddd4 flags:# users:Vector<InputUser> title:string ttl_period:flags.0?int = messages.InvitedUsers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **users** | [Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | List of user IDs to be invited |
| **title** | [string](/type/string.md) | Chat name |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Time-to-live of all messages that will be sent in the chat: once message.date+message.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. You can use [messages.setDefaultHistoryTTL](/method/messages.setDefaultHistoryTTL.md) to edit this value later. |

### Result
[messages.InvitedUsers](/type/messages.InvitedUsers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 500 | CHAT\_ID\_GENERATE\_FAILED | Failure while generating the chat ID. |
| 400 | CHAT\_INVALID | Invalid chat. |
| 400 | CHAT\_MEMBER\_ADD\_FAILED | Could not add participants. |
| 400 | CHAT\_TITLE\_EMPTY | No chat title provided. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | TTL\_PERIOD\_INVALID | The specified TTL period is invalid. |
| 400 | USERS\_TOO\_FEW | Not enough users (to create a chat, for example). |
| 406 | USER\_RESTRICTED | You're spamreported, you can't create channels or chats. |

### Related pages

#### [messages.setDefaultHistoryTTL](/method/messages.setDefaultHistoryTTL.md)
Changes the default value of the Time-To-Live setting, applied to all new chats.
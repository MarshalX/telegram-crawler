# messages.addChatUser

Adds a user to a chat and sends a service message on it.

```tl
messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;
---functions---
messages.addChatUser#cbc6d107 chat_id:long user_id:InputUser fwd_limit:int = messages.InvitedUsers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | Chat ID |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID to be added |
| **fwd\_limit** | [int](/type/int.md) | Number of last messages to be forwarded |

### Result
[messages.InvitedUsers](/type/messages.InvitedUsers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_GROUPS\_BLOCKED | This bot can't be added to groups. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_INVALID | Invalid chat. |
| 400 | CHAT\_MEMBER\_ADD\_FAILED | Could not add participants. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USERS\_TOO\_MUCH | The maximum number of users has been exceeded (to create a chat, for example). |
| 400 | USER\_ALREADY\_PARTICIPANT | The user is already in the group. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_IS\_BLOCKED | You were blocked by this user. |
| 403 | USER\_NOT\_MUTUAL\_CONTACT | The provided user is not a mutual contact. |
| 403 | USER\_PRIVACY\_RESTRICTED | The user's privacy settings do not allow you to do this. |
| 400 | YOU\_BLOCKED\_USER | You blocked this user. |
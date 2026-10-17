# messages.getExportedChatInvite

Get info about a chat invite

```tl
messages.exportedChatInvite#1871be50 invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.exportedChatInviteReplaced#222600ef invite:ExportedChatInvite new_invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
---functions---
messages.getExportedChatInvite#73746f5c peer:InputPeer link:string = messages.ExportedChatInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat |
| **link** | [string](/type/string.md) | Invite link |

### Result
[messages.ExportedChatInvite](/type/messages.ExportedChatInvite.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | INVITE\_HASH\_EXPIRED | The invite link has expired. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
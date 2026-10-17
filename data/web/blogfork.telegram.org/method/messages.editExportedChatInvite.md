# messages.editExportedChatInvite

Edit an exported chat invite

```tl
messages.exportedChatInvite#1871be50 invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.exportedChatInviteReplaced#222600ef invite:ExportedChatInvite new_invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
---functions---
messages.editExportedChatInvite#bdca2f75 flags:# revoked:flags.2?true peer:InputPeer link:string expire_date:flags.0?int usage_limit:flags.1?int request_needed:flags.3?Bool title:flags.4?string = messages.ExportedChatInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoked** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to revoke the chat invite |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat |
| **link** | [string](/type/string.md) | Invite link |
| **expire\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | New expiration date |
| **usage\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Maximum number of users that can join using this link |
| **request\_needed** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Bool](/type/Bool.md) | Whether admin confirmation is required before admitting each separate user into the chat |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Description of the invite link, visible only to administrators |

### Result
[messages.ExportedChatInvite](/type/messages.ExportedChatInvite.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_INVITE\_PERMANENT | You can't set an expiration date on permanent invite links. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 403 | EDIT\_BOT\_INVITE\_FORBIDDEN | Normal users can't edit invites that were created by bots. |
| 400 | INVITE\_HASH\_EXPIRED | The invite link has expired. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USAGE\_LIMIT\_INVALID | The specified usage limit is invalid. |
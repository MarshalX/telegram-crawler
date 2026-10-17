# messages.deleteExportedChatInvite

Delete a chat invite

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.deleteExportedChatInvite#d464a42b peer:InputPeer link:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |
| **link** | [string](/type/string.md) | Invite link |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | INVITE\_HASH\_EXPIRED | The invite link has expired. |
| 400 | INVITE\_REVOKED\_MISSING | The specified invite link was already revoked or is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
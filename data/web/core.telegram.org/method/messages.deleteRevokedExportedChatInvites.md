# messages.deleteRevokedExportedChatInvites

Delete all revoked chat invites

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.deleteRevokedExportedChatInvites#56987bd5 peer:InputPeer admin_id:InputUser = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat |
| **admin\_id** | [InputUser](/type/InputUser.md) | ID of the admin that originally generated the revoked chat invites |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ADMIN\_ID\_INVALID | The specified admin ID is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
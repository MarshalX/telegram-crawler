# messages.getExportedChatInvites

Get info about the chat invites of a specific chat

```tl
messages.exportedChatInvites#bdc62dcc count:int invites:Vector<ExportedChatInvite> users:Vector<User> = messages.ExportedChatInvites;
---functions---
messages.getExportedChatInvites#a2b5a3f6 flags:# revoked:flags.3?true peer:InputPeer admin_id:InputUser offset_date:flags.2?int offset_link:flags.2?string limit:int = messages.ExportedChatInvites;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoked** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether to fetch revoked chat invites |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat |
| **admin\_id** | [InputUser](/type/InputUser.md) | Whether to only fetch chat invites from this admin |
| **offset\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_link** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[messages.ExportedChatInvites](/type/messages.ExportedChatInvites.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ADMIN\_ID\_INVALID | The specified admin ID is invalid. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
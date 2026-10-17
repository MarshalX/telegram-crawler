# messages.getDialogs

Returns the current user dialog list.

```tl
messages.dialogs#15ba6c40 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
messages.dialogsSlice#71e094f3 count:int dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;
messages.dialogsNotModified#f0e3e596 count:int = messages.Dialogs;
---functions---
messages.getDialogs#a0f4cb4f flags:# exclude_pinned:flags.0?true folder_id:flags.1?int offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.Dialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **exclude\_pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Exclude pinned dialogs |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) (`top_message` ID used for pagination) |
| **offset\_peer** | [InputPeer](/type/InputPeer.md) | [Offset peer for pagination](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Number of list elements to be returned |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Result
[messages.Dialogs](/type/messages.Dialogs.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | FOLDER\_ID\_INVALID | Invalid folder ID. |
| 400 | OFFSET\_PEER\_ID\_INVALID | The provided offset peer is invalid. |
| 400 | PINNED\_DIALOGS\_TOO\_MUCH | Too many pinned dialogs. |
| 400 | TAKEOUT\_INVALID | The specified takeout ID is invalid. |

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
# messages.startHistoryImport

Complete the [history import process](/api/import.md), importing all messages into the chat.  
To be called only after initializing the import with [messages.initHistoryImport](/method/messages.initHistoryImport.md) and uploading all files using [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.startHistoryImport#b43df344 peer:InputPeer import_id:long = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The Telegram chat where the messages should be [imported, click here for more info »](/api/import.md) |
| **import\_id** | [long](/type/long.md) | Identifier of a history import session, returned by [messages.initHistoryImport](/method/messages.initHistoryImport.md). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | IMPORT\_ID\_INVALID | The specified import ID is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Imported messages](/api/import.md)
Telegram allows importing messages and media from foreign chat apps.

#### [messages.initHistoryImport](/method/messages.initHistoryImport.md)
Import chat history from a foreign chat app into a specific Telegram chat, [click here for more info about imported chats »](/api/import.md).

#### [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md)
Upload a media file associated with an [imported chat, click here for more info »](/api/import.md).
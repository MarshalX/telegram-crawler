# messages.initHistoryImport

Import chat history from a foreign chat app into a specific Telegram chat, [click here for more info about imported chats »](/api/import.md).

```tl
messages.historyImport#1662af0b id:long = messages.HistoryImport;
---functions---
messages.initHistoryImport#34090c3b peer:InputPeer file:InputFile media_count:int = messages.HistoryImport;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The Telegram chat where the [history should be imported](/api/import.md). |
| **file** | [InputFile](/type/InputFile.md) | File with messages to import. |
| **media\_count** | [int](/type/int.md) | Number of media files associated with the chat that will be uploaded using [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md). |

### Result
[messages.HistoryImport](/type/messages.HistoryImport.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | IMPORT\_FILE\_INVALID | The specified chat export file is invalid. |
| 400 | IMPORT\_FORMAT\_DATE\_INVALID | The date specified in the import file is invalid. |
| 400 | IMPORT\_FORMAT\_UNRECOGNIZED | The specified chat export file was exported from an unsupported chat app. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 406 | PREVIOUS\_CHAT\_IMPORT\_ACTIVE\_WAIT\_%dMIN | Import for this chat is already in progress, wait %d minutes before starting a new one. |
| 400 | USER\_NOT\_MUTUAL\_CONTACT | The provided user is not a mutual contact. |

### Related pages

#### [Imported messages](/api/import.md)
Telegram allows importing messages and media from foreign chat apps.

#### [messages.uploadImportedMedia](/method/messages.uploadImportedMedia.md)
Upload a media file associated with an [imported chat, click here for more info »](/api/import.md).
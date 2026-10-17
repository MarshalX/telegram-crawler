# messages.checkHistoryImportPeer

Check whether chat history exported from another chat app can be [imported into a specific Telegram chat, click here for more info »](/api/import.md).

If the check succeeds, and no RPC errors are returned, a [messages.CheckedHistoryImportPeer](/type/messages.CheckedHistoryImportPeer.md) constructor will be returned, with a confirmation text to be shown to the user, before actually initializing the import.

```tl
messages.checkedHistoryImportPeer#a24de717 confirm_text:string = messages.CheckedHistoryImportPeer;
---functions---
messages.checkHistoryImportPeer#5dc60f03 peer:InputPeer = messages.CheckedHistoryImportPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat where we want to [import history »](/api/import.md). |

### Result
[messages.CheckedHistoryImportPeer](/type/messages.CheckedHistoryImportPeer.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_NOT\_MUTUAL\_CONTACT | The provided user is not a mutual contact. |

### Related pages

#### [Imported messages](/api/import.md)
Telegram allows importing messages and media from foreign chat apps.

#### [messages.CheckedHistoryImportPeer](/type/messages.CheckedHistoryImportPeer.md)
Contains a confirmation text to be shown to the user, upon [importing chat history, click here for more info »](/api/import.md).
# messages.CheckedHistoryImportPeer

Contains a confirmation text to be shown to the user, upon [importing chat history, click here for more info »](/api/import.md).

```tl
messages.checkedHistoryImportPeer#a24de717 confirm_text:string = messages.CheckedHistoryImportPeer;

---functions---

messages.checkHistoryImportPeer#5dc60f03 peer:InputPeer = messages.CheckedHistoryImportPeer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.checkedHistoryImportPeer](/constructor/messages.checkedHistoryImportPeer.md) | Contains a confirmation text to be shown to the user, upon [importing chat history, click here for more info »](/api/import.md). |

### Methods

| Method | Description |
| --- | --- |
| [messages.checkHistoryImportPeer](/method/messages.checkHistoryImportPeer.md) | Check whether chat history exported from another chat app can be [imported into a specific Telegram chat, click here for more info »](/api/import.md).\
\
If the check succeeds, and no RPC errors are returned, a [messages.CheckedHistoryImportPeer](/type/messages.CheckedHistoryImportPeer.md) constructor will be returned, with a confirmation text to be shown to the user, before actually initializing the import. |

### Related pages

#### [Imported messages](/api/import.md)
Telegram allows importing messages and media from foreign chat apps.
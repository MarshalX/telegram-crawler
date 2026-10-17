# ExportedChatlistInvite

An exported [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
exportedChatlistInvite#c5181ac flags:# title:string url:string peers:Vector<Peer> = ExportedChatlistInvite;

---functions---

chatlists.editExportedInvite#653db63d flags:# chatlist:InputChatlist slug:string title:flags.1?string peers:flags.2?Vector<InputPeer> = ExportedChatlistInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [exportedChatlistInvite](/constructor/exportedChatlistInvite.md) | Exported [chat folder deep link »](/api/links.md#chat-folder-links). |

### Methods

| Method | Description |
| --- | --- |
| [chatlists.editExportedInvite](/method/chatlists.editExportedInvite.md) | Edit a [chat folder deep link »](/api/links.md#chat-folder-links). |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
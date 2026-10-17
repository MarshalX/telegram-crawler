# chatlists.ExportedChatlistInvite

Exported [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.exportedChatlistInvite#10e6e3a6 filter:DialogFilter invite:ExportedChatlistInvite = chatlists.ExportedChatlistInvite;

---functions---

chatlists.exportChatlistInvite#8472478e chatlist:InputChatlist title:string peers:Vector<InputPeer> = chatlists.ExportedChatlistInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatlists.exportedChatlistInvite](/constructor/chatlists.exportedChatlistInvite.md) | Info about an exported [chat folder deep link »](/api/links.md#chat-folder-links). |

### Methods

| Method | Description |
| --- | --- |
| [chatlists.exportChatlistInvite](/method/chatlists.exportChatlistInvite.md) | Export a [folder »](/api/folders.md), creating a [chat folder deep link »](/api/links.md#chat-folder-links). |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
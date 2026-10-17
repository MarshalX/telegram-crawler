# chatlists.ExportedInvites

A list of exported [chat folder deep links »](/api/links.md#chat-folder-links).

```tl
chatlists.exportedInvites#10ab6dc7 invites:Vector<ExportedChatlistInvite> chats:Vector<Chat> users:Vector<User> = chatlists.ExportedInvites;

---functions---

chatlists.getExportedInvites#ce03da83 chatlist:InputChatlist = chatlists.ExportedInvites;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatlists.exportedInvites](/constructor/chatlists.exportedInvites.md) | Info about multiple [chat folder deep links »](/api/links.md#chat-folder-links). |

### Methods

| Method | Description |
| --- | --- |
| [chatlists.getExportedInvites](/method/chatlists.getExportedInvites.md) | List all [chat folder deep links »](/api/links.md#chat-folder-links) associated to a folder |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
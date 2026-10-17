# messages.ExportedChatInvite

Contains info about a chat invite, and eventually a pointer to the newest chat invite.

```tl
messages.exportedChatInvite#1871be50 invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
messages.exportedChatInviteReplaced#222600ef invite:ExportedChatInvite new_invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;

---functions---

messages.getExportedChatInvite#73746f5c peer:InputPeer link:string = messages.ExportedChatInvite;
messages.editExportedChatInvite#bdca2f75 flags:# revoked:flags.2?true peer:InputPeer link:string expire_date:flags.0?int usage_limit:flags.1?int request_needed:flags.3?Bool title:flags.4?string = messages.ExportedChatInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.exportedChatInvite](/constructor/messages.exportedChatInvite.md) | Info about a chat invite |
| [messages.exportedChatInviteReplaced](/constructor/messages.exportedChatInviteReplaced.md) | The specified chat invite was replaced with another one |

### Methods

| Method | Description |
| --- | --- |
| [messages.getExportedChatInvite](/method/messages.getExportedChatInvite.md) | Get info about a chat invite |
| [messages.editExportedChatInvite](/method/messages.editExportedChatInvite.md) | Edit an exported chat invite |
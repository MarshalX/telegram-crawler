# messages.ChatInviteImporters

List of users that imported a chat invitation link.

```tl
messages.chatInviteImporters#81b6b00a count:int importers:Vector<ChatInviteImporter> users:Vector<User> = messages.ChatInviteImporters;

---functions---

messages.getChatInviteImporters#df04dd4e flags:# requested:flags.0?true subscription_expired:flags.3?true peer:InputPeer link:flags.1?string q:flags.2?string offset_date:int offset_user:InputUser limit:int = messages.ChatInviteImporters;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.chatInviteImporters](/constructor/messages.chatInviteImporters.md) | Info about the users that joined the chat using a specific chat invite |

### Methods

| Method | Description |
| --- | --- |
| [messages.getChatInviteImporters](/method/messages.getChatInviteImporters.md) | Get info about the users that joined the chat using a specific chat invite |
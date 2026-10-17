# Messages.PeerDialogs

List of dialogs

```tl
messages.peerDialogs#3371c354 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> state:updates.State = messages.PeerDialogs;

---functions---

messages.getPeerDialogs#e470bcfd peers:Vector<InputDialogPeer> = messages.PeerDialogs;
messages.getPinnedDialogs#d6b94df2 folder_id:int = messages.PeerDialogs;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.peerDialogs](/constructor/messages.peerDialogs.md) | Dialog info of multiple peers |

### Methods

| Method | Description |
| --- | --- |
| [messages.getPeerDialogs](/method/messages.getPeerDialogs.md) | Get dialog info of specified peers |
| [messages.getPinnedDialogs](/method/messages.getPinnedDialogs.md) | Get pinned dialogs |
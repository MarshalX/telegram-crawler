# messages.SavedDialogs

Represents some [saved message dialogs »](/api/saved-messages.md).

```tl
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;

---functions---

messages.getSavedDialogs#1e91fc99 flags:# exclude_pinned:flags.0?true parent_peer:flags.1?InputPeer offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.SavedDialogs;
messages.getPinnedSavedDialogs#d63d94e0 = messages.SavedDialogs;
messages.getSavedDialogsByID#6f6f9c96 flags:# parent_peer:flags.1?InputPeer ids:Vector<InputPeer> = messages.SavedDialogs;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.savedDialogs](/constructor/messages.savedDialogs.md) | Represents some [saved message dialogs »](/api/saved-messages.md). |
| [messages.savedDialogsSlice](/constructor/messages.savedDialogsSlice.md) | Incomplete list of [saved message dialogs »](/api/saved-messages.md) with messages and auxiliary data. |
| [messages.savedDialogsNotModified](/constructor/messages.savedDialogsNotModified.md) | The saved dialogs haven't changed |

### Methods

| Method | Description |
| --- | --- |
| [messages.getSavedDialogs](/method/messages.getSavedDialogs.md) | Returns the current [saved dialog list »](/api/saved-messages.md) or [monoforum topic list »](/api/monoforum.md). |
| [messages.getPinnedSavedDialogs](/method/messages.getPinnedSavedDialogs.md) | Get pinned [saved dialogs, see here »](/api/saved-messages.md) for more info. |
| [messages.getSavedDialogsByID](/method/messages.getSavedDialogsByID.md) | Obtain information about specific [saved message dialogs »](/api/saved-messages.md#saved-message-dialogs) or [monoforum topics »](/api/monoforum.md). |

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
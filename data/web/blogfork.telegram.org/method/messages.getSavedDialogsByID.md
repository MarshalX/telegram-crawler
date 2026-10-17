# messages.getSavedDialogsByID

Obtain information about specific [saved message dialogs »](/api/saved-messages.md#saved-message-dialogs) or [monoforum topics »](/api/monoforum.md).

```tl
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;
---functions---
messages.getSavedDialogsByID#6f6f9c96 flags:# parent_peer:flags.1?InputPeer ids:Vector<InputPeer> = messages.SavedDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | If set, fetches [monoforum topics »](/api/monoforum.md), otherwise fetches [saved message dialogs »](/api/saved-messages.md#saved-message-dialogs). |
| **ids** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | IDs of dialogs (topics) to fetch. |

### Result
[messages.SavedDialogs](/type/messages.SavedDialogs.md)

### Only users can use this method

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
# messages.getPinnedDialogs

Get pinned dialogs

```tl
messages.peerDialogs#3371c354 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> state:updates.State = messages.PeerDialogs;
---functions---
messages.getPinnedDialogs#d6b94df2 folder_id:int = messages.PeerDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **folder\_id** | [int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |

### Result
[messages.PeerDialogs](/type/messages.PeerDialogs.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FOLDER\_ID\_INVALID | Invalid folder ID. |

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
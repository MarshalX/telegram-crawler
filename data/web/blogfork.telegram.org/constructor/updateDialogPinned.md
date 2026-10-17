# updateDialogPinned

A dialog was pinned/unpinned

```tl
updateDialogPinned#6e6fe51c flags:# pinned:flags.0?true folder_id:flags.1?int peer:DialogPeer = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the dialog was pinned |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **peer** | [DialogPeer](/type/DialogPeer.md) | The dialog |

### Type
[Update](/type/Update.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
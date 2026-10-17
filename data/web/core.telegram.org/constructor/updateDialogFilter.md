# updateDialogFilter

A new [folder](/api/folders.md) was added

```tl
updateDialogFilter#26ffde7d flags:# id:int filter:flags.0?DialogFilter = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [int](/type/int.md) | [Folder](/api/folders.md) ID |
| **filter** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[DialogFilter](/type/DialogFilter.md) | [Folder](/api/folders.md) info |

### Type
[Update](/type/Update.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
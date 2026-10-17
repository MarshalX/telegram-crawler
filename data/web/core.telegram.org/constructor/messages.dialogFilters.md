# messages.dialogFilters

[Folder and folder tags](/api/folders.md) information

```tl
messages.dialogFilters#2ad93719 flags:# tags_enabled:flags.0?true filters:Vector<DialogFilter> = messages.DialogFilters;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **tags\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether [folder tags](/api/folders.md#folder-tags) are enabled. |
| **filters** | [Vector](/type/Vector%20t)&lt;[DialogFilter](/type/DialogFilter.md)&gt; | Folders. |

### Type
[messages.DialogFilters](/type/messages.DialogFilters.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
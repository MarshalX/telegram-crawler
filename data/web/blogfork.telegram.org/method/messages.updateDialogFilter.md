# messages.updateDialogFilter

Update [folder](/api/folders.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.updateDialogFilter#1ad4a04a flags:# id:int filter:flags.0?DialogFilter = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [int](/type/int.md) | [Folder](/api/folders.md) ID |
| **filter** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[DialogFilter](/type/DialogFilter.md) | [Folder](/api/folders.md) info |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHATLIST\_EXCLUDE\_INVALID | The specified `exclude_peers` are invalid. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_INCLUDE\_EMPTY | The include_peers vector of the filter is empty. |
| 400 | FILTER\_TITLE\_EMPTY | The title field of the filter is empty. |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
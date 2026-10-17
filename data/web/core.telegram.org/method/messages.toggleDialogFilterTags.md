# messages.toggleDialogFilterTags

Enable or disable [folder tags »](/api/folders.md#folder-tags).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.toggleDialogFilterTags#fd2dda49 enabled:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **enabled** | [Bool](/type/Bool.md) | Enable or disable folder tags. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
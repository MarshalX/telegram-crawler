# messages.updateDialogFiltersOrder

Reorder [folders](/api/folders.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.updateDialogFiltersOrder#c563c1e4 order:Vector<int> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **order** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | New [folder](/api/folders.md) order |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
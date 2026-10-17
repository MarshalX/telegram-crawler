# messages.reportMusicListen

Report the listening duration of a music track (audio document without the `voice` flag), see [here »](/api/views.md#music-listens) for more info on the full flow.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reportMusicListen#ddbcd819 id:InputDocument listened_duration:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputDocument](/type/InputDocument.md) | The [InputDocument](/type/InputDocument.md) of the listened song |
| **listened\_duration** | [int](/type/int.md) | Accumulated playing time in whole seconds |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [InputDocument](/type/InputDocument.md)
Defines a document for subsequent interaction.

#### [Views and read metrics](/api/views.md)
Clients should report read state, message views and music listens using a specific set of methods.
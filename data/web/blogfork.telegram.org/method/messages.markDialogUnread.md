# messages.markDialogUnread

Manually mark dialog as unread

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.markDialogUnread#8c5006f8 flags:# unread:flags.0?true parent_peer:flags.1?InputPeer peer:InputDialogPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Mark as unread/read |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | If set, must be equal to the ID of a [monoforum](/api/monoforum.md), and will affect the monoforum topic passed in `peer`. |
| **peer** | [InputDialogPeer](/type/InputDialogPeer.md) | Dialog |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.
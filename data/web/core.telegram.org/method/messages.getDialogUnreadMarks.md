# messages.getDialogUnreadMarks

Get dialogs manually marked as unread

```tl
---functions---
messages.getDialogUnreadMarks#21202222 flags:# parent_peer:flags.0?InputPeer = Vector<DialogPeer>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | Can be equal to the ID of a monoforum, to fetch monoforum topics manually marked as unread. |

### Result
[Vector](/type/Vector%20t)&lt;[DialogPeer](/type/DialogPeer.md)&gt;

### Only users can use this method
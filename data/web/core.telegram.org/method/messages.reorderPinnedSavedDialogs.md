# messages.reorderPinnedSavedDialogs

Reorder pinned [saved message dialogs »](/api/saved-messages.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reorderPinnedSavedDialogs#8b716587 flags:# force:flags.0?true order:Vector<InputDialogPeer> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **force** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, dialogs pinned server-side but not present in the `order` field will be unpinned. |
| **order** | [Vector](/type/Vector%20t)&lt;[InputDialogPeer](/type/InputDialogPeer.md)&gt; | New dialog order |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
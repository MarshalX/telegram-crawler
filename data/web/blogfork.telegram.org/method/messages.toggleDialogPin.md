# messages.toggleDialogPin

Pin/unpin a dialog

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.toggleDialogPin#a731e257 flags:# pinned:flags.0?true peer:InputDialogPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to pin or unpin the dialog |
| **peer** | [InputDialogPeer](/type/InputDialogPeer.md) | The dialog to pin |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | PEER\_HISTORY\_EMPTY | You can't pin an empty chat with a user. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PINNED\_DIALOGS\_TOO\_MUCH | Too many pinned dialogs. |
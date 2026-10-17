# savedDialog

Represents a [saved dialog »](/api/saved-messages.md).

```tl
savedDialog#bd87cb6c flags:# pinned:flags.2?true peer:Peer top_message:int = SavedDialog;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Is the dialog pinned |
| **peer** | [Peer](/type/Peer.md) | The dialog |
| **top\_message** | [int](/type/int.md) | The latest message ID |

### Type
[SavedDialog](/type/SavedDialog.md)

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
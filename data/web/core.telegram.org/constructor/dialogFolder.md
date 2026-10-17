# dialogFolder

Dialog in folder

```tl
dialogFolder#71bd134c flags:# pinned:flags.2?true folder:Folder peer:Peer top_message:int unread_muted_peers_count:int unread_unmuted_peers_count:int unread_muted_messages_count:int unread_unmuted_messages_count:int = Dialog;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Is this folder pinned |
| **folder** | [Folder](/type/Folder.md) | The folder |
| **peer** | [Peer](/type/Peer.md) | Peer in folder |
| **top\_message** | [int](/type/int.md) | Latest message ID of dialog |
| **unread\_muted\_peers\_count** | [int](/type/int.md) | Number of unread muted peers in folder |
| **unread\_unmuted\_peers\_count** | [int](/type/int.md) | Number of unread unmuted peers in folder |
| **unread\_muted\_messages\_count** | [int](/type/int.md) | Number of unread messages from muted peers in folder |
| **unread\_unmuted\_messages\_count** | [int](/type/int.md) | Number of unread messages from unmuted peers in folder |

### Type
[Dialog](/type/Dialog.md)
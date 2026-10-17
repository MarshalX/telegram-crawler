# chatlists.editExportedInvite

Edit a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
exportedChatlistInvite#c5181ac flags:# title:string url:string peers:Vector<Peer> = ExportedChatlistInvite;
---functions---
chatlists.editExportedInvite#653db63d flags:# chatlist:InputChatlist slug:string title:flags.1?string peers:flags.2?Vector<InputPeer> = ExportedChatlistInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | Folder ID |
| **slug** | [string](/type/string.md) | `slug` obtained from the [chat folder deep link »](/api/links.md#chat-folder-links). |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If set, sets a new name for the link |
| **peers** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | If set, changes the list of peers shared with the link |

### Result
[ExportedChatlistInvite](/type/ExportedChatlistInvite.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |
| 400 | INVITE\_SLUG\_EMPTY | The specified invite slug is empty. |
| 400 | INVITE\_SLUG\_EXPIRED | The specified chat folder link has expired. |
| 400 | PEERS\_LIST\_EMPTY | The specified list of peers is empty. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
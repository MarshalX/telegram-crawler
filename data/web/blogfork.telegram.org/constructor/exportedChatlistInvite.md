# exportedChatlistInvite

Exported [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
exportedChatlistInvite#c5181ac flags:# title:string url:string peers:Vector<Peer> = ExportedChatlistInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title** | [string](/type/string.md) | Name of the link |
| **url** | [string](/type/string.md) | The [chat folder deep link »](/api/links.md#chat-folder-links). |
| **peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | Peers to import |

### Type
[ExportedChatlistInvite](/type/ExportedChatlistInvite.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
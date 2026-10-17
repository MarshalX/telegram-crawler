# messages.deleteSavedHistory

Deletes messages from a [monoforum topic »](/api/monoforum.md), or deletes messages forwarded from a specific peer to [saved messages »](/api/saved-messages.md).

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
---functions---
messages.deleteSavedHistory#4dc5085f flags:# parent_peer:flags.0?InputPeer peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | If set, affects the messages of the passed [monoforum topic »](/api/monoforum.md), otherwise affects [saved messages »](/api/saved-messages.md). |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer, whose messages will be deleted from [saved messages »](/api/saved-messages.md), or the ID of the topic. |
| **max\_id** | [int](/type/int.md) | Maximum ID of message to delete |
| **min\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Delete all messages newer than this UNIX timestamp |
| **max\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Delete all messages older than this UNIX timestamp |

### Result
[messages.AffectedHistory](/type/messages.AffectedHistory.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
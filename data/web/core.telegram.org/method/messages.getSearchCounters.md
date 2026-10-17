# messages.getSearchCounters

Get the number of results that would be found by a [messages.search](/method/messages.search.md) call with the same parameters

```tl
---functions---
messages.getSearchCounters#1bbcf300 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer top_msg_id:flags.0?int filters:Vector<MessagesFilter> = Vector<messages.SearchCounter>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where to search |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPeer](/type/InputPeer.md) | Search within the [saved message dialog »](/api/saved-messages.md) with this ID. |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, consider only messages within the specified [forum topic](/api/forum.md#forum-topics) |
| **filters** | [Vector](/type/Vector%20t)&lt;[MessagesFilter](/type/MessagesFilter.md)&gt; | Search filters |

### Result
[Vector](/type/Vector%20t)&lt;[messages.SearchCounter](/type/messages.SearchCounter.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [messages.search](/method/messages.search.md)
Search for messages.
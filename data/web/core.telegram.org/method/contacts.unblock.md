# contacts.unblock

Deletes a peer from a blocklist, see [here »](/api/block.md) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
contacts.unblock#b550d328 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the peer should be removed from the story blocklist; if not set, the peer will be removed from the main blocklist, see [here »](/api/block.md) for more info. |
| **id** | [InputPeer](/type/InputPeer.md) | Peer |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CONTACT\_ID\_INVALID | The provided contact ID is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.
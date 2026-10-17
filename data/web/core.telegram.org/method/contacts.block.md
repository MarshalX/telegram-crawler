# contacts.block

Adds a peer to a blocklist, see [here »](/api/block.md) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
contacts.block#2e2e8734 flags:# my_stories_from:flags.0?true id:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the peer should be added to the story blocklist; if not set, the peer will be added to the main blocklist, see [here »](/api/block.md) for more info. |
| **id** | [InputPeer](/type/InputPeer.md) | Peer |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CONTACT\_ID\_INVALID | The provided contact ID is invalid. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.
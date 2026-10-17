# contacts.getBlocked

Returns the list of blocked users.

```tl
contacts.blocked#ade1591 blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
contacts.blockedSlice#e1664194 count:int blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
---functions---
contacts.getBlocked#9a868f80 flags:# my_stories_from:flags.0?true offset:int limit:int = contacts.Blocked;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to fetch the story blocklist; if not set, will fetch the main blocklist. See [here »](/api/block.md) for differences between the two. |
| **offset** | [int](/type/int.md) | The number of list elements to be skipped |
| **limit** | [int](/type/int.md) | The number of list elements to be returned |

### Result
[contacts.Blocked](/type/contacts.Blocked.md)

### Only users can use this method

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.
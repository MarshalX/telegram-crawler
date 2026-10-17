# contacts.setBlocked

Replace the contents of an entire [blocklist, see here for more info »](/api/block.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
contacts.setBlocked#94c65c76 flags:# my_stories_from:flags.0?true id:Vector<InputPeer> limit:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to edit the story blocklist; if not set, will edit the main blocklist. See [here »](/api/block.md) for differences between the two. |
| **id** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Full content of the blocklist. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
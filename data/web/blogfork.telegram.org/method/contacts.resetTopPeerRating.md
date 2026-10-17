# contacts.resetTopPeerRating

Reset [rating](/api/top-rating.md) of top peer

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
contacts.resetTopPeerRating#1ae373ac category:TopPeerCategory peer:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **category** | [TopPeerCategory](/type/TopPeerCategory.md) | Top peer category |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer whose rating should be reset |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Top peer rating](/api/top-rating.md)
If enabled, the rating of top peers indicates the relevance of a frequently used peer in a certain category (frequently messaged users, frequently used bots, inline bots, frequently visited channels and so on).
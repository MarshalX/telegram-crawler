# stories.togglePeerStoriesHidden

Hide the active stories of a user, preventing them from being displayed on the action bar on the homescreen, see [here »](/api/stories.md#hiding-stories-of-other-users) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stories.togglePeerStoriesHidden#bd0415c4 peer:InputPeer hidden:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer whose stories should be (un)hidden. |
| **hidden** | [Bool](/type/Bool.md) | Whether to hide or unhide stories. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
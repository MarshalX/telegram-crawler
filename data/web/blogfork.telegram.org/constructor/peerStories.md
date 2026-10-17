# peerStories

[Stories](/api/stories.md) associated to a peer

```tl
peerStories#9a35e999 flags:# peer:Peer max_read_id:flags.0?int stories:Vector<StoryItem> = PeerStories;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | The peer |
| **max\_read\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, contains the ID of the maximum read story |
| **stories** | [Vector](/type/Vector%20t)&lt;[StoryItem](/type/StoryItem.md)&gt; | Stories |

### Type
[PeerStories](/type/PeerStories.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
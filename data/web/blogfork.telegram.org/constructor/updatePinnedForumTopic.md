# updatePinnedForumTopic

A [forum topic »](/api/forum.md#forum-topics) was pinned or unpinned.

```tl
updatePinnedForumTopic#683b2c52 flags:# pinned:flags.0?true peer:Peer topic_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the topic was pinned or unpinned |
| **peer** | [Peer](/type/Peer.md) | The supergroup forum, private chat (for forum-enabled bots) or bot forum (for users) where the topic is located. |
| **topic\_id** | [int](/type/int.md) | The topic ID |

### Type
[Update](/type/Update.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.
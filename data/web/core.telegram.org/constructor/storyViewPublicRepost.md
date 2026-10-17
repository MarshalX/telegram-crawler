# storyViewPublicRepost

A certain peer has reposted the story.

```tl
storyViewPublicRepost#bd74cf49 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer story:StoryItem = StoryView;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **blocked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we have [completely blocked](/api/block.md) this user, including from viewing more of our stories. |
| **blocked\_my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we have [blocked](/api/block.md) this user from viewing more of our stories. |
| **peer\_id** | [Peer](/type/Peer.md) | The peer that reposted the story. |
| **story** | [StoryItem](/type/StoryItem.md) | The reposted story. |

### Type
[StoryView](/type/StoryView.md)

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.
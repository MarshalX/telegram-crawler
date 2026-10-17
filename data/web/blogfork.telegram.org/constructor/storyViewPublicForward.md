# storyViewPublicForward

A certain peer has forwarded the story as a message to a public chat or channel.

```tl
storyViewPublicForward#9083670b flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true message:Message = StoryView;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **blocked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we have [completely blocked](/api/block.md) this user, including from viewing more of our stories. |
| **blocked\_my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we have [blocked](/api/block.md) this user from viewing more of our stories. |
| **message** | [Message](/type/Message.md) | The message with the forwarded story. |

### Type
[StoryView](/type/StoryView.md)

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.
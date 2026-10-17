# storyFwdHeader

Contains info about the original poster of a reposted story.

```tl
storyFwdHeader#b826e150 flags:# modified:flags.3?true from:flags.0?Peer from_name:flags.1?string story_id:flags.2?int = StoryFwdHeader;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **modified** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the story media was modified before reposting it (for example by overlaying a round video with a reaction). |
| **from** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | Peer that originally posted the story; will be empty for stories forwarded from a user with forwards privacy enabled, in which case `from_name` will be set, instead. |
| **from\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Will be set for stories forwarded from a user with forwards privacy enabled, in which case `from` will also be empty. |
| **story\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | , contains the story ID |

### Type
[StoryFwdHeader](/type/StoryFwdHeader.md)
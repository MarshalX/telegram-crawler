# channelAdminLogEventActionPinTopic

A [forum topic](/api/forum.md#forum-topics) was pinned or unpinned

```tl
channelAdminLogEventActionPinTopic#5d8d353b flags:# prev_topic:flags.0?ForumTopic new_topic:flags.1?ForumTopic = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **prev\_topic** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[ForumTopic](/type/ForumTopic.md) | Previous topic information |
| **new\_topic** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[ForumTopic](/type/ForumTopic.md) | New topic information |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.
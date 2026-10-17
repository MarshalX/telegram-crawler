# channelAdminLogEventActionEditTopic

A [forum topic](/api/forum.md#forum-topics) was edited

```tl
channelAdminLogEventActionEditTopic#f06fe208 prev_topic:ForumTopic new_topic:ForumTopic = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_topic** | [ForumTopic](/type/ForumTopic.md) | Previous topic information |
| **new\_topic** | [ForumTopic](/type/ForumTopic.md) | New topic information |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.
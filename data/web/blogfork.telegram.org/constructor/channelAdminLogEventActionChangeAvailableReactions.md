# channelAdminLogEventActionChangeAvailableReactions

The set of allowed [message reactions »](/api/reactions.md) for this channel has changed

```tl
channelAdminLogEventActionChangeAvailableReactions#be4e0ef8 prev_value:ChatReactions new_value:ChatReactions = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_value** | [ChatReactions](/type/ChatReactions.md) | Previously allowed reaction emojis |
| **new\_value** | [ChatReactions](/type/ChatReactions.md) | New allowed reaction emojis |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
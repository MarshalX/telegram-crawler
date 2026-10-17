# channelAdminLogEventActionParticipantSubExtend

A paid subscriber has extended their [Telegram Star subscription »](/api/stars.md#star-subscriptions).

```tl
channelAdminLogEventActionParticipantSubExtend#64642db3 prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_participant** | [ChannelParticipant](/type/ChannelParticipant.md) | Same as `new_participant`. |
| **new\_participant** | [ChannelParticipant](/type/ChannelParticipant.md) | The subscriber that extended the subscription. |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
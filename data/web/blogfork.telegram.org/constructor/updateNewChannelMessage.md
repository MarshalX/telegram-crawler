# updateNewChannelMessage

A new message was sent in a [channel/supergroup](/api/channel.md)

```tl
updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **message** | [Message](/type/Message.md) | New message |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
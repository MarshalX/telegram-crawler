# updateChannelWebPage

A webpage preview of a link in a [channel/supergroup](/api/channel.md) message was generated

```tl
updateChannelWebPage#2f2ba99f channel_id:long webpage:WebPage pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | [Channel/supergroup](/api/channel.md) ID |
| **webpage** | [WebPage](/type/WebPage.md) | Generated webpage preview |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.
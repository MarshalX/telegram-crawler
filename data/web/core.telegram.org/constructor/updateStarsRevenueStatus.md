# updateStarsRevenueStatus

The [Telegram Star balance of a channel/bot we own has changed »](/api/stars.md#revenue-statistics).

```tl
updateStarsRevenueStatus#a584b019 peer:Peer status:StarsRevenueStatus = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Channel/bot |
| **status** | [StarsRevenueStatus](/type/StarsRevenueStatus.md) | New Telegram Star balance. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
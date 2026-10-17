# payments.getStarsRevenueAdsAccountUrl

Returns a URL for a Telegram Ad platform account that can be used to set up advertisements for channel/bot in `peer`, paid using the Telegram Stars owned by the specified `peer`, see [here »](/api/stars.md#paying-for-ads) for more info.

```tl
payments.starsRevenueAdsAccountUrl#394e7f21 url:string = payments.StarsRevenueAdsAccountUrl;
---functions---
payments.getStarsRevenueAdsAccountUrl#d1d7efc5 peer:InputPeer = payments.StarsRevenueAdsAccountUrl;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Channel or bot that owns the stars. |

### Result
[payments.StarsRevenueAdsAccountUrl](/type/payments.StarsRevenueAdsAccountUrl.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
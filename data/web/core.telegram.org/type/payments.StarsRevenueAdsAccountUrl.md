# payments.StarsRevenueAdsAccountUrl

Contains a URL leading to a page where the user will be able to place ads for the channel/bot, paying using [Telegram Stars](/api/stars.md#paying-for-ads).

```tl
payments.starsRevenueAdsAccountUrl#394e7f21 url:string = payments.StarsRevenueAdsAccountUrl;

---functions---

payments.getStarsRevenueAdsAccountUrl#d1d7efc5 peer:InputPeer = payments.StarsRevenueAdsAccountUrl;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starsRevenueAdsAccountUrl](/constructor/payments.starsRevenueAdsAccountUrl.md) | Contains a URL leading to a page where the user will be able to place ads for the channel/bot, paying using [Telegram Stars](/api/stars.md#paying-for-ads). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarsRevenueAdsAccountUrl](/method/payments.getStarsRevenueAdsAccountUrl.md) | Returns a URL for a Telegram Ad platform account that can be used to set up advertisements for channel/bot in `peer`, paid using the Telegram Stars owned by the specified `peer`, see [here »](/api/stars.md#paying-for-ads) for more info. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
# account.toggleSponsoredMessages

Disable or re-enable Telegram ads for the current [Premium](/api/premium.md) account.

Useful for business owners that may want to launch and view their own Telegram ads via the [Telegram ad platform »](https://ads.telegram.org).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.toggleSponsoredMessages#b9d9a38d enabled:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **enabled** | [Bool](/type/Bool.md) | Enable or disable ads. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.
# fragment.getCollectibleInfo

Fetch information about a [fragment collectible, see here »](/api/fragment.md#fetching-info-about-fragment-collectibles) for more info on the full flow.

```tl
fragment.collectibleInfo#6ebdff91 purchase_date:int currency:string amount:long crypto_currency:string crypto_amount:long url:string = fragment.CollectibleInfo;
---functions---
fragment.getCollectibleInfo#be1e85ba collectible:InputCollectible = fragment.CollectibleInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **collectible** | [InputCollectible](/type/InputCollectible.md) | Collectible to fetch info about. |

### Result
[fragment.CollectibleInfo](/type/fragment.CollectibleInfo.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | COLLECTIBLE\_INVALID | The specified collectible is invalid. |
| 400 | COLLECTIBLE\_NOT\_FOUND | The specified collectible could not be found. |

### Related pages

#### [Fragment collectibles](/api/fragment.md)
Telegram users can make it easy for others to contact them or find their public groups and channels via usernames: clients can also assign multiple Fragment &raquo; collectible usernames to accounts, supergroups and channels they own; Fragment &raquo; also allows purchasing phone number collectibles that can be used to register Telegram accounts.
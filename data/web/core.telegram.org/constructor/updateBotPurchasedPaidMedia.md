# updateBotPurchasedPaidMedia

Bots only: a user has purchased a [paid media](/api/paid-media.md).

```tl
updateBotPurchasedPaidMedia#283bd312 user_id:long payload:string qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | The user that bought the media |
| **payload** | [string](/type/string.md) | Payload passed by the bot in [inputMediaPaidMedia](/constructor/inputMediaPaidMedia.md).`payload` |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [inputMediaPaidMedia](/constructor/inputMediaPaidMedia.md)
[Paid media, see here »](/api/paid-media.md) for more info.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.
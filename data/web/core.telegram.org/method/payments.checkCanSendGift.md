# payments.checkCanSendGift

Check if the specified [gift »](/api/gifts.md) can be sent.

```tl
payments.checkCanSendGiftResultOk#374fa7ad = payments.CheckCanSendGiftResult;
payments.checkCanSendGiftResultFail#d5e58274 reason:TextWithEntities = payments.CheckCanSendGiftResult;
---functions---
payments.checkCanSendGift#c0c4edc9 gift_id:long = payments.CheckCanSendGiftResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift\_id** | [long](/type/long.md) | Gift ID. |

### Result
[payments.CheckCanSendGiftResult](/type/payments.CheckCanSendGiftResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.
# payments.CheckCanSendGiftResult

Specifies if a gift can or cannot be sent.

```tl
payments.checkCanSendGiftResultOk#374fa7ad = payments.CheckCanSendGiftResult;
payments.checkCanSendGiftResultFail#d5e58274 reason:TextWithEntities = payments.CheckCanSendGiftResult;

---functions---

payments.checkCanSendGift#c0c4edc9 gift_id:long = payments.CheckCanSendGiftResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.checkCanSendGiftResultOk](/constructor/payments.checkCanSendGiftResultOk.md) | The specified gift can be sent. |
| [payments.checkCanSendGiftResultFail](/constructor/payments.checkCanSendGiftResultFail.md) | The specified gift cannot be sent yet for the specified reason. |

### Methods

| Method | Description |
| --- | --- |
| [payments.checkCanSendGift](/method/payments.checkCanSendGift.md) | Check if the specified [gift »](/api/gifts.md) can be sent. |
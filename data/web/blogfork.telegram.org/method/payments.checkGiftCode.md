# payments.checkGiftCode

Obtain information about a [Telegram Premium giftcode »](/api/giveaways.md)

```tl
payments.checkedGiftCode#eb983f8f flags:# via_giveaway:flags.2?true from_id:flags.4?Peer giveaway_msg_id:flags.3?int to_id:flags.0?long date:int days:int used_date:flags.1?int chats:Vector<Chat> users:Vector<User> = payments.CheckedGiftCode;
---functions---
payments.checkGiftCode#8e51b4c1 slug:string = payments.CheckedGiftCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | The giftcode to check |

### Result
[payments.CheckedGiftCode](/type/payments.CheckedGiftCode.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GIFT\_SLUG\_EXPIRED | The specified gift slug has expired. |
| 400 | GIFT\_SLUG\_INVALID | The specified slug is invalid. |

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.
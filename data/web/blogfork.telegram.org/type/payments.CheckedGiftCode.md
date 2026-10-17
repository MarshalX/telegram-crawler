# Payments.CheckedGiftCode

Info about a [Telegram Premium Giftcode](/api/giveaways.md).

```tl
payments.checkedGiftCode#eb983f8f flags:# via_giveaway:flags.2?true from_id:flags.4?Peer giveaway_msg_id:flags.3?int to_id:flags.0?long date:int days:int used_date:flags.1?int chats:Vector<Chat> users:Vector<User> = payments.CheckedGiftCode;

---functions---

payments.checkGiftCode#8e51b4c1 slug:string = payments.CheckedGiftCode;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.checkedGiftCode](/constructor/payments.checkedGiftCode.md) | Contains info about a [Telegram Premium giftcode link](/api/links.md#premium-giftcode-links). |

### Methods

| Method | Description |
| --- | --- |
| [payments.checkGiftCode](/method/payments.checkGiftCode.md) | Obtain information about a [Telegram Premium giftcode »](/api/giveaways.md) |

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.
# Payments.GiveawayInfo

Info about a [Telegram Premium Giveaway](/api/giveaways.md).

```tl
payments.giveawayInfo#4367daa0 flags:# participating:flags.0?true preparing_results:flags.3?true start_date:int joined_too_early_date:flags.1?int admin_disallowed_chat_id:flags.2?long disallowed_country:flags.4?string = payments.GiveawayInfo;
payments.giveawayInfoResults#e175e66f flags:# winner:flags.0?true refunded:flags.1?true start_date:int gift_code_slug:flags.3?string stars_prize:flags.4?long finish_date:int winners_count:int activated_count:flags.2?int = payments.GiveawayInfo;

---functions---

payments.getGiveawayInfo#f4239425 peer:InputPeer msg_id:int = payments.GiveawayInfo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.giveawayInfo](/constructor/payments.giveawayInfo.md) | Contains info about an ongoing [giveaway](/api/giveaways.md).\
\
If neither the `participating`, `joined_too_early_date`, `admin_disallowed_chat_id` or `disallowed_country` flags are set, the user is not currently participating in the giveaway but could participate by joining all the channels specified in the [messageMediaGiveaway](/constructor/messageMediaGiveaway.md).`channels` field. |
| [payments.giveawayInfoResults](/constructor/payments.giveawayInfoResults.md) | A [giveaway](/api/giveaways.md) has ended. |

### Methods

| Method | Description |
| --- | --- |
| [payments.getGiveawayInfo](/method/payments.getGiveawayInfo.md) | Obtain information about a [Telegram Premium giveaway »](/api/giveaways.md). |

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.
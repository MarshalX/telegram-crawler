# payments.checkedGiftCode

Contains info about a [Telegram Premium giftcode link](/api/links.md#premium-giftcode-links).

```tl
payments.checkedGiftCode#eb983f8f flags:# via_giveaway:flags.2?true from_id:flags.4?Peer giveaway_msg_id:flags.3?int to_id:flags.0?long date:int days:int used_date:flags.1?int chats:Vector<Chat> users:Vector<User> = payments.CheckedGiftCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_giveaway** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this giftcode was created by a [giveaway](/api/giveaways.md). |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Peer](/type/Peer.md) | The peer that created the gift code. |
| **giveaway\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Message ID of the giveaway in the channel specified in `from_id`. |
| **to\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | The destination user of the gift. |
| **date** | [int](/type/int.md) | Creation date of the gift code. |
| **days** | [int](/type/int.md) | Duration of the gifted Telegram Premium subscription, in days. |
| **used\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | When was the giftcode imported, if it was imported. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[payments.CheckedGiftCode](/type/payments.CheckedGiftCode.md)

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
# messageActionPrizeStars

You won some [Telegram Stars](/api/stars.md) in a [Telegram Star giveaway »](/api/giveaways.md#star-giveaways).

This service message should be displayed below the appropriate sticker from the [inputStickerSetPremiumGifts »](/constructor/inputStickerSetPremiumGifts.md) [stickerset »](/api/stickers.md#stickersets):

- If `stars <= 1000`, choose the sticker with emoji equal to "2️⃣"
- If `stars < 2500`, choose the sticker with emoji equal to "3️⃣"
- Otherwise, choose the sticker with emoji equal to "4️⃣"

```tl
messageActionPrizeStars#b00c47a2 flags:# unclaimed:flags.0?true stars:long transaction_id:string boost_peer:Peer giveaway_msg_id:int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unclaimed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this indicates the reverse transaction that refunds the remaining stars to the creator of a giveaway if, when the giveaway ends, the number of members in the channel is smaller than the number of winners in the giveaway. |
| **stars** | [long](/type/long.md) | The number of Telegram Stars you won |
| **transaction\_id** | [string](/type/string.md) | ID of the telegram star transaction. |
| **boost\_peer** | [Peer](/type/Peer.md) | Identifier of the peer that was automatically boosted by the winners of the giveaway. |
| **giveaway\_msg\_id** | [int](/type/int.md) | ID of the message containing the [messageMediaGiveaway](/constructor/messageMediaGiveaway.md) |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [messageMediaGiveaway](/constructor/messageMediaGiveaway.md)
Contains info about a [giveaway, see here »](/api/giveaways.md) for more info.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md)
Stickers to show when receiving a gifted Telegram Premium subscription

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
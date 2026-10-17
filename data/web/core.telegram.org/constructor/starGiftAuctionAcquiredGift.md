# starGiftAuctionAcquiredGift

Describes a gift that the current user won in an auction.

```tl
starGiftAuctionAcquiredGift#42b00348 flags:# name_hidden:flags.0?true peer:Peer date:int bid_amount:long round:int pos:int message:flags.1?TextWithEntities gift_num:flags.2?int = StarGiftAuctionAcquiredGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **name\_hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, your name will be hidden if the destination peer decides to display the gift on their profile (they will still see that you sent the gift). |
| **peer** | [Peer](/type/Peer.md) | The peer that received the gift. |
| **date** | [int](/type/int.md) | When was the gift obtained. |
| **bid\_amount** | [long](/type/long.md) | The amount in [Telegram Stars](/api/stars.md) that was bid in order to obtain the gift. |
| **round** | [int](/type/int.md) | The round number where the gift was obtained. |
| **pos** | [int](/type/int.md) | The position of the gift in the auction. |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Optional message that attached with the gift, passed when making the bid. |
| **gift\_num** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | If set, the collectible number of the won gift among all collectibles of the same type. \
This field is optional because **only** auction collectibles won before this field was introduced in the API will not have this flag set. |

### Type
[StarGiftAuctionAcquiredGift](/type/StarGiftAuctionAcquiredGift.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
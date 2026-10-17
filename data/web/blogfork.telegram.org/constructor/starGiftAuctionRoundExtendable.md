# starGiftAuctionRoundExtendable

Describes one or more extendable [collectible gift auction rounds »](/api/auctions.md).

```tl
starGiftAuctionRoundExtendable#aa021e5 num:int duration:int extend_top:int extend_window:int = StarGiftAuctionRound;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **num** | [int](/type/int.md) | This object describes all rounds starting from `num` up until `next.num-1` inclusively (`next` is the next [StarGiftAuctionRound](/type/StarGiftAuctionRound.md)). |
| **duration** | [int](/type/int.md) | Duration in seconds of the round(s). |
| **extend\_top** | [int](/type/int.md) | The round(s) will be extended by `extend_window` if a bid changes the composition/order of the top `extend_top` bidders. |
| **extend\_window** | [int](/type/int.md) | The round(s) will be extended by this many seconds if a bid changes the composition/order of the top `extend_top` bidders. |

### Type
[StarGiftAuctionRound](/type/StarGiftAuctionRound.md)

### Related pages

#### [StarGiftAuctionRound](/type/StarGiftAuctionRound.md)
Describes one or more rounds of a [collectible gift auction »](/api/auctions.md), optionally extendable.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
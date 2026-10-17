# starGiftAuctionRound

Describes one or more [collectible gift auction rounds »](/api/auctions.md).

```tl
starGiftAuctionRound#3aae0528 num:int duration:int = StarGiftAuctionRound;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **num** | [int](/type/int.md) | This object describes all rounds starting from `num` up until `next.num-1` inclusively (`next` is the next [StarGiftAuctionRound](/type/StarGiftAuctionRound.md)). |
| **duration** | [int](/type/int.md) | Duration in seconds of the round(s). |

### Type
[StarGiftAuctionRound](/type/StarGiftAuctionRound.md)

### Related pages

#### [StarGiftAuctionRound](/type/StarGiftAuctionRound.md)
Describes one or more rounds of a [collectible gift auction »](/api/auctions.md), optionally extendable.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
# starGiftAuctionState

Represents an active or pending [auction »](/api/auctions.md).

```tl
starGiftAuctionState#771a4e66 version:int start_date:int end_date:int min_bid_amount:long bid_levels:Vector<AuctionBidLevel> top_bidders:Vector<long> next_round_at:int last_gift_num:int gifts_left:int current_round:int total_rounds:int rounds:Vector<StarGiftAuctionRound> = StarGiftAuctionState;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **version** | [int](/type/int.md) | Only apply incoming [starGiftAuctionState](/constructor/starGiftAuctionState.md) constructors if the received `version` is bigger than the locally cached `version`. |
| **start\_date** | [int](/type/int.md) | UNIX timestamp indicating when the auction will start (or when it started, if it's in the past). |
| **end\_date** | [int](/type/int.md) | UNIX timestamp indicating when the auction will end |
| **min\_bid\_amount** | [long](/type/long.md) | Minumum allowed bid amount in [Telegram Stars](/api/stars.md): only applicable if the user hasn't made a bid yet, otherwise must be overridden to the value of [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md).`min_bid_amount` (which will be set if and only if the user already made a bid to this auction). |
| **bid\_levels** | [Vector](/type/Vector%20t)&lt;[AuctionBidLevel](/type/AuctionBidLevel.md)&gt; | Contains a sparse list of bids starting from the top bids, a more detailed description is available in [the docs](/api/auctions.md). |
| **top\_bidders** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | User IDs of the top 3 bidders (the [user](/constructor/user.md) constructors will be returned as [min](/api/min.md) constructors in the containing object). |
| **next\_round\_at** | [int](/type/int.md) | UNIX timestamp indicating when the current auction round will end, distributing [starGift](/constructor/starGift.md).`gifts_per_round` gifts to the top [starGift](/constructor/starGift.md).`gifts_per_round` bidders. |
| **last\_gift\_num** | [int](/type/int.md) | The number of gifts that were distributed in the previous round (also used to compute the approximated index of the gift that the current user will receive, `last_gift_num + approx_pos`, see [here »](/api/auctions.md) for more info). |
| **gifts\_left** | [int](/type/int.md) | The remaining number of gifts that are yet to be distributed. |
| **current\_round** | [int](/type/int.md) | The current round number (starting from 1). |
| **total\_rounds** | [int](/type/int.md) | The total number of rounds in this auction. |
| **rounds** | [Vector](/type/Vector%20t)&lt;[StarGiftAuctionRound](/type/StarGiftAuctionRound.md)&gt; | Detailed round information. |

### Type
[StarGiftAuctionState](/type/StarGiftAuctionState.md)

### Related pages

#### [starGiftAuctionState](/constructor/starGiftAuctionState.md)
Represents an active or pending [auction »](/api/auctions.md).

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md)
Contains information about the current user's state in an [auction »](/api/auctions.md).

The `bid_amount`, `bid_date`, `bid_peer` and `min_bid_amount` flags of [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md) will all be set if the user placed a bid in the auction.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [user](/constructor/user.md)
Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.
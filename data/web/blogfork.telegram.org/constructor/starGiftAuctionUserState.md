# starGiftAuctionUserState

Contains information about the current user's state in an [auction »](/api/auctions.md).

The `bid_amount`, `bid_date`, `bid_peer` and `min_bid_amount` flags of [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md) will all be set if the user placed a bid in the auction.

```tl
starGiftAuctionUserState#2eeed1c4 flags:# returned:flags.1?true bid_amount:flags.0?long bid_date:flags.0?int min_bid_amount:flags.0?long bid_peer:flags.0?Peer acquired_count:int = StarGiftAuctionUserState;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **returned** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the placed bid was returned to the user, because it was outbid so much that it fell out of the top [starGiftAuctionState](/constructor/starGiftAuctionState.md).`gifts_left` positions, meaning that even if no new bids are placed, the user will never receive any gifts, so the bid was completely removed from the auction, and in order to participate again the user must manually make a new bid. |
| **bid\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Contains the amount of the placed bid in [Telegram Stars](/api/stars.md). |
| **bid\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Contains a UNIX timestamp, indicating when the bid was placed. |
| **min\_bid\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Contains the minumum allowed bid amount in [Telegram Stars](/api/stars.md), if set overrides [starGiftAuctionState](/constructor/starGiftAuctionState.md).`min_bid_amount` for the current user. |
| **bid\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | Contains the peer that will receive the gift, if you end up winning this round |
| **acquired\_count** | [int](/type/int.md) | Contains the number of gifts that were purchased so far in the auction by the current user. |

### Type
[StarGiftAuctionUserState](/type/StarGiftAuctionUserState.md)

### Related pages

#### [starGiftAuctionState](/constructor/starGiftAuctionState.md)
Represents an active or pending [auction »](/api/auctions.md).

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md)
Contains information about the current user's state in an [auction »](/api/auctions.md).

The `bid_amount`, `bid_date`, `bid_peer` and `min_bid_amount` flags of [starGiftAuctionUserState](/constructor/starGiftAuctionUserState.md) will all be set if the user placed a bid in the auction.
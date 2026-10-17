# payments.getStarGiftActiveAuctions

Fetches all currently active [gift auctions](/api/auctions.md) **the user has ever bid on** (including auctions where the user was outbid and their bid was returned), as long as the auction hasn't ended yet.

This method is primarily used to display an auction badge in the chat list immediately on app startup, without waiting for real-time [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) updates to arrive: the client calls it to discover which auctions the user is participating in and show the badge proactively.

To instead fetch the full state of a single auction, subscribe to its real-time updates and render the detailed auction UI (typically when the user opens a specific auction), use [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md).

```tl
payments.starGiftActiveAuctionsNotModified#db33dad0 = payments.StarGiftActiveAuctions;
payments.starGiftActiveAuctions#aef6abbc auctions:Vector<StarGiftActiveAuctionState> users:Vector<User> chats:Vector<Chat> = payments.StarGiftActiveAuctions;
---functions---
payments.getStarGiftActiveAuctions#a5d0514d hash:long = payments.StarGiftActiveAuctions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Hash generated [as specified here »](/api/auctions.md) |

### Result
[payments.StarGiftActiveAuctions](/type/payments.StarGiftActiveAuctions.md)

### Only users can use this method

### Related pages

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.

#### [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md)
Contains updates to [auction state, see here »](/api/auctions.md) for more info on how to enable these updates.

#### [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md)
Returns info about a [collectible gift auction »](/api/auctions.md); also subscribes the user to auction updates, see [here »](/api/auctions.md) for more info on the full flow.
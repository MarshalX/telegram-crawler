# Payments.StarGiftActiveAuctions

List of currently active [gift auctions »](/api/auctions.md) where the user has placed a bid, or an indication that the locally cached list hasn't changed.

```tl
payments.starGiftActiveAuctionsNotModified#db33dad0 = payments.StarGiftActiveAuctions;
payments.starGiftActiveAuctions#aef6abbc auctions:Vector<StarGiftActiveAuctionState> users:Vector<User> chats:Vector<Chat> = payments.StarGiftActiveAuctions;

---functions---

payments.getStarGiftActiveAuctions#a5d0514d hash:long = payments.StarGiftActiveAuctions;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starGiftActiveAuctionsNotModified](/constructor/payments.starGiftActiveAuctionsNotModified.md) | The list of currently active [gift auctions](/api/auctions.md) **where the user has placed a bid** hasn't changed. |
| [payments.starGiftActiveAuctions](/constructor/payments.starGiftActiveAuctions.md) | Describes all currently active [gift auctions](/api/auctions.md) **where the user has placed a bid**. |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarGiftActiveAuctions](/method/payments.getStarGiftActiveAuctions.md) | Fetches all currently active [gift auctions](/api/auctions.md) **the user has ever bid on** (including auctions where the user was outbid and their bid was returned), as long as the auction hasn't ended yet.\
\
This method is primarily used to display an auction badge in the chat list immediately on app startup, without waiting for real-time [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) updates to arrive: the client calls it to discover which auctions the user is participating in and show the badge proactively.\
\
To instead fetch the full state of a single auction, subscribe to its real-time updates and render the detailed auction UI (typically when the user opens a specific auction), use [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md). |

### Related pages

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
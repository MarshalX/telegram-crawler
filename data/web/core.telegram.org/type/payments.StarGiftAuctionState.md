# Payments.StarGiftAuctionState

Describes a [collectible gift auction »](/api/auctions.md).

```tl
payments.starGiftAuctionState#6b39f4ec gift:StarGift state:StarGiftAuctionState user_state:StarGiftAuctionUserState timeout:int users:Vector<User> chats:Vector<Chat> = payments.StarGiftAuctionState;

---functions---

payments.getStarGiftAuctionState#5c9ff4d6 auction:InputStarGiftAuction version:int = payments.StarGiftAuctionState;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starGiftAuctionState](/constructor/payments.starGiftAuctionState.md) | Describes a [collectible gift auction »](/api/auctions.md). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md) | Returns info about a [collectible gift auction »](/api/auctions.md); also subscribes the user to auction updates, see [here »](/api/auctions.md) for more info on the full flow. |

### Related pages

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
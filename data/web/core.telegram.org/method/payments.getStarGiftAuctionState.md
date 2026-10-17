# payments.getStarGiftAuctionState

Returns info about a [collectible gift auction »](/api/auctions.md); also subscribes the user to auction updates, see [here »](/api/auctions.md) for more info on the full flow.

```tl
payments.starGiftAuctionState#6b39f4ec gift:StarGift state:StarGiftAuctionState user_state:StarGiftAuctionUserState timeout:int users:Vector<User> chats:Vector<Chat> = payments.StarGiftAuctionState;
---functions---
payments.getStarGiftAuctionState#5c9ff4d6 auction:InputStarGiftAuction version:int = payments.StarGiftAuctionState;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **auction** | [InputStarGiftAuction](/type/InputStarGiftAuction.md) | Either the ID of the gift linked to the auction, or an [auction deep link slug »](/api/links.md#auction-links). |
| **version** | [int](/type/int.md) | Initially `0`, then set to the returned [starGiftAuctionState](/constructor/starGiftAuctionState.md).`version`, to avoid refetching results if they haven't changed. |

### Result
[payments.StarGiftAuctionState](/type/payments.StarGiftAuctionState.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [starGiftAuctionState](/constructor/starGiftAuctionState.md)
Represents an active or pending [auction »](/api/auctions.md).

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
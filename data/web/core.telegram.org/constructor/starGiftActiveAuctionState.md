# starGiftActiveAuctionState

Contains info about [an auction where the user has placed a bid »](/api/auctions.md).

```tl
starGiftActiveAuctionState#d31bc45d gift:StarGift state:StarGiftAuctionState user_state:StarGiftAuctionUserState = StarGiftActiveAuctionState;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift** | [StarGift](/type/StarGift.md) | The [collectible gift »](/api/gifts.md#collectible-gifts) currently being distributed in the auction. |
| **state** | [StarGiftAuctionState](/type/StarGiftAuctionState.md) | Auction state |
| **user\_state** | [StarGiftAuctionUserState](/type/StarGiftAuctionUserState.md) | Auction state related to the current user (i.e. info about placed bids, won gifts and so on). |

### Type
[StarGiftActiveAuctionState](/type/StarGiftActiveAuctionState.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
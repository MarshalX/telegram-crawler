# updateStarGiftAuctionState

Contains updates to [auction state, see here »](/api/auctions.md) for more info on how to enable these updates.

```tl
updateStarGiftAuctionState#48e246c2 gift_id:long state:StarGiftAuctionState = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift\_id** | [long](/type/long.md) | ID of the [collectible gift »](/api/gifts.md#collectible-gifts) currently being distributed in the auction. |
| **state** | [StarGiftAuctionState](/type/StarGiftAuctionState.md) | Auction state. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
# InputStarGiftAuction

Identifies a [collectible gift auction »](/api/auctions.md), either by the ID of the linked collectible gift or by an auction deep link slug.

```tl
inputStarGiftAuction#2e16c98 gift_id:long = InputStarGiftAuction;
inputStarGiftAuctionSlug#7ab58308 slug:string = InputStarGiftAuction;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputStarGiftAuction](/constructor/inputStarGiftAuction.md) | Used to fetch [auctions](/api/auctions.md) using the ID of the linked [collectible gift](/api/gifts.md#collectible-gifts). |
| [inputStarGiftAuctionSlug](/constructor/inputStarGiftAuctionSlug.md) | Used to fetch [auctions](/api/auctions.md) using the [slug of an auction deep link »](/api/links.md#auction-links). |

### Related pages

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
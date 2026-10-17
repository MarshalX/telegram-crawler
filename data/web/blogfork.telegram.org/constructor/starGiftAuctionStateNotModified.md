# starGiftAuctionStateNotModified

Returned only by auction methods (never by updates) if the passed `version` is equal to the remote [auction »](/api/auctions.md).`version`, meaning auction information hasn't changed over the locally cached version.

```tl
starGiftAuctionStateNotModified#fe333952 = StarGiftAuctionState;
```

### Parameters

This constructor does not require any parameters.

### Type
[StarGiftAuctionState](/type/StarGiftAuctionState.md)

### Related pages

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
# starGiftAuctionStateFinished

Represents a finished [auction »](/api/auctions.md).

```tl
starGiftAuctionStateFinished#972dabbf flags:# start_date:int end_date:int average_price:long listed_count:flags.0?int fragment_listed_count:flags.1?int fragment_listed_url:flags.1?string = StarGiftAuctionState;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **start\_date** | [int](/type/int.md) | UNIX timestamp indicating when the auction started. |
| **end\_date** | [int](/type/int.md) | UNIX timestamp indicating when the auction ended. |
| **average\_price** | [long](/type/long.md) | Average price of distributed gifts. |
| **listed\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Number of gifts from the auction currently being resold on Telegram: if set, when the corresponding element is clicked in graphical clients, [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md) should be invoked with the ID of the gift associated to this auction, see [here »](/api/auctions.md) for more info. |
| **fragment\_listed\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Number of gifts from the auction currently being resold on [Fragment](https://fragment.com). |
| **fragment\_listed\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Only set if `fragment_listed_count` is set. If set, when the corresponding element is clicked in graphical clients, this URL should be opened. |

### Type
[StarGiftAuctionState](/type/StarGiftAuctionState.md)

### Related pages

#### [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md)
Get [collectible gifts](/api/gifts.md#collectible-gifts) of a specific type currently on resale, see [here »](/api/gifts.md#reselling-collectible-gifts) for more info.

`sort_by_price` and `sort_by_num` are mutually exclusive, if neither are set results are sorted by the unixtime (descending) when their resell price was last changed.

See [here »](/api/gifts.md#sending-gifts) for detailed documentation on this method.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
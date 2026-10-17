# payments.starGiftAuctionState

Describes a [collectible gift auction »](/api/auctions.md).

```tl
payments.starGiftAuctionState#6b39f4ec gift:StarGift state:StarGiftAuctionState user_state:StarGiftAuctionUserState timeout:int users:Vector<User> chats:Vector<Chat> = payments.StarGiftAuctionState;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift** | [StarGift](/type/StarGift.md) | The gift currently being distributed in the auction. |
| **state** | [StarGiftAuctionState](/type/StarGiftAuctionState.md) | Auction state. |
| **user\_state** | [StarGiftAuctionUserState](/type/StarGiftAuctionUserState.md) | Auction state related to the current user (i.e. info about placed bids, won gifts, and so on). |
| **timeout** | [int](/type/int.md) | Re-invoke the [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md) method after `timeout` seconds to keep receiving auction updates, see [here »](/api/auctions.md) for more info on the full flow. |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |

### Type
[payments.StarGiftAuctionState](/type/payments.StarGiftAuctionState.md)

### Related pages

#### [payments.getStarGiftAuctionState](/method/payments.getStarGiftAuctionState.md)
Returns info about a [collectible gift auction »](/api/auctions.md); also subscribes the user to auction updates, see [here »](/api/auctions.md) for more info on the full flow.

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
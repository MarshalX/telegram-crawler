# payments.starGiftActiveAuctions

Describes all currently active [gift auctions](/api/auctions.md) **where the user has placed a bid**.

```tl
payments.starGiftActiveAuctions#aef6abbc auctions:Vector<StarGiftActiveAuctionState> users:Vector<User> chats:Vector<Chat> = payments.StarGiftActiveAuctions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **auctions** | [Vector](/type/Vector%20t)&lt;[StarGiftActiveAuctionState](/type/StarGiftActiveAuctionState.md)&gt; | Auctions where the user has placed a bid |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |

### Type
[payments.StarGiftActiveAuctions](/type/payments.StarGiftActiveAuctions.md)

### Related pages

#### [Collectible gift auctions](/api/auctions.md)
New collectible gift releases are distributed through Stars auctions held over several rounds.
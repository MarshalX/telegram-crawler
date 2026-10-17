# InputSavedStarGift

Points to a [gift »](/api/gifts.md).

```tl
inputSavedStarGiftUser#69279795 msg_id:int = InputSavedStarGift;
inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
inputSavedStarGiftSlug#2085c238 slug:string = InputSavedStarGift;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputSavedStarGiftUser](/constructor/inputSavedStarGiftUser.md) | A gift received in a private chat with another user. |
| [inputSavedStarGiftChat](/constructor/inputSavedStarGiftChat.md) | A gift received by a channel we own. |
| [inputSavedStarGiftSlug](/constructor/inputSavedStarGiftSlug.md) | Points to a [collectible gift obtained from a collectible gift link »](/api/links.md#collectible-gift-link). |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.
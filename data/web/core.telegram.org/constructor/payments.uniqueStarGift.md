# payments.uniqueStarGift

Represents a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
payments.uniqueStarGift#416c56e8 gift:StarGift chats:Vector<Chat> users:Vector<User> = payments.UniqueStarGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift** | [StarGift](/type/StarGift.md) | The [starGiftUnique](/constructor/starGiftUnique.md) constructor. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the `gift` field. |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the `gift` field. |

### Type
[payments.UniqueStarGift](/type/payments.UniqueStarGift.md)

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.
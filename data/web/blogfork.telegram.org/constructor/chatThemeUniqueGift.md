# chatThemeUniqueGift

A chat theme based on a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
chatThemeUniqueGift#3458f9c8 gift:StarGift theme_settings:Vector<ThemeSettings> = ChatTheme;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift** | [StarGift](/type/StarGift.md) | The owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) on which this theme is based, as a [starGiftUnique](/constructor/starGiftUnique.md) constructor. |
| **theme\_settings** | [Vector](/type/Vector%20t)&lt;[ThemeSettings](/type/ThemeSettings.md)&gt; | Theme settings. |

### Type
[ChatTheme](/type/ChatTheme.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.
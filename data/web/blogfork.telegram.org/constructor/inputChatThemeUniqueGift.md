# inputChatThemeUniqueGift

Set a theme based on an owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts), returned by [account.getUniqueGiftChatThemes](/method/account.getUniqueGiftChatThemes.md).

```tl
inputChatThemeUniqueGift#87e5dfe4 slug:string = InputChatTheme;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | The slug from [starGiftUnique](/constructor/starGiftUnique.md).`slug`. |

### Type
[InputChatTheme](/type/InputChatTheme.md)

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [account.getUniqueGiftChatThemes](/method/account.getUniqueGiftChatThemes.md)
Obtain all [chat themes »](/api/themes.md#chat-themes) associated to owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts).
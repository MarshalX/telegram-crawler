# starGiftAttributeModel

The model of a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
starGiftAttributeModel#565251e2 flags:# crafted:flags.0?true name:string document:Document rarity:StarGiftAttributeRarity = StarGiftAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **crafted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | This model is reserved for [crafting »](/api/gifts.md#crafting-collectible-gifts), and should be filtered out from regular upgrade previews. |
| **name** | [string](/type/string.md) | Name of the model |
| **document** | [Document](/type/Document.md) | The [sticker](/api/stickers.md) representing the upgraded gift |
| **rarity** | [StarGiftAttributeRarity](/type/StarGiftAttributeRarity.md) | Rarity of this model. |

### Type
[StarGiftAttribute](/type/StarGiftAttribute.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
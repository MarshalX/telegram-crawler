# starGiftAttributeBackdrop

The backdrop of a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
starGiftAttributeBackdrop#9f2504e4 name:string backdrop_id:int center_color:int edge_color:int pattern_color:int text_color:int rarity:StarGiftAttributeRarity = StarGiftAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **name** | [string](/type/string.md) | Name of the backdrop |
| **backdrop\_id** | [int](/type/int.md) | Unique ID of the backdrop |
| **center\_color** | [int](/type/int.md) | Color of the center of the backdrop in RGB24 format. |
| **edge\_color** | [int](/type/int.md) | Color of the edges of the backdrop in RGB24 format. |
| **pattern\_color** | [int](/type/int.md) | Color of the [starGiftAttributePattern](/constructor/starGiftAttributePattern.md) applied on the backdrop in RGB24 format. |
| **text\_color** | [int](/type/int.md) | Color of the text on the backdrop in RGB24 format. |
| **rarity** | [StarGiftAttributeRarity](/type/StarGiftAttributeRarity.md) | Rarity of this backdrop. |

### Type
[StarGiftAttribute](/type/StarGiftAttribute.md)

### Related pages

#### [starGiftAttributePattern](/constructor/starGiftAttributePattern.md)
A [sticker](/api/stickers.md) applied on the backdrop of a [collectible gift »](/api/gifts.md) using a repeating pattern.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.
# StarGiftAttribute

An attribute of a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
starGiftAttributeModel#565251e2 flags:# crafted:flags.0?true name:string document:Document rarity:StarGiftAttributeRarity = StarGiftAttribute;
starGiftAttributePattern#4e7085ea name:string document:Document rarity:StarGiftAttributeRarity = StarGiftAttribute;
starGiftAttributeBackdrop#9f2504e4 name:string backdrop_id:int center_color:int edge_color:int pattern_color:int text_color:int rarity:StarGiftAttributeRarity = StarGiftAttribute;
starGiftAttributeOriginalDetails#e0bff26c flags:# sender_id:flags.0?Peer recipient_id:Peer date:int message:flags.1?TextWithEntities = StarGiftAttribute;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) | The model of a [collectible gift »](/api/gifts.md#collectible-gifts). |
| [starGiftAttributePattern](/constructor/starGiftAttributePattern.md) | A [sticker](/api/stickers.md) applied on the backdrop of a [collectible gift »](/api/gifts.md) using a repeating pattern. |
| [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md) | The backdrop of a [collectible gift »](/api/gifts.md#collectible-gifts). |
| [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) | Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts). |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.
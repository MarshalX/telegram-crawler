# payments.starGiftUpgradeAttributes

List of just the collectible attributes that may appear for a gift type once it's upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
payments.starGiftUpgradeAttributes#46c6e36f attributes:Vector<StarGiftAttribute> = payments.StarGiftUpgradeAttributes;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **attributes** | [Vector](/type/Vector%20t)&lt;[StarGiftAttribute](/type/StarGiftAttribute.md)&gt; | Full list of possible attributes that may be assigned when gifts of the specified type are turned into [collectible gifts »](/api/gifts.md#collectible-gifts), including craft-only models marked with [starGiftAttributeModel](/constructor/starGiftAttributeModel.md).`crafted`. |

### Type
[payments.StarGiftUpgradeAttributes](/type/payments.StarGiftUpgradeAttributes.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [starGiftAttributeModel](/constructor/starGiftAttributeModel.md)
The model of a [collectible gift »](/api/gifts.md#collectible-gifts).
# payments.getResaleStarGifts

Get [collectible gifts](/api/gifts.md#collectible-gifts) of a specific type currently on resale, see [here »](/api/gifts.md#reselling-collectible-gifts) for more info.

`sort_by_price` and `sort_by_num` are mutually exclusive, if neither are set results are sorted by the unixtime (descending) when their resell price was last changed.

See [here »](/api/gifts.md#sending-gifts) for detailed documentation on this method.

```tl
payments.resaleStarGifts#947a12df flags:# count:int gifts:Vector<StarGift> next_offset:flags.0?string attributes:flags.1?Vector<StarGiftAttribute> attributes_hash:flags.1?long chats:Vector<Chat> counters:flags.2?Vector<StarGiftAttributeCounter> users:Vector<User> = payments.ResaleStarGifts;
---functions---
payments.getResaleStarGifts#7a5fa236 flags:# sort_by_price:flags.1?true sort_by_num:flags.2?true for_craft:flags.4?true stars_only:flags.5?true attributes_hash:flags.0?long gift_id:long attributes:flags.3?Vector<StarGiftAttributeId> offset:string limit:int = payments.ResaleStarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **sort\_by\_price** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Sort gifts by price (ascending). |
| **sort\_by\_num** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Sort gifts by number (ascending). |
| **for\_craft** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Only return collectible gifts that can be bought and used for [crafting »](/api/gifts.md#crafting-collectible-gifts); render each returned gift's [starGiftUnique](/constructor/starGiftUnique.md).`craft_chance_permille` as its crafting success contribution. |
| **stars\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Only return gifts that can be bought using [Stars](/api/stars.md). |
| **attributes\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | If a previous call to the method was made and [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes_hash` was set, pass it here to avoid returning any results if they haven't changed. \
Otherwise, set this flag and pass `0` to return [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes_hash` and [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`attributes`, **these two fields will not be set** if this flag is not set. |
| **gift\_id** | [long](/type/long.md) | Mandatory identifier of the base gift from which the collectible gift was upgraded. |
| **attributes** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[StarGiftAttributeId](/type/StarGiftAttributeId.md)&gt; | Optionally filter gifts with the specified attributes. If no attributes of a specific type are specified, all attributes of that type are allowed. |
| **offset** | [string](/type/string.md) | Offset for pagination. If not equal to an empty string, [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md).`counters` will not be set to avoid returning the counters every time a new page is fetched. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[payments.ResaleStarGifts](/type/payments.ResaleStarGifts.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_ATTRIBUTE\_INVALID | One of the specified star gift attributes is invalid. |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [payments.resaleStarGifts](/constructor/payments.resaleStarGifts.md)
List of gifts currently on [resale »](/api/gifts.md#reselling-collectible-gifts).

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
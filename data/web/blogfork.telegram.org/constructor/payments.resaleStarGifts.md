# payments.resaleStarGifts

List of gifts currently on [resale »](/api/gifts.md#reselling-collectible-gifts).

```tl
payments.resaleStarGifts#947a12df flags:# count:int gifts:Vector<StarGift> next_offset:flags.0?string attributes:flags.1?Vector<StarGiftAttribute> attributes_hash:flags.1?long chats:Vector<Chat> counters:flags.2?Vector<StarGiftAttributeCounter> users:Vector<User> = payments.ResaleStarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of results. |
| **gifts** | [Vector](/type/Vector%20t)&lt;[StarGift](/type/StarGift.md)&gt; | Collectible gifts on resale (may be less than `count`, in which case `next_offset` will be set). |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset for pagination, pass this to [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md).`offset` to fetch the next results. |
| **attributes** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[StarGiftAttribute](/type/StarGiftAttribute.md)&gt; | Possible gift attributes, only set if [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md).`attributes_hash` is set (on the first call, it must be equal to `0`). |
| **attributes\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | Hash of the `attributes` field, pass this to [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md).`attributes_hash` to avoid returning any attributes (flag not set) if they haven't changed. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in the attributes. |
| **counters** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[StarGiftAttributeCounter](/type/StarGiftAttributeCounter.md)&gt; | Indicates the total number of gifts that have a specific attribute, only set if [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md).`offset` is empty (since this field is not related to the current result page but to all of them, it's only returned on the first page). |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the attributes. |

### Type
[payments.ResaleStarGifts](/type/payments.ResaleStarGifts.md)

### Related pages

#### [payments.getResaleStarGifts](/method/payments.getResaleStarGifts.md)
Get [collectible gifts](/api/gifts.md#collectible-gifts) of a specific type currently on resale, see [here »](/api/gifts.md#reselling-collectible-gifts) for more info.

`sort_by_price` and `sort_by_num` are mutually exclusive, if neither are set results are sorted by the unixtime (descending) when their resell price was last changed.

See [here »](/api/gifts.md#sending-gifts) for detailed documentation on this method.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.
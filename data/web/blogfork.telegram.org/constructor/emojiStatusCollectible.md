# emojiStatusCollectible

An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status.

**Cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first before passing it to that method.

```tl
emojiStatusCollectible#7184603b flags:# collectible_id:long document_id:long title:string slug:string pattern_document_id:long center_color:int edge_color:int pattern_color:int text_color:int until:flags.0?int = EmojiStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **collectible\_id** | [long](/type/long.md) | ID of the collectible (from [starGiftUnique](/constructor/starGiftUnique.md).`id`). |
| **document\_id** | [long](/type/long.md) | ID of the [custom emoji](/api/custom-emoji.md) representing the status. |
| **title** | [string](/type/string.md) | Name of the collectible. |
| **slug** | [string](/type/string.md) | Unique identifier of the collectible that may be used to create a [collectible gift link »](/api/links.md#collectible-gift-link) for the current collectible, or to fetch further info about the collectible using [payments.getUniqueStarGift](/method/payments.getUniqueStarGift.md). |
| **pattern\_document\_id** | [long](/type/long.md) | The ID of a pattern to apply on the profile's backdrop, correlated to the [starGiftAttributePattern](/constructor/starGiftAttributePattern.md) from the gift in `slug`. |
| **center\_color** | [int](/type/int.md) | Color of the center of the profile backdrop in RGB24 format, from the gift's [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md). |
| **edge\_color** | [int](/type/int.md) | Color of the edges of the profile backdrop in RGB24 format, from the gift's [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md). |
| **pattern\_color** | [int](/type/int.md) | Color of the `pattern_document_id` applied on the profile backdrop in RGB24 format, from the gift's [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md). |
| **text\_color** | [int](/type/int.md) | Color of text on the profile backdrop in RGB24 format, from the gift's [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md). |
| **until** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, the emoji status will be active until the specified unixtime. |

### Type
[EmojiStatus](/type/EmojiStatus.md)

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [payments.getUniqueStarGift](/method/payments.getUniqueStarGift.md)
Obtain info about a [collectible gift »](/api/gifts.md#collectible-gifts) using a slug obtained from a [collectible gift link »](/api/links.md#collectible-gift-link).

#### [starGiftAttributePattern](/constructor/starGiftAttributePattern.md)
A [sticker](/api/stickers.md) applied on the backdrop of a [collectible gift »](/api/gifts.md) using a repeating pattern.

#### [starGiftAttributeBackdrop](/constructor/starGiftAttributeBackdrop.md)
The backdrop of a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [account.updateEmojiStatus](/method/account.updateEmojiStatus.md)
Set an [emoji status](/api/emoji-status.md)

#### [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md)
An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status: can only be used in [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), is never returned by the API.

Note that once set, the status will be returned to users as a [emojiStatusCollectible](/constructor/emojiStatusCollectible.md) constructor, instead (which **cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), and must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first).
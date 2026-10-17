# inputEmojiStatusCollectible

An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status: can only be used in [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), is never returned by the API.

Note that once set, the status will be returned to users as a [emojiStatusCollectible](/constructor/emojiStatusCollectible.md) constructor, instead (which **cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), and must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first).

```tl
inputEmojiStatusCollectible#7141dbf flags:# collectible_id:long until:flags.0?int = EmojiStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **collectible\_id** | [long](/type/long.md) | ID of the collectible (from [starGiftUnique](/constructor/starGiftUnique.md).`id`). |
| **until** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, the emoji status will be active until the specified unixtime. |

### Type
[EmojiStatus](/type/EmojiStatus.md)

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [account.updateEmojiStatus](/method/account.updateEmojiStatus.md)
Set an [emoji status](/api/emoji-status.md)

#### [emojiStatusCollectible](/constructor/emojiStatusCollectible.md)
An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status.

**Cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first before passing it to that method.

#### [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md)
An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status: can only be used in [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), is never returned by the API.

Note that once set, the status will be returned to users as a [emojiStatusCollectible](/constructor/emojiStatusCollectible.md) constructor, instead (which **cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), and must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first).
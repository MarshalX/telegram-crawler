# stickerSet

Represents a stickerset (stickerpack)

```tl
stickerSet#2dd14edc flags:# archived:flags.1?true official:flags.2?true masks:flags.3?true emojis:flags.7?true text_color:flags.9?true channel_emoji_status:flags.10?true creator:flags.11?true installed_date:flags.0?int id:long access_hash:long title:string short_name:string thumbs:flags.4?Vector<PhotoSize> thumb_dc_id:flags.4?int thumb_version:flags.4?int thumb_document_id:flags.8?long count:int hash:int = StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **archived** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this stickerset was archived (due to too many saved stickers in the current account) |
| **official** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Is this stickerset official |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Is this a mask stickerset |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | This is a custom emoji stickerset |
| **text\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether the color of this TGS custom emoji stickerset should be changed to the text color when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context. |
| **channel\_emoji\_status** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, this custom emoji stickerset can be used in [channel/supergroup emoji statuses](/api/emoji-status.md). |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether we created this stickerset |
| **installed\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | When was this stickerset installed |
| **id** | [long](/type/long.md) | ID of the stickerset |
| **access\_hash** | [long](/type/long.md) | Access hash of stickerset |
| **title** | [string](/type/string.md) | Title of stickerset |
| **short\_name** | [string](/type/string.md) | Short name of stickerset, used when sharing stickerset using [stickerset deep links](/api/links.md#stickerset-links). |
| **thumbs** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[PhotoSize](/type/PhotoSize.md)&gt; | Stickerset thumbnail |
| **thumb\_dc\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | DC ID of thumbnail |
| **thumb\_version** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Thumbnail version |
| **thumb\_document\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[long](/type/long.md) | Document ID of custom emoji thumbnail, fetch the document using [messages.getCustomEmojiDocuments](/method/messages.getCustomEmojiDocuments.md) |
| **count** | [int](/type/int.md) | Number of stickers in pack |
| **hash** | [int](/type/int.md) | Hash |

### Type
[StickerSet](/type/StickerSet.md)

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [messages.getCustomEmojiDocuments](/method/messages.getCustomEmojiDocuments.md)
Fetch [custom emoji stickers »](/api/custom-emoji.md).

Returns a list of [documents](/constructor/document.md) with the animated custom emoji in TGS format, and a [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md) attribute with the original emoji and info about the emoji stickerset this custom emoji belongs to.
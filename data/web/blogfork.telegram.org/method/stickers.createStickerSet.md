# stickers.createStickerSet

Create a stickerset.

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.createStickerSet#9021ab67 flags:# masks:flags.0?true emojis:flags.5?true text_color:flags.6?true user_id:InputUser title:string short_name:string thumb:flags.2?InputDocument stickers:Vector<InputStickerSetItem> software:flags.3?string = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is a mask stickerset |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this is a [custom emoji](/api/custom-emoji.md) stickerset. |
| **text\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether the color of TGS custom emojis contained in this set should be changed to the text color when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context. For custom emoji stickersets only. |
| **user\_id** | [InputUser](/type/InputUser.md) | Stickerset owner |
| **title** | [string](/type/string.md) | Stickerset name, `1-64` chars |
| **short\_name** | [string](/type/string.md) | Short name of sticker set, to be used in [sticker deep links »](/api/links.md#stickerset-links). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and, **if called by a bot**, must end in `"_by_<bot_username>"`. `<bot_username>` is case insensitive. 1-64 characters. |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputDocument](/type/InputDocument.md) | Thumbnail |
| **stickers** | [Vector](/type/Vector%20t)&lt;[InputStickerSetItem](/type/InputStickerSetItem.md)&gt; | Stickers |
| **software** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Used when [importing stickers using the sticker import SDKs](/import-stickers.md), specifies the name of the software that created the stickers |

### Result
[messages.StickerSet](/type/messages.StickerSet.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PACK\_SHORT\_NAME\_INVALID | Short pack name invalid. |
| 400 | PACK\_SHORT\_NAME\_OCCUPIED | A stickerpack with this name already exists. |
| 400 | PACK\_TITLE\_INVALID | The stickerpack title is invalid. |
| 400 | PACK\_TYPE\_INVALID | The masks and emojis flags are mutually exclusive. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STICKERS\_EMPTY | No sticker provided. |
| 400 | STICKER\_EMOJI\_INVALID | Sticker emoji invalid. |
| 400 | STICKER\_FILE\_INVALID | Sticker file invalid. |
| 400 | STICKER\_GIF\_DIMENSIONS | The specified video sticker has invalid dimensions. |
| 400 | STICKER\_PNG\_DIMENSIONS | Sticker png dimensions invalid. |
| 400 | STICKER\_PNG\_NOPNG | One of the specified stickers is not a valid PNG file. |
| 400 | STICKER\_TGS\_NODOC | You must send the animated sticker as a document. |
| 400 | STICKER\_TGS\_NOTGS | Invalid TGS sticker provided. |
| 400 | STICKER\_THUMB\_PNG\_NOPNG | Incorrect stickerset thumb file provided, PNG / WEBP expected. |
| 400 | STICKER\_THUMB\_TGS\_NOTGS | Incorrect stickerset TGS thumb file provided. |
| 400 | STICKER\_VIDEO\_BIG | The specified video sticker is too big. |
| 400 | STICKER\_VIDEO\_NODOC | You must send the video sticker as a document. |
| 400 | STICKER\_VIDEO\_NOWEBM | The specified video sticker is not in webm format. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
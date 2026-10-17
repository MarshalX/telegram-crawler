# messages.getArchivedStickers

Get all archived stickers

```tl
messages.archivedStickers#4fcba9c8 count:int sets:Vector<StickerSetCovered> = messages.ArchivedStickers;
---functions---
messages.getArchivedStickers#57f17692 flags:# masks:flags.0?true emojis:flags.1?true offset_id:long limit:int = messages.ArchivedStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Get [mask stickers](/api/stickers.md#mask-stickers) |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Get [custom emoji stickers](/api/custom-emoji.md) |
| **offset\_id** | [long](/type/long.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[messages.ArchivedStickers](/type/messages.ArchivedStickers.md)

### Only users can use this method

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
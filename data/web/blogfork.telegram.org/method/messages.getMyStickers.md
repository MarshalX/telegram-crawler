# messages.getMyStickers

Fetch all [stickersets »](/api/stickers.md) owned by the current user.

```tl
messages.myStickers#faff629d count:int sets:Vector<StickerSetCovered> = messages.MyStickers;
---functions---
messages.getMyStickers#d0b5e1fc offset_id:long limit:int = messages.MyStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset\_id** | [long](/type/long.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[messages.MyStickers](/type/messages.MyStickers.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
# messages.MyStickers

The list of [stickersets owned by the current account »](/api/stickers.md).

```tl
messages.myStickers#faff629d count:int sets:Vector<StickerSetCovered> = messages.MyStickers;

---functions---

messages.getMyStickers#d0b5e1fc offset_id:long limit:int = messages.MyStickers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.myStickers](/constructor/messages.myStickers.md) | The list of [stickersets owned by the current account »](/api/stickers.md). |

### Methods

| Method | Description |
| --- | --- |
| [messages.getMyStickers](/method/messages.getMyStickers.md) | Fetch all [stickersets »](/api/stickers.md) owned by the current user. |

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
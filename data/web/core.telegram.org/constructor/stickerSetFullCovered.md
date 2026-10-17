# stickerSetFullCovered

Stickerset preview with all stickers of the stickerset included.  
Currently used only for [custom emoji stickersets](/api/custom-emoji.md), to avoid a further call to [messages.getStickerSet](/method/messages.getStickerSet.md).

```tl
stickerSetFullCovered#40d13c0e set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = StickerSetCovered;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **set** | [StickerSet](/type/StickerSet.md) | Stickerset |
| **packs** | [Vector](/type/Vector%20t)&lt;[StickerPack](/type/StickerPack.md)&gt; | Emoji information about every sticker in the stickerset |
| **keywords** | [Vector](/type/Vector%20t)&lt;[StickerKeyword](/type/StickerKeyword.md)&gt; | Keywords for some or every sticker in the stickerset. |
| **documents** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Stickers |

### Type
[StickerSetCovered](/type/StickerSetCovered.md)

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [messages.getStickerSet](/method/messages.getStickerSet.md)
Get info about a stickerset
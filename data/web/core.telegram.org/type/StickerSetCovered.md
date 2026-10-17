# StickerSetCovered

Stickerset preview

```tl
stickerSetCovered#6410a5d2 set:StickerSet cover:Document = StickerSetCovered;
stickerSetMultiCovered#3407e51b set:StickerSet covers:Vector<Document> = StickerSetCovered;
stickerSetFullCovered#40d13c0e set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = StickerSetCovered;
stickerSetNoCovered#77b15d1c set:StickerSet = StickerSetCovered;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stickerSetCovered](/constructor/stickerSetCovered.md) | Stickerset with a single sticker as preview |
| [stickerSetMultiCovered](/constructor/stickerSetMultiCovered.md) | Stickerset, with multiple stickers as preview |
| [stickerSetFullCovered](/constructor/stickerSetFullCovered.md) | Stickerset preview with all stickers of the stickerset included.  \
Currently used only for [custom emoji stickersets](/api/custom-emoji.md), to avoid a further call to [messages.getStickerSet](/method/messages.getStickerSet.md). |
| [stickerSetNoCovered](/constructor/stickerSetNoCovered.md) | Just the stickerset information, with no previews. |
# videoSizeStickerMarkup

An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [sticker](/api/stickers.md).

```tl
videoSizeStickerMarkup#da082fe stickerset:InputStickerSet sticker_id:long background_colors:Vector<int> = VideoSize;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Stickerset |
| **sticker\_id** | [long](/type/long.md) | Sticker ID |
| **background\_colors** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | 1, 2, 3 or 4 RBG-24 colors used to generate a solid (1), gradient (2) or freeform gradient (3, 4) background, similar to how [fill wallpapers](/api/wallpapers.md#fill-types) are generated. The rotation angle for gradient backgrounds is 0. |

### Type
[VideoSize](/type/VideoSize.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
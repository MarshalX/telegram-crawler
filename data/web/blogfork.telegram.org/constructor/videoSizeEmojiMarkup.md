# videoSizeEmojiMarkup

An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [custom emoji sticker](/api/custom-emoji.md).

```tl
videoSizeEmojiMarkup#f85c413c emoji_id:long background_colors:Vector<int> = VideoSize;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **emoji\_id** | [long](/type/long.md) | [Custom emoji ID](/api/custom-emoji.md): the custom emoji sticker is shown at the center of the profile picture and occupies at most 67% of it. |
| **background\_colors** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | 1, 2, 3 or 4 RBG-24 colors used to generate a solid (1), gradient (2) or freeform gradient (3, 4) background, similar to how [fill wallpapers](/api/wallpapers.md#fill-types) are generated. The rotation angle for gradient backgrounds is 0. |

### Type
[VideoSize](/type/VideoSize.md)

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
# maskCoords

Position on a photo where a mask should be placed when [attaching stickers to media »](/api/stickers.md#attached-stickers)

The `n` position indicates where the mask should be placed:

- 0 =&gt; Relative to the forehead
- 1 =&gt; Relative to the eyes
- 2 =&gt; Relative to the mouth
- 3 =&gt; Relative to the chin

```tl
maskCoords#aed6dbb2 n:int x:double y:double zoom:double = MaskCoords;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **n** | [int](/type/int.md) | Part of the face, relative to which the mask should be placed |
| **x** | [double](/type/double.md) | Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. (For example, -1.0 will place the mask just to the left of the default mask position) |
| **y** | [double](/type/double.md) | Shift by Y-axis measured in widths of the mask scaled to the face size, from left to right. (For example, -1.0 will place the mask just below the default mask position) |
| **zoom** | [double](/type/double.md) | Mask scaling coefficient. (For example, 2.0 means a doubled size) |

### Type
[MaskCoords](/type/MaskCoords.md)

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
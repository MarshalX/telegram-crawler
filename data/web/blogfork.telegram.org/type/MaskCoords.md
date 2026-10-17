# MaskCoords

Mask coordinates (if this is a mask sticker, attached to a photo)

```tl
maskCoords#aed6dbb2 n:int x:double y:double zoom:double = MaskCoords;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [maskCoords](/constructor/maskCoords.md) | Position on a photo where a mask should be placed when [attaching stickers to media »](/api/stickers.md#attached-stickers)\
\
The `n` position indicates where the mask should be placed:\
\
- 0 =&gt; Relative to the forehead\
- 1 =&gt; Relative to the eyes\
- 2 =&gt; Relative to the mouth\
- 3 =&gt; Relative to the chin |
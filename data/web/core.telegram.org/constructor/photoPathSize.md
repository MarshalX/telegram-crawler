# photoPathSize

Messages with animated stickers can have a compressed svg (&lt; 300 bytes) to show the outline of the sticker before fetching the actual lottie animation.

```tl
photoPathSize#d8214d41 type:string bytes:bytes = PhotoSize;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [string](/type/string.md) | Always [`j` »](/api/files.md#vector-thumbnails) |
| **bytes** | [bytes](/type/bytes.md) | Compressed SVG path payload, see [vector thumbnails »](/api/files.md#vector-thumbnails) |

### Type
[PhotoSize](/type/PhotoSize.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
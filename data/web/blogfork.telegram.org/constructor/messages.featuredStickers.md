# messages.featuredStickers

Featured stickersets

```tl
messages.featuredStickers#be382906 flags:# premium:flags.0?true hash:long count:int sets:Vector<StickerSetCovered> unread:Vector<long> = messages.FeaturedStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is a premium stickerset |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **count** | [int](/type/int.md) | Total number of featured stickers |
| **sets** | [Vector](/type/Vector%20t)&lt;[StickerSetCovered](/type/StickerSetCovered.md)&gt; | Featured stickersets |
| **unread** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | IDs of new featured stickersets |

### Type
[messages.FeaturedStickers](/type/messages.FeaturedStickers.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
# messageExtendedMediaPreview

Paid media preview for not yet purchased paid media, [see here »](/api/paid-media.md) for more info.

```tl
messageExtendedMediaPreview#ad628cc8 flags:# w:flags.0?int h:flags.0?int thumb:flags.1?PhotoSize video_duration:flags.2?int = MessageExtendedMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **w** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Width |
| **h** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Height |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[PhotoSize](/type/PhotoSize.md) | [Extremely low resolution thumbnail](/api/files.md#stripped-thumbnails). |
| **video\_duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Video duration for videos. |

### Type
[MessageExtendedMedia](/type/MessageExtendedMedia.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.
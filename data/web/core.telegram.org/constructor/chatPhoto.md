# chatPhoto

Group profile photo.

```tl
chatPhoto#1c6e1c11 flags:# has_video:flags.0?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = ChatPhoto;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_video** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the user has an animated profile picture |
| **photo\_id** | [long](/type/long.md) | Photo ID |
| **stripped\_thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[bytes](/type/bytes.md) | [Stripped thumbnail](/api/files.md#stripped-thumbnails) |
| **dc\_id** | [int](/type/int.md) | DC where this photo is stored |

### Type
[ChatPhoto](/type/ChatPhoto.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
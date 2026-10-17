# videoSize

An [animated profile picture](/api/files.md#animated-profile-pictures) in MPEG4 format

```tl
videoSize#de33b094 flags:# type:string w:int h:int size:int video_start_ts:flags.0?double = VideoSize;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **type** | [string](/type/string.md) | [videoSize.type value »](/api/files.md#videosizetype-values) |
| **w** | [int](/type/int.md) | Video width |
| **h** | [int](/type/int.md) | Video height |
| **size** | [int](/type/int.md) | File size |
| **video\_start\_ts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[double](/type/double.md) | Timestamp that should be shown as static preview to the user (seconds) |

### Type
[VideoSize](/type/VideoSize.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
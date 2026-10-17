# autoDownloadSettings

Autodownload settings

```tl
autoDownloadSettings#baa57628 flags:# disabled:flags.0?true video_preload_large:flags.1?true audio_preload_next:flags.2?true phonecalls_less_data:flags.3?true stories_preload:flags.4?true photo_size_max:int video_size_max:long file_size_max:long video_upload_maxbitrate:int small_queue_active_operations_max:int large_queue_active_operations_max:int = AutoDownloadSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Disable automatic media downloads? |
| **video\_preload\_large** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to preload the first seconds of videos larger than the specified limit |
| **audio\_preload\_next** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to preload the next audio track when you're listening to music |
| **phonecalls\_less\_data** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether to enable data saving mode in phone calls |
| **stories\_preload** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether to preload [stories](/api/stories.md); in particular, the first [documentAttributeVideo](/constructor/documentAttributeVideo.md).`preload_prefix_size` bytes of story videos should be preloaded. |
| **photo\_size\_max** | [int](/type/int.md) | Maximum size of photos to preload |
| **video\_size\_max** | [long](/type/long.md) | Maximum size of videos to preload |
| **file\_size\_max** | [long](/type/long.md) | Maximum size of other files to preload |
| **video\_upload\_maxbitrate** | [int](/type/int.md) | Maximum suggested bitrate for **uploading** videos |
| **small\_queue\_active\_operations\_max** | [int](/type/int.md) | A limit, specifying the maximum number of files that should be downloaded in parallel from the same DC, for files smaller than 20MB. |
| **large\_queue\_active\_operations\_max** | [int](/type/int.md) | A limit, specifying the maximum number of files that should be downloaded in parallel from the same DC, for files bigger than 20MB. |

### Type
[AutoDownloadSettings](/type/AutoDownloadSettings.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [documentAttributeVideo](/constructor/documentAttributeVideo.md)
Defines a video
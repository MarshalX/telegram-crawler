# inputWebFileAudioAlbumThumbLocation

Used to download an album cover for any music file using [upload.getWebFile](/method/upload.getWebFile.md), see the [webfile docs for more info »](/api/files.md#downloading-webfiles).

```tl
inputWebFileAudioAlbumThumbLocation#f46fe924 flags:# small:flags.2?true document:flags.0?InputDocument title:flags.1?string performer:flags.1?string = InputWebFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **small** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Used to return a thumbnail with `100x100` resolution (instead of the default `600x600`) |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputDocument](/type/InputDocument.md) | The audio file in question: must NOT be provided in secret chats, provide the `title` and `performer` fields instead. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Song title: should only be used in secret chats, in normal chats provide `document` instead, as it has more lax rate limits. |
| **performer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Song performer: should only be used in secret chats, in normal chats provide `document` instead, as it has more lax rate limits. |

### Type
[InputWebFileLocation](/type/InputWebFileLocation.md)

### Related pages

#### [upload.getWebfile](/method/upload.getWebFile.md)
Returns content of a web file, by proxying the request through telegram, see the [webfile docs for more info](/api/files.md#downloading-webfiles).

**Note**: the query must be sent to the DC specified in the `webfile_dc_id` [MTProto configuration field](/api/config.md#mtproto-configuration).

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
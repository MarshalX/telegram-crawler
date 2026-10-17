# account.uploadTheme

Upload theme

```tl
documentEmpty#36f8c871 id:long = Document;
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
---functions---
account.uploadTheme#1c3db333 flags:# file:InputFile thumb:flags.0?InputFile file_name:string mime_type:string = Document;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **file** | [InputFile](/type/InputFile.md) | [Previously uploaded](/api/themes.md#uploading-theme-files) theme file with platform-specific colors for UI components, can be left unset when creating themes that only modify the wallpaper or accent colors. |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputFile](/type/InputFile.md) | Thumbnail |
| **file\_name** | [string](/type/string.md) | File name |
| **mime\_type** | [string](/type/string.md) | MIME type, must be `application/x-tgtheme-{format}`, where `format` depends on the client |

### Result
[Document](/type/Document.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | THEME\_FILE\_INVALID | Invalid theme file provided. |
| 400 | THEME\_MIME\_INVALID | The theme's MIME type is invalid. |

### Related pages

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.
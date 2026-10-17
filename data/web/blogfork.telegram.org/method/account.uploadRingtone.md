# account.uploadRingtone

Upload notification sound, use [account.saveRingtone](/method/account.saveRingtone.md) to convert it and add it to the list of saved notification sounds.

```tl
documentEmpty#36f8c871 id:long = Document;
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
---functions---
account.uploadRingtone#831a83a2 file:InputFile file_name:string mime_type:string = Document;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **file** | [InputFile](/type/InputFile.md) | Notification sound |
| **file\_name** | [string](/type/string.md) | File name |
| **mime\_type** | [string](/type/string.md) | MIME type of file |

### Result
[Document](/type/Document.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | RINGTONE\_MIME\_INVALID | The MIME type for the ringtone is invalid. |

### Related pages

#### [account.saveRingtone](/method/account.saveRingtone.md)
Save or remove saved notification sound.

If the notification sound is already in MP3 format, [account.savedRingtone](/constructor/account.savedRingtone.md) will be returned.  
Otherwise, it will be automatically converted and a [account.savedRingtoneConverted](/constructor/account.savedRingtoneConverted.md) will be returned, containing a new [document](/constructor/document.md) object that should be used to refer to the ringtone from now on (ie when deleting it using the `unsave` parameter, or when downloading it).
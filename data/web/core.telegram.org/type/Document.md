# Document

A document.

```tl
documentEmpty#36f8c871 id:long = Document;
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;

---functions---

messages.getDocumentByHash#b1f2061f sha256:bytes size:long mime_type:string = Document;
account.uploadTheme#1c3db333 flags:# file:InputFile thumb:flags.0?InputFile file_name:string mime_type:string = Document;
account.uploadRingtone#831a83a2 file:InputFile file_name:string mime_type:string = Document;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [documentEmpty](/constructor/documentEmpty.md) | Empty constructor, document doesn't exist. |
| [document](/constructor/document.md) | Document |

### Methods

| Method | Description |
| --- | --- |
| [account.uploadTheme](/method/account.uploadTheme.md) | Upload theme |
| [account.uploadRingtone](/method/account.uploadRingtone.md) | Upload notification sound, use [account.saveRingtone](/method/account.saveRingtone.md) to convert it and add it to the list of saved notification sounds. |
| [messages.getDocumentByHash](/method/messages.getDocumentByHash.md) | Get a document by its SHA256 hash, mainly used for gifs |
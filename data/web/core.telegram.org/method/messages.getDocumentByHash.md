# messages.getDocumentByHash

Get a document by its SHA256 hash, mainly used for gifs

```tl
documentEmpty#36f8c871 id:long = Document;
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
---functions---
messages.getDocumentByHash#b1f2061f sha256:bytes size:long mime_type:string = Document;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **sha256** | [bytes](/type/bytes.md) | SHA256 of file |
| **size** | [long](/type/long.md) | Size of the file in bytes |
| **mime\_type** | [string](/type/string.md) | Mime type |

### Result
[Document](/type/Document.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SHA256\_HASH\_INVALID | The provided SHA256 hash is invalid. |
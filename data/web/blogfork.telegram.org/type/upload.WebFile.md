# Upload.WebFile

Remote file

```tl
upload.webFile#21e753bc size:int mime_type:string file_type:storage.FileType mtime:int bytes:bytes = upload.WebFile;

---functions---

upload.getWebFile#24e6818d location:InputWebFileLocation offset:int limit:int = upload.WebFile;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [upload.webFile](/constructor/upload.webFile.md) | Represents a chunk of an [HTTP webfile](/api/files.md) downloaded through telegram's secure MTProto servers |

### Methods

| Method | Description |
| --- | --- |
| [upload.getWebFile](/method/upload.getWebFile.md) | Returns content of a web file, by proxying the request through telegram, see the [webfile docs for more info](/api/files.md#downloading-webfiles).\
\
**Note**: the query must be sent to the DC specified in the `webfile_dc_id` [MTProto configuration field](/api/config.md#mtproto-configuration). |
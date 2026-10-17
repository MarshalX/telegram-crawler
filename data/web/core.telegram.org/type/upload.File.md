# upload.File

Contains info on file.

```tl
upload.file#96a18d5 type:storage.FileType mtime:int bytes:bytes = upload.File;
upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;

---functions---

upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [upload.file](/constructor/upload.file.md) | File content. |
| [upload.fileCdnRedirect](/constructor/upload.fileCdnRedirect.md) | The file must be downloaded from a [CDN DC](/cdn.md). |

### Methods

| Method | Description |
| --- | --- |
| [upload.getFile](/method/upload.getFile.md) | Returns content of a whole file or its part. |
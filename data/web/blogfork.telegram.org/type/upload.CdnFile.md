# upload.CdnFile

Represents the download status of a CDN file

```tl
upload.cdnFileReuploadNeeded#eea8e46e request_token:bytes = upload.CdnFile;
upload.cdnFile#a99fca4f bytes:bytes = upload.CdnFile;

---functions---

upload.getCdnFile#395f69da file_token:bytes offset:long limit:int = upload.CdnFile;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [upload.cdnFileReuploadNeeded](/constructor/upload.cdnFileReuploadNeeded.md) | The file was cleared from the temporary RAM cache of the [CDN](/cdn.md) and has to be re-uploaded. |
| [upload.cdnFile](/constructor/upload.cdnFile.md) | Represent a chunk of a [CDN](/cdn.md) file. |

### Methods

| Method | Description |
| --- | --- |
| [upload.getCdnFile](/method/upload.getCdnFile.md) | Download a [CDN](/cdn.md) file. |
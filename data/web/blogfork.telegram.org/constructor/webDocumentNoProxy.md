# webDocumentNoProxy

Remote document that can be downloaded without [proxying through telegram](/api/files.md)

```tl
webDocumentNoProxy#f9c8bcc6 url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = WebDocument;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **url** | [string](/type/string.md) | Document URL |
| **size** | [int](/type/int.md) | File size |
| **mime\_type** | [string](/type/string.md) | MIME type |
| **attributes** | [Vector](/type/Vector%20t)&lt;[DocumentAttribute](/type/DocumentAttribute.md)&gt; | Attributes for media types |

### Type
[WebDocument](/type/WebDocument.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
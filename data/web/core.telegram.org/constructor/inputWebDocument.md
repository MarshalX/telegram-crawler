# inputWebDocument

The document

```tl
inputWebDocument#9bed434d url:string size:int mime_type:string attributes:Vector<DocumentAttribute> = InputWebDocument;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **url** | [string](/type/string.md) | Remote document URL to be downloaded using the appropriate [method](/api/files.md) |
| **size** | [int](/type/int.md) | Remote file size |
| **mime\_type** | [string](/type/string.md) | Mime type |
| **attributes** | [Vector](/type/Vector%20t)&lt;[DocumentAttribute](/type/DocumentAttribute.md)&gt; | Attributes for media types |

### Type
[InputWebDocument](/type/InputWebDocument.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
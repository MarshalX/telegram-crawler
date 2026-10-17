# photoCachedSize

Description of an image and its content.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===23===
photoCachedSize#e9a734fa type:string location:FileLocation w:int h:int bytes:bytes = PhotoSize;
```

#### API schema
<!-- /schema-blocks -->

```tl
photoCachedSize#21e1ad6 type:string w:int h:int bytes:bytes = PhotoSize;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **type** | [string](/type/string.md) | [PhotoSize.type value »](/api/files.md#photosizetype-values) |
| **w** | [int](/type/int.md) | Image width |
| **h** | [int](/type/int.md) | Image height |
| **bytes** | [bytes](/type/bytes.md) | Binary data, file content |

### Type
[PhotoSize](/type/PhotoSize.md)

### Photosize.type values

See [PhotoSize.type values »](/api/files.md#photosizetype-values).

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
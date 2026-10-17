# decryptedMessageMediaDocument

Document attached to a message in a secret chat.

```tl
===8===
decryptedMessageMediaDocument#b095434b thumb:bytes thumb_w:int thumb_h:int file_name:string mime_type:string size:int key:bytes iv:bytes = DecryptedMessageMedia;

===45===
decryptedMessageMediaDocument#7afe8ae2 thumb:bytes thumb_w:int thumb_h:int mime_type:string size:int key:bytes iv:bytes attributes:Vector<DocumentAttribute> caption:string = DecryptedMessageMedia;

===143===
decryptedMessageMediaDocument#6abd9782 thumb:bytes thumb_w:int thumb_h:int mime_type:string size:long key:bytes iv:bytes attributes:Vector<DocumentAttribute> caption:string = DecryptedMessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **thumb** | [bytes](/type/bytes.md) | Thumbnail-file contents (JPEG-file, quality 55, set in a 90x90 square) |
| **thumb\_w** | [int](/type/int.md) | Thumbnail width |
| **thumb\_h** | [int](/type/int.md) | Thumbnail height |
| **file\_name** | [string](/type/string.md) | File name, moved to `attributes` in Layer 45. |
| **mime\_type** | [string](/type/string.md) | File MIME-type |
| **size** | [long](/type/long.md) | Document size ([int](/type/int.md) on layer &lt;143, [long](/type/long.md) on layer &gt;=143) |
| **key** | [bytes](/type/bytes.md) | Key to decrypt the attached document file |
| **iv** | [bytes](/type/bytes.md) | Initialization |
| **attributes** | [Vector](/type/Vector%20t)&lt;[DocumentAttribute](/type/DocumentAttribute.md)&gt; | Document attributes for media types |
| **caption** | [string](/type/string.md) | Caption |

### Type
[DecryptedMessageMedia](/type/DecryptedMessageMedia.md)

### Related pages

#### [int](/type/int.md)
A basic bare type, the values of which correspond to single-element sequences, i.e. numbers from -2^31 to 2^31-1 which in this case represent themselves.

#### [long](/type/long.md)
A basic bare type, elements of which correspond to two-element sequences, representing 64-bit signed numbers (little-endian).
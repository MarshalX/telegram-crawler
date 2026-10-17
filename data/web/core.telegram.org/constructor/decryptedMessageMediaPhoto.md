# decryptedMessageMediaPhoto

Photo attached to an encrypted message.

```tl
===8===
decryptedMessageMediaPhoto#32798a8c thumb:bytes thumb_w:int thumb_h:int w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;

===45===
decryptedMessageMediaPhoto#f1fa8d78 thumb:bytes thumb_w:int thumb_h:int w:int h:int size:int key:bytes iv:bytes caption:string = DecryptedMessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **thumb** | [bytes](/type/bytes.md) | Content of thumbnail file (JPEGfile, quality 55, set in a square 90x90) |
| **thumb\_w** | [int](/type/int.md) | Thumbnail width |
| **thumb\_h** | [int](/type/int.md) | Thumbnail height |
| **w** | [int](/type/int.md) | Photo width |
| **h** | [int](/type/int.md) | Photo height |
| **size** | [int](/type/int.md) | Size of the photo in bytes |
| **key** | [bytes](/type/bytes.md) | Key to decrypt an attached file with a full version |
| **iv** | [bytes](/type/bytes.md) | Initialization vector |
| **caption** | [string](/type/string.md) | Caption |

### Type
[DecryptedMessageMedia](/type/DecryptedMessageMedia.md)
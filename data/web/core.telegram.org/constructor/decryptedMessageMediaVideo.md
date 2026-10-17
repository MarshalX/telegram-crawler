# decryptedMessageMediaVideo

Video attached to an encrypted message.

```tl
===8===
decryptedMessageMediaVideo#4cee6ef3 thumb:bytes thumb_w:int thumb_h:int duration:int w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;

===17===
decryptedMessageMediaVideo#524a415d thumb:bytes thumb_w:int thumb_h:int duration:int mime_type:string w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;

===45===
decryptedMessageMediaVideo#970c8c0e thumb:bytes thumb_w:int thumb_h:int duration:int mime_type:string w:int h:int size:int key:bytes iv:bytes caption:string = DecryptedMessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **thumb** | [bytes](/type/bytes.md) | Content of thumbnail file (JPEG file, quality 55, set in a square 90x90) |
| **thumb\_w** | [int](/type/int.md) | Thumbnail width |
| **thumb\_h** | [int](/type/int.md) | Thumbnail height |
| **duration** | [int](/type/int.md) | Duration of video in seconds |
| **w** | [int](/type/int.md) | Image width |
| **h** | [int](/type/int.md) | Image height |
| **size** | [int](/type/int.md) | File size |
| **key** | [bytes](/type/bytes.md) | Key to decrypt the attached video file |
| **iv** | [bytes](/type/bytes.md) | Initialization vector |
| **mime\_type** | [string](/type/string.md) | MIME-type of the video file\
Parameter added in Layer 17. |
| **caption** | [string](/type/string.md) | Caption |

### Type
[DecryptedMessageMedia](/type/DecryptedMessageMedia.md)
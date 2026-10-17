# decryptedMessageMediaAudio

Audio file attached to a secret chat message.

```tl
===8===
decryptedMessageMediaAudio#6080758f duration:int size:int key:bytes iv:bytes = DecryptedMessageMedia;

===17===
decryptedMessageMediaAudio#57e0a9cb duration:int mime_type:string size:int key:bytes iv:bytes = DecryptedMessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **duration** | [int](/type/int.md) | Audio duration in seconds |
| **size** | [int](/type/int.md) | File size |
| **key** | [bytes](/type/bytes.md) | Key to decrypt the attached media file |
| **iv** | [bytes](/type/bytes.md) | Initialization vector |
| **mime\_type** | [string](/type/string.md) | MIME-type of the audio file\
Parameter added in Layer 13. |

### Type
[DecryptedMessageMedia](/type/DecryptedMessageMedia.md)
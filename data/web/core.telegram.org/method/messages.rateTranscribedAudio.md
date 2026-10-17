# messages.rateTranscribedAudio

Rate [transcribed voice message](/api/transcribe.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.rateTranscribedAudio#7f1d072f peer:InputPeer msg_id:int transcription_id:long good:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the voice message was sent |
| **msg\_id** | [int](/type/int.md) | Message ID |
| **transcription\_id** | [long](/type/long.md) | Transcription ID |
| **good** | [Bool](/type/Bool.md) | Whether the transcription was correct |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Voice message transcription](/api/transcribe.md)
How to transcribe voice messages.
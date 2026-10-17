# updateTranscribedAudio

A pending [voice message transcription »](/api/transcribe.md) initiated with [messages.transcribeAudio](/method/messages.transcribeAudio.md) was updated.

```tl
updateTranscribedAudio#84cd5a flags:# pending:flags.0?true peer:Peer msg_id:int transcription_id:long text:string = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pending** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this transcription is still pending and further [updateTranscribedAudio](/constructor/updateTranscribedAudio.md) about it will be sent in the future. |
| **peer** | [Peer](/type/Peer.md) | Peer of the transcribed message |
| **msg\_id** | [int](/type/int.md) | Transcribed message ID |
| **transcription\_id** | [long](/type/long.md) | Transcription ID |
| **text** | [string](/type/string.md) | Transcribed text |

### Type
[Update](/type/Update.md)

### Related pages

#### [updateTranscribedAudio](/constructor/updateTranscribedAudio.md)
A pending [voice message transcription »](/api/transcribe.md) initiated with [messages.transcribeAudio](/method/messages.transcribeAudio.md) was updated.

#### [Voice message transcription](/api/transcribe.md)
How to transcribe voice messages.

#### [messages.transcribeAudio](/method/messages.transcribeAudio.md)
[Transcribe voice message](/api/transcribe.md)
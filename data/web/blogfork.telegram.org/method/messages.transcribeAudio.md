# messages.transcribeAudio

[Transcribe voice message](/api/transcribe.md)

```tl
messages.transcribedAudio#cfb9d957 flags:# pending:flags.0?true transcription_id:long text:string trial_remains_num:flags.1?int trial_remains_until_date:flags.1?int = messages.TranscribedAudio;
---functions---
messages.transcribeAudio#269e9a49 peer:InputPeer msg_id:int = messages.TranscribedAudio;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer ID where the voice message was sent |
| **msg\_id** | [int](/type/int.md) | Voice message ID |

### Result
[messages.TranscribedAudio](/type/messages.TranscribedAudio.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | MSG\_VOICE\_MISSING | The specified message is not a voice message. |
| 400 | MSG\_VOICE\_TOO\_LONG | The specified voice message is too long to be transcribed. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 400 | TRANSCRIPTION\_FAILED | Audio transcription failed. |

### Related pages

#### [Voice message transcription](/api/transcribe.md)
How to transcribe voice messages.
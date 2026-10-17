# messages.TranscribedAudio

[Transcribed text](/api/transcribe.md) from a voice message

```tl
messages.transcribedAudio#cfb9d957 flags:# pending:flags.0?true transcription_id:long text:string trial_remains_num:flags.1?int trial_remains_until_date:flags.1?int = messages.TranscribedAudio;

---functions---

messages.transcribeAudio#269e9a49 peer:InputPeer msg_id:int = messages.TranscribedAudio;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.transcribedAudio](/constructor/messages.transcribedAudio.md) | [Transcribed text from a voice message »](/api/transcribe.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.transcribeAudio](/method/messages.transcribeAudio.md) | [Transcribe voice message](/api/transcribe.md) |

### Related pages

#### [Voice message transcription](/api/transcribe.md)
How to transcribe voice messages.
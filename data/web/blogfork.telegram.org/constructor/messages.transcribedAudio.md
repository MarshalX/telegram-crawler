# messages.transcribedAudio

[Transcribed text from a voice message »](/api/transcribe.md)

```tl
messages.transcribedAudio#cfb9d957 flags:# pending:flags.0?true transcription_id:long text:string trial_remains_num:flags.1?int trial_remains_until_date:flags.1?int = messages.TranscribedAudio;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pending** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the transcription is partial because audio transcription is still in progress, if set the user may receive further [updateTranscribedAudio](/constructor/updateTranscribedAudio.md) updates with the updated transcription. |
| **transcription\_id** | [long](/type/long.md) | Transcription ID |
| **text** | [string](/type/string.md) | Transcripted text |
| **trial\_remains\_num** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For non-[Premium](/api/premium.md) users, this flag will be set, indicating the remaining transcriptions in the free trial period. |
| **trial\_remains\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For non-[Premium](/api/premium.md) users, this flag will be set, indicating the date when the `trial_remains_num` counter will be reset to the maximum value of [transcribe\_audio\_trial\_weekly\_number](/api/config.md#transcribe-audio-trial-weekly-number). |

### Type
[messages.TranscribedAudio](/type/messages.TranscribedAudio.md)

### Related pages

#### [updateTranscribedAudio](/constructor/updateTranscribedAudio.md)
A pending [voice message transcription »](/api/transcribe.md) initiated with [messages.transcribeAudio](/method/messages.transcribeAudio.md) was updated.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Voice message transcription](/api/transcribe.md)
How to transcribe voice messages.
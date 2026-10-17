# inputGroupCallStream

Identifies a media chunk of an RTMP-mode video chat, livestream or live story, see [playing an RTMP livestream »](/api/group-calls.md#downloading-media-chunks).

```tl
inputGroupCallStream#598a92a flags:# call:InputGroupCall time_ms:long scale:int video_channel:flags.0?int video_quality:flags.0?int = InputFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | RTMP-mode group call |
| **time\_ms** | [long](/type/long.md) | Timestamp of the chunk to fetch, in milliseconds |
| **scale** | [int](/type/int.md) | Specifies the duration of the media segment to fetch in milliseconds, by bitshifting `1000` to the right `scale` times: `duration_ms := 1000 >> scale` |
| **video\_channel** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [groupCallStreamChannel](/constructor/groupCallStreamChannel.md).`channel` value of the video channel to fetch; unified video uses channel `1`. Omit together with `video_quality` to fetch audio |
| **video\_quality** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Selected video quality (0 = lowest, 1 = medium, 2 = best) |

### Type
[InputFileLocation](/type/InputFileLocation.md)

### Related pages

#### [groupCallStreamChannel](/constructor/groupCallStreamChannel.md)
Describes an available RTMP stream channel and its current playback timestamp, see [playing an RTMP livestream »](/api/group-calls.md#rtmp-mode).

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
# groupCallStreamChannel

Describes an available RTMP stream channel and its current playback timestamp, see [playing an RTMP livestream »](/api/group-calls.md#rtmp-mode).

```tl
groupCallStreamChannel#80eb48af channel:int scale:int last_timestamp_ms:long = GroupCallStreamChannel;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [int](/type/int.md) | Stream channel ID, used as a source of the synthetic `unified` video source group and as [inputGroupCallStream](/constructor/inputGroupCallStream.md).`video_channel` when fetching the corresponding video segment |
| **scale** | [int](/type/int.md) | **Deprecated**, [ignored by clients »](/api/group-calls.md#rtmp-mode): use the media segment duration hardcoded in clients (1000 milliseconds, i.e. `scale = 0`) instead. \
Historically, it specified the duration of the media segment to fetch, obtained in milliseconds by bitshifting `1000` to the right `scale` times: `duration_ms := 1000 >> scale`. |
| **last\_timestamp\_ms** | [long](/type/long.md) | Last seen timestamp to easily start fetching livestream chunks using [inputGroupCallStream](/constructor/inputGroupCallStream.md) |

### Type
[GroupCallStreamChannel](/type/GroupCallStreamChannel.md)

### Related pages

#### [inputGroupCallStream](/constructor/inputGroupCallStream.md)
Identifies a media chunk of an RTMP-mode video chat, livestream or live story, see [playing an RTMP livestream »](/api/group-calls.md#downloading-media-chunks).

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
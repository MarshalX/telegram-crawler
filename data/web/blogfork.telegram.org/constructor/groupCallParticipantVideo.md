# groupCallParticipantVideo

Info about a video stream

```tl
groupCallParticipantVideo#67753ac8 flags:# paused:flags.0?true endpoint:string source_groups:Vector<GroupCallParticipantVideoSourceGroup> audio_source:flags.1?int = GroupCallParticipantVideo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **paused** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the stream is currently paused |
| **endpoint** | [string](/type/string.md) | Endpoint |
| **source\_groups** | [Vector](/type/Vector%20t)&lt;[GroupCallParticipantVideoSourceGroup](/type/GroupCallParticipantVideoSourceGroup.md)&gt; | Source groups |
| **audio\_source** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Audio source ID |

### Type
[GroupCallParticipantVideo](/type/GroupCallParticipantVideo.md)
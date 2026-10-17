# updateGroupCallConnection

Connection parameters returned after joining a group call, see [presentations »](/api/group-calls.md#presentations) and [stream mode »](/api/group-calls.md#stream-mode).

If `presentation` is set, the parameters belong to the separate [presentation connection](/api/group-calls.md#presentations); otherwise they belong to the main connection.

For a normal WebRTC connection, pass `params` to the local tgcalls group-call engine as its join response payload.

For [stream-mode calls](/api/group-calls.md#detecting-stream-mode), where the client plays the call by [downloading media chunks »](/api/group-calls.md#downloading-media-chunks) instead of using WebRTC, `params` instead has one of the following shapes:

```json
{
  "stream": true
}
```

for a call that entered [stream mode](/api/group-calls.md#stream-mode), or

```json
{
  "stream": true,
  "rtmp": true
}
```

for an [RTMP-mode call](/api/group-calls.md#creating-and-publishing-an-rtmp-livestream).

```tl
updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **presentation** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether these parameters belong to the separate presentation connection instead of the main connection |
| **params** | [DataJSON](/type/DataJSON.md) | RTC join response parameters or broadcast-stream metadata, as described above |

### Type
[Update](/type/Update.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
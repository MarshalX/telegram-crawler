# phone.editGroupCallParticipant

Edit information about a participant of a non-RTMP video chat/livestream or conference. The `raise_hand` field is only supported in video chats/livestreams, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info.

Note: [flags](/mtproto/TL-combinators.md#conditional-fields).N?[Bool](/type/Bool.md) parameters can have three possible values:

- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is not set, the previous value will not be changed.
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is set and contains a [boolTrue](/constructor/boolTrue.md), the previous value will be overwritten to `true`.
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is set and contains a [boolFalse](/constructor/boolFalse.md), the previous value will be overwritten to `false`.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.editGroupCallParticipant#a5273abf flags:# call:InputGroupCall participant:InputPeer muted:flags.0?Bool volume:flags.1?int raise_hand:flags.2?Bool video_stopped:flags.3?Bool video_paused:flags.4?Bool presentation_paused:flags.5?Bool = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Non-RTMP video chat/livestream or conference |
| **participant** | [InputPeer](/type/InputPeer.md) | The group call participant (can also be the user itself) |
| **muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | Change the participant's mute state; allowing a forcibly muted participant to self-unmute does not immediately unmute them |
| **volume** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | New volume, between `1` and `20000`; `10000` represents 100%. Without moderation rights, changing another participant's volume affects only local playback |
| **raise\_hand** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Bool](/type/Bool.md) | Raise or lower hand; only supported in video chats/livestreams |
| **video\_stopped** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Bool](/type/Bool.md) | Start or stop the current user's video stream |
| **video\_paused** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Bool](/type/Bool.md) | Pause or resume the current user's video stream |
| **presentation\_paused** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[Bool](/type/Bool.md) | Pause or resume the current user's presentation stream |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | GROUPCALL\_FORBIDDEN | The specified group call cannot be used in this context. |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |
| 400 | PARTICIPANT\_JOIN\_MISSING | Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](/method/phone.joinGroupCall.md). |
| 400 | RAISE\_HAND\_FORBIDDEN | You cannot raise your hand. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_VOLUME\_INVALID | The specified user volume is invalid. |
| 400 | VIDEO\_PAUSE\_FORBIDDEN | You cannot pause the video stream. |
| 400 | VIDEO\_STOP\_FORBIDDEN | You cannot stop the video stream. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Bool](/type/Bool.md)
Boolean type.

#### [boolTrue](/constructor/boolTrue.md)
The constructor can be interpreted as a **boolean**`true` value.

#### [boolFalse](/constructor/boolFalse.md)
Constructor may be interpreted as a **boolean**`false` value.

#### [phone.joinGroupCall](/method/phone.joinGroupCall.md)
Join any [group call type »](/api/group-calls.md#group-call-types). Conference calls additionally require the [E2E joining flow »](/api/end-to-end/group-calls.md#joining-a-call).

The `params` field must contain a join payload generated by the local tgcalls group-call engine. It contains a random non-zero audio `ssrc`, ICE `ufrag` and `pwd`, DTLS `fingerprints`, and, when publishing video, `ssrc-groups`.

For example, a join payload without published video has the following shape:

```json
{
  "ssrc": 123456789,
  "ufrag": "...",
  "pwd": "...",
  "fingerprints": [{
    "hash": "sha-256",
    "fingerprint": "...",
    "setup": "passive"
  }]
}
```

When joining an RTMP-mode call, generate the payload without published video source groups.
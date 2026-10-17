# phone.getGroupCallStreamChannels

Get the available stream channels and current playback timestamp of an RTMP-mode video chat, livestream or live story, see [here »](/api/group-calls.md#rtmp-mode) for the full flow.  
The group call must be joined before invoking this method. Send the request to the media DC specified by [groupCall](/constructor/groupCall.md).`stream_dc_id`.

```tl
phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;
---functions---
phone.getGroupCallStreamChannels#1ab21940 call:InputGroupCall = phone.GroupCallStreamChannels;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | RTMP-mode video chat, livestream or live story |

### Result
[phone.GroupCallStreamChannels](/type/phone.GroupCallStreamChannels.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |
| 400 | GROUPCALL\_JOIN\_MISSING | You haven't joined this group call. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [groupCall](/constructor/groupCall.md)
Describes a [group call](/api/group-calls.md).

If the `min` flag is set, this is a partial (`min`) constructor: only a subset of its fields contains up-to-date information, and it must be merged into a previously cached non-`min` constructor as described below. If no full (non-`min`) constructor for this call was cached previously, the `min` constructor must be discarded.

When `min` is set, the following mandatory fields may be used: `id`, `access_hash`, `participants_count` and `version`. In addition, **only** the following conditional fields may be used if present, subject to the usual `version` check:

- `conference`
- `rtmp_stream`
- `listeners_hidden`
- `title`
- `messages_enabled`
- `record_start_date` and `record_video_active`
- `schedule_date`
- `send_paid_messages_stars`

When `min` is set, the following fields **must be ignored**, keeping the values from the previously cached non-`min` constructor:

- `join_muted`
- `can_change_join_muted`
- `schedule_start_subscribed`
- `can_start_video`
- `creator`
- `can_change_messages_enabled`
- `unmuted_video_count`
- `unmuted_video_limit`
- `stream_dc_id`
- `invite_link`
- `default_send_as`

The `join_date_asc` flag is set only when the call is created and never changes afterwards, so it too is not applied from a `min` constructor.
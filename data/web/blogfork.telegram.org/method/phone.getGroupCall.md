# phone.getGroupCall

Get info about a [group call](/api/group-calls.md#getting-info-about-a-group-call) and its participants.

```tl
phone.groupCall#9e727aad call:GroupCall participants:Vector<GroupCallParticipant> participants_next_offset:string chats:Vector<Chat> users:Vector<User> = phone.GroupCall;
---functions---
phone.getGroupCall#41845db call:InputGroupCall limit:int = phone.GroupCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Group call of any type to fetch |
| **limit** | [int](/type/int.md) | Maximum number of participants to return in this call (0 to return a server-defined amount). \
If the number of returned participants is less than [groupCall](/constructor/groupCall.md).`participants_count`, paginate through the remaining participants using [phone.getGroupParticipants](/method/phone.getGroupParticipants.md), passing to `offset` the [phone.groupCall](/constructor/phone.groupCall.md).`participants_next_offset` returned by this call. \
This parameter behaves in a different way compared to the `limit` of [phone.getGroupParticipants](/method/phone.getGroupParticipants.md), see [here »](/api/group-calls.md#getting-info-about-a-group-call) for more info. |

### Result
[phone.GroupCall](/type/phone.GroupCall.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | GROUPCALL\_FORBIDDEN | The specified group call cannot be used in this context. |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |

### Related pages

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

#### [phone.getGroupParticipants](/method/phone.getGroupParticipants.md)
Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants.

#### [phone.groupCall](/constructor/phone.groupCall.md)
Contains group call information and an initial participant page, see [getting info about a group call »](/api/group-calls.md#getting-info-about-a-group-call).

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
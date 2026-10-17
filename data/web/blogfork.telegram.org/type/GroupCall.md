# GroupCall

A group call

```tl
groupCallDiscarded#7780bcb4 id:long access_hash:long duration:int = GroupCall;
groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [groupCallDiscarded](/constructor/groupCallDiscarded.md) | Describes an ended [group call](/api/group-calls.md). |
| [groupCall](/constructor/groupCall.md) | Describes a [group call](/api/group-calls.md).\
\
If the `min` flag is set, this is a partial (`min`) constructor: only a subset of its fields contains up-to-date information, and it must be merged into a previously cached non-`min` constructor as described below. If no full (non-`min`) constructor for this call was cached previously, the `min` constructor must be discarded.\
\
When `min` is set, the following mandatory fields may be used: `id`, `access_hash`, `participants_count` and `version`. In addition, **only** the following conditional fields may be used if present, subject to the usual `version` check:\
\
- `conference`\
- `rtmp_stream`\
- `listeners_hidden`\
- `title`\
- `messages_enabled`\
- `record_start_date` and `record_video_active`\
- `schedule_date`\
- `send_paid_messages_stars`\
\
When `min` is set, the following fields **must be ignored**, keeping the values from the previously cached non-`min` constructor:\
\
- `join_muted`\
- `can_change_join_muted`\
- `schedule_start_subscribed`\
- `can_start_video`\
- `creator`\
- `can_change_messages_enabled`\
- `unmuted_video_count`\
- `unmuted_video_limit`\
- `stream_dc_id`\
- `invite_link`\
- `default_send_as`\
\
The `join_date_asc` flag is set only when the call is created and never changes afterwards, so it too is not applied from a `min` constructor. |
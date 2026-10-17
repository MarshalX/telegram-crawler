# groupCall

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

```tl
groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **join\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the user should be muted upon joining the call. Must be ignored if the `min` flag is set. |
| **can\_change\_join\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the current user can change the value of the `join_muted` flag using [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md). Must be ignored if the `min` flag is set. |
| **join\_date\_asc** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Specifies the ordering to use when locally sorting by date and displaying in the UI group call participants. Set only when the call is created and never changed afterwards, so it is not applied from a `min` constructor. |
| **schedule\_start\_subscribed** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Whether we subscribed to the scheduled call. Must be ignored if the `min` flag is set. |
| **can\_start\_video** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether you can start streaming video into the call. Must be ignored if the `min` flag is set. |
| **record\_video\_active** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether the group call is currently being recorded |
| **rtmp\_stream** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether this call uses [RTMP livestream mode »](/api/group-calls.md#stream-mode) |
| **listeners\_hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether the listeners list is hidden and cannot be fetched using [phone.getGroupParticipants](/method/phone.getGroupParticipants.md). The `phone.groupParticipants.count` and `groupCall.participants_count` counters will still include listeners. |
| **conference** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Whether this is an E2E conference call. |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Whether the current user created this group call. Must be ignored if the `min` flag is set. |
| **messages\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | Whether the [in-call message overlay »](/api/group-calls.md#in-call-messages) is enabled |
| **can\_change\_messages\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | Whether the current user may enable or disable the [in-call message overlay »](/api/group-calls.md#in-call-messages). Must be ignored if the `min` flag is set. |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Whether this is a partial constructor that must be merged into a previously cached non-`min` constructor, following the rules described above. |
| **id** | [long](/type/long.md) | Group call ID |
| **access\_hash** | [long](/type/long.md) | Group call access hash |
| **participants\_count** | [int](/type/int.md) | Participant count |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Group call title |
| **stream\_dc\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Media DC ID to use for [RTMP stream requests »](/api/group-calls.md#downloading-media-chunks). Must be ignored if the `min` flag is set. |
| **record\_start\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | When was the recording started |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[int](/type/int.md) | When is the call scheduled to start |
| **unmuted\_video\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Number of people currently streaming video into the call. Must be ignored if the `min` flag is set. |
| **unmuted\_video\_limit** | [int](/type/int.md) | Maximum number of people allowed to stream video into the call. Must be ignored if the `min` flag is set. |
| **version** | [int](/type/int.md) | Revision used to apply [group call updates »](/api/group-calls.md#applying-group-call-updates) |
| **invite\_link** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | Invitation link for a [conference call »](/api/group-calls.md#conference-calls). Must be ignored if the `min` flag is set. |
| **send\_paid\_messages\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[long](/type/long.md) | Minimum Stars donation required from users other than the live story owner to send a [paid comment »](/api/group-calls.md#paid-live-story-comments); `0` or no value allows free comments |
| **default\_send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[Peer](/type/Peer.md) | Default peer displayed as the author of [live story comments and reactions »](/api/group-calls.md#in-call-messages). Must be ignored if the `min` flag is set. |

### Type
[GroupCall](/type/GroupCall.md)

### Related pages

#### [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md)
Change group call settings. Each setting supports different group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [phone.getGroupParticipants](/method/phone.getGroupParticipants.md)
Get [group call](/api/group-calls.md#getting-info-about-a-group-call) participants.
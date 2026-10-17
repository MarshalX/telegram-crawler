# phone.sendGroupCallMessage

Send an in-call message to all participants of a video chat/livestream or live story, including in RTMP mode, see [here »](/api/group-calls.md#in-call-messages) for more info.

The `send_as` field can only be populated for live stories, where it optionally selects the displayed author. If omitted, the server automatically selects the appropriate author. Do not populate it for video chats/livestreams.

Video chats/livestreams and live stories support [animated emoji reactions »](/api/group-calls.md#in-call-reactions), encoded as messages containing only a standard available reaction emoji or a single custom emoji entity.

For a paid live story comment, pass the user-confirmed donation amount in `allow_paid_stars`. For commenters other than the live story owner, this amount must be at least the current [groupCall](/constructor/groupCall.md).`send_paid_messages_stars` minimum. A higher amount may be donated to highlight the comment. The live story owner may comment without populating `allow_paid_stars`. To send a standalone paid live story donation, pass a positive `allow_paid_stars` value and an empty `message`, see [here »](/api/group-calls.md#paid-live-story-donations) for the full flow.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.sendGroupCallMessage#b1d11410 flags:# call:InputGroupCall random_id:long message:TextWithEntities allow_paid_stars:flags.0?long send_as:flags.1?InputPeer = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Video chat/livestream or live story that should receive the message, reaction or donation |
| **random\_id** | [long](/type/long.md) | Fresh client-generated random ID used to deduplicate the message or donation. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **message** | [TextWithEntities](/type/TextWithEntities.md) | Message text or emoji reaction; pass an empty value when sending a standalone paid live story donation |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | User-confirmed number of Telegram Stars to donate with a live story comment or standalone donation |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | Optional peer to display as the author of a live story message or reaction; can only be used for live stories |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |
| 400 | GROUPCALL\_JOIN\_MISSING | You haven't joined this group call. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

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
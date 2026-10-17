# phone.createGroupCall

Create a video chat or livestream, see [here »](/api/group-calls.md#video-chats-livestreams) for the full flow.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **rtmp\_stream** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Create the call in [RTMP livestream mode »](/api/group-calls.md#stream-mode), where one external streamer publishes all audio and video |
| **peer** | [InputPeer](/type/InputPeer.md) | Associate the group call or livestream to the provided [group/supergroup/channel](/api/channel.md) |
| **random\_id** | [int](/type/int.md) | Unique client message ID required to prevent creation of duplicate group calls. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Call title, if not set defaults to the group/channel's name. |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Schedule date, at least 10 seconds and at most 8 days in the future; the call must still be manually started using [phone.startScheduledGroupCall](/method/phone.startScheduledGroupCall.md) |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CREATE\_CALL\_FAILED | An error occurred while creating the call. |
| 400 | GROUPCALL\_ALREADY\_DISCARDED | The group call was already discarded. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | SCHEDULE\_DATE\_INVALID | Invalid schedule date provided. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [phone.startScheduledGroupCall](/method/phone.startScheduledGroupCall.md)
Start a scheduled [group call](/api/group-calls.md#video-chats-livestreams).
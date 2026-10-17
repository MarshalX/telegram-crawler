# phone.declineConferenceCallInvite

Decline a [conference call](/api/group-calls.md#conference-calls) invite.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.declineConferenceCallInvite#3c479971 msg_id:int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **msg\_id** | [int](/type/int.md) | The ID of the [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) to decline. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |

### Related pages

#### [messageActionConferenceCall](/constructor/messageActionConferenceCall.md)
Represents a [conference call »](/api/group-calls.md#conference-calls), or an invitation to one if neither the `missed` nor `active` flags are set.

If [call\_requests\_disabled](/api/config.md#call-requests-disabled) is not set or false, an incoming [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) with the `missed` and `active` flags **not** set should trigger ringing and an incoming call screen, just like for one-on-one calls.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
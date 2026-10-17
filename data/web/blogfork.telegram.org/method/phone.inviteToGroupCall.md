# phone.inviteToGroupCall

Invite a set of users to a [video chat/livestream »](/api/group-calls.md#video-chats-livestreams); cannot be used for [live stories »](/api/group-calls.md#live-stories) or [conference calls »](/api/group-calls.md#conference-calls).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.inviteToGroupCall#7b393160 call:InputGroupCall users:Vector<InputUser> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | The [video chat/livestream »](/api/group-calls.md#video-chats-livestreams) |
| **users** | [Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | The users to invite. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | CHAT\_TYPE\_INVALID | The specified user type is invalid. |
| 403 | GROUPCALL\_FORBIDDEN | The specified group call cannot be used in this context. |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |
| 400 | INVITE\_FORBIDDEN\_WITH\_JOINAS | If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID. |
| 400 | USER\_ALREADY\_INVITED | You have already invited this user. |
| 403 | USER\_NOT\_PARTICIPANT | You're not a member of this supergroup/channel. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
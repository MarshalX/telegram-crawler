# phone.toggleGroupCallSettings

Change group call settings. Each setting supports different group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
phone.toggleGroupCallSettings#974392f2 flags:# reset_invite_hash:flags.1?true call:InputGroupCall join_muted:flags.0?Bool messages_enabled:flags.2?Bool send_paid_messages_stars:flags.3?long = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **reset\_invite\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Invalidate existing invite links for video chats, livestreams and conferences |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Group call whose settings should be changed |
| **join\_muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | Whether users joining a non-RTMP video chat/livestream should be muted by default |
| **messages\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Bool](/type/Bool.md) | Enable or disable the in-call message overlay in video chats/livestreams, conferences and live stories, including in RTMP mode |
| **send\_paid\_messages\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | Set the minimum Telegram Stars donation required from users other than the live story owner for each comment; the owner may always comment without donating, and `0` allows free comments for everyone |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | GROUPCALL\_CHANGE\_FORBIDDEN | You cannot change this group call setting. |
| 403 | GROUPCALL\_FORBIDDEN | The specified group call cannot be used in this context. |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |
| 400 | GROUPCALL\_NOT\_MODIFIED | Group call settings weren't modified. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.
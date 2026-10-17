# stories.startLive

Start a live story, optionally using RTMP livestream mode, see [here »](/api/group-calls.md#live-stories) for the full flow.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to pin the live story on the peer's profile |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether viewers must be prevented from forwarding or saving the live story |
| **rtmp\_stream** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Create the live story in [RTMP livestream mode »](/api/group-calls.md#stream-mode), where one external streamer publishes all audio and video |
| **peer** | [InputPeer](/type/InputPeer.md) | User, supergroup or channel that will own the live story; basic groups cannot post live stories |
| **caption** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Live story caption |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **privacy\_rules** | [Vector](/type/Vector%20t)&lt;[InputPrivacyRule](/type/InputPrivacyRule.md)&gt; | Privacy rules defining who can view the live story |
| **random\_id** | [long](/type/long.md) | Client-generated random ID used to prevent duplicate live stories. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **messages\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Bool](/type/Bool.md) | Whether the [in-call message overlay »](/api/group-calls.md#in-call-messages) should be enabled |
| **send\_paid\_messages\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[long](/type/long.md) | Minimum Telegram Stars donation required from users other than the live story owner for each comment; the owner may always comment without donating, and `0` allows free comments for everyone |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORY\_LIVE\_ALREADY\_%d | This peer already has an active live story, and its ID is equal to %d. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
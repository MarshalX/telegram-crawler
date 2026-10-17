# messages.sendVote

Vote in a [poll](/constructor/poll.md)

Starting from layer 159, the vote will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).

Before voting, clients should check that the user is actually allowed to vote: voting is not possible if the poll is closed, if it is [subscriber-only »](/api/poll.md#subscriber-only-polls) and the user is not an eligible subscriber, or if it is [country-restricted »](/api/poll.md#country-restricted-polls) and the user's [`phone_country_iso2` »](/api/config.md#phone-country-iso2) is not in the poll's allowed country list. See [vote restrictions »](/api/poll.md#vote-restrictions) for the full list of conditions.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendVote#10ea6184 peer:InputPeer msg_id:int options:Vector<bytes> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat where the poll was sent |
| **msg\_id** | [int](/type/int.md) | The message ID of the poll |
| **options** | [Vector](/type/Vector%20t)&lt;[bytes](/type/bytes.md)&gt; | The options that were chosen |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MESSAGE\_POLL\_CLOSED | Poll closed. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | OPTIONS\_TOO\_MUCH | Too many options provided. |
| 400 | OPTION\_INVALID | Invalid option selected. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 406 | POLL\_COUNTRY\_RESTRICTED | Users from the current user's country cannot vote in this [country-restricted poll&nbsp;&raquo;](/api/poll.md#country-restricted-polls). |
| 406 | POLL\_MEMBER\_RESTRICTED | Only channel subscribers can vote in this poll. |
| 400 | REVOTE\_NOT\_ALLOWED | You cannot change your vote. |

### Related pages

#### [poll](/constructor/poll.md)
Poll

#### [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md)
Change the default peer that should be used when sending messages, reactions, poll votes to a specific group

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
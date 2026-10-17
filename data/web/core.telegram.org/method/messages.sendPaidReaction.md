# messages.sendPaidReaction

Sends one or more [paid Telegram Star reactions »](/api/reactions.md#paid-reactions), transferring [Telegram Stars »](/api/stars.md) to a channel's balance.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendPaidReaction#58bbcb50 flags:# peer:InputPeer msg_id:int count:int random_id:long private:flags.0?PaidReactionPrivacy = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | The channel |
| **msg\_id** | [int](/type/int.md) | The message to react to |
| **count** | [int](/type/int.md) | The number of [stars](/api/stars.md) to send (each will increment the reaction counter by one). |
| **random\_id** | [long](/type/long.md) | Unique client message ID required to prevent message resending. **Note**: this argument **must** be composed of a 64-bit integer where the lower 32 bits are random, and the higher 32 bits **are equal to the current unixtime**, i.e. `uint64\_t random\_id = (time() &lt;&lt; 32). See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **private** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PaidReactionPrivacy](/type/PaidReactionPrivacy.md) | Each post with star reactions has a leaderboard with the top senders, but users can opt out of appearing there if they prefer more privacy. Not populating this field will use the default reaction privacy, stored on the server and synced to clients using [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) (see [here](/api/reactions.md#paid-reaction-privacy) for more info). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BALANCE\_TOO\_LOW | The transaction cannot be completed because the current [Telegram Stars balance](/api/stars.md) is too low. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | RANDOM\_ID\_EMPTY | Random ID empty. |
| 400 | RANDOM\_ID\_EXPIRED | The specified `random_id` was expired (most likely it didn't follow the required `uint64_t random_id = (time() << 32) | ((uint64_t)random_uint32_t())` format, or the specified time is too far in the past). |
| 400 | REACTIONS\_COUNT\_INVALID | The specified number of reactions is invalid. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md)
Contains the current [default paid reaction privacy, see here »](/api/reactions.md#paid-reactions) for more info.

Clients should invoke [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md) on startup to fetch the current default reaction privacy because this update is only sent to currently online sessions and cannot be fetched using getDifference on client startup.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.
# messages.sendReaction

React to message.

Starting from layer 159, the reaction will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **big** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether a bigger and longer reaction should be shown |
| **add\_to\_recent** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to add this reaction to the [recent reactions list »](/api/reactions.md#recent-reactions). |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |
| **msg\_id** | [int](/type/int.md) | Message ID to react to |
| **reaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[Reaction](/type/Reaction.md)&gt; | A list of reactions (doesn't accept [reactionPaid](/constructor/reactionPaid.md) constructors, use [messages.sendPaidReaction](/method/messages.sendPaidReaction.md) to send paid reactions, instead). |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | CUSTOM\_REACTIONS\_TOO\_MANY | Too many custom reactions were specified. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MESSAGE\_NOT\_MODIFIED | The provided message data is identical to the previous message data, the message wasn't modified. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 400 | REACTIONS\_TOO\_MANY | The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info&nbsp;&raquo;](/api/config.md#client-configuration). |
| 400 | REACTION\_EMPTY | Empty reaction provided. |
| 400 | REACTION\_INVALID | The specified reaction is invalid. |
| 403 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [reactionPaid](/constructor/reactionPaid.md)
Represents a [paid Telegram Star reaction »](/api/reactions.md#paid-reactions).

#### [messages.sendPaidReaction](/method/messages.sendPaidReaction.md)
Sends one or more [paid Telegram Star reactions »](/api/reactions.md#paid-reactions), transferring [Telegram Stars »](/api/stars.md) to a channel's balance.

#### [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md)
Change the default peer that should be used when sending messages, reactions, poll votes to a specific group

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
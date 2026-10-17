# channels.updatePaidMessagesPrice

Enable or disable [paid messages »](/api/paid-messages.md) in this [supergroup](/api/channel.md) or [monoforum](/api/monoforum.md).

Also used to [enable or disable monoforums aka direct messages in a channel](/api/monoforum.md).

Note that passing the ID of the monoforum itself to `channel` will return a `CHANNEL_MONOFORUM_UNSUPPORTED` error: pass the ID of the associated channel to edit the settings of the associated monoforum, instead.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
channels.updatePaidMessagesPrice#4b12327b flags:# broadcast_messages_allowed:flags.0?true channel:InputChannel send_paid_messages_stars:long = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **broadcast\_messages\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Only usable for channels, enables or disables the associated [monoforum aka direct messages](/api/monoforum.md). |
| **channel** | [InputChannel](/type/InputChannel.md) | Pass the supergroup ID for supergroups and the ID of the [channel](/api/channel.md) to modify the setting in the associated monoforum. |
| **send\_paid\_messages\_stars** | [long](/type/long.md) | Specifies the required amount of [Telegram Stars](/api/stars.md) users must pay to send messages to the supergroup or monoforum. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | STARS\_AMOUNT\_INVALID | The specified amount in stars is invalid. |

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.
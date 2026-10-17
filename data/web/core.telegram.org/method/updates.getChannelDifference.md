# updates.getChannelDifference

Returns the difference between the current state of updates of a certain channel and transmitted.

```tl
updates.channelDifferenceEmpty#3e11affb flags:# final:flags.0?true pts:int timeout:flags.1?int = updates.ChannelDifference;
updates.channelDifferenceTooLong#a4bcc6fe flags:# final:flags.0?true timeout:flags.1?int dialog:Dialog messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
updates.channelDifference#2064674e flags:# final:flags.0?true pts:int timeout:flags.1?int new_messages:Vector<Message> other_updates:Vector<Update> chats:Vector<Chat> users:Vector<User> = updates.ChannelDifference;
---functions---
updates.getChannelDifference#3173d78 flags:# force:flags.0?true channel:InputChannel filter:ChannelMessagesFilter pts:int limit:int = updates.ChannelDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **force** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set to true to skip some possibly unneeded updates and reduce server-side load |
| **channel** | [InputChannel](/type/InputChannel.md) | The channel |
| **filter** | [ChannelMessagesFilter](/type/ChannelMessagesFilter.md) | Messsage filter |
| **pts** | [int](/type/int.md) | Persistent timestamp (see [updates](/api/updates.md)) |
| **limit** | [int](/type/int.md) | How many updates to fetch, max `100000`\
Ordinary (non-bot) users are supposed to pass `10-100` |

### Result
[updates.ChannelDifference](/type/updates.ChannelDifference.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHANNEL\_PUBLIC\_GROUP\_NA | channel/supergroup not available. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | FROM\_MESSAGE\_BOT\_DISABLED | Bots can't use fromMessage min constructors. |
| 400 | FROZEN\_PARTICIPANT\_MISSING | The current account is [frozen](/api/auth.md#frozen-accounts), and cannot access the specified peer. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PERSISTENT\_TIMESTAMP\_EMPTY | Persistent timestamp empty. |
| 400 | PERSISTENT\_TIMESTAMP\_INVALID | Persistent timestamp invalid. |
| 500 | PERSISTENT\_TIMESTAMP\_OUTDATED | Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL). |
| 400 | PINNED\_DIALOGS\_TOO\_MUCH | Too many pinned dialogs. |
| 400 | RANGES\_INVALID | Invalid range provided. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
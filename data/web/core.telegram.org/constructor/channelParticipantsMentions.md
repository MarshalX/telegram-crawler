# channelParticipantsMentions

This filter is used when looking for supergroup members to mention.  
This filter will automatically remove anonymous admins, and return even non-participant users that replied to a specific [thread](/api/threads.md) through the [comment section](/api/threads.md#channel-comments) of a channel.

```tl
channelParticipantsMentions#e04b5ceb flags:# q:flags.0?string top_msg_id:flags.1?int = ChannelParticipantsFilter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **q** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Filter by user name or username |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Look only for users that posted in this [thread](/api/threads.md) |

### Type
[ChannelParticipantsFilter](/type/ChannelParticipantsFilter.md)

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.
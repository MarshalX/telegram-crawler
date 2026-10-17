# channelParticipant

Channel/supergroup participant

```tl
channelParticipant#1bd54456 flags:# user_id:long date:int subscription_until_date:flags.0?int rank:flags.2?string = ChannelParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [long](/type/long.md) | Participant user ID |
| **date** | [int](/type/int.md) | Date joined |
| **subscription\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, contains the expiration date of the current [Telegram Star subscription period »](/api/stars.md#star-subscriptions) for the specified participant. |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The participant's [tag »](/api/rank.md). |

### Type
[ChannelParticipant](/type/ChannelParticipant.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.
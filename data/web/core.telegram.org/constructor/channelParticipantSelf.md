# channelParticipantSelf

Myself

```tl
channelParticipantSelf#a9478a1a flags:# via_request:flags.0?true user_id:long inviter_id:long date:int subscription_until_date:flags.1?int rank:flags.2?string = ChannelParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_request** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether I joined upon specific approval of an admin |
| **user\_id** | [long](/type/long.md) | User ID |
| **inviter\_id** | [long](/type/long.md) | User that invited me to the channel/supergroup |
| **date** | [int](/type/int.md) | When did I join the channel/supergroup |
| **subscription\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If set, contains the expiration date of the current [Telegram Star subscription period »](/api/stars.md#star-subscriptions) for the specified participant. |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The participant's [tag »](/api/rank.md). |

### Type
[ChannelParticipant](/type/ChannelParticipant.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.
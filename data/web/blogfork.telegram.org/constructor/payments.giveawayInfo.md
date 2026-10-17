# payments.giveawayInfo

Contains info about an ongoing [giveaway](/api/giveaways.md).

If neither the `participating`, `joined_too_early_date`, `admin_disallowed_chat_id` or `disallowed_country` flags are set, the user is not currently participating in the giveaway but could participate by joining all the channels specified in the [messageMediaGiveaway](/constructor/messageMediaGiveaway.md).`channels` field.

```tl
payments.giveawayInfo#4367daa0 flags:# participating:flags.0?true preparing_results:flags.3?true start_date:int joined_too_early_date:flags.1?int admin_disallowed_chat_id:flags.2?long disallowed_country:flags.4?string = payments.GiveawayInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **participating** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | The current user is participating in the giveaway. |
| **preparing\_results** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, the giveaway has ended and the results are being prepared. |
| **start\_date** | [int](/type/int.md) | When was the giveaway started |
| **joined\_too\_early\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | The current user can't participate in the giveaway, because they were already a member of the channel when the giveaway started, and the `only_new_subscribers` was set when starting the giveaway. |
| **admin\_disallowed\_chat\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | If set, the current user can't participate in the giveaway, because they are an administrator in one of the channels (ID specified in this flag) that created the giveaway. |
| **disallowed\_country** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | If set, the current user can't participate in this giveaway, because their phone number is from the specified disallowed country (specified as a two-letter ISO 3166-1 alpha-2 country code). |

### Type
[payments.GiveawayInfo](/type/payments.GiveawayInfo.md)

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [messageMediaGiveaway](/constructor/messageMediaGiveaway.md)
Contains info about a [giveaway, see here »](/api/giveaways.md) for more info.
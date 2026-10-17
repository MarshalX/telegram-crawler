# payments.suggestedStarRefBots

A list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md)

```tl
payments.suggestedStarRefBots#b4d5d859 flags:# count:int suggested_bots:Vector<StarRefProgram> users:Vector<User> next_offset:flags.0?string = payments.SuggestedStarRefBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of results (for pagination) |
| **suggested\_bots** | [Vector](/type/Vector%20t)&lt;[StarRefProgram](/type/StarRefProgram.md)&gt; | Suggested affiliate programs (full or partial list to be fetched using pagination) |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Peers mentioned in `suggested_bots` |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Next offset for [pagination](/api/offsets.md) |

### Type
[payments.SuggestedStarRefBots](/type/payments.SuggestedStarRefBots.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.
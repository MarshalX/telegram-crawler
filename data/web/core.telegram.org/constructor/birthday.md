# birthday

[Birthday](/api/profile.md#birthday) information for a user.

Also used to invite users to gift [Telegram Premium subscriptions »](/api/premium.md#gifting-telegram-premium) to other users with birthdays within a +1/-1 day time range, related to the current day.

```tl
birthday#6c8e1e06 flags:# day:int month:int year:flags.0?int = Birthday;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **day** | [int](/type/int.md) | Birth day |
| **month** | [int](/type/int.md) | Birth month |
| **year** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | (Optional) birth year. |

### Type
[Birthday](/type/Birthday.md)

### Related pages

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.
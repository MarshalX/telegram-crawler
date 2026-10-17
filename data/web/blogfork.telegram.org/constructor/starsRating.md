# starsRating

Represents the profile's [star rating, see here »](/api/stars.md#star-rating) for more info.

```tl
starsRating#1b0e4f07 flags:# level:int current_level_stars:long stars:long next_level_stars:flags.0?long = StarsRating;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **level** | [int](/type/int.md) | The current level, may be negative. |
| **current\_level\_stars** | [long](/type/long.md) | The numerical value of the rating required for the current level. |
| **stars** | [long](/type/long.md) | Numerical value of the current rating. |
| **next\_level\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | The numerical value of the rating required for the next level. |

### Type
[StarsRating](/type/StarsRating.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.
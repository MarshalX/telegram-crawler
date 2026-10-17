# messageEntityFormattedDate

Represents a specific point in time, rendered as specified [here »](/api/entities.md#date-entities)

All flags are optional, with the following limitations:

- `relative` cannot combined with any other flag
- `short_time` and `long_time` cannot be combined with each other
- `short_date` and `long_date` cannot be combined with each other

If any of the flags are combined, their rendering order in the text is the following:

- `day_of_week`
- `short_time`/`long_time`
- `short_date`/`long_date`

```tl
messageEntityFormattedDate#904ac7c7 flags:# relative:flags.0?true short_time:flags.1?true long_time:flags.2?true short_date:flags.3?true long_date:flags.4?true day_of_week:flags.5?true offset:int length:int date:int = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **relative** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, render a relative date, see [here »](/api/entities.md#date-entities) for more info. Cannot be combined with any of the other flags. |
| **short\_time** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Renders the time in short format: hours and minutes, according to the user's locale settings; cannot be combined with `long_time`. |
| **long\_time** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Renders the time in long format: hours, minutes, seconds and maybe timezone, according to the user's locale settings; cannot be combined with `short_time`. |
| **short\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Renders the time in short format: month, date, (and year, if different from the current one), all according the user's locale settings; cannot be combined with `long_date`. |
| **long\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Renders the time in long format: always month, date and year, all according the user's locale settings; cannot be combined with `short_date`. |
| **day\_of\_week** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Renders the day of the week according to the user's locale settings. |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **date** | [int](/type/int.md) | The date as a UNIX timestamp: the allowed value ranges from `0` to the current date plus 1098 days (`time()+1098*86400`). |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
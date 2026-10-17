# businessWeeklyOpen

A time interval, indicating the opening hours of a business.

Note that opening hours specified by the user must be appropriately validated and transformed before uploading them to the server, as specified [here »](/api/business.md#opening-hours).

```tl
businessWeeklyOpen#120b1ab9 start_minute:int end_minute:int = BusinessWeeklyOpen;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **start\_minute** | [int](/type/int.md) | Start minute in minutes of the week, `0` to `7*24*60` inclusively. |
| **end\_minute** | [int](/type/int.md) | End minute in minutes of the week, `1` to `8*24*60` inclusively (`8` and not `7` because this allows to specify intervals that, for example, start on `Sunday 21:00` and end on `Monday 04:00` (`6*24*60+21*60` to `7*24*60+4*60`) without passing an invalid `end_minute < start_minute`). See [here »](/api/business.md#opening-hours) for more info. |

### Type
[BusinessWeeklyOpen](/type/BusinessWeeklyOpen.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
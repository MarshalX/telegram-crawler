# BusinessWeeklyOpen

A time interval, indicating the opening hours of a [Telegram Business](/api/business.md#opening-hours).

```tl
businessWeeklyOpen#120b1ab9 start_minute:int end_minute:int = BusinessWeeklyOpen;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [businessWeeklyOpen](/constructor/businessWeeklyOpen.md) | A time interval, indicating the opening hours of a business.\
\
Note that opening hours specified by the user must be appropriately validated and transformed before uploading them to the server, as specified [here »](/api/business.md#opening-hours). |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
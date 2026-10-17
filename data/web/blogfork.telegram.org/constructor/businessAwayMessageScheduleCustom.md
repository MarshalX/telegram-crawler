# businessAwayMessageScheduleCustom

Send [Telegram Business away messages](/api/business.md#away-messages) to users writing to us in private in the specified time span.

```tl
businessAwayMessageScheduleCustom#cc4d9ecc start_date:int end_date:int = BusinessAwayMessageSchedule;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **start\_date** | [int](/type/int.md) | Start date (UNIX timestamp). |
| **end\_date** | [int](/type/int.md) | End date (UNIX timestamp). |

### Type
[BusinessAwayMessageSchedule](/type/BusinessAwayMessageSchedule.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
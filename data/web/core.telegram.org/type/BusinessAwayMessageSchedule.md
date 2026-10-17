# BusinessAwayMessageSchedule

Specifies when should the [Telegram Business away messages](/api/business.md#away-messages) be sent.

```tl
businessAwayMessageScheduleAlways#c9b9e2b9 = BusinessAwayMessageSchedule;
businessAwayMessageScheduleOutsideWorkHours#c3f2f501 = BusinessAwayMessageSchedule;
businessAwayMessageScheduleCustom#cc4d9ecc start_date:int end_date:int = BusinessAwayMessageSchedule;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [businessAwayMessageScheduleAlways](/constructor/businessAwayMessageScheduleAlways.md) | Always send [Telegram Business away messages](/api/business.md#away-messages) to users writing to us in private. |
| [businessAwayMessageScheduleOutsideWorkHours](/constructor/businessAwayMessageScheduleOutsideWorkHours.md) | Send [Telegram Business away messages](/api/business.md#away-messages) to users writing to us in private outside of the configured [Telegram Business working hours](/api/business.md#opening-hours). |
| [businessAwayMessageScheduleCustom](/constructor/businessAwayMessageScheduleCustom.md) | Send [Telegram Business away messages](/api/business.md#away-messages) to users writing to us in private in the specified time span. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
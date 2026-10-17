# help.TimezonesList

Timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours).

```tl
help.timezonesListNotModified#970708cc = help.TimezonesList;
help.timezonesList#7b74ed71 timezones:Vector<Timezone> hash:int = help.TimezonesList;

---functions---

help.getTimezonesList#49b30240 hash:int = help.TimezonesList;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.timezonesListNotModified](/constructor/help.timezonesListNotModified.md) | The timezone list has not changed. |
| [help.timezonesList](/constructor/help.timezonesList.md) | Timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours). |

### Methods

| Method | Description |
| --- | --- |
| [help.getTimezonesList](/method/help.getTimezonesList.md) | Returns timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours). |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
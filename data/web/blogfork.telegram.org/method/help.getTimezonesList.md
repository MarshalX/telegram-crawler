# help.getTimezonesList

Returns timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours).

```tl
help.timezonesListNotModified#970708cc = help.TimezonesList;
help.timezonesList#7b74ed71 timezones:Vector<Timezone> hash:int = help.TimezonesList;
---functions---
help.getTimezonesList#49b30240 hash:int = help.TimezonesList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[help.TimezonesList](/type/help.TimezonesList.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
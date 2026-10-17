# help.timezonesList

Timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours).

```tl
help.timezonesList#7b74ed71 timezones:Vector<Timezone> hash:int = help.TimezonesList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **timezones** | [Vector](/type/Vector%20t)&lt;[Timezone](/type/Timezone.md)&gt; | Timezones |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Type
[help.TimezonesList](/type/help.TimezonesList.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
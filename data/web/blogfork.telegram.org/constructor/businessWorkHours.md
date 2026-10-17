# businessWorkHours

Specifies a set of [Telegram Business opening hours](/api/business.md#opening-hours).

```tl
businessWorkHours#8c92b098 flags:# open_now:flags.0?true timezone_id:string weekly_open:Vector<BusinessWeeklyOpen> = BusinessWorkHours;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **open\_now** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Ignored if set while invoking [account.updateBusinessWorkHours](/method/account.updateBusinessWorkHours.md), only returned by the server in [userFull](/constructor/userFull.md).`business_work_hours`, indicating whether the business is currently open according to the current time and the values in `weekly_open` and `timezone`. |
| **timezone\_id** | [string](/type/string.md) | An ID of one of the timezones returned by [help.getTimezonesList](/method/help.getTimezonesList.md).  \
  The timezone ID is contained [timezone](/constructor/timezone.md).`id`, a human-readable, localized name of the timezone is available in [timezone](/constructor/timezone.md).`name` and the [timezone](/constructor/timezone.md).`utc_offset` field contains the UTC offset in seconds, which may be displayed in hh:mm format by the client together with the human-readable name (i.e. `$name UTC -01:00`). |
| **weekly\_open** | [Vector](/type/Vector%20t)&lt;[BusinessWeeklyOpen](/type/BusinessWeeklyOpen.md)&gt; | A list of time intervals (max 28) represented by [businessWeeklyOpen »](/constructor/businessWeeklyOpen.md), indicating the opening hours of their business. |

### Type
[BusinessWorkHours](/type/BusinessWorkHours.md)

### Related pages

#### [account.updateBusinessWorkHours](/method/account.updateBusinessWorkHours.md)
Specify a set of [Telegram Business opening hours](/api/business.md#opening-hours).  
This info will be contained in [userFull](/constructor/userFull.md).`business_work_hours`.

To remove all opening hours, invoke the method without setting the `business_work_hours` field.

Note that the opening hours specified by the user must be appropriately validated and transformed before invoking the method, as specified [here »](/api/business.md#opening-hours).

#### [userFull](/constructor/userFull.md)
Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [help.getTimezonesList](/method/help.getTimezonesList.md)
Returns timezone information that may be used elsewhere in the API, such as to set [Telegram Business opening hours »](/api/business.md#opening-hours).

#### [timezone](/constructor/timezone.md)
Timezone information.

#### [businessWeeklyOpen](/constructor/businessWeeklyOpen.md)
A time interval, indicating the opening hours of a business.

Note that opening hours specified by the user must be appropriately validated and transformed before uploading them to the server, as specified [here »](/api/business.md#opening-hours).

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
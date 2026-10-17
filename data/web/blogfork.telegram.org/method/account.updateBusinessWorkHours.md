# account.updateBusinessWorkHours

Specify a set of [Telegram Business opening hours](/api/business.md#opening-hours).  
This info will be contained in [userFull](/constructor/userFull.md).`business_work_hours`.

To remove all opening hours, invoke the method without setting the `business_work_hours` field.

Note that the opening hours specified by the user must be appropriately validated and transformed before invoking the method, as specified [here »](/api/business.md#opening-hours).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateBusinessWorkHours#4b00e066 flags:# business_work_hours:flags.0?BusinessWorkHours = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **business\_work\_hours** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[BusinessWorkHours](/type/BusinessWorkHours.md) | Opening hours (optional, if not set removes all opening hours). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUSINESS\_WORK\_HOURS\_EMPTY | No work hours were specified. |
| 400 | BUSINESS\_WORK\_HOURS\_PERIOD\_INVALID | The specified work hours are invalid, see [here&nbsp;&raquo;](/api/business.md#opening-hours) for the exact requirements. |
| 400 | TIMEZONE\_INVALID | The specified timezone does not exist. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [userFull](/constructor/userFull.md)
Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).
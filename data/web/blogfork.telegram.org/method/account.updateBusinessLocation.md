# account.updateBusinessLocation

[Businesses »](/api/business.md#location) may advertise their location using this method, see [here »](/api/business.md#location) for more info.

To remove business location information invoke the method without setting any of the parameters.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateBusinessLocation#9e6b131a flags:# geo_point:flags.1?InputGeoPoint address:flags.0?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **geo\_point** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputGeoPoint](/type/InputGeoPoint.md) | Optional, contains a set of geographical coordinates. |
| **address** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Mandatory when setting/updating the location, contains a textual description of the address (max 96 UTF-8 chars). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
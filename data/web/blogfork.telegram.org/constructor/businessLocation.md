# businessLocation

Represents the location of a [Telegram Business »](/api/business.md#location).

```tl
businessLocation#ac5c1af7 flags:# geo_point:flags.0?GeoPoint address:string = BusinessLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **geo\_point** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[GeoPoint](/type/GeoPoint.md) | Geographical coordinates (optional). |
| **address** | [string](/type/string.md) | Textual description of the address (mandatory). |

### Type
[BusinessLocation](/type/BusinessLocation.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.
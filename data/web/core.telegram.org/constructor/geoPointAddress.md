# geoPointAddress

Address optionally associated to a [geoPoint](/constructor/geoPoint.md).

```tl
geoPointAddress#de4c5d93 flags:# country_iso2:string state:flags.0?string city:flags.1?string street:flags.2?string = GeoPointAddress;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **country\_iso2** | [string](/type/string.md) | Two-letter ISO 3166-1 alpha-2 country code |
| **state** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | State |
| **city** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | City |
| **street** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Street |

### Type
[GeoPointAddress](/type/GeoPointAddress.md)

### Related pages

#### [geoPoint](/constructor/geoPoint.md)
GeoPoint.
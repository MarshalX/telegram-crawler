# geoPoint

GeoPoint.

```tl
geoPoint#b2a2f663 flags:# long:double lat:double access_hash:long accuracy_radius:flags.0?int = GeoPoint;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **long** | [double](/type/double.md) | Longitude |
| **lat** | [double](/type/double.md) | Latitude |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **accuracy\_radius** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | The estimated horizontal accuracy of the location, in meters; as defined by the sender. |

### Type
[GeoPoint](/type/GeoPoint.md)
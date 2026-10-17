# inputGeoPoint

Defines a GeoPoint by its coordinates.

```tl
inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **lat** | [double](/type/double.md) | Latitude |
| **long** | [double](/type/double.md) | Longitude |
| **accuracy\_radius** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | The estimated horizontal accuracy of the location, in meters; as defined by the sender. |

### Type
[InputGeoPoint](/type/InputGeoPoint.md)
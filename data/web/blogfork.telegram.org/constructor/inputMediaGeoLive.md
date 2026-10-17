# inputMediaGeoLive

[Live geolocation](/api/live-location.md)

```tl
inputMediaGeoLive#971fa843 flags:# stopped:flags.0?true geo_point:InputGeoPoint heading:flags.2?int period:flags.1?int proximity_notification_radius:flags.3?int = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **stopped** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether sending of the geolocation was stopped |
| **geo\_point** | [InputGeoPoint](/type/InputGeoPoint.md) | Current geolocation |
| **heading** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | For [live locations](/api/live-location.md), a direction in which the location moves, in degrees; 1-360. |
| **period** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Validity period of the current location |
| **proximity\_notification\_radius** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | For [live locations](/api/live-location.md), a maximum distance to another chat member for proximity alerts, in meters (0-100000) |

### Type
[InputMedia](/type/InputMedia.md)

### Related pages

#### [Live geolocation](/api/live-location.md)
Telegram allows sending the live geolocation of a user in a chat, optionally setting a proximity alert.
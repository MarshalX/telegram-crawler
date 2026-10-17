# messageMediaGeoLive

Indicates a [live geolocation](/api/live-location.md)

```tl
messageMediaGeoLive#b940c666 flags:# geo:GeoPoint heading:flags.0?int period:int proximity_notification_radius:flags.1?int = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **geo** | [GeoPoint](/type/GeoPoint.md) | Geolocation |
| **heading** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | For [live locations](/api/live-location.md), a direction in which the location moves, in degrees; 1-360 |
| **period** | [int](/type/int.md) | Validity period of provided geolocation |
| **proximity\_notification\_radius** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | For [live locations](/api/live-location.md), a maximum distance to another chat member for proximity alerts, in meters (0-100000). |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [Live geolocation](/api/live-location.md)
Telegram allows sending the live geolocation of a user in a chat, optionally setting a proximity alert.
# botInlineMessageMediaGeo

Send a geolocation

```tl
botInlineMessageMediaGeo#51846fd flags:# geo:GeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **geo** | [GeoPoint](/type/GeoPoint.md) | Geolocation |
| **heading** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | For [live locations](/api/live-location.md), a direction in which the location moves, in degrees; 1-360. |
| **period** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Validity period |
| **proximity\_notification\_radius** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | For [live locations](/api/live-location.md), a maximum distance to another chat member for proximity alerts, in meters (0-100000). |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Inline keyboard |

### Type
[BotInlineMessage](/type/BotInlineMessage.md)

### Related pages

#### [Live geolocation](/api/live-location.md)
Telegram allows sending the live geolocation of a user in a chat, optionally setting a proximity alert.
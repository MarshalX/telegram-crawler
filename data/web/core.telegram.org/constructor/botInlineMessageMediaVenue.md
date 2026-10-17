# botInlineMessageMediaVenue

Send a venue

```tl
botInlineMessageMediaVenue#8a86659c flags:# geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **geo** | [GeoPoint](/type/GeoPoint.md) | Geolocation of venue |
| **title** | [string](/type/string.md) | Venue name |
| **address** | [string](/type/string.md) | Address |
| **provider** | [string](/type/string.md) | Venue provider: currently only "foursquare" and "gplaces" (Google Places) need to be supported |
| **venue\_id** | [string](/type/string.md) | Venue ID in the provider's database |
| **venue\_type** | [string](/type/string.md) | Venue type in the provider's database |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Inline keyboard |

### Type
[BotInlineMessage](/type/BotInlineMessage.md)
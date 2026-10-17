# mediaAreaGeoPoint

Represents a geolocation tag attached to a [story](/api/stories.md).

```tl
mediaAreaGeoPoint#cad5452d flags:# coordinates:MediaAreaCoordinates geo:GeoPoint address:flags.0?GeoPointAddress = MediaArea;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **coordinates** | [MediaAreaCoordinates](/type/MediaAreaCoordinates.md) | The size and position of the media area corresponding to the location sticker on top of the story media. |
| **geo** | [GeoPoint](/type/GeoPoint.md) | Coordinates of the geolocation tag. |
| **address** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[GeoPointAddress](/type/GeoPointAddress.md) | Optional textual representation of the address. |

### Type
[MediaArea](/type/MediaArea.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
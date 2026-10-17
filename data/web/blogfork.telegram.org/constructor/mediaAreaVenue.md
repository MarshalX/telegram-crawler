# mediaAreaVenue

Represents a location tag attached to a [story](/api/stories.md), with additional venue information.

```tl
mediaAreaVenue#be82db9c coordinates:MediaAreaCoordinates geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MediaArea;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **coordinates** | [MediaAreaCoordinates](/type/MediaAreaCoordinates.md) | The size and location of the media area corresponding to the location sticker on top of the story media. |
| **geo** | [GeoPoint](/type/GeoPoint.md) | Coordinates of the venue |
| **title** | [string](/type/string.md) | Venue name |
| **address** | [string](/type/string.md) | Address |
| **provider** | [string](/type/string.md) | Venue provider: currently only "foursquare" needs to be supported. |
| **venue\_id** | [string](/type/string.md) | Venue ID in the provider's database |
| **venue\_type** | [string](/type/string.md) | Venue type in the provider's database |

### Type
[MediaArea](/type/MediaArea.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
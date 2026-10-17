# MediaArea

Represents a [story media area »](/api/stories.md#media-areas)

```tl
mediaAreaVenue#be82db9c coordinates:MediaAreaCoordinates geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MediaArea;
inputMediaAreaVenue#b282217f coordinates:MediaAreaCoordinates query_id:long result_id:string = MediaArea;
mediaAreaGeoPoint#cad5452d flags:# coordinates:MediaAreaCoordinates geo:GeoPoint address:flags.0?GeoPointAddress = MediaArea;
mediaAreaSuggestedReaction#14455871 flags:# dark:flags.0?true flipped:flags.1?true coordinates:MediaAreaCoordinates reaction:Reaction = MediaArea;
mediaAreaChannelPost#770416af coordinates:MediaAreaCoordinates channel_id:long msg_id:int = MediaArea;
inputMediaAreaChannelPost#2271f2bf coordinates:MediaAreaCoordinates channel:InputChannel msg_id:int = MediaArea;
mediaAreaUrl#37381085 coordinates:MediaAreaCoordinates url:string = MediaArea;
mediaAreaWeather#49a6549c coordinates:MediaAreaCoordinates emoji:string temperature_c:double color:int = MediaArea;
mediaAreaStarGift#5787686d coordinates:MediaAreaCoordinates slug:string = MediaArea;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [mediaAreaVenue](/constructor/mediaAreaVenue.md) | Represents a location tag attached to a [story](/api/stories.md), with additional venue information. |
| [inputMediaAreaVenue](/constructor/inputMediaAreaVenue.md) | Represents a [location tag](/api/stories.md#media-areas) attached to a [story](/api/stories.md), with additional venue information. |
| [mediaAreaGeoPoint](/constructor/mediaAreaGeoPoint.md) | Represents a geolocation tag attached to a [story](/api/stories.md). |
| [mediaAreaSuggestedReaction](/constructor/mediaAreaSuggestedReaction.md) | Represents a reaction bubble. |
| [mediaAreaChannelPost](/constructor/mediaAreaChannelPost.md) | Represents a channel post. |
| [inputMediaAreaChannelPost](/constructor/inputMediaAreaChannelPost.md) | Represents a channel post |
| [mediaAreaUrl](/constructor/mediaAreaUrl.md) | Represents a [URL media area](/api/stories.md#urls). |
| [mediaAreaWeather](/constructor/mediaAreaWeather.md) | Represents a [weather widget »](/api/stories.md#weather). |
| [mediaAreaStarGift](/constructor/mediaAreaStarGift.md) | Represents a [collectible gift »](/api/gifts.md#collectible-gifts). |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
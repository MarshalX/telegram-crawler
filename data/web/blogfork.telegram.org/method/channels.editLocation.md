# channels.editLocation

Edit location of geogroup, see [here »](/api/nearby.md) for more info on geogroups.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.editLocation#58e63f6d channel:InputChannel geo_point:InputGeoPoint address:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | [Geogroup](/api/channel.md) |
| **geo\_point** | [InputGeoPoint](/type/InputGeoPoint.md) | New geolocation |
| **address** | [string](/type/string.md) | Address string |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | MEGAGROUP\_GEO\_REQUIRED | This method can only be invoked on a geogroup. |
| 400 | MEGAGROUP\_REQUIRED | You can only use this method on a supergroup. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Nearby users&chats](/api/nearby.md)
How to work with geolocation-based features like geochats and the nearby users feature.
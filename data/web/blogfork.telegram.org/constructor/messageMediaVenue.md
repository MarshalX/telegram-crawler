# messageMediaVenue

Venue

```tl
messageMediaVenue#2ec0533f geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **geo** | [GeoPoint](/type/GeoPoint.md) | Geolocation of venue |
| **title** | [string](/type/string.md) | Venue name |
| **address** | [string](/type/string.md) | Address |
| **provider** | [string](/type/string.md) | Venue provider: currently only "foursquare" and "gplaces" (Google Places) need to be supported |
| **venue\_id** | [string](/type/string.md) | Venue ID in the provider's database |
| **venue\_type** | [string](/type/string.md) | Venue type in the provider's database |

### Type
[MessageMedia](/type/MessageMedia.md)
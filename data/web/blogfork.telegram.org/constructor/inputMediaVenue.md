# inputMediaVenue

Can be used to send a venue geolocation.

```tl
inputMediaVenue#c13d1c11 geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **geo\_point** | [InputGeoPoint](/type/InputGeoPoint.md) | Geolocation |
| **title** | [string](/type/string.md) | Venue name |
| **address** | [string](/type/string.md) | Physical address of the venue |
| **provider** | [string](/type/string.md) | Venue provider: currently only "foursquare" and "gplaces" (Google Places) need to be supported |
| **venue\_id** | [string](/type/string.md) | Venue ID in the provider's database |
| **venue\_type** | [string](/type/string.md) | Venue type in the provider's database |

### Type
[InputMedia](/type/InputMedia.md)
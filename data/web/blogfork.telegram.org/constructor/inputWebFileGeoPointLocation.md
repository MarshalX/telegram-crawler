# inputWebFileGeoPointLocation

Used to download a server-generated image with the map preview from a [geoPoint](/constructor/geoPoint.md), see the [webfile docs for more info »](/api/files.md#downloading-webfiles).

```tl
inputWebFileGeoPointLocation#9f2221c9 geo_point:InputGeoPoint access_hash:long w:int h:int zoom:int scale:int = InputWebFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **geo\_point** | [InputGeoPoint](/type/InputGeoPoint.md) | Generated from the `lat`, `long` and `accuracy_radius` parameters of the [geoPoint](/constructor/geoPoint.md) |
| **access\_hash** | [long](/type/long.md) | Access hash of the [geoPoint](/constructor/geoPoint.md) |
| **w** | [int](/type/int.md) | Map width in pixels before applying scale; 16-1024 |
| **h** | [int](/type/int.md) | Map height in pixels before applying scale; 16-1024 |
| **zoom** | [int](/type/int.md) | Map zoom level; 13-20 |
| **scale** | [int](/type/int.md) | Map scale; 1-3 |

### Type
[InputWebFileLocation](/type/InputWebFileLocation.md)

### Related pages

#### [geoPoint](/constructor/geoPoint.md)
GeoPoint.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.
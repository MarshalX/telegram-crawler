# nearestDc

Nearest data center, according to geo-ip.

```tl
nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **country** | [string](/type/string.md) | Country code determined by geo-ip |
| **this\_dc** | [int](/type/int.md) | Number of current data center |
| **nearest\_dc** | [int](/type/int.md) | Number of nearest data center |

### Type
[NearestDc](/type/NearestDc.md)
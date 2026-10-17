# timezone

Timezone information.

```tl
timezone#ff9289f5 id:string name:string utc_offset:int = Timezone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [string](/type/string.md) | Unique timezone ID. |
| **name** | [string](/type/string.md) | Human-readable and localized timezone name. |
| **utc\_offset** | [int](/type/int.md) | UTC offset in seconds, which may be displayed in hh:mm format by the client together with the human-readable name (i.e. `$name UTC -01:00`). |

### Type
[Timezone](/type/Timezone.md)
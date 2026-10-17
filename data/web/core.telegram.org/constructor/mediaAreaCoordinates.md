# mediaAreaCoordinates

Coordinates and size of a clickable rectangular area on top of a story.

```tl
mediaAreaCoordinates#cfc9e002 flags:# x:double y:double w:double h:double rotation:double radius:flags.0?double = MediaAreaCoordinates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **x** | [double](/type/double.md) | The abscissa of the rectangle's center, as a percentage of the media width (0-100). |
| **y** | [double](/type/double.md) | The ordinate of the rectangle's center, as a percentage of the media height (0-100). |
| **w** | [double](/type/double.md) | The width of the rectangle, as a percentage of the media width (0-100). |
| **h** | [double](/type/double.md) | The height of the rectangle, as a percentage of the media height (0-100). |
| **rotation** | [double](/type/double.md) | Clockwise rotation angle of the rectangle, in degrees (0-360). |
| **radius** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[double](/type/double.md) | The radius of the rectangle corner rounding, as a percentage of the media width. |

### Type
[MediaAreaCoordinates](/type/MediaAreaCoordinates.md)
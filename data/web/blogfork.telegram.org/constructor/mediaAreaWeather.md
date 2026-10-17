# mediaAreaWeather

Represents a [weather widget »](/api/stories.md#weather).

```tl
mediaAreaWeather#49a6549c coordinates:MediaAreaCoordinates emoji:string temperature_c:double color:int = MediaArea;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **coordinates** | [MediaAreaCoordinates](/type/MediaAreaCoordinates.md) | The size and location of the media area corresponding to the widget on top of the story media. |
| **emoji** | [string](/type/string.md) | Weather emoji, should be rendered as an [animated emoji](/api/animated-emojis.md). |
| **temperature\_c** | [double](/type/double.md) | Temperature in degrees Celsius. |
| **color** | [int](/type/int.md) | ARGB background color. |

### Type
[MediaArea](/type/MediaArea.md)

### Related pages

#### [Animated Emojis](/api/animated-emojis.md)
Graphical telegram clients should transform emojis into their respective animated version.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
# inputMediaAreaVenue

Represents a [location tag](/api/stories.md#media-areas) attached to a [story](/api/stories.md), with additional venue information.

```tl
inputMediaAreaVenue#b282217f coordinates:MediaAreaCoordinates query_id:long result_id:string = MediaArea;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **coordinates** | [MediaAreaCoordinates](/type/MediaAreaCoordinates.md) | The size and location of the media area corresponding to the location sticker on top of the story media. |
| **query\_id** | [long](/type/long.md) | The `query_id` from [messages.botResults](/constructor/messages.botResults.md), see [here »](/api/stories.md#media-areas) for more info. |
| **result\_id** | [string](/type/string.md) | The `id` of the chosen result, see [here »](/api/stories.md#media-areas) for more info. |

### Type
[MediaArea](/type/MediaArea.md)

### Related pages

#### [messages.botResults](/constructor/messages.botResults.md)
Result of a query to an inline bot

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
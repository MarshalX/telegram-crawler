# mediaAreaSuggestedReaction

Represents a reaction bubble.

```tl
mediaAreaSuggestedReaction#14455871 flags:# dark:flags.0?true flipped:flags.1?true coordinates:MediaAreaCoordinates reaction:Reaction = MediaArea;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the reaction bubble has a dark background. |
| **flipped** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the reaction bubble is mirrored (see [here »](/api/stories.md#reactions) for more info). |
| **coordinates** | [MediaAreaCoordinates](/type/MediaAreaCoordinates.md) | The coordinates of the media area corresponding to the reaction button. |
| **reaction** | [Reaction](/type/Reaction.md) | The reaction that should be sent when this area is clicked. |

### Type
[MediaArea](/type/MediaArea.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
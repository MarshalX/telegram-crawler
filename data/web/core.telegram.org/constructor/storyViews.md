# storyViews

Aggregated view and reaction information of a [story](/api/stories.md).

```tl
storyViews#8d595cd6 flags:# has_viewers:flags.1?true views_count:int forwards_count:flags.2?int reactions:flags.3?Vector<ReactionCount> reactions_count:flags.4?int recent_viewers:flags.0?Vector<long> = StoryViews;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_viewers** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, indicates that the viewers list is currently viewable, and was not yet deleted because the story has expired while the user didn't have a [Premium](/api/premium.md) account. |
| **views\_count** | [int](/type/int.md) | View counter of the story |
| **forwards\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Forward counter of the story |
| **reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[ReactionCount](/type/ReactionCount.md)&gt; | All reactions sent to this story |
| **reactions\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Number of reactions added to the story |
| **recent\_viewers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | User IDs of some recent viewers of the story |

### Type
[StoryViews](/type/StoryViews.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
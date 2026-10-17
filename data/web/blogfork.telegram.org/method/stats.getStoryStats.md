# stats.getStoryStats

Get [statistics](/api/stats.md) for a certain [story](/api/stories.md).

```tl
stats.storyStats#50cd067c views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.StoryStats;
---functions---
stats.getStoryStats#374fef40 flags:# dark:flags.0?true peer:InputPeer id:int = stats.StoryStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to enable the dark theme for graph colors |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer that posted the story |
| **id** | [int](/type/int.md) | Story ID |

### Result
[stats.StoryStats](/type/stats.StoryStats.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORIES\_NEVER\_CREATED | This peer hasn't ever posted any stories. |

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
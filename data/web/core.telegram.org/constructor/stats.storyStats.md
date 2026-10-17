# stats.storyStats

Contains [statistics](/api/stats.md) about a [story](/api/stories.md).

```tl
stats.storyStats#50cd067c views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.StoryStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **views\_graph** | [StatsGraph](/type/StatsGraph.md) | A graph containing the number of story views and shares |
| **reactions\_by\_emotion\_graph** | [StatsGraph](/type/StatsGraph.md) | A bar graph containing the number of story reactions categorized by "emotion" (i.e. Positive, Negative, Other, etc...) |

### Type
[stats.StoryStats](/type/stats.StoryStats.md)

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.
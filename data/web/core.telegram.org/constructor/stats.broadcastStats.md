# stats.broadcastStats

[Channel statistics](/api/stats.md).

```tl
stats.broadcastStats#396ca5fc period:StatsDateRangeDays followers:StatsAbsValueAndPrev views_per_post:StatsAbsValueAndPrev shares_per_post:StatsAbsValueAndPrev reactions_per_post:StatsAbsValueAndPrev views_per_story:StatsAbsValueAndPrev shares_per_story:StatsAbsValueAndPrev reactions_per_story:StatsAbsValueAndPrev enabled_notifications:StatsPercentValue growth_graph:StatsGraph followers_graph:StatsGraph mute_graph:StatsGraph top_hours_graph:StatsGraph interactions_graph:StatsGraph iv_interactions_graph:StatsGraph views_by_source_graph:StatsGraph new_followers_by_source_graph:StatsGraph languages_graph:StatsGraph reactions_by_emotion_graph:StatsGraph story_interactions_graph:StatsGraph story_reactions_by_emotion_graph:StatsGraph recent_posts_interactions:Vector<PostInteractionCounters> = stats.BroadcastStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **period** | [StatsDateRangeDays](/type/StatsDateRangeDays.md) | Period in consideration |
| **followers** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | Follower count change for period in consideration |
| **views\_per\_post** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | `total_viewcount/postcount`, for posts posted during the period in consideration. \
Note that in this case, `current` refers to the `period` in consideration (`min_date` till `max_date`), and `prev` refers to the previous period (`(min_date - (max_date - min_date))` till `min_date`). |
| **shares\_per\_post** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | `total_sharecount/postcount`, for posts posted during the period in consideration. \
Note that in this case, `current` refers to the `period` in consideration (`min_date` till `max_date`), and `prev` refers to the previous period (`(min_date - (max_date - min_date))` till `min_date`) |
| **reactions\_per\_post** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | `total_reactions/postcount`, for posts posted during the period in consideration. \
Note that in this case, `current` refers to the `period` in consideration (`min_date` till `max_date`), and `prev` refers to the previous period (`(min_date - (max_date - min_date))` till `min_date`) |
| **views\_per\_story** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | `total_views/storycount`, for posts posted during the period in consideration. \
Note that in this case, `current` refers to the `period` in consideration (`min_date` till `max_date`), and `prev` refers to the previous period (`(min_date - (max_date - min_date))` till `min_date`) |
| **shares\_per\_story** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | `total_shares/storycount`, for posts posted during the period in consideration. \
Note that in this case, `current` refers to the `period` in consideration (`min_date` till `max_date`), and `prev` refers to the previous period (`(min_date - (max_date - min_date))` till `min_date`) |
| **reactions\_per\_story** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | `total_reactions/storycount`, for posts posted during the period in consideration. \
Note that in this case, `current` refers to the `period` in consideration (`min_date` till `max_date`), and `prev` refers to the previous period (`(min_date - (max_date - min_date))` till `min_date`) |
| **enabled\_notifications** | [StatsPercentValue](/type/StatsPercentValue.md) | Percentage of subscribers with enabled notifications |
| **growth\_graph** | [StatsGraph](/type/StatsGraph.md) | Channel growth graph (absolute subscriber count) |
| **followers\_graph** | [StatsGraph](/type/StatsGraph.md) | Followers growth graph (relative subscriber count) |
| **mute\_graph** | [StatsGraph](/type/StatsGraph.md) | Muted users graph (relative) |
| **top\_hours\_graph** | [StatsGraph](/type/StatsGraph.md) | Views per hour graph (absolute) |
| **interactions\_graph** | [StatsGraph](/type/StatsGraph.md) | Interactions graph (absolute) |
| **iv\_interactions\_graph** | [StatsGraph](/type/StatsGraph.md) | IV interactions graph (absolute) |
| **views\_by\_source\_graph** | [StatsGraph](/type/StatsGraph.md) | Views by source graph (absolute) |
| **new\_followers\_by\_source\_graph** | [StatsGraph](/type/StatsGraph.md) | New followers by source graph (absolute) |
| **languages\_graph** | [StatsGraph](/type/StatsGraph.md) | Subscriber language graph (pie chart) |
| **reactions\_by\_emotion\_graph** | [StatsGraph](/type/StatsGraph.md) | A graph containing the number of reactions on posts categorized by emotion |
| **story\_interactions\_graph** | [StatsGraph](/type/StatsGraph.md) | A graph containing the number of story views and shares |
| **story\_reactions\_by\_emotion\_graph** | [StatsGraph](/type/StatsGraph.md) | A graph containing the number of reactions on stories categorized by emotion |
| **recent\_posts\_interactions** | [Vector](/type/Vector%20t)&lt;[PostInteractionCounters](/type/PostInteractionCounters.md)&gt; | Detailed statistics about number of views and shares of recently sent messages and stories |

### Type
[stats.BroadcastStats](/type/stats.BroadcastStats.md)

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.
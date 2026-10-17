# stats.megagroupStats

Supergroup [statistics](/api/stats.md)

```tl
stats.megagroupStats#ef7ff916 period:StatsDateRangeDays members:StatsAbsValueAndPrev messages:StatsAbsValueAndPrev viewers:StatsAbsValueAndPrev posters:StatsAbsValueAndPrev growth_graph:StatsGraph members_graph:StatsGraph new_members_by_source_graph:StatsGraph languages_graph:StatsGraph messages_graph:StatsGraph actions_graph:StatsGraph top_hours_graph:StatsGraph weekdays_graph:StatsGraph top_posters:Vector<StatsGroupTopPoster> top_admins:Vector<StatsGroupTopAdmin> top_inviters:Vector<StatsGroupTopInviter> users:Vector<User> = stats.MegagroupStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **period** | [StatsDateRangeDays](/type/StatsDateRangeDays.md) | Period in consideration |
| **members** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | Member count change for period in consideration |
| **messages** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | Message number change for period in consideration |
| **viewers** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | Number of users that viewed messages, for range in consideration |
| **posters** | [StatsAbsValueAndPrev](/type/StatsAbsValueAndPrev.md) | Number of users that posted messages, for range in consideration |
| **growth\_graph** | [StatsGraph](/type/StatsGraph.md) | Supergroup growth graph (absolute subscriber count) |
| **members\_graph** | [StatsGraph](/type/StatsGraph.md) | Members growth (relative subscriber count) |
| **new\_members\_by\_source\_graph** | [StatsGraph](/type/StatsGraph.md) | New members by source graph |
| **languages\_graph** | [StatsGraph](/type/StatsGraph.md) | Subscriber language graph (pie chart) |
| **messages\_graph** | [StatsGraph](/type/StatsGraph.md) | Message activity graph (stacked bar graph, message type) |
| **actions\_graph** | [StatsGraph](/type/StatsGraph.md) | Group activity graph (deleted, modified messages, blocked users) |
| **top\_hours\_graph** | [StatsGraph](/type/StatsGraph.md) | Activity per hour graph (absolute) |
| **weekdays\_graph** | [StatsGraph](/type/StatsGraph.md) | Activity per day of week graph (absolute) |
| **top\_posters** | [Vector](/type/Vector%20t)&lt;[StatsGroupTopPoster](/type/StatsGroupTopPoster.md)&gt; | Info about most active group members |
| **top\_admins** | [Vector](/type/Vector%20t)&lt;[StatsGroupTopAdmin](/type/StatsGroupTopAdmin.md)&gt; | Info about most active group admins |
| **top\_inviters** | [Vector](/type/Vector%20t)&lt;[StatsGroupTopInviter](/type/StatsGroupTopInviter.md)&gt; | Info about most active group inviters |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Info about users mentioned in statistics |

### Type
[stats.MegagroupStats](/type/stats.MegagroupStats.md)

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.
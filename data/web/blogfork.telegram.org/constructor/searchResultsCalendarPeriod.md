# searchResultsCalendarPeriod

Information about found messages sent on a specific day, used to split the `messages` in [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md) constructors by days.

Multiple searchResultsCalendarPeriod constructors are returned in [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md), each containing information about the first, last and total number of messages matching the filter that were sent on a specific day.

```tl
searchResultsCalendarPeriod#c9b0539f date:int min_msg_id:int max_msg_id:int count:int = SearchResultsCalendarPeriod;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **date** | [int](/type/int.md) | The day this object is referring to. |
| **min\_msg\_id** | [int](/type/int.md) | First message ID that was sent on this day. |
| **max\_msg\_id** | [int](/type/int.md) | Last message ID that was sent on this day. |
| **count** | [int](/type/int.md) | All messages that were sent on this day. |

### Type
[SearchResultsCalendarPeriod](/type/SearchResultsCalendarPeriod.md)

### Related pages

#### [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md)
Information about found messages sent on a specific day
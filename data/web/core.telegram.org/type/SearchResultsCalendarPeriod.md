# SearchResultsCalendarPeriod

Information about found messages sent on a specific day, used to split the `messages` in [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md) constructors by days.

```tl
searchResultsCalendarPeriod#c9b0539f date:int min_msg_id:int max_msg_id:int count:int = SearchResultsCalendarPeriod;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [searchResultsCalendarPeriod](/constructor/searchResultsCalendarPeriod.md) | Information about found messages sent on a specific day, used to split the `messages` in [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md) constructors by days.\
\
Multiple searchResultsCalendarPeriod constructors are returned in [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md), each containing information about the first, last and total number of messages matching the filter that were sent on a specific day. |

### Related pages

#### [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md)
Information about found messages sent on a specific day
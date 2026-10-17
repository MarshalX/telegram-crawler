# messages.SearchResultsCalendar

Information about found messages sent on a specific day

```tl
messages.searchResultsCalendar#147ee23c flags:# inexact:flags.0?true count:int min_date:int min_msg_id:int offset_id_offset:flags.1?int periods:Vector<SearchResultsCalendarPeriod> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SearchResultsCalendar;

---functions---

messages.getSearchResultsCalendar#6aa3f6bd flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int offset_date:int = messages.SearchResultsCalendar;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md) | Information about found messages sent on a specific day |

### Methods

| Method | Description |
| --- | --- |
| [messages.getSearchResultsCalendar](/method/messages.getSearchResultsCalendar.md) | Returns information about the next messages of the specified type in the chat split by days.\
\
Returns the results in reverse chronological order.  \
Can return partial results for the last returned day. |
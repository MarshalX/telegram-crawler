# messages.searchResultsCalendar

Information about found messages sent on a specific day

```tl
messages.searchResultsCalendar#147ee23c flags:# inexact:flags.0?true count:int min_date:int min_msg_id:int offset_id_offset:flags.1?int periods:Vector<SearchResultsCalendarPeriod> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SearchResultsCalendar;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inexact** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, indicates that the results may be inexact |
| **count** | [int](/type/int.md) | Total number of results matching query |
| **min\_date** | [int](/type/int.md) | Starting timestamp of attached messages |
| **min\_msg\_id** | [int](/type/int.md) | Ending timestamp of attached messages |
| **offset\_id\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Indicates the absolute position of `messages[0]` within the total result set with count `count`. \
This is useful, for example, if we need to display a `progress/total` counter (like `photo 134 of 200`, for all media in a chat, we could simply use `photo ${offset_id_offset} of ${count}`. |
| **periods** | [Vector](/type/Vector%20t)&lt;[SearchResultsCalendarPeriod](/type/SearchResultsCalendarPeriod.md)&gt; | Used to split the `messages` by days: multiple [SearchResultsCalendarPeriod](/type/SearchResultsCalendarPeriod.md) constructors are returned, each containing information about the first, last and total number of messages matching the filter that were sent on a specific day.  \
This information can be easily used to split the returned `messages` by day. |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | Messages |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[messages.SearchResultsCalendar](/type/messages.SearchResultsCalendar.md)

### Related pages

#### [SearchResultsCalendarPeriod](/type/SearchResultsCalendarPeriod.md)
Information about found messages sent on a specific day, used to split the `messages` in [messages.searchResultsCalendar](/constructor/messages.searchResultsCalendar.md) constructors by days.
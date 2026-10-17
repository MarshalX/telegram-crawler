# messages.getSearchResultsCalendar

Returns information about the next messages of the specified type in the chat split by days.

Returns the results in reverse chronological order.  
Can return partial results for the last returned day.

```tl
messages.searchResultsCalendar#147ee23c flags:# inexact:flags.0?true count:int min_date:int min_msg_id:int offset_id_offset:flags.1?int periods:Vector<SearchResultsCalendarPeriod> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SearchResultsCalendar;
---functions---
messages.getSearchResultsCalendar#6aa3f6bd flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int offset_date:int = messages.SearchResultsCalendar;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where to search |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPeer](/type/InputPeer.md) | Search within the [saved message dialog »](/api/saved-messages.md) with this ID. |
| **filter** | [MessagesFilter](/type/MessagesFilter.md) | Message filter, [inputMessagesFilterEmpty](/constructor/inputMessagesFilterEmpty.md), [inputMessagesFilterMyMentions](/constructor/inputMessagesFilterMyMentions.md) filters are not supported by this method. |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |

### Result
[messages.SearchResultsCalendar](/type/messages.SearchResultsCalendar.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [inputMessagesFilterEmpty](/constructor/inputMessagesFilterEmpty.md)
Filter is absent.

#### [inputMessagesFilterMyMentions](/constructor/inputMessagesFilterMyMentions.md)
Return only messages where the current user was [mentioned](/api/mentions.md).

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
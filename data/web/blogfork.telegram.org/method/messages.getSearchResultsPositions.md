# messages.getSearchResultsPositions

Returns sparse positions of messages of the specified type in the chat to be used for shared media scroll implementation.

Returns the results in reverse chronological order (i.e., in order of decreasing message\_id).

```tl
messages.searchResultsPositions#53b22baf count:int positions:Vector<SearchResultsPosition> = messages.SearchResultsPositions;
---functions---
messages.getSearchResultsPositions#9c7f2f10 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int limit:int = messages.SearchResultsPositions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where to search |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPeer](/type/InputPeer.md) | Search within the [saved message dialog »](/api/saved-messages.md) with this ID. |
| **filter** | [MessagesFilter](/type/MessagesFilter.md) | Message filter, [inputMessagesFilterEmpty](/constructor/inputMessagesFilterEmpty.md), [inputMessagesFilterMyMentions](/constructor/inputMessagesFilterMyMentions.md) filters are not supported by this method. |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[messages.SearchResultsPositions](/type/messages.SearchResultsPositions.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
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
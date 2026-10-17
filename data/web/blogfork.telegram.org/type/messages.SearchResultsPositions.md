# messages.SearchResultsPositions

Information about sparse positions of messages

```tl
messages.searchResultsPositions#53b22baf count:int positions:Vector<SearchResultsPosition> = messages.SearchResultsPositions;

---functions---

messages.getSearchResultsPositions#9c7f2f10 flags:# peer:InputPeer saved_peer_id:flags.2?InputPeer filter:MessagesFilter offset_id:int limit:int = messages.SearchResultsPositions;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.searchResultsPositions](/constructor/messages.searchResultsPositions.md) | Information about sparse positions of messages |

### Methods

| Method | Description |
| --- | --- |
| [messages.getSearchResultsPositions](/method/messages.getSearchResultsPositions.md) | Returns sparse positions of messages of the specified type in the chat to be used for shared media scroll implementation.\
\
Returns the results in reverse chronological order (i.e., in order of decreasing message\_id). |
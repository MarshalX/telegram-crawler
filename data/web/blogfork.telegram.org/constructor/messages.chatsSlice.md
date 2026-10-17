# messages.chatsSlice

Partial list of chats, more would have to be fetched with [pagination](/api/offsets.md)

```tl
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Total number of results that were found server-side (not all are included in `chats`) |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats |

### Type
[messages.Chats](/type/messages.Chats.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
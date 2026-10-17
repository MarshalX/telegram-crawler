# chatlists.getLeaveChatlistSuggestions

Returns identifiers of pinned or always included chats from a chat folder imported using a [chat folder deep link »](/api/links.md#chat-folder-links), which are suggested to be left when the chat folder is deleted.

```tl
---functions---
chatlists.getLeaveChatlistSuggestions#fdbcd714 chatlist:InputChatlist = Vector<Peer>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | Folder ID |

### Result
[Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
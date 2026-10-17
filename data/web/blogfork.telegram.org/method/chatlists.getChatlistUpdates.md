# chatlists.getChatlistUpdates

Fetch new chats associated with an imported [chat folder deep link »](/api/links.md#chat-folder-links). Must be invoked at most every `chatlist_update_period` seconds (as per the related [client configuration parameter »](/api/config.md#chatlist-update-period)).

```tl
chatlists.chatlistUpdates#93bd878d missing_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistUpdates;
---functions---
chatlists.getChatlistUpdates#89419521 chatlist:InputChatlist = chatlists.ChatlistUpdates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | The folder |

### Result
[chatlists.ChatlistUpdates](/type/chatlists.ChatlistUpdates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |
| 400 | INPUT\_CHATLIST\_INVALID | The specified folder is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
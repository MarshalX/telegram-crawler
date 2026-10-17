# chatlists.ChatlistUpdates

Updated info about a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.chatlistUpdates#93bd878d missing_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistUpdates;

---functions---

chatlists.getChatlistUpdates#89419521 chatlist:InputChatlist = chatlists.ChatlistUpdates;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatlists.chatlistUpdates](/constructor/chatlists.chatlistUpdates.md) | Updated information about a [chat folder deep link »](/api/links.md#chat-folder-links). |

### Methods

| Method | Description |
| --- | --- |
| [chatlists.getChatlistUpdates](/method/chatlists.getChatlistUpdates.md) | Fetch new chats associated with an imported [chat folder deep link »](/api/links.md#chat-folder-links). Must be invoked at most every `chatlist_update_period` seconds (as per the related [client configuration parameter »](/api/config.md#chatlist-update-period)). |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
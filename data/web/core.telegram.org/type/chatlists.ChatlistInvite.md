# chatlists.ChatlistInvite

Info about a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.chatlistInviteAlready#fa87f659 filter_id:int missing_peers:Vector<Peer> already_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
chatlists.chatlistInvite#f10ece2f flags:# title_noanimate:flags.1?true title:TextWithEntities emoticon:flags.0?string peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;

---functions---

chatlists.checkChatlistInvite#41c10fff slug:string = chatlists.ChatlistInvite;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatlists.chatlistInviteAlready](/constructor/chatlists.chatlistInviteAlready.md) | Updated info about a [chat folder deep link »](/api/links.md#chat-folder-links) we already imported. |
| [chatlists.chatlistInvite](/constructor/chatlists.chatlistInvite.md) | Info about a [chat folder deep link »](/api/links.md#chat-folder-links). |

### Methods

| Method | Description |
| --- | --- |
| [chatlists.checkChatlistInvite](/method/chatlists.checkChatlistInvite.md) | Obtain information about a [chat folder deep link »](/api/links.md#chat-folder-links). |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
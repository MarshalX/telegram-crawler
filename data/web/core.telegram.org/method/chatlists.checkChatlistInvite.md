# chatlists.checkChatlistInvite

Obtain information about a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.chatlistInviteAlready#fa87f659 filter_id:int missing_peers:Vector<Peer> already_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
chatlists.chatlistInvite#f10ece2f flags:# title_noanimate:flags.1?true title:TextWithEntities emoticon:flags.0?string peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
---functions---
chatlists.checkChatlistInvite#41c10fff slug:string = chatlists.ChatlistInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | `slug` obtained from the [chat folder deep link »](/api/links.md#chat-folder-links) |

### Result
[chatlists.ChatlistInvite](/type/chatlists.ChatlistInvite.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | INVITE\_SLUG\_EMPTY | The specified invite slug is empty. |
| 400 | INVITE\_SLUG\_EXPIRED | The specified chat folder link has expired. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
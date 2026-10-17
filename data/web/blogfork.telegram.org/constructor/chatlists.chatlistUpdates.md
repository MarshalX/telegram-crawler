# chatlists.chatlistUpdates

Updated information about a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.chatlistUpdates#93bd878d missing_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistUpdates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **missing\_peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | New peers to join |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Related chat information |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Related user information |

### Type
[chatlists.ChatlistUpdates](/type/chatlists.ChatlistUpdates.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
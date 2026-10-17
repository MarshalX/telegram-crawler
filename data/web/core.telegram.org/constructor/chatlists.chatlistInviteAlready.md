# chatlists.chatlistInviteAlready

Updated info about a [chat folder deep link »](/api/links.md#chat-folder-links) we already imported.

```tl
chatlists.chatlistInviteAlready#fa87f659 filter_id:int missing_peers:Vector<Peer> already_peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **filter\_id** | [int](/type/int.md) | ID of the imported folder |
| **missing\_peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | New peers to be imported |
| **already\_peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | Peers that were already imported |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Related chat information |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Related user information |

### Type
[chatlists.ChatlistInvite](/type/chatlists.ChatlistInvite.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
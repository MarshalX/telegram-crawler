# chatlists.exportedInvites

Info about multiple [chat folder deep links »](/api/links.md#chat-folder-links).

```tl
chatlists.exportedInvites#10ab6dc7 invites:Vector<ExportedChatlistInvite> chats:Vector<Chat> users:Vector<User> = chatlists.ExportedInvites;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **invites** | [Vector](/type/Vector%20t)&lt;[ExportedChatlistInvite](/type/ExportedChatlistInvite.md)&gt; | The [chat folder deep links »](/api/links.md#chat-folder-links). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Related chat information |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Related user information |

### Type
[chatlists.ExportedInvites](/type/chatlists.ExportedInvites.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
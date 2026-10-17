# chatlists.chatlistInvite

Info about a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
chatlists.chatlistInvite#f10ece2f flags:# title_noanimate:flags.1?true title:TextWithEntities emoticon:flags.0?string peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = chatlists.ChatlistInvite;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title\_noanimate** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, any animated emojis present in `title` should not be animated and should be instead frozen on the first frame. |
| **title** | [TextWithEntities](/type/TextWithEntities.md) | Name of the link |
| **emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Emoji to use as icon for the folder. |
| **peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | Supergroups and channels to join |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Related chat information |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Related user information |

### Type
[chatlists.ChatlistInvite](/type/chatlists.ChatlistInvite.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
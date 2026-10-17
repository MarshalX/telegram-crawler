# Contacts.TopPeers

Top peers

```tl
contacts.topPeersNotModified#de266ef5 = contacts.TopPeers;
contacts.topPeers#70b772a8 categories:Vector<TopPeerCategoryPeers> chats:Vector<Chat> users:Vector<User> = contacts.TopPeers;
contacts.topPeersDisabled#b52c939d = contacts.TopPeers;

---functions---

contacts.getTopPeers#973478b6 flags:# correspondents:flags.0?true bots_pm:flags.1?true bots_inline:flags.2?true phone_calls:flags.3?true forward_users:flags.4?true forward_chats:flags.5?true groups:flags.10?true channels:flags.15?true bots_app:flags.16?true bots_guestchat:flags.17?true offset:int limit:int hash:long = contacts.TopPeers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [contacts.topPeersNotModified](/constructor/contacts.topPeersNotModified.md) | Top peer info hasn't changed |
| [contacts.topPeers](/constructor/contacts.topPeers.md) | Top peers |
| [contacts.topPeersDisabled](/constructor/contacts.topPeersDisabled.md) | Top peers disabled |

### Methods

| Method | Description |
| --- | --- |
| [contacts.getTopPeers](/method/contacts.getTopPeers.md) | Get most used peers |
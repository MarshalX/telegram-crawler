# contacts.Blocked

Info on users from the current user's black list.

```tl
contacts.blocked#ade1591 blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;
contacts.blockedSlice#e1664194 count:int blocked:Vector<PeerBlocked> chats:Vector<Chat> users:Vector<User> = contacts.Blocked;

---functions---

contacts.getBlocked#9a868f80 flags:# my_stories_from:flags.0?true offset:int limit:int = contacts.Blocked;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [contacts.blocked](/constructor/contacts.blocked.md) | Full list of blocked users. |
| [contacts.blockedSlice](/constructor/contacts.blockedSlice.md) | Incomplete list of blocked users. |

### Methods

| Method | Description |
| --- | --- |
| [contacts.getBlocked](/method/contacts.getBlocked.md) | Returns the list of blocked users. |
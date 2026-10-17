# Contacts.ResolvedPeer

Peer returned after resolving a `@username`

```tl
contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;

---functions---

contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;
contacts.resolvePhone#8af94344 phone:string = contacts.ResolvedPeer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [contacts.resolvedPeer](/constructor/contacts.resolvedPeer.md) | Resolved peer |

### Methods

| Method | Description |
| --- | --- |
| [contacts.resolveUsername](/method/contacts.resolveUsername.md) | Resolve a @username to get peer info |
| [contacts.resolvePhone](/method/contacts.resolvePhone.md) | Resolve a phone number to get user info, if their privacy settings allow it.\
\
Make sure to implement client-side ratelimiting/debounce for this method, allowing at most 1 call every 3 seconds. |
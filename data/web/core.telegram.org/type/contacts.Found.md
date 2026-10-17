# contacts.Found

Object contains info on users found by name substring and auxiliary data.

```tl
contacts.found#b3134d9d my_results:Vector<Peer> results:Vector<Peer> chats:Vector<Chat> users:Vector<User> = contacts.Found;

---functions---

contacts.search#11f812d8 q:string limit:int = contacts.Found;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [contacts.found](/constructor/contacts.found.md) | Users found by name substring and auxiliary data. |

### Methods

| Method | Description |
| --- | --- |
| [contacts.search](/method/contacts.search.md) | Returns users found by username substring. |
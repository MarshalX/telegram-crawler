# users.UserFull

Full user information, with attached context peers for reactions

```tl
users.userFull#3b6d152e full_user:UserFull chats:Vector<Chat> users:Vector<User> = users.UserFull;

---functions---

users.getFullUser#b60f5918 id:InputUser = users.UserFull;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [users.userFull](/constructor/users.userFull.md) | Full user information |

### Methods

| Method | Description |
| --- | --- |
| [users.getFullUser](/method/users.getFullUser.md) | Returns extended user info by ID. |
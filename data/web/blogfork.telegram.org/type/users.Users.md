# users.Users

Describes a list of users (or bots).

```tl
users.users#62d706b8 users:Vector<User> = users.Users;
users.usersSlice#315a4974 count:int users:Vector<User> = users.Users;

---functions---

bots.getBotRecommendations#a1b70815 bot:InputUser = users.Users;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [users.users](/constructor/users.users.md) | Describes a list of users (or bots). |
| [users.usersSlice](/constructor/users.usersSlice.md) | Describes a partial list of users. |

### Methods

| Method | Description |
| --- | --- |
| [bots.getBotRecommendations](/method/bots.getBotRecommendations.md) | Obtain a list of similarly themed bots, selected based on similarities in their subscriber bases, see [here »](/api/recommend.md) for more info. |
# bots.getBotRecommendations

Obtain a list of similarly themed bots, selected based on similarities in their subscriber bases, see [here »](/api/recommend.md) for more info.

```tl
users.users#62d706b8 users:Vector<User> = users.Users;
users.usersSlice#315a4974 count:int users:Vector<User> = users.Users;
---functions---
bots.getBotRecommendations#a1b70815 bot:InputUser = users.Users;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The method will return bots related to the passed bot. |

### Result
[users.Users](/type/users.Users.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Similar channels and bots](/api/recommend.md)
The API offers a method to obtain a list of similarly themed public channels and bots, selected based on similarities in their subscriber bases.
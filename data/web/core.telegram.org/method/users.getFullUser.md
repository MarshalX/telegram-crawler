# users.getFullUser

Returns extended user info by ID.

```tl
users.userFull#3b6d152e full_user:UserFull chats:Vector<Chat> users:Vector<User> = users.UserFull;
---functions---
users.getFullUser#b60f5918 id:InputUser = users.UserFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputUser](/type/InputUser.md) | User ID |

### Result
[users.UserFull](/type/users.UserFull.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | USERNAME\_OCCUPIED | The provided username is already occupied. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
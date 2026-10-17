# help.getUserInfo

Can only be used by TSF members to obtain internal information.

```tl
help.userInfoEmpty#f3ae2eed = help.UserInfo;
help.userInfo#1eb3758 message:string entities:Vector<MessageEntity> author:string date:int = help.UserInfo;
---functions---
help.getUserInfo#38a08d3 user_id:InputUser = help.UserInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID |

### Result
[help.UserInfo](/type/help.UserInfo.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | USER\_INVALID | Invalid user provided. |
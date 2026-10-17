# Help.UserInfo

User info

```tl
help.userInfoEmpty#f3ae2eed = help.UserInfo;
help.userInfo#1eb3758 message:string entities:Vector<MessageEntity> author:string date:int = help.UserInfo;

---functions---

help.getUserInfo#38a08d3 user_id:InputUser = help.UserInfo;
help.editUserInfo#66b91b70 user_id:InputUser message:string entities:Vector<MessageEntity> = help.UserInfo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [help.userInfoEmpty](/constructor/help.userInfoEmpty.md) | Internal use |
| [help.userInfo](/constructor/help.userInfo.md) | Internal use |

### Methods

| Method | Description |
| --- | --- |
| [help.getUserInfo](/method/help.getUserInfo.md) | Can only be used by TSF members to obtain internal information. |
| [help.editUserInfo](/method/help.editUserInfo.md) | Internal use |
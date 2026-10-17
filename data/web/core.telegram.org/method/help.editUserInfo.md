# help.editUserInfo

Internal use

```tl
help.userInfoEmpty#f3ae2eed = help.UserInfo;
help.userInfo#1eb3758 message:string entities:Vector<MessageEntity> author:string date:int = help.UserInfo;
---functions---
help.editUserInfo#66b91b70 user_id:InputUser message:string entities:Vector<MessageEntity> = help.UserInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User |
| **message** | [string](/type/string.md) | Message |
| **entities** | [Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |

### Result
[help.UserInfo](/type/help.UserInfo.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 403 | USER\_INVALID | Invalid user provided. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
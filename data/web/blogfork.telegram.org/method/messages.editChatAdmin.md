# messages.editChatAdmin

Make a user admin in a [basic group](/api/channel.md#basic-groups).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.editChatAdmin#a85bd1c2 chat_id:long user_id:InputUser is_admin:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | The ID of the group |
| **user\_id** | [InputUser](/type/InputUser.md) | The user to make admin |
| **is\_admin** | [Bool](/type/Bool.md) | Whether to make them admin |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_NOT\_PARTICIPANT | You're not a member of this supergroup/channel. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
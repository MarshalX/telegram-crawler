# bots.setBotGroupDefaultAdminRights

Set the default [suggested admin rights](/api/rights.md#suggested-bot-rights) for bots being added as admins to groups, see [here for more info on how to handle them »](/api/rights.md#suggested-bot-rights).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.setBotGroupDefaultAdminRights#925ec9ea admin_rights:ChatAdminRights = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **admin\_rights** | [ChatAdminRights](/type/ChatAdminRights.md) | Admin rights |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | RIGHTS\_NOT\_MODIFIED | The new admin rights are equal to the old rights, no change was made. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.
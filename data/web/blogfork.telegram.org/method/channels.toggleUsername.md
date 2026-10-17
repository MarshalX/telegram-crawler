# channels.toggleUsername

Activate or deactivate a purchased [fragment.com](https://fragment.com) username associated to a [supergroup or channel](/api/channel.md) we own.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.toggleUsername#50f24105 channel:InputChannel username:string active:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | [Supergroup or channel](/api/channel.md) |
| **username** | [string](/type/string.md) | Username |
| **active** | [Bool](/type/Bool.md) | Whether to activate or deactivate the username |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | USERNAMES\_ACTIVE\_TOO\_MUCH | The maximum number of active usernames was reached. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_NOT\_MODIFIED | The username was not modified. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
# channels.updateUsername

Change or remove the username of a supergroup/channel

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.updateUsername#3514b3de channel:InputChannel username:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel |
| **username** | [string](/type/string.md) | New username, pass an empty string to remove the username |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNELS\_ADMIN\_PUBLIC\_TOO\_MUCH | You're admin of too many public channels, make some channels private to change the username of this channel. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_NOT\_MODIFIED | The username was not modified. |
| 400 | USERNAME\_OCCUPIED | The provided username is already occupied. |
| 400 | USERNAME\_PURCHASE\_AVAILABLE | The specified username can be purchased on https://fragment.com. |
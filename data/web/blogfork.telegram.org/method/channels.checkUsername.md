# channels.checkUsername

Check if a username is free and can be assigned to a channel/supergroup

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.checkUsername#10e6bd2c channel:InputChannel username:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The [channel/supergroup](/api/channel.md) that will assigned the specified username |
| **username** | [string](/type/string.md) | The username to check |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNELS\_ADMIN\_PUBLIC\_TOO\_MUCH | You're admin of too many public channels, make some channels private to change the username of this channel. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_OCCUPIED | The provided username is already occupied. |
| 400 | USERNAME\_PURCHASE\_AVAILABLE | The specified username can be purchased on https://fragment.com. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
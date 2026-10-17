# channels.deleteMessages

Delete messages in a [channel/supergroup](/api/channel.md)

```tl
messages.affectedMessages#84d19185 pts:int pts_count:int = messages.AffectedMessages;
---functions---
channels.deleteMessages#84c1fd4e channel:InputChannel id:Vector<int> = messages.AffectedMessages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | [Channel/supergroup](/api/channel.md) |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of messages to delete |

### Result
[messages.AffectedMessages](/type/messages.AffectedMessages.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 420 | FROZEN\_METHOD\_INVALID | The current account is [frozen](/api/auth.md#frozen-accounts), and thus cannot execute the specified action. |
| 403 | MESSAGE\_DELETE\_FORBIDDEN | You can't delete one of the messages you tried to delete, most likely because it is a service message. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
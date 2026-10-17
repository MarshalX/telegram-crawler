# users.getUsers

Returns basic user info according to their identifiers.

```tl
---functions---
users.getUsers#d91a548 id:Vector<InputUser> = Vector<User>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | List of user identifiers |

### Result
[Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt;

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | FROM\_MESSAGE\_BOT\_DISABLED | Bots can't use fromMessage min constructors. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
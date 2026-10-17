# botCommandScopePeerUser

The specified bot commands will be valid only for a specific user in the specified [group or supergroup](/api/channel.md).

```tl
botCommandScopePeerUser#a1321f3 peer:InputPeer user_id:InputUser = BotCommandScope;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The chat |
| **user\_id** | [InputUser](/type/InputUser.md) | The user |

### Type
[BotCommandScope](/type/BotCommandScope.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
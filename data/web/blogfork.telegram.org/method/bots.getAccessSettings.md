# bots.getAccessSettings

Get the [access restriction settings »](/api/bots/managed-bots.md#managing-a-managed-bot) of a managed bot; can only be called by the manager bot.

```tl
bots.accessSettings#dd1fbf93 flags:# restricted:flags.0?true add_users:flags.1?Vector<User> = bots.AccessSettings;
---functions---
bots.getAccessSettings#213853a3 bot:InputUser = bots.AccessSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The managed bot whose access settings to retrieve |

### Result
[bots.AccessSettings](/type/bots.AccessSettings.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).
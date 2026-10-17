# bots.getBotMenuButton

Gets the menu button action for a given user or for all users, previously set using [bots.setBotMenuButton](/method/bots.setBotMenuButton.md); users can see this information in the [botInfo](/constructor/botInfo.md) constructor.

```tl
botMenuButtonDefault#7533a588 = BotMenuButton;
botMenuButtonCommands#4258c205 = BotMenuButton;
botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;
---functions---
bots.getBotMenuButton#9c60eb28 user_id:InputUser = BotMenuButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID or empty for the default menu button. |

### Result
[BotMenuButton](/type/BotMenuButton.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [bots.setBotMenuButton](/method/bots.setBotMenuButton.md)
Sets the [menu button action »](/api/bots/menu.md) for a given user or for all users

#### [botInfo](/constructor/botInfo.md)
Info about bots (available bot commands, etc)
# updateBotCommands

The [command set](/api/bots/commands.md) of a certain bot in a certain chat has changed.

```tl
updateBotCommands#4d712f2e peer:Peer bot_id:long commands:Vector<BotCommand> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | The affected chat |
| **bot\_id** | [long](/type/long.md) | ID of the bot that changed its command set |
| **commands** | [Vector](/type/Vector%20t)&lt;[BotCommand](/type/BotCommand.md)&gt; | New bot commands |

### Type
[Update](/type/Update.md)

### Related pages

#### [Bot commands](/api/bots/commands.md)
Bots offer a set of commands that can be used by users in private, or in a chat.
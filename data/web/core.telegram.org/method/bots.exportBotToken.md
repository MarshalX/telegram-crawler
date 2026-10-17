# bots.exportBotToken

Export the bot token of a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot); can only be called by the manager bot.

```tl
bots.exportedBotToken#3c60b621 token:string = bots.ExportedBotToken;
---functions---
bots.exportBotToken#bd0d99eb bot:InputUser revoke:Bool = bots.ExportedBotToken;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The managed bot to export the token for |
| **revoke** | [Bool](/type/Bool.md) | If [boolTrue](/constructor/boolTrue.md), revoke the current token and generate a new one |

### Result
[bots.ExportedBotToken](/type/bots.ExportedBotToken.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [boolTrue](/constructor/boolTrue.md)
The constructor can be interpreted as a **boolean**`true` value.

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).
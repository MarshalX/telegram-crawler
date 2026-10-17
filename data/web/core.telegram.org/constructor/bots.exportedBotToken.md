# bots.exportedBotToken

The bot token of a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot), exported by the manager bot.

```tl
bots.exportedBotToken#3c60b621 token:string = bots.ExportedBotToken;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **token** | [string](/type/string.md) | The bot token of the managed bot |

### Type
[bots.ExportedBotToken](/type/bots.ExportedBotToken.md)

### Related pages

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).
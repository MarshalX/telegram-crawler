# Bots.ExportedBotToken

The bot token of a managed bot, exported by the manager bot.

```tl
bots.exportedBotToken#3c60b621 token:string = bots.ExportedBotToken;

---functions---

bots.exportBotToken#bd0d99eb bot:InputUser revoke:Bool = bots.ExportedBotToken;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [bots.exportedBotToken](/constructor/bots.exportedBotToken.md) | The bot token of a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot), exported by the manager bot. |

### Methods

| Method | Description |
| --- | --- |
| [bots.exportBotToken](/method/bots.exportBotToken.md) | Export the bot token of a [managed bot »](/api/bots/managed-bots.md#managing-a-managed-bot); can only be called by the manager bot. |
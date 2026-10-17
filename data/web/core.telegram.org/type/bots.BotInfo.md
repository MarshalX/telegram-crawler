# bots.BotInfo

Localized name, about text and description of a bot.

```tl
bots.botInfo#e8a775b0 name:string about:string description:string = bots.BotInfo;

---functions---

bots.getBotInfo#dcd914fd flags:# bot:flags.0?InputUser lang_code:string = bots.BotInfo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [bots.botInfo](/constructor/bots.botInfo.md) | Localized information about a bot. |

### Methods

| Method | Description |
| --- | --- |
| [bots.getBotInfo](/method/bots.getBotInfo.md) | Get localized name, about text and description of a bot (or of the current account, if called by a bot). |
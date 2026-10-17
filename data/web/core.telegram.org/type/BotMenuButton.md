# BotMenuButton

Indicates the action to execute when pressing the in-UI menu button for bots

```tl
botMenuButtonDefault#7533a588 = BotMenuButton;
botMenuButtonCommands#4258c205 = BotMenuButton;
botMenuButton#c7b57ce6 text:string url:string = BotMenuButton;

---functions---

bots.getBotMenuButton#9c60eb28 user_id:InputUser = BotMenuButton;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [botMenuButtonDefault](/constructor/botMenuButtonDefault.md) | Placeholder [bot menu button](/api/bots/menu.md) never returned to users: see [the docs for more info](/api/bots/menu.md). |
| [botMenuButtonCommands](/constructor/botMenuButtonCommands.md) | [Bot menu button](/api/bots/menu.md) that opens the bot command list when clicked. |
| [botMenuButton](/constructor/botMenuButton.md) | [Bot menu button](/api/bots/menu.md) that opens a [web app](/api/bots/webapps.md) when clicked. |

### Methods

| Method | Description |
| --- | --- |
| [bots.getBotMenuButton](/method/bots.getBotMenuButton.md) | Gets the menu button action for a given user or for all users, previously set using [bots.setBotMenuButton](/method/bots.setBotMenuButton.md); users can see this information in the [botInfo](/constructor/botInfo.md) constructor. |
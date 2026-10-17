# inputGameShortName

Game by short name

```tl
inputGameShortName#c331e80a bot_id:InputUser short_name:string = InputGame;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot\_id** | [InputUser](/type/InputUser.md) | The bot that provides the game |
| **short\_name** | [string](/type/string.md) | The game's short name, usually obtained from a [game link »](/api/links.md#game-links) |

### Type
[InputGame](/type/InputGame.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
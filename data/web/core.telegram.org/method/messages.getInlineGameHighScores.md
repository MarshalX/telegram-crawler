# messages.getInlineGameHighScores

Get highscores of a game sent using an inline bot

```tl
messages.highScores#9a3bfd99 scores:Vector<HighScore> users:Vector<User> = messages.HighScores;
---functions---
messages.getInlineGameHighScores#f635e1b id:InputBotInlineMessageID user_id:InputUser = messages.HighScores;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputBotInlineMessageID](/type/InputBotInlineMessageID.md) | ID of inline message |
| **user\_id** | [InputUser](/type/InputUser.md) | Get high scores of a certain user |

### Result
[messages.HighScores](/type/messages.HighScores.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
# messages.getGameHighScores

Get highscores of a game

```tl
messages.highScores#9a3bfd99 scores:Vector<HighScore> users:Vector<User> = messages.HighScores;
---functions---
messages.getGameHighScores#e822649d peer:InputPeer id:int user_id:InputUser = messages.HighScores;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Where was the game sent |
| **id** | [int](/type/int.md) | ID of message with game media attachment |
| **user\_id** | [InputUser](/type/InputUser.md) | Get high scores made by a certain user |

### Result
[messages.HighScores](/type/messages.HighScores.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
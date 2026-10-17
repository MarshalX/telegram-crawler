# Messages.HighScores

High scores (in games)

```tl
messages.highScores#9a3bfd99 scores:Vector<HighScore> users:Vector<User> = messages.HighScores;

---functions---

messages.getGameHighScores#e822649d peer:InputPeer id:int user_id:InputUser = messages.HighScores;
messages.getInlineGameHighScores#f635e1b id:InputBotInlineMessageID user_id:InputUser = messages.HighScores;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.highScores](/constructor/messages.highScores.md) | Highscores in a game |

### Methods

| Method | Description |
| --- | --- |
| [messages.getGameHighScores](/method/messages.getGameHighScores.md) | Get highscores of a game |
| [messages.getInlineGameHighScores](/method/messages.getInlineGameHighScores.md) | Get highscores of a game sent using an inline bot |
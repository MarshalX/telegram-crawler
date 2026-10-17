# HTML5 games


Bots can offer users [HTML5 games](/bots/games.md) to play solo or to compete against each other in groups and one-on-one chats. 

### Sending a game

    inputUserSelf#f7c1b13f = InputUser;

    inputGameID#32c3e77 id:long access_hash:long = InputGame;
    inputGameShortName#c331e80a bot_id:InputUser short_name:string = InputGame;

    inputMediaGame#d33f43f3 id:InputGame = InputMedia;

    game#bdf9653b flags:# id:long access_hash:long short_name:string title:string description:string photo:Photo document:flags.0?Document = Game;
    messageMediaGame#fdb19008 game:Game = MessageMedia;

    ---functions---

    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

Bots can directly send a game using [messages.sendMedia](/method/messages.sendMedia.md), providing:

* The game's short name obtained from [@BotFather](https://t.me/botfather) or from a [game link&nbsp;&raquo;](/api/links.md#game-links) to `inputGameShortName.short_name`
* The current bot's info to `inputGameShortName.bot_id`

The sent message will contain a [messageMediaGame](/constructor/messageMediaGame.md) with a [game](/constructor/game.md), that can then be used by users to forward the game using sendMedia with [inputGameID](/constructor/inputGameID.md).

### Starting a game

Games are started by clicking on a [keyboardButtonGame](/constructor/keyboardButtonGame.md), which triggers a callback query that returns the game URL.
The game should then be opened in a WebView or in native UI (specified by the `native_ui` flag), exposing the [appropriate HTML5 APIs](/api/web-events.md) in order to receive various JS game events directly from the code of the game, as described [here&nbsp;&raquo;](/api/web-events.md).  

### Setting highscores

    ---functions---

    messages.setGameScore#8ef8ecc0 flags:# edit_message:flags.0?true force:flags.1?true peer:InputPeer id:int user_id:InputUser score:int = Updates;
    messages.setInlineGameScore#15ad9f64 flags:# edit_message:flags.0?true force:flags.1?true id:InputBotInlineMessageID user_id:InputUser score:int = Bool;

Games are supposed to report back to the MTProto API every time the user loses a game with a new highscore.  
Since games run in the browser, they cannot directly report data to the API using the bot token, which must be kept secret.  
Instead, they should send highscores to an intermediate server, that will then report scores using [messages.setGameScore](/method/messages.setGameScore.md) or [messages.setInlineGameScore](/method/messages.setInlineGameScore.md), depending on the source of the game.  

* The `edit_message` flag should be set if the game message should be automatically edited to include the current scoreboard
* The `force` flag should be set if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters.

### Getting highscores

    messageActionGameScore#92a72876 game_id:long score:int = MessageAction;

    messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;

    highScore#73a379eb pos:int user_id:long score:int = HighScore;

    messages.highScores#9a3bfd99 scores:Vector<HighScore> users:Vector<User> = messages.HighScores;

    ---functions---

    messages.getGameHighScores#e822649d peer:InputPeer id:int user_id:InputUser = messages.HighScores;
    messages.getInlineGameHighScores#f635e1b id:InputBotInlineMessageID user_id:InputUser = messages.HighScores;

Every time a highscore is reached, and the `edit_message` flag is set when reporting the score, a [messageService](/constructor/messageService.md) with a [messageActionGameScore](/constructor/messageActionGameScore.md) is generated, indicating that the highscore of a certain game has changed, thanks to a certain `user_id`.  
Our own current position of the scoreboard is also reported as `pos`.  

When receiving such an update, graphical clients should refetch the scoreboard using [messages.getGameHighScores](/method/messages.getGameHighScores.md) or [messages.getInlineGameHighScores](/method/messages.getInlineGameHighScores.md).

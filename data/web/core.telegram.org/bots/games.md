# Gaming Platform


<div class="dev_side_image">
  <a href="/file/811140373/1/0_42vz9chLs.975647/383dca94f028b1872c" target="_blank"><img src="/file/811140063/2/hlfJUWy75wU.82563/ea57853b3d4d9ab22f" title="Gaming Platform Poster">
</a></div>

Bots can offer their users **HTML5 games** to play solo or to compete against each other in groups and one-on-one chats. Games are a new type of content on Telegram that your bot can send to users.

<div><center>
<a href="/file/811140035/2/cIULSr61vi4.78261/127282e0bbd66ce3a9" target="_blank"><img src="/file/811140035/2/cIULSr61vi4.78261/127282e0bbd66ce3a9" title="Game in a chat"  style="width: 295px; padding: 10px 10px;" /></a></center><br>
</div>

> Check out the [**@gamebot**](https://telegram.me/gamebot) and [**@gamee**](https://telegram.me/gamee) bots for examples of what you can do using the new Gaming Platform.

### Web Apps

Since [April 2022](https://telegram.org/blog/notifications-bots#bot-revolution), you can also use [Web Apps](https://core.telegram.org/bots/webapps) to create powerful games using *JavaScript*.

> Check out the [Web App Manual](https://core.telegram.org/bots/webapps) for details. 

### Creating a Game

To get started, send the `/newgame` command to [@BotFather](https://telegram.me/botfather).You will be prompted for a description text and a photo. You can also upload an optional GIF animation that demostrates your game to the users to make messages with the game more attractive (check out [Lumberjack](https://telegram.me/gamebot?game=Lumberjack) or [Corsairs](https://telegram.me/gamebot?game=Corsairs) for examples).

### Launching the Game

Once the game is created, your bot can send it to chats as regular messages, or offer them via [inline mode](/bots/inline). The game message will always have an [inline](/bots/api#inlinekeyboardmarkup) **Play button**.

When this button is pressed, your bot gets a callback query that indicates the requested game. You provide the correct URL for this particular user and the app automatically opens the game in the in-app browser.

### Adding Buttons

If you send the game message without any buttons, it will automatically have a 'Play *GameName*' button. You can manually add multiple buttons to your game message. Please note that the first button in the first row **must always** be the one that launches the game. You can add more buttons: e.g., for a description of the rules, or a button that links to the game's official community.

### Tracking High Scores

The message with your game will also display high scores for the current chat. When a new high score is set, a service message will be sent to the chat and the message with the current scoreboard will be updated. You can also request the necessary data for building in-game high score tables.

<div><center>
 <br>
    <a href="/file/811140022/1/m7-46hgmwbI.91190/ad7033bcb879270a69" target="_blank"><img src="/file/811140022/1/m7-46hgmwbI.91190/ad7033bcb879270a69" title="In-game high scores for Lumberjack" style="width: 295px; padding: 0px 20px;" /></a>
   <a href="/file/811140594/2/WS2fB3n2UGA.149087/270057ff677339717e" target="_blank"><img src="/file/811140594/2/WS2fB3n2UGA.149087/270057ff677339717e" title="Message with the score in the chat"  style="width: 295px; padding: 0px 20px;" /></a><br><br>

<br><br></center></div>

### Sharing Your Game to Telegram Chats

There are many way for users to spread your game virally if they like it. The interface will always have the standard system button for sharing the game in the top right corner:

<div><center>
<a href="/file/811140766/2/_wJtf-Zib5I.25531/774eb9b59898526d26" target="_blank"><img src="/file/811140766/2/_wJtf-Zib5I.25531/774eb9b59898526d26" title="Standard share button: iOS" style="width: 295px; padding: 15px 20px;" /></a>

<a href="/file/811140557/3/ddi8K6x0obQ.34056/a1ca60069b70a81646" target="_blank"><img src="/file/811140557/3/ddi8K6x0obQ.34056/a1ca60069b70a81646" title="Standard share button: Android" style="width: 295px; padding: 15px 20px;" /></a><br><br>

</center></div>

You can also create an additional **Share** button inside your HTML page. Pressing this button will send the game to a desired chat along with the user's best score in the game.

<div><center>
 
    <a href="/file/811140189/2/SLwHmToemfg.91233/a242854be2b500b4cb" target="_blank"><img src="/file/811140189/2/SLwHmToemfg.91233/a242854be2b500b4cb" title="Gamee: share button" style="width: 295px; padding: 15px 20px;" /></a>
   <a href="/file/811140978/1/JoBvEad8JaM.148942/dcd741b65b446781b4" target="_blank"><img src="/file/811140978/1/JoBvEad8JaM.148942/dcd741b65b446781b4" title="Shared game with 'just scored'"  style="width: 295px; padding: 15px 20px;" /></a>

<br><br></center></div>

To add the sharing button, include [this script](https://telegram.org/js/games.js) at the end of the `<body>` tag on your page:

	<script src="https://telegram.org/js/games.js"></script>
    
Then use the method `TelegramGameProxy.shareScore()` to call the sharing option.

>Warning: Do not call this method without consent and **direct action** from the user.

**Example:**

	<button onclick="TelegramGameProxy.shareScore()">Share score</button>

This library will only work when launched from inside Telegram, so please don't use it on ordinary web pages. 

### Using URL Parameters 

If your URL is using a fragment identifier, please note that Telegram Apps could add certain service parameters to the fragment id. The names for such parameters will start in `tg` (you can check the code that adds them [here](https://github.com/TelegramMessenger/GamingCommunication/blob/master/games.js#L54)). Use the `TelegramGameProxy.initParams` object if you need to read your own parameters from the fragment id.

### Creating a Great HTML5 Experience

Please make sure that your HTML5 page is responsive and works well on all Telegram apps and supported platforms. If you find it impossible to support certain conditions or platforms, don't leave your users hanging and at least provide a notification.

> See the [Bot API Manual](/bots/api#games) for the relevant methods and objects.
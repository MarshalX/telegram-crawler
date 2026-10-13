# Introducing Bot API 2.0


> Howdy! This text assumes that you're familiar with Telegram's bot platform.
If this is not the case, kindly check out our [**Introduction to Bots**](/bots).

Today we're introducing the biggest change to Telegram's Bot Platform since June 2015. These new tools will help you create fluid and intuitive interfaces for your bots. And bots  are becoming a lot more capable. They can now send any type of content supported on Telegram, provide location-based services and integrate with other services deeply based on users' phone numbers.

If you'd like a more concise changelog, you can find one in the [**Bot API Manual**](/bots/api#recent-changes).

###New Inline Keyboards
To begin with, we're adding a new type of keyboard that is integrated directly into the message it belongs to. Inline keyboards are available for messages sent both in chat mode and inline mode.

<div><center>
  <a href="/file/811140217/1/NkRCCLeQZVc/17a804837802700ea4" target="_blank"><img src="/file/811140217/1/NkRCCLeQZVc/17a804837802700ea4" title="Callback buttons in @music"  style="width: 295px; padding: 10px 20px;" /></a>
    <a href="/file/811140659/1/RRJyulbtLBY/ea6163411c7eb4f4dc" target="_blank"><img src="/file/811140659/1/RRJyulbtLBY/ea6163411c7eb4f4dc" title="More callback buttons in @music"  style="width: 295px; padding: 10px 20px;" /></a>
  
  </center><br>
  

  
</div>

Unlike with custom reply keyboards, pressing buttons on inline keyboards doesn't result in messages sent to the chat. Instead, inline keyboards support buttons that work behind the scenes: [callback buttons](#callback-buttons), [URL buttons](#url-buttons) and [switch to inline buttons](#switch-to-inline-buttons).

> [Manual: Inline keyboards »](/bots/api#inlinekeyboardmarkup)

####Callback buttons
When a user presses a **callback button**, no messages are sent to the chat. Instead, your bot simply receives the relevant query. Upon receiving the query, your bot can display some [result in a notification](/bots/api#answercallbackquery) at the top of the chat screen or in an alert.

<div><center>
  <a href="/file/811140423/1/6BVlO7dWPeo/64d0d842ff73ff3dc8" target="_blank"><img src="/file/811140423/1/6BVlO7dWPeo/64d0d842ff73ff3dc8" title="Notification at the top" style="width:295px; padding:10px 20px"/></a></center><br>
</div>

**Sample bot**
[@music](https://telegram.me/music) – This sample music bot uses inline callback buttons to flip pages and reload random results.

Read on to [updating messages](#updating-messages) to find out how callback buttons can get even cooler.

####URL buttons
Buttons of this type have a small arrow icon to help the user understand that tapping on a **URL button** will open an external link. Naturally, we'll show them a confirmation alert before opening the link in the browser.

<div><center>
  <a href="/file/811140999/1/2JSoUVlWKa0/4fad2e2743dc8eda04" target="_blank"><img src="/file/811140999/1/2JSoUVlWKa0/4fad2e2743dc8eda04" title="URL button" style="width:295px; padding:10px 20px"/></a></center>
</div>

####Switch to Inline buttons
Pressing a switch to inline button prompts the user to select a chat, opens it and inserts the bot's username into the input field. You can also pass a query that will be inserted along with the username – this way your users will immediately get some inline results they can share.

<div><center>
<a href="/file/811140659/1/RRJyulbtLBY/ea6163411c7eb4f4dc" target="_blank"><img src="/file/811140659/1/RRJyulbtLBY/ea6163411c7eb4f4dc" title="More callback buttons in @music" style="width: 295px; padding: 10px 20px;" /></a></center><br>
</div>

**Sample bot**
[@sticker](https://telegram.me/sticker) – This sticker search bot offers a ['switch to inline' button](#switch-to-inline-buttons) to teach users how to use it in inline mode. 

###Updating Messages

Since inline keyboards don't send additional messages to the chat, it made sense to give bots a way of manipulating their existing messages, so that they don't have to send a new message each time they need to update something. This helps reduce clutter and build more fluid interfaces.

<div class="smartphone_video_player_wrap">
 <div class="smartphone_video_player_iphone">
 <video class="smartphone_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" poster="/resources/video/cover/Music.png" loop controls muted>
  <source src="/resources/video/Music.mp4" type="video/mp4">
 </video>
 </div>
</div>

**Sample bot**
[@music](https://telegram.me/music) – Watch how the music bot updates its messages with search results when you press the navigation buttons.

> [Manual: Updating messages »](/bots/api#updating-messages)

###Locations and Numbers

Some bots need extra data from the user to work properly. For example, knowing the user's location helps provide more relevant geo-specific results. The user's phone number can be very useful for integrations with other services, like banks, etc.

We've added an easy way for bots to ask the user for their **location** and **phone number** using special buttons. Note that both phone number and location request buttons will only work in private chats.

<div><center>
<a href="/file/811140587/2/jaowDLZg2l0/5ba3f7d7fd5c6c28dc" target="_blank"><img src="/file/811140587/2/jaowDLZg2l0/5ba3f7d7fd5c6c28dc" title="Phone number and location sharing buttons"  style="width: 295px; padding: 10px 20px;" /></a></center><br>
</div>

When these buttons are pressed, Telegram clients will display a confirmation alert that tells the user what's about to happen.

> [Manual: Number and location buttons »](/bots/api#keyboardbutton)

Inline bots can also request location data from their users. Use the `/setinlinegeo` command with [@BotFather](https://telegram.me/botfather) to enable this. Your bot will ask the user for permission to access their location whenever they send an inline request.

**Sample bot**
[@foursquare](https://telegram.me/foursquare) – This bot will ask for permission to access the user's location, then provide geo-targeted results.

###Inline Bots 2.0
Speaking of inline bots, they are also getting a major upgrade today.

####New types of content
Inline bots now support **all types of content** available in Telegram (19 in all), they are now capable of sending stickers, videos, music, locations, documents and more. 

<div><center>
<a href="/file/811140994/2/fvw-q_CRaBQ/c618325e119b0a8229" target="_blank"><img src="/file/811140994/2/fvw-q_CRaBQ/c618325e119b0a8229" title="All kinds of inline content"  style="width: 295px; padding: 10px 20px;" /></a></center><br>
</div>

**Sample bots**
[@sticker](https://telegram.me/sticker) – This sticker bot will accept one or more emoji and search for relevant stickers.
[@music](https://telegram.me/music) – The music bot allows users to send mp3 tracks from a database of public domain classical music.

> [Manual: Types of inline content »](/bots/api#inlinequeryresult)

####Switching between inline mode and private chat
Some inline bots can benefit from an initial setup process, like connecting them to an account on an external service (e.g., YouTube). We've added an easy way of switching between the private chat with a bot and whatever chat the user wants to share inline results in.

<div><center>
<a href="/file/811140951/1/FD93gAgDVDI/8d8bdd16e6a7b40c12" target="_blank"><img src="/file/811140951/1/FD93gAgDVDI/8d8bdd16e6a7b40c12" title="Switch to PM button"  style="width: 295px; padding: 10px 20px;" /></a></center><br>
</div>

You can now display a special 'Switch to PM' button above the inline results (or instead of them). This button will open a private chat with the bot and pass a parameter of your choosing, so that you can prompt the user for the relevant setup actions. Once done, you can use an inline keyboard with a [*switch_inline_query*](/bots/api#inlinekeyboardmarkup) button to send the user back to the original chat. 

**Sample bots**
[@youtube](https://telegram.me/youtube) – Shows a 'Sign in to YouTube' button, then suggests personalized results.

> [Manual: Switch to PM](/bots/api#answerinlinequery)

####Better inline UI

Since sending content via inline bots works differently from sending ordinary messages, we've changed the interface a little. There's hardly a more effective way of explaining that there's no need to hit 'Send':

<div><center>
<a href="/file/811140558/1/POjp00-nHqE/50d0312845a05e6da9" target="_blank"><img src="/file/811140558/1/POjp00-nHqE/50d0312845a05e6da9" title="New input field"  style="width: 295px; padding: 10px 20px;" /></a></center><br>
</div>

Tapping on the cross icon once will clear the query, tapping twice will give the 'Send' button back to the user.

###Group Admins
As a dessert, we're beginning to roll out tools that will allow you to create bot solutions for group admins. As the first step, we've added methods to remove members from groups and supergroups.

>[Manual: Group management »](/bots/api#kickchatmember)

And that's about it for now. Stay tuned for more updates and subscribe to our official [@Botnews](https://telegram.me/botnews) channel on Telegram.

>[Read the full changelog for this update »](/bots/api#recent-changes)
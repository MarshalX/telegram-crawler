# Telegram Bot Features


This page describes individual **bot elements** and **features** in detail. See also:

- [A General Bot Platform Overview](/bots)
- [Full API Reference for Developers](/bots/api)

### What features do bots have?

- [**Inputs**](#inputs)
  - [Commands](#commands)
  - [Keyboards](#keyboards)
  - [Inline Keyboards](#inline-keyboards)
  - [Menu Button](#menu-button)
  - [Global Commands](#global-commands)
  - [Chat and User Selection](#chat-and-user-selection)
- [**Interactions**](#interactions)
  - [Inline](#inline-requests)
  - [Deep Linking](#deep-linking)
  - [Attachment Menu](#attachment-menu)
  - [Ephemeral Messages](#ephemeral-messages)
  - [Streaming Replies](#streaming-replies)
  - [Topics in Private Chats](#topics-in-private-chats)
- [**AI Agents**](#ai-agents)
- [**Media and Messaging**](#media-and-messaging)
  - [Polls and Quizzes](#polls-and-quizzes)
  - [Checklists](#checklists)
  - [Live Photos](#live-photos)
- [**Integration**](#integration)
  - [Mini Apps](#mini-apps)
  - [Business Bots](#business-bots)
  - [Managed Bots](#managed-bots)
  - [Bot-to-Bot Communication](#bot-to-bot-communication)
  - [Guest Bots](#guest-bots)
  - [Communities](#communities)
  - [Channel Direct Messages](#channel-direct-messages-and-suggested-posts)
  - [Payments](#payments)
  - [Web Login](#web-login)
  - [HTML5 Games](#html5-games)
  - [Stickers](#stickers-and-custom-emoji)
- [**Monetization**](#monetization)
- [**Messages and Formatting**](#messages-and-formatting)
  - [Rich Messages](#rich-messages)
  - [Regular Messages](#regular-messages)
- [**Language Support**](#language-support)
- [**Bot Management**](#bot-management)
  - [Privacy Mode](#privacy-mode)
  - [Testing Your Bot](#testing-your-bot)
  - [Status Alerts](#status-alerts)
  - [Local API](#local-bot-api)  
- [**BotFather, creating and managing bots**](#botfather)

-------

### Inputs
Users can send **messages of all types** to bots, including text, files, locations, stickers, voice messages and even [dice](/bots/api#dice) if they're feeling lucky. However, Telegram bots offer many other tools for building flexible interfaces tailored to your specific needs:

- [Commands](#commands) that are highlighted in messages and can be selected from a list after typing `/`.
- [Keyboards](#keyboards) that replace the user's keyboard with predefined answer options.
- [Buttons](#inline-keyboards) that are shown next to messages from the bot.

For even more flexibility, [Mini Apps](#mini-apps) support custom interfaces with JavaScript that launch directly inside Telegram.

<div>
  <a href="/file/464001858/11318/ahAJjwERIX8.164875/ce1372cbf73e3ea94e" target="_blank"><img src="/file/464001858/11318/ahAJjwERIX8.164875/ce1372cbf73e3ea94e" title="Bot Features" alt="Bot interface features" class="dev_page_image" width=70% /></a>
</div>

> **Note:** Telegram bots can support [multiple languages](#language-support) that adapt to the users' language settings in the app.

#### Commands
A command is a simple `/keyword` that tells the bot what to do. Telegram apps will:

- **Highlight** commands in messages. When the user taps a highlighted command, that command is immediately sent again.
- Suggest a **list of supported commands** with descriptions when the user enters a `/` (for this to work, you need to have provided a list of commands to [@BotFather](https://t.me/botfather) or via the [appropriate API method](/bots/api#setmycommands)). Selecting a command from the list immediately sends it.
- Show a [menu button](#menu-button) containing all or some of a bot’s commands (which you set via [@BotFather](https://t.me/botfather)).

Commands must always start with the `/` symbol and contain **up to 32 characters**. They can use **Latin letters**, **numbers** and **underscores**, though simple lowercase text is recommended for a cleaner look. 

Here are a few examples:

- /next 
- /cancel 
- /newlocation 
- /newrule 

Commands should be **as specific as possible** – for example `/newlocation` or `/newrule` **is better** than a `/new` command that then requires an additional parameter from the user like "*location*" or "*rule*".

<div>
  <a href="/file/464001775/10227/HCr0XgSUHrg.119089/c17ff5d34fe528361e" target="_blank"><img  src="/file/464001775/10227/HCr0XgSUHrg.119089/c17ff5d34fe528361e" title="Bot Commands" alt="Bot commands shown in a list" class="dev_page_image"
width=44% /></a>
</div>

> We require **all developers** to support several [Global Commands](#global-commands) to make sure Telegram bots offer a consistent and user-friendly experience.

##### Command Scopes

Your bot is able to **show different commands** to different users and groups – you can control this using [scopes](/bots/api#botcommandscope). For example, your bot could show additional commands to group admins or translate the list based on the user’s [language_code](/bots/api#user).

> Keep in mind that Bot API [updates](/bots/api#update) **will not contain any information** about the scope of a command sent by the user – in fact, they may contain commands that don’t exist at all in your bot. Your backend should **always** verify that received commands are valid and that the user was authorized to use them regardless of scope.

> Bots with privacy mode enabled will only receive commands in groups under special conditions, [see here](#privacy-mode).

#### Keyboards
Bots are able to interpret free text input from users, but offering **specific suggestions** is often more intuitive – this is where **custom keyboards** can be extremely useful.

Whenever your bot sends a message, it can **display a special keyboard** with predefined reply options (see [ReplyKeyboardMarkup](/bots/api#replykeyboardmarkup)). Telegram apps that receive the message will display your keyboard to the user. Simple text buttons will immediately send the respective text, while other buttons can request a user, chat, location, contact or poll, or open a Mini App. This way you can drastically **simplify** and **streamline** user interaction with your bot.

<div>
  <a href="/file/464001950/1191a/2RwpmgU-swU.123554/b50478c124d5914c23"  target="_blank"><img src="/file/464001950/1191a/2RwpmgU-swU.123554/b50478c124d5914c23" title="Custom Keyboards" alt="Custom keyboard with predefined reply options" class="dev_page_image" width=44% /></a>
</div>

> Check out the [one_time_keyboard](/bots/api#replykeyboardmarkup) parameter to automatically hide your bot's keyboard as soon as it's been used.

You can also **customize the text placeholder** in the input field by setting the `input_field_placeholder` parameter.

#### Inline Keyboards
There are times when you'd prefer to do things **without sending any messages** to the chat – like when a user is changing settings, toggling options or navigating search results. In such cases, you can use [Inline Keyboards](/bots/api#inlinekeyboardmarkup) that are shown directly below their relevant messages.

Unlike with custom reply keyboards, pressing buttons on inline keyboards **doesn't send messages to the chat**. Instead, inline keyboards support buttons that can work behind the scenes or open different interfaces: [callback buttons](/bots/api#inlinekeyboardbutton), [URL buttons](/bots/api#inlinekeyboardbutton), [switch-to-inline buttons](/bots/api#inlinekeyboardbutton), [game buttons](/bots/api#inlinekeyboardbutton), [payment buttons](/bots/api#inlinekeyboardbutton), as well as buttons with custom styles, copyable text or disabled states.

<div>
  <a href="/file/464001863/110f3/I47qTXAD9Z4.120010/e0ea04f66357b640ec" target="_blank"><img src="/file/464001863/110f3/I47qTXAD9Z4.120010/e0ea04f66357b640ec" title="Inline Keyboards" alt="Inline keyboard shown below a bot message" class="dev_page_image" width=44% /></a>
</div>

> To provide a **better user experience**, consider [editing your keyboard](/bots/api#editmessagereplymarkup) when the user toggles a setting button or navigates to a new page – this is both **faster** and **smoother** than sending a whole new message and deleting the previous one.

#### Menu Button
In all bot chats, a menu button appears near the message field. By default, tapping this button **opens a menu** that can hold some or all of a bot's commands, including a short description for each. Users can then **select a command from the menu** without needing to type it out.

You can set different texts of the menu button and its command descriptions for various **individual users** or **groups of users** – for example, showing translated text based on the user’s language, as explained [here](#commands).

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay="" loop="" controls="" muted="" poster="/file/464001581/11d85/f42u9c5Wncg.133752/b5a95b7f1221032d7d" style="max-width: 400px;" title="Menu Button" aria-label="Menu Button" alt="Menu button shown beside the message field">
  <source src="/file/464001555/10fbd/jvTuV2Ke7WQ.1916669.mp4/a056de323645db409d" type="video/mp4">
 </video>
</div>

The **menu button** can alternatively be used to launch a [Mini App](#mini-apps).

#### Global Commands
To make basic interactions more uniform, we ask all developers to support a few **basic commands**. Telegram apps will have interface shortcuts for these commands.

- /start - begins the interaction with the user, like sending an introductory message. This command can also be used to pass additional parameters to the bot (see [Deep Linking](#deep-linking)).
- /help - returns a help message, like a short text about what your bot can do and a list of commands.
- /settings - (if applicable) shows the bot's settings for this user and suggests commands to edit them.

Users will see a **Start** button the first time they open a chat with your bot. **Help** and **Settings** links will be available in the menu on the bot's profile page if you add them in [@BotFather](https://t.me/botfather).

### Chat and User Selection

Bots can present the user with a **friendly** and **intuitive** interface that lists any number of groups, channels or other users according to a custom set of **criteria**. Tapping on a chat will send its identifier to the bot in a service message and seamlessly close the interface.

A group management bot is the **perfect example**: an admin could select a chat the bot should manage, and then select a user it should promote – this would happen without ever typing any text.

Here is a **quick start guide** to use this feature:

- Pick a set of criteria and store them in a [KeyboardButtonRequestChat](https://core.telegram.org/bots/api#keyboardbuttonrequestchat) object (or [KeyboardButtonRequestUsers](https://core.telegram.org/bots/api#keyboardbuttonrequestusers) for users).
- Create a [KeyboardButton](https://core.telegram.org/bots/api#keyboardbutton) and store the criteria under `request_chat` or `request_users` respectively.
- Send a [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) that contains the button you just created.
- When the user selects a chat or users, your bot will receive a `chat_shared` or `users_shared` service message containing the selection.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/464001277/1132d/dAINJNWL9jw.34909/08eaf646c24be49a87" style="max-width: 400px;" title="Chat and User Selection" aria-label="Chat and User Selection" alt="Chat and User Selection" vindex="1" preload="auto">
  <source src="/file/464001095/11121/M6HpBwtivTE.1913043.mp4/0514a29affa78a6dca" type="video/mp4">
 </video>
</div>

> Keep in mind that the bot may not be able to use the identifier it receives if the corresponding chat or user is not already known or accessible by some other means.

------

### Interactions
In addition to sending commands and messages to the chat with the bot, there are several ways of interacting with them without opening any specific chat or group.

* [**Inline mode**](#inline-requests) allows sending requests to bots right from the input field – from any chat on Telegram.
* [**Deep linking**](#deep-linking) allows special links that send certain parameters to the bot when opened.
* [**Attachment menu**](#attachment-menu) integration makes it possible to use bots from the attachment menu in chats.
* [**Streaming replies**](#streaming-replies) let bots show progress while generating a response.
* [**Topics in private chats**](#topics-in-private-chats) help organize long-running conversations with a bot.

#### Inline Requests
Users can interact with your bot via **inline queries** straight from the message field **in any chat**. All they need to do is start a message with your bot's *@username* and enter a keyword.

Having received the query, your bot can return some results. As soon as the user selects one, it is sent to the **relevant chat**. This way, people can request and send content from your bot in any of their chats, groups or channels.

Remember that inline functionality has to be enabled via [@BotFather](https://t.me/botfather), or your bot will not receive inline [Updates](/bots/api#update).

<div>
  <a href="/file/464001466/10e4a/r4FKyQ7gw5g.134366/f2606a53d683374703" target="_blank"><img src="/file/464001466/10e4a/r4FKyQ7gw5g.134366/f2606a53d683374703" title="Inline Requests" alt="Inline query results from a bot" class="dev_page_image" width=51%/></a>
</div>

> Examples of inline bots include [@gif](https://gif.t.me), [@bing](https://bing.t.me) and [@wiki](https://wiki.t.me). [Mini App](#mini-apps) bots can also be used inline – try typing [@durgerkingbot](https://durgerkingbot.t.me) in any chat.

#### Deep Linking
Telegram bots have a deep linking mechanism that allows **additional parameters** to be passed to the bot on startup. It could be a command that launches the bot – or an authentication token to connect the user's Telegram account to their account on another platform.

Each bot has a link that **opens a conversation** with it in Telegram – `https://t.me/<bot_username>`. Parameters can be added directly to this link to let your bot work with additional information on the fly, without any user input.

> A-Z, a-z, 0-9, _ and - are allowed. We recommend using base64url to encode parameters with binary and other types of content. The parameter can be up to 64 characters long.

**Private Chats**
In private chats, you can use the `start` parameter to automatically pass any value to your bot whenever a user presses the link. For example, you could use:

    https://t.me/your_bot?start=airplane

When someone opens a chat with your bot via this link, you will receive:

    /start airplane

**Groups**
In groups, you can add the parameter `startgroup` to this link. For example:

    https://t.me/your_bot?startgroup=spaceship

Following a link with this parameter prompts the user to select a group to add the bot to – the resulting update will contain text in the form:

    /start@your_bot spaceship

> [Mini Apps](#mini-apps) also support deep linking, for more information check out our [dedicated guide](/bots/webapps#adding-bots-to-the-attachment-menu).

#### Attachment Menu
Certain bots can be added directly to a user’s **attachment menu** – giving them easy access to the bot in any chat. Currently, this option is restricted to certain [approved bots](/bots/webapps#adding-bots-to-the-attachment-menu), but may be expanded later.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay="" loop="" controls="" muted="" poster="/file/464001491/11651/uwMWNdO29NE.215169/1b37285bbd8fc81244" style="max-width: 400px;" title="Attachment Menu" aria-label="Attachment Menu" alt="Bot available from the attachment menu">
  <source src="/file/464001177/11b03/ruSbBLQiLJ8.928268.mp4/d9ad95048d23f3cc3f" type="video/mp4">
 </video>
</div>

> Try adding [@DurgerKingBot](https://t.me/durgerkingbot?startattach) to your attachment menu.

#### Ephemeral Messages

[Ephemeral messages](/bots/api#ephemeral-messages-and-commands) let bots send **private responses** inside group chats – visible only to a specific user and the bot. They are ideal for welcome messages, whispers, personalized summaries, contextual hints and other interactions that **shouldn't clutter** the conversation for others.

When a user taps an inline button, bots can also [show an ephemeral response](/bots/api#ephemeralmessageparameters) in place of the message containing that button – creating a private overlay for that user without changing what anyone else sees. 

Bots can also easily [reply](https://core.telegram.org/bots/api#replyparameters) to ephemeral messages or [delete](https://core.telegram.org/bots/api#deleteephemeralmessage) them before they expire. 

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
  <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/400780400707/6/59tqj-7zkUI.67925.jpg/8f9328dc5077455151" style="max-width: 400px;" title="Ephemeral Messages" aria-label="Ephemeral Messages" alt="Inline buttons in an ephemeral message overlay" vindex="1" preload="auto"> <source src="/file/400780400139/7/vJgWIvqqzxA.3710126.mp4/718db1a1f9ad8f5cdf" type="video/mp4">
  </video>
</div>

> Check out [rich messages](#rich-messages) to learn how to combine ephemeral personalized views with complex [structured content](/bots/api#inputrichmessage) and embedded [buttons](/bots/api#richmessagebutton).

**Rich Media Support**
Ephemeral responses are not limited to plain text. Bots can send a wide variety of content privately within a group, including:

- **Media & Expressions:** Photos, videos, animations, audio files, voice messages, and stickers.
- **Utility & Location:** Documents, contacts, locations, and venues.

**Two-Way Privacy with Ephemeral Commands**
In addition to bots sending private messages, users can send **ephemeral commands** to bots. When a command is configured as ephemeral, the user's initial message remains completely invisible to other group members and other bots, allowing for discreet interactions in public spaces.

<div>
  <a href="/file/400780400146/2/NCkBKEh9JJ0.148639.jpg/abe830e0723e38a4f9" target="_blank"><img src="/file/400780400146/2/NCkBKEh9JJ0.148639.jpg/abe830e0723e38a4f9" title="Ephemeral Messages" alt="Private ephemeral message shown to one user" class="dev_page_image" width=44% /></a>
</div>

> Telegram clients visually distinguish ephemeral bot [commands](https://core.telegram.org/bots/api#botcommand).

#### Streaming Replies

In private chats, bots can show a **draft response** while it is being generated, instead of making the user wait for the complete message. This is useful for AI assistants, long-running searches, document generation and other tasks where showing progress makes the interaction more responsive.

You can update a draft with regular text or [richly formatted content](#rich-messages), then send the final result with [sendMessage](/bots/api#sendmessage) or [sendRichMessage](/bots/api#sendrichmessage) when it is ready. Drafts are temporary previews – if the result should remain in the chat, make sure to send the completed message.

The user can also stop a draft while it is being generated. When the stop option is enabled, your bot will receive an update when the user presses the **Stop** button, allowing your application to cancel the model or other work behind the scenes.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400085/4/bZ4p-Av_XQs.62528.jpg/a9eeb0b97a640f2ea7" style="max-width: 400px;" title="Streaming Text for Bots" aria-label="Streaming Text for Bots" alt="Bot response streaming as it is generated">
  <source src="/file/400780400434/3/2Ju3ell42to.5230079.mp4/856bd9fde86a4f24ac" type="video/mp4">
 </video>
</div>

An empty [`sendMessageDraft`](/bots/api#sendmessagedraft) displays a **Thinking...** placeholder. Rich drafts can also use the [`<tg-thinking>`](/bots/api#rich-html-style) tag or the [`InputRichBlockThinking`](/bots/api#inputrichblockthinking) type to show a visible placeholder. This is a presentation element, not a transcript of the model's reasoning.

> See [sendMessageDraft](/bots/api#sendmessagedraft), [sendRichMessageDraft](/bots/api#sendrichmessagedraft) and [MessageGenerationStopped](/bots/api#messagegenerationstopped) for the complete workflow.

#### Topics in Private Chats

Bots and users can organize long-running private conversations into **separate topics** – for example, one topic for an order, another for technical support and a third for a recurring task. This makes it easier to keep several conversations with the same bot neatly separated without opening multiple chats.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400227/2/btvhtJcqT_A.76194.jpg/b56e1d38cc2e92e2aa" style="max-width: 400px;" title="Threads and Streaming Responses for AI Bots" aria-label="Threads and Streaming Responses for AI Bots" alt="AI bot topics and streamed responses">
  <source src="/file/400780400658/2/zyAsgGtzdvg.5107918.mp4/413b3825ef972abc2a" type="video/mp4">
 </video>
</div>

> Private-chat topics need to be enabled for the bot via [@BotFather](https://t.me/botfather). See [createForumTopic](/bots/api#createforumtopic), [editForumTopic](/bots/api#editforumtopic) and [deleteForumTopic](/bots/api#deleteforumtopic) for more information.

-----

### AI Agents

Telegram is the only platform where all **AI models** can [compete](https://telegram.org/blog/ai-bot-revolution-11-new-features) freely – while users remain in control of their experience. Third-party [AI bots](/bots/features#ai-agents) are welcome to communicate with users and [each other](/bots/features#bot-to-bot-communication) (as long as they stick to the [rules](https://telegram.org/tos/bot-developers#4-3-data-scraping)).

Telegram apps natively support **AI interfaces** such as [threaded conversations](#topics-in-private-chats) and [real-time streaming for responses](/bots/features#streaming-replies). Users can quickly [summon specialized assistants](/bots/features#guest-bots) into the same conversation, bring several agents together around one task or instruct them to [manage their account](/bots/features#business-bots).

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400227/2/btvhtJcqT_A.76194.jpg/b56e1d38cc2e92e2aa" style="max-width: 400px;" title="Threads and Streaming Responses for AI Bots" aria-label="Threads and Streaming Responses for AI Bots" alt="AI bot topics and streamed responses">
  <source src="/file/400780400658/2/zyAsgGtzdvg.5107918.mp4/413b3825ef972abc2a" type="video/mp4">
 </video>
</div>

> The Bot API provides the messaging, multi-platform presentation, access and lifecycle features – the model, memory and bot logic are flexible and entirely up to you.

Here are a few examples of what you can build:

- A **research assistant** that streams a comparison of several sources and then presents the result as a structured report with links and follow-up buttons.
- A **group helper** that can be mentioned for translation, fact-checking, image generation or another context-specific task without being added to the group.
- A **multi-agent workflow** where a coordinator bot asks specialist bots to review, translate, schedule or process an order before combining the results.
- A **business secretary** that processes incoming business messages and performs only the actions allowed by the account owner.

The individual building blocks are described in more detail throughout this page:

- [Topics in Private Chats](#topics-in-private-chats) keep separate projects or support cases organized – improving on established web-based AI chat UIs.
- [Streaming Replies](#streaming-replies) show progress while the agent works and allow users to stop a draft at any point.
- [Rich Messages](#rich-messages) turn the final result into a structured report, checklist, comparison, explanation or interactive flow.
- [Guest Bots](#guest-bots) and [Inline Mode](#inline-requests) make specialized agents available where they are needed.
- [Bot-to-Bot Communication](#bot-to-bot-communication) and [Managed Bots](#managed-bots) enable delegation, coordination and complex multi-agent setups.
- [Business Bots](#business-bots) allow account automation with explicit rights, while [Mini Apps](#mini-apps) provide a richer workspace for configuration, approvals and dashboards.

> This page and the full [Bot API documentation](/bots/api) document itself are AI-friendly! If you'd like to build a bot but have limited coding experience, simply direct your favorite AI tool to read our documentation and help you get started.

-----

### Media and Messaging

Bots can create **polls and quizzes**, manage collaborative **checklists** and send rich media such as **Live Photos** – giving users more ways to interact with your service.

#### Polls and Quizzes

Polls are useful for collecting feedback, running surveys, testing knowledge or letting users choose what happens next. In addition to regular polls, bots can create quizzes and control how users participate.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400259/3/6devMXGy5_4.64419.jpg/daf64674e5523b9426" style="max-width: 400px;" title="10+ New Features for Polls" aria-label="10+ New Features for Polls" alt="Polls with media and additional participation options">
  <source src="/file/400780400118/1/j6mkunphO2E.7657802.mp4/b669e7300f659bd00a" type="video/mp4">
 </video>
</div>

> Bots can also add poll media or links, restrict participation and let users suggest new options. See [Poll](/bots/api#poll) and [sendPoll](/bots/api#sendpoll) for the full list of available options.

#### Checklists

With **checklists**, bots can help teams and individuals track tasks without leaving Telegram. They are useful for project handoffs, event preparation, moderation queues, shopping lists and other shared activities.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400269/3/sxD0KDicJWk.51274.jpg/7084e243a25b46704f" style="max-width: 400px;" title="Checklists" aria-label="Checklists" alt="Collaborative checklist with tasks and permissions">
  <source src="/file/400780400317/2/QZU-sxLjJoo.3068919.mp4/e44f8b16684e7f8bff" type="video/mp4">
 </video>
</div>

> You can check (pun intended) the [Checklist](/bots/api#checklist) documentation for all available features.

#### Live Photos

Bots can send **Live Photos** – a photo paired with a short video – and use them in albums and paid media. This is useful for eventful moments, product previews, interactive albums and other content where a still image does not do the shot justice.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400645/2/KJSuP7na3nY.63428.jpg/5bee0074b97571feb1" style="max-width: 400px;" title="Live and Motion Photos" aria-label="Live and Motion Photos" alt="Live and Motion Photos with paired movement">
  <source src="/file/400780400607/3/DyZaAN7_tWw.6352123.mp4/17bd9b603a88ed1e08" type="video/mp4">
 </video>
</div>

> See [LivePhoto](/bots/api#livephoto), [sendLivePhoto](/bots/api#sendlivephoto) and [sendMediaGroup](/bots/api#sendmediagroup) to get started.

-----

### Integration

There are various ways of further integrating bots with Telegram and other services.

* Use [Mini Apps](#mini-apps) to bring complete services into Telegram.
* Build tools and integrate [business services](#business-bots).
* Accept [Payments](#payments) via third-party payment providers that support integration with Bots and Mini Apps.
* Connect to Telegram using the [Web Login](#web-login) functionality.
* Create gaming bots by integrating [HTML5 Games](#html5-games).
* Help users create and manage [Telegram Stickers](#stickers-and-custom-emoji).

### Communities

Telegram's [Communities](https://telegram.org/blog/communities-editor-invisible-messages) feature connects several groups, channels and bots around a shared topic or audience.

Bot have extensive, granual chat management capabilities that can be useful for cross-chat onboarding, shared moderation workflows and community-wide notifications.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400627/2/m0_w0ABzq9E.64892.jpg/dd79c8957289c99b38" style="max-width: 400px;" title="Telegram Communities" aria-label="Telegram Communities" alt="Several Telegram chats linked in a Community">
  <source src="/file/400780400937/7/7FrlfQ3X9TA.9490984.mp4/905d7975740c1999ae" type="video/mp4">
 </video>
</div>

> See [Community](/bots/api#community), [CommunityChatAdded](/bots/api#communitychatadded), [CommunityChatJoined](/bots/api#communitychatjoined), [CommunityChatRemoved](/bots/api#communitychatremoved) and [ChatFullInfo](/bots/api#chatfullinfo) for the relevant objects and updates.

### Channel Direct Messages and Suggested Posts

Channels can have a dedicated forum-like directory for direct messages where users can privately **contact the channel** staff in a chat topic. Bots with the appropriate channel access can send messages to a specific such topic, identify the parent channel and respond to incoming messages.

Creators can also receive **suggested posts** from users in these chats. A bot can help prepare and review them, and can approve or decline incoming posts when it has `can_post_messages` or `can_manage_direct_messages`, respectively. 

> Bots can also send suggested posts to these topics, including a proposed price and send date.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; width: 100%;">
  <div class="blog_video_player_wrap" style="min-width: 0; margin: 20px 0;">
    <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400084/2/_hQwpV3CVP8.73487.jpg/9792f429add8851940" style="display: block; width: 100%; max-width: 400px;" title="Send Direct Messages to Channels" aria-label="Send Direct Messages to Channels" alt="Direct message conversation with a channel">
      <source src="/file/400780400969/4/8oSVHSECr78.2425074.mp4/8ee458c757ef489fa9" type="video/mp4">
    </video>
  </div>

  <div class="blog_video_player_wrap" style="min-width: 0; margin: 20px 0;">
    <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400950/4/YLPM09EO_4o.55471.jpg/fc5293959b524391a4" style="display: block; width: 100%; max-width: 400px;" title="Suggest Posts in Channels" aria-label="Suggest Posts in Channels" alt="Suggested post submitted to a channel">
      <source src="/file/400780400903/2/skvhS_XFJZk.2036621.mp4/73e913ba3d6f37bd45" type="video/mp4">
    </video>
  </div>
</div>

> See [DirectMessagesTopic](/bots/api#directmessagestopic), [SuggestedPostInfo](/bots/api#suggestedpostinfo), [SuggestedPostParameters](/bots/api#suggestedpostparameters), [approveSuggestedPost](/bots/api#approvesuggestedpost) and [declineSuggestedPost](/bots/api#declinesuggestedpost) for the relevant API objects and methods.

### Monetization
Telegram offers a **robust ecosystem** of monetization features, allowing any bot to support its development with **multiple revenue streams**.

#### Telegram Stars
Telegram Stars power all digital transactions between bots and users. Users can acquire Stars through in-app purchases via Apple and Google or via [@PremiumBot](https://t.me/premiumbot).

Bots can use the Stars they receive to [increase message limits](https://telegram.org/blog/dynamic-video-quality-and-more#increased-message-limits-for-bots), [send gifts](https://core.telegram.org/bots/api#sendgift) to users or [accept rewards](https://telegram.org/blog/monetization-for-channels) in Toncoin.
  
<div>
  <a href="/file/400780400296/3/gxdJYNSAgsg.335683/d6be0165da6f79d605" target="_blank"><img src="/file/400780400296/3/gxdJYNSAgsg.335683/d6be0165da6f79d605" title="Telegram Stars" alt="Telegram Stars used for bot transactions" width=50% class="dev_page_image" /></a>
</div>

#### Digital Products
Services can use their bot to sell **digital goods** and **services** – like online courses, commissioned artwork and **items in games**.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400936/3/oM0NSZq-c-U.70843/aabc7c9f3196368434" style="max-width: 400px;" title="Digital Products" aria-label="Digital Products" alt="Digital Products">
  <source src="/file/400780400194/6/alSNP8Zj18E.7354629.mp4/96b4d26b22e610c8bd" type="video/mp4">
 </video>
</div>

#### Paid Media
Bots can post **paid photos** and **videos** – users can view the media only after paying to unlock it. This functionality is available where the bot can send messages in the target chat, including channel chats where it has the relevant paid-media permission and chats managed through a Business Connection.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400191/2/d1Up_PAMRtA.54872/9d7869171e596471c0" style="max-width: 400px;" title="Paid Media" aria-label="Paid Media" alt="Paid Media">
  <source src="/file/400780400689/3/O_choNcIqzQ.3512508.mp4/70ade9ae08c6c523d7" type="video/mp4">
 </video>
</div>

#### Subscription Plans
Developers are able to **offer paid subscriptions** to their bot – adding **multiple tiers** of content and features tailored to their audience.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400439/3/fsIQBVDv8iM.42498/fb93eac0593624c6ff" style="max-width: 400px;" title="Subscription Plans" aria-label="Subscription Plans" alt="Subscription Plans for Bots">
  <source src="/file/400780400502/3/yVyvz2IBzwk.3397983.mp4/b34526a4a87a0e18cc" type="video/mp4">
 </video></div>
</div>

#### Revenue Sharing from Telegram Ads
Developers can participate in [revenue sharing](https://telegram.org/blog/monetization-for-channels) from [Telegram Ads](https://telegram.org/blog/monetization-for-channels#ton-based-ads) – receiving **50%** of the revenue from ads that appear in the chat with their bot.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400621/3/IdLKAeBBUUo.76649/09cee49e7c6f27dc54" style="max-width: 400px;" title="Revenue Sharing from Telegram Ads" aria-label="Revenue Sharing from Telegram Ads" alt="Revenue Sharing from Telegram Ads">
  <source src="/file/400780400184/3/rErQ9dD6_gk.1672517.mp4/5dd26de5a94919d747" type="video/mp4">
 </video>
</div>

### Mini Apps
[Mini Apps](webapps) allow developers to create flexible interfaces that can be launched right inside Telegram – integrating seamlessly with the app and bringing complete services into the chat.

If your bot is a mini app, you can add a prominent **Launch app** button as well as demo videos and screenshots to the bot’s profile. To do this, go to [@BotFather](https://t.me/botfather) and set up your bot's [Main Mini App](webapps#launching-the-main-mini-app).

> Mini apps are covered in detail in our [dedicated guide](webapps) – you should read it carefully to learn the wide variety of features they can offer.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay="" loop="" controls="" muted="" poster="/file/464001434/100bf/eWprjdgzEbE.100386/644bbea83084f44c8f" style="max-width: 400px;" title="Mini Apps" aria-label="Mini Apps" alt="Mini Apps">
  <source src="/file/464001679/11aa9/KQx_BlPVXRo.4922145.mp4/c65433c8ac11a347a8" type="video/mp4">
 </video>
</div>

If you develop a **mini app**, be sure to follow our [design guidelines](webapps#design-guidelines) – you'll want your custom interface to **seamlessly integrate** into the app to provide users the best possible experience.

> **Note:** "Mini Apps" were originally introduced as "Web Apps". For backward compatibility, certain Bot API types, parameter names (such as `web_app` or `WebAppInfo`), and documentation anchors may still use the legacy "web app" terminology. Both terms refer to the same feature.

#### Seamless Integration With Telegram
Mini apps integrate **seamlessly** with Telegram – from receiving detailed [theme settings](webapps#themeparams) to using native dialogs for reading [QR codes](webapps#initializing-mini-apps), controlling [biometrics](webapps#biometricmanager), sharing media [directly to stories](webapps#initializing-mini-apps) and more.

When opened from a [direct link](webapps#direct-link-mini-apps) in a group, mini apps can also use the `chat_instance` parameter to track the current context, supporting **shared usage** by multiple chat members – to create live whiteboards, group orders, multiplayer games and much more.

#### Mini App Previews
Developers can **upload screenshots** and **video demos** of their mini app right from the bot's **profile page** – giving users an overview of the app's features and functionality. These media previews will be shown to any user who **views your app** – like in the [Mini App Store](#mini-app-store) or via Search.

<div>
  <a href="/file/400780400954/6/9rSb8AM77Ss.158225/1c635ef877be7a6747" target="_blank"><img src="/file/400780400954/6/9rSb8AM77Ss.158225/1c635ef877be7a6747" title="Mini App Previews" alt="Mini App screenshots and video previews" width=50% class="dev_page_image" /></a>
</div>

> Previews support **multiple languages** – so you can upload **translated versions** of your previews that will be shown to users based on their **app language**.

#### Mini App Store
More than **500 million** out of Telegram's [950](https://t.me/durov/337) million users interact with mini apps every month. Successful mini apps have the chance to be **highlighted** in the Telegram Mini App Store – appearing for all users in the *'Apps'* tab of Search.

Featured mini apps are chosen based on how they **enrich the Telegram ecosystem**. To increase the chances of being featured, you must **enable** the [Main Mini App](https://core.telegram.org/bots/webapps#launching-the-main-mini-app) in [@BotFather](https://t.me/botfather), **upload** high-quality media demos showcasing your app to your bot's profile and **accept payments** in [Telegram Stars](https://telegram.org/blog/telegram-stars).

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay="" loop="" controls="" muted="" poster="/file/400780400572/1/KDOL4LVn0qU.46714/87e3de3384c284a00d" style="max-width: 400px;" title="Main Mini Apps" aria-label="Main Mini Apps" alt="Main Mini Apps">
  <source src="/file/400780400928/1/bb7CeIf11Es.6604686.mp4/ea45ba121b84766f1d" type="video/mp4">
 </video>
</div>

> Check out our documentation to learn more about [enabling Main Mini Apps](https://core.telegram.org/bots/webapps#launching-the-main-mini-app) and [accepting payments](https://core.telegram.org/bots/payments-stars) in Stars.

#### Home Screen Shortcuts
Users can place **direct shortcuts** to specific mini apps on the **home screen** of their devices – accessing their favorite games and services in **one tap**.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400665/3/ZuHweGNPf7A.70269/25510c5b11eae9f59c" style="max-width: 400px;" title="Home Screen Shortcuts" aria-label="Home Screen Shortcuts" alt="Home Screen Shortcuts">
  <source src="/file/400780400367/2/-_xiH7WxmNQ.4594686.mp4/5cd62ffa43c2e738cf" type="video/mp4">
 </video></div>
</div>

#### Customizable Loading Screens
The loading screen of mini apps can be **customized** in [@Botfather](https://t.me/botfather) – where developers can add **their own icon** and set **specific colors** for both light and dark themes.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400835/2/aRhKl3FcZ3E.36465/301b9f47850fd6a489" style="max-width: 400px;" title="Customizable Loading Screens" aria-label="Customizable Loading Screens" alt="Customizable Loading Screens">
  <source src="/file/400780400886/3/bjpTPLexlrk.1338212.mp4/77874dd70d1c0099e1" type="video/mp4">
 </video></div>
</div>

> To customize your loading screen, go to [@Botfather](https://t.me/botfather) > `/mybots` > Select bot > *Bot Settings* > *Configure Mini App* > *Configure Splash Screen*. You can tap on *Open Splash Screen Preview* to see the final result.

#### Full-Screen Mode
Mini apps are able to use the **entire screen** in portrait or **landscape orientation** – allowing for **immersive games** and media with **expanded gestures** and interfaces.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400978/2/DBP3J35bdpk.40489/3d98524f7a0706a481" style="max-width: 400px;" title="Full-Screen Mode" aria-label="Full-Screen Mode" alt="Full-Screen Mode">
  <source src="/file/400780400987/2/iCXS7IFB7Xs.8013492.mp4/c495193d239ce08990" type="video/mp4">
 </video></div>
</div>

#### Setting Emoji Status
Users can **set an emoji status** inside mini apps or give an app permission to **update it automatically**.

Developers can also integrate APIs from **other services** or request [geolocation access](https://core.telegram.org/bots/features#geolocation-access) – instantly changing a user's status when they start a game 🎮 or leave the office 💼. 

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400471/4/NxjzOa07Eyc.38651/62c7f445e0e06a4452" style="max-width: 400px;" title="Setting Emoji Status" aria-label="Setting Emoji Status" alt="Setting Emoji Status">
  <source src="/file/400780400995/4/5X1SreBoHEY.1731682.mp4/0e2f79c91e61b21b58" type="video/mp4">
 </video>
</div>

#### Sharing Media
Media generated in mini apps can be shared in **any chat** – letting users effortlessly send **referral codes** and **custom images** to contacts, groups and channels. Alternatively, users can [download it](https://core.telegram.org/bots/webapps#downloadfileparams) with a native popup.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400834/4/CMJLT3B0KV0.120338/ed91037a804d009c3b" style="max-width: 400px;" title="Sharing Media" aria-label="Sharing Media" alt="Sharing Media from Mini Apps">
  <source src="/file/400780400757/2/6oKoxK9dEqs.3807035.mp4/3fd29e918d7d3cb7fe" type="video/mp4">
 </video>
</div>

#### Sharing from Mini Apps to Stories
Any media created by the mini app, like whiteboard snapshots, leaderboards and AI-generated videos can be opened with the native story editor via the [shareToStory](webapps#initializing-mini-apps) method – for users to share as a [Telegram Story](https://telegram.org/tour/stories) right from the mini app.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay="" loop="" controls="" muted="" poster="/file/400780400371/4/l5lIymX0jZo.24285/0fe2981522348dce64" style="max-width: 400px;" title="Sharing from Mini Apps to Stories" aria-label="Sharing from Mini Apps to Stories" alt="Sharing media from mini apps to stories">
  <source src="/file/400780400676/1/yDZoLCZ9bKQ.3403169.mp4/6e2b8eca9d3a23cc64" type="video/mp4">
 </video>
</div>

> Mini apps also receive a number of **events**, allowing them to **instantly react** to actions by the user. You can learn more about which events are available [here](webapps#events-available-for-mini-apps).

#### Geolocation Access
Mini apps are able to receive **location permissions** from users – giving developers the ability to make **location-based games** and **interactive maps** for events.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400471/4/NxjzOa07Eyc.38651/62c7f445e0e06a4452" style="max-width: 400px;" title="Geolocation Access" aria-label="Geolocation Access" alt="Geolocation Access">
  <source src="/file/400780400995/4/5X1SreBoHEY.1731682.mp4/0e2f79c91e61b21b58" type="video/mp4">
 </video></div>
</div>

#### Device Motion Tracking
Mini Apps can request [acceleration](https://core.telegram.org/bots/webapps#accelerometer), [orientation](https://core.telegram.org/bots/webapps#deviceorientation) and [rotation](https://core.telegram.org/bots/webapps#gyroscope) data from devices in real time – unlocking support for **motion controls** and **VR experiences**.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400417/2/RaXcGRNXC0g.97571/e112d0d114f083f9b7" style="max-width: 400px;" title="Device Motion Tracking" aria-label="Device Motion Tracking" alt="Device Motion Tracking">
  <source src="/file/400780400950/2/822tco9D7ig.4744195.mp4/7581b18200d67c56a6" type="video/mp4">
 </video></div>
</div>

#### Device Hardware Info
A user's device can send [basic hardware info](https://core.telegram.org/bots/webapps#additional-data-in-user-agent) to mini apps, such as its processing power and memory capacity. Mini apps can then use this to **optimize graphics** and automatically **adjust settings** for the smoothest experience.

<div id="secretary-bots"></div>

### Business Bots
Bots can enable **Secretary Mode**, allowing users to connect the bot to their account so it can **process incoming messages** and, where permitted, **respond** on their behalf.

The **account owner** can specify which chats your bot can access. The [Business Bot rights](/bots/api#businessbotrights) control actions such as replying (`can_reply`), marking messages as read (`can_read_messages`) and deleting messages. Some actions are limited to eligible private chats with recent incoming messages and require a `business_connection_id`.

<div class="blog_video_player_wrap" style="max-width: 600px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted poster="/file/400780400639/5/dNX9ECFkOLs.2619159.png/cbaa22f22167d1451b" style="max-width: 600px;" title="Business Bots" aria-label="Business Bots" alt="Business Bot connection and permissions">
  <source src="/file/400780400052/3/jE-Kv05jrbA.2162030.mp4/fd1fd73a18777a5503" type="video/mp4">
 </video></div>
</div>

Here is a quick start guide for allowing users to connect your bot to their accounts:

* Enable **Secretary Mode** for your bot in [@BotFather](https://t.me/botfather).
* Handle incoming [BusinessConnection](https://core.telegram.org/bots/api#businessconnection) updates, signaling that a user has *established*, *edited* or *ended* a Business Connection with your bot. 
* Process business messages by handling ```business_message```, ```edited_business_message``` and ```deleted_business_messages``` updates. 
* Check your bot's permissions in the ```rights``` field of the latest [BusinessConnection](https://core.telegram.org/bots/api#businessconnection) update, including ```can_reply``` for sending and editing messages in private chats with incoming messages in the last 24 hours.
* If allowed to, use the ```business_connection_id``` field in [sendMessage](https://core.telegram.org/bots/api#sendmessage), [sendChatAction](https://core.telegram.org/bots/api#sendchataction) and other send methods to communicate on behalf of the Business user.

Users who **connect your bot** to their account will see a **quick action bar** at the top of each managed chat – tapping on "Manage Bot" will redirect them to your bot, which will receive a deep link message in the format ```/start bizChat<user_chat_id>```.

> Please keep in mind that operating bots on Telegram is subject to the [Telegram Bot Developer Terms of Service](https://telegram.org/tos/bot-developers). Specifically, for Telegram Business, make sure you have read and understood [Section 5.4](https://telegram.org/tos/bot-developers#5-4-telegram-business).

### Managed Bots

Telegram allows bots to create and **manage other bots** on behalf of their owners. You can choose an existing third-party bot as a manager or create your own.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted style="max-width: 400px;" title="Managed Bots" aria-label="Managed Bots" alt="AI Managed Bot">
  <source src="/file/400780400324/6/GkwTVCnGHaw.2913685.mp4/b5e8e586657ac3e204" type="video/mp4">
 </video></div>
</div>

> Your bot manager can allow users to seamlessly spin up their own personal **AI agents**, [business bots](#business-bots), games, custom productivity tools and more.

#### Creating Your Own Management Bot
To make your own management bot, simply do the following:

1. Choose one of your existing bots or [create a new bot](https://core.telegram.org/bots/features#creating-a-new-bot) via [@BotFather](https://t.me/botfather).
2. Open the bot's settings in BotFather’s [MiniApp](https://t.me/Botfather?startapp) and enable *'Bot Management Mode'*. 

#### Sharing Your Management Bot

Once enabled, you can allow others to utilize your bot to create and manage their own bots.

To do so, send users a link in this format:

    https://t.me/newbot/{manager_bot_username}/{new_username}?name={new_name}

<div><br></div>

For example, if the bot you created was called **@ManagerBot**, it could look like this – where `new_username` is a suggested placeholder for the user's new bot and `new_name` is a suggested display name:

    https://t.me/newbot/ManagerBot/CoolAIAgentBot?name=Cool+AI+Agent

When the user opens the link, they will see a window to finish creating their bot, where the bot's @username and display name are pre-filled, but editable. 

#### Using Your Management Bot
Once the user confirms the information, the bot is created:

- Your **@ManagerBot** receives a `managed_bot` update with a [ManagedBotUpdated](/bots/api#managedbotupdated) object.
- This object includes basic information on the new bot and its creator.
- You can use the Bot API method [getManagedBotToken](/bots/api#getmanagedbottoken) to fetch the bot's access token.
- You can use [replaceManagedBotToken](/bots/api#replacemanagedbottoken) to revoke the current token and generate a new one when needed.
- You can use [getManagedBotAccessSettings](/bots/api#getmanagedbotaccesssettings) and [setManagedBotAccessSettings](/bots/api#setmanagedbotaccesssettings) to view and update the managed bot's access settings.
- You can then control the new bot via the Bot API, receive and respond to messages, change its [profile](/bots/api#setmyprofilephoto), [settings](https://core.telegram.org/bots/api#setmycommands) and more.

### Bot-to-Bot Communication

On Telegram, bots generally **cannot see** messages from other bots. However, in specific contexts, Bot-to-Bot communication is **allowed** – unlocking complex agentic flows and AI-powered use cases.

> Regardless of context, you should make sure *Bot-to-Bot Communication Mode* is enabled for your bot in [@BotFather](https://t.me/botfather) to take full advantage of this feature.

##### Communication in Group Chats
A bot can interact with another bot within the same group by:

- Mentioning it in a command: `/command@OtherBot`.
- Replying directly to a message from the bot.

If at least one bot has *Bot-to-Bot Communication Mode* enabled, the receiving bot can receive and respond to the message.

Additionally, bots with *Bot-to-Bot Communication Mode* enabled will receive **all** messages from other bots in groups without explicit mentions or replies if they:

- Have admin rights in the group, or
- Have Group Privacy Mode disabled

> **Example**
>A contributor bot may request a code review from a reviewer bot and processes feedback directly in the group – optionally with human supervision.

##### Communication in Private Chats
Bots can send private messages to other bots by passing their `@username` to the [sendMessage](/bots/api#sendmessage) method.

This requires *Bot-to-Bot Communication Mode* to be enabled for both the sender and the recipient of the message.

> **Example**
>Two AI agent bots could coordinate directly via private messages to orchestrate a complex multi-step flow.

##### Communication via Business Accounts
If a bot is connected to a business account using *Chat Access Mode*, it can send messages to other bots used by that business account.

This requires *Bot-to-Bot Communication Mode* to be enabled for the bot that is sending the messages.

> **Example**
>Using another bot as a **tool** within business workflows – to book reservations, process customer queries, or perform complex tasks on behalf of a user.

#### Loop Prevention Requirements

Bot-to-bot communication can easily result in **infinite interaction loops**. When enabling this feature, you must implement safeguards to ensure interactions terminate.

**Recommended Safeguards**

- Deduplicate repeated messages.
- Apply rate limits (e.g., no more than one reply every few seconds per bot).
- Enforce maximum interaction depth or timeouts, both globally and per sender/receiver.

>⚠️ **Important**
>Your bot must remain stable even if another bot intentionally responds instantly and continuously.
>Failure to handle loops properly may lead to degraded performance or platform restrictions.

### Guest Bots

Telegram bots can enable **Guest Mode** to easily interact with users in any **group** or **private chat** on Telegram. This allows for seamless utility integration without the overhead of chat management or access to message history.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <div><video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay loop controls muted style="max-width: 400px;" title="Guest Bots" aria-label="Guest Bots" alt="Guest Bots" poster="/file/400780400097/2/Cfjt6tSE0UE.75990.jpg/e408f7a9eb1ff93736">
  <source src="/file/400780400507/2/HA9w0y-JaJA.4068142.mp4/72dbc63ed44ef9fe89" type="video/mp4">
 </video></div>
</div>

> To enable this feature, simply open your bot's settings in BotFather's [MiniApp](https://t.me/Botfather?startapp) and enable *'Guest Mode'*. 

#### Guest Interactions

When a user mentions a guest bot (e.g., `@botname`) in a supported chat or replies to one of its messages, the bot receives a dedicated update and is able to issue one reply. This allows the bot to:

- **Receive Context** from a dedicated update that includes the summoning message and, when present, the specific message it was replying to.
- **Respond Directly** with a message back to the chat where the interaction occurred, even without being a participant.

Guest mode **does not** grant access to a chat's message history or participant list. Similarly, the guest bot won't receive updates about future messages in the chat unless it is mentioned again or directly replied to.

> You can mention up to **3** guest bots in your message at the same time, allowing for more complex or cooperative agentic flows.

#### Use Cases: Guest Mode vs. Inline Mode

Telegram bots also support [Inline Mode](#inline-requests), which allows sending requests to bots right from the input field — from any chat on Telegram. 

The difference is that **Inline Mode** is for fetching or accessing content (e.g., gifs, quotes, articles) via a bot to send it *yourself* in one tap, while **Guest Mode** allows a bot to actively participate and independently reply *as itself* in any chat based on the relevant context.

**Guest Mode is ideal for:**

* **AI Assistants:** Summoning an agent to answer a specific question or carry out a task, reporting its progress back to the chat or group.
* **Contextual Tools:** Translation, fact-checking, and similar context-dependent or multi-step utilities.
* **Temporary Utility:** Bringing a bot's functionality into a chat briefly without cluttering the participant list, exposing messages or granting any permissions.

**Inline Mode is ideal for:**

* **Search & Share:** Finding and instantly sending content (e.g., try `@gif` or `@pic`) without leaving the current chat.
* **Quick Utilities:** Fetching calculations, formatting text, or checking quick stats on the fly.
* **Flexible Attachments:** Using inline Mini Apps (e.g., try `@durgerkingbot`) to attach or access interactive menus, complex interfaces and custom items on the fly.

### Payments

> If your bot or mini app sells **digital goods and services**, be sure to carry out the payment in [Telegram Stars](https://telegram.org/blog/telegram-stars) by specifying `XTR` as currency. In compliance with third-party store policies, Telegram does not support the sale of digital goods and services using other currencies.

Telegram bots can accept payments with a sleek, streamlined interface that collects all necessary data from the user. Telegram **doesn't collect** any payment data – like the user's credit card information – and sends it directly to one of the supported third-party [payment providers](payments).

Here is a **quick start guide** to implement payments:

- Pick a [provider](payments) and obtain the [proper token](payments#getting-a-token) as well as a **test token** from the "**Stripe TEST MODE**" provider.
- Implement payments via the [appropriate API methods](/bots/api#payments).
- Test your implementation by using your **test token** along with a [test credit card](https://stripe.com/docs/testing#cards).

Then, to issue an **invoice** and process the order flow:

- [Send an invoice](/bots/api#sendinvoice) to the user for the goods or services you are offering.
- Validate the order and accept the checkout via [answerPreCheckoutQuery](/bots/api#answerprecheckoutquery).
- Confirm the payment by checking for a [successful payment service message](/bots/api#successfulpayment).
- Ship the goods or provide the services.

For more details, feel free to check out our full exhaustive **guides** for selling goods and services on Telegram – they include live checklists, parameters and in-depth method descriptions:

- [Guide for digital goods and services](/bots/payments-stars)
- [Guide for physical goods and services](/bots/payments)

<div>
  <a href="/file/464001393/101fc/SB_bFCLR0tg.130549/7ecf91aaa44737e8cb" target="_blank"><img src="/file/464001393/101fc/SB_bFCLR0tg.130549/7ecf91aaa44737e8cb" title="Bot Payments" alt="Bot payment interface" class="dev_page_image" width=50% /></a>
</div>

> Telegram does not directly process the payments, does not store data about orders and does not collect any fees. Invoices are forwarded directly to the third-party payment provider.
For this reason, disputes must be solved between the user, the bot developer and the payment provider. You can read more about this in the [Privacy Policy](https://telegram.org/privacy#7-third-party-payment-services).

### Web Login
Telegram offers a **flexible**, **lightweight** and **free** framework to authenticate users on any website and app. This can be used to bridge your platform with Telegram, providing a smooth experience to your users. You can also freely rely on this framework to implement a **fast** and **signup-free** login on your site, regardless of its connection to Telegram.

#### Widgets
The Telegram login widget is a **simple and secure way to authorize users** on your website.

1. Choose a bot – ideally its name and profile pic **should match** the website title and logo.
2. Use the `/setdomain` command in [@BotFather](https://t.me/botfather) to pair the bot with your website domain. 
3. Configure your widget using [our dedicated tool](/widgets/login#widget-configuration) and embed it on your website.

#### Inline Login
When users open your website via an **inline button**, you can use the [login_url](/bots/api#loginurl) parameter as an alternative to login widgets. This way, you'll be able to [seamlessly authorize](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots) them on your website or app before the page even loads.

<div>
  <a href="/file/464001287/105ea/23bO4ntH4tc.43741/c9624e36c3462b6540" target="_blank"><img src="/file/464001287/105ea/23bO4ntH4tc.43741/c9624e36c3462b6540" width=50% title="Inline Login" alt="Inline login interface" class="dev_page_image" /></a>
</div>

> Make sure to review our [guide](/widgets/login#checking-authorization) on authenticating the received data as well as our [sample code](https://gist.github.com/anonymous/6516521b1fb3b464534fbc30ea3573c2).

### HTML5 Games
Bots can serve as **standalone gaming platforms** – with our [HTML5 Gaming API](/bots/api#games) you can develop multiplayer or single-player games and let your users have fun comparing **ranks**, **scores** and much more.

To get started, follow these simple steps:

- Send the `/newgame` command to [@BotFather](https://t.me/botfather)
- Provide a **description text**, an **image** or an **optional gif** to showcase its gameplay
- Send the game to users via the [sendGame](/bots/api#sendgame) method or via an [inline query](/bots/api#inlinequeryresultgame)
- When someone wants to play, you'll receive the appropriate `game_short_name` in a [CallbackQuery](/bots/api#callbackquery)
- To launch the game, provide the **HTML5 Game URL** as the `url` param of [answerCallbackQuery](/bots/api#answercallbackquery)

Then, to handle **highscores**:

- Use [setGameScore](/bots/api#setgamescore) to post high scores in the chat with the game
- Use [getGameHighScores](/bots/api#getgamehighscores) to get in-game high score tables

You can also **embed a share button** within your game, play around with **custom inline buttons**, **URL parameters** and much more. To get a better idea, make sure to check out:

- [HTML5 Games Manual](/bots/games)
- [HTML5 Games Bot API Docs](/bots/api#games)

<div>
  <a href="/file/464001558/11b92/y_Fu9QQWtj0.141959/dc9db48f66800bf271" target="_blank"><img src="/file/464001558/11b92/y_Fu9QQWtj0.141959/dc9db48f66800bf271" title="Games" alt="HTML5 game interface" width=50% class="dev_page_image" /></a>
</div>

> Check out [@GameBot](https://t.me/gamebot) and [@gamee](https://t.me/gamee) for examples of what you can do using our Gaming Platform.

### Stickers and Custom Emoji

[Stickers](https://core.telegram.org/stickers) and [Custom Emoji](https://telegram.org/blog/custom-emoji) are a distinctive Telegram feature used by millions of users to share artwork every day. Stickers and custom emoji take many forms – ranging from **basic images** to smooth **vector animations** and high-detail **.WEBM videos**.

All these formats are supported by our [Bot API](api#stickers), which allows bots to **create**, **edit**, **delete** and **share** new artwork packs on the fly. Telegram's [Import API](https://core.telegram.org/import-stickers) lets users **migrate packs** from other platforms and sticker apps.

**Creating a new pack**
To create a **new pack**, simply:

- **Prepare** your artwork following our [technical requirements](https://core.telegram.org/stickers).
- **Create** a new sticker pack via [createNewStickerSet](api#createnewstickerset). Set `sticker_type` to *regular* to create a sticker pack or to *custom emoji* to create a pack of custom emoji. Attach the [files](api#file) you wish to include in the pack as an array of [InputSticker](https://core.telegram.org/bots/api#inputsticker)
- You can use [addStickerToSet](api#addstickertoset) to add stickers or emoji later on.

**Additional features**
Regular stickers and custom emoji support **keywords** that users can type to quickly find the respective artwork – this can be useful when a sticker doesn't have obvious ties to a specific emoji. You can use the `keywords` parameter in [InputSticker](https://core.telegram.org/bots/api#inputsticker) to specify them.

Custom emoji additionally support **adaptive colors** – they will always match the current context (e.g., white on photos, accent color when used as status, etc.); to enable this feature, use the `needs_repainting` parameter in [createNewStickerSet](api#createnewstickerset).

Once you're done creating and sharing your artwork, don't forget to check out our [remaining sticker methods](api#stickers) to find out how to [edit](api#setstickersetthumbnail), [delete](api#deletestickerfromset) and even [reorder](api#setstickerpositioninset) your pack.

> Note that these methods will only work on packs **created by the bot that is calling them**.

<div id="advanced-formatting-options"></div>

### Messages and Formatting

Telegram bots can use a broad set of native text styling tools to send **richly formatted messages** in supported Telegram clients. Depending on the task, you can choose between lightweight regular messages and structured rich messages with headings, tables, media, documents, mathematical expressions and interactive controls.

Formatting is available on two levels:

- [**Rich Messages**](/bots/api#inputrichmessage) for advanced structured content
- [**Regular Messages**](/bots/api#sendmessage) for lightweight formatted text. 

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/400780400485/5/ZlL9lRtV5dg.45747.jpg/c564788bd371f0ac48" style="max-width: 400px;" title="Rich Text Formatting for Bots" aria-label="Rich Text Formatting for Bots" alt="Richly formatted bot message" vindex="1" preload="auto"> <source src="/file/400780400478/5/5rtLzULtA5E.3640041.mp4/a641a5c9d3290e2b78" type="video/mp4">
 </video>
</div>

> Send a message to [@RichTextDemoBot](https://t.me/richtextdemobot) to play around with an interactive **rich message** demo.

#### Rich Messages

Rich messages are designed for highly structured responses: reports, AI-streamed answers, documentation snippets, technical papers and similarly complex content.

These messages support both [**Rich Markdown**](/bots/api#rich-markdown-style) and [**Rich HTML**](/bots/api#rich-html-style). Rich Markdown follows GitHub Flavored Markdown where possible and can include supported HTML tags directly in the same message. Rich HTML gives bots granular control over even more formatting features with dedicated tags.

[Supported styles](/bots/api#rich-markdown-style) include:

- Headings, paragraphs, dividers, lists and task lists.
- Deeply nested inline formatting, including bold, italic, underline, strikethrough, spoiler, code, subscript and superscript.
- Tables with alignment, captions, borders, striped styling, column/row spans and more.
- Media blocks for photos, videos, docs and audio files – with captions and credits.
- Block quotes, pull quotes, collapsible details blocks, anchors and in-document links
- Footnotes and referenced text.
- Extensive LaTeX support, including both inline and as block formulas.
- Maps with custom coordinates, collages, slideshows and more.

> See [here](/bots/api#rich-message-formatting-options) for the full syntax grammar with examples.

Rich messages also support **multiple embedded buttons**. This lets bots create **interactive flows** for anything from surveys, games, and horoscopes to viewing and ordering products – all in a single message.

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" loop="" muted="" poster="/file/400780400707/6/59tqj-7zkUI.67925.jpg/8f9328dc5077455151" style="max-width: 400px;" title="Inline Buttons" aria-label="Inline Buttons" alt="Inline Buttons" vindex="1" preload="auto"> <source src="/file/400780400139/7/vJgWIvqqzxA.3710126.mp4/718db1a1f9ad8f5cdf" type="video/mp4">
 </video>
</div>

> Rich and [ephemeral](#ephemeral-messages) messages can be combined to build **personalized** and **interactive** flows within a single group or channel message.

#### Regular Messages

Regular [messages](/bots/api#sendmessage) are simpler and more lightweight versions of their rich counterparts. They support [**MarkdownV2**](/bots/api#markdownv2-style) and [**HTML**](/bots/api#html-style) formatting – concise styles that are the best choice for short text, confirmations, simple chat flows and other content that does not require complex structure.

Regular messages are simpler to work with for basic use cases and support exclusive interactions like [partial quotes](https://telegram.org/blog/reply-revolution#reply-revolution) and **quoting messages to other chats**.

> See [here](/bots/api#formatting-options) for the full syntax grammar with examples.

### Language Support
Bots can tailor their interfaces to **support multiple languages** – updating inputs and information on the fly. A user’s [language_code](/bots/api#user) is included in every relevant [update](/bots/api#update) as an [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag), allowing bots to adapt accordingly. 

We recommend that you follow our guidelines to provide **the best user experience**.

- Your interfaces, texts and [inline results](/bots/api#answerinlinequery) should adapt seamlessly to the *language_code*, without user intervention.
- Connected [WebApps](/bots/webapps) will receive the user's *language_code* – your HTML page should account for it.
- [HTML5 Games](/bots/games) can obtain language information if you specify it as a [URL parameter](/bots/games#using-url-parameters). You can generate this parameter from the *language_code* field in the [User](/bots/api#user) object served with the initial game [CallbackQuery](/bots/api#callbackquery).
- The bot's **Name**, **Description** and **About text** can be natively localized with the respective [methods](https://core.telegram.org/bots/api#setmydescription).
- Command lists can also be specified for individual languages – more on this [here](#commands).

<div class="blog_video_player_wrap" style="max-width: 400px; margin: 20px auto 20px;">
 <video class="blog_video_player tl_blog_vid_autoplay" onclick="videoTogglePlay(this)" autoplay="" loop="" controls="" muted="" poster="/file/464001822/10cd0/EvtvjnhA-kA.132475/e285952b505535d85a" style="max-width: 400px;" title="Language Support" aria-label="Language Support" alt="Language Support">
  <source src="/file/464001083/105cd/NF4ViAHfTJc.3601652.mp4/0fd787953c11a6371d" type="video/mp4">
 </video>
</div>

> The *language_code* is an **optional field** – it could be empty.
If you target the general public, your code should always fall back to either the last recorded language tag or English (in this order) when the field is missing for a specific user. 

----

### Bot Management

#### Privacy Mode
Bots are frequently added to groups to perform basic tasks or assist moderators – like automatically posting company announcements or even celebrating birthdays. By default, **all bots** added to groups run in Privacy Mode and only see relevant messages and commands:

- Commands explicitly meant for them (e.g., `/command@this_bot`).
- General commands (e.g. `/start`) if the bot was the last bot to send a message to the group.
- Inline messages sent [via](/bots/api#inline-mode) the bot.
- Replies to any messages implicitly or explicitly meant for this bot.

All bots will also receive, **regardless of privacy mode**:

- All service messages.
- All messages from private chats.
- All messages from channels where they are a member.

Privacy mode is **enabled by default** for all bots, except bots that were added to a group as admins (bot admins always receive **all messages**). It can be disabled so that the bot receives all messages like an ordinary user (the bot will need to be re-added to the group for this change to take effect). We only recommend doing this in cases where it is **absolutely necessary** for your bot to work. In most cases, using the force reply option for the bot's messages should be more than enough.

<div>
  <a href="/file/464001338/107af/JdbERa0BATg.62371/28977e9a96aed3860a" target="_blank"><img src="/file/464001338/107af/JdbERa0BATg.62371/28977e9a96aed3860a" title="Privacy Mode" alt="Bot privacy mode in a group" class="dev_page_image" width=50%/></a>
</div>

> This mode not only increases user privacy, but also makes the bot more efficient by reducing the number of inputs it needs to process. Users can always see a bot’s current privacy setting in the list of group members.

### Testing your bot

You can quickly test your bot **without interfering** with its users by simply running another instance of your code on a different bot account. To do so, create a *new bot* via [@BotFather](https://t.me/botfather), obtain its token and use it in the testing instance of your code.

All further testing and debugging can happen privately on the new bot, without affecting the original instance.

> If you need to share file references across bots, note that the `file_id` field is tied to a single bot id, so your test instance cannot use a shared `file_id` database to quickly send media – files must be individually reuploaded.

#### Dedicated test environment

Telegram also offers a dedicated **test environment** suitable for more advanced testing. Bots and users in this environment generally have more flexible restrictions – for example:

* When working with the test environment, you may use HTTP links without TLS for testing your [Web Apps](https://core.telegram.org/bots/features#mini-apps) or [Web Login](https://core.telegram.org/bots/features#web-login). Production links should use HTTPS.

> **Flood limits** are not raised in the test environment, and may at times be stricter. To minimize how this impacts your bot, you should make sure that it handles errors with retry policies and does not depend on hardcoded limit values.

#### Creating a bot in the test environment

The test environment is **completely separate** from the main environment, so you will need to create a new user account and a new bot with [@BotFather](https://t.me/botfather).

To create an account and log in, use either of the following:

- **iOS**: tap 10 times on the Settings icon > Accounts > Login to another account > Test.
- **Telegram Desktop**: open ☰ Settings > Shift + Alt + Right click 'Add Account' and select 'Test Server'.
- **macOS**: click the Settings icon 10 times to open the Debug Menu, ⌘ + click 'Add Account' and log in via phone number.

After logging in, simply [create a new bot](#creating-a-new-bot) following the standard procedure and send your requests to the Test Bot API in this format:

    https://api.telegram.org/bot<token>/test/METHOD_NAME
    
> When working with the test environment, you may use HTTP links without TLS in the `url` field of both [LoginUrl](/bots/api#loginurl) and [WebAppInfo](/bots/api#webappinfo).

#### Status alerts
Millions choose Telegram for its speed. To best benefit users, your bot also **needs to be responsive**. In order to help developers keep their bots in shape, [@BotFather](https://t.me/botfather) will send **status alerts** if it sees something is wrong.

We check the number of replies and the *request/response* conversion rate for popular bots (~300 requests per minute, this value may change in the future). If your bot returns an **abnormally low number**, you will receive a notification from [@BotFather](https://t.me/botfather).

##### Responding to alerts
By default, **you will only get one alert per bot per hour**. 

Each alert has the following buttons:

- **Fixed** - Use this if you found an issue with your bot and fixed it. If you press the fix button, we will resume sending alerts in the regular way so that you can see if your fix worked within 5-10 minutes instead of having to wait for an hour.
- **Support** - Use this to open a chat with [@BotSupport](https://t.me/botsupport) if you don't see any issues with your bot or if you think the problem is on our side.
- **Mute for 8h/1w** - Use this if you can't fix your bot at the moment. This will disable all alerts for the bot in question for the specified period of time. **We do not recommend** using this option since your users may migrate to a more stable bot. You can unmute alerts in your bot's settings via [@BotFather](https://t.me/botfather).

##### Monitored issues
We currently notify you about the following issues:

- **Too few private messages are sent.** - Your bot is sending far fewer messages than it did in previous weeks. This is useful for newsletter-style bots that send messages without prompts from users. The larger the value, the more significant the difference.

- **Too few replies to incoming private messages**. - Your bot is not replying to all messages that are being sent to it (the request/response conversion rate for your bot was too low for at least two of the last three 5-minute periods). 

> To provide a good user experience, please respond to all messages that are sent to your bot. Respond to message updates by calling send… methods (e.g. [sendMessage](/bots/api#sendmessage)).

- **Too few answers to inline queries**. - Your bot is not replying to all inline queries that are being sent to it, calculated in the same way as above. Respond to `inline_query` updates by calling [answerInlineQuery](/bots/api#answerinlinequery).

- **Too few answers to callback queries**.
- **Too few answers to callback game queries**. - Your bot is not replying to all callback queries that are being sent to it (with or without games), calculated in the same way as above. Respond to `callback_query` updates by calling [answerCallbackQuery](/bots/api#answercallbackquery).

#### Local Bot API
You can host and work with **your own instance** of our open-source [Bot API](/bots/api).
The **source code** is available [here](https://github.com/tdlib/telegram-bot-api), along with a quick [installation guide](https://github.com/tdlib/telegram-bot-api#installation).

After **installing the server**, remember to use the [logOut](/bots/api#logout) method before **redirecting requests** to your new local API URL.

> Your local instance accepts HTTP requests, so a TLS termination proxy has to be used to handle remote HTTPS requests. See the installation guide for the port and other server settings.

By hosting our API locally you'll gain access to **some upgrades**, including:

|API|Max File Download|Max File Upload|WHook URL|WHook Port|WHook Max Connections|
|-----|
|[Official](/bots/api#making-requests)|20MB|50MB|HTTPS|443,80,88,8443|1-100|
|[Local](/bots/api#using-a-local-bot-api-server)|Unlimited|2000MB|HTTP|Any port|1-100000|

> You can find an exhaustive list [here](/bots/api#using-a-local-bot-api-server).
All limits may be subject to change in the future, so make sure to follow [@BotNews](https://t.me/botnews).

-----

### BotFather
Below is a detailed guide to using [@BotFather](https://t.me/botfather), Telegram’s tool for **creating** and **managing** bots.

> In addition to the instructions below, consider using the [@BotFather Mini App](https://t.me/botfather?startapp). It provides equivalent functionalities with a more modern and streamlined UI.

#### Creating a new bot
Use the `/newbot` command to create a new bot. [@BotFather](https://t.me/botfather) will ask you for a name and username, then generate an authentication token for your new bot.

- The **name** of your bot is displayed in contact details and elsewhere.

- The **username** is a short name, used in search, mentions and t.me links. Usernames are 5-32 characters long and not case sensitive – but may only include Latin characters, numbers, and underscores. Your bot's username must end in 'bot’, like 'tetris_bot' or 'TetrisBot'.

- The **token** is a string, like `110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`, which is required to authorize the bot and send requests to the Bot API. Keep your token secure and store it safely, it can be used by anyone to control your bot. 

> Unlike the bot’s name, the username cannot be changed later – so choose it carefully.
When sending a request to api.telegram.org, remember to prefix the word ‘bot’ to your token.

#### About text, description and profile media
When new users open your bot, they will be met with a helpful description in a box titled "What can this bot do?".

Properly [setting this field](#edit-bots) in [@BotFather](https://t.me/botfather) allows everyone to immediately get an idea of what your bot can do – your description should be **brief**, **to the point** and **on topic**.
> You can also add a photo or video to this field with `Edit Description Picture` in [@BotFather](https://t.me/botfather).

Additionally, just like normal users, bots also come with a **short bio** available on their profile. If you didn't specify this field while first creating your bot, you can set it at any time with the `/setabouttext` command in [@BotFather](https://t.me/botfather). Users can interact with many bots and they won't have access to their description after starting them – having a quick reminder of the bot's purpose can be very useful.

>Note that both the **Description** and the **About text** can be [natively localized](https://core.telegram.org/bots/api#setmydescription) – each user will automatically see the correct translation for their language.

Bots can also have a **profile picture** – you should pick something unique and original so that users can find it in their chat list at a glance.

> You can also edit your bot directly from its profile page – including setting a custom **profile video**.

#### Generating an authentication token
If your existing token is **compromised** or **you lost it** for some reason, use the `/token` command to generate a new one.

#### Transfer ownership
You can transfer ownership of your bot **to another user**. 
To do this, send `/mybots`, select your bot, then *transfer ownership*.
You can only transfer a bot to users who have interacted with it at least once.

> Transferring ownership will give full control of the bot to another user – they will be able to access the bot’s messages and even delete it. The transfer is permanent, so please consider it carefully.

#### Edit bots
To edit your bot, you have two options.

You can use the available commands:

- /setname – change your bot's **name**.
- /setdescription – change the bot's **description** (short text up to 512 characters). Users will see this text at the beginning of the conversation with the bot, titled '*What can this bot do?*'.
- /setabouttext – change the bot's **about info**, a shorter text up to 120 characters. Users will see this text on the bot's profile page. When they share your bot with someone, this text is sent together with the link.
- /setuserpic – change the bot's **profile picture**. 
- /setcommands – change the list of **commands** supported by your bot. Users will see these commands as suggestions when they type `/` in the chat with your bot. See [commands](#commands) for more info.
- /setdomain – link a **website domain** to your bot. See the [login widget](#widgets) section.
- /deletebot – delete your bot and **free its username**. Cannot be undone.

> Note that new commands for editing your bot may be added at any time. The latest reference for the full list of available commands is [@BotFather](https://t.me/botfather) itself (simply type `/` in the input field to see the full list).

These settings can also be edited via an interactive inline interface accessed via the `/mybots` command. Alternatively, you can edit your bot's public-facing information directly from its profile page – including setting a custom **profile video**. 

> Alternatively, you can use the [@BotFather Mini App](https://t.me/botfather?startapp). It provides equivalent functionalities with a modern and streamlined UI.

#### Edit settings

- /setinline    – toggle **inline mode** for your bot.
- /setinlinegeo – request **location data** to provide location-based inline results.
- /setjoingroups – toggle whether your bot can be **added to groups** or not. All bots must be able to process direct messages, but if your bot was not designed to work in groups, you can disable this.
- /setinlinefeedback – toggle whether the API should **send updates about the results** chosen by users. See an in-depth explanation [here](/bots/inline#collecting-feedback).
- /setprivacy – set which messages your bot will receive when added to a group. See [privacy-mode](#privacy-mode) for more info.

> Note that new commands for editing advanced bot settings may be added at any time. The latest reference for the full list of available commands is [@BotFather](https://t.me/botfather) itself (simply type `/` in the input field to see the full list).

#### Manage games

- /newgame    – create a new game.
- /listgames  – see a list of your games.
- /editgame   – edit a game.
- /deletegame – delete an existing game.

> Please note that it may take a few minutes for changes to take effect.

-----

With this information, you are ready to proceed to our [Full API Reference for Developers](/bots/api).

- If you have any questions, check out our [Bot FAQ](/bots/faq).
- If you're experiencing issues with our Bot API, please contact [@BotSupport](https://t.me/botsupport) on Telegram.

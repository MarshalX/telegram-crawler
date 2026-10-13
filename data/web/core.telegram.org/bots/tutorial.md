# From BotFather to &#39;Hello World&#39;


This guide will walk you through everything you need to know to build your first **Telegram Bot**.
If you already know your way around some of the basic steps, you can jump directly to the part you're missing. Equivalent examples are available in [C#](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.cs), [Python](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.py), [Go](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.go) and [TypeScript](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/tree/main/Nodejs) .

- [Introduction](#introduction)
- [**Basic Tutorial**](#getting-ready)

<div id="dev_page_content">

<ul style="padding-left: 30px;">
<li style="margin-top: -5px"><a href="#getting-ready">Environment</a></li>
<li><a href="#first-run">First Run</a></li>
<li><a href="#echo-bot">Echo Bot</a></li>

</ul>
</div>

- [**Advanced Tutorial**](#executing-commands)

<div id="dev_page_content">
<ul style="padding-left: 30px;">
<li style="margin-top: -5px"><a href="#executing-commands">Commands</a></li>
<li><a href="#navigation">Navigation</a></li>
<li><a href="#database">Database</a></li>
<li><a href="#hosting">Hosting</a></li>

</ul>
</div>

- [Further Reading](#further-reading)

___

### Introduction
At its core, you can think of the Telegram [Bot API](api) as software that provides [JSON-encoded](https://en.wikipedia.org/wiki/JSON) responses to your queries.

A bot, on the other hand, is essentially a routine, software or script that queries the API by means of an [HTTPS request](/bots/api.md#making-requests) and waits for a response. There are several types of [requests](api#available-methods) you can make, as well as many different [objects](api#available-types) that you can use and receive as responses.

Since **your browser** is capable of sending HTTPS requests, you can use it to quickly try out the API. After [obtaining your token](#obtain-your-bot-token), try pasting this string into your browser:

    https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe

In theory, you could interact with the API with **basic requests** like this, either via your browser or other tailor-made tools like [cURL](https://curl.se/). While this can work for simple requests like the example above, it's not practical for larger applications and doesn't scale well.
For that reason, this guide will show you how to use [libraries and frameworks](samples), along with some **basic programming skills**, to build a more robust and scalable project.

If you know how to code, you'll fly right through each step in no time – and if you're just starting out, this guide will show you everything you need to learn.

>We will use [Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29) throughout this guide as it's one of the most popular programming languages, however, you can follow along with any language as all the steps are fundamentally the same.
Since Java is fully cross-platform, each code example will work with any operating system.
If you pick another language, equivalent examples are available in [C#](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.cs), [Python](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.py), [Go](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.go) and [TypeScript](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/tree/main/Nodejs) .

### Getting Ready

First, we will briefly cover how to **create your first project**, obtain your **API token** and download all necessary **dependencies and libraries**.

For the purposes of this guide, a copy of the bot you will be creating is also live at [@TutorialBot](https://t.me/tutorialbot) – feel free to check it out along the way to see how your own implementation should look after each step.

#### Obtain Your Bot Token

In this context, a **token** is a string that authenticates your bot (not your account) on the bot API. Each bot has a unique token which can also be revoked at any time via [@BotFather](https://t.me/botfather).

Obtaining a token is as simple as contacting [@BotFather](https://t.me/botfather), issuing the `/newbot` command and following the steps until you're given a new token. You can find a step-by-step guide [here](features#creating-a-new-bot).

Your token will look something like this:

    4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc

> Make sure to save your token in a secure place, treat it like a password and **don't share it with anyone**.

#### Download an IDE
To program in Java you'll need an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) – a special text editor that will let you write, compile and run your code.
In this tutorial, we'll use IntelliJ – there are several free, open source alternatives like [Eclipse](https://www.eclipse.org/ide/) or [NetBeans](https://netbeans.apache.org/download/index.html) which work in the exact same way.

You will also need a [JDK](https://en.wikipedia.org/wiki/Java_Development_Kit), a software kit that allows your Java code to run.
Most IDEs don't include a JDK, so you should download a version compatible with your operating system separately. You can find a free, open source version [here](https://adoptium.net/temurin/releases/).

> If you use another language, the steps are identical. You will just have to download a different IDE and software development kit.

#### Pick a Framework or Library

You can think of a framework as software that handles all the low-level logic for you, including the API calls, and lets you focus on your bot-specific logic.

In this tutorial, we'll use [TelegramBots](https://github.com/rubenlagus/TelegramBots), but you can follow along with any equivalent implementation, since all the underlying methods are either similar or exactly the same.

> You can find many frameworks, along with code examples, in [our dedicated list](samples).

#### Create Your Project

In IntelliJ, go to `File > New > Project`.

Fill in the fields accordingly:

- **Name** - The name of your project. For example, *BotTutorial*.
- **Location** - Where to store your project. You can use the default value.
- **Language** - Java
- **Build System** - The framework that will handle your dependencies. Pick *Maven*.
- **JDK** - Pick whichever version you downloaded. We'll be using version *17*.
- **Add Sample Code** - Leave this **selected**, it will generate some needed files for you.
- **Advanced Settings > GroupId** - We suggest *tutorial*.
- **Advanced Settings > ArtifactId** - You can use the default value.

After hitting *Create*, if you did everything correctly, your **Project** view in the top left should show a **project structure** along these lines:

    BotTutorial
    ├─ .idea
    ├─ src
    │  └─ main
    │     └─ java
    │        └─ tutorial
    │           └─ Main
    └─ pom.xml

> Other IDEs will follow a similar pattern. Your dependency management system will have a different name (or no name at all if it's built-in) depending on the language you chose.

If this looks scary, don't worry. We will only be using the `Main` file and the `pom.xml` file.
In fact, to check that everything is working so far, double click on *Main* and click on the small green arrow on the left of *public class Main*, then select the first option.
If you followed the steps correctly, *Hello world!* should appear in the console below.

#### Add Framework Dependency

We will now instruct the IDE to download and configure everything needed to work with the API.
This is very easy and happens automatically behind the scenes.

First, locate your `pom.xml` file on the left side of the screen.
Open it by double-clicking and simply add:

    <dependencies>
        <dependency>
            <groupId>org.telegram</groupId>
            <artifactId>telegrambots</artifactId>
            <version>6.0.1</version>
        </dependency>
    </dependencies>
    
right after the `</properties>` tag.

When you're done, your `pom.xml` should look something like [this](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/pom.xml).

### Start Coding
We are ready to start coding. If you're a beginner, consider that being familiar with your language of choice will greatly help. With this tutorial, you'll be able to teach your bot basic behaviors, though more advanced features will require some coding experience.

#### Creating a Bot Class

If you're familiar with [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), you'll know what a class is. 
If you've never heard of it before, consider a class as a file where you write some logic.

To **create the class** that will contain the bot logic, right click on *tutorial* from the project tree on the left and select *New > Java Class*. Name it *Bot* and hit enter.

Now we have to connect this class to the bot framework. In other words, we must make sure it extends `TelegramLongPollingBot`. To do that, just add *extends TelegramLongPollingBot* right after *Bot*.
A red line will appear – it simply means we're missing some important methods.

To fix this, hover over the red line, click on *implement methods*, then hit OK. 
Depending on the IDE, this option may be called *implement missing methods* or something similar.

You should end up with this – if something went wrong, feel free to copy it from here and paste it in your class:

    package tutorial;
    import org.telegram.telegrambots.bots.TelegramLongPollingBot;
    import org.telegram.telegrambots.meta.api.objects.Update;

    public class Bot extends TelegramLongPollingBot {

      @Override
      public String getBotUsername() {
          return null;
      }

      @Override
      public String getBotToken() {
          return null;
      }

      @Override
      public void onUpdateReceived(Update update) {}
     
    }

> If you get a red line under TelegramLongPollingBot, it means you didn't set up your pom.xml correctly. If this is the case, restart from [here](#add-framework-dependency).

#### Available Methods
Let's look into these 3 methods one by one.

- **getBotUsername** - This method must be edited to always return your bot's username. You should replace the *null* return value with it.
- **getBotToken** - This method will be used by the framework to retrieve your bot token. You should replace the *null* return value with the token.
- **onUpdateReceived** - This is the most important method. It will be called automatically whenever a new Update is available. Let's add a `System.out.println(update);` call in there to quickly show what we are getting.

After you've replaced all the strings, you should end up with this:

    @Override
    public String getBotUsername() {
        return "TutorialBot";
    }

    @Override
    public String getBotToken() {
        return "4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc";
    }

    @Override
    public void onUpdateReceived(Update update) {
        System.out.println(update);
    }

At this point, the bot is configured and ready to go – time to register it on the API and start processing updates.

>In the future, you should consider storing your token in a dedicated settings file or in [environment variables](https://en.wikipedia.org/wiki/Environment_variable). Keeping it in the code is fine for the scope of this tutorial, however, it's not very versatile and is generally considered bad practice. 

#### Registering the Bot

To **register the bot** on the API, simply add a couple of lines **in the main method** that will launch the application. If you named your class `Bot`, this is what your main method should look like:

    public static void main(String[] args) throws TelegramApiException {
      TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
      botsApi.registerBot(new Bot());
    }

>You can place this method in any class. Since we have an auto-generated `main` method in the Main class, we'll be using that one for this tutorial.

### First Run
It's time to **run your bot** for the first time. 
Hit the green arrow to the left of `public static void main` and select the first option.

*And then there was nothing*. Yes, a bit anticlimactic.
This is because your bot **has nothing to print** – there are **no new updates** because nobody messaged it yet.

If you try messaging the bot on Telegram, you'll then see **new updates** pop up in the console. At this point, you have your very own Telegram Bot – quite the achievement. Now, on to making it a bit more intelligent.

> If nothing pops up, make sure you messaged the right bot and that the token you pasted in the code is correct.

### Receiving Messages

Every time someone sends a **private message** to your bot, your `onUpdateReceived` method will be called automatically and you'll be able to handle the `update` parameter, which contains the **message**, along with a great deal of other info which you can see detailed [here](api#update).

Let's focus on two values for now:

- **The user** - Who sent the message. Access it via `update.getMessage().getFrom()`.
- **The message** - What was sent. Access it via `update.getMessage()`.

Knowing this, we can make it a bit more clear in the **console output**.

    @Override
    public void onUpdateReceived(Update update) {
        var msg = update.getMessage();
        var user = msg.getFrom();
        
        System.out.println(user.getFirstName() + " wrote " + msg.getText());
    }
 
This is just a basic example – you can now play around with all the methods to see everything you can pull out of these objects. You can try `getUsername`, `getLanguageCode`, and dozens more.

Knowing how to receive, process and print **incoming messages**, now it's time to learn how to **answer them**.
 > Remember to stop and re-launch your bot after each change to the code.

### Sending Messages

To send a private text message, you generally need **three things**:

- The user **must** have contacted your bot first. (Unless the user sent a join request to a group where your bot is an admin, but that's a more advanced scenario).
- You **must** have previously saved the **User ID** (`user.getId()`)
- A `String` object containing the message text, 1-4096 characters.

With that out of the way, let's create a **new method** to send the first message:

    public void sendText(Long who, String what){
       SendMessage sm = SendMessage.builder()
                        .chatId(who.toString()) //Who are we sending a message to
                        .text(what).build();    //Message content
       try {
            execute(sm);                        //Actually sending the message
       } catch (TelegramApiException e) {
            throw new RuntimeException(e);      //Any error will be printed here
       }
    }

And proceed to run this in the `main` method, right after registering the bot.
For this example, we'll assume your User ID is `1234`.

    public static void main(String[] args) throws TelegramApiException {
       TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
       Bot bot = new Bot();                  //We moved this line out of the register method, to access it later
       botsApi.registerBot(bot);            
       bot.sendText(1234L, "Hello World!");  //The L just turns the Integer into a Long
    }
    
If you did everything correctly, your bot should text you *Hello World!* every time you launch your code. Sending messages to groups or channels – assuming you have the relevant permissions – is as simple as replacing `1234` with the ID of the respective chat.

>Try experimenting with other types of messages, like SendPhoto, SendSticker, SendDice...
A full list is available starting [here](/bots/api/methods/sendmessage.md).

### Echo Bot

Let's practice everything we tried so far by coding an **Echo Bot**. 
Its functionality will be rather simple: every text message it receives will be sent right back to the user.

#### Copying Text
The most intuitive way of coding this is saving the User ID and calling `sendText` right after each update.

In other words:

    @Override
    public void onUpdateReceived(Update update) {
        var msg = update.getMessage();
        var user = msg.getFrom();
        var id = user.getId();
        
        sendText(id, msg.getText());
    }
    
This works for text but can be extended to stickers, media and files.

#### Copying Everything
There are more specific functions that can be used to copy messages and send them back.
Let's build a method to do just that:

    public void copyMessage(Long who, Integer msgId){
       CopyMessage cm = CopyMessage.builder()
       		   .fromChatId(who.toString())  //We copy from the user
               .chatId(who.toString())      //And send it back to him
               .messageId(msgId)            //Specifying what message
               .build();
        try {
            execute(cm);
        } catch (TelegramApiException e) {
            throw new RuntimeException(e);
        }
    }
    
After replacing the method call in`onUpdateReceived`, running the code will result in a fully functional **Echo Bot**.
    
> This tutorial assumes that updates always contain messages for the sake of simplicity. This may not always be true – be sure to implement all the proper checks in your code to handle every type of update with the appropriate methods.

### Executing Commands

To learn what a command is and how it works, we recommend reading this [dedicated summary](features#commands).
In this guide, we'll focus on the technical side of things.

#### Creating Your Command
Begin by opening [@BotFather](https://t.me/botfather). 
Type `/mybots` > *Your_Bot_Name* > Edit Bot > Edit Commands.

Now send a new command, followed by a brief description.
For the purpose of this tutorial, we'll implement two simple commands:

    scream - Speak, I'll scream right back 
    whisper - Shhhhhhh

#### Command Logic
We want the **Echo Bot** to reply in uppercase when it's in **scream mode** and normally otherwise.

First, let's **create a variable** to store the current mode.

    public class Bot extends TelegramLongPollingBot {

       private boolean screaming = false;
       
       [...]
    }
    
Then, let's change some logic to **account for this mode**.

    public void onUpdateReceived(Update update) {
   	 [...]                                   //Same variables as the previous versions
       if(screaming)                            //If we are screaming
           scream(id, update.getMessage());     //Call a custom method
       else
           copyMessage(id, msg.getMessageId()); //Else proceed normally
    }
     
    private void scream(Long id, Message msg) {
       if(msg.hasText())
           sendText(id, msg.getText().toUpperCase());
       else
           copyMessage(id, msg.getMessageId());  //We can't really scream a sticker
    }

Finally, let's add a couple more lines to the `onUpdateReceived` method to process each command before replying.

    if(msg.isCommand()){ 
       if(msg.getText().equals("/scream"))         //If the command was /scream, we switch gears
          screaming = true;
       else if (msg.getText().equals("/whisper"))  //Otherwise, we return to normal
          screaming = false;
       
       return;                                     //We don't want to echo commands, so we exit
    }

As you can see, it checks if the message **is a command**. If it is, the bot enters **scream mode**.
In the update method, we check **which mode we are in** and either copy the message or convert it to upper case before **sending it back**.

And that's it. Now the bot can **execute commands** and change its behavior accordingly.

Naturally, this simplified logic will change the bot's behavior for **everyone** – not just the person who sent the command. This can be fun for this tutorial but **won't work in a production environment** – consider using a Map, dictionary or equivalent data structure to assign settings for individual users.

> Remember to always implement a few basic [global commands](features#global-commands).
You can practice by implementing a simple feedback to the `/start` command, which we intentionally left out.

### Buttons and Keyboards

To streamline and simplify user interaction with your bot, you can replace many text-based exchanges with handy buttons. These buttons can perform a wide variety of actions and can be customized for each user.

#### Button Types

There are two main types of buttons:

- **Reply Buttons** - used to provide a list of predefined text [reply options](features#keyboards).
- **Inline Buttons** - used to offer quick navigation, shortcuts, URLs, games and [so much more](features#inline-keyboards).

Using these buttons is as easy as attaching a `ReplyKeyboardMarkup` or an `InlineKeyboardMarkup` to your `SendMessage` object.

This guide will focus on **inline buttons** since they only require a few extra lines of code.

#### Creating Buttons

First of all, let's create some buttons.

     var next = InlineKeyboardButton.builder()
                .text("Next").callbackData("next")           
                .build();

     var back = InlineKeyboardButton.builder()
                .text("Back").callbackData("back")
                .build();

     var url = InlineKeyboardButton.builder()
                .text("Tutorial")
                .url("https://core.telegram.org/bots/api")
                .build();

Let's go back through the fields we specified:

- **Text** - This is what the user will see, the text that appears on the button
- **Callback Data** - This will be sent back to the code instance as part of a new `Update`, so we can quickly identify what button was clicked.
- **Url** - A button that specifies a URL doesn't specify callbackdata since its behavior is predefined – it will open the given link when tapped.

#### Creating Keyboards

The **buttons** we created can be assembled into two **keyboards**, which will then be used to navigate back and forth between two **sample menus**.

First, **add two fields** to store the necessary keyboards.

    private boolean screaming = false;
    
    private InlineKeyboardMarkup keyboardM1;
    private InlineKeyboardMarkup keyboardM2;
    
Then, **build** and **assign** them.

    keyboardM1 = InlineKeyboardMarkup.builder()
              .keyboardRow(List.of(next)).build();  
    
    //Buttons are wrapped in lists since each keyboard is a set of button rows
    keyboardM2 = InlineKeyboardMarkup.builder()
              .keyboardRow(List.of(back))
              .keyboardRow(List.of(url))
              .build();

>You can place this code wherever you prefer, the important thing is making sure that keyboard variables are accessible from the method call that will send the new menu. If you're confused by this concept and don't know where to put them, just paste them above the command processing flow.

#### Sending Keyboards

Sending a keyboard only requires specifying a reply markup for the message.

    public void sendMenu(Long who, String txt, InlineKeyboardMarkup kb){
        SendMessage sm = SendMessage.builder().chatId(who.toString())
                .parseMode("HTML").text(txt)
                .replyMarkup(kb).build();

        try {
            execute(sm);
        } catch (TelegramApiException e) {
            throw new RuntimeException(e);
        }
    }

>You may have noticed that we also added a new parameter, `HTML`.
This is called a [formatting option](api#formatting-options) and will allow us to use HTML tags and add formatting to the text later on.

#### Menu Trigger

We could send a new menu for each new user, but for simplicity let's add a new command that will spawn a menu. We can achieve this by adding a new **else clause** to the previous command flow.

     var txt = msg.getText();
     if(msg.isCommand()) {
            if (txt.equals("/scream"))
                screaming = true;
            else if (txt.equals("/whisper"))
                screaming = false;
            else if (txt.equals("/menu"))
                sendMenu(id, "<b>Menu 1</b>", keyboardM1);
            return;
     }
     
Try sending `/menu` to your bot now. If you did everything correctly, you should see a brand new menu pop up.

>In a production environment, commands should be handled with an appropriate design pattern that isolates them into different executor classes – modular and separated from the main logic.

### Navigation

When building complex bots, navigation is essential. Your users must be able to move seamlessly from one menu to the next. 

In this example, we want the `Next` button to lead the user to the second menu.
The `Back` button will send us back.
To do that, we will start processing incoming `CallbackQueries`, which are the results we get after the user taps on a button.

A `CallbackQuery` is essentially composed of three main parameters:

- **queryId** - Needed to close the query. You **must always** close new queries after processing them – if you don't, a loading symbol will keep showing on the user's side on top of each button.
- **data** - This identifies which button was pressed.
- **from** - The user who pressed the button.

Processing in this context just means **executing the action** uniquely identified by the button, then **closing the query**.

A very basic button handler could look something like:

    private void buttonTap(Long id, String queryId, String data, int msgId) {

        EditMessageText newTxt = EditMessageText.builder()
                .chatId(id.toString())
                .messageId(msgId).text("").build();

        EditMessageReplyMarkup newKb = EditMessageReplyMarkup.builder()
                .chatId(id.toString()).messageId(msgId).build();                           

        if(data.equals("next")) {
            newTxt.setText("MENU 2");
            newKb.setReplyMarkup(keyboardM2);
        } else if(data.equals("back")) {
            newTxt.setText("MENU 1");
            newKb.setReplyMarkup(keyboardM1);
        }

        AnswerCallbackQuery close = AnswerCallbackQuery.builder()
                .callbackQueryId(queryId).build();

        execute(close);
        execute(newTxt);
        execute(newKb);
    }

With this handler, whenever a button is tapped, your bot will automatically navigate between inline menus.
Expanding on this concept allows for endless combinations of navigable submenus, settings and dynamic pages.

### Database
Telegram **does not** host an update database for you – once you process and consume an update, it will no longer be available. This means that features like user lists, message lists, current user inline menu, settings, etc. **have to be implemented and maintained** by bot developers.

If your bot needs one of these features and you want to get started on **data persistence**, we recommend that you look into [serialization](https://en.wikipedia.org/wiki/Serialization) practices and libraries for your language of choice, as well as available databases.

Implementing a database is out of scope for this guide, however, several guides are available online for simple embedded **open source** software solutions like [SQLite](https://www.sqlite.org/index.html), [HyperSQL](https://hsqldb.org/), [Derby](https://db.apache.org/derby/) and many more.

>Your language of choice will also influence which databases are available and supported – the list above assumes you followed this Java tutorial.

### Hosting
So far, your bot has been running on your **local machine** – your PC. While this may be good for **developing**, **testing** and **debugging**, it is not ideal for a production environment.
You'll want your bot to be available and responsive at all times, but your computer might not always be online.

This can be done in four steps:

- **Package your code**
Making your bot **easy to move** and **runnable** outside of an IDE is essential to **host it elsewhere**.
If you followed this tutorial, this [standard guide](https://www.jetbrains.com/help/idea/compiling-applications.html#run_packaged_jar) will work for you. If you didn't, look into **export or packaging guides** for your IDE and language of choice – procedures may vary but the end result is the same.

- **Purchase a VPS or equivalent service**
A server is essentially a machine that is always online and running, without you having to worry about anything. To host your bot, you can opt for a [VPS](https://en.wikipedia.org/wiki/Virtual_private_server) which serves this purpose and can be rented from several different providers.
Another option would be to purchase a network-capable [microcontroller](https://en.wikipedia.org/wiki/Microcontroller), which come in all different specs and sizes depending on your needs.

>You should ensure that all user data remains **heavily encrypted at all times** in your database to guarantee the privacy of your users. The same concept applies to your local instance, however, this becomes especially important once you transfer your database to a remote server.

- **Upload your executable/package**

Once you have a working [ssh](https://en.wikipedia.org/wiki/Secure_Shell) connection between your machine and your new server, you should upload your executable and all associated files.
We will assume the runnable jar `TutorialBot.jar` and its database `dbase.db` are currently in the `/TBot` folder.

    $ scp -r /TBot/ username@server_ip:/bots/TBotRemote/
    
- **Run your application**

Depending on which language you chose, you might have to configure your server environment differently. If you chose Java, you just need to install a compatible JDK.

    $ apt install openjdk-17-jre
    $ java -version

If you did everything correctly, you should see a Java version as the output, along with a few other values. This means you're ready to run your application.

Now, to run the executable:

    $ cd /bots/TBotRemote/
    $ java -jar TutorialBot.jar

Your bot is now online and users can interact with it at any time.

>To streamline and modularize this process, you could employ a specialized [docker container](https://www.docker.com/resources/what-container/) or equivalent service.
If you followed along in one of the equivalent examples ([C#](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.cs), [Python](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.py), [Go](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/blob/main/TutorialBot.go) and [TypeScript](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/tree/main/Nodejs)) you can find a detailed set of instructions to export and run your code [here](https://gitlab.com/Athamaxy/telegram-bot-tutorial/-/tree/main/).

### Further Reading

If you got this far, you might be interested in these additional guides and docs:

- [General Bot Platform Overview](/bots.md)
- [Detailed List of Bot Features](/bots/features.md)
- [Full API Reference](/bots/api.md)

If you encounter any issues while following this guide, you can contact us on Telegram at [@BotSupport](https://t.me/botsupport).

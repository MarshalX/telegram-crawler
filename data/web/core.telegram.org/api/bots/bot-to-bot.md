# Bot-to-bot communication


Bot-to-bot communication allows bots to receive messages from other bots in the contexts described below. Outside of these contexts, bots normally do not receive messages from other bots.

Enable **Bot-to-Bot Communication Mode** for every bot that should participate in this feature in [@BotFather&nbsp;&raquo;](https://t.me/BotFather).

For a simplified Bot API description, see [Bot-to-Bot Communication&nbsp;&raquo;](/bots/features.md#bot-to-bot-communication).

### Communication in group chats

    updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
    updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;

Bots in the same [group or supergroup&nbsp;&raquo;](/api/channel.md) may communicate through ordinary group messages.

A bot receives a message from another bot if the message:

* Contains a command mention addressed to it, such as `/command@TargetBot`.
* Is a direct reply to one of its messages.

At least one of the two bots must have Bot-to-Bot Communication Mode enabled.

A bot with Bot-to-Bot Communication Mode enabled can also receive messages from other bots in groups without a command mention or direct reply, if the receiving bot:

* Is an admin in the group.
* Has Group Privacy Mode disabled in [@BotFather&nbsp;&raquo;](https://t.me/BotFather).

Group Privacy Mode is the [bot privacy setting&nbsp;&raquo;](/bots/features.md#privacy-mode) that limits ordinary group updates to messages explicitly relevant to the bot.

Incoming bot messages are delivered through the usual [update handling flow&nbsp;&raquo;](/api/updates.md): [updateNewMessage](/constructor/updateNewMessage.md) in basic groups, and [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) in supergroups.

### Communication in Private Chats

    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

A bot can send a private message to another bot using [messages.sendMessage](/method/messages.sendMessage.md) and other message sending methods, passing the recipient bot in `peer`.

Bot-to-Bot Communication Mode must be enabled for both the sender bot and the recipient bot. If either bot has not enabled the setting, the methods will return [`USER_BOT_TO_BOT_DISABLED`](/method/messages.sendMessage.md#possible-errors).

The `USER_BOT_TO_BOT_DISABLED` RPC error only applies to Communication in Private Chats.

### Communication via Business Accounts

    botBusinessConnection#8f34b2f5 flags:# disabled:flags.1?true connection_id:string user_id:long dc_id:int date:int rights:flags.2?BusinessBotRights = BotBusinessConnection;

    updateBotNewBusinessMessage#9ddb347c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;

    ---functions---

    invokeWithBusinessConnection#dd289f8e {X:Type} connection_id:string query:!X = X;
    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

Chat Access Mode lets a bot receive and send messages through chats available to a `connection_id`, as described in the [connected bot&nbsp;&raquo;](/api/bots/connected-business-bots.md) flow. In this mode, the bot can send messages to other bots in those chats.

Only the sending bot needs to enable Bot-to-Bot Communication Mode.  

Obtain the `connection_id` from [botBusinessConnection](/constructor/botBusinessConnection.md), then invoke [messages.sendMessage](/method/messages.sendMessage.md) through [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md). The available operations still depend on the [businessBotRights](/constructor/businessBotRights.md) granted for that connection.

Messages received through the connection are delivered as [updateBotNewBusinessMessage](/constructor/updateBotNewBusinessMessage.md) updates, using the `qts` [update sequence&nbsp;&raquo;](/api/updates.md#qts-secret-chats-amp-bots).

### Loop prevention

Bot-to-bot communication can create infinite reply loops. Bots using this feature must make bot-message handling terminate predictably.

Recommended safeguards:

* Deduplicate repeated messages.
* Apply per-chat and per-bot rate limits.
* Enforce maximum interaction depth and timeouts, both globally and per sender/receiver pair.

The bot must remain stable if another bot replies immediately and repeatedly.

# Inline queries


Users can interact with your bot via [**inline queries**](/bots/features.md#inline-requests), straight from the **text input field** in **any** chat.  
This article describes the full inline bot flow, using the MTProto API.  

For a simplified description using the HTTP bot API, see [here&nbsp;&raquo;](/bots/features.md#inline-requests).  

### 1. Making an inline query

    messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;

    ---functions---

    messages.getInlineBotResults#514e999d flags:# bot:InputUser peer:InputPeer geo_point:flags.0?InputGeoPoint query:string offset:string = messages.BotResults;

When, in a graphical client, the user starts a message with an `@`, clients should:

* Use the cached [top peer rating for inline bots](/api/top-rating.md) to show a list of frequently used inline bots.
* If the user chooses a bot from the recent bot list or:
* Finishes typing a full username followed by a whitespace, and if the username [resolves](/method/contacts.resolveUsername.md) to a valid bot
* [messages.getInlineBotResults](/method/messages.getInlineBotResults.md) is called, with the following parameters:
    * `bot` - The bot peer
    * `peer` - The chat where the user made the query (or [inputPeerEmpty](/constructor/inputPeerEmpty.md) for [GIF searches](/api/gifs.md) and other queries to built-in bots specified in the [config](/constructor/config.md))
    * `geo_point` - The user's current geolocation, if the bot requires [location-based inline results](/bots/inline.md#location-based-results) (the `bot_inline_geo` flag of the bot's [user constructor](/constructor/user.md) will be set)
    * `query` - What the user typed after the bot's username
    * `offset` - If the user scrolls past the first `len(results)` results, and `next_offset` field is set, the inline query should be repeated with this offset.

### 2. Answering to an inline query

    inputBotInlineMessageMediaAuto#3380c786 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
    inputBotInlineMessageText#3dcd7a87 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
    inputBotInlineMessageMediaGeo#96929a85 flags:# geo_point:InputGeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
    inputBotInlineMessageMediaVenue#417bbf11 flags:# geo_point:InputGeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
    inputBotInlineMessageMediaContact#a6edbffd flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
    inputBotInlineMessageGame#4b425864 flags:# reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;

    inputBotInlineResult#88bf9319 flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?InputWebDocument content:flags.5?InputWebDocument send_message:InputBotInlineMessage = InputBotInlineResult;
    inputBotInlineResultPhoto#a8d864a7 id:string type:string photo:InputPhoto send_message:InputBotInlineMessage = InputBotInlineResult;
    inputBotInlineResultDocument#fff8fdc4 flags:# id:string type:string title:flags.1?string description:flags.2?string document:InputDocument send_message:InputBotInlineMessage = InputBotInlineResult;
    inputBotInlineResultGame#4fa417f2 id:string short_name:string send_message:InputBotInlineMessage = InputBotInlineResult;

    updateBotInlineQuery#496f379c flags:# query_id:long user_id:long query:string geo:flags.0?GeoPoint peer_type:flags.1?InlineQueryPeerType offset:string = Update;

    ---functions---

    messages.setInlineBotResults#bb12a419 flags:# gallery:flags.0?true private:flags.1?true query_id:long results:Vector<InputBotInlineResult> cache_time:int next_offset:flags.2?string switch_pm:flags.3?InlineBotSwitchPM switch_webview:flags.4?InlineBotWebView = Bool;

Bots can answer to incoming [updateBotInlineQuery](/constructor/updateBotInlineQuery.md) updates using [messages.setInlineBotResults](/method/messages.setInlineBotResults.md).  
Just like its [bot API counterpart](/bots/api/methods/answerinlinequery.md), the method can be used to send a set of inline results to the user; see the [constructor page for more info on the MTProto method parameters&nbsp;&raquo;](/method/messages.setInlineBotResults.md).

In general, the method accepts a vector of [InputBotInlineResult](/type/InputBotInlineResult.md) constructors, that when [chosen](#3-sending-the-inline-query-result), generates a message with optionally attached media, and even inline buttons.

### 2.1. Using a prepared inline message

    inlineQueryPeerTypeSameBotPM#3081ed9d = InlineQueryPeerType;
    inlineQueryPeerTypePM#833c0fac = InlineQueryPeerType;
    inlineQueryPeerTypeChat#d766c50a = InlineQueryPeerType;
    inlineQueryPeerTypeMegagroup#5ec4be43 = InlineQueryPeerType;
    inlineQueryPeerTypeBroadcast#6334ee9a = InlineQueryPeerType;
    inlineQueryPeerTypeBotPM#e3b2d0c = InlineQueryPeerType;

    messages.botPreparedInlineMessage#8ecf0511 id:string expire_date:int = messages.BotPreparedInlineMessage;

    messages.preparedInlineMessage#ff57708d query_id:long result:BotInlineResult peer_types:Vector<InlineQueryPeerType> cache_time:int users:Vector<User> = messages.PreparedInlineMessage;

    ---functions---

    messages.savePreparedInlineMessage#f21f7f2f flags:# result:InputBotInlineResult user_id:InputUser peer_types:flags.0?Vector<InlineQueryPeerType> = messages.BotPreparedInlineMessage;

    messages.getPreparedInlineMessage#857ebdb8 bot:InputUser id:string = messages.PreparedInlineMessage;

An inline result may also be pre-generated by a [mini app](/api/bots/webapps.md).  

1) To start, the bot associated with the mini apps saves the prepared message using [messages.savePreparedInlineMessage](/method/messages.savePreparedInlineMessage.md), specifying the message, the ID of the user that will use the message (i.e. the user currently viewing the web app) and the peer types where the message can be shared.  
2) Then, the prepared inline message ID is passed to the user's client via the [web_app_send_prepared_message web event &raquo;](/api/web-events.md#web-app-send-prepared-message).
3) The ID is then passed to [messages.getPreparedInlineMessage](/method/messages.getPreparedInlineMessage.md) along with the identifier of the bot that owns the web app to fetch the prepared inline message  
3.1) If the method returns any RPC error, emit a [prepared_message_failed event](/api/bots/webapps.md#prepared-message-failed) with `error` set to the message of the RPC error and abort the process.  
3.2) If the method succeeds, display a preview to the user, letting them select a destination chat.  
4) If the user aborts the process, emit a [prepared_message_failed event](/api/bots/webapps.md#prepared-message-failed) with `error` set to `USER_DECLINED`.
5) If the user selects a chat, send the message [as specified here &raquo;](#3-sending-the-inline-query-result).  
5.1) If sending fails, emit a [prepared_message_failed event](/api/bots/webapps.md#prepared-message-failed) with `error` set to `MESSAGE_SEND_FAILED`.  
5.2) If sending succeeds, emit a [prepared_message_sent event](/api/bots/webapps.md#prepared-message-sent).

### 3. Sending the inline query result

    botInlineMessageMediaAuto#764cf810 flags:# invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
    botInlineMessageText#8c7f65e2 flags:# no_webpage:flags.0?true invert_media:flags.3?true message:string entities:flags.1?Vector<MessageEntity> reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
    botInlineMessageMediaGeo#51846fd flags:# geo:GeoPoint heading:flags.0?int period:flags.1?int proximity_notification_radius:flags.3?int reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
    botInlineMessageMediaVenue#8a86659c flags:# geo:GeoPoint title:string address:string provider:string venue_id:string venue_type:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
    botInlineMessageMediaContact#18d1cdc2 flags:# phone_number:string first_name:string last_name:string vcard:string reply_markup:flags.2?ReplyMarkup = BotInlineMessage;

    botInlineResult#11965f3a flags:# id:string type:string title:flags.1?string description:flags.2?string url:flags.3?string thumb:flags.4?WebDocument content:flags.5?WebDocument send_message:BotInlineMessage = BotInlineResult;
    botInlineMediaResult#17db940b flags:# id:string type:string photo:flags.0?Photo document:flags.1?Document title:flags.2?string description:flags.3?string send_message:BotInlineMessage = BotInlineResult;

    messages.botResults#e021f2f6 flags:# gallery:flags.0?true query_id:long next_offset:flags.1?string switch_pm:flags.2?InlineBotSwitchPM switch_webview:flags.3?InlineBotWebView results:Vector<BotInlineResult> cache_time:int users:Vector<User> = messages.BotResults;
    
    ---functions---
    
    messages.sendInlineBotResult#c0cf7646 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut allow_paid_stars:flags.21?long = Updates;

The user client should display the [messages.botResults](/constructor/messages.botResults.md).`results` obtained [during querying](#1-making-an-inline-query) in a list, making sure to handle eventual bot timeouts in the form of a `BOT_RESPONSE_TIMEOUT` RPC error, by simply not displaying anything.  

If either the [messages.botResults](/constructor/messages.botResults.md).`switch_pm` or [messages.botResults](/constructor/messages.botResults.md).`switch_webview` flags are populated, a button should be displayed on top of the result list, that when clicked, instead of sending an inline result to the chat, switches the user to a private chat with the bot (`switch_pm`) or to a [inline mode mini app](/api/bots/webapps.md#inline-mode-mini-apps) (`switch_webview`).  

If the user instead chooses a specific `BotInlineResult` from the normal `results` list, the [messages.sendInlineBotResult](/method/messages.sendInlineBotResult.md) method should be invoked, passing:

* The `query_id` from `messages.botResults` or `messages.preparedInlineMessage`
* The `id` of the chosen result
* The `peer` where to send the chosen result

The resulting [message](/constructor/message.md) will have the `via_bot_id` field set, to indicate that the result was generated by the bot that generated the inline result.  
Graphical clients should display the bot `@username` in the header of the message, allowing the user to click on it, automatically starting an inline query by inserting `@username ` in the text bar.

### 4. Inline feedback

    inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;
    
    updateBotInlineSend#12f12a07 flags:# user_id:long query:string geo:flags.0?GeoPoint id:string msg_id:flags.1?InputBotInlineMessageID = Update;

If [feedback collection](/bots/inline.md#collecting-feedback) is enabled, the bot may receive an [updateBotInlineSend](/constructor/updateBotInlineSend.md) when the user [chooses and sends](#3-sending-the-inline-query-result) an inline result.  

Even if the [probability setting is set to 100%](/bots/inline.md#collecting-feedback), not all inline results may be reported due to caching (see the `cache_time` parameter in [Answering a callback query](/api/bots/buttons.md#answering-a-callback-query)).  
[Feedback collection](/bots/inline.md#collecting-feedback) can also create load issues for popular bots, so adjust the probability setting to a lower value in such cases.

Either way, feedback collection should only be used for statistical purposes rather than functional.  

The [updateBotInlineSend](/constructor/updateBotInlineSend.md) will contain:  

* `id` - The ID of the chosen result
* `msg_id` - The ID of the sent inline message
* `user_id` - The ID of the user that chose the result
* `query` - The query string that was used to obtain the result
* `geo` - For bots requiring [location-based inline results](/bots/inline.md#location-based-results), the user's location

### 5. Editing sent inline messages

    updateInlineBotCallbackQuery#691e9052 flags:# query_id:long user_id:long msg_id:InputBotInlineMessageID chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;

    inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;

    ---functions---

    messages.editInlineBotMessage#83557dba flags:# no_webpage:flags.1?true invert_media:flags.16?true id:InputBotInlineMessageID message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> = Bool;

Sent inline messages can be edited by the bot, for example in response to a [button press callback query](/constructor/keyboardButtonCallback.md).

Simply pass the [inputBotInlineMessageID](/constructor/inputBotInlineMessageID.md) specified in the [updateInlineBotCallbackQuery](/constructor/updateInlineBotCallbackQuery.md) to [messages.editInlineBotMessage](/method/messages.editInlineBotMessage.md) along with the new message, making sure to send the query to the [datacenter](/api/datacenter.md) specified in `inputBotInlineMessageID.dc_id`.

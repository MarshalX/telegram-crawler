# Bot buttons


Users can interact with your bot via **buttons** or even **inline buttons**, straight from inline **messages** in **any** chat.  
This article describes the full button flow, using the MTProto API.  

For a simplified description using the HTTP bot API, see [here&nbsp;&raquo;](/bots/features.md#keyboards).  

### Buttons

    keyboardButtonRow#77608b83 buttons:Vector<KeyboardButton> = KeyboardButtonRow;

    replyKeyboardHide#a03e5b85 flags:# selective:flags.2?true = ReplyMarkup;
    replyKeyboardForceReply#86b40b08 flags:# single_use:flags.1?true selective:flags.2?true placeholder:flags.3?string = ReplyMarkup;
    replyKeyboardMarkup#85dd99d1 flags:# resize:flags.0?true single_use:flags.1?true selective:flags.2?true persistent:flags.4?true rows:Vector<KeyboardButtonRow> placeholder:flags.3?string = ReplyMarkup;
    replyInlineMarkup#48a30254 rows:Vector<KeyboardButtonRow> = ReplyMarkup;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

Bots can attach a [ReplyMarkup](/type/ReplyMarkup.md) constructor to outgoing messages, to attach an [inline keyboard](/bots/features.md#inline-keyboards) or a [custom reply keyboard](/bots/features.md#keyboards):

* [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md) - Sends a [custom reply keyboard](/bots/features.md#keyboards). \
    User clients receiving such a constructor should display a [special keyboard](/bots/features.md#keyboards) with custom reply options.
* [replyKeyboardHide](/constructor/replyKeyboardHide.md) - Hides the [custom reply keyboard](/bots/features.md#keyboards). \
    User clients receiving this constructor should hide the [custom reply keyboard](/bots/features.md#keyboards) opened by [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md)
* [replyKeyboardForceReply](/constructor/replyKeyboardForceReply.md) - Sends a [force reply](/bots/api/types/forcereply.md) constructor \
    User clients receiving a message with this constructor should act as if the user had clicked on the reply button of the message, displaying the reply UI.  
* [replyInlineMarkup](/constructor/replyInlineMarkup.md) - Attaches an [inline keyboard](/bots/features.md#inline-keyboards) to the message, allowing users to send callback data to the bot without sending actual messages to the current chat.

#### Button styles

    keyboardButtonStyle#4fdd3430 flags:# bg_primary:flags.0?true bg_danger:flags.1?true bg_success:flags.2?true icon:flags.3?long = KeyboardButtonStyle;

Buttons may be additionally styled by a [keyboardButtonStyle](/constructor/keyboardButtonStyle.md) constructor, which can be attached to any button via the `style` flag.  

This constructor allows changing the background color of the button to one of the following predefined colors, by setting the appropriate flag:

- `bg_primary` - a dark blue color, recommended for main actions.
- `bg_danger` - a red color, recommended for destructive actions.
- `bg_success` - a green color, recommended for positive actions.
- If none of the above flags are set, the default transparent (inline keyboards) or white (reply keyboards) background color will be used, recommended for neutral actions.

The colors specified above should be appropriately rendered (and possibly inverted) according to the current [theme](/api/themes.md) (i.e. for dark mode).  

Only one (or none, but only if an `icon` is additionally specified) of the background color flags can be set at a time.  

Additionally, `icon` can be populated with a [custom emoji ID](/api/custom-emoji.md), to display it before the button text.  

`icon` can be used with or without custom button background colors.  

Custom emoji icons can only be used inside of buttons the bot purchased additional usernames on [Fragment](https://fragment.com/), or if the bot's owner has an active [Telegram Premium](/api/premium.md) subscription.  

### Pressing buttons

Both [reply](/bots/features.md#keyboards) and [inline](/bots/features.md#inline-keyboards) keyboards are composed of a vector of [rows](/constructor/keyboardButtonRow.md), each row containing a vector of [buttons](/type/KeyboardButton.md), for each column.
Each row can have a different number of columns, and user clients should properly handle clicking buttons of every type.

See each [KeyboardButton](/type/KeyboardButton.md) constructor for where it can be used and what clients must do when it is pressed.

### Peer requests

    inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
    keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;

[keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) is used by bots to request a peer from a user. To send a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md), use the [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md) counterpart.

#### Requesting existing peers

    requestPeerTypeUser#5f3b8a00 flags:# bot:flags.0?Bool premium:flags.1?Bool = RequestPeerType;
    requestPeerTypeChat#c9f06e1b flags:# creator:flags.0?true bot_participant:flags.5?true has_username:flags.3?Bool forum:flags.4?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;
    requestPeerTypeBroadcast#339bef6c flags:# creator:flags.0?true has_username:flags.3?Bool user_admin_rights:flags.1?ChatAdminRights bot_admin_rights:flags.2?ChatAdminRights = RequestPeerType;

    inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
    keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;

    messageActionRequestedPeer#31518e9b button_id:int peers:Vector<Peer> = MessageAction;

    ---functions---

    messages.sendBotRequestedPeer#6c5cf2a7 flags:# peer:InputPeer msg_id:flags.0?int webapp_req_id:flags.1?string button_id:int requested_peers:Vector<InputPeer> = Updates;

When pressed, clients prompt the user to select and share at most [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).`max_quantity` peers with the bot, according to the criteria specified in [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).`peer_type`, a [RequestPeerType](/type/RequestPeerType.md) constructor.  

After peer selection, clients invoke [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md), passing [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).`button_id` to [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).`button_id`.  

The bot receives the selected peer and `button_id` in a [messageActionRequestedPeer](/constructor/messageActionRequestedPeer.md) service message.  

This flow may also be used by mini apps, as specified [here &raquo;](#requesting-peers-via-mini-apps).  

#### Requesting a managed bot

    requestPeerTypeCreateBot#3e81e078 flags:# bot_managed:flags.0?true suggested_name:flags.1?string suggested_username:flags.2?string = RequestPeerType;

    inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
    keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;

    messageActionManagedBotCreated#16605e3e bot_id:long = MessageAction;

    ---functions---

    messages.sendBotRequestedPeer#6c5cf2a7 flags:# peer:InputPeer msg_id:flags.0?int webapp_req_id:flags.1?string button_id:int requested_peers:Vector<InputPeer> = Updates;

A [manager bot](/api/bots/managed-bots.md#creating-a-managed-bot) may ask a user to create a managed bot by sending an [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md) whose [RequestPeerType](/type/RequestPeerType.md) is [requestPeerTypeCreateBot](/constructor/requestPeerTypeCreateBot.md). User clients receive it as [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).

When creating a [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md) of type [requestPeerTypeCreateBot](/constructor/requestPeerTypeCreateBot.md), do not set any of the `name_requested`, `username_requested`, `photo_requested` flags.  

When the user presses the button, show the [managed bot creation flow](/api/bots/managed-bots.md#creating-a-managed-bot), using:

* `suggested_name`, if set, as the initial bot name.
* `suggested_username`, if set, as the initial bot username.

After [bots.createBot](/method/bots.createBot.md) succeeds, invoke [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md):

* `peer` is the manager bot.
* `msg_id` is the ID of the message containing the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).
* `button_id` is the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).`button_id`.
* `requested_peers` contains only the newly created bot.

When [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md) points to a [requestPeerTypeCreateBot](/constructor/requestPeerTypeCreateBot.md), it generates a [messageActionManagedBotCreated](/constructor/messageActionManagedBotCreated.md) service message, sent by the user to the manager bot, containing the ID of the newly created bot.

[messageActionManagedBotCreated](/constructor/messageActionManagedBotCreated.md) is generated only when invoking [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md), not when invoking [bots.createBot](/method/bots.createBot.md).

This flow may also be used by mini apps, as specified [here &raquo;](#requesting-peers-via-mini-apps).  

#### Requesting peers via Mini Apps

    inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
    keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;

    bots.requestedButton#f13bbcd7 webapp_req_id:string = bots.RequestedButton;

    ---functions---

    bots.requestWebViewButton#31a2a35e user_id:InputUser button:KeyboardButton = bots.RequestedButton;

    bots.getRequestedWebViewButton#bf25b7f3 bot:InputUser webapp_req_id:string = KeyboardButton;

    messages.sendBotRequestedPeer#6c5cf2a7 flags:# peer:InputPeer msg_id:flags.0?int webapp_req_id:flags.1?string button_id:int requested_peers:Vector<InputPeer> = Updates;

A bot can prepare a peer request button for a [Mini App](/api/bots/webapps.md) by invoking [bots.requestWebViewButton](/method/bots.requestWebViewButton.md) with an [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md) of any [RequestPeerType](/type/RequestPeerType.md), and the target user, that will use the specified button.  

The bot should then pass the returned [bots.requestedButton](/constructor/bots.requestedButton.md).`webapp_req_id` to the Mini App.

When the Mini App emits [`web_app_request_chat`](/api/web-events.md#web-app-request-chat), the user's client must invoke [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md), passing the bot and the event's `req_id` as [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md).`webapp_req_id`.

If [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md) returns a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md), show the appropriate peer request flow specified by [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).`peer_type` (see [above &raqo;](#peer-requests) for the available flows).  

After the user chooses or creates the requested peer, invoke [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md):

* `peer` must contain the bot.
* `webapp_req_id` must contain the Mini App request ID.
* `button_id` must contain the returned [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md).`button_id`.
* `requested_peers` must contain the peers selected or created by the user.

Notify the Mini App with [`requested_chat_sent` &raquo;](/api/bots/webapps.md#requested-chat-sent) after [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md) succeeds, or [`requested_chat_failed` &raquo;](/api/bots/webapps.md#requested-chat-failed) if the user cancels or the request fails.

### Callback queries

[keyboardButtonCallback](/constructor/keyboardButtonCallback.md) buttons can be used to send the specified `data` payload back to the bot, when they are clicked.  

Additionally, a bot can verify a user's identity by requiring they verify their 2FA password with [SRP](/api/srp.md).  

#### Sending a callback query

    keyboardButtonGame#89c590f9 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
    keyboardButtonCallback#e62bc960 flags:# requires_password:flags.0?true style:flags.10?KeyboardButtonStyle text:string data:bytes = KeyboardButton;

    messages.botCallbackAnswer#36585ea4 flags:# alert:flags.1?true has_url:flags.3?true native_ui:flags.4?true message:flags.0?string url:flags.2?string cache_time:int = messages.BotCallbackAnswer;

    ---functions---

    messages.getBotCallbackAnswer#9342ca07 flags:# game:flags.1?true peer:InputPeer msg_id:int data:flags.0?bytes password:flags.2?InputCheckPasswordSRP = messages.BotCallbackAnswer;

When the user clicks on a [keyboardButtonCallback](/constructor/keyboardButtonCallback.md) in a message sent by a bot, or generated by an [inline query](/api/bots/inline.md), [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md) should be called, passing the peer and ID of the message.  
The same should happen when clicking on [keyboardButtonGame](/constructor/keyboardButtonGame.md) buttons, with the difference that the `game` flag must be set instead of the `data` parameter.  

Make sure to properly handle bot timeouts in the form of `BOT_RESPONSE_TIMEOUT` RPC errors, as the bot may be offline and unable to reply.  

The returned [messages.botCallbackAnswer](/constructor/messages.botCallbackAnswer.md) constructor contains:
* `message` if specified, a message that should be shown in a non-blocking toast notification
* `alert` indicates whether the `message` should be shown as a dismissible prompt, instead of a simple toast notification
* `has_url` Whether an URL is present
* `url` if specified, the client should open the URL, without showing a confirmation prompt. \
    This is safe and allowed, because here bots can only return: 
    * [Deep links to themselves&nbsp;&raquo;](/api/links.md#bot-links)
    * [Deep links to a valid game they own&nbsp;&raquo;](/api/links.md#game-links), if the bot has manually configured games, and the clicked button was a [keyboardButtonGame](/constructor/keyboardButtonGame.md).  
* `native_ui` whether to open game URLs in a WebView or in native UI.
* `cache_time` specifies for how long should this answer be cached, client-side

##### SRP verification

If the `requires_password` flag is set, the [SRP 2FA payload](/api/srp.md) must also be generated and attached to the query, to verify the identity of the user.  

**Note that the bot will NOT be able to access your password or the SRP payload**.  

The SRP payload will be processed exclusively on the Telegram's servers, simply returning an RPC error without passing the query to the bot if the verification fails.  
This is just a way of verifying the identity of the user, mainly used by the official [@botfather](https://t.me/botfather) bot to allow securely transferring the ownership of a bot to another user.

#### Answering a callback query

    updateBotCallbackQuery#b9cfc48d flags:# query_id:long user_id:long peer:Peer msg_id:int chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;

    updateInlineBotCallbackQuery#691e9052 flags:# query_id:long user_id:long msg_id:InputBotInlineMessageID chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;

    updateBusinessBotCallbackQuery#1ea2fda7 flags:# query_id:long user_id:long connection_id:string message:Message reply_to_message:flags.2?Message chat_instance:long data:flags.0?bytes = Update;

    ---functions---

    messages.setBotCallbackAnswer#d58f130a flags:# alert:flags.1?true query_id:long message:flags.0?string url:flags.2?string cache_time:int = Bool;

After the user invokes [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md), an [updateBotCallbackQuery](/constructor/updateBotCallbackQuery.md), [updateInlineBotCallbackQuery](/constructor/updateInlineBotCallbackQuery.md) or [updateBusinessBotCallbackQuery](/constructor/updateBusinessBotCallbackQuery.md) is generated and sent to the bot, depending on whether the query originated from a normal message sent by the bot, from a message sent from an [inline query](/api/bots/inline.md), or from a message sent via a [business connection](/api/bots/connected-business-bots.md).  

Either way, bots must reply to the query as quickly as possible using [messages.setBotCallbackAnswer](/method/messages.setBotCallbackAnswer.md):  

* `query_id` is the `query_id` from [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md), an [updateBotCallbackQuery](/constructor/updateBotCallbackQuery.md), [updateInlineBotCallbackQuery](/constructor/updateInlineBotCallbackQuery.md) or [updateBusinessBotCallbackQuery](/constructor/updateBusinessBotCallbackQuery.md)
* `message`, `alert`, `url` can contain messages and URLs to trigger different client behavior, as [specified above&nbsp;&raquo;](#sending-a-callback-query)
* `cache_time` indicates the maximum amount of time in seconds that the result of the callback query may be cached by the **client**.  

If a `game_short_name` is present in the update, the bot should return the URL of the game with the specified name.  
The [messages.setBotCallbackAnswer](/method/messages.setBotCallbackAnswer.md) method must be called anyway, even if no `message` or `url` is returned, to avoid timeouts on the client.  

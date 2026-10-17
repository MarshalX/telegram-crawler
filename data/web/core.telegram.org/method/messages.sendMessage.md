# messages.sendMessage

Sends a message to a chat

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **no\_webpage** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag to disable generation of the webpage preview |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Send this message silently (no notifications for the receivers) |
| **background** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Send this message as background message |
| **clear\_draft** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Clear the draft field |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Only for bots, disallows forwarding and saving of the messages, even if the destination chat doesn't have [content protection](https://telegram.org/blog/content-protection-delete-by-date-and-more) enabled |
| **update\_stickersets\_order** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Whether to move used stickersets to top, [see here for more info on this flag »](/api/stickers.md#recent-stickersets) |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **allow\_paid\_floodskip** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Bots only: if set, allows sending up to 1000 messages per second, ignoring [broadcasting limits](/bots/faq.md#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. |
| **peer** | [InputPeer](/type/InputPeer.md) | The destination where the message will be sent |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the message should be sent in reply to the specified message or story. \
Also used to quote other messages. |
| **message** | [string](/type/string.md) | The message |
| **random\_id** | [long](/type/long.md) | Unique client message ID required to prevent message resending. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Reply markup for sending bot buttons |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | Message [entities](/api/entities.md) for sending styled text |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Scheduled message date for [scheduled messages](/api/scheduled-messages.md) |
| **schedule\_repeat\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[int](/type/int.md) | Once sent, this message will be automatically re-scheduled to be re-sent again this many seconds in the future, see [here »](/api/scheduled-messages.md#repeating-scheduled-messages) for more info on repeating scheduled messages. |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[InputPeer](/type/InputPeer.md) | Send this message as the specified peer |
| **quick\_reply\_shortcut** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[InputQuickReplyShortcut](/type/InputQuickReplyShortcut.md) | Add the message to the specified [quick reply shortcut »](/api/business.md#quick-reply-shortcuts), instead. |
| **effect** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[long](/type/long.md) | Specifies a [message effect »](/api/effects.md) to use for the message. |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[long](/type/long.md) | For [paid messages »](/api/paid-messages.md), specifies the amount of [Telegram Stars](/api/stars.md) the user has agreed to pay in order to send the message. |
| **suggested\_post** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[SuggestedPost](/type/SuggestedPost.md) | Used to [suggest a post to a channel, see here »](/api/suggested-posts.md) for more info on the full flow. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ADMIN\_RIGHTS\_EMPTY | The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0). |
| 406 | ALLOW\_PAYMENT\_REQUIRED | This peer only accepts [paid messages&nbsp;&raquo;](/api/paid-messages.md): this error is only emitted for older layers without paid messages support, so the client must be updated in order to use paid messages.  . |
| 403 | ALLOW\_PAYMENT\_REQUIRED\_%d | This peer charges %d [Telegram Stars](/api/stars.md) per message, but the `allow_paid_stars` was not set or its value is smaller than %d. |
| 400 | BALANCE\_TOO\_LOW | The transaction cannot be completed because the current [Telegram Stars balance](/api/stars.md) is too low. |
| 400 | BOT\_DOMAIN\_INVALID | Bot domain invalid. |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | BUSINESS\_PEER\_INVALID | Messages can't be set to the specified peer through the current [business connection](/api/business.md#connected-bots). |
| 400 | BUSINESS\_PEER\_USAGE\_MISSING | You cannot send a message to a user through a [business connection](/api/business.md#connected-bots) if the user hasn't recently contacted us. |
| 400 | BUTTON\_COPY\_TEXT\_INVALID | The specified [keyboardButtonCopy](/constructor/keyboardButtonCopy.md).`copy_text` is invalid. |
| 400 | BUTTON\_DATA\_INVALID | The data of one or more of the buttons you provided is invalid. |
| 400 | BUTTON\_ID\_INVALID | The specified button ID is invalid. |
| 400 | BUTTON\_TYPE\_INVALID | The type of one or more of the buttons you provided is invalid. |
| 400 | BUTTON\_URL\_INVALID | Button URL invalid. |
| 400 | BUTTON\_USER\_INVALID | The `user_id` passed to inputKeyboardButtonUserProfile is invalid! |
| 400 | BUTTON\_USER\_PRIVACY\_RESTRICTED | The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](/constructor/inputKeyboardButtonUserProfile.md) button do not allow creating such a button. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_FORWARDS\_RESTRICTED | You can't forward messages from a protected chat. |
| 403 | CHAT\_GUEST\_SEND\_FORBIDDEN | You join the discussion group before commenting, see [here&nbsp;&raquo;](/api/discussion.md#requiring-users-to-join-the-group) for more info. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_RESTRICTED | You can't send messages in this chat, you were restricted. |
| 403 | CHAT\_SEND\_PLAIN\_FORBIDDEN | You can't send non-media (text) messages in this chat. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 400 | EFFECT\_CHAT\_INVALID | Message [effects](/api/effects.md) can only be used in private 1-on-1 chats, but the caller tried to send a message with an effect to a group or channel. |
| 400 | ENCRYPTION\_DECLINED | The secret chat was declined. |
| 400 | ENTITIES\_TOO\_LONG | You provided too many styled message entities. |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | ENTITY\_DATE\_FORMAT\_INVALID | One of the passed messageEntityFormattedDate objects has an invalid format (i.e. an invalid combination of the format flags). |
| 400 | ENTITY\_DATE\_INVALID | One of the passed messageEntityFormattedDate objects has an invalid date: the allowed value ranges from `0` to the current date plus 1098 days (`time()+1098*86400`). |
| 400 | ENTITY\_DATE\_TOO\_LONG | The maximum text span that can be covered by a date entity is 31 UTF-16 code units if any of the date formatting flags is set, or 127 UTF-16 code units without.  . |
| 400 | ENTITY\_MENTION\_USER\_INVALID | You mentioned an invalid user. |
| 400 | FROM\_MESSAGE\_BOT\_DISABLED | Bots can't use fromMessage min constructors. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MESSAGE\_EMPTY | The provided message is empty. |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 500 | MSG\_WAIT\_FAILED | A waiting call returned an error. |
| 406 | PAYMENT\_UNSUPPORTED | A detailed description of the error will be received separately as described [here&nbsp;&raquo;](/api/errors.md#406-not-acceptable). |
| 404 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PEER\_TYPES\_INVALID | The passed [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md).`peer_types` field is invalid. |
| 400 | PINNED\_DIALOGS\_TOO\_MUCH | Too many pinned dialogs. |
| 400 | POLL\_OPTION\_INVALID | Invalid poll option provided. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 406 | PRIVACY\_PREMIUM\_REQUIRED | You need a [Telegram Premium subscription](/api/premium.md) to send a message to this user. |
| 400 | QUICK\_REPLIES\_BOT\_NOT\_ALLOWED | [Quick replies](/api/business.md#quick-reply-shortcuts) cannot be used by bots. |
| 400 | QUICK\_REPLIES\_TOO\_MUCH | A maximum of [appConfig.`quick_replies_limit`](/api/config.md#quick-replies-limit) shortcuts may be created, the limit was reached. |
| 400 | QUOTE\_TEXT\_INVALID | The specified `reply_to`.`quote_text` field is invalid. |
| 500 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | RANDOM\_ID\_EMPTY | Random ID empty. |
| 400 | REPLY\_MARKUP\_INVALID | The provided reply markup is invalid. |
| 400 | REPLY\_MARKUP\_TOO\_LONG | The specified reply_markup is too long. |
| 400 | REPLY\_MESSAGES\_TOO\_MUCH | Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](/api/config.md#quick-reply-messages-limit) messages, the limit was reached. |
| 400 | REPLY\_MESSAGE\_ID\_INVALID | The specified reply-to message ID is invalid. |
| 400 | REPLY\_TO\_INVALID | The specified `reply_to` field is invalid. |
| 400 | REPLY\_TO\_MONOFORUM\_PEER\_INVALID | The specified inputReplyToMonoForum.monoforum_peer_id is invalid. |
| 400 | REPLY\_TO\_USER\_INVALID | The replied-to user is invalid. |
| 400 | SCHEDULE\_BOT\_NOT\_ALLOWED | Bots cannot schedule messages. |
| 400 | SCHEDULE\_DATE\_TOO\_LATE | You can't schedule a message this far in the future. |
| 400 | SCHEDULE\_STATUS\_PRIVATE | Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings. |
| 400 | SCHEDULE\_TOO\_MUCH | There are too many scheduled messages. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |
| 420 | SLOWMODE\_WAIT\_%d | Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat. |
| 400 | STORIES\_NEVER\_CREATED | This peer hasn't ever posted any stories. |
| 400 | STORY\_ID\_INVALID | The specified story ID is invalid. |
| 400 | SUGGESTED\_POST\_AMOUNT\_INVALID | The specified price for the suggested post is invalid. |
| 400 | SUGGESTED\_POST\_PEER\_INVALID | You cannot send suggested posts to non-[monoforum](/api/monoforum.md) peers. |
| 406 | TOPIC\_CLOSED | This topic was closed, you can't send messages to it anymore. |
| 406 | TOPIC\_DELETED | The specified topic was deleted. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | USER\_BOT\_TO\_BOT\_DISABLED | Bot-to-bot messaging is disabled because one of the two bots hasn't enabled the Bot to Bot setting in @BotFather. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |
| 400 | USER\_IS\_BOT | Bots can't send messages to other bots. |
| 400 | WC\_CONVERT\_URL\_INVALID | WC convert URL invalid. |
| 400 | YOU\_BLOCKED\_USER | You blocked this user. |

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Bots FAQ](/bots/faq.md)

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Scheduled messages](/api/scheduled-messages.md)
Telegram allows scheduling messages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.

#### [keyboardButtonCopy](/constructor/keyboardButtonCopy.md)
Clipboard button

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must copy `copy_text` to the clipboard.

#### [inputKeyboardButtonUserProfile](/constructor/inputKeyboardButtonUserProfile.md)
Button that links directly to a user profile

Use this constructor to send a [keyboardButtonUserProfile](/constructor/keyboardButtonUserProfile.md) button in an [inline keyboard](/bots/features.md#inline-keyboards).

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.

#### [Error handling ](/api/errors.md)
How to handle API return errors correctly.

#### [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md)
Button to switch the user to inline mode

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must insert the bot's username and `query` into the chat input field, triggering an [inline query](/api/bots/inline.md).

If `same_peer` is set, clients use the current chat. Otherwise, clients prompt the user to select a chat, filtered by `peer_types` if specified.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.
# messages.forwardMessages

Forwards messages by their IDs.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.forwardMessages#13704a7c flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int reply_to:flags.22?InputReplyTo schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long video_timestamp:flags.20?int allow_paid_stars:flags.21?long suggested_post:flags.23?SuggestedPost = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether to send messages silently (no notification will be triggered on the destination clients) |
| **background** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether to send the message in background |
| **with\_my\_score** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | When forwarding games, whether to include your score in the game |
| **drop\_author** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether to forward messages without quoting the original author |
| **drop\_media\_captions** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether to strip captions from media |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Only for bots, disallows further re-forwarding and saving of the messages, even if the destination chat doesn't have [content protection](https://telegram.org/blog/content-protection-delete-by-date-and-more) enabled |
| **allow\_paid\_floodskip** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Bots only: if set, allows sending up to 1000 messages per second, ignoring [broadcasting limits](/bots/faq.md#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. |
| **from\_peer** | [InputPeer](/type/InputPeer.md) | Source of messages |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of messages |
| **random\_id** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Random ID to prevent resending of messages. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **to\_peer** | [InputPeer](/type/InputPeer.md) | Destination peer |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[int](/type/int.md) | Destination [forum topic](/api/forum.md#forum-topics) |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[InputReplyTo](/type/InputReplyTo.md) | Can only contain an [inputReplyToMonoForum](/constructor/inputReplyToMonoForum.md), to forward messages to a [monoforum topic](/api/monoforum.md) (mutually exclusive with `top_msg_id`). |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Scheduled message date for scheduled messages |
| **schedule\_repeat\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[int](/type/int.md) | Once sent, this message will be automatically re-scheduled to be re-sent again this many seconds in the future, see [here »](/api/scheduled-messages.md#repeating-scheduled-messages) for more info on repeating scheduled messages. |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[InputPeer](/type/InputPeer.md) | Forward the messages as the specified peer |
| **quick\_reply\_shortcut** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[InputQuickReplyShortcut](/type/InputQuickReplyShortcut.md) | Add the messages to the specified [quick reply shortcut »](/api/business.md#quick-reply-shortcuts), instead. |
| **effect** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[long](/type/long.md) | Specifies a [message effect »](/api/effects.md) to use for the message. |
| **video\_timestamp** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[int](/type/int.md) | Start playing the video at the specified timestamp (seconds). |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[long](/type/long.md) | For [paid messages »](/api/paid-messages.md), specifies the amount of [Telegram Stars](/api/stars.md) the user has agreed to pay in order to send the message. |
| **suggested\_post** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[SuggestedPost](/type/SuggestedPost.md) | Used to [suggest a post to a channel, see here »](/api/suggested-posts.md) for more info on the full flow. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | ALLOW\_PAYMENT\_REQUIRED | This peer only accepts [paid messages&nbsp;&raquo;](/api/paid-messages.md): this error is only emitted for older layers without paid messages support, so the client must be updated in order to use paid messages.  . |
| 403 | ALLOW\_PAYMENT\_REQUIRED\_%d | This peer charges %d [Telegram Stars](/api/stars.md) per message, but the `allow_paid_stars` was not set or its value is smaller than %d. |
| 400 | BROADCAST\_PUBLIC\_VOTERS\_FORBIDDEN | You can't forward polls with public voters. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 406 | CHAT\_FORWARDS\_RESTRICTED | You can't forward messages from a protected chat. |
| 403 | CHAT\_GUEST\_SEND\_FORBIDDEN | You join the discussion group before commenting, see [here&nbsp;&raquo;](/api/discussion.md#requiring-users-to-join-the-group) for more info. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_RESTRICTED | You can't send messages in this chat, you were restricted. |
| 403 | CHAT\_SEND\_AUDIOS\_FORBIDDEN | You can't send audio messages in this chat. |
| 403 | CHAT\_SEND\_DOCS\_FORBIDDEN | You can't send documents in this chat. |
| 403 | CHAT\_SEND\_GAME\_FORBIDDEN | You can't send a game to this chat. |
| 403 | CHAT\_SEND\_GIFS\_FORBIDDEN | You can't send gifs in this chat. |
| 403 | CHAT\_SEND\_INLINE\_FORBIDDEN | You can't send inline messages in this group. |
| 403 | CHAT\_SEND\_MEDIA\_FORBIDDEN | You can't send media in this chat. |
| 403 | CHAT\_SEND\_PHOTOS\_FORBIDDEN | You can't send photos in this chat. |
| 403 | CHAT\_SEND\_PLAIN\_FORBIDDEN | You can't send non-media (text) messages in this chat. |
| 403 | CHAT\_SEND\_POLL\_FORBIDDEN | You can't send polls in this chat. |
| 403 | CHAT\_SEND\_STICKERS\_FORBIDDEN | You can't send stickers in this chat. |
| 403 | CHAT\_SEND\_VIDEOS\_FORBIDDEN | You can't send videos in this chat. |
| 403 | CHAT\_SEND\_VOICES\_FORBIDDEN | You can't send voice recordings in this chat. |
| 403 | CHAT\_SEND\_WEBPAGE\_FORBIDDEN | You can't send webpage previews to this chat. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | GROUPED\_MEDIA\_INVALID | Invalid grouped media. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MEDIA\_EMPTY | The provided media object is invalid. |
| 400 | MEDIA\_FILE\_INVALID | The specified media file is invalid. |
| 400 | MESSAGE\_IDS\_EMPTY | No message ids were provided. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 406 | PAYMENT\_UNSUPPORTED | A detailed description of the error will be received separately as described [here&nbsp;&raquo;](/api/errors.md#406-not-acceptable). |
| 406 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 406 | PRIVACY\_PREMIUM\_REQUIRED | You need a [Telegram Premium subscription](/api/premium.md) to send a message to this user. |
| 400 | QUICK\_REPLIES\_BOT\_NOT\_ALLOWED | [Quick replies](/api/business.md#quick-reply-shortcuts) cannot be used by bots. |
| 400 | QUICK\_REPLIES\_TOO\_MUCH | A maximum of [appConfig.`quick_replies_limit`](/api/config.md#quick-replies-limit) shortcuts may be created, the limit was reached. |
| 400 | QUIZ\_ANSWER\_MISSING | You can forward a quiz while hiding the original author only after choosing an option in the quiz. |
| 500 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | RANDOM\_ID\_INVALID | A provided random ID is invalid. |
| 400 | REPLY\_MESSAGES\_TOO\_MUCH | Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](/api/config.md#quick-reply-messages-limit) messages, the limit was reached. |
| 400 | REPLY\_TO\_MONOFORUM\_PEER\_INVALID | The specified inputReplyToMonoForum.monoforum_peer_id is invalid. |
| 400 | SCHEDULE\_BOT\_NOT\_ALLOWED | Bots cannot schedule messages. |
| 400 | SCHEDULE\_DATE\_TOO\_LATE | You can't schedule a message this far in the future. |
| 400 | SCHEDULE\_TOO\_MUCH | There are too many scheduled messages. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |
| 400 | SLOWMODE\_MULTI\_MSGS\_DISABLED | Slowmode is enabled, you cannot forward multiple messages to this group. |
| 420 | SLOWMODE\_WAIT\_%d | Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat. |
| 400 | SUGGESTED\_POST\_PEER\_INVALID | You cannot send suggested posts to non-[monoforum](/api/monoforum.md) peers. |
| 406 | TOPIC\_CLOSED | This topic was closed, you can't send messages to it anymore. |
| 406 | TOPIC\_DELETED | The specified topic was deleted. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | USER\_BOT\_TO\_BOT\_DISABLED | Bot-to-bot messaging is disabled because one of the two bots hasn't enabled the Bot to Bot setting in @BotFather. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |
| 400 | USER\_IS\_BOT | Bots can't send messages to other bots. |
| 403 | VOICE\_MESSAGES\_FORBIDDEN | This user's privacy settings forbid you from sending voice messages. |
| 400 | YOU\_BLOCKED\_USER | You blocked this user. |

### Related pages

#### [Bots FAQ](/bots/faq.md)

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [inputReplyToMonoForum](/constructor/inputReplyToMonoForum.md)
Used to send messages to a [monoforum topic](/api/monoforum.md).

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

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

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.

#### [Error handling ](/api/errors.md)
How to handle API return errors correctly.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
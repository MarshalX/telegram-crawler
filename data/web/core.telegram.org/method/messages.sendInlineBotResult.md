# messages.sendInlineBotResult

Send a result obtained using [messages.getInlineBotResults](/method/messages.getInlineBotResults.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendInlineBotResult#c0cf7646 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut allow_paid_stars:flags.21?long = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether to send the message silently (no notification will be triggered on the other client) |
| **background** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether to send the message in background |
| **clear\_draft** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether to clear the [draft](/api/drafts.md) |
| **hide\_via** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether to hide the `via @botname` in the resulting message (only for bot usernames encountered in the [config](/constructor/config.md)) |
| **peer** | [InputPeer](/type/InputPeer.md) | Destination |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the message should be sent in reply to the specified message or story. |
| **random\_id** | [long](/type/long.md) | Random ID to avoid resending the same query. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **query\_id** | [long](/type/long.md) | Query ID from [messages.getInlineBotResults](/method/messages.getInlineBotResults.md) |
| **id** | [string](/type/string.md) | Result ID from [messages.getInlineBotResults](/method/messages.getInlineBotResults.md) |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Scheduled message date for scheduled messages |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[InputPeer](/type/InputPeer.md) | Send this message as the specified peer |
| **quick\_reply\_shortcut** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[InputQuickReplyShortcut](/type/InputQuickReplyShortcut.md) | Add the message to the specified [quick reply shortcut »](/api/business.md#quick-reply-shortcuts), instead. |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[long](/type/long.md) | For [paid messages »](/api/paid-messages.md), specifies the amount of [Telegram Stars](/api/stars.md) the user has agreed to pay in order to send the message. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | ALLOW\_PAYMENT\_REQUIRED\_%d | This peer charges %d [Telegram Stars](/api/stars.md) per message, but the `allow_paid_stars` was not set or its value is smaller than %d. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_GUEST\_SEND\_FORBIDDEN | You join the discussion group before commenting, see [here&nbsp;&raquo;](/api/discussion.md#requiring-users-to-join-the-group) for more info. |
| 400 | CHAT\_RESTRICTED | You can't send messages in this chat, you were restricted. |
| 403 | CHAT\_SEND\_AUDIOS\_FORBIDDEN | You can't send audio messages in this chat. |
| 403 | CHAT\_SEND\_GAME\_FORBIDDEN | You can't send a game to this chat. |
| 403 | CHAT\_SEND\_GIFS\_FORBIDDEN | You can't send gifs in this chat. |
| 403 | CHAT\_SEND\_INLINE\_FORBIDDEN | You can't send inline messages in this group. |
| 403 | CHAT\_SEND\_MEDIA\_FORBIDDEN | You can't send media in this chat. |
| 403 | CHAT\_SEND\_PHOTOS\_FORBIDDEN | You can't send photos in this chat. |
| 403 | CHAT\_SEND\_PLAIN\_FORBIDDEN | You can't send non-media (text) messages in this chat. |
| 403 | CHAT\_SEND\_STICKERS\_FORBIDDEN | You can't send stickers in this chat. |
| 403 | CHAT\_SEND\_VOICES\_FORBIDDEN | You can't send voice recordings in this chat. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | INLINE\_RESULT\_EXPIRED | The inline query expired. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MEDIA\_EMPTY | The provided media object is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PRIVACY\_PREMIUM\_REQUIRED | You need a [Telegram Premium subscription](/api/premium.md) to send a message to this user. |
| 400 | QUERY\_ID\_EMPTY | The query ID is empty. |
| 400 | QUICK\_REPLIES\_TOO\_MUCH | A maximum of [appConfig.`quick_replies_limit`](/api/config.md#quick-replies-limit) shortcuts may be created, the limit was reached. |
| 500 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | REPLY\_MESSAGES\_TOO\_MUCH | Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](/api/config.md#quick-reply-messages-limit) messages, the limit was reached. |
| 400 | RESULT\_ID\_EMPTY | Result ID empty. |
| 400 | RESULT\_ID\_INVALID | One of the specified result IDs is invalid. |
| 400 | SCHEDULE\_DATE\_TOO\_LATE | You can't schedule a message this far in the future. |
| 400 | SCHEDULE\_TOO\_MUCH | There are too many scheduled messages. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |
| 500 | SEND\_MEDIA\_INVALID | The specified media is invalid. |
| 420 | SLOWMODE\_WAIT\_%d | Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat. |
| 400 | TOPIC\_DELETED | The specified topic was deleted. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | VOICE\_MESSAGES\_FORBIDDEN | This user's privacy settings forbid you from sending voice messages. |
| 400 | WEBPAGE\_CURL\_FAILED | Failure while fetching the webpage with cURL. |
| 400 | WEBPAGE\_MEDIA\_EMPTY | Webpage media empty. |
| 400 | YOU\_BLOCKED\_USER | You blocked this user. |

### Related pages

#### [Message drafts](/api/drafts.md)
How to handle message drafts

#### [config](/constructor/config.md)
Current configuration

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [messages.getInlineBotResults](/method/messages.getInlineBotResults.md)
Query an inline bot

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
# messages.sendMultiMedia

Send an [album or grouped media](/api/files.md#albums-grouped-media)

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether to send the album silently (no notification triggered) |
| **background** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Send in background? |
| **clear\_draft** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether to clear [drafts](/api/drafts.md) |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Only for bots, disallows forwarding and saving of the messages, even if the destination chat doesn't have [content protection](https://telegram.org/blog/content-protection-delete-by-date-and-more) enabled |
| **update\_stickersets\_order** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Whether to move used stickersets to top, [see here for more info on this flag »](/api/stickers.md#recent-stickersets) |
| **invert\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, any eventual webpage preview will be shown on top of the message instead of at the bottom. |
| **allow\_paid\_floodskip** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Bots only: if set, allows sending up to 1000 messages per second, ignoring [broadcasting limits](/bots/faq.md#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. |
| **peer** | [InputPeer](/type/InputPeer.md) | The destination chat |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the message should be sent in reply to the specified message or story. |
| **multi\_media** | [Vector](/type/Vector%20t)&lt;[InputSingleMedia](/type/InputSingleMedia.md)&gt; | The medias to send: note that they must be separately uploaded using [messages.uploadMedia](/method/messages.uploadMedia.md) first, using raw `inputMediaUploaded*` constructors is not supported. |
| **schedule\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Scheduled message date for scheduled messages |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[InputPeer](/type/InputPeer.md) | Send this message as the specified peer |
| **quick\_reply\_shortcut** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[InputQuickReplyShortcut](/type/InputQuickReplyShortcut.md) | Add the message to the specified [quick reply shortcut »](/api/business.md#quick-reply-shortcuts), instead. |
| **effect** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[long](/type/long.md) | Specifies a [message effect »](/api/effects.md) to use for the message. |
| **allow\_paid\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[long](/type/long.md) | For [paid messages »](/api/paid-messages.md), specifies the amount of [Telegram Stars](/api/stars.md) the user has agreed to pay in order to send the message. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | ALLOW\_PAYMENT\_REQUIRED\_%d | This peer charges %d [Telegram Stars](/api/stars.md) per message, but the `allow_paid_stars` was not set or its value is smaller than %d. |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | BUSINESS\_PEER\_INVALID | Messages can't be set to the specified peer through the current [business connection](/api/business.md#connected-bots). |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_FORWARDS\_RESTRICTED | You can't forward messages from a protected chat. |
| 403 | CHAT\_SEND\_MEDIA\_FORBIDDEN | You can't send media in this chat. |
| 403 | CHAT\_SEND\_PHOTOS\_FORBIDDEN | You can't send photos in this chat. |
| 403 | CHAT\_SEND\_VIDEOS\_FORBIDDEN | You can't send videos in this chat. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | EFFECT\_ID\_INVALID | The specified effect ID is invalid. |
| 400 | ENTITY\_BOUNDS\_INVALID | A specified [entity offset or length](/api/entities.md#entity-length) is invalid, see [here&nbsp;&raquo;](/api/entities.md#entity-length) for info on how to properly compute the entity offset/length. |
| 400 | FILE\_REFERENCE\_%d\_EMPTY | The file reference of the media file at offset %d in the multi_media array is invalid. |
| 400 | FILE\_REFERENCE\_%d\_EXPIRED | The file reference of the media file at index %d in the passed media array expired, it [must be refreshed as specified in the documentation](/api/file-references.md). . |
| 400 | FILE\_REFERENCE\_%d\_INVALID | The [file reference](/api/file-references.md) of the media file at index %d in the passed media array is invalid. |
| 400 | MEDIA\_CAPTION\_TOO\_LONG | The caption is too long. |
| 400 | MEDIA\_EMPTY | The provided media object is invalid. |
| 400 | MEDIA\_INVALID | Media invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | MULTI\_MEDIA\_TOO\_LONG | Too many media files for album. |
| 406 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PRIVACY\_PREMIUM\_REQUIRED | You need a [Telegram Premium subscription](/api/premium.md) to send a message to this user. |
| 400 | QUICK\_REPLIES\_BOT\_NOT\_ALLOWED | [Quick replies](/api/business.md#quick-reply-shortcuts) cannot be used by bots. |
| 400 | QUICK\_REPLIES\_TOO\_MUCH | A maximum of [appConfig.`quick_replies_limit`](/api/config.md#quick-replies-limit) shortcuts may be created, the limit was reached. |
| 500 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | RANDOM\_ID\_EMPTY | Random ID empty. |
| 400 | REPLY\_MESSAGES\_TOO\_MUCH | Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](/api/config.md#quick-reply-messages-limit) messages, the limit was reached. |
| 400 | REPLY\_TO\_INVALID | The specified `reply_to` field is invalid. |
| 400 | SCHEDULE\_DATE\_TOO\_LATE | You can't schedule a message this far in the future. |
| 400 | SCHEDULE\_TOO\_MUCH | There are too many scheduled messages. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |
| 420 | SLOWMODE\_WAIT\_%d | Slowmode is enabled in this chat: wait %d seconds before sending another message to this chat. |
| 400 | TOPIC\_CLOSED | This topic was closed, you can't send messages to it anymore. |
| 400 | TOPIC\_DELETED | The specified topic was deleted. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |
| 400 | USER\_IS\_BLOCKED | You were blocked by this user. |

### Related pages

#### [Message drafts](/api/drafts.md)
How to handle message drafts

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Bots FAQ](/bots/faq.md)

#### [messages.uploadMedia](/method/messages.uploadMedia.md)
Upload a file and associate it to a chat (without actually sending it to the chat)

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the business connection ID in the `business_connection_id` parameter.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [File references](/api/file-references.md)
How to handle file references.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
# channels.createChannel

Create a [supergroup/channel](/api/channel.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
channels.createChannel#91006707 flags:# broadcast:flags.0?true megagroup:flags.1?true for_import:flags.3?true forum:flags.5?true title:string about:string geo_point:flags.2?InputGeoPoint address:flags.2?string ttl_period:flags.4?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **broadcast** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to create a [channel](/api/channel.md) |
| **megagroup** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to create a [supergroup](/api/channel.md) |
| **for\_import** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the supergroup is being created to import messages from a foreign chat service using [messages.initHistoryImport](/method/messages.initHistoryImport.md) |
| **forum** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether to create a [forum](/api/forum.md) |
| **title** | [string](/type/string.md) | Channel title |
| **about** | [string](/type/string.md) | Channel description |
| **geo\_point** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputGeoPoint](/type/InputGeoPoint.md) | Geogroup location, see [here »](/api/nearby.md) for more info on geogroups. |
| **address** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Geogroup address, see [here »](/api/nearby.md) for more info on geogroups. |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Time-to-live of all messages that will be sent in the supergroup: once message.date+message.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. You can use [messages.setDefaultHistoryTTL](/method/messages.setDefaultHistoryTTL.md) to edit this value later. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ADDRESS\_INVALID | The specified geopoint address is invalid. |
| 400 | CHANNELS\_ADMIN\_LOCATED\_TOO\_MUCH | The user has reached the limit of public geogroups. |
| 400 | CHANNELS\_TOO\_MUCH | You have joined too many channels/supergroups. |
| 400 | CHAT\_ABOUT\_TOO\_LONG | Chat about too long. |
| 500 | CHAT\_INVALID | Invalid chat. |
| 400 | CHAT\_TITLE\_EMPTY | No chat title provided. |
| 400 | TTL\_PERIOD\_INVALID | The specified TTL period is invalid. |
| 406 | USER\_RESTRICTED | You're spamreported, you can't create channels or chats. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [messages.initHistoryImport](/method/messages.initHistoryImport.md)
Import chat history from a foreign chat app into a specific Telegram chat, [click here for more info about imported chats »](/api/import.md).

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Nearby users&chats](/api/nearby.md)
How to work with geolocation-based features like geochats and the nearby users feature.

#### [messages.setDefaultHistoryTTL](/method/messages.setDefaultHistoryTTL.md)
Changes the default value of the Time-To-Live setting, applied to all new chats.
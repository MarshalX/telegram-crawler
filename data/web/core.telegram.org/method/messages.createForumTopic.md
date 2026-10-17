# messages.createForumTopic

Create a [forum topic](/api/forum.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.createForumTopic#2f98c3d5 flags:# title_missing:flags.4?true peer:InputPeer title:string icon_color:flags.0?int icon_emoji_id:flags.3?long random_id:long send_as:flags.2?InputPeer = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title\_missing** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, the topic has no user-defined title, can only be set for the per-user topics of [bot forums](/api/forum.md#bot-forums); if this field is set, the topic title likely needs to be changed by the bot. |
| **peer** | [InputPeer](/type/InputPeer.md) | The supergroup, private chat (for forum-enabled bots) or forum bot (for users) where to create the topic. |
| **title** | [string](/type/string.md) | Topic title (maximum UTF-8 length: 128) |
| **icon\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If no custom emoji icon is specified, specifies the color of the fallback topic icon (RGB), one of `0x6FB9F0`, `0xFFD67E`, `0xCB86DB`, `0x8EEE98`, `0xFF93B2`, or `0xFB6F5F`. |
| **icon\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | ID of the [custom emoji](/api/custom-emoji.md) used as topic icon. [Telegram Premium](/api/premium.md) users can use any custom emoji, other users can only use the custom emojis contained in the [inputStickerSetEmojiDefaultTopicIcons](/constructor/inputStickerSetEmojiDefaultTopicIcons.md) emoji pack. |
| **random\_id** | [long](/type/long.md) | Unique client message ID to prevent duplicate sending of the same event. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPeer](/type/InputPeer.md) | Create the topic as the specified peer |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | BOT\_FORUM\_CREATE\_FORBIDDEN | Since the bot's user.bot_forum_can_manage_topics flag is **not** set, the user cannot create or modify bot forum topics. |
| 400 | CHANNEL\_FORUM\_MISSING | This supergroup is not a forum. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [inputStickerSetEmojiDefaultTopicIcons](/constructor/inputStickerSetEmojiDefaultTopicIcons.md)
Default [custom emoji](/api/custom-emoji.md) stickerset for [forum topic icons](/api/forum.md#forum-topics)

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.
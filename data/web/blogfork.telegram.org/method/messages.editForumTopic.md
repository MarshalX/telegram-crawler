# messages.editForumTopic

Edit [forum topic](/api/forum.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.editForumTopic#cecc1134 flags:# peer:InputPeer topic_id:int title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | The supergroup forum, private chat (for forum-enabled bots) or bot forum (for users) where the topic is located. |
| **topic\_id** | [int](/type/int.md) | Topic ID |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If present, will update the topic title (maximum UTF-8 length: 128). |
| **icon\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | If present, updates the [custom emoji](/api/custom-emoji.md) used as topic icon. [Telegram Premium](/api/premium.md) users can use any custom emoji, other users can only use the custom emojis contained in the [inputStickerSetEmojiDefaultTopicIcons](/constructor/inputStickerSetEmojiDefaultTopicIcons.md) emoji pack. Pass 0 to switch to the fallback topic icon. |
| **closed** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Bool](/type/Bool.md) | If present, will update the open/closed status of the topic. |
| **hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Bool](/type/Bool.md) | If present, will hide/unhide the topic (only valid for the "General" topic, `id=1`). |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | TOPIC\_CLOSE\_SEPARATELY | The `close` flag cannot be provided together with any of the other flags. |
| 400 | TOPIC\_NOT\_MODIFIED | The updated topic info is equal to the current topic info, nothing was changed. |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [inputStickerSetEmojiDefaultTopicIcons](/constructor/inputStickerSetEmojiDefaultTopicIcons.md)
Default [custom emoji](/api/custom-emoji.md) stickerset for [forum topic icons](/api/forum.md#forum-topics)

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.
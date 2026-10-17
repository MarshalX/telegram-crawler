# stories.activateStealthMode

Activates [stories stealth mode](/api/stories.md#stealth-mode), see [here »](/api/stories.md#stealth-mode) for more info.

Will return an [updateStoriesStealthMode](/constructor/updateStoriesStealthMode.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
stories.activateStealthMode#57bbd166 flags:# past:flags.0?true future:flags.1?true = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **past** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to erase views from any stories opened in the past [`stories_stealth_past_period` seconds »](/api/config.md#stories-stealth-past-period), as specified by the [client configuration](/api/config.md#client-configuration). |
| **future** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to hide future story views for the next [`stories_stealth_future_period` seconds »](/api/config.md#stories-stealth-future-period), as specified by the [client configuration](/api/config.md#client-configuration). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [updateStoriesStealthMode](/constructor/updateStoriesStealthMode.md)
Indicates that [stories stealth mode](/api/stories.md#stealth-mode) was activated.
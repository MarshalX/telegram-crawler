# stories.editStory

Edit an uploaded [story](/api/stories.md)

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`: in this context, the method can only be used to edit stories posted by the same business bot on behalf of the user with [stories.sendStory](/method/stories.sendStory.md).

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
stories.editStory#2c63a72b flags:# peer:InputPeer id:int media:flags.0?InputMedia media_areas:flags.3?Vector<MediaArea> caption:flags.1?string entities:flags.1?Vector<MessageEntity> privacy_rules:flags.2?Vector<InputPrivacyRule> music:flags.4?InputDocument = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the story was posted. |
| **id** | [int](/type/int.md) | ID of story to edit. |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputMedia](/type/InputMedia.md) | If specified, replaces the story media. |
| **media\_areas** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[MediaArea](/type/MediaArea.md)&gt; | [Media areas](/api/stories.md#media-areas) associated to the story, see [here »](/api/stories.md#media-areas) for more info. |
| **caption** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If specified, replaces the story caption. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text in the caption](/api/entities.md), if allowed by the [`stories_entities` client configuration parameter »](/api/config.md#stories-entities). |
| **privacy\_rules** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[InputPrivacyRule](/type/InputPrivacyRule.md)&gt; | If specified, alters the [privacy settings »](/api/privacy.md) of the story, changing who can or can't view the story. |
| **music** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[InputDocument](/type/InputDocument.md) | If set, the new audio track to play as background music for the story. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORY\_NOT\_MODIFIED | The new story information you passed is equal to the previous story information, thus it wasn't modified. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md)
Invoke a method using a [Telegram Business Bot connection, see here » for more info, including a list of the methods that can be wrapped in this constructor](/api/bots/connected-business-bots.md).

Make sure to always send queries wrapped in a `invokeWithBusinessConnection` to the datacenter ID, specified in the `dc_id` field of the [botBusinessConnection](/constructor/botBusinessConnection.md) that is being used.

#### [stories.sendStory](/method/stories.sendStory.md)
Uploads a [Telegram Story](/api/stories.md).

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`.
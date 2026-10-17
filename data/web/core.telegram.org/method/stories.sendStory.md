# stories.sendStory

Uploads a [Telegram Story](/api/stories.md).

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to add the story to the profile automatically upon expiration. If not set, the story will only be added to the archive, see [here »](/api/stories.md) for more info. |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, disables forwards, screenshots, and downloads. |
| **fwd\_modified** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Set this flag when reposting stories with `fwd_from_id`+`fwd_from_story`, if the `media` was modified before reposting. |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer to send the story as. |
| **media** | [InputMedia](/type/InputMedia.md) | The story media. |
| **media\_areas** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[Vector](/type/Vector%20t)&lt;[MediaArea](/type/MediaArea.md)&gt; | [Media areas](/api/stories.md#media-areas) associated to the story, see [here »](/api/stories.md#media-areas) for more info. |
| **caption** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Story caption. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md), if allowed by the [`stories_entities` client configuration parameter »](/api/config.md#stories-entities). |
| **privacy\_rules** | [Vector](/type/Vector%20t)&lt;[InputPrivacyRule](/type/InputPrivacyRule.md)&gt; | [Privacy rules](/api/privacy.md) for the story, indicating who can or can't view the story. |
| **random\_id** | [long](/type/long.md) | Unique client message ID required to prevent message resending. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **period** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Period after which the story is moved to archive (and to the profile if `pinned` is set), in seconds; must be one of `6 * 3600`, `12 * 3600`, `86400`, or `2 * 86400` for Telegram Premium users, and `86400` otherwise. |
| **fwd\_from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[InputPeer](/type/InputPeer.md) | If set, indicates that this story is a repost of story with ID `fwd_from_story` posted by the peer in `fwd_from_id`. |
| **fwd\_from\_story** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | If set, indicates that this story is a repost of story with ID `fwd_from_story` posted by the peer in `fwd_from_id`. |
| **albums** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | If set, adds the story to the specified albums. |
| **music** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[InputDocument](/type/InputDocument.md) | If set, the audio track to play as background music for the story. |

### Result
[Updates](/type/Updates.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOOSTS\_REQUIRED | The specified channel must first be [boosted by its users](/api/boost.md) in order to perform this action. |
| 403 | BOT\_ACCESS\_FORBIDDEN | The specified method *can* be used over a [business connection](/api/bots/connected-business-bots.md) for some operations, but the specified query attempted an operation that is not allowed over a business connection. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | IMAGE\_PROCESS\_FAILED | Failure while processing image. |
| 400 | MEDIA\_CAPTION\_TOO\_LONG | The caption is too long. |
| 400 | MEDIA\_EMPTY | The provided media object is invalid. |
| 400 | MEDIA\_FILE\_INVALID | The specified media file is invalid. |
| 400 | MEDIA\_TYPE\_INVALID | The specified media type cannot be used in stories. |
| 400 | MEDIA\_VIDEO\_STORY\_MISSING | A non-story video cannot be repubblished as a story (emitted when trying to resend a non-story video as a story using inputDocument). |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | PHOTO\_INVALID\_DIMENSIONS | The photo dimensions are invalid. |
| 400 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 400 | REACTION\_INVALID | The specified reaction is invalid. |
| 400 | STORIES\_TOO\_MUCH | You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](/api/config.md#story-expiring-limit-default): you should buy a [Premium](/api/premium.md) subscription, delete an active story, or wait for the oldest story to expire. |
| 400 | STORY\_PERIOD\_INVALID | The specified story period is invalid for this account. |
| 400 | VENUE\_ID\_INVALID | The specified venue ID is invalid. |
| 400 | VIDEO\_DURATION\_INVALID | The duration of the specified video is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [invokeWithBusinessConnection](/method/invokeWithBusinessConnection.md)
Invoke a method using a [Telegram Business Bot connection, see here » for more info, including a list of the methods that can be wrapped in this constructor](/api/bots/connected-business-bots.md).

Make sure to always send queries wrapped in a `invokeWithBusinessConnection` to the datacenter ID, specified in the `dc_id` field of the [botBusinessConnection](/constructor/botBusinessConnection.md) that is being used.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.
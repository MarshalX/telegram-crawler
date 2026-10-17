# chatBannedRights

Represents the rights of a normal user in a [supergroup/channel/chat](/api/channel.md). In this case, the flags are inverted: if set, a flag **does not allow** a user to do X.

```tl
chatBannedRights#9f120418 flags:# view_messages:flags.0?true send_messages:flags.1?true send_media:flags.2?true send_stickers:flags.3?true send_gifs:flags.4?true send_games:flags.5?true send_inline:flags.6?true embed_links:flags.7?true send_polls:flags.8?true change_info:flags.10?true invite_users:flags.15?true pin_messages:flags.17?true manage_topics:flags.18?true send_photos:flags.19?true send_videos:flags.20?true send_roundvideos:flags.21?true send_audios:flags.22?true send_voices:flags.23?true send_docs:flags.24?true send_plain:flags.25?true edit_rank:flags.26?true send_reactions:flags.27?true until_date:int = ChatBannedRights;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **view\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, does not allow a user to view messages in a [supergroup/channel/chat](/api/channel.md) |
| **send\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, does not allow a user to send messages in a [supergroup/chat](/api/channel.md) |
| **send\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, does not allow a user to send any media in a [supergroup/chat](/api/channel.md) |
| **send\_stickers** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, does not allow a user to send stickers in a [supergroup/chat](/api/channel.md) |
| **send\_gifs** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, does not allow a user to send gifs in a [supergroup/chat](/api/channel.md) |
| **send\_games** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, does not allow a user to send games in a [supergroup/chat](/api/channel.md) |
| **send\_inline** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | If set, does not allow a user to use inline bots in a [supergroup/chat](/api/channel.md). |
| **embed\_links** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, does not allow a user to embed links in the messages of a [supergroup/chat](/api/channel.md) |
| **send\_polls** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, does not allow a user to send polls in a [supergroup/chat](/api/channel.md) |
| **change\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, does not allow a user to change the description of a [supergroup/chat](/api/channel.md) |
| **invite\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | If set, does not allow a user to invite users in a [supergroup/chat](/api/channel.md) |
| **pin\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | If set, does not allow a user to pin messages in a [supergroup/chat](/api/channel.md) |
| **manage\_topics** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | If set, does not allow a user to create, delete or modify [forum topics »](/api/forum.md#forum-topics). |
| **send\_photos** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | If set, does not allow a user to send photos in a [supergroup/chat](/api/channel.md). |
| **send\_videos** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[true](/constructor/true.md) | If set, does not allow a user to send videos in a [supergroup/chat](/api/channel.md). |
| **send\_roundvideos** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[true](/constructor/true.md) | If set, does not allow a user to send round videos in a [supergroup/chat](/api/channel.md). |
| **send\_audios** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[true](/constructor/true.md) | If set, does not allow a user to send audio files in a [supergroup/chat](/api/channel.md). |
| **send\_voices** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[true](/constructor/true.md) | If set, does not allow a user to send voice messages in a [supergroup/chat](/api/channel.md). |
| **send\_docs** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | If set, does not allow a user to send documents in a [supergroup/chat](/api/channel.md). |
| **send\_plain** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[true](/constructor/true.md) | If set, does not allow a user to send text messages in a [supergroup/chat](/api/channel.md). |
| **edit\_rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | If set, does not allow a user to edit their own custom [tag (rank) »](/api/rank.md) in a [supergroup/chat](/api/channel.md). |
| **send\_reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[true](/constructor/true.md) | If set, does not allow a user to react to messages in a chat. |
| **until\_date** | [int](/type/int.md) | Validity of said permissions (it is considered forever any value less then 30 seconds or more then 366 days). |

### Type
[ChatBannedRights](/type/ChatBannedRights.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.
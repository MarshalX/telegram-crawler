# forumTopic

Represents a [forum topic](/api/forum.md#forum-topics).

```tl
forumTopic#fcdad815 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true title_missing:flags.7?true id:int date:int peer:Peer title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **my** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the topic was created by the current user |
| **closed** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the topic is closed (no messages can be sent to it) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the topic is pinned |
| **short** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this constructor is a reduced version of the full topic information. \
If set, only the `my`, `closed`, `id`, `date`, `title`, `icon_color`, `icon_emoji_id` and `from_id` parameters will contain valid information. \
Reduced info is usually only returned in topic-related [admin log events »](/api/recent-actions.md) and in the [messages.channelMessages](/constructor/messages.channelMessages.md) constructor: if needed, full information can be fetched using [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md). |
| **hidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether the topic is hidden (only valid for the "General" topic, `id=1`) |
| **title\_missing** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, the topic has no user-defined title, can only be set for the per-user topics of [bot forums](/api/forum.md#bot-forums); if this field is set, the topic title likely needs to be changed by the bot. |
| **id** | [int](/type/int.md) | [Topic ID](/api/forum.md#forum-topics) |
| **date** | [int](/type/int.md) | Topic creation date |
| **peer** | [Peer](/type/Peer.md) | Contains the supergroup/private chat where the topic is located.  \
This field is useful especially when this object is returned by methods like [messages.getMessages](/method/messages.getMessages.md), which can return messages and forum topics belonging to different (private chat) peers in the same method call, making it impossible to tell the topic's peer based on the method call parameters or surrounding context. |
| **title** | [string](/type/string.md) | Topic title |
| **icon\_color** | [int](/type/int.md) | If no custom emoji icon is specified, specifies the color of the fallback topic icon (RGB), one of `0x6FB9F0`, `0xFFD67E`, `0xCB86DB`, `0x8EEE98`, `0xFF93B2`, or `0xFB6F5F`. |
| **icon\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of the [custom emoji](/api/custom-emoji.md) used as topic icon. |
| **top\_message** | [int](/type/int.md) | ID of the last message that was sent to this topic |
| **read\_inbox\_max\_id** | [int](/type/int.md) | Position up to which all incoming messages are read. |
| **read\_outbox\_max\_id** | [int](/type/int.md) | Position up to which all outgoing messages are read. |
| **unread\_count** | [int](/type/int.md) | Number of unread messages |
| **unread\_mentions\_count** | [int](/type/int.md) | Number of [unread mentions](/api/mentions.md) |
| **unread\_reactions\_count** | [int](/type/int.md) | Number of unread reactions to messages you sent |
| **unread\_poll\_votes\_count** | [int](/type/int.md) | Number of [unread votes cast in non-anonymous polls »](/api/poll.md#unread-poll-votes) owned by the user in this forum topic. |
| **from\_id** | [Peer](/type/Peer.md) | ID of the peer that created the topic |
| **notify\_settings** | [PeerNotifySettings](/type/PeerNotifySettings.md) | Notification settings |
| **draft** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[DraftMessage](/type/DraftMessage.md) | Message [draft](/api/drafts.md) |

### Type
[ForumTopic](/type/ForumTopic.md)

### Related pages

#### [Admin log](/api/recent-actions.md)
Both supergroups and channels offer a so-called admin log, a log of recent relevant supergroup and channel actions, like the modification of group/channel settings or information on behalf of an admin, user kicks and bans, and more.

#### [messages.channelMessages](/constructor/messages.channelMessages.md)
Channel messages

#### [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md)
Get forum topics by their ID

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [messages.getMessages](/method/messages.getMessages.md)
Returns the list of messages by their IDs.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Mentions and replies](/api/mentions.md)
Telegram allows mentioning other users in case of urgent duckling matters, and quickly navigating to those mentions in order to read them as swiftly as possible.

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

#### [Message drafts](/api/drafts.md)
How to handle message drafts
# dialog

Chat

```tl
dialog#fc89f7f3 flags:# pinned:flags.2?true unread_mark:flags.3?true view_forum_as_messages:flags.6?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int notify_settings:PeerNotifySettings pts:flags.0?int draft:flags.1?DraftMessage folder_id:flags.4?int ttl_period:flags.5?int = Dialog;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Is the dialog pinned |
| **unread\_mark** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the chat was manually marked as unread |
| **view\_forum\_as\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Users may also choose to display messages from all topics of a [forum](/api/forum.md) as if they were sent to a normal group, using a "View as messages" setting in the local client.  \
This setting only affects the current account, and is synced to other logged in sessions using the [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md) method; invoking this method will update the value of this flag. |
| **peer** | [Peer](/type/Peer.md) | The chat |
| **top\_message** | [int](/type/int.md) | The latest message ID |
| **read\_inbox\_max\_id** | [int](/type/int.md) | Position up to which all incoming messages are read. |
| **read\_outbox\_max\_id** | [int](/type/int.md) | Position up to which all outgoing messages are read. |
| **unread\_count** | [int](/type/int.md) | Number of unread messages |
| **unread\_mentions\_count** | [int](/type/int.md) | Number of [unread mentions](/api/mentions.md) |
| **unread\_reactions\_count** | [int](/type/int.md) | Number of unread reactions to messages you sent |
| **unread\_poll\_votes\_count** | [int](/type/int.md) | Number of [unread votes cast in non-anonymous polls »](/api/poll.md#unread-poll-votes) owned by the user in this dialog. |
| **notify\_settings** | [PeerNotifySettings](/type/PeerNotifySettings.md) | Notification settings |
| **pts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [PTS](/api/updates.md) |
| **draft** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[DraftMessage](/type/DraftMessage.md) | Message [draft](/api/drafts.md) |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Time-to-live of all messages sent in this dialog |

### Type
[Dialog](/type/Dialog.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md)
Users may also choose to display messages from all topics of a [forum](/api/forum.md) as if they were sent to a normal group, using a "View as messages" setting in the local client: this setting only affects the current account, and is synced to other logged in sessions using this method.

Invoking this method will update the value of the `view_forum_as_messages` flag of [channelFull](/constructor/channelFull.md) or [dialog](/constructor/dialog.md) and emit an [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md).

#### [Mentions and replies](/api/mentions.md)
Telegram allows mentioning other users in case of urgent duckling matters, and quickly navigating to those mentions in order to read them as swiftly as possible.

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Message drafts](/api/drafts.md)
How to handle message drafts

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.
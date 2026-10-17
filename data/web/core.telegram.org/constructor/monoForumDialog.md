# monoForumDialog

Represents a [monoforum topic »](/api/monoforum.md).

```tl
monoForumDialog#64407ea7 flags:# unread_mark:flags.3?true nopaid_messages_exception:flags.4?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_reactions_count:int draft:flags.1?DraftMessage = SavedDialog;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unread\_mark** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this topic has a manually set (with [messages.markDialogUnread](/method/messages.markDialogUnread.md)) unread mark. |
| **nopaid\_messages\_exception** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, an admin has exempted this peer from payment to send messages using [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md). |
| **peer** | [Peer](/type/Peer.md) | The peer associated to the topic, AKA the topic ID. |
| **top\_message** | [int](/type/int.md) | The latest message ID |
| **read\_inbox\_max\_id** | [int](/type/int.md) | Position up to which all incoming messages are read. |
| **read\_outbox\_max\_id** | [int](/type/int.md) | Position up to which all outgoing messages are read. |
| **unread\_count** | [int](/type/int.md) | Number of unread messages. |
| **unread\_reactions\_count** | [int](/type/int.md) | Number of unread reactions. |
| **draft** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[DraftMessage](/type/DraftMessage.md) | A pending message [draft](/api/drafts.md). |

### Type
[SavedDialog](/type/SavedDialog.md)

### Related pages

#### [messages.markDialogUnread](/method/messages.markDialogUnread.md)
Manually mark dialog as unread

#### [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md)
Allow a user to send us messages without paying if [paid messages »](/api/paid-messages.md) are enabled.

#### [Message drafts](/api/drafts.md)
How to handle message drafts

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.
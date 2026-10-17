# SavedDialog

Represents a [saved message dialog »](/api/saved-messages.md).

```tl
savedDialog#bd87cb6c flags:# pinned:flags.2?true peer:Peer top_message:int = SavedDialog;
monoForumDialog#64407ea7 flags:# unread_mark:flags.3?true nopaid_messages_exception:flags.4?true peer:Peer top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_reactions_count:int draft:flags.1?DraftMessage = SavedDialog;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [savedDialog](/constructor/savedDialog.md) | Represents a [saved dialog »](/api/saved-messages.md). |
| [monoForumDialog](/constructor/monoForumDialog.md) | Represents a [monoforum topic »](/api/monoforum.md). |

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
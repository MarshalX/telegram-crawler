# messages.getSavedDialogs

Returns the current [saved dialog list »](/api/saved-messages.md) or [monoforum topic list »](/api/monoforum.md).

```tl
messages.savedDialogs#f83ae221 dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsSlice#44ba9dd9 count:int dialogs:Vector<SavedDialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.SavedDialogs;
messages.savedDialogsNotModified#c01f6fe8 count:int = messages.SavedDialogs;
---functions---
messages.getSavedDialogs#1e91fc99 flags:# exclude_pinned:flags.0?true parent_peer:flags.1?InputPeer offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:long = messages.SavedDialogs;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **exclude\_pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Exclude pinned dialogs |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | If set, fetches the topic list of the passed monoforum, otherwise fetches the saved dialog list. |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) (`top_message` ID used for pagination) |
| **offset\_peer** | [InputPeer](/type/InputPeer.md) | [Offset peer for pagination](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Number of list elements to be returned |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Result
[messages.SavedDialogs](/type/messages.SavedDialogs.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.
# updateReadHistoryInbox

Incoming messages were read

```tl
updateReadHistoryInbox#9e84bc99 flags:# folder_id:flags.0?int peer:Peer top_msg_id:flags.1?int max_id:int still_unread_count:int pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **peer** | [Peer](/type/Peer.md) | Peer |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If set, the messages were read only within the specified [bot forum topic »](/api/forum.md#bot-forums). |
| **max\_id** | [int](/type/int.md) | Maximum ID of messages read |
| **still\_unread\_count** | [int](/type/int.md) | Number of messages that are still unread |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.
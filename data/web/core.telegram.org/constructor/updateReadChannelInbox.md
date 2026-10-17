# updateReadChannelInbox

Incoming messages in a [channel/supergroup](/api/channel.md) were read

```tl
updateReadChannelInbox#922e6e10 flags:# folder_id:flags.0?int channel_id:long max_id:int still_unread_count:int pts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **channel\_id** | [long](/type/long.md) | Channel/supergroup ID |
| **max\_id** | [int](/type/int.md) | Position up to which all incoming messages are read. |
| **still\_unread\_count** | [int](/type/int.md) | Count of messages weren't read yet |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
# channels.getAdminLog

Get the admin log of a [channel/supergroup](/api/channel.md)

```tl
channels.adminLogResults#ed8af74d events:Vector<ChannelAdminLogEvent> chats:Vector<Chat> users:Vector<User> = channels.AdminLogResults;
---functions---
channels.getAdminLog#33ddf480 flags:# channel:InputChannel q:string events_filter:flags.0?ChannelAdminLogEventsFilter admins:flags.1?Vector<InputUser> max_id:long min_id:long limit:int = channels.AdminLogResults;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel |
| **q** | [string](/type/string.md) | Search query, can be empty |
| **events\_filter** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[ChannelAdminLogEventsFilter](/type/ChannelAdminLogEventsFilter.md) | Event filter |
| **admins** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[InputUser](/type/InputUser.md)&gt; | Only show events from these admins |
| **max\_id** | [long](/type/long.md) | Maximum ID of message to return (see [pagination](/api/offsets.md)) |
| **min\_id** | [long](/type/long.md) | Minimum ID of message to return (see [pagination](/api/offsets.md)) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[channels.AdminLogResults](/type/channels.AdminLogResults.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
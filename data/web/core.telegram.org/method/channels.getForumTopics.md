# channels.getForumTopics

Get [topics of a forum](/api/forum.md)

No such method in the current schema.

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel** | [InputChannel](/type/InputChannel.md) | Supergroup |
| **q** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Search query |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md), date of the last message of the last found topic. Use 0 or any date in the future to get results from the last topic. |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md), ID of the last message of the last found topic (or initially `0`). |
| **offset\_topic** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md), ID of the last found topic (or initially `0`). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md). For optimal performance, the number of returned topics is chosen by the server and can be smaller than the specified limit. |

### Result
[messages.ForumTopics](/type/messages.ForumTopics.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_FORUM\_MISSING | This supergroup is not a forum. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Forums](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
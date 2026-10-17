# channels.exportMessageLink

Get link and embed info of a message in a [channel/supergroup](/api/channel.md)

```tl
exportedMessageLink#5dab1af4 link:string html:string = ExportedMessageLink;
---functions---
channels.exportMessageLink#e63fadeb flags:# grouped:flags.0?true thread:flags.1?true channel:InputChannel id:int = ExportedMessageLink;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **grouped** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to include other grouped media (for albums) |
| **thread** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to also include a thread ID, if available, inside of the link |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel |
| **id** | [int](/type/int.md) | Message ID |

### Result
[ExportedMessageLink](/type/ExportedMessageLink.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.
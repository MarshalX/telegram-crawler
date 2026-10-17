# account.initTakeoutSession

Initialize a [takeout session, see here » for more info](/api/takeout.md).

```tl
account.takeout#4dba4501 id:long = account.Takeout;
---functions---
account.initTakeoutSession#8ef3eab0 flags:# contacts:flags.0?true message_users:flags.1?true message_chats:flags.2?true message_megagroups:flags.3?true message_channels:flags.4?true files:flags.5?true file_max_size:flags.5?long = account.Takeout;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to export contacts |
| **message\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to export messages in private chats |
| **message\_chats** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to export messages in [basic groups](/api/channel.md#basic-groups) |
| **message\_megagroups** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether to export messages in [supergroups](/api/channel.md#supergroups) |
| **message\_channels** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether to export messages in [channels](/api/channel.md#channels) |
| **files** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether to export files |
| **file\_max\_size** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[long](/type/long.md) | Maximum size of files to export |

### Result
[account.Takeout](/type/account.Takeout.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 420 | TAKEOUT\_INIT\_DELAY\_%d | Sorry, for security reasons, you will be able to begin downloading your data in %d seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Takeout API](/api/takeout.md)
Telegram's API allows users to export all of their information through the takeout API.
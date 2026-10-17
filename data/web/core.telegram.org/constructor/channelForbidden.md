# channelForbidden

Indicates a channel/supergroup we can't access because we were banned, or for some other reason.

```tl
channelForbidden#17d493d5 flags:# broadcast:flags.5?true megagroup:flags.8?true monoforum:flags.10?true id:long access_hash:long title:string until_date:flags.16?int = Chat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **broadcast** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Is this a channel |
| **megagroup** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Is this a supergroup |
| **monoforum** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, this is a [monoforum »](/api/monoforum.md). |
| **id** | [long](/type/long.md) | Channel ID |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **title** | [string](/type/string.md) | Title |
| **until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[int](/type/int.md) | The ban is valid until the specified date |

### Type
[Chat](/type/Chat.md)

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.
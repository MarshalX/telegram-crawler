# updates.channelDifferenceEmpty

There are no new updates

```tl
updates.channelDifferenceEmpty#3e11affb flags:# final:flags.0?true pts:int timeout:flags.1?int = updates.ChannelDifference;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **final** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether there are more updates that must be fetched (always false) |
| **pts** | [int](/type/int.md) | The latest [PTS](/api/updates.md) |
| **timeout** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Clients are supposed to refetch the channel difference after timeout seconds have elapsed, if the user is [currently viewing the chat, see here »](/api/updates.md#subscribing-to-updates-of-channels-supergroups) for more info. |

### Type
[updates.ChannelDifference](/type/updates.ChannelDifference.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.
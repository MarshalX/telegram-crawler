# updateChannelTooLong

There are new updates in the specified channel, the client must fetch them manually by invoking [updates.getChannelDifference](/method/updates.getChannelDifference.md) as specified in the [documentation »](/api/updates.md).

If the channel's PTS isn't currently stored in the database (i.e. we joined this channel on another client while the current client was offline), start fetching from the specified pts.

Does **not** necessarily indicate the [channel message box size limit was reached](/api/updates.md#recovering-gaps-for-very-old-messages), it simply indicates that the number of queued updates in a message box is too large to be delivered passively through the socket.

```tl
updateChannelTooLong#108d941f flags:# channel_id:long pts:flags.0?int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel\_id** | [long](/type/long.md) | The channel |
| **pts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | The [PTS](/api/updates.md). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [updates.getChannelDifference](/method/updates.getChannelDifference.md)
Returns the difference between the current state of updates of a certain channel and transmitted.
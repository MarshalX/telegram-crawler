# channels.getFutureCreatorAfterLeave

Group/channel owners only: returns the ID of the user that will become the new owner of the group if we decide to leave the group, see [here »](/api/channel.md#leaving-groups-channels) for more info on the full flow.

No such method in the current schema.

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The basic supergroup/channel we're about to leave. |

### Result
[User](/type/User.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
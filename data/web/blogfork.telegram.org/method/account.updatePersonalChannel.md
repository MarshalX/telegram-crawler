# account.updatePersonalChannel

Associate (or remove) a personal [channel »](/api/channel.md), that will be listed on our personal [profile page »](/api/profile.md#personal-channel).

Changing it will emit an [updateUser](/constructor/updateUser.md) update.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updatePersonalChannel#d94305e0 channel:InputChannel = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The channel, pass [inputChannelEmpty](/constructor/inputChannelEmpty.md) to remove it. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PUBLIC\_BROADCAST\_EXPECTED | `channel` only accepts a channel, but a supergroup was passed. |

### Related pages

#### [inputChannelEmpty](/constructor/inputChannelEmpty.md)
Represents the absence of a channel

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!

#### [updateUser](/constructor/updateUser.md)
User ([user](/constructor/user.md) and/or [userFull](/constructor/userFull.md)) information was updated.

This update can only be received through getDifference or in [updates](/constructor/updates.md)/[updatesCombined](/constructor/updatesCombined.md) constructors, so it will **always** come bundled with the updated [user](/constructor/user.md), that should be applied [as usual »](/api/peers.md), **without** re-fetching the info manually.

However, full peer information will not come bundled in updates, so the full peer cache ([userFull](/constructor/userFull.md)) must be invalidated for `user_id` when receiving this update.
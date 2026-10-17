# updateUser

User ([user](/constructor/user.md) and/or [userFull](/constructor/userFull.md)) information was updated.

This update can only be received through getDifference or in [updates](/constructor/updates.md)/[updatesCombined](/constructor/updatesCombined.md) constructors, so it will **always** come bundled with the updated [user](/constructor/user.md), that should be applied [as usual »](/api/peers.md), **without** re-fetching the info manually.

However, full peer information will not come bundled in updates, so the full peer cache ([userFull](/constructor/userFull.md)) must be invalidated for `user_id` when receiving this update.

```tl
updateUser#20529438 user_id:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | User ID |

### Type
[Update](/type/Update.md)

### Related pages

#### [user](/constructor/user.md)
Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).

#### [userFull](/constructor/userFull.md)
Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Updates](/constructor/updates.md)
Full constructor of updates

#### [updatesCombined](/constructor/updatesCombined.md)
Constructor for a group of updates.

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.
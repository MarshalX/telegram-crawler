# updateChat

Chat ([chat](/constructor/chat.md) and/or [chatFull](/constructor/chatFull.md)) information was updated.

This update can only be received through getDifference or in [updates](/constructor/updates.md)/[updatesCombined](/constructor/updatesCombined.md) constructors, so it will **always** come bundled with the updated [chat](/constructor/chat.md), that should be applied [as usual »](/api/peers.md), **without** re-fetching the info manually.

However, full peer information will not come bundled in updates, so the full peer cache ([chatFull](/constructor/chatFull.md)) must be invalidated for `chat_id` when receiving this update.

```tl
updateChat#f89a6a4e chat_id:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | Chat ID |

### Type
[Update](/type/Update.md)

### Related pages

#### [chat](/constructor/chat.md)
Info about a group.

When updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/077f71addad9db5d1a5692cc1255438793e75636/td/telegram/ChatManager.cpp#L5679) for an implementation of the logic to use when updating the [local chat peer database](/api/peers.md).

#### [chatFull](/constructor/chatFull.md)
Full info about a [basic group](/api/channel.md#basic-groups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Updates](/constructor/updates.md)
Full constructor of updates

#### [updatesCombined](/constructor/updatesCombined.md)
Constructor for a group of updates.

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.
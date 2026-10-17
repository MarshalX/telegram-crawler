# inputPeerUser

Defines a user for further interaction.

```tl
inputPeerUser#dde8a54c user_id:long access_hash:long = InputPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | User identifier |
| **access\_hash** | [long](/type/long.md) | **access\_hash** value from the [user](/constructor/user.md) constructor |

### Type
[InputPeer](/type/InputPeer.md)

### Related pages

#### [user](/constructor/user.md)
Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).
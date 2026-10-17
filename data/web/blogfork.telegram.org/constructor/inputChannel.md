# inputChannel

Represents a channel

```tl
inputChannel#f35aec28 channel_id:long access_hash:long = InputChannel;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | Channel ID |
| **access\_hash** | [long](/type/long.md) | Access hash taken from the [channel](/constructor/channel.md) constructor |

### Type
[InputChannel](/type/InputChannel.md)

### Related pages

#### [channel](/constructor/channel.md)
Channel/supergroup info

When updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

The only exception to the above rule is when the `min` flag is set, in which case **only** the following fields must be applied over any locally stored version:

- `title`
- `megagroup`
- `color`
- `photo`
- `username`
- `usernames`
- `has_geo`
- `noforwards`
- `emoji_status`
- `has_link`
- `slow_mode_enabled`
- `scam`
- `fake`
- `gigagroup`
- `forum`
- `level`
- `restricted`
- `restriction_reason`
- `join_to_send`
- `join_request`
- `is_verified`
- `default_banned_rights`
- `signature_profiles`
- `autotranslation`
- `broadcast_messages_allowed`
- `monoforum`
- `forum_tabs`
- `linked_monoforum_id`
- `send_paid_messages_stars`
- `bot_verification_icon`

See [here »](https://github.com/tdlib/td/blob/077f71addad9db5d1a5692cc1255438793e75636/td/telegram/ChatManager.cpp#L9176) for an implementation of the logic to use when updating the [local channel peer database](/api/peers.md).
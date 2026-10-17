# recentStory

Summary of a peer's [active stories »](/api/stories.md#recent-story-summaries), embedded in [user](/constructor/user.md).`stories_max_id` and [channel](/constructor/channel.md).`stories_max_id` and returned by [stories.getPeerMaxIDs](/method/stories.getPeerMaxIDs.md).

```tl
recentStory#711d692d flags:# live:flags.0?true max_id:flags.1?int = RecentStory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **live** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the peer is currently broadcasting a [live story »](/api/stories.md#live-stories). |
| **max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If `live` is set, ID of the peer's active [live story »](/api/stories.md#live-stories); otherwise, ID of the peer's maximum active story. |

### Type
[RecentStory](/type/RecentStory.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [user](/constructor/user.md)
Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).

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

#### [stories.getPeerMaxIDs](/method/stories.getPeerMaxIDs.md)
Get compact [active story summaries »](/api/stories.md#recent-story-summaries) for a set of peers.
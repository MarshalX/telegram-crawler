# chatAdminRights

Represents the rights of an admin in a [channel/supergroup](/api/channel.md).

```tl
chatAdminRights#5fb224d5 flags:# change_info:flags.0?true post_messages:flags.1?true edit_messages:flags.2?true delete_messages:flags.3?true ban_users:flags.4?true invite_users:flags.5?true pin_messages:flags.7?true add_admins:flags.9?true anonymous:flags.10?true manage_call:flags.11?true other:flags.12?true manage_topics:flags.13?true post_stories:flags.14?true edit_stories:flags.15?true delete_stories:flags.16?true manage_direct_messages:flags.17?true manage_ranks:flags.18?true = ChatAdminRights;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **change\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, allows the admin to modify the description of the [channel/supergroup](/api/channel.md) |
| **post\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, allows the admin to post messages in the [channel](/api/channel.md) |
| **edit\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, allows the admin to also edit messages from other admins in the [channel](/api/channel.md) |
| **delete\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, allows the admin to also delete messages from other admins in the [channel](/api/channel.md) |
| **ban\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, allows the admin to ban users from the [channel/supergroup](/api/channel.md) |
| **invite\_users** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, allows the admin to invite users in the [channel/supergroup](/api/channel.md) |
| **pin\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, allows the admin to pin messages in the [channel/supergroup](/api/channel.md) |
| **add\_admins** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | If set, allows the admin to add other admins with the same (or more limited) permissions in the [channel/supergroup](/api/channel.md) |
| **anonymous** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Whether this admin is anonymous |
| **manage\_call** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | If set, allows the admin to create and administer [video chats/livestreams »](/api/group-calls.md#video-chats-livestreams) |
| **other** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Set this flag if none of the other flags are set, but you still want the user to be an admin: if this or any of the other flags are set, the admin can get the chat [admin log](/api/recent-actions.md), get [chat statistics](/api/stats.md), get [message statistics in channels](/api/stats.md), get channel members, see anonymous administrators in supergroups and ignore slow mode. |
| **manage\_topics** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | If set, allows the admin to create, delete or modify [forum topics »](/api/forum.md#forum-topics). |
| **post\_stories** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | If set, allows the admin to post [stories](/api/stories.md) as the [channel](/api/channel.md). |
| **edit\_stories** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | If set, allows the admin to edit [stories](/api/stories.md) posted by the other admins of the [channel](/api/channel.md). |
| **delete\_stories** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, allows the admin to delete [stories](/api/stories.md) posted by the other admins of the [channel](/api/channel.md). |
| **manage\_direct\_messages** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | If set, allows the admin to manage the [direct messages monoforum »](/api/monoforum.md) and [decline suggested posts »](/api/suggested-posts.md). |
| **manage\_ranks** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | If set, allows the admin to modify the [member tag »](/api/rank.md) of any user. |

### Type
[ChatAdminRights](/type/ChatAdminRights.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Admin log](/api/recent-actions.md)
Both supergroups and channels offer a so-called admin log, a log of recent relevant supergroup and channel actions, like the modification of group/channel settings or information on behalf of an admin, user kicks and bans, and more.

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Suggested posts](/api/suggested-posts.md)
Telegram offers a powerful monetization feature to channel administrators: suggested posts.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.
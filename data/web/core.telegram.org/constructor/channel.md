# channel

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

```tl
channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the current user is the creator of this channel |
| **left** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the current user has left or is not a member of this channel |
| **broadcast** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Is this a channel? |
| **verified** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Is this channel verified by telegram? |
| **megagroup** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Is this a supergroup? \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **restricted** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether viewing/writing in this channel for a reason (see `restriction_reason`) |
| **signatures** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether signatures are enabled (channels) |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | See [min](/api/min.md) |
| **scam** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | This channel/supergroup is probably a scam \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **has\_link** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[true](/constructor/true.md) | Whether this channel has a linked [discussion group »](/api/discussion.md) (or this supergroup is a channel's discussion group). The actual ID of the linked channel/supergroup is contained in [channelFull](/constructor/channelFull.md).`linked_chat_id`. \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **has\_geo** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[true](/constructor/true.md) | Whether this chanel has a geoposition |
| **slowmode\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[true](/constructor/true.md) | Whether slow mode is enabled for groups to prevent flood in chat. \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **call\_active** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[true](/constructor/true.md) | Whether a group call or livestream is currently active |
| **call\_not\_empty** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | Whether there's anyone in the group call or livestream |
| **fake** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[true](/constructor/true.md) | If set, this [supergroup/channel](/api/channel.md) was reported by many users as a fake or scam: be careful when interacting with it. \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **gigagroup** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | Whether this [supergroup](/api/channel.md) is a gigagroup\
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[true](/constructor/true.md) | Whether this channel or group is [protected](https://telegram.org/blog/content-protection-delete-by-date-and-more), thus does not allow forwarding messages from it |
| **join\_to\_send** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[true](/constructor/true.md) | Whether a user needs to join the supergroup before they can send messages: can be false only for [discussion groups »](/api/discussion.md), toggle using [channels.toggleJoinToSend](/method/channels.toggleJoinToSend.md)\
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **join\_request** | [flags](/mtproto/TL-combinators.md#conditional-fields).29?[true](/constructor/true.md) | Whether a user's join request will have to be [approved by administrators](/api/invites.md#join-requests), toggle using [channels.toggleJoinToSend](/method/channels.toggleJoinRequest.md)\
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **forum** | [flags](/mtproto/TL-combinators.md#conditional-fields).30?[true](/constructor/true.md) | Whether this supergroup is a [forum](/api/forum.md). \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **flags2** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **stories\_hidden** | [flags2](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we have [hidden all stories posted by this channel »](/api/stories.md#hiding-stories-of-other-users). |
| **stories\_hidden\_min** | [flags2](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, indicates that the `stories_hidden` flag was not populated, and its value must cannot be relied on; use the previously cached value, or re-fetch the constructor using [channels.getChannels](/method/channels.getChannels.md) to obtain the latest value of the `stories_hidden` flag. |
| **stories\_unavailable** | [flags2](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | No stories from the channel are visible. |
| **signature\_profiles** | [flags2](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | If set, messages sent by admins to this channel will link to the admin's profile (just like with groups). |
| **autotranslation** | [flags2](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | If set, [autotranslation](/api/translation.md#autotranslation-for-channels) was enabled for all users by the admin of the channel, as specified [here »](/api/translation.md#autotranslation-for-channels). |
| **broadcast\_messages\_allowed** | [flags2](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, this channel has an associated [monoforum »](/api/monoforum.md), and its ID is specified in the `linked_monoforum_id` flag. |
| **monoforum** | [flags2](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | If set, this is a [monoforum »](/api/monoforum.md), and the ID of the associated channel is specified in the `linked_monoforum_id`. |
| **forum\_tabs** | [flags2](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | [If set, enables the tabbed forum UI »](/api/forum.md#tabbed-or-list-based-forum-ui). |
| **id** | [long](/type/long.md) | ID of the channel, see [here »](/api/peers.md#peer-id) for more info and the available ID range. |
| **access\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[long](/type/long.md) | Access hash, see [here »](/api/peers.md#access-hash) for more info |
| **title** | [string](/type/string.md) | Title |
| **username** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[string](/type/string.md) | Main active username. |
| **photo** | [ChatPhoto](/type/ChatPhoto.md) | Profile photo |
| **date** | [int](/type/int.md) | Date when the user joined the supergroup/channel, or if the user isn't a member, its creation date |
| **restriction\_reason** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[Vector](/type/Vector%20t)&lt;[RestrictionReason](/type/RestrictionReason.md)&gt; | Contains the reason why access to this channel must be restricted. \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **admin\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[ChatAdminRights](/type/ChatAdminRights.md) | Admin rights of the user in this channel (see [rights](/api/rights.md)) |
| **banned\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[ChatBannedRights](/type/ChatBannedRights.md) | Banned rights of the user in this channel (see [rights](/api/rights.md)) |
| **default\_banned\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[ChatBannedRights](/type/ChatBannedRights.md) | Default chat rights (see [rights](/api/rights.md)) |
| **participants\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[int](/type/int.md) | Participant count |
| **usernames** | [flags2](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[Username](/type/Username.md)&gt; | Additional usernames |
| **stories\_max\_id** | [flags2](/mtproto/TL-combinators.md#conditional-fields).4?[RecentStory](/type/RecentStory.md) | Summary of the channel or supergroup's [active stories »](/api/stories.md#recent-story-summaries). |
| **color** | [flags2](/mtproto/TL-combinators.md#conditional-fields).7?[PeerColor](/type/PeerColor.md) | The channel's [accent color](/api/colors.md). |
| **profile\_color** | [flags2](/mtproto/TL-combinators.md#conditional-fields).8?[PeerColor](/type/PeerColor.md) | The channel's [profile color](/api/colors.md). |
| **emoji\_status** | [flags2](/mtproto/TL-combinators.md#conditional-fields).9?[EmojiStatus](/type/EmojiStatus.md) | [Emoji status](/api/emoji-status.md) |
| **level** | [flags2](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | [Boost level](/api/boost.md). \
Changes to this flag should invalidate the local [channelFull](/constructor/channelFull.md) cache for this channel/supergroup ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **subscription\_until\_date** | [flags2](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | Expiration date of the [Telegram Star subscription »](/api/stars.md#star-subscriptions) the current user has bought to gain access to this channel. |
| **bot\_verification\_icon** | [flags2](/mtproto/TL-combinators.md#conditional-fields).13?[long](/type/long.md) | Describes a [bot verification icon »](/api/bots/verification.md). |
| **send\_paid\_messages\_stars** | [flags2](/mtproto/TL-combinators.md#conditional-fields).14?[long](/type/long.md) | If set, this supergroup or [monoforum](/api/monoforum.md) has enabled [paid messages »](/api/paid-messages.md), we *might* need to pay the specified amount of [Stars](/api/stars.md) to send messages to it, depending on the configured exceptions: check [channelFull](/constructor/channelFull.md).`send_paid_messages_stars` to see if the currently logged in user actually has to pay or not, see [here »](/api/paid-messages.md) for the full flow (only set for the monoforum, not the associated channel). |
| **linked\_monoforum\_id** | [flags2](/mtproto/TL-combinators.md#conditional-fields).18?[long](/type/long.md) | For channels with associated [monoforums](/api/monoforum.md), the [monoforum](/api/monoforum.md) ID. For [Monoforums](/api/monoforum.md), the ID of the associated channel. |

### Type
[Chat](/type/Chat.md)

### Related pages

#### [channelFull](/constructor/channelFull.md)
Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [channels.toggleJoinToSend](/method/channels.toggleJoinToSend.md)
Set whether all users [should join a discussion group in order to comment on a post »](/api/discussion.md#requiring-users-to-join-the-group)

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [channels.toggleJoinRequest](/method/channels.toggleJoinRequest.md)
Set whether all users should [request admin approval to join the group »](/api/invites.md#join-requests).

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [channels.getChannels](/method/channels.getChannels.md)
Get info about [channels/supergroups](/api/channel.md)

#### [Message translation](/api/translation.md)
Telegram allows translating chat messages: Telegram Premium users may even enable real-time chat translation.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.
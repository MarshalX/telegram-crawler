# channelAdminLogEventsFilter

Filter only certain admin log events

```tl
channelAdminLogEventsFilter#ea107ae4 flags:# join:flags.0?true leave:flags.1?true invite:flags.2?true ban:flags.3?true unban:flags.4?true kick:flags.5?true unkick:flags.6?true promote:flags.7?true demote:flags.8?true info:flags.9?true settings:flags.10?true pinned:flags.11?true edit:flags.12?true delete:flags.13?true group_call:flags.14?true invites:flags.15?true send:flags.16?true forums:flags.17?true sub_extend:flags.18?true edit_rank:flags.19?true = ChannelAdminLogEventsFilter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **join** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | [Join events](/constructor/channelAdminLogEventActionParticipantJoin.md), including [joins using invite links](/constructor/channelAdminLogEventActionParticipantJoinByInvite.md) and [join requests](/constructor/channelAdminLogEventActionParticipantJoinByRequest.md). |
| **leave** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | [Leave events](/constructor/channelAdminLogEventActionParticipantLeave.md) |
| **invite** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | [Invite events](/constructor/channelAdminLogEventActionParticipantInvite.md) |
| **ban** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | [Ban events](/constructor/channelAdminLogEventActionParticipantToggleBan.md) |
| **unban** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | [Unban events](/constructor/channelAdminLogEventActionParticipantToggleBan.md) |
| **kick** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | [Kick events](/constructor/channelAdminLogEventActionParticipantToggleBan.md) |
| **unkick** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | [Unkick events](/constructor/channelAdminLogEventActionParticipantToggleBan.md) |
| **promote** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | [Admin promotion events](/constructor/channelAdminLogEventActionParticipantToggleAdmin.md) |
| **demote** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | [Admin demotion events](/constructor/channelAdminLogEventActionParticipantToggleAdmin.md) |
| **info** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Info change events (when [about](/constructor/channelAdminLogEventActionChangeAbout.md), [linked chat](/constructor/channelAdminLogEventActionChangeLinkedChat.md), [location](/constructor/channelAdminLogEventActionChangeLocation.md), [photo](/constructor/channelAdminLogEventActionChangePhoto.md), [stickerset](/constructor/channelAdminLogEventActionChangeStickerSet.md), [title](/constructor/channelAdminLogEventActionChangeTitle.md) or [username](/constructor/channelAdminLogEventActionChangeUsername.md), [slowmode](/constructor/channelAdminLogEventActionToggleSlowMode.md), [history TTL](/constructor/channelAdminLogEventActionChangeHistoryTTL.md) settings of a channel gets modified) |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Settings change events ([invites](/constructor/channelAdminLogEventActionToggleInvites.md), [hidden prehistory](/constructor/channelAdminLogEventActionTogglePreHistoryHidden.md), [signatures](/constructor/channelAdminLogEventActionToggleSignatures.md), [default banned rights](/constructor/channelAdminLogEventActionDefaultBannedRights.md), [forum toggle events](/constructor/channelAdminLogEventActionToggleForum.md)) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | [Message pin events](/constructor/channelAdminLogEventActionUpdatePinned.md) |
| **edit** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | [Message edit events](/constructor/channelAdminLogEventActionEditMessage.md) |
| **delete** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | [Message deletion events](/constructor/channelAdminLogEventActionDeleteMessage.md) |
| **group\_call** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Group call events |
| **invites** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Invite events |
| **send** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | A message was posted in a channel |
| **forums** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | [Forum](/api/forum.md)-related events |
| **sub\_extend** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | [Telegram Star subscription extension events »](/constructor/channelAdminLogEventActionParticipantSubExtend.md) |
| **edit\_rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Events where a participant's custom [tag (rank) »](/api/rank.md) was changed ([channelAdminLogEventActionParticipantEditRank](/constructor/channelAdminLogEventActionParticipantEditRank.md)). |

### Type
[ChannelAdminLogEventsFilter](/type/ChannelAdminLogEventsFilter.md)

### Related pages

#### [channelAdminLogEventActionParticipantJoin](/constructor/channelAdminLogEventActionParticipantJoin.md)
A user has joined the group (in the case of big groups, info of the user that has joined isn't shown)

#### [channelAdminLogEventActionParticipantJoinByInvite](/constructor/channelAdminLogEventActionParticipantJoinByInvite.md)
A user joined the [supergroup/channel](/api/channel.md) using a specific invite link

#### [channelAdminLogEventActionParticipantJoinByRequest](/constructor/channelAdminLogEventActionParticipantJoinByRequest.md)
A new member was accepted to the chat by an admin

#### [channelAdminLogEventActionParticipantLeave](/constructor/channelAdminLogEventActionParticipantLeave.md)
A user left the channel/supergroup (in the case of big groups, info of the user that has joined isn't shown)

#### [channelAdminLogEventActionParticipantInvite](/constructor/channelAdminLogEventActionParticipantInvite.md)
A user was invited to the group

#### [channelAdminLogEventActionParticipantToggleBan](/constructor/channelAdminLogEventActionParticipantToggleBan.md)
The banned [rights](/api/rights.md) of a user were changed

#### [channelAdminLogEventActionParticipantToggleAdmin](/constructor/channelAdminLogEventActionParticipantToggleAdmin.md)
The admin [rights](/api/rights.md) of a user were changed

#### [channelAdminLogEventActionChangeAbout](/constructor/channelAdminLogEventActionChangeAbout.md)
The description was changed

#### [channelAdminLogEventActionChangeLinkedChat](/constructor/channelAdminLogEventActionChangeLinkedChat.md)
The linked chat was changed

#### [channelAdminLogEventActionChangeLocation](/constructor/channelAdminLogEventActionChangeLocation.md)
The geogroup location was changed

#### [channelAdminLogEventActionChangePhoto](/constructor/channelAdminLogEventActionChangePhoto.md)
The channel/supergroup's picture was changed

#### [channelAdminLogEventActionChangeStickerSet](/constructor/channelAdminLogEventActionChangeStickerSet.md)
The supergroup's stickerset was changed

#### [channelAdminLogEventActionChangeTitle](/constructor/channelAdminLogEventActionChangeTitle.md)
Channel/supergroup title was changed

#### [channelAdminLogEventActionChangeUsername](/constructor/channelAdminLogEventActionChangeUsername.md)
Channel/supergroup username was changed

#### [channelAdminLogEventActionToggleSlowMode](/constructor/channelAdminLogEventActionToggleSlowMode.md)
[Slow mode setting for supergroups was changed](/method/channels.toggleSlowMode.md)

#### [channelAdminLogEventActionChangeHistoryTTL](/constructor/channelAdminLogEventActionChangeHistoryTTL.md)
The Time-To-Live of messages in this chat was changed

#### [channelAdminLogEventActionToggleInvites](/constructor/channelAdminLogEventActionToggleInvites.md)
Invites were enabled/disabled

#### [channelAdminLogEventActionTogglePreHistoryHidden](/constructor/channelAdminLogEventActionTogglePreHistoryHidden.md)
The hidden prehistory setting was [changed](/method/channels.togglePreHistoryHidden.md)

#### [channelAdminLogEventActionToggleSignatures](/constructor/channelAdminLogEventActionToggleSignatures.md)
Channel signatures were enabled/disabled

#### [channelAdminLogEventActionDefaultBannedRights](/constructor/channelAdminLogEventActionDefaultBannedRights.md)
The default banned rights were modified

#### [channelAdminLogEventActionToggleForum](/constructor/channelAdminLogEventActionToggleForum.md)
[Forum](/api/forum.md) functionality was enabled or disabled.

#### [channelAdminLogEventActionUpdatePinned](/constructor/channelAdminLogEventActionUpdatePinned.md)
A message was pinned

#### [channelAdminLogEventActionEditMessage](/constructor/channelAdminLogEventActionEditMessage.md)
A message was edited

#### [channelAdminLogEventActionDeleteMessage](/constructor/channelAdminLogEventActionDeleteMessage.md)
A message was deleted

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [channelAdminLogEventActionParticipantSubExtend](/constructor/channelAdminLogEventActionParticipantSubExtend.md)
A paid subscriber has extended their [Telegram Star subscription »](/api/stars.md#star-subscriptions).

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.

#### [channelAdminLogEventActionParticipantEditRank](/constructor/channelAdminLogEventActionParticipantEditRank.md)
A participant's [tag »](/api/rank.md) was changed.
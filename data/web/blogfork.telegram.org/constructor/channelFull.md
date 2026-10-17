# channelFull

Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

```tl
channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_view\_participants** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Can we view the participant list? |
| **can\_set\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Can we set the channel's username? |
| **can\_set\_stickers** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Can we [associate](/method/channels.setStickers.md) a stickerpack to the supergroup? |
| **hidden\_prehistory** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Is the history before we joined hidden to us? |
| **can\_set\_location** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | Can we set the geolocation of this group (for geogroups) |
| **has\_scheduled** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Whether scheduled messages are available |
| **can\_view\_stats** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[true](/constructor/true.md) | Can the user view [channel/supergroup statistics](/api/stats.md) |
| **blocked** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[true](/constructor/true.md) | Whether any anonymous admin of this supergroup was blocked: if set, you won't receive messages from [anonymous group admins »](/api/rights.md#anonymous-admins) in [discussion replies via @replies](/api/discussion.md) |
| **flags2** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_delete\_channel** | [flags2](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Can we delete this channel? |
| **antispam** | [flags2](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether [native antispam](/api/antispam.md) functionality is enabled in this supergroup. |
| **participants\_hidden** | [flags2](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the participant list is hidden. |
| **translations\_disabled** | [flags2](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the [real-time chat translation popup](/api/translation.md) should be hidden. |
| **stories\_pinned\_available** | [flags2](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this user has some [pinned stories](/api/stories.md#pinned-or-archived-stories). |
| **view\_forum\_as\_messages** | [flags2](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Users may also choose to display messages from all topics of a [forum](/api/forum.md) as if they were sent to a normal group, using a "View as messages" setting in the local client.  \
This setting only affects the current account, and is synced to other logged in sessions using the [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md) method; invoking this method will update the value of this flag. |
| **restricted\_sponsored** | [flags2](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether ads on this channel were [disabled as specified here »](/api/boost.md#disable-ads-on-the-channel) (this flag is only visible to the owner of the channel). |
| **can\_view\_revenue** | [flags2](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | If set, this user can view [ad revenue statistics »](/api/revenue.md#revenue-statistics) for this channel. |
| **paid\_media\_allowed** | [flags2](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Whether the current user can send or forward [paid media »](/api/paid-media.md) to this channel. |
| **can\_view\_stars\_revenue** | [flags2](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | If set, this user can view [Telegram Star revenue statistics »](/api/stars.md#revenue-statistics) for this channel. |
| **paid\_reactions\_available** | [flags2](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, users may send [paid Telegram Star reactions »](/api/reactions.md#paid-reactions) to messages of this channel. |
| **stargifts\_available** | [flags2](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | If set, users may send [Gifts »](/api/gifts.md) to this channel. |
| **paid\_messages\_available** | [flags2](/mtproto/TL-combinators.md#conditional-fields).20?[true](/constructor/true.md) | If set, admins may [enable enable paid messages »](/api/paid-messages.md) in this supergroup. |
| **id** | [long](/type/long.md) | ID of the channel |
| **about** | [string](/type/string.md) | Info about the channel |
| **participants\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Number of participants of the channel |
| **admins\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Number of channel admins |
| **kicked\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Number of users [kicked](/api/rights.md) from the channel |
| **banned\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Number of users [banned](/api/rights.md) from the channel |
| **online\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[int](/type/int.md) | Number of users currently online |
| **read\_inbox\_max\_id** | [int](/type/int.md) | Position up to which all incoming messages are read. |
| **read\_outbox\_max\_id** | [int](/type/int.md) | Position up to which all outgoing messages are read. |
| **unread\_count** | [int](/type/int.md) | Count of unread messages |
| **chat\_photo** | [Photo](/type/Photo.md) | Channel picture |
| **notify\_settings** | [PeerNotifySettings](/type/PeerNotifySettings.md) | Notification settings |
| **exported\_invite** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[ExportedChatInvite](/type/ExportedChatInvite.md) | Invite link |
| **bot\_info** | [Vector](/type/Vector%20t)&lt;[BotInfo](/type/BotInfo.md)&gt; | Info about bots in the channel/supergroup |
| **migrated\_from\_chat\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | The chat ID from which this group was [migrated](/api/channel.md) |
| **migrated\_from\_max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | The message ID in the original chat at which this group was [migrated](/api/channel.md) |
| **pinned\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Message ID of the last [pinned message](/api/pin.md) |
| **stickerset** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[StickerSet](/type/StickerSet.md) | Associated stickerset |
| **available\_min\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[int](/type/int.md) | Identifier of a maximum unavailable message in a channel due to hidden history. |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **linked\_chat\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[long](/type/long.md) | ID of the linked [discussion chat](/api/discussion.md) for channels (and vice versa, the ID of the linked channel for discussion chats). |
| **location** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[ChannelLocation](/type/ChannelLocation.md) | Location of the geogroup |
| **slowmode\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[int](/type/int.md) | If specified, users in supergroups will only be able to send one message every `slowmode_seconds` seconds |
| **slowmode\_next\_send\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[int](/type/int.md) | Indicates when the user will be allowed to send another message in the supergroup (unixtime) |
| **stats\_dc** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[int](/type/int.md) | If set, specifies the DC to use for fetching channel statistics |
| **pts** | [int](/type/int.md) | Latest [PTS](/api/updates.md) for this channel |
| **call** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[InputGroupCall](/type/InputGroupCall.md) | Active or scheduled [video chat/livestream »](/api/group-calls.md#video-chats-livestreams) associated with this supergroup/channel |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[int](/type/int.md) | Time-To-Live of messages in this channel or supergroup |
| **pending\_suggestions** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | A list of [suggested actions](/api/config.md#suggestions) for the supergroup admin, [see here for more info »](/api/config.md#suggestions). |
| **groupcall\_default\_join\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[Peer](/type/Peer.md) | Explicitly saved default peer used to join this supergroup/channel's [video chat/livestream »](/api/group-calls.md#video-chats-livestreams); if absent, the current user is used |
| **theme\_emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[string](/type/string.md) | Emoji representing a specific chat theme |
| **requests\_pending** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[int](/type/int.md) | Pending [join requests »](/api/invites.md#join-requests) |
| **recent\_requesters** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | IDs of users who requested to join recently |
| **default\_send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).29?[Peer](/type/Peer.md) | Default peer used for sending messages to this channel |
| **available\_reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).30?[ChatReactions](/type/ChatReactions.md) | Allowed [message reactions »](/api/reactions.md) |
| **reactions\_limit** | [flags2](/mtproto/TL-combinators.md#conditional-fields).13?[int](/type/int.md) | This flag may be used to impose a custom limit of unique reactions (i.e. a customizable version of [appConfig.reactions\_uniq\_max](/api/config.md#reactions-uniq-max)). |
| **stories** | [flags2](/mtproto/TL-combinators.md#conditional-fields).4?[PeerStories](/type/PeerStories.md) | Channel [stories](/api/stories.md) |
| **wallpaper** | [flags2](/mtproto/TL-combinators.md#conditional-fields).7?[WallPaper](/type/WallPaper.md) | [Wallpaper](/api/wallpapers.md) |
| **boosts\_applied** | [flags2](/mtproto/TL-combinators.md#conditional-fields).8?[int](/type/int.md) | The number of [boosts](/api/boost.md) the current user has applied to the current *supergroup*. |
| **boosts\_unrestrict** | [flags2](/mtproto/TL-combinators.md#conditional-fields).9?[int](/type/int.md) | The number of [boosts](/api/boost.md) this *supergroup* requires to bypass slowmode and other restrictions, see [here »](/api/boost.md#bypass-slowmode-and-chat-restrictions) for more info. |
| **emojiset** | [flags2](/mtproto/TL-combinators.md#conditional-fields).10?[StickerSet](/type/StickerSet.md) | [Custom emoji stickerset](/api/custom-emoji.md) associated to the current *supergroup*, set using [channels.setEmojiStickers](/method/channels.setEmojiStickers.md) after reaching the appropriate boost level, see [here »](/api/boost.md#setting-a-custom-emoji-stickerset-for-supergroups) for more info. |
| **bot\_verification** | [flags2](/mtproto/TL-combinators.md#conditional-fields).17?[BotVerification](/type/BotVerification.md) | [Bot verification icon](/api/bots/verification.md) |
| **stargifts\_count** | [flags2](/mtproto/TL-combinators.md#conditional-fields).18?[int](/type/int.md) | Admins with [chatAdminRights](/constructor/chatAdminRights.md).`post_messages` rights will see the total number of received gifts, everyone else will see the number of gifts added to the channel's profile. |
| **send\_paid\_messages\_stars** | [flags2](/mtproto/TL-combinators.md#conditional-fields).21?[long](/type/long.md) | If set and bigger than 0, this supergroup, [monoforum](/api/monoforum.md) or the monoforum associated to this channel has enabled [paid messages »](/api/paid-messages.md) and we *must* pay the specified amount of [Stars](/api/stars.md) to send messages to it, see [here »](/api/paid-messages.md) for the full flow. \
This flag will be set both for the monoforum and for [channelFull](/constructor/channelFull.md) of the associated channel). \
If set and equal to 0, the monoforum requires payment in general but we were exempted from paying. |
| **main\_tab** | [flags2](/mtproto/TL-combinators.md#conditional-fields).22?[ProfileTab](/type/ProfileTab.md) | The main tab for the channel's profile, see [here »](/api/profile.md#tabs) for more info. |

### Type
[ChatFull](/type/ChatFull.md)

### Related pages

#### [channels.setStickers](/method/channels.setStickers.md)
Associate a stickerset to the supergroup

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.

#### [Native antispam system](/api/antispam.md)
Admins of supergroups with a certain number of members can choose to unleash the full proactive power of Telegram's own antispam algorithms – turning on the new Aggressive mode for the automated spam filters.

#### [Message translation](/api/translation.md)
Telegram allows translating chat messages: Telegram Premium users may even enable real-time chat translation.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md)
Users may also choose to display messages from all topics of a [forum](/api/forum.md) as if they were sent to a normal group, using a "View as messages" setting in the local client: this setting only affects the current account, and is synced to other logged in sessions using this method.

Invoking this method will update the value of the `view_forum_as_messages` flag of [channelFull](/constructor/channelFull.md) or [dialog](/constructor/dialog.md) and emit an [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md).

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Channel and bot ad revenue](/api/revenue.md)
Telegram has one of the most generous reward systems in the history of social media. Telegram channel and bot owners can now receive 50% of the revenue from ads displayed in their channels and bots.  This page describes the methods used to withdraw channel/bot ad revenue, as well as view detailed revenue stats.

#### [Paid media](/api/paid-media.md)
Content creators can accept Stars by publishing paid photos or videos on their channels.  Subscribers will be allowed to view such posts only after paying the author to unlock them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Pinned messages](/api/pin.md)
Telegram allows pinning multiple messages on top of a specific chat.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [channels.setEmojiStickers](/method/channels.setEmojiStickers.md)
Set a [custom emoji stickerset](/api/custom-emoji.md) for supergroups. Only usable after reaching at least the [boost level »](/api/boost.md) specified in the [`group_emoji_stickers_level_min` »](/api/config.md#group-emoji-stickers-level-min) config parameter.

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.

#### [chatAdminRights](/constructor/chatAdminRights.md)
Represents the rights of an admin in a [channel/supergroup](/api/channel.md).

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [channelFull](/constructor/channelFull.md)
Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.
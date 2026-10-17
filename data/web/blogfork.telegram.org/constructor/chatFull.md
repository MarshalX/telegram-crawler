# chatFull

Full info about a [basic group](/api/channel.md#basic-groups).

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

```tl
chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_set\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Can we change the username of this chat |
| **has\_scheduled** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Whether [scheduled messages](/api/scheduled-messages.md) are available |
| **translations\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | Whether the [real-time chat translation popup](/api/translation.md) should be hidden. |
| **id** | [long](/type/long.md) | ID of the chat |
| **about** | [string](/type/string.md) | About string for this chat |
| **participants** | [ChatParticipants](/type/ChatParticipants.md) | Participant list |
| **chat\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Photo](/type/Photo.md) | Chat photo |
| **notify\_settings** | [PeerNotifySettings](/type/PeerNotifySettings.md) | Notification settings |
| **exported\_invite** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[ExportedChatInvite](/type/ExportedChatInvite.md) | Chat invite |
| **bot\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[BotInfo](/type/BotInfo.md)&gt; | Info about bots that are in this chat |
| **pinned\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Message ID of the last [pinned message](/api/pin.md) |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **call** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[InputGroupCall](/type/InputGroupCall.md) | Active or scheduled [video chat »](/api/group-calls.md#video-chats-livestreams) associated with this basic group |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[int](/type/int.md) | Time-To-Live of messages sent by the current user to this chat |
| **groupcall\_default\_join\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[Peer](/type/Peer.md) | Explicitly saved default peer used to join this group's [video chat »](/api/group-calls.md#video-chats-livestreams); if absent, the current user is used |
| **theme\_emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | Emoji representing a specific chat theme |
| **requests\_pending** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[int](/type/int.md) | Pending [join requests »](/api/invites.md#join-requests) |
| **recent\_requesters** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | IDs of users who requested to join recently |
| **available\_reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[ChatReactions](/type/ChatReactions.md) | Allowed [message reactions »](/api/reactions.md) |
| **reactions\_limit** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[int](/type/int.md) | This flag may be used to impose a custom limit of unique reactions (i.e. a customizable version of [appConfig.reactions\_uniq\_max](/api/config.md#reactions-uniq-max)). |

### Type
[ChatFull](/type/ChatFull.md)

### Related pages

#### [Scheduled messages](/api/scheduled-messages.md)
Telegram allows scheduling messages

#### [Message translation](/api/translation.md)
Telegram allows translating chat messages: Telegram Premium users may even enable real-time chat translation.

#### [Pinned messages](/api/pin.md)
Telegram allows pinning multiple messages on top of a specific chat.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.
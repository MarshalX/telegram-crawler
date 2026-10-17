# peerSettings

List of actions that are possible when interacting with this user, to be shown as suggested actions in the [chat action bar »](/api/action-bar.md), see [here »](/api/action-bar.md) for more info.

```tl
peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **report\_spam** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we can still report the user for spam |
| **add\_contact** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we can add the user as contact |
| **block\_contact** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether we can block the user |
| **share\_contact** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether we can share the user's contact |
| **need\_contacts\_exception** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether a special exception for contacts is needed |
| **report\_geo** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether we can report a geogroup as irrelevant for this location |
| **autoarchived** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether this peer was automatically archived according to [privacy settings](/constructor/globalPrivacySettings.md) and can be unarchived |
| **invite\_members** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, this is a recently created group chat to which new members can be invited |
| **request\_chat\_broadcast** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | This flag is set if `request_chat_title` and `request_chat_date` fields are set and the [join request »](/api/invites.md#join-requests) is related to a channel (otherwise if only the request fields are set, the [join request »](/api/invites.md#join-requests) is related to a chat). |
| **business\_bot\_paused** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | This flag is set if both `business_bot_id` and `business_bot_manage_url` are set and all [connected business bots »](/api/bots/connected-business-bots.md) were paused in this chat using [account.toggleConnectedBotPaused »](/method/account.toggleConnectedBotPaused.md). |
| **business\_bot\_can\_reply** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | This flag is set if both `business_bot_id` and `business_bot_manage_url` are set and [connected business bots »](/api/bots/connected-business-bots.md) can reply to messages in this chat, as specified by the settings during [initial configuration](/api/bots/connected-business-bots.md). |
| **geo\_distance** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Distance in meters between us and this peer |
| **request\_chat\_title** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[string](/type/string.md) | If set, this is a private chat with an administrator of a chat or channel to which the user sent a join request, and this field contains the chat/channel's title. |
| **request\_chat\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[int](/type/int.md) | If set, this is a private chat with an administrator of a chat or channel to which the user sent a join request, and this field contains the timestamp when the [join request »](/api/invites.md#join-requests) was sent. |
| **business\_bot\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[long](/type/long.md) | Contains the ID of the [business bot »](/api/bots/connected-business-bots.md) managing this chat, used to display info about the bot in the action bar. |
| **business\_bot\_manage\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[string](/type/string.md) | Contains a [deep link »](/api/links.md), used to open a management menu in the business bot. This flag is set if and only if `business_bot_id` is set. |
| **charge\_paid\_message\_stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[long](/type/long.md) | All users that must [pay *us* »](/api/paid-messages.md) to send us private messages will have this flag set *only for us*, containing the amount of required stars, see [here »](/api/paid-messages.md) for more info on paid messages. |
| **registration\_month** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[string](/type/string.md) | Used to display the user's registration year and month, the string is in `MM.YYYY` format, where `MM` is the registration month (`1-12`), and `YYYY` is the registration year. |
| **phone\_country** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | The country code of the user's phone number. |
| **name\_change\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[int](/type/int.md) | When was the user's name last changed. |
| **photo\_change\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[int](/type/int.md) | When was the user's photo last changed. |

### Type
[PeerSettings](/type/PeerSettings.md)

### Related pages

#### [globalPrivacySettings](/constructor/globalPrivacySettings.md)
Global privacy settings

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [account.toggleConnectedBotPaused](/method/account.toggleConnectedBotPaused.md)
Pause or unpause a specific chat, temporarily disconnecting it from all [business bots »](/api/bots/connected-business-bots.md).

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Action bar](/api/action-bar.md)
Sometimes, when interacting with Telegram users via private or secret chats, an action bar must be shown on top of the chat, offering convenient action buttons or notices regarding the user.
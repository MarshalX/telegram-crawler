# bots.createBot

Create a [managed bot »](/api/bots/managed-bots.md#creating-a-managed-bot) owned by the current user and controlled by the specified manager bot.

```tl
userEmpty#d3bc4b7a id:long = User;
user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;
---functions---
bots.createBot#e5b17f2b flags:# via_deeplink:flags.0?true name:string username:string manager_id:InputUser = User;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_deeplink** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set only if the creation prompt was opened from a [managed bot creation request deep link »](/api/links.md#managed-bot-creation-request-links) |
| **name** | [string](/type/string.md) | Display name of the bot, 1–64 characters |
| **username** | [string](/type/string.md) | Username for the bot, as validated by [bots.checkUsername](/method/bots.checkUsername.md) |
| **manager\_id** | [InputUser](/type/InputUser.md) | The manager bot that will control the created bot; must have the [user](/constructor/user.md).`bot_can_manage_bots` flag set |

### Result
[User](/type/User.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_CREATE\_LIMIT\_EXCEEDED | The current user already owns the maximum allowed number of owned bots, as specified by [`bots_create_limit_default`&nbsp;&raquo;](/api/config.md#bots-create-limit-default) and [`bots_create_limit_premium`&nbsp;&raquo;](/api/config.md#bots-create-limit-premium); if the current user doesn't have Telegram Premium, upgrading to Premium will allow them to create more bots. |
| 400 | MANAGER\_INVALID | The specified manager bot is invalid. |
| 400 | MANAGER\_PERMISSION\_MISSING | The specified manager bot does not have the [user](/constructor/user.md).`bot_can_manage_bots` flag set. |
| 400 | NAME\_INVALID | The specified bot name is invalid. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_OCCUPIED | The provided username is already occupied. |
| 400 | USERNAME\_SUFFIX\_MISSING | The required `bot` suffix is missing from the passed username. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [bots.checkUsername](/method/bots.checkUsername.md)
Check whether a username is available and valid for use when [creating a managed bot »](/api/bots/managed-bots.md#creating-a-managed-bot).

#### [user](/constructor/user.md)
Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
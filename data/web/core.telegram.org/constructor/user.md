# user

Indicates info about a certain user.

Unless specified otherwise, when updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/73035e4a69ed26df563652de14aa9c4c86d23420/td/telegram/UserManager.cpp#L3106) for an implementation of the logic to use when updating the [local user peer database](/api/peers.md).

```tl
user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **self** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Whether this user indicates the currently logged in user |
| **contact** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether this user is a contact \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag is set. |
| **mutual\_contact** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether this user is a mutual contact. \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag is set. |
| **deleted** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether the account of this user was deleted. \
Changes to this flag should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Is this user a bot? \
Changes to this flag should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **bot\_chat\_history** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Can the bot see all messages in groups? |
| **bot\_nochats** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | Can the bot be added to groups? |
| **verified** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | Whether this user is verified |
| **restricted** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | Access to this user must be restricted for the reason specified in `restriction_reason` |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[true](/constructor/true.md) | See [min](/api/min.md) |
| **bot\_inline\_geo** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[true](/constructor/true.md) | Whether the bot can request our geolocation in inline mode |
| **support** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[true](/constructor/true.md) | Whether this is an official support user |
| **scam** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | This may be a scam user |
| **apply\_min\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[true](/constructor/true.md) | If set and `min` is set, the value of `photo` can be used to update the local database, see the documentation of that flag for more info. |
| **fake** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | If set, this user was reported by many users as a fake or scam user: be careful when interacting with them. |
| **bot\_attach\_menu** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[true](/constructor/true.md) | Whether this bot offers an [attachment menu web app](/api/bots/attach.md) |
| **premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[true](/constructor/true.md) | Whether this user is a Telegram Premium user \
Changes to this flag should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID, see [here »](/api/peers.md#full-info-database) for more info. \
Changes to this flag if the `self` flag is set should also trigger the following calls, to refresh the respective caches: \
- The [help.getConfig](/method/help.getConfig.md) cache \
- The [messages.getTopReactions](/method/messages.getTopReactions.md) cache if the `bot` flag is **not** set |
| **attach\_menu\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).29?[true](/constructor/true.md) | Whether we installed the [attachment menu web app](/api/bots/attach.md) offered by this bot. \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag is set. |
| **flags2** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot\_can\_edit** | [flags2](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether we can edit the profile picture, name, about text and description of this bot because we own it. \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag is set. \
Changes to this flag (if `min` is not set) should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID. |
| **close\_friend** | [flags2](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether we marked this user as a [close friend, see here » for more info](/api/privacy.md). \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag is set. |
| **stories\_hidden** | [flags2](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether we have [hidden »](/api/stories.md#hiding-stories-of-other-users) all active stories of this user. \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag is set. |
| **stories\_unavailable** | [flags2](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | No stories from this user are visible. |
| **contact\_require\_premium** | [flags2](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | See [here for more info on this flag »](/api/privacy.md#require-premium-for-new-non-contact-users). |
| **bot\_business** | [flags2](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether this bot can be [connected to a user as specified here »](/api/bots/connected-business-bots.md). |
| **bot\_has\_main\_app** | [flags2](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | If set, this bot has configured a [Main Mini App »](/api/bots/webapps.md#main-mini-apps). |
| **bot\_forum\_view** | [flags2](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If set, this bot supports [bot forum topics »](/api/forum.md#bot-forums). |
| **bot\_forum\_can\_manage\_topics** | [flags2](/mtproto/TL-combinators.md#conditional-fields).17?[true](/constructor/true.md) | If set, this bot supports [bot forum topics »](/api/forum.md#bot-forums), and users (not just the bot!) are allowed to create and manage bot forum topics in their private chat with the bot. |
| **bot\_can\_manage\_bots** | [flags2](/mtproto/TL-combinators.md#conditional-fields).18?[true](/constructor/true.md) | If set, this bot is a [manager bot](/api/bots/managed-bots.md) that can create and manage [managed bots »](/api/bots/managed-bots.md) on behalf of the user. |
| **bot\_guestchat** | [flags2](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | If set, this bot can be invoked as a [guest in chats »](/api/bots/guest-mode.md). |
| **id** | [long](/type/long.md) | ID of the user, see [here »](/api/peers.md#peer-id) for more info and the available ID range. |
| **access\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Access hash of the user, see [here »](/api/peers.md#access-hash) for more info. \
If this flag is set, when updating the [local peer database](/api/peers.md), generate a virtual flag called `min_access_hash`, which is: \
- Set to `true` if `min` is set AND \
-- The `phone` flag is **not** set OR \
-- The `phone` flag is set and the associated phone number string is non-empty \
- Set to `false` otherwise. \
\
Then, apply both `access_hash` and `min_access_hash` to the local database if: \
- `min_access_hash` is false OR \
- `min_access_hash` is true AND \
-- There is no locally cached object for this user OR \
-- There is no `access_hash` in the local cache OR \
-- The cached object's `min_access_hash` is also true \
\
If the final merged object stored to the database has the `min_access_hash` field set to true, the related `access_hash` is **only** suitable to use in [`inputPeerPhotoFileLocation` »](/constructor/inputPeerPhotoFileLocation.md), to directly [download the profile pictures](/api/files.md) of users, everywhere else a `inputPeer*FromMessage` constructor will have to be generated as specified [here »](/api/min.md). \
Bots can also use min access hashes in some conditions, by passing `0` instead of the min access hash. |
| **first\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | First name. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `min` flag of the locally cached user entry is set. |
| **last\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Last name. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `min` flag of the locally cached user entry is set. |
| **username** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Main active username. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `min` flag of the locally cached user entry is set. \
Changes to this flag should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID if the above conditions are respected and the `bot_can_edit` flag is also set. |
| **phone** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Phone number. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `min` flag of the locally cached user entry is set. |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[UserProfilePhoto](/type/UserProfilePhoto.md) | Profile picture of user. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `apply_min_photo` flag is set OR \
-- The `min` flag of the locally cached user entry is set. |
| **status** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[UserStatus](/type/UserStatus.md) | Online status of user. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `min` flag of the locally cached user entry is set OR \
-- The locally cached user entry is equal to [userStatusEmpty](/constructor/userStatusEmpty.md). |
| **bot\_info\_version** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[int](/type/int.md) | Version of the [bot\_info field in userFull](/constructor/userFull.md), incremented every time it changes. \
Changes to this flag should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID, see [here »](/api/peers.md#full-info-database) for more info. |
| **restriction\_reason** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[Vector](/type/Vector%20t)&lt;[RestrictionReason](/type/RestrictionReason.md)&gt; | Contains the reason why access to this user must be restricted. |
| **bot\_inline\_placeholder** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[string](/type/string.md) | Inline placeholder for this inline bot |
| **lang\_code** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[string](/type/string.md) | Language code of the user |
| **emoji\_status** | [flags](/mtproto/TL-combinators.md#conditional-fields).30?[EmojiStatus](/type/EmojiStatus.md) | [Emoji status](/api/emoji-status.md) |
| **usernames** | [flags2](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[Username](/type/Username.md)&gt; | Additional usernames. \
When updating the [local peer database](/api/peers.md), apply changes to this field only if: \
- The `min` flag is not set OR \
- The `min` flag is set AND \
-- The `min` flag of the locally cached user entry is set. \
Changes to this flag (if the above conditions are respected) should invalidate the local [userFull](/constructor/userFull.md) cache for this user ID. |
| **stories\_max\_id** | [flags2](/mtproto/TL-combinators.md#conditional-fields).5?[RecentStory](/type/RecentStory.md) | Summary of the user's [active stories »](/api/stories.md#recent-story-summaries).  \
When updating the [local peer database](/api/peers.md), do not apply changes to this field if the `min` flag of the incoming constructor is set. |
| **color** | [flags2](/mtproto/TL-combinators.md#conditional-fields).8?[PeerColor](/type/PeerColor.md) | The user's [accent color](/api/colors.md). |
| **profile\_color** | [flags2](/mtproto/TL-combinators.md#conditional-fields).9?[PeerColor](/type/PeerColor.md) | The user's [profile color](/api/colors.md). |
| **bot\_active\_users** | [flags2](/mtproto/TL-combinators.md#conditional-fields).12?[int](/type/int.md) | Monthly Active Users (MAU) of this bot (may be absent for small bots). |
| **bot\_verification\_icon** | [flags2](/mtproto/TL-combinators.md#conditional-fields).14?[long](/type/long.md) | Describes a [bot verification icon »](/api/bots/verification.md). |
| **send\_paid\_messages\_stars** | [flags2](/mtproto/TL-combinators.md#conditional-fields).15?[long](/type/long.md) | If set, the user has enabled [paid messages »](/api/paid-messages.md), we *might* need to pay the specified amount of [Stars](/api/stars.md) to send them messages, depending on the configured exceptions: check [userFull](/constructor/userFull.md).`send_paid_messages_stars` or [users.getRequirementsToContact](/method/users.getRequirementsToContact.md) to see if the currently logged in user actually has to pay or not, see [here »](/api/paid-messages.md) for the full flow. |

### Type
[User](/type/User.md)

### Related pages

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [userFull](/constructor/userFull.md)
Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.

#### [help.getConfig](/method/help.getConfig.md)
Returns current configuration, including data center configuration.

#### [messages.getTopReactions](/method/messages.getTopReactions.md)
Got popular [message reactions](/api/reactions.md)

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).

#### [Guest mode for bots](/api/bots/guest-mode.md)
Guest bots can be queried by username from **any** non-secret private chat, group and supergroup (except for groups/supergroups with [content protection &raquo;](/api/content-protection.md#for-groups-and-channels) enabled), posting their results directly into the chat, even if they're not a member.

#### [inputPeerPhotoFileLocation](/constructor/inputPeerPhotoFileLocation.md)
Location of profile photo of channel/group/supergroup/user

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [userStatusEmpty](/constructor/userStatusEmpty.md)
User status has not been set yet.

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [users.getRequirementsToContact](/method/users.getRequirementsToContact.md)
Check whether we can write to the specified users, used to implement bulk checks for [Premium-only messages »](/api/privacy.md#require-premium-for-new-non-contact-users) and [paid messages »](/api/paid-messages.md).

For each input user, returns a [RequirementToContact](/type/RequirementToContact.md) constructor (at the same offset in the vector) containing requirements to contact them.
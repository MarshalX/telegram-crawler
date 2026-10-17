# userFull

Extended user info

When updating the [local peer database »](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

```tl
userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **blocked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether you have blocked this user |
| **phone\_calls\_available** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this user can make VoIP calls |
| **phone\_calls\_private** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this user's privacy settings allow you to call them |
| **can\_pin\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether you can pin messages in the chat with this user, you can do this only for a chat with yourself |
| **has\_scheduled** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether [scheduled messages](/api/scheduled-messages.md) are available |
| **video\_calls\_available** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether the user can receive video calls |
| **voice\_messages\_forbidden** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[true](/constructor/true.md) | Whether this user doesn't allow sending voice messages in a private chat with them |
| **translations\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[true](/constructor/true.md) | Whether the [real-time chat translation popup](/api/translation.md) should be hidden. |
| **stories\_pinned\_available** | [flags](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | Whether this user has some [pinned stories](/api/stories.md#pinned-or-archived-stories). |
| **blocked\_my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).27?[true](/constructor/true.md) | Whether we've [blocked this user, preventing them from seeing our stories »](/api/block.md). |
| **wallpaper\_overridden** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[true](/constructor/true.md) | Whether the other user has chosen a custom wallpaper for us using [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) and the `for_both` flag, see [here »](/api/wallpapers.md#installing-wallpapers-in-a-specific-chat-or-channel) for more info. |
| **contact\_require\_premium** | [flags](/mtproto/TL-combinators.md#conditional-fields).29?[true](/constructor/true.md) | If set, we cannot write to this user: subscribe to [Telegram Premium](/api/premium.md) to get permission to write to this user. \
To set this flag for ourselves invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md), setting the `settings.new_noncontact_peers_require_premium` flag, see [here »](/api/privacy.md#require-premium-for-new-non-contact-users) for more info. |
| **read\_dates\_private** | [flags](/mtproto/TL-combinators.md#conditional-fields).30?[true](/constructor/true.md) | If set, we cannot fetch the exact read date of messages we send to this user using [messages.getOutboxReadDate](/method/messages.getOutboxReadDate.md).  \
The exact read date of messages might still be unavailable for other reasons, see [here »](/method/messages.getOutboxReadDate.md) for more info.  \
To set this flag for ourselves invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md), setting the `settings.hide_read_marks` flag. |
| **flags2** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **sponsored\_enabled** | [flags2](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether ads were re-enabled for the current account (only accessible to the currently logged-in user), see [here »](/api/business.md#re-enable-ads) for more info. |
| **can\_view\_revenue** | [flags2](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | If set, this user can view [ad revenue statistics »](/api/revenue.md#revenue-statistics) for this bot. |
| **bot\_can\_manage\_emoji\_status** | [flags2](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | If set, this is a bot that can [change our emoji status »](/api/emoji-status.md#setting-an-emoji-status-from-a-bot) |
| **display\_gifts\_button** | [flags2](/mtproto/TL-combinators.md#conditional-fields).16?[true](/constructor/true.md) | If this flag is set for both us and another user (changed through [globalPrivacySettings](/constructor/globalPrivacySettings.md)), a gift button should always be displayed in the text field in private chats with the other user: once clicked, the gift UI should be displayed, offering the user options to gift [Telegram Premium »](/api/premium.md) subscriptions or [Telegram Gifts »](/api/gifts.md). |
| **noforwards\_my\_enabled** | [flags2](/mtproto/TL-combinators.md#conditional-fields).23?[true](/constructor/true.md) | If set, [content protection »](/api/content-protection.md#for-users) was enabled in this private chat by us. |
| **noforwards\_peer\_enabled** | [flags2](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | If set, [content protection »](/api/content-protection.md#for-users) was enabled in this private chat by this user. |
| **unofficial\_security\_risk** | [flags2](/mtproto/TL-combinators.md#conditional-fields).26?[true](/constructor/true.md) | If set, this user uses an unofficial Telegram client, and messages sent to them may be less secure; clients should display a warning in the user's profile. |
| **id** | [long](/type/long.md) | User ID |
| **about** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Bio of the user |
| **settings** | [PeerSettings](/type/PeerSettings.md) | Peer settings |
| **personal\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).21?[Photo](/type/Photo.md) | Personal profile photo, to be shown instead of `profile_photo`. |
| **profile\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Photo](/type/Photo.md) | Profile photo |
| **fallback\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).22?[Photo](/type/Photo.md) | Fallback profile photo, displayed if no photo is present in `profile_photo` or `personal_photo`, due to privacy settings. |
| **notify\_settings** | [PeerNotifySettings](/type/PeerNotifySettings.md) | Notification settings |
| **bot\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[BotInfo](/type/BotInfo.md) | For bots, info about the bot (bot commands, etc) |
| **pinned\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Message ID of the last [pinned message](/api/pin.md) |
| **common\_chats\_count** | [int](/type/int.md) | Chats in common with this user |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[int](/type/int.md) | Time To Live of all messages in this chat; once a message is this many seconds old, it must be deleted. |
| **theme** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[ChatTheme](/type/ChatTheme.md) | [The chat theme associated with this user »](/api/themes.md#chat-themes). |
| **private\_forward\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[string](/type/string.md) | Anonymized text to be shown instead of the user's name on forwarded messages |
| **bot\_group\_admin\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[ChatAdminRights](/type/ChatAdminRights.md) | A [suggested set of administrator rights](/api/rights.md#suggested-bot-rights) for the bot, to be shown when adding the bot as admin to a group, see [here for more info on how to handle them »](/api/rights.md#suggested-bot-rights). |
| **bot\_broadcast\_admin\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[ChatAdminRights](/type/ChatAdminRights.md) | A [suggested set of administrator rights](/api/rights.md#suggested-bot-rights) for the bot, to be shown when adding the bot as admin to a channel, see [here for more info on how to handle them »](/api/rights.md#suggested-bot-rights). |
| **wallpaper** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[WallPaper](/type/WallPaper.md) | [Wallpaper](/api/wallpapers.md) to use in the private chat with the user. |
| **stories** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[PeerStories](/type/PeerStories.md) | Active [stories »](/api/stories.md) |
| **business\_work\_hours** | [flags2](/mtproto/TL-combinators.md#conditional-fields).0?[BusinessWorkHours](/type/BusinessWorkHours.md) | [Telegram Business working hours »](/api/business.md#opening-hours). |
| **business\_location** | [flags2](/mtproto/TL-combinators.md#conditional-fields).1?[BusinessLocation](/type/BusinessLocation.md) | [Telegram Business location »](/api/business.md#location). |
| **business\_greeting\_message** | [flags2](/mtproto/TL-combinators.md#conditional-fields).2?[BusinessGreetingMessage](/type/BusinessGreetingMessage.md) | [Telegram Business greeting message »](/api/business.md#greeting-messages). |
| **business\_away\_message** | [flags2](/mtproto/TL-combinators.md#conditional-fields).3?[BusinessAwayMessage](/type/BusinessAwayMessage.md) | [Telegram Business away message »](/api/business.md#away-messages). |
| **business\_intro** | [flags2](/mtproto/TL-combinators.md#conditional-fields).4?[BusinessIntro](/type/BusinessIntro.md) | Specifies a custom [Telegram Business profile introduction »](/api/business.md#business-introduction). |
| **birthday** | [flags2](/mtproto/TL-combinators.md#conditional-fields).5?[Birthday](/type/Birthday.md) | Contains info about the user's [birthday »](/api/profile.md#birthday). |
| **personal\_channel\_id** | [flags2](/mtproto/TL-combinators.md#conditional-fields).6?[long](/type/long.md) | ID of the associated personal [channel »](/api/channel.md), that should be shown in the [profile page](/api/profile.md#personal-channel). |
| **personal\_channel\_message** | [flags2](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | ID of the latest message of the associated personal [channel »](/api/channel.md), that should be previewed in the [profile page](/api/profile.md#personal-channel). |
| **stargifts\_count** | [flags2](/mtproto/TL-combinators.md#conditional-fields).8?[int](/type/int.md) | Number of [gifts](/api/gifts.md) the user has chosen to display on their profile |
| **starref\_program** | [flags2](/mtproto/TL-combinators.md#conditional-fields).11?[StarRefProgram](/type/StarRefProgram.md) | This bot has an active [referral program »](/api/bots/referrals.md) |
| **bot\_verification** | [flags2](/mtproto/TL-combinators.md#conditional-fields).12?[BotVerification](/type/BotVerification.md) | Describes a [bot verification icon »](/api/bots/verification.md). |
| **send\_paid\_messages\_stars** | [flags2](/mtproto/TL-combinators.md#conditional-fields).14?[long](/type/long.md) | If set and bigger than 0, this user has enabled [paid messages »](/api/paid-messages.md) and we *must* pay the specified amount of [Stars](/api/stars.md) to send messages to them, see [here »](/api/paid-messages.md) for the full flow. \
If set and equal to 0, the user requires payment in general but we were exempted from paying [for any of the reasons specified in the docs »](/api/paid-messages.md). |
| **disallowed\_gifts** | [flags2](/mtproto/TL-combinators.md#conditional-fields).15?[DisallowedGiftsSettings](/type/DisallowedGiftsSettings.md) | Disallows the reception of specific gift types. |
| **stars\_rating** | [flags2](/mtproto/TL-combinators.md#conditional-fields).17?[StarsRating](/type/StarsRating.md) | The user's [star rating](/api/stars.md#star-rating). |
| **stars\_my\_pending\_rating** | [flags2](/mtproto/TL-combinators.md#conditional-fields).18?[StarsRating](/type/StarsRating.md) | Our pending [star rating](/api/stars.md#star-rating), only visible for ourselves. |
| **stars\_my\_pending\_rating\_date** | [flags2](/mtproto/TL-combinators.md#conditional-fields).18?[int](/type/int.md) | When the pending [star rating](/api/stars.md#star-rating) will be applied, only visible for ourselves. |
| **main\_tab** | [flags2](/mtproto/TL-combinators.md#conditional-fields).20?[ProfileTab](/type/ProfileTab.md) | The main tab for the user's profile, see [here »](/api/profile.md#tabs) for more info. |
| **saved\_music** | [flags2](/mtproto/TL-combinators.md#conditional-fields).21?[Document](/type/Document.md) | The first song on the music tab of the profile, see [here »](/api/profile.md#music) for more info on the music profile tab. |
| **note** | [flags2](/mtproto/TL-combinators.md#conditional-fields).22?[TextWithEntities](/type/TextWithEntities.md) | A private note for this contact, only visible to us; see [here »](/api/contacts.md#private-notes-for-contacts) for more info on contact notes. |
| **bot\_manager\_id** | [flags2](/mtproto/TL-combinators.md#conditional-fields).25?[long](/type/long.md) | If this user is a [managed bot »](/api/bots/managed-bots.md), the ID of the user or manager bot that manages it. |

### Type
[UserFull](/type/UserFull.md)

### Related pages

#### [Scheduled messages](/api/scheduled-messages.md)
Telegram allows scheduling messages

#### [Message translation](/api/translation.md)
Telegram allows translating chat messages: Telegram Premium users may even enable real-time chat translation.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.

#### [Blocked users](/api/block.md)
Working with the blocklist.

#### [messages.setChatWallPaper](/method/messages.setChatWallPaper.md)
Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md)
Set global privacy settings

#### [Privacy settings](/api/privacy.md)
Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

#### [messages.getOutboxReadDate](/method/messages.getOutboxReadDate.md)
Get the exact read date of one of our messages, sent to a private chat with another user.

Can be only done for private outgoing messages not older than [appConfig.pm\_read\_date\_expire\_period »](/api/config.md#pm-read-date-expire-period).

If the `peer`'s [userFull](/constructor/userFull.md).`read_dates_private` flag is set, we will not be able to fetch the exact read date of messages we send to them, and a `USER_PRIVACY_RESTRICTED` RPC error will be emitted.  
The exact read date of messages might still be unavailable for other reasons, see [here »](/constructor/globalPrivacySettings.md) for more info.  
To set [userFull](/constructor/userFull.md).`read_dates_private` for ourselves invoke [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md), setting the `settings.hide_read_marks` flag.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [Channel and bot ad revenue](/api/revenue.md)
Telegram has one of the most generous reward systems in the history of social media. Telegram channel and bot owners can now receive 50% of the revenue from ads displayed in their channels and bots.  This page describes the methods used to withdraw channel/bot ad revenue, as well as view detailed revenue stats.

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.

#### [globalPrivacySettings](/constructor/globalPrivacySettings.md)
Global privacy settings

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Content protection](/api/content-protection.md)
Users and bots who want to keep their messages private, as well as Group and Channel owners who want to keep their content members-only can enable content protection, which prevents screenshots, copying, disables message forwards and limits the ability to save media from posts.

#### [Pinned messages](/api/pin.md)
Telegram allows pinning multiple messages on top of a specific chat.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.

#### [Third-party verification](/api/bots/verification.md)
To further improve transparency on Telegram, official third-party services are able to assign extra verification icons to user accounts and chats — in order to prevent scams and reduce misinformation.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Contact list](/api/contacts.md)
Working with contacts.

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.
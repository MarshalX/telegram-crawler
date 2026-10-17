# User profiles


Telegram offers many customization options for your profile!

### Name and bio

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;
    updateUser#20529438 user_id:long = Update;

    ---functions---
    
    account.updateProfile#78515775 flags:# first_name:flags.0?string last_name:flags.1?string about:flags.2?string = User;

Use [account.updateProfile](/method/account.updateProfile.md) to change the name and bio (`about`) of the current account.

`first_name` and `last_name` will be contained in the [user](/constructor/user.md) constructor, and the `about` field in the [userFull](/constructor/userFull.md) constructor.  

Changing the first/last name will emit an [updateUserName](/constructor/updateUserName.md) update, changing the `about` bio will emit an [updateUser](/constructor/updateUser.md) update (which should lead to an invalidation of the locally cached [userFull](/constructor/userFull.md) constructor, and subsequent refetch using [users.getFullUser](/method/users.getFullUser.md) if and when needed).  

#### Private notes for contacts

When adding or editing a **Telegram contact**, you can now include a private note — to help you remember how you met, where they work, or their favorite ice cream flavor.  

Notes for contacts are **only visible to you** and appear on the user's Telegram profile under their bio, see [here &raquo;](/api/contacts.md#private-notes-for-contacts) for more info.

#### Unofficial client warning

If the [userFull](/constructor/userFull.md).`unofficial_security_risk` flag is set, the user is using an unofficial Telegram client: clients should display a warning in the user's profile, indicating that messages sent to this user may be less secure.  

#### Managed bot manager

If the profile belongs to a [managed bot &raquo;](/api/bots/managed-bots.md), [userFull](/constructor/userFull.md).`bot_manager_id` contains the ID of the user or manager bot that manages it; the [user](/constructor/user.md).`bot_can_manage_bots` flag is instead set on the profile of a manager bot.  

### Profile photo

    userProfilePhotoEmpty#4f11bae1 = UserProfilePhoto;
    userProfilePhoto#82d1f706 flags:# has_video:flags.0?true personal:flags.2?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = UserProfilePhoto;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    updateUser#20529438 user_id:long = Update;

    ---functions---

    photos.updateProfilePhoto#9e82039 flags:# fallback:flags.0?true bot:flags.1?InputUser id:InputPhoto = photos.Photo;
    photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;

Use [photos.updateProfilePhoto](/method/photos.updateProfilePhoto.md) or [photos.uploadProfilePhoto](/method/photos.uploadProfilePhoto.md) to set a profile (optionally animated) picture, emitting an [updateUser](/constructor/updateUser.md).  

The photo will be contained in [user](/constructor/user.md).`photo`.  

See [here&nbsp;&raquo;](/api/files.md#uploading-profile-or-chat-pictures) for full info on profile pictures and how to work with them.  

### Introduction

    messages.stickersNotModified#f1749a22 = messages.Stickers;
    messages.stickers#30a6ec7e hash:long stickers:Vector<Document> = messages.Stickers;

    ---functions---

    messages.getStickers#d5a5d3a1 emoticon:string hash:long = messages.Stickers;

When the user opens a private chat with a user they don't have a history with, the UI should display a randomly chosen greeting sticker+invitation to send a message.  

To fetch this special list of greeting stickers, invoke [messages.getStickers](/method/messages.getStickers.md) with `emoticon=👋⭐️`.  

Note that if a custom [Telegram Business introduction&nbsp;&raquo;](/api/business.md#business-introduction) is enabled, the message+sticker specified in [userFull](/constructor/userFull.md).`intro` must be used, instead.  

### Emoji status

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    updateUserEmojiStatus#28373599 user_id:long emoji_status:EmojiStatus = Update;

    ---functions---
    
    account.updateEmojiStatus#fbd3de6b emoji_status:EmojiStatus = Bool;

[account.updateEmojiStatus](/method/account.updateEmojiStatus.md) may be used to update the [emoji status&nbsp;&raquo;](/api/emoji-status.md) of the current account, which is displayed next to the name.  

The emoji status will be contained in [user](/constructor/user.md).`emoji_status`, and changing it will emit an [updateUserEmojiStatus](/constructor/updateUserEmojiStatus.md) update.

See [here&nbsp;&raquo;](/api/emoji-status.md) for more info on emoji statuses.

### Username
    
    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;

    contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;

    ---functions---

    account.updateUsername#3e0bdd7c username:string = User;
    account.toggleUsername#58d6b376 username:string active:Bool = Bool;
    account.reorderUsernames#ef500eab order:Vector<string> = Bool;

    contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;

Use [account.updateUsername](/method/account.updateUsername.md) to change the `@username` of the current account, which other users may use to contact you, by resolving it using [contacts.resolveUsername](/method/contacts.resolveUsername.md).  

Multiple [collectible usernames](/api/fragment.md) may also be configured, using [account.toggleUsername](/method/account.toggleUsername.md) and [account.reorderUsernames](/method/account.reorderUsernames.md).  

The main username will be contained in [user](/constructor/user.md).`username`, any extra usernames will be contained in [user](/constructor/user.md).`usernames`.  
Updating/reordering usernames will emit an [updateUserName](/constructor/updateUserName.md).  

See [here&nbsp;&raquo;](/api/links.md#public-username-links) for more info on public username links.

### Accent colors

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    updateUser#20529438 user_id:long = Update;

    ---functions---

    account.updateColor#684d214e flags:# for_profile:flags.1?true color:flags.2?PeerColor = Bool;

Use [account.updateColor](/method/account.updateColor.md) to update the accent color and background emoji of the current profile, present in [user](/constructor/user.md).`color`/[user](/constructor/user.md).`profile_color`.  

Changing it will emit an [updateUser](/constructor/updateUser.md) update.  

See [here&nbsp;&raquo;](/api/colors.md) for more info on accent colors.

### Birthday

    birthday#6c8e1e06 flags:# day:int month:int year:flags.0?int = Birthday;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    updateUser#20529438 user_id:long = Update;

    contactBirthday#1d998733 contact_id:long birthday:Birthday = ContactBirthday;

    contacts.contactBirthdays#114ff30d contacts:Vector<ContactBirthday> users:Vector<User> = contacts.ContactBirthdays;

    inputPrivacyKeyBirthday#d65a11cc = InputPrivacyKey;

    privacyKeyBirthday#2000a518 = PrivacyKey;
    
    messageActionSuggestBirthday#2c8f2a25 birthday:Birthday = MessageAction;

    ---functions---

    account.updateBirthday#cc6e0c11 flags:# birthday:flags.0?Birthday = Bool;
    
    contacts.getBirthdays#daeda864 = contacts.ContactBirthdays;
    
    help.dismissSuggestion#f50dbaa1 peer:InputPeer suggestion:string = Bool;

    users.suggestBirthday#fc533372 id:InputUser birthday:Birthday = Updates;

Use [account.updateBirthday](/method/account.updateBirthday.md) to set a birthday date that will be displayed to the users specified in the [privacy settings&nbsp;&raquo;](/api/privacy.md), according to the current privacy setting of [inputPrivacyKeyBirthday](/constructor/inputPrivacyKeyBirthday.md) (only contacts by default).  

The birthday (if accessible to the current user) will be present in [user](/constructor/user.md).`birthday`, changing it will emit an [updateUser](/constructor/updateUser.md) update.  

Setting the actual birth `year` is optional, and if set, the allowed age range is currently `0 <= years <= 150` (checked only when updating the birthday); a `400 BIRTHDAY_INVALID` error will be emitted otherwise.  

To remove the birthday, call the method without setting the `birthday` flag.  

The client should display a tooltip to set a birthday; this tooltip may be dismissed by the user, triggering a call to [help.dismissSuggestion](/method/help.dismissSuggestion.md) with suggestion=`BIRTHDAY_SETUP` to sync the state on all currently logged-in clients through the `dismissed_suggestions` [client configuration field&nbsp;&raquo;](/api/config.md#dismissing-suggestions).  

[contacts.getBirthdays](/method/contacts.getBirthdays.md) returns all users with birthdays that fall within +1/-1 days, relative to the current day: this method should be invoked by clients every 6-8 hours, and if the result is non-empty, it should be used to appropriately update locally cached birthday information in [user](/constructor/user.md).`birthday`.  

If and only if the `BIRTHDAY_CONTACTS_TODAY` [suggestion&nbsp;&raquo;](/api/config.md#suggestions) is **not** set, all *contacts* whose [user](/constructor/user.md).`birthday` fields (updated through [contacts.getBirthdays](/method/contacts.getBirthdays.md) and in other ways, i.e. through [updateUser](/constructor/updateUser.md) updates) fall within +1/-1 days relative to today should be always listed in an action bar shown in the global dialog list (*not* the user-specific [action bar&nbsp;&raquo;](/api/action-bar.md)), inviting the user to make a birthday [gift to those users, in the form of one or more Telegram Premium subscriptions&nbsp;&raquo;](/api/premium.md#gifting-telegram-premium).  

The birthday action bar may be dismissed by the user, syncing its state to other currently logged-in sessions by invoking [help.dismissSuggestion](/method/help.dismissSuggestion.md) with suggestion=`BIRTHDAY_CONTACTS_TODAY`.  
Since `BIRTHDAY_CONTACTS_TODAY` is an *inverted* suggestion, dismissing it will actually *enable* it in the [client configuration](/api/config.md#client-configuration) on all currently logged-in sessions, notified by an [updateConfig](/constructor/updateConfig.md), and its *presence* should be treated as a signal to *not* display the birthday action bar.  

The suggestion is also automatically enabled by the server if the user gifts one or more Telegram Premium subscriptions to friends with birthdays falling within the next/previous 24 hours, thus hiding the birthday action bar to other logged-in sessions.  

Additionally, if a user has a birthday falling within the specified time range (+1/-1 days) as specified in [user](/constructor/user.md).`birthday`, a gift icon tooltip should be shown in the text input bar in private chats with them, leading to the [Telegram Premium gift flow&nbsp;&raquo;](/api/premium.md#gifting-telegram-premium) (this also applies to non-contacts that have allowed us to see their birthday date), regardless of the presence or absence of `BIRTHDAY_CONTACTS_TODAY`.  

Users may suggest a specific birthday to other users using [users.suggestBirthday](/method/users.suggestBirthday.md).  

Birthdays can be successfully suggested to users that do not have a birthday set, or to users that do have a birthday set, but that birthday is not visible to the currently logged in user due to the [inputPrivacyKeyBirthday](/constructor/inputPrivacyKeyBirthday.md) [privacy setting &raquo;](/api/privacy.md).  

On success, a [messageActionSuggestBirthday](/constructor/messageActionSuggestBirthday.md) service message will be sent to the specified user.  

The [push notification counterpart &raquo;](/api/push-updates.md) to that update is `MESSAGE_SUGGEST_BIRTHDAY`.  

Otherwise, if the specified user already has a birthday specified and that birthday is visible to the currently logged in user, a `400` `BIRTHDAY_ALREADY` RPC error will be emitted.

### Personal channel

    inputChannel#f35aec28 channel_id:long access_hash:long = InputChannel;
    inputChannelEmpty#ee8c1e86 = InputChannel;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    updateUser#20529438 user_id:long = Update;

    ---functions---

    channels.getAdminedPublicChannels#f8b036af flags:# by_location:flags.0?true check_limit:flags.1?true for_personal:flags.2?true = messages.Chats;
    
    account.updatePersonalChannel#d94305e0 channel:InputChannel = Bool;

    messages.getPersonalChannelHistory#55fb0996 user_id:InputUser limit:int max_id:int min_id:int hash:long = messages.Messages;

Use [account.updatePersonalChannel](/method/account.updatePersonalChannel.md) to associate (or remove via [inputChannelEmpty](/constructor/inputChannelEmpty.md)) a personal [channel&nbsp;&raquo;](/api/channel.md), that will be listed on our personal profile page.  

To fetch the full list of channels that may be passed to [account.updatePersonalChannel](/method/account.updatePersonalChannel.md), invoke [channels.getAdminedPublicChannels](/method/channels.getAdminedPublicChannels.md), setting the `for_personal` flag.  

The ID of the associated channel will be present in [user](/constructor/user.md).`personal_channel_id`, and the ID of the latest message that should be shown in the UI preview is contained in [user](/constructor/user.md).`personal_channel_message`.  

Changing it will emit an [updateUser](/constructor/updateUser.md) update.  

Bots may invoke [messages.getPersonalChannelHistory](/method/messages.getPersonalChannelHistory.md) to fetch the message history of the personal channel associated to a user, passing the user in `user_id`.  
The `max_id`, `min_id`, `limit` and `hash` parameters work as in other [paginated message history methods&nbsp;&raquo;](/api/offsets.md).  
This method can only be invoked by bots.  

### Business profile

    ---functions---

    account.updateBusinessWorkHours#4b00e066 flags:# business_work_hours:flags.0?BusinessWorkHours = Bool;
    account.updateBusinessLocation#9e6b131a flags:# geo_point:flags.1?InputGeoPoint address:flags.0?string = Bool;
    account.updateBusinessGreetingMessage#66cdafc4 flags:# message:flags.0?InputBusinessGreetingMessage = Bool;
    account.updateBusinessAwayMessage#a26a7fa5 flags:# message:flags.0?InputBusinessAwayMessage = Bool;
    account.updateBusinessIntro#a614d034 flags:# intro:flags.0?InputBusinessIntro = Bool;

A large number of various [Telegram Business-related](/api/business.md) information should be displayed on the profile page, see [here&nbsp;&raquo;](/api/business.md) for the full list of fields and how they can be changed.   

### Online status

    userStatusEmpty#9d05049 = UserStatus;
    userStatusOnline#edb93949 expires:int = UserStatus;
    userStatusOffline#8c703f was_online:int = UserStatus;
    userStatusRecently#7b197dc8 flags:# by_me:flags.0?true = UserStatus;
    userStatusLastWeek#541a1d1a flags:# by_me:flags.0?true = UserStatus;
    userStatusLastMonth#65899777 flags:# by_me:flags.0?true = UserStatus;

    updateUserStatus#e5bdf8de user_id:long status:UserStatus = Update;

    ---functions---
    
    account.updateStatus#6628562c offline:Bool = Bool;

Use [account.updateStatus](/method/account.updateStatus.md) to change the online status of the current account.

Changing the online status will emit an [updateUserStatus](/constructor/updateUserStatus.md) update.  

### Star rating

Telegram profiles now show a badge with a numerical rating based on the total volume of successful transactions they've made with Telegram Stars, see [here &raquo;](/api/stars.md#star-rating) for more info.  

### Tabs

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    profileTabPosts#b98cd696 = ProfileTab;
    profileTabGifts#4d4bd46a = ProfileTab;
    profileTabMedia#72c64955 = ProfileTab;
    profileTabFiles#ab339c00 = ProfileTab;
    profileTabMusic#9f27d26e = ProfileTab;
    profileTabVoice#e477092e = ProfileTab;
    profileTabLinks#d3656499 = ProfileTab;
    profileTabGifs#a2c0f695 = ProfileTab;

    ---functions---

    account.setMainProfileTab#5dee78b0 tab:ProfileTab = Bool;

    channels.setMainProfileTab#3583fcb1 channel:InputChannel tab:ProfileTab = Bool;

The lower part of the profile page has multiple tabs: users and channels may choose which profile tab to display first when a user opens the profile page, using [account.setMainProfileTab](/method/account.setMainProfileTab.md) and [channels.setMainProfileTab](/method/channels.setMainProfileTab.md): see the [ProfileTab type page](/type/ProfileTab.md) for the full list of tabs that can be set as main tab (also listed below).  

The chosen tab will then be available in [userFull](/constructor/userFull.md).`main_tab` and [channelFull](/constructor/channelFull.md).`main_tab`.

#### Stories

    profileTabPosts#b98cd696 = ProfileTab;

This tab contains [stories pinned to the profile &raquo;](/api/stories.md).  

Usable by both users and channels.  

See [here &raquo;](/api/stories.md) for more info on how to add, remove and fetch [stories](/api/stories.md) from this tab.  

[Story albums &raquo;](/api/stories.md) should also be supported.

#### Gifts
    
    profileTabGifts#4d4bd46a = ProfileTab;

This tab contains [gifts pinned to the profile &raquo;](/api/gifts.md).  

Usable by both users and channels.  

See [here &raquo;](/api/gifts.md) for more info on how to add, remove and fetch [gifts](/api/gifts.md) from this tab.  

This tab should also have [gift collection indicators &raquo;](/api/gifts.md#gift-collections).  

#### Music

    profileTabMusic#9f27d26e = ProfileTab;

    inputPrivacyKeySavedMusic#4dbe9226 = InputPrivacyKey;
    privacyKeySavedMusic#ff7a571b = PrivacyKey;

    account.savedMusicIdsNotModified#4fc81d6e = account.SavedMusicIds;
    account.savedMusicIds#998d6636 ids:Vector<long> = account.SavedMusicIds;

    users.savedMusicNotModified#e3878aa4 count:int = users.SavedMusic;
    users.savedMusic#34a2f297 count:int documents:Vector<Document> = users.SavedMusic;
    
    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    account.saveMusic#b26732a9 flags:# unsave:flags.0?true id:InputDocument after_id:flags.1?InputDocument = Bool;

    users.getSavedMusic#788d7fe3 id:InputUser offset:int limit:int hash:long = users.SavedMusic;

    account.getSavedMusicIds#e09d5faf hash:long = account.SavedMusicIds;

    users.getSavedMusicByID#7573a4e9 id:InputUser documents:Vector<InputDocument> = users.SavedMusic;

This tab displays music added to the profile using the methods described below.  

Usable only by users.  

This tab can be hidden or selectively shown to contacts/users using the [inputPrivacyKeySavedMusic](/constructor/inputPrivacyKeySavedMusic.md) privacy key, see [here &raquo;](/api/privacy.md) for more info on privacy settings.  

To add a music file to our profile, invoke [account.saveMusic](/method/account.saveMusic.md) on a music file available in a private chat, group or channel; invoke the method with the `unsave` flag to remove the song from the profile.  

The first song added to the profile will be available in [userFull](/constructor/userFull.md).`saved_music`.  

Songs added to the profile can be fetched using [users.getSavedMusic](/method/users.getSavedMusic.md) (both by us and by other users, according to the configured [privacy settings &raquo;](/api/privacy.md)).  

When adding songs with [account.saveMusic](/method/account.saveMusic.md), the `after_id` flag can also be populated to specify that the song in `id` should be added after the song passed in `after_id` (which must be already in the saved songs list): this can also be done if `id` is already in the saved songs list, to reorder entries.  
Adding an already added song will never re-add it, only move it to the top of the song list (or after the song passed in `after_id`).  
The method will return false if the passed `after_id` isn't an audio currently on the profile (for example it was removed from the profile by another client).  

To fetch the full **unordered** list of IDs of the songs we added to our profile, use [account.getSavedMusicIds](/method/account.getSavedMusicIds.md): this method doesn't require pagination, as it returns only the document IDs, without the full document objects: it can be used to quickly check whether new songs were added to our profile (and not for song order changes), if the `hash` field (generated [the usual way](/api/offsets.md#hash-generation) from the returned IDs) is populated.  

As mentioned above, to fetch the ordered list of songs on any profile including our own, use [users.getSavedMusic](/method/users.getSavedMusic.md).  

[users.getSavedMusicByID](/method/users.getSavedMusicByID.md) takes a list of audio [inputDocument](/constructor/inputDocument.md)s, and returns the associated [document](/constructor/document.md)s only if they are currently pinned on the specified user's profile: while it *can* be used to check if some songs are still pinned on the profile of a user, its main intended use is to refetch expired [file references](/api/file-references.md) of songs previously seen on a user's profile, as, only in the context of this method, the passed [inputDocument](/constructor/inputDocument.md) can have an empty `file_reference` field, and the refreshed reference will be returned by the method if the audio is still pinned on the user's profile (this case is already automatically covered by the [file reference map file](/api/file-references.md)).  

#### Media

    profileTabMedia#72c64955 = ProfileTab;

This tab displays the videos and photos shared in the chat, fetched using [messages.search](/method/messages.search.md) and the [inputMessagesFilterPhotoVideo](/constructor/inputMessagesFilterPhotoVideo.md) filter, see [here &raquo;](/api/search.md) for more info.  

Usable by both users and channels.  

#### Voice messages

    profileTabVoice#e477092e = ProfileTab;

This tab displays the voice messages shared in the chat, fetched using [messages.search](/method/messages.search.md) and the [inputMessagesFilterVoice](/constructor/inputMessagesFilterVoice.md) filter, see [here &raquo;](/api/search.md) for more info.  

Usable by both users and channels.  

#### Links

    profileTabLinks#d3656499 = ProfileTab;

This tab displays the voice messages shared in the chat, fetched using [messages.search](/method/messages.search.md) and the [inputMessagesFilterUrl](/constructor/inputMessagesFilterUrl.md) filter, see [here &raquo;](/api/search.md) for more info.  

Usable by both users and channels.  

#### Gifs

    profileTabGifs#a2c0f695 = ProfileTab;

This tab displays gifs shared in the chat, fetched using [messages.search](/method/messages.search.md) and the [inputMessagesFilterGif](/constructor/inputMessagesFilterGif.md) filter, see [here &raquo;](/api/search.md) for more info.  

Usable by both users and channels.  

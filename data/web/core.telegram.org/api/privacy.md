# Privacy settings


Telegram allows users to specify granular privacy settings, choosing which users can or can't interact with them in certain ways.

### Privacy rules

Schema:

    inputPrivacyValueAllowContacts#d09e07b = InputPrivacyRule;
    inputPrivacyValueAllowAll#184b35ce = InputPrivacyRule;
    inputPrivacyValueAllowUsers#131cc67f users:Vector<InputUser> = InputPrivacyRule;
    inputPrivacyValueDisallowContacts#ba52007 = InputPrivacyRule;
    inputPrivacyValueDisallowAll#d66b66c9 = InputPrivacyRule;
    inputPrivacyValueDisallowUsers#90110467 users:Vector<InputUser> = InputPrivacyRule;
    inputPrivacyValueAllowChatParticipants#840649cf chats:Vector<long> = InputPrivacyRule;
    inputPrivacyValueDisallowChatParticipants#e94f0f86 chats:Vector<long> = InputPrivacyRule;
    inputPrivacyValueAllowCloseFriends#2f453e49 = InputPrivacyRule;
    inputPrivacyValueAllowPremium#77cdc9f1 = InputPrivacyRule;
    inputPrivacyValueAllowBots#5a4fcce5 = InputPrivacyRule;
    inputPrivacyValueDisallowBots#c4e57915 = InputPrivacyRule;

    privacyValueAllowContacts#fffe1bac = PrivacyRule;
    privacyValueAllowAll#65427b82 = PrivacyRule;
    privacyValueAllowUsers#b8905fb2 users:Vector<long> = PrivacyRule;
    privacyValueDisallowContacts#f888fa1a = PrivacyRule;
    privacyValueDisallowAll#8b73e763 = PrivacyRule;
    privacyValueDisallowUsers#e4621141 users:Vector<long> = PrivacyRule;
    privacyValueAllowChatParticipants#6b134e8e chats:Vector<long> = PrivacyRule;
    privacyValueDisallowChatParticipants#41c87565 chats:Vector<long> = PrivacyRule;
    privacyValueAllowCloseFriends#f7e8d89b = PrivacyRule;
    privacyValueAllowPremium#ece9814b = PrivacyRule;
    privacyValueAllowBots#21461b5d = PrivacyRule;
    privacyValueDisallowBots#f6a5f82f = PrivacyRule;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    ---functions---

    contacts.editCloseFriends#ba6705f0 id:Vector<long> = Bool;

Privacy **rules** indicate *who* can or can't do something and are specified by a [PrivacyRule](/type/PrivacyRule.md), and its input counterpart [InputPrivacyRule](/type/InputPrivacyRule.md).  
[InputPrivacyRule](/type/InputPrivacyRule.md) constructors are *passed* as input to methods that accept privacy rules, while [PrivacyRule](/type/PrivacyRule.md)s are contained in constructors *returned* by the API.  

See [the type page&nbsp;&raquo;](/type/InputPrivacyRule.md) for a full list of privacy rules and their descriptions.  

One privacy rule in particular should be mentioned separately, (input)[privacyValueAllowCloseFriends](/constructor/privacyValueAllowCloseFriends.md): this privacy rule, which can be used only when [posting stories](/api/stories.md), refers exclusively to a list of "close friends", that can be modified using [contacts.editCloseFriends](/method/contacts.editCloseFriends.md), passing the full close friend list as a list of user IDs: note that only users [in the contact list (even without a phone number)&nbsp;&raquo;](/api/contacts.md) can be added to the close friends list.  

The current list of close friends can be checking which users in our contact list have the `close_friend` flag set in the associated [user](/constructor/user.md) constructor, see [here&nbsp;&raquo;](/api/contacts.md#fetching-the-contact-list) for more info on how to fetch the contact list.

### Privacy keys

Schema:

    inputPrivacyKeyStatusTimestamp#4f96cb18 = InputPrivacyKey;
    inputPrivacyKeyChatInvite#bdfb0426 = InputPrivacyKey;
    inputPrivacyKeyPhoneCall#fabadc5f = InputPrivacyKey;
    inputPrivacyKeyPhoneP2P#db9e70d2 = InputPrivacyKey;
    inputPrivacyKeyForwards#a4dd4c08 = InputPrivacyKey;
    inputPrivacyKeyProfilePhoto#5719bacc = InputPrivacyKey;
    inputPrivacyKeyPhoneNumber#352dafa = InputPrivacyKey;
    inputPrivacyKeyAddedByPhone#d1219bdd = InputPrivacyKey;
    inputPrivacyKeyVoiceMessages#aee69d68 = InputPrivacyKey;
    inputPrivacyKeyAbout#3823cc40 = InputPrivacyKey;
    inputPrivacyKeyBirthday#d65a11cc = InputPrivacyKey;
    inputPrivacyKeyStarGiftsAutoSave#e1732341 = InputPrivacyKey;
    inputPrivacyKeyNoPaidMessages#bdc597b4 = InputPrivacyKey;
    inputPrivacyKeySavedMusic#4dbe9226 = InputPrivacyKey;

    privacyKeyStatusTimestamp#bc2eab30 = PrivacyKey;
    privacyKeyChatInvite#500e6dfa = PrivacyKey;
    privacyKeyPhoneCall#3d662b7b = PrivacyKey;
    privacyKeyPhoneP2P#39491cc8 = PrivacyKey;
    privacyKeyForwards#69ec56a3 = PrivacyKey;
    privacyKeyProfilePhoto#96151fed = PrivacyKey;
    privacyKeyPhoneNumber#d19ae46d = PrivacyKey;
    privacyKeyAddedByPhone#42ffd42b = PrivacyKey;
    privacyKeyVoiceMessages#697f414 = PrivacyKey;
    privacyKeyAbout#a486b761 = PrivacyKey;
    privacyKeyStarGiftsAutoSave#2ca4fdf8 = PrivacyKey;
    privacyKeyNoPaidMessages#17d348d2 = PrivacyKey;
    privacyKeySavedMusic#ff7a571b = PrivacyKey;

    account.privacyRules#50a04e45 rules:Vector<PrivacyRule> chats:Vector<Chat> users:Vector<User> = account.PrivacyRules;

    updatePrivacy#ee3b272a key:PrivacyKey rules:Vector<PrivacyRule> = Update;

    ---functions---

    account.getPrivacy#dadbc950 key:InputPrivacyKey = account.PrivacyRules;
    account.setPrivacy#c9f81ce8 key:InputPrivacyKey rules:Vector<InputPrivacyRule> = account.PrivacyRules;

Privacy **keys** together with [privacy rules&nbsp;&raquo;](#privacy-rules) indicate *what* can or can't someone do and are specified by a [PrivacyKey](/type/PrivacyKey.md) constructor, and its input counterpart [InputPrivacyKey](/type/InputPrivacyKey.md).  
[InputPrivacyKey](/type/InputPrivacyKey.md) constructors are *passed* as input to methods that accept privacy keys, while [PrivacyKey](/type/PrivacyKey.md)s are contained in constructors *returned* by the API.  

See [the type page&nbsp;&raquo;](/type/InputPrivacyKey.md) for a full list of privacy keys and their descriptions.  

Use [account.getPrivacy](/method/account.getPrivacy.md) to obtain the current set of [rules](#privacy-rules) associated to a key, and [account.setPrivacy](/method/account.setPrivacy.md) to change it.

Changing the privacy settings will trigger an [updatePrivacy](/constructor/updatePrivacy.md), sent to all currently logged in sessions of the current account.

### Global privacy settings

    globalPrivacySettings#fe41b34f flags:# archive_and_mute_new_noncontact_peers:flags.0?true keep_archived_unmuted:flags.1?true keep_archived_folders:flags.2?true hide_read_marks:flags.3?true new_noncontact_peers_require_premium:flags.4?true display_gifts_button:flags.7?true noncontact_peers_paid_stars:flags.5?long disallowed_gifts:flags.6?DisallowedGiftsSettings = GlobalPrivacySettings;

    ---functions---

    account.getGlobalPrivacySettings#eb2b4cf6 = GlobalPrivacySettings;
    account.setGlobalPrivacySettings#1edaaac2 settings:GlobalPrivacySettings = GlobalPrivacySettings;

Some global privacy settings can also be fetched and modified using [account.getGlobalPrivacySettings](/method/account.getGlobalPrivacySettings.md) and [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md).  

Global privacy settings are represented by the [globalPrivacySettings](/constructor/globalPrivacySettings.md) constructor, please see the [constructor page](/constructor/globalPrivacySettings.md) for a full description of all settings.

#### Require Premium for new non-contact users 

    requirementToContactEmpty#50a9839 = RequirementToContact;
    requirementToContactPremium#e581e4e9 = RequirementToContact;
    requirementToContactPaidMessages#b4f67e93 stars_amount:long = RequirementToContact;

    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;
    
    ---functions---

    users.getRequirementsToContact#d89a83a3 id:Vector<InputUser> = Vector<RequirementToContact>;

If a user enables their [globalPrivacySettings](/constructor/globalPrivacySettings.md).**new\_noncontact\_peers\_require\_premium** [global privacy setting](/api/privacy.md#global-privacy-settings), represented in [user](/constructor/user.md).`contact_require_premium` for other users, only users that have a premium account, are in our contact list, or already have a private chat with them can write to them in private; a `403 PRIVACY_PREMIUM_REQUIRED` error will be emitted otherwise.  

Note that all the secondary conditions listed above must be checked separately to verify whether we can still write to the user, even if [user](/constructor/user.md).`contact_require_premium` flag is set for a user (i.e. a mutual contact will have this flag set even if we can still write to them, and so on...); to avoid doing these extra checks if we haven't yet cached all the required information (for example while displaying the chat list in the sharing UI) the [users.getRequirementsToContact](/method/users.getRequirementsToContact.md) method may be invoked instead, passing the list of users currently visible in the UI, returning a list of conditions (including [requirementToContactPremium](/constructor/requirementToContactPremium.md)) that directly specify whether we can or cannot write to each user.  
Alternatively, the [userFull](/constructor/userFull.md).`contact_require_premium` flag contains the same (fully checked, i.e. it's not just a copy of [user](/constructor/user.md).`contact_require_premium`) info returned by [users.getRequirementsToContact](/method/users.getRequirementsToContact.md).

This information may then be used, for example, to display a lock near the avatar of each user that we cannot write to, with an appropriate tooltip to purchase a [Premium](/api/premium.md) subscription.

Note that [users.getRequirementsToContact](/method/users.getRequirementsToContact.md) should **only** be invoked if we don't have a [Premium](/api/premium.md) subscription, only for users whose full info ([userFull](/constructor/userFull.md) + message history information) is not cached yet, as the same info can be computed locally if all the mentioned information is available, and updated automatically using the usual [updates](/api/updates.md).

Also note that the [globalPrivacySettings](/constructor/globalPrivacySettings.md).**new\_noncontact\_peers\_require\_premium** option may be enabled by both non-[Premium](/api/premium.md) and [Premium](/api/premium.md) users only if the [new\_noncontact\_peers\_require\_premium\_without\_ownpremium client configuration flag »](/api/config.md#new-noncontact-peers-require-premium-without-ownpremium) is equal to true, otherwise it may be enabled only by [Premium](/api/premium.md) users and non-Premium users will receive a `PREMIUM_ACCOUNT_REQUIRED` error when trying to enable this flag with [account.setGlobalPrivacySettings](/method/account.setGlobalPrivacySettings.md).

#### Require a Telegram Star payment to receive messages

If a user enables their [globalPrivacySettings](/constructor/globalPrivacySettings.md).`noncontact_peers_paid_stars` [global privacy setting](/api/privacy.md#global-privacy-settings), anyone wishing to send them messages must pay them the specified amount of [Telegram Stars &raquo;](/api/stars.md)

The same setting can also be enabled for supergroups and channels, see [here &raquo;](/api/paid-messages.md) for the full documentation on paid messages.  


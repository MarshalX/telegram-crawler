# Admin, banned, default rights


[Channels and supergroups](/api/channel.md) allow setting [granular permissions](https://telegram.org/blog/permissions-groups-undo) both for admins and specific users.
[Channels, supergroups and basic groups](/api/channel.md) also allow setting global granular permissions for users.

They can be modified as follows:

### Admin rights

    chatAdminRights#5fb224d5 flags:# change_info:flags.0?true post_messages:flags.1?true edit_messages:flags.2?true delete_messages:flags.3?true ban_users:flags.4?true invite_users:flags.5?true pin_messages:flags.7?true add_admins:flags.9?true anonymous:flags.10?true manage_call:flags.11?true other:flags.12?true manage_topics:flags.13?true post_stories:flags.14?true edit_stories:flags.15?true delete_stories:flags.16?true manage_direct_messages:flags.17?true manage_ranks:flags.18?true = ChatAdminRights;

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    ---functions---
    
    channels.editAdmin#9a98ad68 flags:# channel:InputChannel user_id:InputUser admin_rights:ChatAdminRights rank:flags.0?string = Updates;

    messages.editChatAdmin#a85bd1c2 chat_id:long user_id:InputUser is_admin:Bool = Bool;

[channels.editAdmin](/method/channels.editAdmin.md) can be used to modify the admin rights of a user in a channel or supergroup.
[Basic groups](/api/channel.md#basic-groups) do not allow setting granular admin permissions, [messages.editChatAdmin](/method/messages.editChatAdmin.md) has to be used, instead.

Permissions are defined by the [chatAdminRights](/constructor/chatAdminRights.md) constructor, some admin rights can only be used for channels, others both for channels and supergroups (see the constructor page).

The admin rights of the current user will be available in the form of a [chatAdminRights](/constructor/chatAdminRights.md) constructor in:

* [channel](/constructor/channel.md).`admin_rights` for supergroups, channels.  
* [chat](/constructor/chat.md).`admin_rights` for basic groups, note that for simplicity, [chatAdminRights](/constructor/chatAdminRights.md) is still used to *describe* the admin rights of basic groups, even if granular modification of admin rights is not available for basic groups.    

#### Anonymous admins

    chatAdminRights#5fb224d5 flags:# change_info:flags.0?true post_messages:flags.1?true edit_messages:flags.2?true delete_messages:flags.3?true ban_users:flags.4?true invite_users:flags.5?true pin_messages:flags.7?true add_admins:flags.9?true anonymous:flags.10?true manage_call:flags.11?true other:flags.12?true manage_topics:flags.13?true post_stories:flags.14?true edit_stories:flags.15?true delete_stories:flags.16?true manage_direct_messages:flags.17?true manage_ranks:flags.18?true = ChatAdminRights;

Among the various available admin rights, [chatAdminRights](/constructor/chatAdminRights.md).`anonymous` is a special admin right available to supergroup admins that when enabled, hides them from the member list and forbids them from posting messages directly from their user account: they will be able to post only on behalf of the group, or other channels they own.  

The default `send_as` value for the admin will also be automatically set to the group itself when enabling this admin right; it can be changed later by the admin to other owned channels, if desired.  

See [here &raquo;](/api/channel.md#sending-messages-on-behalf-of-owned-channels-and-groups) for more info on `send_as`.  

### Banned rights

    chatBannedRights#9f120418 flags:# view_messages:flags.0?true send_messages:flags.1?true send_media:flags.2?true send_stickers:flags.3?true send_gifs:flags.4?true send_games:flags.5?true send_inline:flags.6?true embed_links:flags.7?true send_polls:flags.8?true change_info:flags.10?true invite_users:flags.15?true pin_messages:flags.17?true manage_topics:flags.18?true send_photos:flags.19?true send_videos:flags.20?true send_roundvideos:flags.21?true send_audios:flags.22?true send_voices:flags.23?true send_docs:flags.24?true send_plain:flags.25?true edit_rank:flags.26?true send_reactions:flags.27?true until_date:int = ChatBannedRights;

    ---functions---

    channels.editBanned#96e6cd81 channel:InputChannel participant:InputPeer banned_rights:ChatBannedRights = Updates;

[channels.editBanned](/method/channels.editBanned.md) can be used to modify the rights of a user in a channel or supergroup, to ban/kick a user from the group, or restrict the user from doing certain things.
[Basic groups](/api/channel.md#basic-groups) do not allow setting granular user permissions for single users, single users can only be removed from groups using [messages.deleteChatUser](/method/messages.deleteChatUser.md): however, setting [global granular permissions with basic groups is supported](#default-rights).

Permissions are defined by the [chatBannedRights](/constructor/chatBannedRights.md) constructor, for more info see the constructor page.

### Default rights

    chatBannedRights#9f120418 flags:# view_messages:flags.0?true send_messages:flags.1?true send_media:flags.2?true send_stickers:flags.3?true send_gifs:flags.4?true send_games:flags.5?true send_inline:flags.6?true embed_links:flags.7?true send_polls:flags.8?true change_info:flags.10?true invite_users:flags.15?true pin_messages:flags.17?true manage_topics:flags.18?true send_photos:flags.19?true send_videos:flags.20?true send_roundvideos:flags.21?true send_audios:flags.22?true send_voices:flags.23?true send_docs:flags.24?true send_plain:flags.25?true edit_rank:flags.26?true send_reactions:flags.27?true until_date:int = ChatBannedRights;

    ---functions---
    
    messages.editChatDefaultBannedRights#a5866b41 peer:InputPeer banned_rights:ChatBannedRights = Updates;

[messages.editChatDefaultBannedRights](/method/messages.editChatDefaultBannedRights.md) can be used to modify the rights of **all** users in a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [basic group](/api/channel.md#basic-groups), to restrict them from doing certain things.

Permissions are defined by the [chatBannedRights](/constructor/chatBannedRights.md) constructor: all flags can be used except for `view_messages`, for more info see the constructor page.

### Suggested bot rights

    chatAdminRights#5fb224d5 flags:# change_info:flags.0?true post_messages:flags.1?true edit_messages:flags.2?true delete_messages:flags.3?true ban_users:flags.4?true invite_users:flags.5?true pin_messages:flags.7?true add_admins:flags.9?true anonymous:flags.10?true manage_call:flags.11?true other:flags.12?true manage_topics:flags.13?true post_stories:flags.14?true edit_stories:flags.15?true delete_stories:flags.16?true manage_direct_messages:flags.17?true manage_ranks:flags.18?true = ChatAdminRights;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;

    ---functions---

    bots.setBotBroadcastDefaultAdminRights#788464e1 admin_rights:ChatAdminRights = Bool;
    bots.setBotGroupDefaultAdminRights#925ec9ea admin_rights:ChatAdminRights = Bool;

[Bots](/api/bots.md) can suggest a set of admin rights when being added to groups and channels.  

Bots can use [bots.setBotBroadcastDefaultAdminRights](/method/bots.setBotBroadcastDefaultAdminRights.md) to indicate a suggested set of [admin rights&nbsp;&raquo;](/api/rights.md) to use when adding the bot to a [channel](/api/channel.md), and [bots.setBotGroupDefaultAdminRights](/method/bots.setBotGroupDefaultAdminRights.md) when adding the bot to a [group](/api/channel.md).  

These suggested admin rights are contained in the `bot_broadcast_admin_rights` and `bot_group_admin_rights` parameters of [userFull](/constructor/userFull.md), obtainable using [users.getFullUser](/method/users.getFullUser.md).  

A client application trying to add a bot as admin should fetch the default rights and present them as editable defaults to the user: the rights can then be modified before [setting the bot as admin](#admin-rights).

Note that admin rights suggested by a [bot deep link](/api/links.md#group-channel-bot-links) take priority over the suggested rights specified by `bot_broadcast_admin_rights` and `bot_group_admin_rights`: they can still be modified by the user before setting the bot as admin.  

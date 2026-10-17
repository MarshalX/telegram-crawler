# Peer database


<!-- a24af0992245f838f2b4b418a0a2d5fa9caa27b5 -->

Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.  

[user](/constructor/user.md), [chat](/constructor/chat.md), [channel](/constructor/channel.md) constructors and their full counterparts [userFull](/constructor/userFull.md), [chatFull](/constructor/chatFull.md), [channelFull](/constructor/channelFull.md) are especially important, because they contain important information about users, bots, chats and channels (from now on, *peers*), and most importantly the `access_hash` value, **required** to interact with peers in the API.  

This page describes exactly how and when should the local databases of the constructors listed above be refreshed, and contains a more detailed description of basic peer-related concepts.  

> For simplicity, the documentation often uses the term "cache" instead of "database" when referring to the peer database, however note that it is recommended to persist received information (or at the very least the id+access hash) to a database, to call methods requiring the access hash and view other peer info without refetching the chat history and peer info after startup.  

### Peer info database

    userEmpty#d3bc4b7a id:long = User;
    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    chatEmpty#29562865 id:long = Chat;
    chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;
    chatForbidden#6592a1a7 id:long title:string = Chat;

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;
    channelForbidden#17d493d5 flags:# broadcast:flags.5?true megagroup:flags.8?true monoforum:flags.10?true id:long access_hash:long title:string until_date:flags.16?int = Chat;

    inputUserEmpty#b98886cf = InputUser;
    inputUserSelf#f7c1b13f = InputUser;
    inputUser#f21158c6 user_id:long access_hash:long = InputUser;
    inputUserFromMessage#1da448e2 peer:InputPeer msg_id:int user_id:long = InputUser;

    // No inputChat, just a long is used (because basic chats don't have access hashes)

    inputChannelEmpty#ee8c1e86 = InputChannel;
    inputChannel#f35aec28 channel_id:long access_hash:long = InputChannel;
    inputChannelFromMessage#5b934f9d peer:InputPeer msg_id:int channel_id:long = InputChannel;

    inputPeerEmpty#7f3b18ea = InputPeer;
    inputPeerSelf#7da07ec9 = InputPeer;
    inputPeerChat#35a95cb9 chat_id:long = InputPeer;
    inputPeerUser#dde8a54c user_id:long access_hash:long = InputPeer;
    inputPeerChannel#27bcbbfc channel_id:long access_hash:long = InputPeer;
    inputPeerUserFromMessage#a87b0a1c peer:InputPeer msg_id:int user_id:long = InputPeer;
    inputPeerChannelFromMessage#bd2a0840 peer:InputPeer msg_id:int channel_id:long = InputPeer;

    ---functions---

    users.getUsers#d91a548 id:Vector<InputUser> = Vector<User>;
    messages.getChats#49e9528f id:Vector<long> = messages.Chats;
    channels.getChannels#a7f6bbb id:Vector<InputChannel> = messages.Chats;

The peer info database contains the following information:  

* The [peer ID&nbsp;&raquo;](#peer-id)
* The [access hash&nbsp;&raquo;](#access-hash)
* [Other info&nbsp;&raquo;](#other-info)

And it must be populated as follows:

* [By saving received user, chat, channel constructors&nbsp;&raquo;](#saving-constructors)
* [By handling certain updates&nbsp;&raquo;](#handling-updates)
* [By manual refreshes&nbsp;&raquo;](#manual-refreshes)

Example implementation: [tdlib](https://github.com/tdlib/td/).

#### Saving constructors

The peer info database needs to be updated every time a new constructor of type [user](/constructor/user.md), [chat](/constructor/chat.md) and [channel](/constructor/channel.md) (and their `forbidden` counterparts, used for peers that the user can't access, but can view basic info about) is received.  

These constructors are received when interacting with the API (i.e. in common chats, through the search function, [username resolution](/api/invites.md#public-usernames), [temporary profile links](/api/links.md#temporary-profile-links), and so on...).  

Unless specified otherwise (see the constructor pages for the special cases), when updating the local peer database, all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).  

#### Handling updates

The following updates should trigger an update of a small subset of the info contained in the peer database (both non-full and [full variants](#full-info-database)).  

#### User/channel/supergroup updates

* [updateUserStatus](/constructor/updateUserStatus.md) - Update [user](/constructor/user.md).`status`
* [updateUserName](/constructor/updateUserName.md)- Update [user](/constructor/user.md).`first_name`/`last_name`/`username`/`usernames`
* [updatePeerBlocked](/constructor/updatePeerBlocked.md) - Update [userFull](/constructor/userFull.md).`blocked`, [channelFull](/constructor/channelFull.md).`blocked`
* [updatePeerSettings](/constructor/updatePeerSettings.md) - Update [userFull](/constructor/userFull.md).`settings`
* [updatePeerWallpaper](/constructor/updatePeerWallpaper.md) - Update [userFull](/constructor/userFull.md).`wallpaper`, [channelFull](/constructor/channelFull.md).`wallpaper`
* [updateUserEmojiStatus](/constructor/updateUserEmojiStatus.md) - Update [user](/constructor/user.md).`emoji_status`
* [updateChannelAvailableMessages](/constructor/updateChannelAvailableMessages.md) - Update [channel](/constructor/channel.md).`hidden_prehistory`

#### Basic group updates

    chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;

    chatParticipant#38e79fde flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;
    chatParticipantCreator#e1f867b8 flags:# user_id:long rank:flags.0?string = ChatParticipant;
    chatParticipantAdmin#360d5d2 flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;

    chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;
    
    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;

    updateChatParticipants#7761198 participants:ChatParticipants = Update;
    updateChatParticipantAdd#3dda5451 chat_id:long user_id:long inviter_id:long date:int version:int = Update;
    updateChatParticipantDelete#e32f3d77 chat_id:long user_id:long version:int = Update;
    updateChatParticipantAdmin#d7ca61a2 chat_id:long user_id:long is_admin:Bool version:int = Update;
    updateChatDefaultBannedRights#54c01850 peer:Peer default_banned_rights:ChatBannedRights version:int = Update;
    updateChatParticipantRank#bd8367b9 chat_id:long user_id:long rank:string version:int = Update;

    updateChatParticipant#d087663a flags:# chat_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChatParticipant new_participant:flags.1?ChatParticipant invite:flags.2?ExportedChatInvite qts:int = Update;

All updates related to [basic groups](/api/channel.md#basic-groups) (not supergroups) also have a `version` integer field, which should be used to apply the update, comparing it with the `version` field of the cached [chat](/constructor/chat.md) (from now on, referred to as `cached_version`):

- If `version` is smaller than `cached_version+1`, skip the update
- If `version` is equal to `cached_version+1`, apply the update and update the `version` of the local [chat](/constructor/chat.md)
- If `version` is bigger than `cached_version+1`, skip the update, and invalidate and refetch the local [chat](/constructor/chat.md) and [chatFull](/constructor/chatFull.md) using [messages.getFullChat](/method/messages.getFullChat.md)
- If there is no locally cached [chat](/constructor/chat.md) for this chat, skip the update and fetch full info using using [messages.getFullChat](/method/messages.getFullChat.md)

Note that [chatParticipants](/constructor/chatParticipants.md).`version` (contained in [chatFull](/constructor/chatFull.md)) points to exactly the same sequence contained in [chat](/constructor/chat.md).`version`.  

Here's the full list of updates related to basic groups which have the `version` field, and which parts of the stored [chat](/constructor/chat.md)/[chatFull](/constructor/chatFull.md) should they update if applied:

* [updateChatParticipants](/constructor/updateChatParticipants.md) - Update [chat](/constructor/chat.md).`participants_count`, [chatFull](/constructor/chatFull.md).`participants` (note that the `version` is contained in the [chatParticipants](/constructor/chatParticipants.md) inside [updateChatParticipants](/constructor/updateChatParticipants.md).`participants`, not in the top constructor, and is not present in the banned [chatParticipantsForbidden](/constructor/chatParticipantsForbidden.md) variant).  
* [updateChatParticipant](/constructor/updateChatParticipant.md) - Update [chat](/constructor/chat.md).`participants_count`, [chatFull](/constructor/chatFull.md).`participants`.  
* [updateChatParticipantAdd](/constructor/updateChatParticipantAdd.md) - Update [chat](/constructor/chat.md).`participants_count`, [chatFull](/constructor/chatFull.md).`participants`.  
* [updateChatParticipantDelete](/constructor/updateChatParticipantDelete.md) - Update [chat](/constructor/chat.md).`participants_count`, [chatFull](/constructor/chatFull.md).`participants`.  
* [updateChatParticipantAdmin](/constructor/updateChatParticipantAdmin.md) - Update [chat](/constructor/chat.md).`admin_rights` if `user_id` points to the current user and [chatFull](/constructor/chatFull.md).`participants` unconditionally.  
* [updateChatDefaultBannedRights](/constructor/updateChatDefaultBannedRights.md) - Update [chat](/constructor/chat.md).`default_banned_rights`
* [updateChatParticipantRank](/constructor/updateChatParticipantRank.md) - Update the [ChatParticipant](/type/ChatParticipant.md).`rank` (contained in [chatFull](/constructor/chatFull.md).`participants`) of the specified user 

An exception to the rule is [updateChatParticipant](/constructor/updateChatParticipant.md): this update can only be used by bots, and does **not** have a `version` field; instead, deduplication relies only on the usual `qts` deduplication mechanism used for bot updates, see [here &raquo;](/api/updates.md) for more info.  

#### Manual refreshes

For performance reasons, the server will not always send updates containing updated information about all peers: for this reason, information about *already cached* peers may be refreshed manually in certain conditions using the bulked [users.getUsers](/method/users.getUsers.md), [messages.getChats](/method/messages.getChats.md), [channels.getChannels](/method/channels.getChannels.md) methods, all requiring the previously cached `access_hash`.  

The following list is non-exhaustive, and clients may choose to refresh peer information in some other conditions as well (i.e. when opening the profile page, etc).  

* When fetching info about one of the following internal user IDs, if the info isn't already cached or if the cached info is `min`: 777000 (service notifications user), 1271266957 (replies bot), 1087968824 (anonymous bot), 136817688 (channel bot), 5434988373 (antispam bot).  
  Info about these IDs may be fetched with the zero access hash even by users.  
*  After invoking [bots.setBotInfo](/method/bots.setBotInfo.md) after changing `name` (but **not** the `about` or the `description`, as changing those fields already triggers a refresh of the full info database, and with it the peer database), for the bot whose info we changed
* After receiving a `CHAT_FORWARDS_RESTRICTED` error when forwarding messages from a chat, to refresh info about the source chat (i.e. the fact that we received this error means that the client didn't locally prevent the user from forwarding a message from the protected chat, because the locally cached [channel](/constructor/channel.md).`noforwards`/[chat](/constructor/chat.md).`noforwards` flag is out of date).
* After receiving a `CHAT_GUEST_SEND_FORBIDDEN` error when sending messages to a [discussion group](/api/discussion.md), to refresh info about the discussion group (i.e. the fact that we received this error means that the client didn't locally prevent the non-member user from sending a message to a discussion group where only members can send messages, because the locally cached [channel](/constructor/channel.md).`join_to_send` flag is out of date).
* After receiving a `USER_NOT_PARTICIPANT` error when calling [channels.leaveChannel](/method/channels.leaveChannel.md), to refresh info about the channel/supergroup (i.e. the fact that we received this error means that the client tried to leave a channel/supergroup they're not a member of, and the client didn't try to prevent this locally because its [channel](/constructor/channel.md) constructor is out of date).  
* After invoking the following methods (both if the call succeeds and after receiving a `USERNAME_NOT_MODIFIED` error, which is also a success):
  * [account.toggleUsername](/method/account.toggleUsername.md), [account.reorderUsernames](/method/account.reorderUsernames.md) - For ourselves
  * [bots.toggleUsername](/method/bots.toggleUsername.md), [bots.reorderUsernames](/method/bots.reorderUsernames.md) - For the bot whose username we updated
  * [channels.toggleUsername](/method/channels.toggleUsername.md), [channels.reorderUsernames](/method/channels.reorderUsernames.md) - For the channel whose username we updated

  Info should **only** be manually refreshed with a call to [users.getUsers](/method/users.getUsers.md), [channels.getChannels](/method/channels.getChannels.md) if the new username order/active username cannot be applied locally (i.e. the method call successfully set as active some username that isn't associated to the peer in our local cache, and so on), otherwise the `username` and `usernames` fields of the peer info database should be updated locally, using the info that was passed to the toggle/reorder methods by the user.  
* After invoking the following methods, if the user for whom we set the profile photo is **not** returned in [photos.photo](/constructor/photos.photo.md).`users`:
  * [photos.updateProfilePhoto](/method/photos.updateProfilePhoto.md)
  * [photos.uploadProfilePhoto](/method/photos.uploadProfilePhoto.md)
  * [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md) - Only if `suggest` is not set
* After invoking [photos.deletePhotos](/method/photos.deletePhotos.md), if the local cache doesn't have any more photos left for the current user after removing the ones passed to the method.  
* After failing to download a peer photo.
* [contacts.getStatuses](/method/contacts.getStatuses.md) should be invoked by clients every `70000-100000` seconds to update the [user](/constructor/user.md).`status` field of contacts.  
  The exact contact status polling interval should be randomly chosen between `70000` and `100000`, and re-chosen every time [contacts.getStatuses](/method/contacts.getStatuses.md) is invoked.  
  If a [contacts.getStatuses](/method/contacts.getStatuses.md) query fails, repeat the method call after `5` to `10` seconds.

#### Peer ID
The peer `id` is a unique 64-bit ID used to identify a specific user, chat or channel.  

This field should be used as primary key in the channel, chat and user databases.  

Note that the ID sequences of users, chats and channels **overlap**, so you must either:
* Use separate tables/hashmaps for [user](/constructor/user.md)s, [chat](/constructor/chat.md)s and [channel](/constructor/channel.md)s OR
* Transform the peer IDs to bot API IDs as specified [here&nbsp;&raquo;](/api/bots/ids.md), which will allow you to use a single ID sequence (and database) for all three peer types, maintaining uniqueness.  
    In this case, a single table *can* be used for all peer types, but since the structures of the constructors are different, to avoid useless typechecks it might be a good idea to use three tables, as with the first approach.  

Click on the following links to view the available MTProto ID ranges for the various chat types, and info on how to convert them to single bot API range:

* [Users &raquo;](/api/bots/ids.md#user-ids)
* [Chats &raquo;](/api/bots/ids.md#chat-ids)
* [Supergroups/channels &raquo;](/api/bots/ids.md#supergroup-channel-ids)
* [Monoforums &raquo;](/api/bots/ids.md#monoforum-ids)

It's a good idea to transform peer IDs to [bot API IDs](/api/bots/ids.md) even if you do decide to use separate databases, as it will make IDs more visually recognizable both for you and your users, as well as guarantee compatibility with the bot API.

#### Access hash 

The `access_hash` is the second most important field stored in the [peer database](#peer-info-database), used to generate [InputPeer](/type/InputPeer.md), [inputUser](/type/InputUser.md), [inputChannel](/type/InputChannel.md) constructors used to interact with peers in the API.  
Note that [chat](/constructor/chat.md)s ([basic groups&nbsp;&raquo;](/api/channel.md)) do not have or need an access hash.  
[user](/constructor/user.md)s and [channel](/constructor/channel.md)s ([supergroups and channels&nbsp;&raquo;](/api/channel.md)) have an access hash, and it can come in various flavors:

* Full access hash: can be used everywhere in the API.
* Min access hash: received from [min constructors&nbsp;&raquo;](/api/min.md), can only be used to fetch profile pictures using [`inputPeerPhotoFileLocation`&nbsp;&raquo;](/constructor/inputPeerPhotoFileLocation.md).  
* From-message access hash: not a real access hash, constructed as specified [here&nbsp;&raquo;](/api/min.md), must be used when only a min access hash is available locally, but a full access hash is required. 
* Zero access hash: equal to `0`, must be used by bots when only a min access hash (or no access hash) is available locally, but a full access hash is required. 

The access hash versions listed above are listed in descending priority, and if a version with higher priority is currently cached, it must not be overwritten with a lower priority version.   

Access hashes are received when interacting with the API (i.e. in common chats, through the search function, [username resolution](/api/invites.md#public-usernames), [temporary profile links](/api/links.md#temporary-profile-links), and so on...): if you have only a user/channel/supergroup ID without any kind of access hash, you **cannot** interact with that peer.  
Access hashes may not be reused across different accounts or different login/auth sessions of the same account: however, they can be reused across different MTProto sessions linked to the same login/auth session.  
This is a core spam prevention feature of Telegram.  

Clients and client APIs should avoid exposing access hashes to users, as they cannot be reused outside of the current auth/login session, and the user should not be burdened with storing them, when the client can perfectly do the job by itself.  

Note: some other, non-peer-related constructors (i.e. not [user](/constructor/user.md), [chat](/constructor/chat.md) or [channel](/constructor/channel.md)) may also contain access hashes, which should be stored in a different database.  

#### Other info

Various other fields commonly used by the client, as specified in the constructor pages ([user](/constructor/user.md), [chat](/constructor/chat.md) and [channel](/constructor/channel.md)).  
As specified in the constructor docs, some of the fields must not be overwritten if a [min constructor](/api/min.md) is received, and a change in some other fields must trigger invalidation of the [full info database&nbsp;&raquo;](#full-info-database).  

### Full info database

    users.userFull#3b6d152e full_user:UserFull chats:Vector<Chat> users:Vector<User> = users.UserFull;
    messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;

    userFull#6cbe645 flags:# blocked:flags.0?true phone_calls_available:flags.4?true phone_calls_private:flags.5?true can_pin_message:flags.7?true has_scheduled:flags.12?true video_calls_available:flags.13?true voice_messages_forbidden:flags.20?true translations_disabled:flags.23?true stories_pinned_available:flags.26?true blocked_my_stories_from:flags.27?true wallpaper_overridden:flags.28?true contact_require_premium:flags.29?true read_dates_private:flags.30?true flags2:# sponsored_enabled:flags2.7?true can_view_revenue:flags2.9?true bot_can_manage_emoji_status:flags2.10?true display_gifts_button:flags2.16?true noforwards_my_enabled:flags2.23?true noforwards_peer_enabled:flags2.24?true unofficial_security_risk:flags2.26?true id:long about:flags.1?string settings:PeerSettings personal_photo:flags.21?Photo profile_photo:flags.2?Photo fallback_photo:flags.22?Photo notify_settings:PeerNotifySettings bot_info:flags.3?BotInfo pinned_msg_id:flags.6?int common_chats_count:int folder_id:flags.11?int ttl_period:flags.14?int theme:flags.15?ChatTheme private_forward_name:flags.16?string bot_group_admin_rights:flags.17?ChatAdminRights bot_broadcast_admin_rights:flags.18?ChatAdminRights wallpaper:flags.24?WallPaper stories:flags.25?PeerStories business_work_hours:flags2.0?BusinessWorkHours business_location:flags2.1?BusinessLocation business_greeting_message:flags2.2?BusinessGreetingMessage business_away_message:flags2.3?BusinessAwayMessage business_intro:flags2.4?BusinessIntro birthday:flags2.5?Birthday personal_channel_id:flags2.6?long personal_channel_message:flags2.6?int stargifts_count:flags2.8?int starref_program:flags2.11?StarRefProgram bot_verification:flags2.12?BotVerification send_paid_messages_stars:flags2.14?long disallowed_gifts:flags2.15?DisallowedGiftsSettings stars_rating:flags2.17?StarsRating stars_my_pending_rating:flags2.18?StarsRating stars_my_pending_rating_date:flags2.18?int main_tab:flags2.20?ProfileTab saved_music:flags2.21?Document note:flags2.22?TextWithEntities bot_manager_id:flags2.25?long = UserFull;
    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;
    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---

    users.getFullUser#b60f5918 id:InputUser = users.UserFull;
    messages.getFullChat#aeb00b34 chat_id:long = messages.ChatFull;
    channels.getFullChannel#8736a09 channel:InputChannel = messages.ChatFull;

Example implementation: [tdlib](https://github.com/tdlib/td/).

The full info database contains info from the [userFull](/constructor/userFull.md), [chatFull](/constructor/chatFull.md) and [channelFull](/constructor/channelFull.md) constructors.  

To populate the full info database for a peer, invoke [users.getFullUser](/method/users.getFullUser.md), [messages.getFullChat](/method/messages.getFullChat.md), [channels.getFullChannel](/method/channels.getFullChannel.md), all requiring the previously cached [access_hash&nbsp;&raquo;](#access-hash).  

Invalidate only [userFull](/constructor/userFull.md) and [channelFull](/constructor/channelFull.md) entries 60 seconds after they are stored.

Refresh the full info database when the client needs some data from a full constructor, **and** there is no entry already in the database, or the required entry was invalidated by the TTL, or if:

* Some event (specified [here&nbsp;&raquo;](#peer-info-database)) changes the value of a very specific subset of fields of an entry in the (non-full!) [peer info database&nbsp;&raquo;](#peer-info-database).   
  See the documentation in the [user](/constructor/user.md) and [channel](/constructor/channel.md) constructor pages for more info (search for the keyword "invalidate").  
* When receiving an [updateUser](/constructor/updateUser.md), [updateChat](/constructor/updateChat.md), [updateChannel](/constructor/updateChannel.md), and some other updates, as specified [here&nbsp;&raquo;](/type/Update.md)
* After invoking [bots.setBotInfo](/method/bots.setBotInfo.md) (even on error) after changing `about` or `description` (but **not** `name`), for the bot whose info we changed.
* After invoking [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) to *remove* the wallpaper and receiving an error, for the peer whose wallpapers we tried to change, to fetch the correct and updated wallpaper settings.  
* After invoking [messages.setChatAvailableReactions](/method/messages.setChatAvailableReactions.md) and getting an error different from `CHAT_NOT_MODIFIED`, for the peer whose reaction settings we tried to change.  
* After receiving a `SEND_AS_PEER_INVALID` error from any method that interacts with a group/supergroup: refresh info about the destination, to see which channel peers can be used to send messages to the group/supergroup through send_as.
* If [chat](/constructor/chat.md).`photo` is not equal to [chatFull](/constructor/chatFull.md).`chat_photo`
* The [channelFull](/constructor/channelFull.md).`linked_chat_id` of channel/supergroup A is updated to point to channel/supergroup B, but the [channelFull](/constructor/channelFull.md).`linked_chat_id` of channel/supergroup B does not point to channel/supergroup A, refresh the [channelFull](/constructor/channelFull.md) of channel/supergroup B.
* Info about a bot that is a participant to the channel/supergroup is fetched by other means, but the bot is not contained in [channelFull](/constructor/channelFull.md).`bot_info`.  
* If [channelFull](/constructor/channelFull.md).`participants_count` is less than [channelFull](/constructor/channelFull.md).`admins_count` after a local update of the admin list by other means.
* If the currently logged in user's [inputPrivacyKeyStatusTimestamp](/constructor/inputPrivacyKeyStatusTimestamp.md) [privacy setting&nbsp;&raquo;](/api/privacy.md) was changed, refresh the entire [userFull](/constructor/userFull.md) cache for all users.  
* After receiving an error different from `USER_NOT_PARTICIPANT` when calling [channels.leaveChannel](/method/channels.leaveChannel.md)
* If the profile picture is updated or removed
* After successfully invoking any of the following methods, for the bot in question:
  * [bots.deletePreviewMedia](/method/bots.deletePreviewMedia.md)
* After invoking any of the following methods (successfully or not):
  * [bots.setBotGroupDefaultAdminRights](/method/bots.setBotGroupDefaultAdminRights.md) - For the bot
  * [bots.setBotBroadcastDefaultAdminRights](/method/bots.setBotBroadcastDefaultAdminRights.md) - For the bot
  * [channels.inviteToChannel](/method/channels.inviteToChannel.md) - For the channel/supergroup
  * [channels.editAdmin](/method/channels.editAdmin.md) - For the channel/supergroup
  * [messages.editChatCreator](/method/messages.editChatCreator.md) - For the channel/supergroup/group
* When receiving a `CHANNEL_PRIVATE` or `CHANNEL_PUBLIC_GROUP_NA` RPC error.
* When a channel is made private/public (where previously it was public/private. public=has at least one username, private=has no usernames).  
* If we banned a chat/supergroup participant specifying a [chatBannedRights](/constructor/chatBannedRights.md).`until_date`, the full cache of the chat/supergroup should be refreshed for the admin at `until_date`.  

The above list is non-exhaustive, and clients may choose to refresh peer information in some other conditions as well (i.e. when opening the profile page, etc).  

# Invite links


[Chats and channels](/api/channel.md) may have a public username or a private invite link: private invite links may be further enhanced with per-user [join requests](https://telegram.org/blog/shared-media-scrolling-calendar-join-requests-and-more#join-requests-for-groups-and-channels).

### Public usernames

    contacts.resolvedPeer#7f077ad9 peer:Peer chats:Vector<Chat> users:Vector<User> = contacts.ResolvedPeer;

    ---functions---

    contacts.resolveUsername#725afbbc flags:# username:string referer:flags.0?string = contacts.ResolvedPeer;
    channels.joinChannel#24b524c5 channel:InputChannel = Updates;

    channels.checkUsername#10e6bd2c channel:InputChannel username:string = Bool;
    channels.updateUsername#3514b3de channel:InputChannel username:string = Bool;

Only [supergroups and channels](/api/channel.md) may have a public usernames: [normal groups](/api/channel.md) must be migrated to a [supergroup](/api/channel.md) before they can be assigned a username, see the [migration docs&nbsp;&raquo;](/api/channel.md#migration) for more info.  

[channels.updateUsername](/method/channels.updateUsername.md) can be used to directly assign or change the public username of a supergroup or channel.  
You can use [channels.checkUsername](/method/channels.updateUsername.md) before assigning the username to make sure that the specified username is valid and available.  

[channels.joinChannel](/method/channels.joinChannel.md) can be used to join a supergroup or channel using peer information obtained using [contacts.resolveUsername](/method/contacts.resolveUsername.md).

### Invite links

    chatInviteExported#a22cbd96 flags:# revoked:flags.0?true permanent:flags.5?true request_needed:flags.6?true link:string admin_id:long date:int start_date:flags.4?int expire_date:flags.1?int usage_limit:flags.2?int usage:flags.3?int requested:flags.7?int subscription_expired:flags.10?int title:flags.8?string subscription_pricing:flags.9?StarsSubscriptionPricing = ExportedChatInvite;

    messages.exportedChatInvites#bdc62dcc count:int invites:Vector<ExportedChatInvite> users:Vector<User> = messages.ExportedChatInvites;

    messages.exportedChatInvite#1871be50 invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;
    messages.exportedChatInviteReplaced#222600ef invite:ExportedChatInvite new_invite:ExportedChatInvite users:Vector<User> = messages.ExportedChatInvite;

    chatInviteImporter#8c5adfd9 flags:# requested:flags.0?true via_chatlist:flags.3?true user_id:long date:int about:flags.2?string approved_by:flags.1?long = ChatInviteImporter;

    messages.chatInviteImporters#81b6b00a count:int importers:Vector<ChatInviteImporter> users:Vector<User> = messages.ChatInviteImporters;

    chatAdminWithInvites#f2ecef23 admin_id:long invites_count:int revoked_invites_count:int = ChatAdminWithInvites;

    messages.chatAdminsWithInvites#b69b72d7 admins:Vector<ChatAdminWithInvites> users:Vector<User> = messages.ChatAdminsWithInvites;

    chatInviteAlready#5a686d7c chat:Chat = ChatInvite;
    chatInvite#5c9d3702 flags:# channel:flags.0?true broadcast:flags.1?true public:flags.2?true megagroup:flags.3?true request_needed:flags.6?true verified:flags.7?true scam:flags.8?true fake:flags.9?true can_refulfill_subscription:flags.11?true title:string about:flags.5?string photo:Photo participants_count:int participants:flags.4?Vector<User> color:int subscription_pricing:flags.10?StarsSubscriptionPricing subscription_form_id:flags.12?long bot_verification:flags.13?BotVerification = ChatInvite;
    chatInvitePeek#61695cb0 chat:Chat expires:int = ChatInvite;

    ---functions---

    messages.exportChatInvite#a455de90 flags:# legacy_revoke_permanent:flags.2?true request_needed:flags.3?true peer:InputPeer expire_date:flags.0?int usage_limit:flags.1?int title:flags.4?string subscription_pricing:flags.5?StarsSubscriptionPricing = ExportedChatInvite;

    messages.getExportedChatInvites#a2b5a3f6 flags:# revoked:flags.3?true peer:InputPeer admin_id:InputUser offset_date:flags.2?int offset_link:flags.2?string limit:int = messages.ExportedChatInvites;
    messages.getExportedChatInvite#73746f5c peer:InputPeer link:string = messages.ExportedChatInvite;

    messages.editExportedChatInvite#bdca2f75 flags:# revoked:flags.2?true peer:InputPeer link:string expire_date:flags.0?int usage_limit:flags.1?int request_needed:flags.3?Bool title:flags.4?string = messages.ExportedChatInvite;

    messages.deleteRevokedExportedChatInvites#56987bd5 peer:InputPeer admin_id:InputUser = Bool;
    messages.deleteExportedChatInvite#d464a42b peer:InputPeer link:string = Bool;

    messages.getAdminsWithInvites#3920e6ef peer:InputPeer = messages.ChatAdminsWithInvites;
    messages.getChatInviteImporters#df04dd4e flags:# requested:flags.0?true subscription_expired:flags.3?true peer:InputPeer link:flags.1?string q:flags.2?string offset_date:int offset_user:InputUser limit:int = messages.ChatInviteImporters;

    messages.checkChatInvite#3eadb1bb hash:string = ChatInvite;
    messages.importChatInvite#6c50051c hash:string = Updates;

Private invite links can optionally have an expiration date, a usage limit, and can even be set to only allow users into the channel, supergroup or group upon explicit approval of an admin: see [join requests&nbsp;&raquo;](#join-requests) for more info.

Invite links match the following regex: `@(?:t|telegram)\.(?:me|dog)/(joinchat/|\+)?([\w-]+)@i`.  
The first matching group can be passed to the `hash` parameter of [messages.checkChatInvite](/method/messages.checkChatInvite.md) to get info about the chat, and [messages.importChatInvite](/method/messages.importChatInvite.md) to join the chat.  
[messages.checkChatInvite](/method/messages.checkChatInvite.md) may return [chatInvitePeek](/constructor/chatInvitePeek.md) only for [supergroups and channels](/api/channel.md), in which case the user may directly fetch chat messages using [updates](/api/updates.md), [messages.getHistory](/method/messages.getHistory.md) and [channels.getMessages](/method/channels.getMessages.md) until the time indicated by the `expires` unixtime field.

Newly created groups, supergroups and channel already have a default invite link.  
To generate a new one, use [messages.exportChatInvite](/method/messages.exportChatInvite.md).  
To get info about existing chat invites, optionally filtering only links created by a given admin, use [messages.getExportedChatInvites](/method/messages.getExportedChatInvites.md).  
[messages.getExportedChatInvite](/method/messages.getExportedChatInvite.md) can be used to obtain info about a specific invite link.  

[messages.editExportedChatInvite](/method/messages.editExportedChatInvite.md) is used to edit or revoke existing invite links: revoked links cannot be used by users to join the group, but info about revoked links can still be fetched using [messages.getExportedChatInvites](/method/messages.getExportedChatInvites.md) with the `revoked` flag set.  
Use [messages.deleteExportedChatInvite](/method/messages.deleteExportedChatInvite.md) to permanently remove an invite link, and [messages.deleteRevokedExportedChatInvites](/method/messages.deleteRevokedExportedChatInvites.md) to permanently remove a revoked invite link.  

[messages.getChatInviteImporters](/method/messages.getChatInviteImporters.md) can be used to fetch info about users that joined using a specific invite link.  

Some basic stats about the number of invite links generated by a given admin can be fetched using [messages.getAdminsWithInvites](/method/messages.getAdminsWithInvites.md).  

#### Paid invite links

Channel administrators can now create special [invite links](/api/invites.md#invite-links) that allow joining a channel in exchange for a monthly payment in Telegram Stars.  

Subscribing to a channel using a paid invite link will transfer Telegram Stars to the channel's balance.  

See [here &raquo;](/api/subscriptions.md#channel-subscriptions) for more info on the full flow.

### Join requests

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    chatInvite#5c9d3702 flags:# channel:flags.0?true broadcast:flags.1?true public:flags.2?true megagroup:flags.3?true request_needed:flags.6?true verified:flags.7?true scam:flags.8?true fake:flags.9?true can_refulfill_subscription:flags.11?true title:string about:flags.5?string photo:Photo participants_count:int participants:flags.4?Vector<User> color:int subscription_pricing:flags.10?StarsSubscriptionPricing subscription_form_id:flags.12?long bot_verification:flags.13?BotVerification = ChatInvite;

    updatePendingJoinRequests#7063c3db peer:Peer requests_pending:int recent_requesters:Vector<long> = Update;
    updateBotChatInviteRequester#11dfa986 peer:Peer date:int user_id:long about:string invite:ExportedChatInvite qts:int = Update;

    messages.chatInviteImporters#81b6b00a count:int importers:Vector<ChatInviteImporter> users:Vector<User> = messages.ChatInviteImporters;
    
    peerSettings#f47741f7 flags:# report_spam:flags.0?true add_contact:flags.1?true block_contact:flags.2?true share_contact:flags.3?true need_contacts_exception:flags.4?true report_geo:flags.5?true autoarchived:flags.7?true invite_members:flags.8?true request_chat_broadcast:flags.10?true business_bot_paused:flags.11?true business_bot_can_reply:flags.12?true geo_distance:flags.6?int request_chat_title:flags.9?string request_chat_date:flags.9?int business_bot_id:flags.13?long business_bot_manage_url:flags.13?string charge_paid_message_stars:flags.14?long registration_month:flags.15?string phone_country:flags.16?string name_change_date:flags.17?int photo_change_date:flags.18?int = PeerSettings;
    
    messageActionChatJoinedByRequest#ebbca3cb = MessageAction;

    channelAdminLogEventActionParticipantJoinByRequest#afb6144a invite:ExportedChatInvite approved_by:long = ChannelAdminLogEventAction;

    ---functions---

    messages.checkChatInvite#3eadb1bb hash:string = ChatInvite;
    messages.importChatInvite#6c50051c hash:string = Updates;

    messages.getChatInviteImporters#df04dd4e flags:# requested:flags.0?true subscription_expired:flags.3?true peer:InputPeer link:flags.1?string q:flags.2?string offset_date:int offset_user:InputUser limit:int = messages.ChatInviteImporters;

    messages.hideChatJoinRequest#7fe7e815 flags:# approved:flags.0?true peer:InputPeer user_id:InputUser = Updates;
    messages.hideAllChatJoinRequests#e085f4ea flags:# approved:flags.0?true peer:InputPeer link:flags.1?string = Updates;

    channels.toggleJoinRequest#4c2985b6 channel:InputChannel enabled:Bool = Updates;

If the `request_needed` flag is set when [generating or editing an invite link](#invite-links), or if the appropriate option is toggled using [channels.toggleJoinRequest](/method/channels.toggleJoinRequest.md), users importing the invite link using [messages.importChatInvite](/method/messages.importChatInvite.md) will receive an `INVITE_REQUEST_SENT` RPC error, indicating that a join request was successfully sent to the chat admins.  

Related supergroup information will also have the [`channel.join_request`](/constructor/channel.md) flag set accordingly.  

Bot administrators will receive an [updateBotChatInviteRequester](/constructor/updateBotChatInviteRequester.md) update for each separate join request.  
User administrators will receive an [updatePendingJoinRequests](/constructor/updatePendingJoinRequests.md), and should invoke [messages.getChatInviteImporters](/method/messages.getChatInviteImporters.md) with the `requested` flag set to obtain a list of users waiting to be admitted into the group.  

Administrators can then use [messages.hideChatJoinRequest](/method/messages.hideChatJoinRequest.md) to approve or dismiss a join request, and [messages.hideAllChatJoinRequests](/method/messages.hideAllChatJoinRequests.md) to approve or dismiss in bulk multiple join requests.  

Administrators can also choose to send a message to the user before admitting them into the group: in this case, graphical clients _on the user side_ should display a message on the dialog bar of the chat with the admin, indicating that the chat was initiated by the admin of a chat/channel they have recently requested to join, see the [action bar documentation&nbsp;&raquo;](/api/action-bar.md#an-admin-from-a-recent-join-request-is-contacting-you) for more info.  

### Direct invites

    missingInvitee#628c9224 flags:# premium_would_allow_invite:flags.0?true premium_required_for_pm:flags.1?true user_id:long = MissingInvitee;

    messages.invitedUsers#7f5defa6 updates:Updates missing_invitees:Vector<MissingInvitee> = messages.InvitedUsers;

    ---functions---
    
    messages.addChatUser#cbc6d107 chat_id:long user_id:InputUser fwd_limit:int = messages.InvitedUsers;
    messages.createChat#92ceddd4 flags:# users:Vector<InputUser> title:string ttl_period:flags.0?int = messages.InvitedUsers;

    channels.inviteToChannel#c9e33d54 channel:InputChannel users:Vector<InputUser> = messages.InvitedUsers;

Users may also be directly invited to groups and channels during their creation ([basic groups](/api/channel.md) via [messages.createChat](/method/messages.createChat.md)) or afterwards ([basic groups](/api/channel.md) via [messages.addChatUser](/method/messages.addChatUser.md), [supergroups and channels](/api/channel.md) via [channels.inviteToChannel](/method/channels.inviteToChannel.md)).  

The methods will return a [messages.invitedUsers](/constructor/messages.invitedUsers.md) constructor, containing a list of [updates](/api/updates.md) about successfully invited users (and eventually info about the created group), and a list of [missingInvitee](/constructor/missingInvitee.md), with a list of users that could not be invited for some reason.  

Specifically:
- If none of the [missingInvitee](/constructor/missingInvitee.md) flags are set, we could not add the user because of their privacy settings, and we can create and directly share an [invite link](#invite-links) with them using a normal message, instead.  
- If the [missingInvitee](/constructor/missingInvitee.md).`premium_would_allow_invite` flag is set, we could not add the user *only because* the current account needs to purchase a [Telegram Premium](/api/premium.md) subscription to complete the operation.  
- If the [missingInvitee](/constructor/missingInvitee.md).`premium_required_for_pm` flag is set, we could not add the user because of their privacy settings, and additionally, the current account needs to purchase a [Telegram Premium](/api/premium.md) subscription to directly share an invite link with the user via a private message.  

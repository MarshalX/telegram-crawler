# Channels, supergroups, gigagroups and basic groups


### Channels

[Channels](https://telegram.org/tour/channels) are a tool for broadcasting your messages to large audiences. They can have an unlimited number of subscribers, they can be public with a permanent URL and each post in a channel has its own view counter.  
Technically, they are represented by [channel](/constructor/channel.md) constructors.  

Channels can be created using the [channels.createChannel](/method/channels.createChannel.md) method, by setting the `broadcast` flag.  

Messages posted on channels can be:

- Anonymous (default)
- Have a non-hyperlinked text signature: to toggle this feature, invoke [channels.toggleSignatures](/method/channels.toggleSignatures.md) with `signatures_enabled` set.
- Look exactly like group messages, with full information about the sender (and the same UI used for messages in groups): to toggle this feature, invoke [channels.toggleSignatures](/method/channels.toggleSignatures.md) with `signatures_enabled` and `profiles_enabled` set.  
  Enabling this mode will allow admins to post messages to the channel as any of the profiles they control (including other channels, and the channel itself for anonymous messages like the default mode) with the `send_as` flag of [messages.sendMessage](/method/messages.sendMessage.md) and other message sending methods, see [here &raquo;](#sending-messages-on-behalf-of-owned-channels-and-groups) for more info.  

### Supergroups

[Supergroups](https://telegram.org/tour/groups) are a powerful tool for building communities and can support up to 200,000 members each.  
Technically, supergroups are actually channels: they are represented by [channel](/constructor/channel.md) constructors, with the `megagroup` flag set to true.  

Supergroups can be created using the [channels.createChannel](/method/channels.createChannel.md) method, by setting the `megagroup` flag.  
Supergroups can also be assigned a `geo_point` to become [geochats&nbsp;&raquo;](/api/nearby.md).  

When posting messages to channels and supergroups using [messages.sendMessage](/method/messages.sendMessage.md) and other message sending methods, we can choose to send the message as the currently logged in user account (default), or as a channel we own, or as the current group (for [anonymous group admins &raquo;](/api/rights.md#anonymous-admins)), by populating the `send_as` flag of [messages.sendMessage](/method/messages.sendMessage.md) et al, see [here &raquo;](#sending-messages-on-behalf-of-owned-channels-and-groups) for more info.  

#### Forums

Supergroups can be converted into [forums](/api/forum.md), splitting conversations into distinct [forum topics](/api/forum.md#forum-topics), see the [forum documentation for more info&nbsp;&raquo;](/api/forum.md).  

#### Monoforums

Monoforums are a special kind of [forum &raquo;](#forums), used to implement direct messages to channels, see the [monoforum documentation for more info &raquo;](/api/monoforum.md).

#### Gigagroups

Gigagroups are something between a channel and a supergroup.  
An admin, [when prompted by the API using suggestions&nbsp;&raquo;](/api/config.md#channel-suggestions), can convert a supergroup into a gigagroup using [channels.convertToGigagroup](/method/channels.convertToGigagroup.md) (one way only).  
After that, only admins will be able to write in the group (like when [`send_messages` rights are disabled for all group participants by default](#rights)), but the participant limit is removed and the group can become much bigger than a supergroup (e.g. >200,000 currently).  
Also, one can't invite people into gigagroups and participants of voice chats in gigagroups are muted by default.  

### Basic groups

In previous versions of telegram, only basic groups (represented by [chat](/constructor/chat.md) constructors) could be created using [messages.createChat](/method/messages.createChat.md): these groups have fewer features, and can only have 200 members at max.  
Messages from all basic groups are stored in the [user's message box&nbsp;&raquo;](/api/updates.md#message-related-event-sequences): this means that all basic groups and all private chats share the same, single message ID and [PTS](/api/updates.md) sequence.  

All updates related **only** to basic groups also have an additional `version` integer identifier, which should be used similarly to **pts** values to deduplicate/update outdated participant and chat information as specified [here &raquo;](/api/peers.md#basic-group-updates).  

#### Basic group participants

    chatParticipant#38e79fde flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;
    chatParticipantCreator#e1f867b8 flags:# user_id:long rank:flags.0?string = ChatParticipant;
    chatParticipantAdmin#360d5d2 flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;

    chatParticipantsForbidden#8763d3e1 flags:# chat_id:long self_participant:flags.0?ChatParticipant = ChatParticipants;
    chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;

    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;

Unlike for supergroups, where the participant list is loaded on demand only if the user opens the member list (and even then, it might be hidden by admins), clients are **always** supposed to fetch and [store](/api/peers.md) the full participant list of basic groups, which is readily available in [chatFull](/constructor/chatFull.md), fetchable using [messages.getFullChat](/method/messages.getFullChat.md), because it is the only source of data for information that must be visible in the message UI, such as [member tags &raquo;](#group-member-admin-tags).  

#### Migration

To upgrade a basic group to a supergroup, [messages.migrateChat](/method/messages.migrateChat.md) can be used.  

Clients should automatically migrate basic groups to supergroups if an admin tries to execute an action that is only supported by supergroups.  

The `chats` field of the result will have two objects: 

* A [chat](/constructor/chat.md) constructor with a `migrated_to` field, indicating the address of the new supergroup
* The new [channel](/constructor/channel.md) megagroup constructor

When [getting full info](/method/channels.getFullChannel.md) about the migrated channel, the [channelFull](/constructor/channelFull.md) object will have `migrated_from_chat_id` and `migrated_from_max_id` fields indicating the original ID of the chat, and the message ID in the original chat at which the group was migrated.

All users of the chat will receive an [updateNewMessage](/constructor/updateNewMessage.md) from the old chat with a [messageService](/constructor/messageService.md) containing a [messageActionChatMigrateTo](/constructor/messageActionChatMigrateTo.md) constructor.

All new messages have to be sent to the new supergroup.

When working with migrated groups clients need to handle loading of the message history (as well as search results et cetera) from both the basic group and the new supergroup. This is done by merging the two messages lists (requested with different [Peer](/type/Peer.md) values) client side.

### Sending messages on behalf of owned channels and groups
    
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    sendAsPeer#b81c7034 flags:# premium_required:flags.0?true peer:Peer = SendAsPeer;

    channels.sendAsPeers#f496b0c6 peers:Vector<SendAsPeer> chats:Vector<Chat> users:Vector<User> = channels.SendAsPeers;

    ---functions---

    messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

    channels.getSendAs#e785a43f flags:# for_paid_reactions:flags.0?true for_live_stories:flags.1?true peer:InputPeer = channels.SendAsPeers;

    messages.saveDefaultSendAs#ccfddf96 peer:InputPeer send_as:InputPeer = Bool;

When posting messages to channels and supergroups using [messages.sendMessage](/method/messages.sendMessage.md) and other message sending methods, we can choose to send the message as the currently logged in user account (default), or as a channel we own, or as the current group (for [anonymous group admins &raquo;](/api/rights.md#anonymous-admins)), by populating the `send_as` flag of [messages.sendMessage](/method/messages.sendMessage.md) et al.  

The last two options offer an extra level of anonymization, as the sent [message](/constructor/message.md).`from_id` will point to the specified channel/group, not to our account.  

The list of peers that can be passed to `send_as` can be fetched using [channels.getSendAs](/method/channels.getSendAs.md), populating `peer` with the channel/group where we intend to send the message.  

This method will return a list of [sendAsPeer](/constructor/sendAsPeer.md) constructors for each peer that can be passed to `send_as` only for `peer`, along with an optional `premium_required` flag that will be set if a [Premium](/api/premium.md) subscription is required to pass it to `send_as`.  

Returned peers for supergroups include:

- The currently logged in user (default). Will not be returned if the currently logged in user is an admin with the [anonymous admin right enabled &raquo;](/api/rights.md#anonymous-admins).  
- The current supergroup or other channels we own, if the currently logged in user is an admin in the current supergroup with the [anonymous admin right enabled &raquo;](/api/rights.md#anonymous-admins).  
- Other channels we own, if the currently logged in user is an admin in the current supergroup.

Returned peers for channels include:

- The current channel (default)
- The currently logged in user or other channels we own, if we're an admin in the current channel and both signatures and profiles were enabled with [channels.toggleSignatures](/method/channels.toggleSignatures.md) with the `signatures_enabled` and `profiles_enabled` flags set.

**Only** the peers returned by [channels.getSendAs](/method/channels.getSendAs.md) can be used in `send_as` for the specified `peer`.  

Set the `for_paid_reactions` flag to return a list of peers that can be used to send [paid reactions &raquo;](/api/reactions.md#paid-reactions) with [paidReactionPrivacyPeer](/constructor/paidReactionPrivacyPeer.md).  

[messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md) can be used to change the default value for `send_as`, for a specific channel/supergroup: it will be also applied to reactions, paid reactions and all other interaction types (including for methods that do not explicitly require a `send_as`, such as [messages.sendReaction](/method/messages.sendReaction.md) and [messages.toggleTodoCompleted](/method/messages.toggleTodoCompleted.md)).  

### Leaving groups/channels

    chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    userEmpty#d3bc4b7a id:long = User;
    user#31774388 flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true apply_min_photo:flags.25?true fake:flags.26?true bot_attach_menu:flags.27?true premium:flags.28?true attach_menu_enabled:flags.29?true flags2:# bot_can_edit:flags2.1?true close_friend:flags2.2?true stories_hidden:flags2.3?true stories_unavailable:flags2.4?true contact_require_premium:flags2.10?true bot_business:flags2.11?true bot_has_main_app:flags2.13?true bot_forum_view:flags2.16?true bot_forum_can_manage_topics:flags2.17?true bot_can_manage_bots:flags2.18?true bot_guestchat:flags2.19?true id:long access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string emoji_status:flags.30?EmojiStatus usernames:flags2.0?Vector<Username> stories_max_id:flags2.5?RecentStory color:flags2.8?PeerColor profile_color:flags2.9?PeerColor bot_active_users:flags2.12?int bot_verification_icon:flags2.14?long send_paid_messages_stars:flags2.15?long = User;

    messageActionNewCreatorPending#b07ed085 new_creator_id:long = MessageAction;
    messageActionChangeCreator#e188503b new_creator_id:long = MessageAction;

    ---functions---
    
    channels.leaveChannel#f836aa95 channel:InputChannel = Updates;
    messages.deleteChatUser#a2185cab flags:# revoke_history:flags.0?true chat_id:long user_id:InputUser = Updates;

    messages.getFutureChatCreatorAfterLeave#3b7d0ea6 peer:InputPeer = User;

To leave a supergroup/channel, invoke [channels.leaveChannel](/method/channels.leaveChannel.md).  

To leave a basic group, invoke [messages.deleteChatUser](/method/messages.deleteChatUser.md), passing the ID of the group to `chat_id`, and [inputUserSelf](/constructor/inputUserSelf.md) to `user_id`.  

However, if the [chat](/constructor/chat.md).`creator`/[channel](/constructor/channel.md).`creator` flag is set, **before** leaving the chat, the client must invoke [messages.getFutureChatCreatorAfterLeave](/method/messages.getFutureChatCreatorAfterLeave.md).  

If the method returns an RPC error, the client can silently proceed with leaving the group.  

Otherwise, a popup should be shown to the user, notifying them that the returned [user](/constructor/user.md) will become the new owner of the group/channel after 7 days (for channels/supergroups) or immediately (for basic groups), offering three buttons:

- "Appoint another admin": when pressed, switch to the standard [ownership transfer flow, selecting a custom admin to appoint as owner &raquo;](#transferring-ownership-of-a-group-channel); on success, leave the channel.
- "Cancel"
- "Leave the group": when pressed, invoke [channels.leaveChannel](/method/channels.leaveChannel.md)/[messages.deleteChatUser](/method/messages.deleteChatUser.md) as described above: this will transfer ownership to the returned user as specified above.  

  Additionally, when leaving a supergroup, the following messages will be emitted:
  
  - A [messageActionNewCreatorPending](/constructor/messageActionNewCreatorPending.md) will be emitted to the supergroup on behalf of the old owner that left the group (i.e. the [messageService](/constructor/messageService.md).`from_id` will be equal to the ID of the old owner), with the ID of the new pending owner specified in `new_creator_id`
  - An [updateNewMessage](/constructor/updateNewMessage.md) will be received by the old owner, from the private chat with the service notifications user (ID `777000`), notifying them that they left the group and the specified admin will become the new owner in 7 days if they don't rejoin (the group can be rejoined by clicking the deep link contained in the [button](/constructor/keyboardButtonUrl.md) attached to the message)
  - After 7 days, if the old admin doesn't rejoin the supergroup, ownership will be transferred to the new admin, and a [messageActionChangeCreator](/constructor/messageActionChangeCreator.md) will be emitted to the supergroup on behalf of the old owner that left the group (i.e. the [messageService](/constructor/messageService.md).`from_id` will be equal to the ID of the old owner), with the ID of the new owner specified in `new_creator_id`

### Transferring ownership of a group/channel

    ---functions---

    messages.editChatCreator#f743b857 peer:InputPeer user_id:InputUser password:InputCheckPasswordSRP = Updates;

Ownership of a basic group, supergroup or channel may be transferred by using [messages.editChatCreator](/method/messages.editChatCreator.md): this method requires a valid [2FA password](/api/srp.md) to be configured on the account, which must be passed to the `password` parameter of the method as specified in the [2FA documentation](/api/srp.md).  

The ID of the basic group/supergroup/channel must be passed to `peer`, and the ID of the new owner must be passed to `user_id`.  

### Group member/admin tags

Members in group chats (both basic groups and supergroups) can now add a **tag** next to their name — to show their role at work, what they study in school, and more, see [here &raquo;](/api/rank.md) for more info.  

### Invite links and join requests

Channels, basic groups and supergroups may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.

For more info on how to work with public usernames, invite links and join requests, see [here&nbsp;&raquo;](/api/invites.md).

### Rights

Channels, basic groups and supergroups allow setting [granular permissions](https://telegram.org/blog/permissions-groups-undo) both for admins and specific users; channels, supergroups and basic groups also allow setting global granular permissions for users.

For more info on how to set and modify rights, see [here&nbsp;&raquo;](/api/rights.md).

### Pinned messages

Telegram allows pinning multiple messages on top in a chat, group, supergroup or channel.  

See [here&nbsp;&raquo;](/api/pin.md) for more info on pinning and unpinning messages.  

### Discussion

Groups can be associated to a channel as a [discussion group](https://telegram.org/blog/privacy-discussions-web-bots), to allow users to discuss about posts.  

For more info on how to set a discussion group in channel, see [here&nbsp;&raquo;](/api/discussion.md)

### Recent actions

Both supergroups and channels offer a so-called [admin log](https://telegram.org/blog/admin-revolution), a log of recent relevant supergroup and channel actions, like the modification of group/channel settings or information on behalf of an admin, user kicks and bans, and more.

See [here&nbsp;&raquo;](/api/recent-actions.md) for more info.

### Global search

The [search view&nbsp;&raquo;](/api/search.md#global-search) has a separate Channel tab for channel-related global searches, see [here&nbsp;&raquo;](/api/search.md#global-search) for more info.

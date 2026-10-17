# Group calls


Telegram supports group calls.  

This page describes the API methods used to work with group calls.  

### Group call types

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;
    groupCallDiscarded#7780bcb4 id:long access_hash:long duration:int = GroupCall;

All group calls are represented by the [groupCall](/constructor/groupCall.md) constructor, or by a [groupCallDiscarded](/constructor/groupCallDiscarded.md) constructor after it ends.  

Group calls can be classified in the following categories:

* [Video chats/livestreams](#video-chats-livestreams)
* [Live stories](#live-stories)
* [Conferences](#conference-calls)

Video chats/livestreams and live stories may also play back media using [stream mode &raquo;](#stream-mode), where the client downloads media chunks instead of using a live WebRTC connection. This happens either automatically, when the server switches large audiences off WebRTC to scale, or when the call uses [RTMP mode &raquo;](#creating-and-publishing-an-rtmp-livestream), where a single external application publishes all the call's media over RTMP.  

#### Video chats/livestreams

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    inputGroupCall#d8aa840f id:long access_hash:long = InputGroupCall;

    messageActionGroupCall#7a0d7f42 flags:# call:InputGroupCall duration:flags.0?int = MessageAction;
    messageActionGroupCallScheduled#b3a07661 call:InputGroupCall schedule_date:int = MessageAction;

    updateGroupCall#9d2216e0 flags:# live_story:flags.2?true peer:flags.1?Peer call:GroupCall = Update;
    updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;

    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---
    
    phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
    phone.editGroupCallTitle#1ca6ac0a call:InputGroupCall title:string = Updates;
    phone.toggleGroupCallRecord#f128c708 flags:# start:flags.0?true video:flags.2?true call:InputGroupCall title:flags.1?string video_portrait:flags.2?Bool = Updates;

    phone.inviteToGroupCall#7b393160 call:InputGroupCall users:Vector<InputUser> = Updates;
    phone.exportGroupCallInvite#e6aa647f flags:# can_self_unmute:flags.0?true call:InputGroupCall = phone.ExportedGroupCallInvite;

    phone.toggleGroupCallStartSubscription#219c34e6 call:InputGroupCall subscribed:Bool = Updates;

    phone.startScheduledGroupCall#5680e342 call:InputGroupCall = Updates;
    
    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;

A video chat/livestream is a group call associated with a specific [basic group &raquo;](/api/channel.md#basic-groups), [supergroup &raquo;](/api/channel.md#supergroups) or [channel &raquo;](/api/channel.md#channels), created using [phone.createGroupCall](/method/phone.createGroupCall.md) by admins with the [manage_call admin right &raquo;](/constructor/chatAdminRights.md).  

A group call is called a video chat when it's associated with a basic group or supergroup.  
A group call is called a livestream when it's associated with a channel.  

A basic group/supergroup/channel can have only one associated video chat/livestream: starting a new one will terminate the previous one.  

Video chats/livestreams may use normal WebRTC publishing and playback, or [RTMP mode](#creating-and-publishing-an-rtmp-livestream), and large audiences may be switched to [stream mode &raquo;](#stream-mode) for playback.  

Only video chats/livestreams have editable titles (located in [groupCall](/constructor/groupCall.md).`title`): admins can use [phone.editGroupCallTitle](/method/phone.editGroupCallTitle.md) to change the title.

Video chats/livestreams also support server-side recording. Admins can use [phone.toggleGroupCallRecord](/method/phone.toggleGroupCallRecord.md) to start or stop recording. When the recording stops, it will be sent to the admin's Saved Messages; the `video` and `video_portrait` fields select whether to also record video, and its orientation.

Video chats/livestreams may also enable [in-call messages and reactions &raquo;](#in-call-messages), including when using RTMP livestream mode.

To interact with a video chat/livestream, use the [inputGroupCall](/constructor/inputGroupCall.md) constructor which will always be present in the basic group/supergroup/channel's [chatFull](/constructor/chatFull.md)/[channelFull](/constructor/channelFull.md), if a video chat/livestream is currently active or scheduled.  

The same [inputGroupCall](/constructor/inputGroupCall.md) will also be present in [messageActionGroupCallScheduled](/constructor/messageActionGroupCallScheduled.md), [messageActionGroupCall](/constructor/messageActionGroupCall.md) service messages sent to the group/channel when a video chat/livestream is scheduled, started or ended.  

For video chats/livestreams associated with public groups or channels, any member or subscriber may use [phone.exportGroupCallInvite](/method/phone.exportGroupCallInvite.md) to export a [video chat deep link &raquo;](/api/links.md#video-chat-livestream-links). Only group call admins may set `can_self_unmute`, allowing users that join using the generated link to speak without explicitly requesting permission: in this case, the exported link will also have an `invite_hash`, that must be passed to [phone.joinGroupCall](/method/phone.joinGroupCall.md) when joining the call in order to automatically gain permission to speak.  

[phone.exportGroupCallInvite](/method/phone.exportGroupCallInvite.md) cannot be used for video chats/livestreams associated with private groups or channels. Share the associated group's or channel's invite link instead.  

A user may also be explicitly invited to a video chat/livestream by using [phone.inviteToGroupCall](/method/phone.inviteToGroupCall.md), generating a [messageActionInviteToGroupCall](/constructor/messageActionInviteToGroupCall.md) service message sent to the group/channel associated with the call: its `call` field identifies the video chat/livestream, and its `users` field contains the IDs of the invited users.  

To join a video chat/livestream, invoke [phone.joinGroupCall](/method/phone.joinGroupCall.md).  

Updates to info about a video chat/livestream are delivered using [updateGroupCall](/constructor/updateGroupCall.md)/[updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) to all members/subscribers of the basic group/supergroup/channel, and should be handled as specified [here &raquo;](#applying-group-call-updates).  

When invoking [phone.createGroupCall](/method/phone.createGroupCall.md), the following flags can be optionally set:

- `title` - Specifies a custom group call title, if not set defaults to the group/channel's name
- `schedule_date` - Creates a scheduled call for the specified date (at least 10 seconds and at most 8 days into the future).  
  
  This will **not** automatically start the call at the specified date: a scheduled call must be manually started by invoking [phone.startScheduledGroupCall](/method/phone.startScheduledGroupCall.md).  

  A scheduled call can also be started before or after its scheduled date.  

  To get a notification when a scheduled video chat/livestream is started, invoke [phone.toggleGroupCallStartSubscription](/method/phone.toggleGroupCallStartSubscription.md).  
  
  [phone.toggleGroupCallStartSubscription](/method/phone.toggleGroupCallStartSubscription.md) can only be invoked for **scheduled video chats/livestreams**, before they are started.  

  The notification will be received in an [updateNewMessage](/constructor/updateNewMessage.md) coming from the service notifications user (ID `777000`).  

#### Live stories

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    inputGroupCall#d8aa840f id:long access_hash:long = InputGroupCall;

    messageMediaVideoStream#ca5cab89 flags:# rtmp_stream:flags.0?true call:InputGroupCall = MessageMedia;
    
    messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;

    storyItem#16a4b93c flags:# pinned:flags.5?true public:flags.7?true close_friends:flags.8?true min:flags.9?true noforwards:flags.10?true edited:flags.11?true contacts:flags.12?true selected_contacts:flags.13?true out:flags.16?true id:int date:int from_id:flags.18?Peer fwd_from:flags.17?StoryFwdHeader expire_date:int caption:flags.0?string entities:flags.1?Vector<MessageEntity> media:MessageMedia media_areas:flags.14?Vector<MediaArea> privacy:flags.2?Vector<PrivacyRule> views:flags.3?StoryViews sent_reaction:flags.15?Reaction albums:flags.19?Vector<int> music:flags.20?Document = StoryItem;

    groupCallDonor#ee430c85 flags:# top:flags.0?true my:flags.1?true peer_id:flags.3?Peer stars:long = GroupCallDonor;
    phone.groupCallStars#9d1dbd26 total_stars:long top_donors:Vector<GroupCallDonor> chats:Vector<Chat> users:Vector<User> = phone.GroupCallStars;

    updateGroupCall#9d2216e0 flags:# live_story:flags.2?true peer:flags.1?Peer call:GroupCall = Update;
    updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;

    ---functions---

    stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;
    
    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;
    phone.getGroupCallStars#6f636302 call:InputGroupCall = phone.GroupCallStars;
    phone.saveDefaultSendAs#4167add1 call:InputGroupCall send_as:InputPeer = Bool;

A live story is a group call associated with a specific [story &raquo;](/api/stories.md#watching-stories) of a user, [supergroup &raquo;](/api/channel.md#supergroups) or [channel &raquo;](/api/channel.md#channels).  

A peer can only have one associated active live story, which can be created by the user or by supergroup/channel admins by invoking [stories.startLive](/method/stories.startLive.md).  
  
Clients should prevent users and channel admins from creating a new live story if a live story is already currently active: if someone attempts to create a new live story on a peer that already has one, a `STORY_LIVE_ALREADY_%d` RPC error will be emitted, containing the ID of the currently active live story.  

A supergroup/channel can have both an active live story and an active video chat/livestream: the main difference is that live stories also support comments with donations, and are visible in the top bar of the dialog list of subscribers.  

Since [basic groups](/api/channel.md#basic-groups) cannot post stories, they also cannot have an associated live story.  
  
To interact with a live story, use the [inputGroupCall](/constructor/inputGroupCall.md) constructor which will always be present in the [messageMediaVideoStream](/constructor/messageMediaVideoStream.md) contained in the story's [storyItem](/constructor/storyItem.md).`media`, if a live story is currently active.  

To join a live story, invoke [phone.joinGroupCall](/method/phone.joinGroupCall.md), as for all other group call types. 

The `join_as` peer must always be [inputPeerSelf](/constructor/inputPeerSelf.md) for live stories (however, users can still [comment on behalf of owned channels to avoid deanonymization &raquo;](#in-call-messages)).  

Live stories have a single publisher: only the participant streaming the live story publishes audio and video; all other participants must join as listeners, with both `muted` and `video_stopped` set in [phone.joinGroupCall](/method/phone.joinGroupCall.md). 

Live stories support [in-call messages and reactions &raquo;](#in-call-messages), including [paid comments &raquo;](#paid-live-story-comments) and [paid donations &raquo;](#paid-live-story-donations), and allow commenters to choose the peer displayed as the author.  

Updates to info about a live story are delivered using [updateGroupCall](/constructor/updateGroupCall.md)/[updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) to all subscribers of the group/channel and all contacts for user live stories, and should be handled as specified [here &raquo;](#applying-group-call-updates).  

Once a live story ends, the [messageMediaVideoStream](/constructor/messageMediaVideoStream.md) in the story's [storyItem](/constructor/storyItem.md).`media` will be replaced with a [messageMediaDocument](/constructor/messageMediaDocument.md), containing a video recording of the story.  

#### Conference calls

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    inputGroupCallSlug#fe06823f slug:string = InputGroupCall;
    inputGroupCallInviteMessage#8c10603f msg_id:int = InputGroupCall;

    updateGroupCall#9d2216e0 flags:# live_story:flags.2?true peer:flags.1?Peer call:GroupCall = Update;
    updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;
    updateGroupCallChainBlocks#a477288f call:InputGroupCall sub_chain_id:int blocks:Vector<bytes> next_offset:int = Update;
    updateGroupCallEncryptedMessage#c957a766 call:InputGroupCall from_id:Peer encrypted_message:bytes = Update;

    messageActionConferenceCall#2ffe2f7a flags:# missed:flags.0?true active:flags.1?true video:flags.4?true call_id:long duration:flags.2?int other_participants:flags.3?Vector<Peer> = MessageAction;

    ---functions---

    phone.createConferenceCall#7d0444bb flags:# muted:flags.0?true video_stopped:flags.2?true join:flags.3?true random_id:int public_key:flags.3?int256 block:flags.3?bytes params:flags.3?DataJSON = Updates;
    phone.inviteConferenceCallParticipant#bcf22685 flags:# video:flags.0?true call:InputGroupCall user_id:InputUser = Updates;
    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;

    phone.deleteConferenceCallParticipants#8ca60525 flags:# only_left:flags.0?true kick:flags.1?true call:InputGroupCall ids:Vector<long> block:bytes = Updates;
    phone.declineConferenceCallInvite#3c479971 msg_id:int = Updates;
    phone.sendGroupCallEncryptedMessage#e5afa56d call:InputGroupCall encrypted_message:bytes = Bool;

A conference call is a group call **not** associated with any group or channel. Its [groupCall](/constructor/groupCall.md).`invite_link` can be shared to let other users join.  

Additionally, conference calls are E2E-encrypted with a blockchain, see [here &raquo;](/api/end-to-end/group-calls.md#overview) for a full description of the end-to-end encryption protocol and API methods used to manage the conference call blockchain.  

To create a conference, invoke [phone.createConferenceCall](/method/phone.createConferenceCall.md): this will return an [updateGroupCall](/constructor/updateGroupCall.md) containing a [groupCall](/constructor/groupCall.md) constructor, which will also contain the [conference deep link &raquo;](/api/links.md#conference-links) (`invite_link`) that other users can use to interact with the call.  

If the `join` flag is set, the creator also joins the conference in the same request: populate `public_key` with a fresh E2E public key, populate `block` with the initial `e2e.chain.block` for subchain 0, and populate `params` with the usual local call engine join payload. 

A conference call is also created when [migrating an ongoing one-to-one call &raquo;](/api/calls.md#migrating-to-a-conference-call) to a conference: the migrating client creates the conference with [phone.createConferenceCall](/method/phone.createConferenceCall.md) (joining it via the `join` flag), and then discards the one-to-one call with a [phoneCallDiscardReasonMigrateConferenceCall](/constructor/phoneCallDiscardReasonMigrateConferenceCall.md), whose `slug` lets the other party join the newly created conference.  

You can invite users to join the conference using the link, or by invoking [phone.inviteConferenceCallParticipant](/method/phone.inviteConferenceCallParticipant.md), passing an [inputGroupCall](/constructor/inputGroupCall.md) generated from the previously returned [groupCall](/constructor/groupCall.md) and the ID of the user to invite.  

If [phone.inviteConferenceCallParticipant](/method/phone.inviteConferenceCallParticipant.md) is used, the destination user will receive a [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) constructor: if [the call\_requests\_disabled client configuration key &raquo;](/api/config.md#call-requests-disabled) is not set or false, an incoming [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) with the `missed` and `active` flags **not** set should trigger ringing and an incoming call screen, just like for one-on-one calls.  

To decline an incoming invitation, invoke [phone.declineConferenceCallInvite](/method/phone.declineConferenceCallInvite.md), passing the ID of the invitation's [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) service message to `msg_id`.  

The returned updates will update the referenced [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) service message, setting the `missed` flag and leaving the `active` flag unset, thus stopping the incoming call screen.

To interact with a conference call, use one of the following constructors of type [InputGroupCall](/type/InputGroupCall.md):

- [inputGroupCall](/constructor/inputGroupCall.md) if we created the group call and we already have the [groupCall](/constructor/groupCall.md)'s `id` and `access_hash`
- [inputGroupCallSlug](/constructor/inputGroupCallSlug.md) if we only have a [conference deep link &raquo;](/api/links.md#conference-links)
- [inputGroupCallInviteMessage](/constructor/inputGroupCallInviteMessage.md) if we were invited using [messageActionConferenceCall](/constructor/messageActionConferenceCall.md): `msg_id` should point to the ID of the [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) service message (no need to specify the peer, because [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) can only be received in private chats, which share a single ID sequence)

To join a conference call, invoke [phone.joinGroupCall](/method/phone.joinGroupCall.md), as for all other group call types, with the following distinctions:

- `join_as` can **only** be equal to [inputPeerSelf](/constructor/inputPeerSelf.md) for conference calls (i.e. you cannot join a conference call on behalf of an owned channel).  
- `public_key` must be populated with your public key.
- `block` must be populated with the appropriate [main-chain block &raquo;](/api/end-to-end/group-calls.md#block-structure). 
- `params` must be populated with the local call engine join payload, as for other group calls.

To join a call with [phone.joinGroupCall](/method/phone.joinGroupCall.md), clients must:

1. Obtain the latest block on the main subchain using [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) with `offset=-1`, `limit=1`, `sub_chain_id=0`
2. Build the join block as specified [here &raquo;](/api/end-to-end/group-calls.md#joining-a-call)
3. Invoke [phone.joinGroupCall](/method/phone.joinGroupCall.md) with the new block and the client's newly generated public key; if the method call fails with an RPC error that starts with `CONF_WRITE_CHAIN_INVALID`, go back to step 1 (the group call state has changed, a new block is available and we must re-generate our join block on top of the new block)

To remove conference participants, invoke [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md), constructing and passing the required E2E removal `block` and populating the appropriate flags as specified [here &raquo;](/api/end-to-end/group-calls.md#removing-a-participant).  

Conference in-call messages and [emoji reactions &raquo;](/api/end-to-end/group-calls.md#conference-in-call-reactions) must also be E2E-encrypted. Serialize and encrypt them as specified [here &raquo;](/api/end-to-end/group-calls.md#conference-in-call-messages), and send them using [phone.sendGroupCallEncryptedMessage](/method/phone.sendGroupCallEncryptedMessage.md). Incoming encrypted messages and reactions are delivered in [updateGroupCallEncryptedMessage](/constructor/updateGroupCallEncryptedMessage.md) updates and must be decrypted locally.

Updates to info about a conference are delivered using [updateGroupCall](/constructor/updateGroupCall.md)/[updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) to all participants, and should be handled as specified [here &raquo;](#applying-group-call-updates).  

Additionally, updates about new blockchain blocks are delivered using [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), and they should be handled as specified [here &raquo;](/api/end-to-end/group-calls.md#handling-updates), instead.

As long as the client is a member of the call, it **must also** poll each subchain for new blocks using [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) with `limit=50` and `offset` set to the height of the last accepted block plus `1`. Poll every 5 seconds in normal conditions, and every second while [key verification is in progress &raquo;](/api/end-to-end/group-calls.md#key-verification-and-emoji-generation).  

### Getting info about a group call
    
    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    phone.groupCall#9e727aad call:GroupCall participants:Vector<GroupCallParticipant> participants_next_offset:string chats:Vector<Chat> users:Vector<User> = phone.GroupCall;

    phone.groupParticipants#f47751b6 count:int participants:Vector<GroupCallParticipant> next_offset:string chats:Vector<Chat> users:Vector<User> version:int = phone.GroupParticipants;

    ---functions---

    phone.getGroupCall#41845db call:InputGroupCall limit:int = phone.GroupCall;

    phone.getGroupParticipants#c558d8ab call:InputGroupCall ids:Vector<InputPeer> sources:Vector<int> offset:string limit:int = phone.GroupParticipants;

To fetch the currently active [groupCall](/constructor/groupCall.md) of [any type](#group-call-types), invoke [phone.getGroupCall](/method/phone.getGroupCall.md) passing the appropriate subtype of [InputGroupCall](/type/InputGroupCall.md) according to the [call type &raquo;](#group-call-types); this method can also be used to fetch some of the group's participants (the max number of returned participants can be controlled by the `limit` parameter, `0` to return a server-defined number of results).  

If the number of returned participants is less than [groupCall](/constructor/groupCall.md).`participants_count`, you can later [paginate](/api/offsets.md) through the remaining participants using [phone.getGroupParticipants](/method/phone.getGroupParticipants.md), passing to `offset` the [phone.groupCall](/constructor/phone.groupCall.md).`participants_next_offset` returned by [phone.getGroupCall](/method/phone.getGroupCall.md), and then the [phone.groupParticipants](/constructor/phone.groupParticipants.md).`next_offset` returned by [phone.getGroupParticipants](/method/phone.getGroupParticipants.md).  

Note that the `limit` parameter of [phone.getGroupCall](/method/phone.getGroupCall.md) behaves in a different way compared to the `limit` of [phone.getGroupParticipants](/method/phone.getGroupParticipants.md): regardless of the value passed to [phone.getGroupCall](/method/phone.getGroupCall.md).`limit`, the number of returned results will always be at least equal to 3 or the number of participants, whichever is smaller; however, the returned `participants_next_offset` will still correctly point to the `limit`th participant (or to the last one, if no more are available), and using the returned offset will fetch members starting from (and excluding) the `limit`th participant.  

For example, with 5 members (A..E), invoking [phone.getGroupCall](/method/phone.getGroupCall.md) with `limit=1` will return members A, B, C, but passing the returned `participants_next_offset` to [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) with `limit=10` will return members B, C, D, E.  

On the other hand, `limit` parameter of [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) behaves as usual, properly restricting the number of returned participants.  

Alternatively, the `sources` or `ids` flags of [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) may be populated to fetch information only about specific users, based on their WebRTC source IDs or Telegram user IDs.

Note: if no more results are available, [phone.getGroupParticipants](/method/phone.getGroupParticipants.md) will return an empty `next_offset`; thus, avoid providing the `next_offset` returned in [phone.groupParticipants](/constructor/phone.groupParticipants.md) if it is empty, to avoid an infinite loop.  

### Applying group call updates
    
    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    groupCallParticipant#2a3dc7ac flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo paid_stars_total:flags.16?long = GroupCallParticipant;

    updateGroupCall#9d2216e0 flags:# live_story:flags.2?true peer:flags.1?Peer call:GroupCall = Update;

    updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;

All updates related to active group calls have a non-zero `version` integer field, which should be used to apply the update, comparing it with the non-zero `version` field of the cached [groupCall](/constructor/groupCall.md) (from now on, referred to as `cached_version`).  

The `version` field of [groupCall](/constructor/groupCall.md) is the revision number of group call information (which includes the group call participant list).  

The logic used to apply [updateGroupCall](/constructor/updateGroupCall.md) and [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) varies slightly.  

If an incoming [updateGroupCall](/constructor/updateGroupCall.md).`call` is a [groupCallDiscarded](/constructor/groupCallDiscarded.md), the call has ended: apply it immediately and discard the cached participant list.

Otherwise, [updateGroupCall](/constructor/updateGroupCall.md).`call` is an active [groupCall](/constructor/groupCall.md). Extract its `version` and follow this algorithm:

- If `version` is smaller than `cached_version+1`, skip the update
- If `version` is equal to `cached_version+1`, apply the update by updating the cached [groupCall](/constructor/groupCall.md) with the [groupCall](/constructor/groupCall.md) provided in the update.  
  Note that if the [groupCall](/constructor/groupCall.md).`min` flag is set, a **specific set** of [groupCall](/constructor/groupCall.md) fields specified in the [constructor page &raquo;](/constructor/groupCall.md) **cannot** be applied over the locally cached version.  

- If `version` is greater than `cached_version+1`, wait up to 1 second for another [updateGroupCall](/constructor/updateGroupCall.md) to arrive for the same group call, filling the gap in the `version` sequence; if no such update arrives in time, skip the update, and invalidate and refetch locally cached group call information and the participant list by using [phone.getGroupCall](/method/phone.getGroupCall.md).
- If there is no locally cached [groupCall](/constructor/groupCall.md) for this chat, apply the update, caching the [groupCall](/constructor/groupCall.md).  
  In this case, do **not** apply the update if the [groupCall](/constructor/groupCall.md).`min` flag is set.

To apply an incoming [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md), extract the `version` from [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md).`version`, and follow this algorithm:

- If **at least one** of the [groupCallParticipant](/constructor/groupCallParticipant.md)s contained in the update has the `versioned` AND/OR `left` AND/OR `just_joined` flag set, follow these steps:
    - If `version` is smaller than `cached_version`, skip the update
    - If `version` is equal to `cached_version`, apply the update **only if this is the first [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) received for this group call**, see below on how to apply it.  
    - If `version` is equal to `cached_version+1`, apply the update by updating the `version` of the local [groupCall](/constructor/groupCall.md) and updating/populating [groupCallParticipant](/constructor/groupCallParticipant.md) info.  
      Note that if the [groupCallParticipant](/constructor/groupCallParticipant.md).`min` flag is set, a **specific set** of [groupCallParticipant](/constructor/groupCallParticipant.md) fields specified in the [constructor page &raquo;](/constructor/groupCallParticipant.md) **cannot** be applied over the locally cached version.  
      If the [groupCallParticipant](/constructor/groupCallParticipant.md).`left` flag is set, this participant left the call, and the local [groupCallParticipant](/constructor/groupCallParticipant.md) should be deleted.  
    - If `version` is greater than `cached_version+1`, wait up to 1 second for another [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) to arrive for the same group call, filling the gap in the `version` sequence; if no such update arrives in time, skip the update, and invalidate and refetch locally cached group call information and the participant list by using [phone.getGroupCall](/method/phone.getGroupCall.md).  
    - If there is no locally cached [groupCall](/constructor/groupCall.md) for this chat, skip the update.
- Otherwise, apply the update unconditionally, regardless of the value of `version`.  

### Joining a group call on behalf of owned channels
    
    phone.joinAsPeers#afe5623f peers:Vector<Peer> chats:Vector<Chat> users:Vector<User> = phone.JoinAsPeers;
    
    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;

    channelFull#e4e0b29d flags:# can_view_participants:flags.3?true can_set_username:flags.6?true can_set_stickers:flags.7?true hidden_prehistory:flags.10?true can_set_location:flags.16?true has_scheduled:flags.19?true can_view_stats:flags.20?true blocked:flags.22?true flags2:# can_delete_channel:flags2.0?true antispam:flags2.1?true participants_hidden:flags2.2?true translations_disabled:flags2.3?true stories_pinned_available:flags2.5?true view_forum_as_messages:flags2.6?true restricted_sponsored:flags2.11?true can_view_revenue:flags2.12?true paid_media_allowed:flags2.14?true can_view_stars_revenue:flags2.15?true paid_reactions_available:flags2.16?true stargifts_available:flags2.19?true paid_messages_available:flags2.20?true id:long about:string participants_count:flags.0?int admins_count:flags.1?int kicked_count:flags.2?int banned_count:flags.2?int online_count:flags.13?int read_inbox_max_id:int read_outbox_max_id:int unread_count:int chat_photo:Photo notify_settings:PeerNotifySettings exported_invite:flags.23?ExportedChatInvite bot_info:Vector<BotInfo> migrated_from_chat_id:flags.4?long migrated_from_max_id:flags.4?int pinned_msg_id:flags.5?int stickerset:flags.8?StickerSet available_min_id:flags.9?int folder_id:flags.11?int linked_chat_id:flags.14?long location:flags.15?ChannelLocation slowmode_seconds:flags.17?int slowmode_next_send_date:flags.18?int stats_dc:flags.12?int pts:int call:flags.21?InputGroupCall ttl_period:flags.24?int pending_suggestions:flags.25?Vector<string> groupcall_default_join_as:flags.26?Peer theme_emoticon:flags.27?string requests_pending:flags.28?int recent_requesters:flags.28?Vector<long> default_send_as:flags.29?Peer available_reactions:flags.30?ChatReactions reactions_limit:flags2.13?int stories:flags2.4?PeerStories wallpaper:flags2.7?WallPaper boosts_applied:flags2.8?int boosts_unrestrict:flags2.9?int emojiset:flags2.10?StickerSet bot_verification:flags2.17?BotVerification stargifts_count:flags2.18?int send_paid_messages_stars:flags2.21?long main_tab:flags2.22?ProfileTab = ChatFull;

    ---functions---

    phone.getGroupCallJoinAs#ef7c213a peer:InputPeer = phone.JoinAsPeers;

    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;

    phone.saveDefaultGroupCallJoinAs#575e1f8c peer:InputPeer join_as:InputPeer = Bool;

Only [video chats/livestreams &raquo;](#video-chats-livestreams) allow joining the group call on behalf of an owned channel, or on behalf of the associated group for [anonymous admins](/api/rights.md#anonymous-admins). [Live stories &raquo;](#live-stories) and [conferences &raquo;](#conference-calls) must be joined using [inputPeerSelf](/constructor/inputPeerSelf.md).  

Note that users joining a livestream can still [comment on behalf of owned channels to avoid deanonymization &raquo;](#in-call-messages), using a slightly different flow.  

To obtain the full list of peers that can be used to join a video chat/livestream, invoke [phone.getGroupCallJoinAs](/method/phone.getGroupCallJoinAs.md), passing the identifier of the channel/supergroup/basic group to which the call is associated.  

Any of the returned peers can then be passed to the `join_as` flag of [phone.joinGroupCall](/method/phone.joinGroupCall.md), when joining the group call: if `join_as` is not populated, the default `join_as` peer for that channel/group is used.  

The value of the default `join_as` peer for a channel/group is available in [chatFull](/constructor/chatFull.md).`groupcall_default_join_as`/[channelFull](/constructor/channelFull.md).`groupcall_default_join_as`, if it was explicitly changed by the user by invoking [phone.saveDefaultGroupCallJoinAs](/method/phone.saveDefaultGroupCallJoinAs.md).  

Otherwise, if [chatFull](/constructor/chatFull.md).`groupcall_default_join_as`/[channelFull](/constructor/channelFull.md).`groupcall_default_join_as` is empty, and no value is provided to [phone.joinGroupCall](/method/phone.joinGroupCall.md).`join_as`, the call will be joined on behalf of the current user.  

### Maintaining group call connections

    ---functions---

    phone.checkGroupCall#b59cf977 call:InputGroupCall sources:Vector<int> = Vector<int>;

In WebRTC mode, each successful [phone.joinGroupCall](/method/phone.joinGroupCall.md) and [phone.joinGroupCallPresentation](/method/phone.joinGroupCallPresentation.md) call registers a separate WebRTC connection, identified by the non-zero audio SSRC/source ID provided in its join payload.  

If either the main or the presentation WebRTC connection disconnects, invoke [phone.checkGroupCall](/method/phone.checkGroupCall.md) every 4 seconds, only while the WebRTC engine attempts to re-establish the connection(s).  

Pass to [phone.checkGroupCall](/method/phone.checkGroupCall.md).`sources` the source ID of the main connection and, if a presentation connection is active, its source ID as well.  

Stop polling [phone.checkGroupCall](/method/phone.checkGroupCall.md) if the connection is re-established or if the client leaves the call.  

The method returns the subset of the supplied sources that the server still recognizes as joined.  
Handle the returned vector as follows:

- If the main source is present, keep attempting to reconnect the existing main connection.
- If the main source is missing, generate a new main join payload and invoke [phone.joinGroupCall](/method/phone.joinGroupCall.md) again. Any active presentation connection must also be rejoined after the new main connection is established.
- If the main source is present but the presentation source is missing, generate a new presentation join payload and invoke [phone.joinGroupCallPresentation](/method/phone.joinGroupCallPresentation.md) again.

If [phone.checkGroupCall](/method/phone.checkGroupCall.md) returns an RPC error, generate a new main join payload and rejoin the main connection.

### Managing an active group call

    groupCallParticipant#2a3dc7ac flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo paid_stars_total:flags.16?long = GroupCallParticipant;

    updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;

    ---functions---

    phone.editGroupCallParticipant#a5273abf flags:# call:InputGroupCall participant:InputPeer muted:flags.0?Bool volume:flags.1?int raise_hand:flags.2?Bool video_stopped:flags.3?Bool video_paused:flags.4?Bool presentation_paused:flags.5?Bool = Updates;
    
    phone.leaveGroupCall#500377f9 call:InputGroupCall source:int = Updates;
    
    phone.discardGroupCall#7a777135 call:InputGroupCall = Updates;
    
    phone.toggleGroupCallSettings#974392f2 flags:# reset_invite_hash:flags.1?true call:InputGroupCall join_muted:flags.0?Bool messages_enabled:flags.2?Bool send_paid_messages_stars:flags.3?long = Updates;

Use [phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md) to change participant settings. Only populate the flags that should be changed. The server will emit [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) updates containing the new state.

[phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md) is not available in live stories (both RTMP and non-RTMP) and RTMP video chats/livestreams, as in those group call types only a single publisher can transmit audio and video and all other participants are listeners.  

- `muted` mutes or unmutes the current user or another participant.

  The resulting [groupCallParticipant](/constructor/groupCallParticipant.md).`muted` and `can_self_unmute` flags describe the participant's mute state:

  - If `muted` is set and `can_self_unmute` is not set, the participant was forcibly muted and cannot unmute themselves.
  - If both `muted` and `can_self_unmute` are set, the participant is muted but may unmute themselves.
  - If `muted` is not set, the participant is unmuted.

  In video chats/livestreams, admins with the [manage_call admin right &raquo;](/constructor/chatAdminRights.md) may forcibly mute non-admin participants. Invoking [phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md) with `muted` set to [boolFalse](/constructor/boolFalse.md) for a forcibly muted participant does not immediately unmute them: it sets `can_self_unmute`, allowing them to unmute themselves. Admins may also mute other admins, but cannot forcibly mute or unmute them: muted admins retain `can_self_unmute`.  

  The same goes for conferences, with the distinction that the only possible admin is the creator of the conference.  
  
  Without moderation rights, you can only mute/unmute yourself, the latter only if `can_self_unmute` is set.  
  
  Without moderation rights, muting another participant in the UI should only affect local state.  

- `volume` changes another participant's volume. The value must be between `1` and `20000`, where `10000` represents 100% volume and `20000` represents 200% volume. With moderation rights (as seen above), the new volume is also applied for other participants using the default volume; otherwise, it only affects local playback.

  As with the `muted` flag, `volume` can be used by video chats/livestreams and conferences.  
- `raise_hand` raises or lowers the current user's hand, or lowers another participant's hand when the current user has moderation rights. 
  
  This field is only supported in video chats/livestreams, not conference calls.

- `video_stopped` starts or stops the current user's video stream.
- `video_paused` pauses or resumes the current user's video stream.
- `presentation_paused` pauses or resumes the current user's presentation stream.

For all group call types, use [phone.leaveGroupCall](/method/phone.leaveGroupCall.md) to leave without ending the call for other participants, passing the source ID of the main stream.  

Use [phone.discardGroupCall](/method/phone.discardGroupCall.md) to end the call for everyone; this requires the appropriate admin/creator permission for video chats/livestreams and live stories, and can only be done by the creator for conferences.

Admins can invoke [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md) to change settings whose availability depends on the group call type:

- `reset_invite_hash` invalidates existing links for (both RTMP and non-RTMP) video chats/livestreams and conferences.
- `join_muted` changes whether new participants join muted, can only be changed in non-RTMP video chats/livestreams.
- `messages_enabled` enables or disables the in-call message overlay in video chats/livestreams, conferences and live stories, regardless of whether RTMP livestream mode is used; this setting may only be changed if [groupCall](/constructor/groupCall.md).`can_change_messages_enabled` is set.
- `send_paid_messages_stars` changes the minimum donation required for comments from users other than the live story owner, in (both RTMP and non-RTMP) live stories only.

### In-call messages

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    groupCallMessage#1a8afc7e flags:# from_admin:flags.1?true id:int from_id:Peer date:int message:TextWithEntities paid_message_stars:flags.0?long = GroupCallMessage;

    updateGroupCallMessage#d8326f0d call:InputGroupCall message:GroupCallMessage = Update;
    updateDeleteGroupCallMessages#3e85e92c call:InputGroupCall messages:Vector<int> = Update;

    ---functions---

    phone.toggleGroupCallSettings#974392f2 flags:# reset_invite_hash:flags.1?true call:InputGroupCall join_muted:flags.0?Bool messages_enabled:flags.2?Bool send_paid_messages_stars:flags.3?long = Updates;
    phone.sendGroupCallMessage#b1d11410 flags:# call:InputGroupCall random_id:long message:TextWithEntities allow_paid_stars:flags.0?long send_as:flags.1?InputPeer = Updates;
    phone.saveDefaultSendAs#4167add1 call:InputGroupCall send_as:InputPeer = Bool;
    phone.deleteGroupCallMessages#f64f54f7 flags:# report_spam:flags.0?true call:InputGroupCall messages:Vector<int> = Updates;
    phone.deleteGroupCallParticipantMessages#1dbfeca0 flags:# report_spam:flags.0?true call:InputGroupCall participant:InputPeer = Updates;

Video chats/livestreams and live stories support sending messages within the context of the group call, regardless of whether RTMP livestream mode is used.

These messages are **not** part of the regular message history of the associated basic group, supergroup, channel or user, and are sent and delivered using the API methods/constructors described below.  

Conferences use [E2E-encrypted in-call messages](#conference-calls) instead.

If [groupCall](/constructor/groupCall.md).`can_change_messages_enabled` is set, the current user may enable or disable group call messages by invoking [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md) with `messages_enabled`.  

If [groupCall](/constructor/groupCall.md).`messages_enabled` is set, participants may send messages using [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md):

Clients should expose the in-call message UI to participants only while [groupCall](/constructor/groupCall.md).`messages_enabled` is set.  
A **Message** button should be displayed in the active call panel; pressing it opens an in-call composer and messages are displayed as overlays inside the call panel.  

In-call messages may be at most [`group_call_message_length_limit` &raquo;](/api/config.md#group-call-message-length-limit) UTF-8 characters long, and clients should keep each message displayed as an overlay for [`group_call_message_ttl` &raquo;](/api/config.md#group-call-message-ttl) seconds (starting from the [groupCallMessage](/constructor/groupCallMessage.md).`date`).  

There is no separate chat page or history-fetching method for these messages; they are delivered via [updateGroupCallMessage](/constructor/updateGroupCallMessage.md) updates.  

In video chats/livestreams and live stories, participants may use [phone.deleteGroupCallMessages](/method/phone.deleteGroupCallMessages.md) to delete specific messages they sent, while admins may use it to delete any specific message. Admins may also use [phone.deleteGroupCallParticipantMessages](/method/phone.deleteGroupCallParticipantMessages.md) to delete all messages from a participant. Deleted message IDs are delivered in [updateDeleteGroupCallMessages](/constructor/updateDeleteGroupCallMessages.md) updates. When moderating another participant's messages, the `report_spam` flag also reports the deleted messages.

Only when sending messages/reactions to [live stories &raquo;](#live-stories), the displayed author may be customized via [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md).`send_as`.  

To obtain the peers that may be used in `send_as`, invoke [channels.getSendAs](/method/channels.getSendAs.md) with `for_live_stories` set.  

The field is optional: if it is omitted, the server uses the peer in [groupCall](/constructor/groupCall.md).`default_send_as` (if set, otherwise defaults to the current user). Clients may persist another selected peer using [phone.saveDefaultSendAs](/method/phone.saveDefaultSendAs.md).  

Do not populate `send_as` for video chats/livestreams, as in video chat/livestream, messages can only be sent using the same `join_as` peer used to join the video chat/livestream.

#### In-call reactions

Video chats/livestreams and live stories support animated emoji reactions using [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md), passing the following value to `message`:

1. For a standard emoji reaction, pass a `message` containing only the selected available reaction emoji and no entities.
2. For a custom emoji reaction, pass a `message` containing the custom emoji's fallback emoji text and exactly one [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md) entity spanning the entire text.

Incoming reactions are delivered as normal [updateGroupCallMessage](/constructor/updateGroupCallMessage.md) updates. Clients should recognize these single-emoji payloads and should render them using the reaction's animated effect instead of displaying them as ordinary text.

Conference calls use the same emoji reaction payloads, but they must be serialized and E2E-encrypted using the [conference in-call reaction flow &raquo;](/api/end-to-end/group-calls.md#conference-in-call-reactions).

#### Paid live story comments

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;
    groupCallMessage#1a8afc7e flags:# from_admin:flags.1?true id:int from_id:Peer date:int message:TextWithEntities paid_message_stars:flags.0?long = GroupCallMessage;
    groupCallDonor#ee430c85 flags:# top:flags.0?true my:flags.1?true peer_id:flags.3?Peer stars:long = GroupCallDonor;
    phone.groupCallStars#9d1dbd26 total_stars:long top_donors:Vector<GroupCallDonor> chats:Vector<Chat> users:Vector<User> = phone.GroupCallStars;

    ---functions---

    stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;

    phone.toggleGroupCallSettings#974392f2 flags:# reset_invite_hash:flags.1?true call:InputGroupCall join_muted:flags.0?Bool messages_enabled:flags.2?Bool send_paid_messages_stars:flags.3?long = Updates;

    phone.sendGroupCallMessage#b1d11410 flags:# call:InputGroupCall random_id:long message:TextWithEntities allow_paid_stars:flags.0?long send_as:flags.1?InputPeer = Updates;
    phone.getGroupCallStars#6f636302 call:InputGroupCall = phone.GroupCallStars;

Live stories may require viewers to donate [Telegram Stars](/api/stars.md) in order to comment.  

The live story owner sets the minimum donation when starting the story, via [stories.startLive](/method/stories.startLive.md).`send_paid_messages_stars`, and may change it at any time while the story is live using [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md).`send_paid_messages_stars`.  
The current minimum is always available in [groupCall](/constructor/groupCall.md).`send_paid_messages_stars`; a value of `0` (or no value) means comments are free.  
The owner may always comment for free, regardless of the current minimum.

To send a paid comment, use the normal [in-call message sending flow](#in-call-messages) with the following additions:

1. Let the user choose and confirm a donation amount. Except for the owner (who must always donate `0`), the amount must be **at least** the current minimum in [groupCall](/constructor/groupCall.md).`send_paid_messages_stars`, and **at most** [`stars_groupcall_message_amount_max` &raquo;](/api/config.md#stars-groupcall-message-amount-max).
2. Invoke [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md) as described in the [parent section](#in-call-messages), additionally passing the confirmed amount in `allow_paid_stars`.
3. Apply the returned [updateGroupCallMessage](/constructor/updateGroupCallMessage.md): the accepted comment carries the donated amount in [groupCallMessage](/constructor/groupCallMessage.md).`paid_message_stars`.

The larger the donation, the more prominently the comment is highlighted: its background color, the time it stays pinned, and the maximum allowed text and custom emoji counts are all determined by the donated amount, according to the tiers defined in the [`stars_groupcall_message_limits` &raquo;](/api/config.md#stars-groupcall-message-limits) configuration parameter.

The `allow_paid_stars` value both authorizes and specifies the donation, and the user's Stars balance is charged only if the request succeeds. If the balance is insufficient, [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md) returns a `400 BALANCE_TOO_LOW` RPC error: prompt the user to obtain more Stars, and retry only after asking for confirmation again.

#### Paid live story donations

Live stories also support standalone paid donations, which use [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md), despite not containing a textual message:

1. Let the user choose and confirm a positive number of Telegram Stars to donate.
2. Invoke [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md), passing an empty [textWithEntities](/constructor/textWithEntities.md) in `message`, the chosen amount in `allow_paid_stars`, and a fresh client-generated `random_id`. As usual, `send_as` is optional.
3. Apply the returned updates normally. The donation is delivered to participants as an [updateGroupCallMessage](/constructor/updateGroupCallMessage.md) containing a [groupCallMessage](/constructor/groupCallMessage.md) with an empty `message` and the donated amount in `paid_message_stars`.

Standalone paid donations are only supported by live stories and are distinct from [emoji reactions](#in-call-reactions). Use [phone.getGroupCallStars](/method/phone.getGroupCallStars.md) to fetch the live story's total donations and top donors.

### Presentations
    
    updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;

    ---functions---
    
    phone.joinGroupCallPresentation#cbea6bc4 call:InputGroupCall params:DataJSON = Updates;
    phone.editGroupCallParticipant#a5273abf flags:# call:InputGroupCall participant:InputPeer muted:flags.0?Bool volume:flags.1?int raise_hand:flags.2?Bool video_stopped:flags.3?Bool video_paused:flags.4?Bool presentation_paused:flags.5?Bool = Updates;
    phone.leaveGroupCallPresentation#1c50d144 call:InputGroupCall = Updates;

Presentations (screen sharing streams) are supported in non-RTMP video chats/livestreams and conferences. They are not supported in live stories or RTMP-mode video chats/livestreams.

The user must first join the call normally using [phone.joinGroupCall](/method/phone.joinGroupCall.md). Then, create a separate local call-engine instance for the presentation and pass its join payload to [phone.joinGroupCallPresentation](/method/phone.joinGroupCallPresentation.md).

This will emit an [updateGroupCallConnection](/constructor/updateGroupCallConnection.md) with the `presentation` flag set, with `params` containing the connection parameters for the presentation instance.  

Use [phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md).`presentation_paused` to pause or resume the presentation, and [phone.leaveGroupCallPresentation](/method/phone.leaveGroupCallPresentation.md) to stop it without leaving the main call.

### Stream mode

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;

    messageMediaVideoStream#ca5cab89 flags:# rtmp_stream:flags.0?true call:InputGroupCall = MessageMedia;

    inputGroupCallStream#598a92a flags:# call:InputGroupCall time_ms:long scale:int video_channel:flags.0?int video_quality:flags.0?int = InputFileLocation;

    groupCallStreamChannel#80eb48af channel:int scale:int last_timestamp_ms:long = GroupCallStreamChannel;
    phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;
    phone.groupCallStreamRtmpUrl#2dbf3432 url:string key:string = phone.GroupCallStreamRtmpUrl;

    updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;

    ---functions---

    phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
    stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;

    phone.getGroupCallStreamRtmpUrl#5af4c73a flags:# live_story:flags.0?true peer:InputPeer revoke:Bool = phone.GroupCallStreamRtmpUrl;
    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;
    phone.getGroupCallStreamChannels#1ab21940 call:InputGroupCall = phone.GroupCallStreamChannels;
    upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;

Stream mode (also known as broadcast mode) is a **playback** mode for [video chats/livestreams](#video-chats-livestreams) and [live stories](#live-stories), in which a client receives the call's media by **downloading media chunks** from the media DC specified by [groupCall](/constructor/groupCall.md).`stream_dc_id`, instead of exchanging it over a live WebRTC connection. It is not a separate [group call type](#group-call-types), and conference calls do not support it.

A call can enter stream mode in two different ways:

- **Automatic scaling.** In a normal (non-RTMP) video chat/livestream or live story, participants publish and play media over WebRTC, but WebRTC playback does not scale to very large audiences. Once the audience grows past a server-defined threshold, the server transparently switches **listeners** (participants that are not publishing any media) from WebRTC playback to downloading chunks.  

  This is decided **entirely by the server**, on a per-listener basis: a client simply [joins the call normally](#video-chats-livestreams) and lets the server decide. At the time of writing, the server moves listeners into stream mode once the audience grows past around 30 participants for channel livestreams, 1000 participants for supergroup/basic group video chats, or 100 participants when connected to a [test DC &raquo;](/api/datacenter.md); these thresholds are server-controlled and may change.  

- **RTMP mode.** Alternatively, the call creator may explicitly opt into RTMP mode when creating the call, so that a single external application publishes all the call's audio and video over the [RTMP protocol](https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol) instead of participants publishing their own media over WebRTC. In this case **all** clients play the call by downloading chunks, regardless of the audience size.  

  An RTMP-mode call is identified by [groupCall](/constructor/groupCall.md).`rtmp_stream` (and, for a live story, also by [messageMediaVideoStream](/constructor/messageMediaVideoStream.md).`rtmp_stream`).  

The chunk-download mechanics are almost identical in both cases; the few differences are called out in [downloading media chunks &raquo;](#downloading-media-chunks) below.

#### Creating and publishing an RTMP livestream

    phone.groupCallStreamRtmpUrl#2dbf3432 url:string key:string = phone.GroupCallStreamRtmpUrl;

    ---functions---

    phone.getGroupCallStreamRtmpUrl#5af4c73a flags:# live_story:flags.0?true peer:InputPeer revoke:Bool = phone.GroupCallStreamRtmpUrl;
    phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
    stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;

This subsection applies only to **RTMP mode**; a call that enters stream mode through [stream mode](#stream-mode) has no RTMP publishing endpoint, and its media is published over WebRTC as usual.

Before creating the call, invoke [phone.getGroupCallStreamRtmpUrl](/method/phone.getGroupCallStreamRtmpUrl.md) to obtain the RTMP server URL and stream key for the target peer. Set `live_story` when preparing an RTMP live story; leave it unset when preparing a video chat/livestream.  

The same credentials are returned on later calls. To invalidate the previous stream key and generate a new one, set `revoke` to [boolTrue](/constructor/boolTrue.md). The stream key grants permission to publish media and must be kept secret.

Create an RTMP video chat/livestream using [phone.createGroupCall](/method/phone.createGroupCall.md) with `rtmp_stream` set, or create an RTMP live story using [stories.startLive](/method/stories.startLive.md) with `rtmp_stream` set. Video chats/livestreams may also be scheduled using [phone.createGroupCall](/method/phone.createGroupCall.md).`schedule_date`, following the normal [scheduled group call flow](#video-chats-livestreams).

One external streaming application may then publish media to the returned RTMP URL using the returned stream key. Only this single RTMP publisher supplies the call's audio and video; other participants cannot publish additional audio or video streams. API clients join the group call only to view or listen to the published stream.

#### Detecting stream mode

    updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;

    ---functions---

    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;

Join the call using [phone.joinGroupCall](/method/phone.joinGroupCall.md), generating `params` as described in the method documentation.  

The returned [Updates](/type/Updates.md) contain an [updateGroupCallConnection](/constructor/updateGroupCallConnection.md) whose `params` describes how the joined client should receive the call's media. Parse the `params` JSON object to determine the playback mode:

- Normal WebRTC playback: `params` contains the usual tgcalls join response payload.
- [Stream mode](#stream-mode): `params` is `{"stream": true}`, **without** the `rtmp` field, or with the `rtmp` field set to `false`.
- [RTMP mode](#creating-and-publishing-an-rtmp-livestream): `params` is `{"stream": true, "rtmp": true}`.

In other words, a client is in stream mode whenever `params.stream` is `true`; the presence of `params.rtmp` additionally distinguishes RTMP mode from automatically-scaled stream mode. When in stream mode, tear down the local WebRTC playback engine (if any) and begin [downloading media chunks &raquo;](#downloading-media-chunks). The [groupCall](/constructor/groupCall.md).`stream_dc_id` field specifies the media DC for all stream-related [upload.getFile](/method/upload.getFile.md) requests.

#### Downloading media chunks

    groupCall#efb2b617 flags:# join_muted:flags.1?true can_change_join_muted:flags.2?true join_date_asc:flags.6?true schedule_start_subscribed:flags.8?true can_start_video:flags.9?true record_video_active:flags.11?true rtmp_stream:flags.12?true listeners_hidden:flags.13?true conference:flags.14?true creator:flags.15?true messages_enabled:flags.17?true can_change_messages_enabled:flags.18?true min:flags.19?true id:long access_hash:long participants_count:int title:flags.3?string stream_dc_id:flags.4?int record_start_date:flags.5?int schedule_date:flags.7?int unmuted_video_count:flags.10?int unmuted_video_limit:int version:int invite_link:flags.16?string send_paid_messages_stars:flags.20?long default_send_as:flags.21?Peer = GroupCall;
    inputGroupCallStream#598a92a flags:# call:InputGroupCall time_ms:long scale:int video_channel:flags.0?int video_quality:flags.0?int = InputFileLocation;
    groupCallStreamChannel#80eb48af channel:int scale:int last_timestamp_ms:long = GroupCallStreamChannel;
    phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;

    ---functions---

    phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;
    phone.getGroupCallStreamChannels#1ab21940 call:InputGroupCall = phone.GroupCallStreamChannels;
    upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;

Download each media chunk using [upload.getFile](/method/upload.getFile.md), passing an [inputGroupCallStream](/constructor/inputGroupCallStream.md) as the `location` and `limit = 1024*1024`, and send the request to the DC specified by [groupCall](/constructor/groupCall.md).`stream_dc_id`.  

Populate [inputGroupCallStream](/constructor/inputGroupCallStream.md) as follows:

* `call` contains the related group call ID+access hash, taken from the [groupCall](/constructor/groupCall.md) constructor.
* `time_ms` specifies the timestamp of the chunk to fetch; increment it by `segment_duration_ms` for each subsequent chunk.
* `scale` specifies the segment duration, where `segment_duration_ms := 1000 >> scale`.
* `video_channel` specifies the video channel to fetch (see the mode-specific sections below). Omit it together with `video_quality` to fetch audio.
* `video_quality` specifies the selected video quality (0 = lowest, 1 = medium, 2 = best).

Error handling is the same regardless of how the call entered stream mode:

- If [upload.getFile](/method/upload.getFile.md) fails with `TIME_TOO_BIG` or a flood-wait error, the chunk is not yet available: wait 100 milliseconds (regardless of the value of `FLOOD_WAIT_%d`) and retry the same chunk.  
- If it fails with `GROUPCALL_JOIN_MISSING` or `GROUPCALL_FORBIDDEN`, rejoin using [phone.joinGroupCall](/method/phone.joinGroupCall.md).  
- An [upload.fileCdnRedirect](/constructor/upload.fileCdnRedirect.md) response or any other RPC error indicates that the stream must be resynchronized: discard pending chunks and restart the flow.

The way clients bootstrap the initial timestamp and enumerate video channels differs between the two variants of stream mode.

##### RTMP mode

After joining, invoke [phone.getGroupCallStreamChannels](/method/phone.getGroupCallStreamChannels.md) on the media DC specified by [groupCall](/constructor/groupCall.md).`stream_dc_id` ([`requestCurrentTimeStart` &raquo;](https://github.com/telegramdesktop/tdesktop/blob/cb9750427f57e5518ddb8a0fda9f0bb2291c487f/Telegram/SourceFiles/calls/group/calls_group_call.cpp#L3327-L3369)). The returned [groupCallStreamChannel](/constructor/groupCallStreamChannel.md) constructors describe the currently available stream:

- `channel` is a stream channel ID. Use all returned `channel` values as the sources of a synthetic video source group with endpoint `unified`; pass the desired channel to [inputGroupCallStream](/constructor/inputGroupCallStream.md).`video_channel` when fetching a video segment (unified video uses channel `1`).
- `scale` is **deprecated** and ignored by clients: instead of the advertised value, clients use the media segment duration hardcoded in [tgcalls](https://github.com/TelegramMessenger/tgcalls), a fixed 1000 milliseconds (i.e. `scale = 0`, see [`_segmentDuration` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L1048-L1049)). Historically, it advertised the stream segment duration, where `segment_duration_ms := 1000 >> scale`. 
- `last_timestamp_ms` specifies the current end of the available stream. 

The `channels` vector may be empty while the external publisher is not sending media: if it is empty, retry [phone.getGroupCallStreamChannels](/method/phone.getGroupCallStreamChannels.md) after one second ([empty-list handling](https://github.com/telegramdesktop/tdesktop/blob/cb9750427f57e5518ddb8a0fda9f0bb2291c487f/Telegram/SourceFiles/calls/group/calls_group_call.cpp#L3348-L3357), then the `time_ms <= 0` retry in tgcalls' [`requestSegmentsIfNeeded` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L642-L664)). Once a usable initial timestamp is obtained, there is no need to poll this method as long as chunks continue loading successfully.

To select the initial chunk timestamp, round `last_timestamp_ms` down to a multiple of the segment duration (the hardcoded 1000 milliseconds mentioned above, **not** the deprecated `scale`) and subtract the desired playback buffer. For example, using a 2000-millisecond buffer:

```
segment_duration_ms := 1000
time_ms := (last_timestamp_ms / segment_duration_ms * segment_duration_ms) - 2000
```

If the resulting `time_ms` is not positive, retry [phone.getGroupCallStreamChannels](/method/phone.getGroupCallStreamChannels.md) after one second.

In RTMP mode audio and video are muxed together into a single `unified` channel: fetching a chunk with `video_channel = 1` returns both the audio and the video of that segment. In tgcalls this "unified broadcast" path always requests channel `1` at full quality and demuxes the audio and video tracks out of the same downloaded part ([`requestSegmentsIfNeeded` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L902) and [unified-part decode](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L925-L932)).

##### Automatically-scaled stream mode

Here [phone.getGroupCallStreamChannels](/method/phone.getGroupCallStreamChannels.md) is not used. The current stream timestamp is instead derived from the client's locally-synced approximate server time (the same server time obtained from the MTProto message ID sequence, see [`TimestampInMsFromMsgId` &raquo;](https://github.com/telegramdesktop/tdesktop/blob/cb9750427f57e5518ddb8a0fda9f0bb2291c487f/Telegram/SourceFiles/calls/group/calls_group_call.cpp#L75-L77) and [`approximateServerTimeInMs` &raquo;](https://github.com/telegramdesktop/tdesktop/blob/cb9750427f57e5518ddb8a0fda9f0bb2291c487f/Telegram/SourceFiles/calls/group/calls_group_call.cpp#L3379-L3382)): round it down to a multiple of the segment duration, subtract the desired playback buffer, and increment from there ([`requestSegmentsIfNeeded` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L643)). The segment duration is a fixed 1000 milliseconds (i.e. `scale = 0`) and the default playback buffer is 2000 milliseconds ([`_segmentDuration`/`_segmentBufferDuration` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L1048-L1049)).

Unlike RTMP mode, audio and each publisher's video are downloaded as **separate** chunks ([`beginPartTask` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L898-L902)):

- To fetch the whole call's mixed audio, omit both `video_channel` and `video_quality`, yielding an audio-only chunk.
- To fetch a specific publisher's video, set `video_channel` to that publisher's channel ID (see below) and `video_quality` to the desired quality.

The video channel IDs are derived from the audio chunks: each mixed-audio (OGG) chunk embeds a mapping from publisher WebRTC endpoint IDs to zero-based channel indices, exposed via the `ENDPOINTS` and `ACTIVE_MASK` stream metadata ([`AudioStreamingPartInternal` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/AudioStreamingPartInternal.cpp#L165-L189)). To play a given publisher's video, look up its endpoint ID in this mapping and pass `mapping_index + 1` as [inputGroupCallStream](/constructor/inputGroupCallStream.md).`video_channel` ([`requestSegmentsIfNeeded` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp#L698-L707)). The set of publishers whose video to display (and at which quality) is taken from the group call participant list, exactly as for a normal WebRTC video chat.

Reference implementation: [tgcalls `StreamingMediaContext` &raquo;](https://github.com/TelegramMessenger/tgcalls/blob/616810f1539e3f5ee917fff42557c5eeb8b4be40/tgcalls/group/StreamingMediaContext.cpp), driven by tdesktop's [`GroupCall` &raquo;](https://github.com/telegramdesktop/tdesktop/blob/cb9750427f57e5518ddb8a0fda9f0bb2291c487f/Telegram/SourceFiles/calls/group/calls_group_call.cpp).

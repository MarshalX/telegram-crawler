# Rank


Members in group chats (both basic groups and supergroups) can now add a **tag** next to their name — to show their role at work, what they study in school, and more.  

    channelParticipant#1bd54456 flags:# user_id:long date:int subscription_until_date:flags.0?int rank:flags.2?string = ChannelParticipant;
    channelParticipantSelf#a9478a1a flags:# via_request:flags.0?true user_id:long inviter_id:long date:int subscription_until_date:flags.1?int rank:flags.2?string = ChannelParticipant;
    channelParticipantCreator#2fe601d3 flags:# user_id:long admin_rights:ChatAdminRights rank:flags.0?string = ChannelParticipant;
    channelParticipantAdmin#34c3bb53 flags:# can_edit:flags.0?true self:flags.1?true user_id:long inviter_id:flags.1?long promoted_by:long date:int admin_rights:ChatAdminRights rank:flags.2?string = ChannelParticipant;
    channelParticipantBanned#d5f0ad91 flags:# left:flags.0?true peer:Peer kicked_by:long date:int banned_rights:ChatBannedRights rank:flags.2?string = ChannelParticipant;
    channelParticipantLeft#1b03f006 peer:Peer = ChannelParticipant;
    
    channels.channelParticipant#dfb80317 participant:ChannelParticipant chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipant;

    updateChatParticipantRank#bd8367b9 chat_id:long user_id:long rank:string version:int = Update;

    chatParticipant#38e79fde flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;
    chatParticipantCreator#e1f867b8 flags:# user_id:long rank:flags.0?string = ChatParticipant;
    chatParticipantAdmin#360d5d2 flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;

    chatParticipantsForbidden#8763d3e1 flags:# chat_id:long self_participant:flags.0?ChatParticipant = ChatParticipants;
    chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;

    chatFull#2633421b flags:# can_set_username:flags.7?true has_scheduled:flags.8?true translations_disabled:flags.19?true id:long about:string participants:ChatParticipants chat_photo:flags.2?Photo notify_settings:PeerNotifySettings exported_invite:flags.13?ExportedChatInvite bot_info:flags.3?Vector<BotInfo> pinned_msg_id:flags.6?int folder_id:flags.11?int call:flags.12?InputGroupCall ttl_period:flags.14?int groupcall_default_join_as:flags.15?Peer theme_emoticon:flags.16?string requests_pending:flags.17?int recent_requesters:flags.17?Vector<long> available_reactions:flags.18?ChatReactions reactions_limit:flags.20?int = ChatFull;

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;

    ---functions---

    messages.editChatParticipantRank#a00f32b0 peer:InputPeer participant:InputPeer rank:string = Updates;

    channels.getParticipant#a0ab6cc6 channel:InputChannel participant:InputPeer = channels.ChannelParticipant;
    channels.getParticipants#77ced9d0 channel:InputChannel filter:ChannelParticipantsFilter offset:int limit:int hash:long = channels.ChannelParticipants;

    channels.editAdmin#9a98ad68 flags:# channel:InputChannel user_id:InputUser admin_rights:ChatAdminRights rank:flags.0?string = Updates;

Members in group chats (both basic groups and supergroups) can now add a **tag** next to their name — to show their role at work, what they study in school, and more.  

Use [messages.editChatParticipantRank](/method/messages.editChatParticipantRank.md) to edit the tag, passing the following params:

- `peer`: The group
- `user_id`: The user whose rank should be changed. 
  Admins with the `manage_ranks` [admin right &raquo;](/api/rights.md#admin-rights) can modify the rank of any member.  
  Everyone else can only modify their own rank, but only if either:
  - The chat's [default rights](/api/rights.md#banned-rights) allow using `edit_rank` AND/OR
  - The user's [banned rights](/api/rights.md#banned-rights) allow using `edit_rank`
- `rank`: The new tag (max 16 chars, no emojis)

The tag will be available in the following places for [supergroups](/api/channel.md#supergroups):

- In the [message](/constructor/message.md).`from_rank` flag of all messages sent by group members 
- In the [ChannelParticipant](/type/ChannelParticipant.md).`rank` flag, fetchable using [channels.getParticipant](/method/channels.getParticipant.md)/[channels.getParticipants](/method/channels.getParticipants.md) 

The tag will be available in the following places for [basic groups](/api/channel.md#basic-groups):  

- In the [ChatParticipant](/type/ChatParticipant.md).`rank` flag, available in [chatFull](/constructor/chatFull.md).`participants`, [must always be locally cached &raquo;](/api/channel.md#basic-group-participants) 
- Changes to the tag of users will be emitted as [updateChatParticipantRank](/constructor/updateChatParticipantRank.md) updates (only for basic groups, supergroups don't need this as [message](/constructor/message.md).`from_rank` will always contain the updated rank)
- [message](/constructor/message.md).`from_rank` will **not** be populated for basic groups: clients should instead extract tags from [ChatParticipant](/type/ChatParticipant.md).`rank` for all basic group members

Admins also have a tag, which is always colored with the peer's [color &raquo;](/api/colors.md), to distinguish them from non-admins.

Only for admins and the creator, clients should default to showing "Owner"/"Admin" for [channelParticipantCreator](/constructor/channelParticipantCreator.md)/[channelParticipantAdmin](/constructor/channelParticipantAdmin.md) if the `rank` flag is not set.  

Both [messages.editChatParticipantRank](/method/messages.editChatParticipantRank.md) and [channels.editAdmin](/method/channels.editAdmin.md) can be used to edit the tags of supergroup admins.  

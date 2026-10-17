# Update

Object contains info on events occurred.

```tl
updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
updateMessageID#4e90bfd6 id:int random_id:long = Update;
updateDeleteMessages#a20db0e5 messages:Vector<int> pts:int pts_count:int = Update;
updateUserTyping#2a17bf5c flags:# user_id:long top_msg_id:flags.0?int action:SendMessageAction = Update;
updateChatUserTyping#83487af0 chat_id:long from_id:Peer action:SendMessageAction = Update;
updateChatParticipants#7761198 participants:ChatParticipants = Update;
updateUserStatus#e5bdf8de user_id:long status:UserStatus = Update;
updateUserName#a7848924 user_id:long first_name:string last_name:string usernames:Vector<Username> = Update;
updateNewAuthorization#8951abef flags:# unconfirmed:flags.0?true hash:long date:flags.0?int device:flags.0?string location:flags.0?string = Update;
updateNewEncryptedMessage#12bcbd9a message:EncryptedMessage qts:int = Update;
updateEncryptedChatTyping#1710f156 chat_id:int = Update;
updateEncryption#b4a2e88d chat:EncryptedChat date:int = Update;
updateEncryptedMessagesRead#38fe25b7 chat_id:int max_date:int date:int = Update;
updateChatParticipantAdd#3dda5451 chat_id:long user_id:long inviter_id:long date:int version:int = Update;
updateChatParticipantDelete#e32f3d77 chat_id:long user_id:long version:int = Update;
updateDcOptions#8e5e9873 dc_options:Vector<DcOption> = Update;
updateNotifySettings#bec268ef peer:NotifyPeer notify_settings:PeerNotifySettings = Update;
updateServiceNotification#ebe46819 flags:# popup:flags.0?true invert_media:flags.2?true inbox_date:flags.1?int type:string message:string media:MessageMedia entities:Vector<MessageEntity> = Update;
updatePrivacy#ee3b272a key:PrivacyKey rules:Vector<PrivacyRule> = Update;
updateUserPhone#5492a13 user_id:long phone:string = Update;
updateReadHistoryInbox#9e84bc99 flags:# folder_id:flags.0?int peer:Peer top_msg_id:flags.1?int max_id:int still_unread_count:int pts:int pts_count:int = Update;
updateReadHistoryOutbox#2f2f21bf peer:Peer max_id:int pts:int pts_count:int = Update;
updateWebPage#7f891213 webpage:WebPage pts:int pts_count:int = Update;
updateReadMessagesContents#f8227181 flags:# messages:Vector<int> pts:int pts_count:int date:flags.0?int = Update;
updateChannelTooLong#108d941f flags:# channel_id:long pts:flags.0?int = Update;
updateChannel#635b4c09 channel_id:long = Update;
updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;
updateReadChannelInbox#922e6e10 flags:# folder_id:flags.0?int channel_id:long max_id:int still_unread_count:int pts:int = Update;
updateDeleteChannelMessages#c32d5b12 channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
updateChannelMessageViews#f226ac08 channel_id:long id:int views:int = Update;
updateChatParticipantAdmin#d7ca61a2 chat_id:long user_id:long is_admin:Bool version:int = Update;
updateNewStickerSet#688a30aa stickerset:messages.StickerSet = Update;
updateStickerSetsOrder#bb2d201 flags:# masks:flags.0?true emojis:flags.1?true order:Vector<long> = Update;
updateStickerSets#31c24808 flags:# masks:flags.0?true emojis:flags.1?true = Update;
updateSavedGifs#9375341e = Update;
updateBotInlineQuery#496f379c flags:# query_id:long user_id:long query:string geo:flags.0?GeoPoint peer_type:flags.1?InlineQueryPeerType offset:string = Update;
updateBotInlineSend#12f12a07 flags:# user_id:long query:string geo:flags.0?GeoPoint id:string msg_id:flags.1?InputBotInlineMessageID = Update;
updateEditChannelMessage#1b3f4df7 message:Message pts:int pts_count:int = Update;
updateBotCallbackQuery#b9cfc48d flags:# query_id:long user_id:long peer:Peer msg_id:int chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
updateEditMessage#e40370a3 message:Message pts:int pts_count:int = Update;
updateInlineBotCallbackQuery#691e9052 flags:# query_id:long user_id:long msg_id:InputBotInlineMessageID chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
updateReadChannelOutbox#b75f99a9 channel_id:long max_id:int = Update;
updateDraftMessage#edfc111e flags:# peer:Peer top_msg_id:flags.0?int saved_peer_id:flags.1?Peer draft:DraftMessage = Update;
updateReadFeaturedStickers#571d2742 = Update;
updateRecentStickers#9a422c20 = Update;
updateConfig#a229dd06 = Update;
updatePtsChanged#3354678f = Update;
updateChannelWebPage#2f2ba99f channel_id:long webpage:WebPage pts:int pts_count:int = Update;
updateDialogPinned#6e6fe51c flags:# pinned:flags.0?true folder_id:flags.1?int peer:DialogPeer = Update;
updatePinnedDialogs#fa0f3ca2 flags:# folder_id:flags.1?int order:flags.0?Vector<DialogPeer> = Update;
updateBotWebhookJSON#8317c0c3 data:DataJSON = Update;
updateBotWebhookJSONQuery#9b9240a6 query_id:long data:DataJSON timeout:int = Update;
updateBotShippingQuery#b5aefd7d query_id:long user_id:long payload:bytes shipping_address:PostAddress = Update;
updateBotPrecheckoutQuery#8caa9a96 flags:# query_id:long user_id:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string currency:string total_amount:long = Update;
updatePhoneCall#ab0f6b1e phone_call:PhoneCall = Update;
updateLangPackTooLong#46560264 lang_code:string = Update;
updateLangPack#56022f4d difference:LangPackDifference = Update;
updateFavedStickers#e511996d = Update;
updateChannelReadMessagesContents#25f324f7 flags:# channel_id:long top_msg_id:flags.0?int saved_peer_id:flags.1?Peer messages:Vector<int> = Update;
updateContactsReset#7084a7be = Update;
updateChannelAvailableMessages#b23fc698 channel_id:long available_min_id:int = Update;
updateDialogUnreadMark#b658f23e flags:# unread:flags.0?true peer:DialogPeer saved_peer_id:flags.1?Peer = Update;
updateMessagePoll#d64c522b flags:# peer:flags.1?Peer msg_id:flags.1?int top_msg_id:flags.2?int poll_id:long poll:flags.0?Poll results:PollResults = Update;
updateChatDefaultBannedRights#54c01850 peer:Peer default_banned_rights:ChatBannedRights version:int = Update;
updateFolderPeers#19360dc0 folder_peers:Vector<FolderPeer> pts:int pts_count:int = Update;
updatePeerSettings#6a7e7366 peer:Peer settings:PeerSettings = Update;
updatePeerLocated#b4afcfb0 peers:Vector<PeerLocated> = Update;
updateNewScheduledMessage#39a51dfb message:Message = Update;
updateDeleteScheduledMessages#f2a71983 flags:# peer:Peer messages:Vector<int> sent_messages:flags.0?Vector<int> = Update;
updateTheme#8216fba3 theme:Theme = Update;
updateGeoLiveViewed#871fb939 peer:Peer msg_id:int = Update;
updateLoginToken#564fe691 = Update;
updateMessagePollVote#7699f014 poll_id:long peer:Peer options:Vector<bytes> positions:Vector<int> qts:int = Update;
updateDialogFilter#26ffde7d flags:# id:int filter:flags.0?DialogFilter = Update;
updateDialogFilterOrder#a5d72105 order:Vector<int> = Update;
updateDialogFilters#3504914f = Update;
updatePhoneCallSignalingData#2661bf09 phone_call_id:long data:bytes = Update;
updateChannelMessageForwards#d29a27f4 channel_id:long id:int forwards:int = Update;
updateReadChannelDiscussionInbox#d6b19546 flags:# channel_id:long top_msg_id:int read_max_id:int broadcast_id:flags.0?long broadcast_post:flags.0?int = Update;
updateReadChannelDiscussionOutbox#695c9e7c channel_id:long top_msg_id:int read_max_id:int = Update;
updatePeerBlocked#ebe07752 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer = Update;
updateChannelUserTyping#8c88c923 flags:# channel_id:long top_msg_id:flags.0?int from_id:Peer action:SendMessageAction = Update;
updatePinnedMessages#ed85eab5 flags:# pinned:flags.0?true peer:Peer messages:Vector<int> pts:int pts_count:int = Update;
updatePinnedChannelMessages#5bb98608 flags:# pinned:flags.0?true channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
updateChat#f89a6a4e chat_id:long = Update;
updateGroupCallParticipants#f2ebdb4e call:InputGroupCall participants:Vector<GroupCallParticipant> version:int = Update;
updateGroupCall#9d2216e0 flags:# live_story:flags.2?true peer:flags.1?Peer call:GroupCall = Update;
updatePeerHistoryTTL#bb9bb9a5 flags:# peer:Peer ttl_period:flags.0?int = Update;
updateChatParticipant#d087663a flags:# chat_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChatParticipant new_participant:flags.1?ChatParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
updateChannelParticipant#985d3abb flags:# via_chatlist:flags.3?true channel_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChannelParticipant new_participant:flags.1?ChannelParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
updateBotStopped#c4870a49 user_id:long date:int stopped:Bool qts:int = Update;
updateGroupCallConnection#b783982 flags:# presentation:flags.0?true params:DataJSON = Update;
updateBotCommands#4d712f2e peer:Peer bot_id:long commands:Vector<BotCommand> = Update;
updatePendingJoinRequests#7063c3db peer:Peer requests_pending:int recent_requesters:Vector<long> = Update;
updateBotChatInviteRequester#11dfa986 peer:Peer date:int user_id:long about:string invite:ExportedChatInvite qts:int = Update;
updateMessageReactions#1e297bfa flags:# peer:Peer msg_id:int top_msg_id:flags.0?int saved_peer_id:flags.1?Peer reactions:MessageReactions = Update;
updateAttachMenuBots#17b7a20b = Update;
updateWebViewResultSent#1592b79d query_id:long = Update;
updateBotMenuButton#14b85813 bot_id:long button:BotMenuButton = Update;
updateSavedRingtones#74d8be99 = Update;
updateTranscribedAudio#84cd5a flags:# pending:flags.0?true peer:Peer msg_id:int transcription_id:long text:string = Update;
updateReadFeaturedEmojiStickers#fb4c496c = Update;
updateUserEmojiStatus#28373599 user_id:long emoji_status:EmojiStatus = Update;
updateRecentEmojiStatuses#30f443db = Update;
updateRecentReactions#6f7863f4 = Update;
updateMoveStickerSetToTop#86fccf85 flags:# masks:flags.0?true emojis:flags.1?true stickerset:long = Update;
updateMessageExtendedMedia#d5a41724 peer:Peer msg_id:int extended_media:Vector<MessageExtendedMedia> = Update;
updateUser#20529438 user_id:long = Update;
updateAutoSaveSettings#ec05b097 = Update;
updateStory#75b3b798 peer:Peer story:StoryItem = Update;
updateReadStories#f74e932b peer:Peer max_id:int = Update;
updateStoryID#1bf335b9 id:int random_id:long = Update;
updateStoriesStealthMode#2c084dc1 stealth_mode:StoriesStealthMode = Update;
updateSentStoryReaction#7d627683 peer:Peer story_id:int reaction:Reaction = Update;
updateBotChatBoost#904dd49c peer:Peer boost:Boost qts:int = Update;
updateChannelViewForumAsMessages#7b68920 channel_id:long enabled:Bool = Update;
updatePeerWallpaper#ae3f101d flags:# wallpaper_overridden:flags.1?true peer:Peer wallpaper:flags.0?WallPaper = Update;
updateBotMessageReaction#ac21d3ce peer:Peer msg_id:int date:int actor:Peer old_reactions:Vector<Reaction> new_reactions:Vector<Reaction> qts:int = Update;
updateBotMessageReactions#9cb7759 peer:Peer msg_id:int date:int reactions:Vector<ReactionCount> qts:int = Update;
updateSavedDialogPinned#aeaf9e74 flags:# pinned:flags.0?true peer:DialogPeer = Update;
updatePinnedSavedDialogs#686c85a6 flags:# order:flags.0?Vector<DialogPeer> = Update;
updateSavedReactionTags#39c67432 = Update;
updateSmsJob#f16269d4 job_id:string = Update;
updateQuickReplies#f9470ab2 quick_replies:Vector<QuickReply> = Update;
updateNewQuickReply#f53da717 quick_reply:QuickReply = Update;
updateDeleteQuickReply#53e6f1ec shortcut_id:int = Update;
updateQuickReplyMessage#3e050d0f message:Message = Update;
updateDeleteQuickReplyMessages#566fe7cd shortcut_id:int messages:Vector<int> = Update;
updateBotBusinessConnect#8ae5c97a connection:BotBusinessConnection qts:int = Update;
updateBotNewBusinessMessage#9ddb347c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
updateBotEditBusinessMessage#7df587c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
updateBotDeleteBusinessMessage#a02a982e connection_id:string peer:Peer messages:Vector<int> qts:int = Update;
updateNewStoryReaction#1824e40b story_id:int peer:Peer reaction:Reaction = Update;
updateStarsBalance#4e80a379 balance:StarsAmount = Update;
updateBusinessBotCallbackQuery#1ea2fda7 flags:# query_id:long user_id:long connection_id:string message:Message reply_to_message:flags.2?Message chat_instance:long data:flags.0?bytes = Update;
updateStarsRevenueStatus#a584b019 peer:Peer status:StarsRevenueStatus = Update;
updateBotPurchasedPaidMedia#283bd312 user_id:long payload:string qts:int = Update;
updatePaidReactionPrivacy#8b725fce private:PaidReactionPrivacy = Update;
updateSentPhoneCode#504aa18f sent_code:auth.SentCode = Update;
updateGroupCallChainBlocks#a477288f call:InputGroupCall sub_chain_id:int blocks:Vector<bytes> next_offset:int = Update;
updateReadMonoForumInbox#77b0e372 channel_id:long saved_peer_id:Peer read_max_id:int = Update;
updateReadMonoForumOutbox#a4a79376 channel_id:long saved_peer_id:Peer read_max_id:int = Update;
updateMonoForumNoPaidException#9f812b08 flags:# exception:flags.0?true channel_id:long saved_peer_id:Peer = Update;
updateGroupCallMessage#d8326f0d call:InputGroupCall message:GroupCallMessage = Update;
updateGroupCallEncryptedMessage#c957a766 call:InputGroupCall from_id:Peer encrypted_message:bytes = Update;
updatePinnedForumTopic#683b2c52 flags:# pinned:flags.0?true peer:Peer topic_id:int = Update;
updatePinnedForumTopics#def143d0 flags:# peer:Peer order:flags.0?Vector<int> = Update;
updateDeleteGroupCallMessages#3e85e92c call:InputGroupCall messages:Vector<int> = Update;
updateStarGiftAuctionState#48e246c2 gift_id:long state:StarGiftAuctionState = Update;
updateStarGiftAuctionUserState#dc58f31e gift_id:long user_state:StarGiftAuctionUserState = Update;
updateEmojiGameInfo#fb9c547a info:messages.EmojiGameInfo = Update;
updateStarGiftCraftFail#ac072444 = Update;
updateChatParticipantRank#bd8367b9 chat_id:long user_id:long rank:string version:int = Update;
updateManagedBot#4880ed9a user_id:long bot_id:long qts:int = Update;
updateBotGuestChatQuery#cdd4093d flags:# query_id:long message:Message reference_messages:flags.0?Vector<Message> qts:int = Update;
updateAiComposeTones#8c0f91fb = Update;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [updateNewMessage](/constructor/updateNewMessage.md) | New message in a private chat or in a [basic group](/api/channel.md#basic-groups). |
| [updateMessageID](/constructor/updateMessageID.md) | Sent message with **random\_id** client identifier was assigned an identifier. |
| [updateDeleteMessages](/constructor/updateDeleteMessages.md) | Messages were deleted. |
| [updateUserTyping](/constructor/updateUserTyping.md) | The user is preparing a message; typing, recording, uploading, etc. This update is valid for 6 seconds. If no further updates of this kind are received after 6 seconds, it should be considered that the user stopped doing whatever they were doing |
| [updateChatUserTyping](/constructor/updateChatUserTyping.md) | The user is preparing a message in a group; typing, recording, uploading, etc. This update is valid for 6 seconds. If no further updates of this kind are received after 6 seconds, it should be considered that the user stopped doing whatever they were doing |
| [updateChatParticipants](/constructor/updateChatParticipants.md) | The participants of a [basic group »](/api/channel.md#basic-groups) changed. |
| [updateUserStatus](/constructor/updateUserStatus.md) | Contact status update. |
| [updateUserName](/constructor/updateUserName.md) | Changes the user's first name, last name and username. |
| [updateNewAuthorization](/constructor/updateNewAuthorization.md) | A new session logged into the current user's account through an unknown device. |
| [updateNewEncryptedMessage](/constructor/updateNewEncryptedMessage.md) | New encrypted message. |
| [updateEncryptedChatTyping](/constructor/updateEncryptedChatTyping.md) | Interlocutor is typing a message in an encrypted chat. Update period is 6 second. If upon this time there is no repeated update, it shall be considered that the interlocutor stopped typing. |
| [updateEncryption](/constructor/updateEncryption.md) | Change of state in an encrypted chat. |
| [updateEncryptedMessagesRead](/constructor/updateEncryptedMessagesRead.md) | Communication history in an encrypted chat was marked as read. |
| [updateChatParticipantAdd](/constructor/updateChatParticipantAdd.md) | New group member. |
| [updateChatParticipantDelete](/constructor/updateChatParticipantDelete.md) | A member has left the [basic group](/api/channel.md#basic-groups). |
| [updateDcOptions](/constructor/updateDcOptions.md) | Changes in the data center configuration options. |
| [updateNotifySettings](/constructor/updateNotifySettings.md) | Changes in notification settings. |
| [updateServiceNotification](/constructor/updateServiceNotification.md) | A service message for the user.\
\
The app must show the message to the user upon receiving this update. In case the **popup** parameter was passed, the text message must be displayed in a popup alert immediately upon receipt. It is recommended to handle the text as you would an ordinary message in terms of highlighting links, etc. The message must also be stored locally as part of the message history with the user id `777000` (Telegram Notifications). |
| [updatePrivacy](/constructor/updatePrivacy.md) | Privacy rules were changed |
| [updateUserPhone](/constructor/updateUserPhone.md) | A user's phone number was changed |
| [updateReadHistoryInbox](/constructor/updateReadHistoryInbox.md) | Incoming messages were read |
| [updateReadHistoryOutbox](/constructor/updateReadHistoryOutbox.md) | Outgoing messages were read |
| [updateWebPage](/constructor/updateWebPage.md) | An [instant view](https://instantview.telegram.org) webpage preview was generated |
| [updateReadMessagesContents](/constructor/updateReadMessagesContents.md) | Contents of messages in the common [message box](/api/updates.md) were read (emitted specifically for messages like voice messages or video, only once the media is watched and marked as read using [messages.readMessageContents](/method/messages.readMessageContents.md)). |
| [updateChannelTooLong](/constructor/updateChannelTooLong.md) | There are new updates in the specified channel, the client must fetch them manually by invoking [updates.getChannelDifference](/method/updates.getChannelDifference.md) as specified in the [documentation »](/api/updates.md).\
\
If the channel's PTS isn't currently stored in the database (i.e. we joined this channel on another client while the current client was offline), start fetching from the specified pts.\
\
Does **not** necessarily indicate the [channel message box size limit was reached](/api/updates.md#recovering-gaps-for-very-old-messages), it simply indicates that the number of queued updates in a message box is too large to be delivered passively through the socket. |
| [updateChannel](/constructor/updateChannel.md) | Channel/supergroup ([channel](/constructor/channel.md) and/or [channelFull](/constructor/channelFull.md)) information was updated.\
\
This update can only be received through getDifference or in [updates](/constructor/updates.md)/[updatesCombined](/constructor/updatesCombined.md) constructors, so it will **always** come bundled with the updated [channel](/constructor/channel.md), that should be applied [as usual »](/api/peers.md), **without** re-fetching the info manually.\
\
However, full peer information will not come bundled in updates, so the full peer cache ([channelFull](/constructor/channelFull.md)) must be invalidated for `channel_id` when receiving this update. |
| [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) | A new message was sent in a [channel/supergroup](/api/channel.md) |
| [updateReadChannelInbox](/constructor/updateReadChannelInbox.md) | Incoming messages in a [channel/supergroup](/api/channel.md) were read |
| [updateDeleteChannelMessages](/constructor/updateDeleteChannelMessages.md) | Some messages in a [supergroup/channel](/api/channel.md) were deleted |
| [updateChannelMessageViews](/constructor/updateChannelMessageViews.md) | The view counter of a message in a channel has changed |
| [updateChatParticipantAdmin](/constructor/updateChatParticipantAdmin.md) | Admin permissions of a user in a [basic group](/api/channel.md#basic-groups) were changed |
| [updateNewStickerSet](/constructor/updateNewStickerSet.md) | A new stickerset was installed |
| [updateStickerSetsOrder](/constructor/updateStickerSetsOrder.md) | The order of stickersets was changed |
| [updateStickerSets](/constructor/updateStickerSets.md) | Installed stickersets have changed, the client should refetch them as [described in the docs](/api/stickers.md#installing-stickersets). |
| [updateSavedGifs](/constructor/updateSavedGifs.md) | The saved gif list has changed, the client should refetch it using [messages.getSavedGifs](/method/messages.getSavedGifs.md) |
| [updateBotInlineQuery](/constructor/updateBotInlineQuery.md) | An incoming inline query |
| [updateBotInlineSend](/constructor/updateBotInlineSend.md) | The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the [feedback collecting](/bots/inline.md#collecting-feedback) for details on how to enable these updates for your bot. |
| [updateEditChannelMessage](/constructor/updateEditChannelMessage.md) | A message was edited in a [channel/supergroup](/api/channel.md) |
| [updateBotCallbackQuery](/constructor/updateBotCallbackQuery.md) | A callback button was pressed, and the button data was sent to the bot that created the button |
| [updateEditMessage](/constructor/updateEditMessage.md) | A message was edited |
| [updateInlineBotCallbackQuery](/constructor/updateInlineBotCallbackQuery.md) | This notification is received by bots when a button is pressed |
| [updateReadChannelOutbox](/constructor/updateReadChannelOutbox.md) | Outgoing messages in a [channel/supergroup](/api/channel.md) were read |
| [updateDraftMessage](/constructor/updateDraftMessage.md) | Notifies a change of a message [draft](/api/drafts.md). |
| [updateReadFeaturedStickers](/constructor/updateReadFeaturedStickers.md) | Some featured stickers were marked as read |
| [updateRecentStickers](/constructor/updateRecentStickers.md) | The recent sticker list was updated |
| [updateConfig](/constructor/updateConfig.md) | The server-side configuration has changed; the client should re-fetch the config using [help.getConfig](/method/help.getConfig.md) and [help.getAppConfig](/method/help.getAppConfig.md). |
| [updatePtsChanged](/constructor/updatePtsChanged.md) | [Common message box sequence PTS](/api/updates.md) has changed, [state has to be refetched using updates.getState](/api/updates.md#fetching-state) |
| [updateChannelWebPage](/constructor/updateChannelWebPage.md) | A webpage preview of a link in a [channel/supergroup](/api/channel.md) message was generated |
| [updateDialogPinned](/constructor/updateDialogPinned.md) | A dialog was pinned/unpinned |
| [updatePinnedDialogs](/constructor/updatePinnedDialogs.md) | Pinned dialogs were updated |
| [updateBotWebhookJSON](/constructor/updateBotWebhookJSON.md) | A new incoming event; for bots only |
| [updateBotWebhookJSONQuery](/constructor/updateBotWebhookJSONQuery.md) | A new incoming query; for bots only |
| [updateBotShippingQuery](/constructor/updateBotShippingQuery.md) | This object contains information about an incoming shipping query. |
| [updateBotPrecheckoutQuery](/constructor/updateBotPrecheckoutQuery.md) | This object contains information about an incoming pre-checkout query. |
| [updatePhoneCall](/constructor/updatePhoneCall.md) | An incoming phone call |
| [updateLangPackTooLong](/constructor/updateLangPackTooLong.md) | A language pack has changed, the client should manually fetch the changed strings using [langpack.getDifference](/method/langpack.getDifference.md) |
| [updateLangPack](/constructor/updateLangPack.md) | Language pack updated |
| [updateFavedStickers](/constructor/updateFavedStickers.md) | The list of favorited stickers was changed, the client should call [messages.getFavedStickers](/method/messages.getFavedStickers.md) to refetch the new list |
| [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md) | The specified [channel/supergroup](/api/channel.md) messages were read (emitted specifically for messages like voice messages or video, only once the media is watched and marked as read using [channels.readMessageContents](/method/channels.readMessageContents.md)) |
| [updateContactsReset](/constructor/updateContactsReset.md) | All contacts were deleted |
| [updateChannelAvailableMessages](/constructor/updateChannelAvailableMessages.md) | The history of a [channel/supergroup](/api/channel.md) was hidden. |
| [updateDialogUnreadMark](/constructor/updateDialogUnreadMark.md) | The manual unread mark of a chat was changed |
| [updateMessagePoll](/constructor/updateMessagePoll.md) | The results of a poll have changed |
| [updateChatDefaultBannedRights](/constructor/updateChatDefaultBannedRights.md) | Default banned rights in a [basic group](/api/channel.md#basic-groups) were updated |
| [updateFolderPeers](/constructor/updateFolderPeers.md) | The peer list of a [peer folder](/api/folders.md#peer-folders) was updated |
| [updatePeerSettings](/constructor/updatePeerSettings.md) | Settings of a certain peer have changed |
| [updatePeerLocated](/constructor/updatePeerLocated.md) | List of peers near you was updated |
| [updateNewScheduledMessage](/constructor/updateNewScheduledMessage.md) | A message was added to the [schedule queue of a chat](/api/scheduled-messages.md) |
| [updateDeleteScheduledMessages](/constructor/updateDeleteScheduledMessages.md) | Some [scheduled messages](/api/scheduled-messages.md) were deleted (or sent) from the schedule queue of a chat |
| [updateTheme](/constructor/updateTheme.md) | A cloud theme was updated |
| [updateGeoLiveViewed](/constructor/updateGeoLiveViewed.md) | Live geoposition message was viewed |
| [updateLoginToken](/constructor/updateLoginToken.md) | A login token (for login via QR code) was accepted. |
| [updateMessagePollVote](/constructor/updateMessagePollVote.md) | A specific peer has voted in a poll (this update can only be received by a bot). |
| [updateDialogFilter](/constructor/updateDialogFilter.md) | A new [folder](/api/folders.md) was added |
| [updateDialogFilterOrder](/constructor/updateDialogFilterOrder.md) | New [folder](/api/folders.md) order |
| [updateDialogFilters](/constructor/updateDialogFilters.md) | Clients should update [folder](/api/folders.md) info |
| [updatePhoneCallSignalingData](/constructor/updatePhoneCallSignalingData.md) | Incoming phone call signaling payload |
| [updateChannelMessageForwards](/constructor/updateChannelMessageForwards.md) | The forward counter of a message in a channel has changed |
| [updateReadChannelDiscussionInbox](/constructor/updateReadChannelDiscussionInbox.md) | Incoming comments in a [discussion thread](/api/threads.md) were marked as read |
| [updateReadChannelDiscussionOutbox](/constructor/updateReadChannelDiscussionOutbox.md) | Outgoing comments in a [discussion thread](/api/threads.md) were marked as read |
| [updatePeerBlocked](/constructor/updatePeerBlocked.md) | We blocked a peer, see [here »](/api/block.md) for more info on blocklists. |
| [updateChannelUserTyping](/constructor/updateChannelUserTyping.md) | A user is typing in a [supergroup, channel](/api/channel.md) or [message thread](/api/threads.md) |
| [updatePinnedMessages](/constructor/updatePinnedMessages.md) | Some messages were pinned in a chat |
| [updatePinnedChannelMessages](/constructor/updatePinnedChannelMessages.md) | Messages were pinned/unpinned in a [channel/supergroup](/api/channel.md) |
| [updateChat](/constructor/updateChat.md) | Chat ([chat](/constructor/chat.md) and/or [chatFull](/constructor/chatFull.md)) information was updated.\
\
This update can only be received through getDifference or in [updates](/constructor/updates.md)/[updatesCombined](/constructor/updatesCombined.md) constructors, so it will **always** come bundled with the updated [chat](/constructor/chat.md), that should be applied [as usual »](/api/peers.md), **without** re-fetching the info manually.\
\
However, full peer information will not come bundled in updates, so the full peer cache ([chatFull](/constructor/chatFull.md)) must be invalidated for `chat_id` when receiving this update. |
| [updateGroupCallParticipants](/constructor/updateGroupCallParticipants.md) | The participant list of a [group call](/api/group-calls.md#applying-group-call-updates) has changed. |
| [updateGroupCall](/constructor/updateGroupCall.md) | Indicates that group call information changed, see [applying group call updates »](/api/group-calls.md#applying-group-call-updates). |
| [updatePeerHistoryTTL](/constructor/updatePeerHistoryTTL.md) | The Time-To-Live for messages sent by the current user in a specific chat has changed |
| [updateChatParticipant](/constructor/updateChatParticipant.md) | A user has joined or left a specific [basic group »](/api/channel.md#basic-groups): this update can only be received by bots, see [here »](/api/peers.md#basic-group-updates) for the user version of this update. |
| [updateChannelParticipant](/constructor/updateChannelParticipant.md) | A participant has left, joined, was banned or admined in a [channel or supergroup](/api/channel.md). |
| [updateBotStopped](/constructor/updateBotStopped.md) | A bot was stopped or re-started. |
| [updateGroupCallConnection](/constructor/updateGroupCallConnection.md) | Connection parameters returned after joining a group call, see [presentations »](/api/group-calls.md#presentations) and [stream mode »](/api/group-calls.md#stream-mode).\
\
If `presentation` is set, the parameters belong to the separate [presentation connection](/api/group-calls.md#presentations); otherwise they belong to the main connection.\
\
For a normal WebRTC connection, pass `params` to the local tgcalls group-call engine as its join response payload.\
\
For [stream-mode calls](/api/group-calls.md#detecting-stream-mode), where the client plays the call by [downloading media chunks »](/api/group-calls.md#downloading-media-chunks) instead of using WebRTC, `params` instead has one of the following shapes:\
\
```json\
{\
  "stream": true\
}\
```\
\
for a call that entered [stream mode](/api/group-calls.md#stream-mode), or\
\
```json\
{\
  "stream": true,\
  "rtmp": true\
}\
```\
\
for an [RTMP-mode call](/api/group-calls.md#creating-and-publishing-an-rtmp-livestream). |
| [updateBotCommands](/constructor/updateBotCommands.md) | The [command set](/api/bots/commands.md) of a certain bot in a certain chat has changed. |
| [updatePendingJoinRequests](/constructor/updatePendingJoinRequests.md) | Someone has requested to join a chat or channel |
| [updateBotChatInviteRequester](/constructor/updateBotChatInviteRequester.md) | Someone has requested to join a chat or channel (bots only, users will receive an [updatePendingJoinRequests](/constructor/updatePendingJoinRequests.md), instead) |
| [updateMessageReactions](/constructor/updateMessageReactions.md) | New [message reactions »](/api/reactions.md) are available |
| [updateAttachMenuBots](/constructor/updateAttachMenuBots.md) | The list of installed [attachment menu entries »](/api/bots/attach.md) has changed, use [messages.getAttachMenuBots](/method/messages.getAttachMenuBots.md) to fetch the updated list. |
| [updateWebViewResultSent](/constructor/updateWebViewResultSent.md) | Indicates to a bot that a webview was closed and an inline message was sent on behalf of the user using [messages.sendWebViewResultMessage](/method/messages.sendWebViewResultMessage.md) |
| [updateBotMenuButton](/constructor/updateBotMenuButton.md) | The menu button behavior for the specified bot has changed |
| [updateSavedRingtones](/constructor/updateSavedRingtones.md) | The list of saved notification sounds has changed, use [account.getSavedRingtones](/method/account.getSavedRingtones.md) to fetch the new list. |
| [updateTranscribedAudio](/constructor/updateTranscribedAudio.md) | A pending [voice message transcription »](/api/transcribe.md) initiated with [messages.transcribeAudio](/method/messages.transcribeAudio.md) was updated. |
| [updateReadFeaturedEmojiStickers](/constructor/updateReadFeaturedEmojiStickers.md) | Some featured [custom emoji stickers](/api/custom-emoji.md) were marked as read |
| [updateUserEmojiStatus](/constructor/updateUserEmojiStatus.md) | The [emoji status](/api/emoji-status.md) of a certain user has changed |
| [updateRecentEmojiStatuses](/constructor/updateRecentEmojiStatuses.md) | The list of recent [emoji statuses](/api/emoji-status.md) has changed |
| [updateRecentReactions](/constructor/updateRecentReactions.md) | The list of recent [message reactions](/api/reactions.md) has changed |
| [updateMoveStickerSetToTop](/constructor/updateMoveStickerSetToTop.md) | A stickerset was just moved to top, [see here for more info »](/api/stickers.md#recent-stickersets) |
| [updateMessageExtendedMedia](/constructor/updateMessageExtendedMedia.md) | You [bought a paid media »](/api/paid-media.md): this update contains the revealed media. |
| [updateUser](/constructor/updateUser.md) | User ([user](/constructor/user.md) and/or [userFull](/constructor/userFull.md)) information was updated.\
\
This update can only be received through getDifference or in [updates](/constructor/updates.md)/[updatesCombined](/constructor/updatesCombined.md) constructors, so it will **always** come bundled with the updated [user](/constructor/user.md), that should be applied [as usual »](/api/peers.md), **without** re-fetching the info manually.\
\
However, full peer information will not come bundled in updates, so the full peer cache ([userFull](/constructor/userFull.md)) must be invalidated for `user_id` when receiving this update. |
| [updateAutoSaveSettings](/constructor/updateAutoSaveSettings.md) | Media autosave settings have changed and must be refetched using [account.getAutoSaveSettings](/method/account.getAutoSaveSettings.md). |
| [updateStory](/constructor/updateStory.md) | A new story was posted. |
| [updateReadStories](/constructor/updateReadStories.md) | Stories of a specific peer were marked as read. |
| [updateStoryID](/constructor/updateStoryID.md) | A story was successfully uploaded.\
\
Once a story is successfully uploaded, an [updateStoryID](/constructor/updateStoryID.md) will be returned, indicating the story ID (`id`) that was attributed to the story (like for messages, `random_id` indicates the `random_id` that was passed to [stories.sendStory](/method/stories.sendStory.md): this way, you can tell which story was assigned a specific `id` by checking which [stories.sendStory](/method/stories.sendStory.md) call has the returned `random_id`). |
| [updateStoriesStealthMode](/constructor/updateStoriesStealthMode.md) | Indicates that [stories stealth mode](/api/stories.md#stealth-mode) was activated. |
| [updateSentStoryReaction](/constructor/updateSentStoryReaction.md) | Indicates we [reacted to a story »](/api/stories.md#reactions). |
| [updateBotChatBoost](/constructor/updateBotChatBoost.md) | A [channel/supergroup boost](/api/boost.md) has changed (bots only) |
| [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md) | Users may also choose to display messages from all topics as if they were sent to a normal group, using a "View as messages" setting in the local client.  \
This setting only affects the current account, and is synced to other logged in sessions using the [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md) method; invoking this method will update the value of the `view_forum_as_messages` flag of [channelFull](/constructor/channelFull.md) or [dialog](/constructor/dialog.md) and emit an [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md). |
| [updatePeerWallpaper](/constructor/updatePeerWallpaper.md) | The [wallpaper »](/api/wallpapers.md) of a given peer has changed. |
| [updateBotMessageReaction](/constructor/updateBotMessageReaction.md) | Bots only: a user has changed their reactions on a message with public reactions. |
| [updateBotMessageReactions](/constructor/updateBotMessageReactions.md) | Bots only: the number of reactions on a message with anonymous reactions has changed. |
| [updateSavedDialogPinned](/constructor/updateSavedDialogPinned.md) | A [saved message dialog](/api/saved-messages.md) was pinned/unpinned |
| [updatePinnedSavedDialogs](/constructor/updatePinnedSavedDialogs.md) | [Pinned saved dialogs »](/api/saved-messages.md) were updated |
| [updateSavedReactionTags](/constructor/updateSavedReactionTags.md) | The list of [reaction tag »](/api/saved-messages.md#tags) names assigned by the user has changed and should be refetched using [messages.getSavedReactionTags »](/method/messages.getSavedReactionTags.md). |
| [updateSmsJob](/constructor/updateSmsJob.md) | A new SMS job was received |
| [updateQuickReplies](/constructor/updateQuickReplies.md) | Info about or the order of [quick reply shortcuts »](/api/business.md#quick-reply-shortcuts) was changed. |
| [updateNewQuickReply](/constructor/updateNewQuickReply.md) | A new [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) was created. |
| [updateDeleteQuickReply](/constructor/updateDeleteQuickReply.md) | A [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) was deleted. This will **not** emit [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) updates, even if all the messages in the shortcut are also deleted by this update. |
| [updateQuickReplyMessage](/constructor/updateQuickReplyMessage.md) | A new message was added to a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts). |
| [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) | One or more messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) were deleted. |
| [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) | Connecting or disconnecting a [business bot](/api/bots/connected-business-bots.md) or changing the connection settings will emit an [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) update to the bot, with the new settings and a `connection_id` that will be used by the bot to handle updates from and send messages as the user. |
| [updateBotNewBusinessMessage](/constructor/updateBotNewBusinessMessage.md) | A message was received via a [connected business chat »](/api/bots/connected-business-bots.md). |
| [updateBotEditBusinessMessage](/constructor/updateBotEditBusinessMessage.md) | A message was edited in a [connected business chat »](/api/bots/connected-business-bots.md). |
| [updateBotDeleteBusinessMessage](/constructor/updateBotDeleteBusinessMessage.md) | A message was deleted in a [connected business chat »](/api/bots/connected-business-bots.md). |
| [updateNewStoryReaction](/constructor/updateNewStoryReaction.md) | Represents a new [reaction to a story](/api/reactions.md#notifications-about-reactions). |
| [updateStarsBalance](/constructor/updateStarsBalance.md) | The current account's [Telegram Stars balance »](/api/stars.md) has changed. |
| [updateBusinessBotCallbackQuery](/constructor/updateBusinessBotCallbackQuery.md) | A callback button sent via a [business connection](/api/bots/connected-business-bots.md) was pressed, and the button data was sent to the bot that created the button. |
| [updateStarsRevenueStatus](/constructor/updateStarsRevenueStatus.md) | The [Telegram Star balance of a channel/bot we own has changed »](/api/stars.md#revenue-statistics). |
| [updateBotPurchasedPaidMedia](/constructor/updateBotPurchasedPaidMedia.md) | Bots only: a user has purchased a [paid media](/api/paid-media.md). |
| [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) | Contains the current [default paid reaction privacy, see here »](/api/reactions.md#paid-reactions) for more info.\
\
Clients should invoke [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md) on startup to fetch the current default reaction privacy because this update is only sent to currently online sessions and cannot be fetched using getDifference on client startup. |
| [updateSentPhoneCode](/constructor/updateSentPhoneCode.md) | A paid login SMS code was successfully sent. |
| [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) | Contains conference call blockchain blocks, see [handling E2E group call updates »](/api/end-to-end/group-calls.md#handling-updates). |
| [updateReadMonoForumInbox](/constructor/updateReadMonoForumInbox.md) | Incoming messages in a [monoforum topic](/api/monoforum.md) were read |
| [updateReadMonoForumOutbox](/constructor/updateReadMonoForumOutbox.md) | Outgoing messages in a [monoforum](/api/monoforum.md) were read. |
| [updateMonoForumNoPaidException](/constructor/updateMonoForumNoPaidException.md) | An admin has (un)exempted this [monoforum topic »](/api/monoforum.md) from payment to send messages using [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md). |
| [updateGroupCallMessage](/constructor/updateGroupCallMessage.md) | A new message, reaction, paid comment or donation was received through the [in-call message overlay »](/api/group-calls.md#in-call-messages). |
| [updateGroupCallEncryptedMessage](/constructor/updateGroupCallEncryptedMessage.md) | A new E2E-encrypted message or emoji reaction was received in a conference call, see [here »](/api/end-to-end/group-calls.md#receiving-and-decrypting-a-message) for the decryption process. |
| [updatePinnedForumTopic](/constructor/updatePinnedForumTopic.md) | A [forum topic »](/api/forum.md#forum-topics) was pinned or unpinned. |
| [updatePinnedForumTopics](/constructor/updatePinnedForumTopics.md) | The [pinned topics](/api/forum.md#forum-topics) of a forum have changed. |
| [updateDeleteGroupCallMessages](/constructor/updateDeleteGroupCallMessages.md) | Indicates that messages were deleted from the [in-call message overlay »](/api/group-calls.md#in-call-messages) of a video chat/livestream or live story, including in RTMP mode. |
| [updateStarGiftAuctionState](/constructor/updateStarGiftAuctionState.md) | Contains updates to [auction state, see here »](/api/auctions.md) for more info on how to enable these updates. |
| [updateStarGiftAuctionUserState](/constructor/updateStarGiftAuctionUserState.md) | Contains updates to [auction state related to the current user, see here »](/api/auctions.md) for more info on how to enable these updates. |
| [updateEmojiGameInfo](/constructor/updateEmojiGameInfo.md) | Dice game update. |
| [updateStarGiftCraftFail](/constructor/updateStarGiftCraftFail.md) | Indicates that a [crafting »](/api/gifts.md#crafting-collectible-gifts) attempt did not produce a new collectible gift. |
| [updateChatParticipantRank](/constructor/updateChatParticipantRank.md) | The [tag »](/api/rank.md) of a participant of a [basic group »](/api/channel.md#basic-groups) has changed. |
| [updateManagedBot](/constructor/updateManagedBot.md) | [Manager bots](/api/bots/managed-bots.md) only: a bot managed by the currently logged in bot was created or updated. |
| [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md) | Sent to [guest bots »](/api/bots/guest-mode.md) when a user invokes the bot as a guest in a chat. The bot should reply by invoking [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md), see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info. |
| [updateAiComposeTones](/constructor/updateAiComposeTones.md) | The list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user has changed, and should be refetched using [aicompose.getTones](/method/aicompose.getTones.md). |
# Updates

Object which is perceived by the client without a call on its part when an event occurs.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;

---functions---

contacts.deleteContacts#96a0e00 id:Vector<InputUser> = Updates;
messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
messages.forwardMessages#13704a7c flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int reply_to:flags.22?InputReplyTo schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long video_timestamp:flags.20?int allow_paid_stars:flags.21?long suggested_post:flags.23?SuggestedPost = Updates;
messages.editChatTitle#73783ffd chat_id:long title:string = Updates;
messages.editChatPhoto#35ddd674 chat_id:long photo:InputChatPhoto = Updates;
messages.deleteChatUser#a2185cab flags:# revoke_history:flags.0?true chat_id:long user_id:InputUser = Updates;
messages.importChatInvite#6c50051c hash:string = Updates;
messages.startBot#e6df7378 bot:InputUser peer:InputPeer random_id:long start_param:string = Updates;
channels.createChannel#91006707 flags:# broadcast:flags.0?true megagroup:flags.1?true for_import:flags.3?true forum:flags.5?true title:string about:string geo_point:flags.2?InputGeoPoint address:flags.2?string ttl_period:flags.4?int = Updates;
channels.editAdmin#9a98ad68 flags:# channel:InputChannel user_id:InputUser admin_rights:ChatAdminRights rank:flags.0?string = Updates;
channels.editTitle#566decd0 channel:InputChannel title:string = Updates;
channels.editPhoto#f12e57c9 channel:InputChannel photo:InputChatPhoto = Updates;
channels.joinChannel#24b524c5 channel:InputChannel = Updates;
channels.leaveChannel#f836aa95 channel:InputChannel = Updates;
channels.deleteChannel#c0111fe3 channel:InputChannel = Updates;
messages.migrateChat#a2875319 chat_id:long = Updates;
messages.sendInlineBotResult#c0cf7646 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut allow_paid_stars:flags.21?long = Updates;
channels.toggleSignatures#418d549c flags:# signatures_enabled:flags.0?true profiles_enabled:flags.1?true channel:InputChannel = Updates;
messages.editMessage#51e842e1 flags:# no_webpage:flags.1?true invert_media:flags.16?true peer:InputPeer id:int message:flags.11?string media:flags.14?InputMedia reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.15?int schedule_repeat_period:flags.18?int quick_reply_shortcut_id:flags.17?int = Updates;
messages.getAllDrafts#6a3f8d65 = Updates;
messages.setGameScore#8ef8ecc0 flags:# edit_message:flags.0?true force:flags.1?true peer:InputPeer id:int user_id:InputUser score:int = Updates;
phone.discardCall#b2cbc1c0 flags:# video:flags.0?true peer:InputPhoneCall duration:int reason:PhoneCallDiscardReason connection_id:long = Updates;
phone.setCallRating#59ead627 flags:# user_initiative:flags.0?true peer:InputPhoneCall rating:int comment:string = Updates;
channels.editBanned#96e6cd81 channel:InputChannel participant:InputPeer banned_rights:ChatBannedRights = Updates;
messages.sendScreenshotNotification#a1405817 peer:InputPeer reply_to:InputReplyTo random_id:long = Updates;
channels.deleteHistory#9baa9647 flags:# for_everyone:flags.0?true channel:InputChannel max_id:int = Updates;
channels.togglePreHistoryHidden#eabbb94c channel:InputChannel enabled:Bool = Updates;
messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;
messages.updatePinnedMessage#d2aaf7ec flags:# silent:flags.0?true unpin:flags.1?true pm_oneside:flags.2?true peer:InputPeer id:int = Updates;
account.getNotifyExceptions#53577479 flags:# compare_sound:flags.1?true compare_stories:flags.2?true peer:flags.0?InputNotifyPeer = Updates;
messages.sendVote#10ea6184 peer:InputPeer msg_id:int options:Vector<bytes> = Updates;
messages.getPollResults#eda3e33b peer:InputPeer msg_id:int poll_hash:long = Updates;
messages.editChatDefaultBannedRights#a5866b41 peer:InputPeer banned_rights:ChatBannedRights = Updates;
folders.editPeerFolders#6847d0ab folder_peers:Vector<InputFolderPeer> = Updates;
contacts.addContact#d9ba2e54 flags:# add_phone_privacy_exception:flags.0?true id:InputUser first_name:string last_name:string phone:string note:flags.1?TextWithEntities = Updates;
contacts.acceptContact#f831a20f id:InputUser = Updates;
contacts.getLocated#d348bc44 flags:# background:flags.1?true geo_point:InputGeoPoint self_expires:flags.0?int = Updates;
channels.toggleSlowMode#edd49ef0 channel:InputChannel seconds:int = Updates;
messages.sendScheduledMessages#bd38850a peer:InputPeer id:Vector<int> = Updates;
messages.deleteScheduledMessages#59ae2b16 peer:InputPeer id:Vector<int> = Updates;
contacts.blockFromReplies#29a8962c flags:# delete_message:flags.0?true delete_history:flags.1?true report_spam:flags.2?true msg_id:int = Updates;
phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
phone.joinGroupCall#8fb53057 flags:# muted:flags.0?true video_stopped:flags.2?true call:InputGroupCall join_as:InputPeer invite_hash:flags.1?string public_key:flags.3?int256 block:flags.3?bytes params:DataJSON = Updates;
phone.leaveGroupCall#500377f9 call:InputGroupCall source:int = Updates;
phone.inviteToGroupCall#7b393160 call:InputGroupCall users:Vector<InputUser> = Updates;
phone.discardGroupCall#7a777135 call:InputGroupCall = Updates;
phone.toggleGroupCallSettings#974392f2 flags:# reset_invite_hash:flags.1?true call:InputGroupCall join_muted:flags.0?Bool messages_enabled:flags.2?Bool send_paid_messages_stars:flags.3?long = Updates;
messages.setHistoryTTL#b80e5fe4 peer:InputPeer period:int = Updates;
channels.convertToGigagroup#b290c69 channel:InputChannel = Updates;
phone.toggleGroupCallRecord#f128c708 flags:# start:flags.0?true video:flags.2?true call:InputGroupCall title:flags.1?string video_portrait:flags.2?Bool = Updates;
phone.editGroupCallParticipant#a5273abf flags:# call:InputGroupCall participant:InputPeer muted:flags.0?Bool volume:flags.1?int raise_hand:flags.2?Bool video_stopped:flags.3?Bool video_paused:flags.4?Bool presentation_paused:flags.5?Bool = Updates;
phone.editGroupCallTitle#1ca6ac0a call:InputGroupCall title:string = Updates;
phone.toggleGroupCallStartSubscription#219c34e6 call:InputGroupCall subscribed:Bool = Updates;
phone.startScheduledGroupCall#5680e342 call:InputGroupCall = Updates;
phone.joinGroupCallPresentation#cbea6bc4 call:InputGroupCall params:DataJSON = Updates;
phone.leaveGroupCallPresentation#1c50d144 call:InputGroupCall = Updates;
messages.setChatTheme#81202c9 peer:InputPeer theme:InputChatTheme = Updates;
messages.hideChatJoinRequest#7fe7e815 flags:# approved:flags.0?true peer:InputPeer user_id:InputUser = Updates;
messages.hideAllChatJoinRequests#e085f4ea flags:# approved:flags.0?true peer:InputPeer link:flags.1?string = Updates;
messages.toggleNoForwards#b2081a35 flags:# peer:InputPeer enabled:Bool request_msg_id:flags.0?int = Updates;
messages.sendReaction#d30d78d4 flags:# big:flags.1?true add_to_recent:flags.2?true peer:InputPeer msg_id:int reaction:flags.0?Vector<Reaction> = Updates;
messages.getMessagesReactions#8bba90e6 peer:InputPeer id:Vector<int> = Updates;
messages.setChatAvailableReactions#864b2581 flags:# peer:InputPeer available_reactions:ChatReactions reactions_limit:flags.0?int paid_enabled:flags.1?Bool = Updates;
messages.sendWebViewData#dc0242c8 bot:InputUser random_id:long button_text:string data:string = Updates;
channels.toggleJoinToSend#e4cb9580 channel:InputChannel enabled:Bool = Updates;
channels.toggleJoinRequest#4c2985b6 channel:InputChannel enabled:Bool = Updates;
payments.assignAppStoreTransaction#80ed747d receipt:bytes purpose:InputStorePaymentPurpose = Updates;
payments.assignPlayMarketTransaction#dffd50d3 receipt:DataJSON purpose:InputStorePaymentPurpose = Updates;
messages.getExtendedMedia#84f80814 peer:InputPeer id:Vector<int> = Updates;
channels.toggleForum#3ff75734 channel:InputChannel enabled:Bool tabs:Bool = Updates;
channels.toggleAntiSpam#68f3e4eb channel:InputChannel enabled:Bool = Updates;
channels.toggleParticipantsHidden#6a6e7854 channel:InputChannel enabled:Bool = Updates;
messages.sendBotRequestedPeer#6c5cf2a7 flags:# peer:InputPeer msg_id:flags.0?int webapp_req_id:flags.1?string button_id:int requested_peers:Vector<InputPeer> = Updates;
chatlists.joinChatlistInvite#a6b1e39a slug:string peers:Vector<InputPeer> = Updates;
chatlists.joinChatlistUpdates#e089f8f5 chatlist:InputChatlist peers:Vector<InputPeer> = Updates;
chatlists.leaveChatlist#74fae13a chatlist:InputChatlist peers:Vector<InputPeer> = Updates;
messages.setChatWallPaper#8ffacae1 flags:# for_both:flags.3?true revert:flags.4?true peer:InputPeer wallpaper:flags.0?InputWallPaper settings:flags.2?WallPaperSettings id:flags.1?int = Updates;
stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;
stories.editStory#2c63a72b flags:# peer:InputPeer id:int media:flags.0?InputMedia media_areas:flags.3?Vector<MediaArea> caption:flags.1?string entities:flags.1?Vector<MessageEntity> privacy_rules:flags.2?Vector<InputPrivacyRule> music:flags.4?InputDocument = Updates;
stories.activateStealthMode#57bbd166 flags:# past:flags.0?true future:flags.1?true = Updates;
stories.sendReaction#7fd736b2 flags:# add_to_recent:flags.0?true peer:InputPeer story_id:int reaction:Reaction = Updates;
bots.allowSendMessage#f132e3ef bot:InputUser = Updates;
stories.getAllReadPeerStories#9b5ae7f9 = Updates;
payments.applyGiftCode#f6e26854 slug:string = Updates;
payments.launchPrepaidGiveaway#5ff58f20 peer:InputPeer giveaway_id:long purpose:InputStorePaymentPurpose = Updates;
channels.updateColor#d8aa3671 flags:# for_profile:flags.1?true channel:InputChannel color:flags.2?int background_emoji_id:flags.0?long = Updates;
channels.toggleViewForumAsMessages#9738bb15 channel:InputChannel enabled:Bool = Updates;
channels.updateEmojiStatus#f0d3e6a8 channel:InputChannel emoji_status:EmojiStatus = Updates;
channels.setBoostsToUnblockRestrictions#ad399cee channel:InputChannel boosts:int = Updates;
messages.sendQuickReplyMessages#6c750de1 peer:InputPeer shortcut_id:int id:Vector<int> random_id:Vector<long> = Updates;
messages.deleteQuickReplyMessages#e105e910 shortcut_id:int id:Vector<int> = Updates;
account.updateConnectedBot#66a08c7e flags:# deleted:flags.1?true rights:flags.0?BusinessBotRights bot:InputUser recipients:InputBusinessBotRecipients = Updates;
account.getBotBusinessConnection#76a86270 connection_id:string = Updates;
channels.restrictSponsoredMessages#9ae91519 channel:InputChannel restricted:Bool = Updates;
messages.editFactCheck#589ee75 peer:InputPeer msg_id:int text:TextWithEntities = Updates;
messages.deleteFactCheck#d1da940c peer:InputPeer msg_id:int = Updates;
payments.refundStarsCharge#25ae8f4a user_id:InputUser charge_id:string = Updates;
messages.sendPaidReaction#58bbcb50 flags:# peer:InputPeer msg_id:int count:int random_id:long private:flags.0?PaidReactionPrivacy = Updates;
messages.getPaidReactionPrivacy#472455aa = Updates;
phone.createConferenceCall#7d0444bb flags:# muted:flags.0?true video_stopped:flags.2?true join:flags.3?true random_id:int public_key:flags.3?int256 block:flags.3?bytes params:flags.3?DataJSON = Updates;
payments.upgradeStarGift#aed6e4f5 flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = Updates;
payments.transferStarGift#7f18176a stargift:InputSavedStarGift to_id:InputPeer = Updates;
channels.updatePaidMessagesPrice#4b12327b flags:# broadcast_messages_allowed:flags.0?true channel:InputChannel send_paid_messages_stars:long = Updates;
phone.deleteConferenceCallParticipants#8ca60525 flags:# only_left:flags.0?true kick:flags.1?true call:InputGroupCall ids:Vector<long> block:bytes = Updates;
phone.sendConferenceCallBroadcast#c6701900 call:InputGroupCall block:bytes = Updates;
phone.inviteConferenceCallParticipant#bcf22685 flags:# video:flags.0?true call:InputGroupCall user_id:InputUser = Updates;
phone.declineConferenceCallInvite#3c479971 msg_id:int = Updates;
phone.getGroupCallChainBlocks#ee9f88a6 call:InputGroupCall sub_chain_id:int offset:int limit:int = Updates;
payments.updateStarGiftPrice#edbe6ccb stargift:InputSavedStarGift resell_amount:StarsAmount = Updates;
channels.toggleAutotranslation#167fc0a1 channel:InputChannel enabled:Bool = Updates;
messages.toggleTodoCompleted#d3e03124 peer:InputPeer msg_id:int completed:Vector<int> incompleted:Vector<int> = Updates;
messages.appendTodoList#21a61057 peer:InputPeer msg_id:int list:Vector<TodoItem> = Updates;
messages.toggleSuggestedPostApproval#8107455c flags:# reject:flags.1?true peer:InputPeer msg_id:int schedule_date:flags.0?int reject_comment:flags.2?string = Updates;
messages.editForumTopic#cecc1134 flags:# peer:InputPeer topic_id:int title:flags.0?string icon_emoji_id:flags.1?long closed:flags.2?Bool hidden:flags.3?Bool = Updates;
messages.updatePinnedForumTopic#175df251 peer:InputPeer topic_id:int pinned:Bool = Updates;
messages.reorderPinnedForumTopics#e7841f0 flags:# force:flags.0?true peer:InputPeer order:Vector<int> = Updates;
messages.createForumTopic#2f98c3d5 flags:# title_missing:flags.4?true peer:InputPeer title:string icon_color:flags.0?int icon_emoji_id:flags.3?long random_id:long send_as:flags.2?InputPeer = Updates;
phone.sendGroupCallMessage#b1d11410 flags:# call:InputGroupCall random_id:long message:TextWithEntities allow_paid_stars:flags.0?long send_as:flags.1?InputPeer = Updates;
users.suggestBirthday#fc533372 id:InputUser birthday:Birthday = Updates;
stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;
phone.deleteGroupCallMessages#f64f54f7 flags:# report_spam:flags.0?true call:InputGroupCall messages:Vector<int> = Updates;
phone.deleteGroupCallParticipantMessages#1dbfeca0 flags:# report_spam:flags.0?true call:InputGroupCall participant:InputPeer = Updates;
payments.resolveStarGiftOffer#e9ce781c flags:# decline:flags.0?true offer_msg_id:int = Updates;
payments.sendStarGiftOffer#8fb86b41 flags:# peer:InputPeer slug:string price:StarsAmount duration:int random_id:long allow_paid_stars:flags.0?long = Updates;
payments.craftStarGift#b0f9684f stargift:Vector<InputSavedStarGift> = Updates;
messages.editChatCreator#f743b857 peer:InputPeer user_id:InputUser password:InputCheckPasswordSRP = Updates;
messages.editChatParticipantRank#a00f32b0 peer:InputPeer participant:InputPeer rank:string = Updates;
messages.addPollAnswer#19bc4b6d peer:InputPeer msg_id:int answer:PollAnswer = Updates;
messages.deletePollAnswer#ac8505a5 peer:InputPeer msg_id:int option:bytes = Updates;
messages.deleteParticipantReaction#e3b7f82c peer:InputPeer msg_id:int participant:InputPeer = Updates;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [updatesTooLong](/constructor/updatesTooLong.md) | The number of queued updates in the common message box is too large to be delivered passively through the socket, invoke [updates.getDifference](/method/updates.getDifference.md) to fetch the difference as specified in the [documentation »](/api/updates.md).\
\
Does **not** necessarily indicate the [message box size limit was reached](/api/updates.md#recovering-gaps-for-very-old-messages), it simply indicates that the number of queued updates in a message box is too large to be delivered passively through the socket. |
| [updateShortMessage](/constructor/updateShortMessage.md) | Info about a message sent to (received from) another user |
| [updateShortChatMessage](/constructor/updateShortChatMessage.md) | Shortened constructor containing info on one new incoming text message from a chat |
| [updateShort](/constructor/updateShort.md) | Shortened constructor containing info on one update not requiring auxiliary data |
| [updatesCombined](/constructor/updatesCombined.md) | Constructor for a group of updates. |
| [updates](/constructor/updates.md) | Full constructor of updates |
| [updateShortSentMessage](/constructor/updateShortSentMessage.md) | Shortened constructor containing info on one outgoing message to a contact (the destination chat has to be extracted from the method call that returned this object). |

### Methods

| Method | Description |
| --- | --- |
| [account.getNotifyExceptions](/method/account.getNotifyExceptions.md) | Returns list of chats with non-default notification settings |
| [account.updateConnectedBot](/method/account.updateConnectedBot.md) | Connect a [business bot »](/api/bots/connected-business-bots.md) to the current account, or to change the current connection settings. |
| [account.getBotBusinessConnection](/method/account.getBotBusinessConnection.md) | Bots may invoke this method to re-fetch the [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) constructor associated with a specific [business `connection_id`, see here »](/api/bots/connected-business-bots.md) for more info on connected business bots.  \
This is needed for example for freshly logged in bots that are receiving some [updateBotNewBusinessMessage](/constructor/updateBotNewBusinessMessage.md), etc. updates because some users have already connected to the bot before it could login.  \
In this case, the bot is receiving messages from the business connection, but it hasn't cached the associated [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) with info about the connection (can it reply to messages? etc.) yet, and cannot receive the old ones because they were sent when the bot wasn't logged into the session yet.  \
This method can be used to fetch info about a not-yet-cached business connection, and should not be invoked if the info is already cached or to fetch changes, as eventual changes will automatically be sent as new [updateBotBusinessConnect](/constructor/updateBotBusinessConnect.md) updates to the bot using the usual [update delivery methods »](/api/updates.md). |
| [users.suggestBirthday](/method/users.suggestBirthday.md) | Suggest a birthday to another user, see [here »](/api/profile.md#birthday) for more info on birthdays in the API. |
| [contacts.deleteContacts](/method/contacts.deleteContacts.md) | Deletes several contacts from the list. |
| [contacts.addContact](/method/contacts.addContact.md) | Add an existing telegram user as contact.\
\
Use [contacts.importContacts](/method/contacts.importContacts.md) to add contacts by phone number, without knowing their Telegram ID. |
| [contacts.acceptContact](/method/contacts.acceptContact.md) | If the [add contact action bar is active](/api/action-bar.md#add-contact), add that user as contact |
| [contacts.getLocated](/method/contacts.getLocated.md) | Get users and geochats near you, see [here »](/api/nearby.md) for more info. |
| [contacts.blockFromReplies](/method/contacts.blockFromReplies.md) | Stop getting notifications about [discussion replies](/api/discussion.md) of a certain user in `@replies` |
| [messages.sendMessage](/method/messages.sendMessage.md) | Sends a message to a chat |
| [messages.sendMedia](/method/messages.sendMedia.md) | Send a media |
| [messages.forwardMessages](/method/messages.forwardMessages.md) | Forwards messages by their IDs. |
| [messages.editChatTitle](/method/messages.editChatTitle.md) | Changes chat name and sends a service message on it. |
| [messages.editChatPhoto](/method/messages.editChatPhoto.md) | Changes chat photo and sends a service message on it |
| [messages.deleteChatUser](/method/messages.deleteChatUser.md) | Deletes a user from a chat and sends a service message on it. |
| [messages.importChatInvite](/method/messages.importChatInvite.md) | Import a chat invite and join a private chat/supergroup/channel |
| [messages.startBot](/method/messages.startBot.md) | Start a conversation with a bot using a [deep linking parameter](/api/links.md#bot-links) |
| [messages.migrateChat](/method/messages.migrateChat.md) | Turn a [basic group into a supergroup](/api/channel.md#migration) |
| [messages.sendInlineBotResult](/method/messages.sendInlineBotResult.md) | Send a result obtained using [messages.getInlineBotResults](/method/messages.getInlineBotResults.md). |
| [messages.editMessage](/method/messages.editMessage.md) | Edit message |
| [messages.getAllDrafts](/method/messages.getAllDrafts.md) | Return all message [drafts](/api/drafts.md).  \
Returns all the latest [updateDraftMessage](/constructor/updateDraftMessage.md) updates related to all chats with drafts. |
| [messages.setGameScore](/method/messages.setGameScore.md) | Use this method to set the score of the specified user in a game sent as a normal message (bots only). |
| [messages.sendScreenshotNotification](/method/messages.sendScreenshotNotification.md) | Notify the other user in a private chat that a screenshot of the chat was taken |
| [messages.sendMultiMedia](/method/messages.sendMultiMedia.md) | Send an [album or grouped media](/api/files.md#albums-grouped-media) |
| [messages.updatePinnedMessage](/method/messages.updatePinnedMessage.md) | Pin a message |
| [messages.sendVote](/method/messages.sendVote.md) | Vote in a [poll](/constructor/poll.md)\
\
Starting from layer 159, the vote will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).\
\
Before voting, clients should check that the user is actually allowed to vote: voting is not possible if the poll is closed, if it is [subscriber-only »](/api/poll.md#subscriber-only-polls) and the user is not an eligible subscriber, or if it is [country-restricted »](/api/poll.md#country-restricted-polls) and the user's [`phone_country_iso2` »](/api/config.md#phone-country-iso2) is not in the poll's allowed country list. See [vote restrictions »](/api/poll.md#vote-restrictions) for the full list of conditions. |
| [messages.getPollResults](/method/messages.getPollResults.md) | Get poll results |
| [messages.editChatDefaultBannedRights](/method/messages.editChatDefaultBannedRights.md) | Edit the default banned rights of a [channel/supergroup/group](/api/channel.md). |
| [messages.sendScheduledMessages](/method/messages.sendScheduledMessages.md) | Send scheduled messages right away |
| [messages.deleteScheduledMessages](/method/messages.deleteScheduledMessages.md) | Delete scheduled messages |
| [messages.setHistoryTTL](/method/messages.setHistoryTTL.md) | Set maximum Time-To-Live of all messages in the specified chat |
| [messages.setChatTheme](/method/messages.setChatTheme.md) | Change the chat theme of a certain chat, see [here »](/api/themes.md#chat-themes) for more info. |
| [messages.hideChatJoinRequest](/method/messages.hideChatJoinRequest.md) | Dismiss or approve a chat [join request](/api/invites.md#join-requests) related to a specific chat or channel. |
| [messages.hideAllChatJoinRequests](/method/messages.hideAllChatJoinRequests.md) | Dismiss or approve all [join requests](/api/invites.md#join-requests) related to a specific chat or channel. |
| [messages.toggleNoForwards](/method/messages.toggleNoForwards.md) | Enable or disable [content protection](/api/content-protection.md) on a channel, group or private chat. |
| [messages.sendReaction](/method/messages.sendReaction.md) | React to message.\
\
Starting from layer 159, the reaction will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md). |
| [messages.getMessagesReactions](/method/messages.getMessagesReactions.md) | Get [message reactions »](/api/reactions.md) |
| [messages.setChatAvailableReactions](/method/messages.setChatAvailableReactions.md) | Change the set of [message reactions »](/api/reactions.md) that can be used in a certain group, supergroup or channel |
| [messages.sendWebViewData](/method/messages.sendWebViewData.md) | Used by the user to relay data from an opened [reply keyboard bot mini app](/api/bots/webapps.md) to the bot that owns it. |
| [messages.getExtendedMedia](/method/messages.getExtendedMedia.md) | Fetch updated information about [paid media, see here »](/api/paid-media.md) for the full flow.\
\
This method will return an array of [updateMessageExtendedMedia](/constructor/updateMessageExtendedMedia.md) updates, only for messages containing **already bought** paid media.  \
No information will be returned for messages containing not yet bought paid media. |
| [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md) | Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button. |
| [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) | Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user. |
| [messages.sendQuickReplyMessages](/method/messages.sendQuickReplyMessages.md) | Send a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts). |
| [messages.deleteQuickReplyMessages](/method/messages.deleteQuickReplyMessages.md) | Delete one or more messages from a [quick reply shortcut](/api/business.md#quick-reply-shortcuts). This will also emit an [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) update. |
| [messages.editFactCheck](/method/messages.editFactCheck.md) | Edit/create a [fact-check](/api/factcheck.md) on a message.\
\
Can only be used by independent fact-checkers as specified by the [appConfig.can\_edit\_factcheck](/api/config.md#can-edit-factcheck) configuration flag. |
| [messages.deleteFactCheck](/method/messages.deleteFactCheck.md) | Delete a [fact-check](/api/factcheck.md) from a message.\
\
Can only be used by independent fact-checkers as specified by the [appConfig.can\_edit\_factcheck](/api/config.md#can-edit-factcheck) configuration flag. |
| [messages.sendPaidReaction](/method/messages.sendPaidReaction.md) | Sends one or more [paid Telegram Star reactions »](/api/reactions.md#paid-reactions), transferring [Telegram Stars »](/api/stars.md) to a channel's balance. |
| [messages.getPaidReactionPrivacy](/method/messages.getPaidReactionPrivacy.md) | Fetches an [updatePaidReactionPrivacy](/constructor/updatePaidReactionPrivacy.md) update with the current [default paid reaction privacy, see here »](/api/reactions.md#paid-reactions) for more info. |
| [messages.toggleTodoCompleted](/method/messages.toggleTodoCompleted.md) | Mark one or more items of a [todo list »](/api/todo.md) as completed or not completed. |
| [messages.appendTodoList](/method/messages.appendTodoList.md) | Appends one or more items to a [todo list »](/api/todo.md). |
| [messages.toggleSuggestedPostApproval](/method/messages.toggleSuggestedPostApproval.md) | Approve or reject a [suggested post »](/api/suggested-posts.md). |
| [messages.editForumTopic](/method/messages.editForumTopic.md) | Edit [forum topic](/api/forum.md). |
| [messages.updatePinnedForumTopic](/method/messages.updatePinnedForumTopic.md) | Pin or unpin [forum topics](/api/forum.md) |
| [messages.reorderPinnedForumTopics](/method/messages.reorderPinnedForumTopics.md) | Reorder pinned forum topics |
| [messages.createForumTopic](/method/messages.createForumTopic.md) | Create a [forum topic](/api/forum.md). |
| [messages.editChatCreator](/method/messages.editChatCreator.md) | Transfer the ownership of a basic group, supergroup or channel to another user, see [here »](/api/channel.md#transferring-ownership-of-a-group-channel) for the full flow. |
| [messages.editChatParticipantRank](/method/messages.editChatParticipantRank.md) | Edit a group participant's [tag »](/api/rank.md). |
| [messages.addPollAnswer](/method/messages.addPollAnswer.md) | Add an answer option to an [open-answer poll »](/api/poll.md#open-answer-polls) |
| [messages.deletePollAnswer](/method/messages.deletePollAnswer.md) | Remove an answer option from an [open-answer poll »](/api/poll.md#open-answer-polls) |
| [messages.deleteParticipantReaction](/method/messages.deleteParticipantReaction.md) | As an admin, remove all of a specific participant's [reactions](/api/reactions.md) from a single message. |
| [channels.createChannel](/method/channels.createChannel.md) | Create a [supergroup/channel](/api/channel.md). |
| [channels.editAdmin](/method/channels.editAdmin.md) | Modify the admin rights of a user in a [supergroup/channel](/api/channel.md). |
| [channels.editTitle](/method/channels.editTitle.md) | Edit the name of a [channel/supergroup](/api/channel.md) |
| [channels.editPhoto](/method/channels.editPhoto.md) | Change the photo of a [channel/supergroup](/api/channel.md) |
| [channels.joinChannel](/method/channels.joinChannel.md) | Join a channel/supergroup |
| [channels.leaveChannel](/method/channels.leaveChannel.md) | Leave a [channel/supergroup](/api/channel.md) |
| [channels.deleteChannel](/method/channels.deleteChannel.md) | Delete a [channel/supergroup](/api/channel.md) |
| [channels.toggleSignatures](/method/channels.toggleSignatures.md) | Enable/disable message signatures in channels |
| [channels.editBanned](/method/channels.editBanned.md) | Ban/unban/kick a user in a [supergroup/channel](/api/channel.md). |
| [channels.deleteHistory](/method/channels.deleteHistory.md) | Delete the history of a [supergroup](/api/channel.md) |
| [channels.togglePreHistoryHidden](/method/channels.togglePreHistoryHidden.md) | Hide/unhide message history for new channel/supergroup users |
| [channels.toggleSlowMode](/method/channels.toggleSlowMode.md) | Toggle supergroup slow mode: if enabled, users will only be able to send one message every `seconds` seconds |
| [channels.convertToGigagroup](/method/channels.convertToGigagroup.md) | Convert a [supergroup](/api/channel.md) to a [gigagroup](/api/channel.md), when requested by [channel suggestions](/api/config.md#channel-suggestions). |
| [channels.toggleJoinToSend](/method/channels.toggleJoinToSend.md) | Set whether all users [should join a discussion group in order to comment on a post »](/api/discussion.md#requiring-users-to-join-the-group) |
| [channels.toggleJoinRequest](/method/channels.toggleJoinRequest.md) | Set whether all users should [request admin approval to join the group »](/api/invites.md#join-requests). |
| [channels.toggleForum](/method/channels.toggleForum.md) | Enable or disable [forum functionality](/api/forum.md) in a supergroup. |
| [channels.toggleAntiSpam](/method/channels.toggleAntiSpam.md) | Enable or disable the [native antispam system](/api/antispam.md). |
| [channels.toggleParticipantsHidden](/method/channels.toggleParticipantsHidden.md) | Hide or display the participants list in a [supergroup](/api/channel.md).\
\
The supergroup must have at least `hidden_members_group_size_min` participants in order to use this method, as specified by the [client configuration parameters »](/api/config.md#client-configuration). |
| [channels.updateColor](/method/channels.updateColor.md) | Update the [accent color and background custom emoji »](/api/colors.md) of a channel. |
| [channels.toggleViewForumAsMessages](/method/channels.toggleViewForumAsMessages.md) | Users may also choose to display messages from all topics of a [forum](/api/forum.md) as if they were sent to a normal group, using a "View as messages" setting in the local client: this setting only affects the current account, and is synced to other logged in sessions using this method.\
\
Invoking this method will update the value of the `view_forum_as_messages` flag of [channelFull](/constructor/channelFull.md) or [dialog](/constructor/dialog.md) and emit an [updateChannelViewForumAsMessages](/constructor/updateChannelViewForumAsMessages.md). |
| [channels.updateEmojiStatus](/method/channels.updateEmojiStatus.md) | Set an [emoji status](/api/emoji-status.md) for a channel or supergroup. |
| [channels.setBoostsToUnblockRestrictions](/method/channels.setBoostsToUnblockRestrictions.md) | Admins with [ban\_users admin rights »](/constructor/chatAdminRights.md) may allow users that apply a certain number of [booosts »](/api/boost.md) to the group to bypass [slow mode »](/method/channels.toggleSlowMode.md) and [other »](/api/rights.md#default-rights) supergroup restrictions, see [here »](/api/boost.md#bypass-slowmode-and-chat-restrictions) for more info. |
| [channels.restrictSponsoredMessages](/method/channels.restrictSponsoredMessages.md) | Disable ads on the specified channel, for all users.\
\
Available only after reaching at least the [boost level »](/api/boost.md) specified in the [`channel_restrict_sponsored_level_min` »](/api/config.md#channel-restrict-sponsored-level-min) config parameter. |
| [channels.updatePaidMessagesPrice](/method/channels.updatePaidMessagesPrice.md) | Enable or disable [paid messages »](/api/paid-messages.md) in this [supergroup](/api/channel.md) or [monoforum](/api/monoforum.md).\
\
Also used to [enable or disable monoforums aka direct messages in a channel](/api/monoforum.md).\
\
Note that passing the ID of the monoforum itself to `channel` will return a `CHANNEL_MONOFORUM_UNSUPPORTED` error: pass the ID of the associated channel to edit the settings of the associated monoforum, instead. |
| [channels.toggleAutotranslation](/method/channels.toggleAutotranslation.md) | Toggle autotranslation in a channel, for all users: see [here »](/api/translation.md#autotranslation-for-channels) for more info. |
| [bots.allowSendMessage](/method/bots.allowSendMessage.md) | Allow the specified bot to send us messages |
| [payments.assignAppStoreTransaction](/method/payments.assignAppStoreTransaction.md) | Informs server about a purchase made through the App Store: for official applications only. |
| [payments.assignPlayMarketTransaction](/method/payments.assignPlayMarketTransaction.md) | Informs server about a purchase made through the Play Store: for official applications only. |
| [payments.applyGiftCode](/method/payments.applyGiftCode.md) | Apply a [Telegram Premium giftcode »](/api/giveaways.md) |
| [payments.launchPrepaidGiveaway](/method/payments.launchPrepaidGiveaway.md) | Launch a [prepaid giveaway »](/api/giveaways.md). |
| [payments.refundStarsCharge](/method/payments.refundStarsCharge.md) | Refund a [Telegram Stars](/api/stars.md) transaction, see [here »](/api/payments.md#6-refunds) for more info. |
| [payments.upgradeStarGift](/method/payments.upgradeStarGift.md) | Upgrade a [gift](/api/gifts.md) to a [collectible gift](/api/gifts.md#collectible-gifts): can only be used if the upgrade was already paid by the gift sender; see [here »](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift) for more info on the full flow (including the different flow to use in case the upgrade was not paid by the gift sender). |
| [payments.transferStarGift](/method/payments.transferStarGift.md) | Transfer a [collectible gift](/api/gifts.md#collectible-gifts) to another user or channel: can only be used if transfer is free (i.e. [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md).`transfer_stars` is not set); see [here »](/api/gifts.md#transferring-collectible-gifts) for more info on the full flow (including the different flow to use in case the transfer isn't free). |
| [payments.updateStarGiftPrice](/method/payments.updateStarGiftPrice.md) | A [collectible gift we own »](/api/gifts.md#collectible-gifts) can be put up for sale on the [gift marketplace »](https://telegram.org/blog/gift-marketplace-and-more) with this method, see [here »](/api/gifts.md#reselling-collectible-gifts) for more info. |
| [payments.resolveStarGiftOffer](/method/payments.resolveStarGiftOffer.md) | Accept or decline a previously received [collectible gift purchase offer »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow. |
| [payments.sendStarGiftOffer](/method/payments.sendStarGiftOffer.md) | Send an offer to purchase a [collectible gift »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow. |
| [payments.craftStarGift](/method/payments.craftStarGift.md) | Craft a new [collectible gift »](/api/gifts.md#collectible-gifts) by combining 1 to 4 owned collectible gifts of the same base gift type.\
\
The passed gifts must all have the same [starGiftUnique](/constructor/starGiftUnique.md).`gift_id`, must be usable for crafting, and must not be blocked by a future `can_craft_at` timestamp.\
\
The first passed gift must not be [located on the TON blockchain](/api/gifts.md#hosted-collectible-gifts). |
| [phone.discardCall](/method/phone.discardCall.md) | Refuse or end running call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.setCallRating](/method/phone.setCallRating.md) | Rate a call, returns info about the rating message sent to the official VoIP bot, see [here »](/api/calls.md#call-rating) for more info on the full flow. |
| [phone.createGroupCall](/method/phone.createGroupCall.md) | Create a video chat or livestream, see [here »](/api/group-calls.md#video-chats-livestreams) for the full flow. |
| [phone.joinGroupCall](/method/phone.joinGroupCall.md) | Join any [group call type »](/api/group-calls.md#group-call-types). Conference calls additionally require the [E2E joining flow »](/api/end-to-end/group-calls.md#joining-a-call).\
\
The `params` field must contain a join payload generated by the local tgcalls group-call engine. It contains a random non-zero audio `ssrc`, ICE `ufrag` and `pwd`, DTLS `fingerprints`, and, when publishing video, `ssrc-groups`.\
\
For example, a join payload without published video has the following shape:\
\
```json\
{\
  "ssrc": 123456789,\
  "ufrag": "...",\
  "pwd": "...",\
  "fingerprints": [{\
    "hash": "sha-256",\
    "fingerprint": "...",\
    "setup": "passive"\
  }]\
}\
```\
\
When joining an RTMP-mode call, generate the payload without published video source groups. |
| [phone.leaveGroupCall](/method/phone.leaveGroupCall.md) | Leave a group call without ending it for other participants. This method can be used with all group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info. |
| [phone.inviteToGroupCall](/method/phone.inviteToGroupCall.md) | Invite a set of users to a [video chat/livestream »](/api/group-calls.md#video-chats-livestreams); cannot be used for [live stories »](/api/group-calls.md#live-stories) or [conference calls »](/api/group-calls.md#conference-calls). |
| [phone.discardGroupCall](/method/phone.discardGroupCall.md) | Terminate a group call, ending the room for all participants. This method can be used with all group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info. |
| [phone.toggleGroupCallSettings](/method/phone.toggleGroupCallSettings.md) | Change group call settings. Each setting supports different group call types, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info. |
| [phone.toggleGroupCallRecord](/method/phone.toggleGroupCallRecord.md) | Start or stop recording a video chat/livestream, see [here »](/api/group-calls.md#video-chats-livestreams) for more info. The recorded audio and video streams will be automatically sent to Saved Messages (the chat with ourselves). |
| [phone.editGroupCallParticipant](/method/phone.editGroupCallParticipant.md) | Edit information about a participant of a non-RTMP video chat/livestream or conference. The `raise_hand` field is only supported in video chats/livestreams, see [here »](/api/group-calls.md#managing-an-active-group-call) for more info.\
\
Note: [flags](/mtproto/TL-combinators.md#conditional-fields).N?[Bool](/type/Bool.md) parameters can have three possible values:\
\
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is not set, the previous value will not be changed.\
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is set and contains a [boolTrue](/constructor/boolTrue.md), the previous value will be overwritten to `true`.\
- If the [TL flag](/mtproto/TL-combinators.md#conditional-fields) is set and contains a [boolFalse](/constructor/boolFalse.md), the previous value will be overwritten to `false`. |
| [phone.editGroupCallTitle](/method/phone.editGroupCallTitle.md) | Edit the title of a video chat or livestream. This method cannot be used with live stories or conferences, see [here »](/api/group-calls.md#video-chats-livestreams) for more info. |
| [phone.toggleGroupCallStartSubscription](/method/phone.toggleGroupCallStartSubscription.md) | Subscribe or unsubscribe to a scheduled [group call](/api/group-calls.md#video-chats-livestreams). |
| [phone.startScheduledGroupCall](/method/phone.startScheduledGroupCall.md) | Start a scheduled [group call](/api/group-calls.md#video-chats-livestreams). |
| [phone.joinGroupCallPresentation](/method/phone.joinGroupCallPresentation.md) | Start screen sharing in a non-RTMP video chat/livestream or conference. Presentations are not supported in live stories or RTMP-mode video chats/livestreams, see [here »](/api/group-calls.md#presentations) for more info. |
| [phone.leaveGroupCallPresentation](/method/phone.leaveGroupCallPresentation.md) | Stop screen sharing in a non-RTMP video chat/livestream or conference. Presentations are not supported in live stories or RTMP-mode video chats/livestreams, see [here »](/api/group-calls.md#presentations) for more info. |
| [phone.createConferenceCall](/method/phone.createConferenceCall.md) | Create and optionally join a new [conference call »](/api/group-calls.md#conference-calls). |
| [phone.deleteConferenceCallParticipants](/method/phone.deleteConferenceCallParticipants.md) | Remove participants from a [conference call »](/api/end-to-end/group-calls.md#removing-a-participant).\
\
Exactly one of the `only_left` and `kick` flags must be set. |
| [phone.sendConferenceCallBroadcast](/method/phone.sendConferenceCallBroadcast.md) | Submit a verification message to conference call subchain `1`, see [subchains »](/api/end-to-end/group-calls.md#subchains). |
| [phone.inviteConferenceCallParticipant](/method/phone.inviteConferenceCallParticipant.md) | Invite a user to a [conference call](/api/group-calls.md#conference-calls). |
| [phone.declineConferenceCallInvite](/method/phone.declineConferenceCallInvite.md) | Decline a [conference call](/api/group-calls.md#conference-calls) invite. |
| [phone.getGroupCallChainBlocks](/method/phone.getGroupCallChainBlocks.md) | Fetch blocks from a conference call [subchain »](/api/end-to-end/group-calls.md#subchains); handle the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md) as [specified here »](/api/end-to-end/group-calls.md#handling-updates).\
\
If the number of blocks returned by *any* call to this method is equal to `limit`, this method must be re-invoked immediately after processing the returned [updateGroupCallChainBlocks](/constructor/updateGroupCallChainBlocks.md), with the newly committed `offset` (usually equal to the returned `next_offset`). |
| [phone.sendGroupCallMessage](/method/phone.sendGroupCallMessage.md) | Send an in-call message to all participants of a video chat/livestream or live story, including in RTMP mode, see [here »](/api/group-calls.md#in-call-messages) for more info.\
\
The `send_as` field can only be populated for live stories, where it optionally selects the displayed author. If omitted, the server automatically selects the appropriate author. Do not populate it for video chats/livestreams.\
\
Video chats/livestreams and live stories support [animated emoji reactions »](/api/group-calls.md#in-call-reactions), encoded as messages containing only a standard available reaction emoji or a single custom emoji entity.\
\
For a paid live story comment, pass the user-confirmed donation amount in `allow_paid_stars`. For commenters other than the live story owner, this amount must be at least the current [groupCall](/constructor/groupCall.md).`send_paid_messages_stars` minimum. A higher amount may be donated to highlight the comment. The live story owner may comment without populating `allow_paid_stars`. To send a standalone paid live story donation, pass a positive `allow_paid_stars` value and an empty `message`, see [here »](/api/group-calls.md#paid-live-story-donations) for the full flow. |
| [phone.deleteGroupCallMessages](/method/phone.deleteGroupCallMessages.md) | Delete specific messages from the [in-call message overlay »](/api/group-calls.md#in-call-messages) of a video chat/livestream or live story, including in RTMP mode.\
\
Non-admin participants may delete messages they sent; admins may delete any message. |
| [phone.deleteGroupCallParticipantMessages](/method/phone.deleteGroupCallParticipantMessages.md) | As an admin, delete all messages from a specific participant in the [in-call message overlay »](/api/group-calls.md#in-call-messages) of a video chat/livestream or live story, including in RTMP mode. |
| [folders.editPeerFolders](/method/folders.editPeerFolders.md) | Edit peers in [peer folder](/api/folders.md#peer-folders) |
| [chatlists.joinChatlistInvite](/method/chatlists.joinChatlistInvite.md) | Import a [chat folder deep link »](/api/links.md#chat-folder-links), joining some or all the chats in the folder. |
| [chatlists.joinChatlistUpdates](/method/chatlists.joinChatlistUpdates.md) | Join channels and supergroups recently added to a [chat folder deep link »](/api/links.md#chat-folder-links). |
| [chatlists.leaveChatlist](/method/chatlists.leaveChatlist.md) | Delete a folder imported using a [chat folder deep link »](/api/links.md#chat-folder-links) |
| [stories.sendStory](/method/stories.sendStory.md) | Uploads a [Telegram Story](/api/stories.md).\
\
May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`. |
| [stories.editStory](/method/stories.editStory.md) | Edit an uploaded [story](/api/stories.md)\
\
May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the ID of a controlled business user in `peer`: in this context, the method can only be used to edit stories posted by the same business bot on behalf of the user with [stories.sendStory](/method/stories.sendStory.md). |
| [stories.activateStealthMode](/method/stories.activateStealthMode.md) | Activates [stories stealth mode](/api/stories.md#stealth-mode), see [here »](/api/stories.md#stealth-mode) for more info.\
\
Will return an [updateStoriesStealthMode](/constructor/updateStoriesStealthMode.md). |
| [stories.sendReaction](/method/stories.sendReaction.md) | React to a story. |
| [stories.getAllReadPeerStories](/method/stories.getAllReadPeerStories.md) | Obtain the latest read story ID for all peers when first logging in, returned as a list of [updateReadStories](/constructor/updateReadStories.md) updates, see [here »](/api/stories.md#watching-stories) for more info. |
| [stories.startLive](/method/stories.startLive.md) | Start a live story, optionally using RTMP livestream mode, see [here »](/api/group-calls.md#live-stories) for the full flow. |
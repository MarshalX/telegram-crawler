# Working with Updates


When a client is being actively used, events will occur that affect the current user and that they must learn about as soon as possible, e.g. when a new message is received. To eliminate the need for the client itself to periodically download these events, there is an update delivery mechanism in which the server sends the user notifications over one of its available connections with the client.

### Subscribing to Updates

Update events are sent to an authorized user into the last active connection (except for connections needed for downloading / uploading files).

So to start receiving updates the client needs to init connection and call API method, e.g. to [fetch current state](#fetching-state).

Make sure to **always ignore updates received from unencrypted connections** (i.e. before the handshake is completed).  

If the connection is encrypted, but the session isn't logged in yet or was logged out, only the following updates may be handled:

* [updateLoginToken](/constructor/updateLoginToken.md) - For [QR code logins](/api/qr-login.md)
* [updateSentPhoneCode](/constructor/updateSentPhoneCode.md) - For paid SMS code [logins](/api/auth.md)
* [updateDcOptions](/constructor/updateDcOptions.md) - Changes in the data center connection options that must be applied
* [updateConfig](/constructor/updateConfig.md) - The server-side configuration has changed; the client should re-fetch the config using [help.getConfig](/method/help.getConfig.md) and [help.getAppConfig](/method/help.getAppConfig.md).
* [updateLangPackTooLong](/constructor/updateLangPackTooLong.md), [updateLangPack](/constructor/updateLangPack.md) - Localization pack updates

### Event sequences

All events are received from the socket as a sequence of TL-serialized [Updates](/type/Updates.md) objects, which might be optionally gzip-compressed in the same way as [responses to queries](/api/invoking.md#decompressing-data).

Each [Updates](/type/Updates.md) object may contain single or multiple [Update](/type/Update.md) objects, representing different events happening.

In order to apply all updates in precise order and to guarantee that no update is missed or applied twice there is `seq` attribute in [Updates](/type/Updates.md) constructors, and `pts` (with `pts_count`) or `qts` attributes in [Update](/type/Update.md) constructors. The client must use those attributes values in combination with locally stored state to correctly apply incoming updates.

When a gap in updates sequence occurs, it must be filled via calling one of the API methods. [More below&nbsp;&raquo;](#recovering-gaps)

When using [bot parallel sessions &raquo;](/api/datacenter.md#parallel-sessions), each session shares the account's full authorization and **may receive [updates](/api/updates.md)**, all sharing the same `pts`/`seq`/`qts` sequence: each update will be delivered via only **one** of the currently active sessions, chosen randomly.  

### [Updates](/type/Updates.md) sequence

As said earlier, each payload with updates has a TL-type [Updates](/type/Updates.md). It can be seen from the schema below that this type has several constructors.

    updatesTooLong#e317af7e = Updates;
    updateShort#78d4dec1 update:Update date:int = Updates;
    updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
    updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
    updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
    updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
    updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
    

[updatesTooLong](/constructor/updatesTooLong.md) indicates that there are too many events pending to be pushed to the client, so one needs to [fetch them manually](#recovering-gaps).

Events inside [updateShort](/constructor/updateShort.md) constructors, normally, have lower priority and are broadcast to a large number of users, i.e. one of the chat participants started entering text in a big conversation ([updateChatUserTyping](/constructor/updateChatUserTyping.md)).

The [updateShortMessage](/constructor/updateShortMessage.md), [updateShortSentMessage](/constructor/updateShortMessage.md) and [updateShortChatMessage](/constructor/updateShortChatMessage.md) constructors are redundant but help significantly reduce the transmitted message size for 90% of the updates. They should be transformed to [updateShort](/constructor/updateShort.md) upon receipt.

Two remaining constructors [updates](/constructor/updates.md) and [updatesCombined](/constructor/updatesCombined.md) are part of the Updates sequence. Both of them have the `seq` attribute, which indicates the remote Updates state after the generation of the Updates, and `seq_start` indicates the remote Updates state after the _first_ of the Updates in the packet is generated. For [updates](/constructor/updates.md), the `seq_start` attribute is omitted, because it is assumed that it is always equal to `seq`.

### Message-related event sequences

Each *event* related to a message box (message created, message edited, message deleted, etc) is identified by a unique auto-incremented `pts`, or `qts` in case of secret chat updates, certain bot updates, etc.

Each message box can be considered as some server-side DB table that stores messages and events associated with them.
All boxes are completely independent, and each pts sequence is tied to just one box (see below).

The [Update](/type/Update.md) object may contain info about *multiple events* (for example, [updateDeleteMessages](/constructor/updateDeleteMessages.md)).
That's why all single updates might have `pts_count` parameter indicating the *number of events* contained in the received *update* (with some exceptions, in this case, the `pts_count` is considered to be `0`).

Each [channel](/api/channel.md#channels) and [supergroup](/api/channel.md#supergroups) has its message box and *its event sequence* as a result; private chats and [basic groups](/api/channel.md#basic-groups) of one user have another *common event sequence*.  
Secret chats, certain bot events and other kinds of updates have yet another *common secondary event sequence*.

To recap, the client has to take care of the integrity of the following sequences to properly handle updates:

* Updates sequence (seq)
  * Common message box sequence (pts)
  * Secondary event sequence (qts)
  * Channel message box sequence 1 (pts)
  * Channel message box sequence 2 (pts)
  * Channel message box sequence 3 (pts)
  * and so on...

### Message ID sequences

    // Message constructors
    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;
    messageEmpty#90a6ca84 flags:# id:int peer_id:flags.0?Peer = Message;
    
    // Updates related to messages in the common message queue
    updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
    updateEditMessage#e40370a3 message:Message pts:int pts_count:int = Update;
    updateDeleteMessages#a20db0e5 messages:Vector<int> pts:int pts_count:int = Update;

    // Updates related to channel/supergroup messages
    updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;
    updateEditChannelMessage#1b3f4df7 message:Message pts:int pts_count:int = Update;
    updateDeleteChannelMessages#c32d5b12 channel_id:long messages:Vector<int> pts:int pts_count:int = Update;

    // Updates related to scheduled messages
    updateNewScheduledMessage#39a51dfb message:Message = Update;
    updateDeleteScheduledMessages#f2a71983 flags:# peer:Peer messages:Vector<int> sent_messages:flags.0?Vector<int> = Update;

    // Updates related to quick-reply messages
    updateQuickReplyMessage#3e050d0f message:Message = Update;
    updateDeleteQuickReplyMessages#566fe7cd shortcut_id:int messages:Vector<int> = Update;
    updateDeleteQuickReply#53e6f1ec shortcut_id:int = Update;

    // Updates related to messages received via Telegram business connections
    updateBotNewBusinessMessage#9ddb347c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
    updateBotEditBusinessMessage#7df587c flags:# connection_id:string message:Message reply_to_message:flags.0?Message qts:int = Update;
    updateBotDeleteBusinessMessage#a02a982e connection_id:string peer:Peer messages:Vector<int> qts:int = Update;

    updateBusinessBotCallbackQuery#1ea2fda7 flags:# query_id:long user_id:long connection_id:string message:Message reply_to_message:flags.2?Message chat_instance:long data:flags.0?bytes = Update;
    
    // E2E message updates
    updateNewEncryptedMessage#12bcbd9a message:EncryptedMessage qts:int = Update;

Among the many updates that can be received from the various [message boxes &raquo;](#message-related-event-sequences), the most important updates are the ones related to **messages**.  

Messages also have their own ID sequences (`id` field), independent from the `pts`/`qts` sequences of the [message boxes](#message-related-event-sequences) that contain updates about them, and independent from each other:  

* Common message ID sequence.  

  Monotonically increasing, applies to all [Message](/type/Message.md) constructors located in private chats and [basic groups](/api/channel.md#basic-groups).  

  The sequence is shared by all private chats and [basic group](/api/channel.md#basic-groups) messages within the current account, meaning that:  

  - Message IDs from the common sequence will be the same across all sessions of the same account, i.e. a specific message in a specific private chat/basic group will have the same ID when viewed by different sessions of the same account.  
  - Message IDs from the common sequence will **not** be the same for different accounts, i.e. a specific message in a specific private chat/basic group may have a different ID when viewed by different accounts.  

  Here are the most important updates about messages belonging to the common message ID sequence:
  
  - [updateNewMessage](/constructor/updateNewMessage.md) - A new incoming/outgoing message belonging to the common message ID sequence was received/sent
  - [updateEditMessage](/constructor/updateEditMessage.md) - A message belonging to the common message ID sequence was edited
  - [updateDeleteMessages](/constructor/updateDeleteMessages.md) - A message belonging to the common message ID sequence was deleted

  Also note that the following updates may be received from [users connected to a bot via a business connection &raquo;](/api/bots/connected-business-bots.md): in this case, messages located in private chats and [basic groups](/api/channel.md#basic-groups) will use the connected user's common message ID sequence, **not** the bot's common message ID sequence.  

  - [updateBotNewBusinessMessage](/constructor/updateBotNewBusinessMessage.md) - A new incoming/outgoing message was received/sent in one of the connected user's chats
  - [updateBotEditBusinessMessage](/constructor/updateBotEditBusinessMessage.md) - A message was edited in one of the connected user's chats
  - [updateBotDeleteBusinessMessage](/constructor/updateBotDeleteBusinessMessage.md) - A message was deleted from one of the connected user's chats

* Channel/supergroup message ID sequences.

  Monotonically increasing, applies to all [Message](/type/Message.md) constructors located in private chats and [basic groups](/api/channel.md#basic-groups).  

  Each channel/supergroup has its own sequence.  
    
  * Message IDs from a channel/supergroup will be the same across all sessions of the same account, i.e. a specific message in a specific channel/supergroup will have the same ID when viewed by different sessions of the same account.  
  * Message IDs from a channel/supergroup will be the same for different accounts, i.e. a specific message in a specific channel/supergroup will have the same ID when viewed by different accounts.  

  Here are the most important updates about messages belonging to channel/supergroups:
  
  - [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) - A new incoming/outgoing channel/supergroup message was received/sent
  - [updateEditChannelMessage](/constructor/updateEditChannelMessage.md) - A channel/supergroup message was edited
  - [updateDeleteChannelMessages](/constructor/updateDeleteChannelMessages.md) - A channel/supergroup message was deleted

  Also note that the following updates may be received from [users connected to a bot via a business connection &raquo;](/api/bots/connected-business-bots.md): in this case, messages located in channels/supergroups will use the same ID sequence used by the bot (and by everyone else on Telegram).  

  - [updateBotNewBusinessMessage](/constructor/updateBotNewBusinessMessage.md) - A new incoming/outgoing message was received/sent in one of the connected user's chats
  - [updateBotEditBusinessMessage](/constructor/updateBotEditBusinessMessage.md) - A message was edited in one of the connected user's chats
  - [updateBotDeleteBusinessMessage](/constructor/updateBotDeleteBusinessMessage.md) - A message was deleted from one of the connected user's chats

* Secret chat message ID sequence.

  **Not** monotonically increasing: each secret chat message (represented by a [DecryptedMessage](/constructor/decryptedMessage.md) constructor, **not** the containing [EncryptedMessage](/type/EncryptedMessage.md)) is uniquely identified by its `random_id`, a completely random 64-bit long integer chosen by the sender.  
  
  Each secret chat has its own sequence (one sequence, shared for both ends of the chat); ordering of secret chat messages is guaranteed by the [sequence number](/api/end-to-end/seq_no.md), not the message ID.  

  Secret chat message IDs are obviously the same for the two ends of the secret chat.  

  Updates about sent/received encrypted messages are contained in [updateNewEncryptedMessage](/constructor/updateNewEncryptedMessage.md).  

* Scheduled message ID sequence.  

  Monotonically increasing, applies to all [scheduled messages](/api/scheduled-messages.md) only while they are in the schedule queue; when sent, the message ID will change to an ID from the common message ID sequence or a channel/supergroup ID sequence.   

  Each channel, supergroup, basic group and private chat has its own sequence (unlike for normal messages, where basic groups and private chats share the same sequence).  

  Here are the most important updates about messages belonging to the schedule queue:
  
  - [updateNewScheduledMessage](/constructor/updateNewScheduledMessage.md) - A new message was added to the schedule queue
  - [updateDeleteScheduledMessages](/constructor/updateDeleteScheduledMessages.md) - A message was removed from the schedule queue

* [Quick reply shortcut message &raquo;](/api/business.md#quick-reply-shortcuts) ID sequence.

  Monotonically increasing, applies to all [quick reply shortcut messages](/api/scheduled-messages.md) located in quick reply shortcuts; when sent, the message will be duplicated, obtaining a new message ID that will be generated from the common message ID sequence or a channel/supergroup ID sequence.  
  
  Note that sending a quick reply shortcut will not delete messages from the shortcut: they will remain in the shortcut, keeping the same shortcut message ID.   

  All quick reply shortcut messages from all shortcuts share the same ID sequence.  

  Here are the most important updates about messages belonging to a quick reply shortcut:
  
  - [updateQuickReplyMessage](/constructor/updateQuickReplyMessage.md) - A new message was added to a shortcut
  - [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) - A message was removed from a shortcut
  - [updateDeleteQuickReply](/constructor/updateDeleteQuickReply.md) - All messages belonging to a shortcut were removed, along with the shortcut itself.

Message IDs are used in many places across the API to point to messages, and *only* channel/supergroup message IDs can also be used to generate [message deep links &raquo;](/api/links.md#message-links) pointing to the message.  

Message IDs are also used to order messages in chats (except for secret chat messages, where the [seqno](/api/end-to-end/seq_no.md) is used instead).  

Editing a message does not change its ID.  

#### `updateMessageID` updates

<!-- start updateMessageID schema -->

```
updateMessageID#4e90bfd6 id:int random_id:long = Update;
updateStoryID#1bf335b9 id:int random_id:long = Update;
encryptedMessage#ed18c118 random_id:long chat_id:int date:int bytes:bytes file:EncryptedFile = EncryptedMessage;
encryptedMessageService#23734b06 random_id:long chat_id:int date:int bytes:bytes = EncryptedMessage;
sendMessageTextDraftAction#376d975c random_id:long text:TextWithEntities = SendMessageAction;
inputSingleMedia#1cc6e91f flags:# media:InputMedia random_id:long message:string entities:flags.0?Vector<MessageEntity> = InputSingleMedia;
sponsoredMessage#7dbf8673 flags:# recommended:flags.5?true can_report:flags.12?true random_id:bytes url:string title:string message:string entities:flags.1?Vector<MessageEntity> photo:flags.6?Photo media:flags.14?MessageMedia color:flags.13?PeerColor button_text:string sponsor_info:flags.7?string additional_info:flags.8?string min_display_duration:flags.15?int max_display_duration:flags.15?int = SponsoredMessage;
inputStorePaymentPremiumGiveaway#160544ca flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long = InputStorePaymentPurpose;
inputStorePaymentStarsGiveaway#751f08fa flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true stars:long boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long users:int = InputStorePaymentPurpose;
sponsoredPeer#c69708d3 flags:# random_id:bytes peer:Peer sponsor_info:flags.0?string additional_info:flags.1?string = SponsoredPeer;

---functions---

messages.sendMessage#545cd15a flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
messages.sendMedia#0330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;
messages.forwardMessages#13704a7c flags:# silent:flags.5?true background:flags.6?true with_my_score:flags.8?true drop_author:flags.11?true drop_media_captions:flags.12?true noforwards:flags.14?true allow_paid_floodskip:flags.19?true from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer top_msg_id:flags.9?int reply_to:flags.22?InputReplyTo schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long video_timestamp:flags.20?int allow_paid_stars:flags.21?long suggested_post:flags.23?SuggestedPost = Updates;
messages.requestEncryption#f64daf43 user_id:InputUser random_id:int g_a:bytes = EncryptedChat;
messages.sendEncrypted#44fa7a15 flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;
messages.sendEncryptedFile#5559481d flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes file:InputEncryptedFile = messages.SentEncryptedMessage;
messages.sendEncryptedService#32d439a4 peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;
messages.startBot#e6df7378 bot:InputUser peer:InputPeer random_id:long start_param:string = Updates;
messages.sendInlineBotResult#c0cf7646 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true hide_via:flags.11?true peer:InputPeer reply_to:flags.0?InputReplyTo random_id:long query_id:long id:string schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut allow_paid_stars:flags.21?long = Updates;
messages.sendScreenshotNotification#a1405817 peer:InputPeer reply_to:InputReplyTo random_id:long = Updates;
messages.sendMultiMedia#1bf89d74 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo multi_media:Vector<InputSingleMedia> schedule_date:flags.10?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long = Updates;
messages.sendWebViewData#dc0242c8 bot:InputUser random_id:long button_text:string data:string = Updates;
messages.sendQuickReplyMessages#6c750de1 peer:InputPeer shortcut_id:int id:Vector<int> random_id:Vector<long> = Updates;
messages.sendPaidReaction#58bbcb50 flags:# peer:InputPeer msg_id:int count:int random_id:long private:flags.0?PaidReactionPrivacy = Updates;
messages.viewSponsoredMessage#269e3643 random_id:bytes = Bool;
messages.clickSponsoredMessage#8235057e flags:# media:flags.0?true fullscreen:flags.1?true random_id:bytes = Bool;
messages.reportSponsoredMessage#12cbf0c4 random_id:bytes option:bytes = channels.SponsoredMessageReportResult;
messages.createForumTopic#2f98c3d5 flags:# title_missing:flags.4?true peer:InputPeer title:string icon_color:flags.0?int icon_emoji_id:flags.3?long random_id:long send_as:flags.2?InputPeer = Updates;
payments.sendStarGiftOffer#8fb86b41 flags:# peer:InputPeer slug:string price:StarsAmount duration:int random_id:long allow_paid_stars:flags.0?long = Updates;
phone.requestCall#42ff96ed flags:# video:flags.0?true user_id:InputUser random_id:int g_a_hash:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.createGroupCall#48cdc6d8 flags:# rtmp_stream:flags.2?true peer:InputPeer random_id:int title:flags.0?string schedule_date:flags.1?int = Updates;
phone.createConferenceCall#7d0444bb flags:# muted:flags.0?true video_stopped:flags.2?true join:flags.3?true random_id:int public_key:flags.3?int256 block:flags.3?bytes params:flags.3?DataJSON = Updates;
phone.sendGroupCallMessage#b1d11410 flags:# call:InputGroupCall random_id:long message:TextWithEntities allow_paid_stars:flags.0?long send_as:flags.1?InputPeer = Updates;
stories.sendStory#8f9e6898 flags:# pinned:flags.2?true noforwards:flags.4?true fwd_modified:flags.7?true peer:InputPeer media:InputMedia media_areas:flags.5?Vector<MediaArea> caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long period:flags.3?int fwd_from_id:flags.6?InputPeer fwd_from_story:flags.6?int albums:flags.8?Vector<int> music:flags.9?InputDocument = Updates;
stories.startLive#d069ccde flags:# pinned:flags.2?true noforwards:flags.4?true rtmp_stream:flags.5?true peer:InputPeer caption:flags.0?string entities:flags.1?Vector<MessageEntity> privacy_rules:Vector<InputPrivacyRule> random_id:long messages_enabled:flags.6?Bool send_paid_messages_stars:flags.7?long = Updates;
```

<!-- end updateMessageID schema -->

Many methods in the API take a `random_id` parameter: this parameter is used to match an outgoing message generated to the method call that generated it, in order to determine if, for example, a message was successfully sent or not.  

Normally, just the method response is enough to determine if a message was sent or not: however, if an MTProto session is removed by the server in the lapse of time between a method call and the emission of a method response, the method call response is lost and cannot be recovered.  
  
This normally would not be a very big issue, because the normal [update handling logic &raquo;](#update-handling) would recover (for example) the [updateNewMessage](/constructor/updateNewMessage.md) generated by a [messages.sendMessage](/method/messages.sendMessage.md) when the client creates a new MTProto session and invokes getDifference: however, this [updateNewMessage](/constructor/updateNewMessage.md) won't be associated with the [messages.sendMessage](/method/messages.sendMessage.md) that generated it, as it will be returned by [updates.getDifference](/method/updates.getDifference.md), instead.  

This means that the client won't be able to mark the [messages.sendMessage](/method/messages.sendMessage.md) as successfully executed, and will (wrongly) mark the message as not sent (even if the actual message is delivered, leading to two copies of the same message appearing in the chat, one successfully sent, and one makred as not sent).  

A similar issue may occur if an internal (i.e. 500) RPC error is generated by a method before the response is generated, but after the message is successfully sent to the destination.  

[updateMessageID](/constructor/updateMessageID.md) solves all these issues: it is emitted by all methods that take a `random_id` and generate a [Message](/type/Message.md) constructor in any chat, and contains the generated outgoing [Message](/type/Message.md) ID, and the `random_id` of the method call that generated the message.  

Most importantly, [updateMessageID](/constructor/updateMessageID.md) is delivered as a normal update, and even if the method response that generated it gets lost, it will eventually be re-delivered using the [update handling logic &raquo;](#update-handling) (for example by [updates.getDifference](/method/updates.getDifference.md)).  

[messages.sendMultiMedia](/method/messages.sendMultiMedia.md) takes an array of `random_id`s inside the passed [inputSingleMedia](/constructor/inputSingleMedia.md)s, and generates that many [updateMessageID](/constructor/updateMessageID.md).  

`random_id` is also used by the server to deduplicate method calls: if the client attempts invoking a method passing a `random_id` which was already used by a previous method call of the same type (or a different type) towards the same peer, from any session of the current account at any time in the past (used `random_id`s stored by the server do **not** expire), the method call will simply return the messages generated by the previous method call, instead of sending a new message, and if the previous method call is currently inflight (i.e. the message is being generated server-side), a `RANDOM_ID_DUPLICATE` error will be emitted.  

In some cases like for [messages.requestEncryption](/method/messages.requestEncryption.md), `RANDOM_ID_DUPLICATE` will always be emitted if a duplicate `random_id` is provided (instead of returning the previously generated secret chat).  

[updateStoryID](/constructor/updateStoryID.md) is the counterpart of [updateMessageID](/constructor/updateMessageID.md) for [stories &raquo;](/api/stories.md), which maps a [StoryItem](/type/StoryItem.md) to the method call that generated it.  

On the other hand, `random_id`s in [live drafts &raquo;](/api/bots/ai.md#live-response-streaming) **can** and often **must** be reused, in order to keep updating the same live draft.  
  

### Fetching state

The *common* update state is represented by the [updates.State](/type/updates.State.md) constructor.
When the user logs in for the first time, a call to [updates.getState](/method/updates.getState.md) has to be made to store the latest update state (which will not be the absolute initial state, just the latest state at the current time).
The common update state can also be fetched from [updates.differenceTooLong](/constructor/updates.differenceTooLong.md).

The *channel update state* is represented simply by the `pts` of the event sequence: when first logging in, the initial channel state can be obtained from the [dialog](/constructor/dialog.md) constructor when fetching dialogs, from [the full channel info](/constructor/channelFull.md), or it can be received [as an updateChannelTooLong update](/constructor/updateChannelTooLong.md).

The *secondary update state* is represented by the `qts` of the secret event sequence, it is contained in the [updates.State](/type/updates.State.md) of the *common update state*.

The _Updates sequence state_ is represented by the `date` and `seq` of the _Updates sequence_, it is contained in the [updates.State](/type/updates.State.md) of the *common* update state.

### Update handling

Update handling in Telegram clients consists of receiving events, making sure there were no gaps and no events were missed based on the locally stored state of the correspondent event sequence, and then updating the locally stored state based on the parameters received.

When the client receives payload with serialized updates, first of all, it needs to walk through all of the nested [Update](/type/Update.md) objects and check if they belong to any of message box sequences (have `pts` or `qts` parameters). Those updates need to be handled separately according to corresponding local state and new `pts`/`qts` values. [Details below&nbsp;&raquo;](#pts-checking-and-applying)

After message box updates are handled, if there are any other updates remaining the client needs to handle them with respect to `seq`. [Details below&nbsp;&raquo;](#seq-checking-and-applying)

#### `pts`: checking and applying

Here, `local_pts` will be the local state, `pts` will be the remote state, `pts_count` will be the number of events in the update.

* If `local_pts + pts_count === pts`, the update can be applied.
* If `local_pts + pts_count > pts`, the update was already applied, and must be ignored.
* If `local_pts + pts_count < pts`, there's an update gap that must be [filled](#recovering-gaps).

For example, let's assume the client has the following local state for the channel `123456789`:
```
local_pts = 131
```

Now let's assume an [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) from channel `123456789` is received with `pts = 132` and `pts_count=1`.
Since `local_pts + pts_count === pts`, the total number of events since the last stored state is, in fact, equal to `pts_count`: this means the update can be safely accepted and the remote `pts` applied:

```
local_pts = 132
```

Since:

* `pts` indicates the server state **after** the new channel message events are generated
* `pts_count` indicates the number of events in the new channel update
* The server state **before the new channel message event was generated** has to be: `pts_before = pts - pts_count = 131`, which is, in fact, equal to our local state.

Now let's assume an [updateNewChannelMessage](/constructor/updateNewChannelMessage.md) from channel `123456789` is received with `pts = 132` and `pts_count=1`.
Since `local_pts + pts_count > pts` (`133 > 132`), the update is skipped because we've already handled this update (in fact, our current `local_pts` was set by this same update, and it was resent twice due to network issues or other issues).

Now let's assume an [updateDeleteChannelMessages](/constructor/updateDeleteChannelMessages.md) from channel `123456789` is received with `pts = 140` and `pts_count=5`.
Since `local_pts + pts_count < pts` (`137 < 140`), this means that updates were missed, and the gap must be recovered.

##### `qts`: Secret chats & bots

The same algorithm used to apply [pts updates](#pts-checking-and-applying) is also used for secret chats and certain bot updates, but there is a `qts` instead of `pts`, and events are never grouped, so `qts_count` is always equal to 1 (and for this reason, this redundant field is not present in updates).  

#### `seq`: checking and applying 

On the top level when handling received [updates](/constructor/updates.md) and [updatesCombined](/constructor/updatesCombined.md) there are four possible cases:

* If `seq_start === 0`, the updates can be applied: this is a special case for updates that aren't ordered and should just be applied immediately.
* If `local_seq + 1 === seq_start`, the updates can be applied.
* If `local_seq + 1 > seq_start`, the updates were already applied, and must be ignored.
* If `local_seq + 1 < seq_start`, there's an updates gap that must be [filled](#recovering-gaps) (updates.getDifference must be used as with common and secret event sequences).

If the updates were applied, local _Updates state_ must be updated with `seq` (unless it's 0) and `date` from the constructor.

For all the other [Updates](/type/Updates.md) type constructors there is no need to check `seq` or change a local state.

#### `version`: checking and applying

Some updates related to basic groups or group calls have a `version` integer field, which should be used similarly to `pts`/`qts` values to deduplicate/update outdated chat information as specified [here (basic groups) &raquo;](/api/peers.md#basic-group-updates) and [here (group calls) &raquo;](/api/group-calls.md#applying-group-call-updates).  

#### `next_offset`: checking and applying

Updates related to the [e2e conference blockchain](/api/end-to-end/group-calls.md) have a `next_offset` integer field, which should be used similarly to `pts` values to deduplicate incoming blocks as specified [here &raquo;](/api/end-to-end/group-calls.md#handling-updates).  

### Recovering gaps 

To do this, [updates.getDifference](/method/updates.getDifference.md) (common/secret state) or [updates.getChannelDifference](/method/updates.getChannelDifference.md) (channel state) with the respective local states must be called.  

Manually obtaining updates through the above methods is required in the following situations:

* On startup, *only* [updates.getDifference](/method/updates.getDifference.md) should be called, to fetch updates received while the client was offline (preferably with some flags to reduce server load, see the method's docs).  
  [updates.getChannelDifference](/method/updates.getChannelDifference.md) does *not* have to be manually called for all channels on startup.  
  Instead, [updates.getChannelDifference](/method/updates.getChannelDifference.md) will be automatically triggered (only for channels that need catching up) by a set of [updateChannelTooLong](/constructor/updateChannelTooLong.md) updates that will be returned by the [updates.getDifference](/method/updates.getDifference.md) call.  
* Loss of sync: a gap was found in  **seq** / **pts** / **qts** / **version** (as described above). Note that it may be useful to wait up to 0.5 seconds in this situation, as the missing updates may have been simply reordered by the server, and may arrive shortly after, filling the gap. If the gap is not filled within 0.5 seconds by another incoming update, proceed with the manual gap filling logic.
* Session loss on the server: the client receives a [new session created notification](/mtproto/service_messages.md#new-session-creation-notification). This can be caused by garbage collection on the MTProto server or a server reboot.
* Incorrect update: the client cannot deserialize the received data.
* Incomplete update: the client is missing data about a chat/user from one of the shortened constructors, such as [updateShortChatMessage](/constructor/updateShortChatMessage.md), etc.
* Long period without updates: no updates for 15 minutes or longer.
* The server requests the client to fetch the difference using [updateChannelTooLong](/constructor/updateChannelTooLong.md) or [updatesTooLong](/constructor/updatesTooLong.md).

When calling [updates.getDifference](/method/updates.getDifference.md) if the [updates.differenceSlice](/constructor/updates.differenceSlice.md) constructor is returned in response, the full difference was too large to be received in one request. The intermediate status, **intermediate_state**, must be saved on the client and the query must be repeated, using the intermediate status as the current status.

To fetch the updates difference of a channel, [updates.getChannelDifference](/method/updates.getChannelDifference.md) is used.  
If the difference is too large to be received in one request, the `final` flag of the result is **not** set (see [docs](/type/updates.ChannelDifference.md)).  
The intermediate status, represented by the **pts**, must be saved on the client and the query must be repeated, using the intermediate status as the current status.  

For performance reasons and for a better user experience, clients can specify the number of updates to be returned by each call during pagination using the `pts_total_limit` parameter of [updates.getDifference](/method/updates.getDifference.md) and `limit` parameter for [updates.getChannelDifference](/method/updates.getChannelDifference.md).  

It is recommended to use a limit equal to `10-100` for channels and `1000-10000` otherwise.  

As mentioned above, the specified limit does **not** limit the total number of updates that can be fetched with getChannelDifference/getDifference, it just limits the number of updates returned by each individual getDifference call while paginating through the message box, each time passing the `pts`/`qts` returned by the previous call until a `final`/non-slice result is returned, indicating no more updates are available.  

Do not re-invoke [updates.getChannelDifference](/method/updates.getChannelDifference.md) if the returned difference is `final`, unless [the user has opened the channel/supergroup&nbsp;&raquo;](#subscribing-to-updates-of-channels-supergroups).  

#### Recovering gaps for very old messages

The various [message boxes](#event-sequences) (the common message box, channel message boxes, etc) have a fixed `size`: the exact size of message boxes is a server-side implementation detail that clients should not rely on, but it is usually very large, 100000 for channels and 5000000 for the common message box.  

Very old messages with a `pts < (latestPts - size)` will be deleted from a message box and will not be fetchable anymore using [updates.getChannelDifference](/method/updates.getChannelDifference.md)/[updates.getDifference](/method/updates.getDifference.md): invoking those methods with a `pts < (latestPts - size)` will return an [updates.channelDifferenceTooLong](/constructor/updates.channelDifferenceTooLong.md)/[updates.differenceTooLong](/constructor/updates.differenceTooLong.md) constructor, and clients have to handle this by [re-fetching the latest state for that message box](#fetching-state) and re-start fetching updates from that state, and filling any gaps in older messages manually by using [channels.getMessages](/method/channels.getMessages.md) and [messages.getMessages](/method/messages.getMessages.md), if necessary (i.e. if the user scrolls back far enough in the message/chat history).  

Please note that the [updatesTooLong](/constructor/updatesTooLong.md)/[updateChannelTooLong](/constructor/updateChannelTooLong.md) updates, on the other hand, do **not** necessarily indicate the message box size limit was reached, they simply indicate that the number of queued updates for a message box is too large to be delivered passively through the socket, and [updates.getDifference](/method/updates.getDifference.md)/[updates.getChannelDifference](/method/updates.getChannelDifference.md) can be invoked normally to fetch the difference.  

Note the subtle difference between filling gaps normally using getChannelDifference/getDifference, and filling gaps for really old messages (`< (latestPts - size)`) using [channels.getMessages](/method/channels.getMessages.md)/[messages.getMessages](/method/messages.getMessages.md):

- With the normal gap filling logic with getChannelDifference/getDifference, it's enough to simply store the last known PTS, and request new updates by passing that PTS to getDifference, eventually paginating through updates until the client catches up.  
  
  If the client has a message database, it can be simply populated by the update handling logic (either through passive updates, or through the getDiff logic), applying updates one by one as they arrive (after reordering and deduplication by the usual update handling logic described above), simply storing messages to the DB, using [message ID](#message-id-sequences) (common message box) or [peer ID+message ID](#message-id-sequences) (channel message boxes, secret chats) as primary key.
  
  With the normal gap filling logic, there's no need to worry if gaps in the message ID sequence are encountered in the local message database, as it's guaranteed that getDifference will deliver all relevant updates needed to fill the message database, and message ID gaps are caused (for example) by deleted messages, and must not be "filled".  

- With the edge case gap filling logic with [channels.getMessages](/method/channels.getMessages.md)/[messages.getMessages](/method/messages.getMessages.md), suddenly message ID gaps encountered in the local message database become a problem: are they legitimate gaps caused by deleted messages that should be ignored, or gaps caused by an unrecoverable getDifference hole that must be recovered using [channels.getMessages](/method/channels.getMessages.md)/[messages.getMessages](/method/messages.getMessages.md) because they may contain actual, non-deleted messages?  

  One of the many ways to handle this is to keep track of known message ID ranges that do not contain gaps using a data structure like a segment tree, or any other data structure that allows to efficiently check if a message ID is contained by any range.  

  All messages belonging to private chats and [basic groups &raquo;](/api/channel.md#basic-groups) are stored in one single instance of this data structure (because they share the same [id sequence](#message-id-sequences)).  
  Messages belonging to supergroup and channels are stored each in their own instance of the data structure, one per channel/supergroup (as channels and supergroups each have their own independent [id sequence](#message-id-sequences)).  

  For example, a somewhat naïve and inefficient implementation could store `[start_msg_id, end_msg_id]` message IDs of valid ranges in a simple list structure:  

  ```
  struct {
    list: List<Pair[int, int]>,
    pending: bool,
  }
  ```

  The structure is first initialized with an empty list and `pending` set to true.  

  Receiving a message via the socket or via getDifference/getChannelDifference will generate the following effects:
  
  - If `pending` is equal to true, the first processed message will atomically append a new `Pair{}` to `list` (with both range elements equal to the message ID) and set `pending` to false.
  - If `pending` is equal to true, incoming messages will atomically update the `end_msg_id` of the last `Pair` in `list` (setting it to the message ID).
  - If an unfillable gap is encountered when invoking getChannelDifference/getDifference, `pending` is set to `true`, the update state (pts) is refetched from scratch, and getChannelDifference/getDifference is re-invoked with the new pts.  

  When scrolling back in the message history or viewing context around individual messages, always keep track of the range of the messages being displayed, and if a gap is detected (either because there are no more ranges, or because the range changed), fill it by invoking:

  - [messages.getMessages](/method/messages.getMessages.md) for all basic groups and private chats, passing up to 200 IDs from the range that needs filling, re-invoking the method until the desired range is fetched.  
    This method is **not** limited by the common message box size.  
  - [channels.getMessages](/method/channels.getMessages.md) for individual supergroups and channels, passing up to 200 IDs from the range that needs filling, re-invoking the method until the desired range is fetched.  
    This method is **not** limited by the channel message box size, however, **very** old channel/supergroup messages may still be inaccessible.  .  

  Messages returned by those methods should be appropriately loaded into the message database and update existing ranges (or create new ones, if the returned range does not touch other existing ranges).  

  These methods will return placeholder [messageEmpty](/constructor/messageEmpty.md) constructors for deleted or otherwise non-representable messages, so that the entire fetched range is returned, in one way or another.  

  Messages obtained via other methods like [messages.getHistory](/method/messages.getHistory.md) (meaning, not just those that return [Updates](/type/Updates.md), piped into the usual update deduplication/handling logic) may also extend/generate ranges.  

  Please note, however, that [messages.getHistory](/method/messages.getHistory.md) **cannot** be used to fill gaps in **channels/supergroups**, as it is also limited by the channel message box size.  

### Subscribing to updates of channels/supergroups

The API will *usually* send passive updates (i.e. as standalone [Updates](/type/Updates.md) constructors in the socket) for channels/supergroups the user/bot is a member of.  

However, in some cases the API may stop sending updates (or send fewer updates) for some channels/supergroups: thus clients (user accounts only) should also additionally invoke [updates.getChannelDifference](/method/updates.getChannelDifference.md) periodically for channels and supergroups the user is currently viewing (i.e. explicitly opened channels/supergroups in one or more tabs/windows).  

If the returned difference is non-`final`, the method should be called immediately with the new parameters [as usual](#recovering-gaps).  

If the returned difference is `final`, and the user is still viewing the messages of the supergroup/channel (i.e. via distinct tabs/windows), [updates.getChannelDifference](/method/updates.getChannelDifference.md) should be re-invoked after `timeout` seconds (if the flag is specified, otherwise after 1 second).  

This mechanism may also be used to enable *passive* reception of updates from channels or supergroups we're *not* a member of: if the specified channel or supergroup is public, or is private but temporarily available for a limited time thanks to a [chatInvitePeek](/constructor/chatInvitePeek.md), the API will start passively sending updates (i.e. as standalone [Updates](/type/Updates.md) constructors in the socket, as is already the case for normal channels/supergroups we've already joined) to all logged-in sessions, as long as any of the sessions continues to periodically invoke [updates.getChannelDifference](/method/updates.getChannelDifference.md) every `timeout` seconds (returned by the method, or every second if the `timeout` flag is absent from the return value of the method, or immediately with the new parameters if the returned difference is non-`final`).  

Clients should stop [updates.getChannelDifference](/method/updates.getChannelDifference.md) polling once the user closes the channel/supergroup: the API *may* continue emitting passive updates **only** if the user is a member of the channel/supergroup.  

Clients should also limit to 10 the maximum number of channels/supergroups short-polled using the above mechanism (i.e. if the user opens 11 windows on 11 different channels, short-poll with [updates.getChannelDifference](/method/updates.getChannelDifference.md) only the first 10).  

### Example implementations

Implementations also have to take care to postpone updates received via the socket while filling gaps in the event and Update sequences, as well as avoid filling gaps in the same sequence.

Example implementations: [tdlib](https://github.com/tdlib/td), [MadelineProto](https://github.com/danog/MadelineProto).  

An interesting and easy way this can be implemented, instead of using various locks, is by running background loops, like in [MadelineProto&nbsp;&raquo;](https://docs.madelineproto.xyz/docs/UPDATES_INTERNAL.html).

### [PUSH Notifications about Updates](/api/push-updates.md)

If a client does not have an active connection at the time of an event, [PUSH Notifications](/api/push-updates.md) will also be useful.

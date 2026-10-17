# Views and read metrics


Clients should report read state, message views and music listens using a specific set of methods.  

### Read state

    ---functions---

    messages.readHistory#e306d3a peer:InputPeer max_id:int = messages.AffectedMessages;
    channels.readHistory#cc104937 channel:InputChannel max_id:int = Bool;
    messages.readSavedHistory#ba4a3b5b parent_peer:InputPeer peer:InputPeer max_id:int = Bool;
    messages.readDiscussion#f731a9f4 peer:InputPeer msg_id:int read_max_id:int = Bool;
    messages.readEncryptedHistory#7f4b690a peer:InputEncryptedChat max_date:int = Bool;

Use one of the following methods, according to the type of the dialog where the messages were marked as read:

- [messages.readHistory](/method/messages.readHistory.md) marks messages as read in a user dialog or [basic group](/api/channel.md#basic-groups).
- [channels.readHistory](/method/channels.readHistory.md) marks messages as read in a [channel, supergroup or gigagroup](/api/channel.md).
- [messages.readSavedHistory](/method/messages.readSavedHistory.md) marks messages as read in a [monoforum](/api/monoforum.md) topic.
- [messages.readDiscussion](/method/messages.readDiscussion.md) marks messages as read in a [thread](/api/threads.md).
- [messages.readEncryptedHistory](/method/messages.readEncryptedHistory.md) marks messages as read in a [secret chat](/api/end-to-end.md).

Batch calls to these methods as follows:

- Locally keep track of the latest read message for all currently open chats (i.e. the ID of the latest read message can only increase, never decrease).
  - Since secret chats don't have a monotonically increasing message ID (and it **must not** be shared outside of secret chats anyway), use the seqno instead of the message ID to identify newer messages, but only send the **reception date** of the latest read message when the time comes, **not** the seqno.  
- If the last message pointer of a specific peer hasn't changed in the last 3 seconds and a view wasn't already reported to the server, invoke the appropriate readHistory method for the peer type.  
- If the user closes or suspends the client, invoke all pending readHistory calls immediately.  

These methods only update the server-side unread state: they do not [increment channel post view counters](#read-message-contents) and [do not send viewport metrics](#read-metrics).

### Read message contents

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    
    decryptedMessageActionReadMessages#c4f40be random_ids:Vector<long> = DecryptedMessageAction;
    decryptedMessageService#aa48327d random_id:long random_bytes:bytes action:DecryptedMessageAction = DecryptedMessage;

    ---functions---

    messages.readMessageContents#36a73f77 id:Vector<int> = messages.AffectedMessages;
    channels.readMessageContents#eab5dc38 channel:InputChannel id:Vector<int> = Bool;
    messages.sendEncryptedService#32d439a4 peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;

The [readHistory methods &raquo;](#read-state) should still always be invoked in batched mode when reading incoming messages: however, the following methods should also be used *in addition* to `readHistory`, to mark certain types of individual media messages as read, mark [live locations](/api/live-location.md) as read, and start deletion timers for expiring media files:

- [messages.readMessageContents](/method/messages.readMessageContents.md) for messages in user dialogs or [basic groups](/api/channel.md#basic-groups).
- [channels.readMessageContents](/method/channels.readMessageContents.md) for messages in [channels, supergroups and gigagroups](/api/channel.md). 
- [messages.sendEncryptedService](/method/messages.sendEncryptedService.md) with a [decryptedMessageService](/constructor/decryptedMessageService.md) containing a [decryptedMessageActionReadMessages](/constructor/decryptedMessageActionReadMessages.md) for messages in [secret chats](/api/end-to-end.md).

Unlike the readHistory methods, these methods take a **list of specific message IDs** rather than a `max_id` range.  

To avoid re-fetching the updated [message](/constructor/message.md) constructors when marking non-secret chat messages as read, clients should locally clear the following unread state after successfully sending the readMessageContents request:

- The [message](/constructor/message.md).`media_unread` flag.
- The [message](/constructor/message.md).`mentioned` flag.
- Unread [reactions](/api/reactions.md).
- Unread poll votes.

Invoke these methods only for incoming messages, in the cases described below.

#### Unread media mentions

For an incoming non-secret chat message with an unread media mention, invoke [messages.readMessageContents](/method/messages.readMessageContents.md) or [channels.readMessageContents](/method/channels.readMessageContents.md) when the message becomes visible in the chat.

Condition: `message.mentioned && message.media_unread && !message.isVoice() && !message.isRoundVideo()`

An unread media mention is represented by the [message](/constructor/message.md).`mentioned` and [message](/constructor/message.md).`media_unread` flags both being set.

Do not use [message](/constructor/message.md).`media_unread` alone as a visibility trigger. Without [message](/constructor/message.md).`mentioned`, unread playable media is marked as read only when playback starts or, for expiring media, when the media is opened.

Voice messages have a [messageMediaDocument](/constructor/messageMediaDocument.md) with a [documentAttributeAudio](/constructor/documentAttributeAudio.md) with the `voice` flag set.

Round videos have a [messageMediaDocument](/constructor/messageMediaDocument.md) with a [documentAttributeVideo](/constructor/documentAttributeVideo.md) with the `round_message` flag set.

Voice messages and round videos are excluded from this condition because they are marked as read when played.

Secret chat messages are excluded from this condition because [decryptedMessage](/constructor/decryptedMessage.md) does not contain `mentioned` or `media_unread` flags.

#### Unread playable media

For an incoming non-secret chat message with unread playable media, invoke [messages.readMessageContents](/method/messages.readMessageContents.md) or [channels.readMessageContents](/method/channels.readMessageContents.md) when playback starts.

Condition: [message](/constructor/message.md).`media_unread` is set, and the user starts playback of the media.

For secret chat voice messages and round videos, [decryptedMessage](/constructor/decryptedMessage.md) does not contain a `media_unread` flag. Clients should keep a local content-unread flag, initialized to true when receiving a voice message or round video, and clear it when the media is played.

Condition for secret chats: `local_content_unread && (decryptedMessage.isVoice() || decryptedMessage.isRoundVideo())` when playback starts.

For secret chats, invoke [messages.sendEncryptedService](/method/messages.sendEncryptedService.md) with a [decryptedMessageActionReadMessages](/constructor/decryptedMessageActionReadMessages.md) containing the [decryptedMessage](/constructor/decryptedMessage.md).`random_id`.

#### Non-secret expiring media

For incoming non-secret chat messages with expiring media, invoke [messages.readMessageContents](/method/messages.readMessageContents.md) or [channels.readMessageContents](/method/channels.readMessageContents.md) and start the deletion timer when the user opens the media or starts playback.

Expiring media has a non-zero [messageMediaPhoto](/constructor/messageMediaPhoto.md).`ttl_seconds` or [messageMediaDocument](/constructor/messageMediaDocument.md).`ttl_seconds`.

Condition: `0 < media.ttl_seconds < 0x7FFFFFFF && local_destroy_timer_not_started && user_opens_or_starts_playback`.

#### Non-secret view-once media

For incoming non-secret chat media with `media.ttl_seconds == 0x7FFFFFFF`, invoke [messages.readMessageContents](/method/messages.readMessageContents.md) or [channels.readMessageContents](/method/channels.readMessageContents.md) when the user opens the media or starts playback.

Condition: `media.ttl_seconds == 0x7FFFFFFF && local_destroy_timer_not_started && user_opens_or_starts_playback`.

Do not start a time-based deletion timer. Locally delete the media after the media viewer or voice message player is closed.

#### Secret chat expiring media

Secret chat messages use [decryptedMessage](/constructor/decryptedMessage.md).`ttl`.

For `0 < ttl < 0x7FFFFFFF`, invoke [messages.sendEncryptedService](/method/messages.sendEncryptedService.md) with a [decryptedMessageActionReadMessages](/constructor/decryptedMessageActionReadMessages.md) containing the [decryptedMessage](/constructor/decryptedMessage.md).`random_id` when the user opens the media or starts playback, and start the local deletion timer at the same time.

Condition: `0 < decryptedMessage.ttl < 0x7FFFFFFF && local_destroy_timer_not_started && user_opens_or_starts_playback`.

For secret chat media with `decryptedMessage.ttl == 0x7FFFFFFF`, do not send [decryptedMessageActionReadMessages](/constructor/decryptedMessageActionReadMessages.md). Treat the media as view-once: show it only after an explicit open action, and locally delete the media after it is closed.

#### Live locations

For a non-secret chat message containing a [live location](/api/live-location.md), invoke [messages.readMessageContents](/method/messages.readMessageContents.md) or [channels.readMessageContents](/method/channels.readMessageContents.md) when the live location map is open.

Messages containing live locations contain a [messageMediaGeoLive](/constructor/messageMediaGeoLive.md).

Condition: `message.media instanceof messageMediaGeoLive`

Re-invoke the method on all known live location messages in the chat, usually the ones returned by [messages.getRecentLocations](/method/messages.getRecentLocations.md), every 60 seconds until the live location map is closed.

### View counters

    message#95ef6f2b flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true pinned:flags.24?true noforwards:flags.26?true invert_media:flags.27?true flags2:# offline:flags2.1?true video_processing_pending:flags2.4?true paid_suggested_post_stars:flags2.8?true paid_suggested_post_ton:flags2.9?true id:int from_id:flags.8?Peer from_boosts_applied:flags.29?int from_rank:flags2.12?string peer_id:Peer saved_peer_id:flags.28?Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long via_business_bot_id:flags2.0?long guestchat_via_from:flags2.19?Peer reply_to:flags.3?MessageReplyHeader date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int forwards:flags.10?int replies:flags.23?MessageReplies edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long reactions:flags.20?MessageReactions restriction_reason:flags.22?Vector<RestrictionReason> ttl_period:flags.25?int quick_reply_shortcut_id:flags.30?int effect:flags2.2?long factcheck:flags2.3?FactCheck report_delivery_until_date:flags2.5?int paid_message_stars:flags2.6?long suggested_post:flags2.7?SuggestedPost schedule_repeat_period:flags2.10?int summary_from_language:flags2.11?string = Message;
    
    messageViews#455b853d flags:# views:flags.0?int forwards:flags.1?int replies:flags.2?MessageReplies = MessageViews;
    messages.messageViews#b6c4f543 views:Vector<MessageViews> chats:Vector<Chat> users:Vector<User> = messages.MessageViews;

    ---functions---

    messages.getMessagesViews#5784d3e1 peer:InputPeer id:Vector<int> increment:Bool = messages.MessageViews;

Messages sent to and forwarded from channels have a view counter in the [message](/constructor/message.md).`views` field: to increment the view counter and fetch the updated view counter, forward counter and thread information, invoke the [messages.getMessagesViews](/method/messages.getMessagesViews.md) method with `increment` set to [boolTrue](/constructor/boolTrue.md).

Calls to [messages.getMessagesViews](/method/messages.getMessagesViews.md) should be batched as follows: 

- Add the IDs of all [message](/constructor/message.md) constructors with a `views` field that are visible in the chat viewport to a local per-peer queue.
- Do not add the same message ID to the increment queue twice for the same peer (the queue should be a set).
- Flush the queue no later than 5 seconds after the first ID is queued, by invoking [messages.getMessagesViews](/method/messages.getMessagesViews.md) with `increment` set to [boolTrue](/constructor/boolTrue.md), one request per peer, with at most 100 message IDs per request.

For unread messages, queue the view counter when the bottom edge of the message becomes visible.  
For already read messages with a `views` field, queue it when the vertical center of the message becomes visible.

### Read metrics

    inputMessageReadMetric#402b4495 msg_id:int view_id:long time_in_view_ms:int active_time_in_view_ms:int height_to_viewport_ratio_permille:int seen_range_ratio_permille:int = InputMessageReadMetric;

    ---functions---

    messages.reportReadMetrics#4067c5e6 peer:InputPeer metrics:Vector<InputMessageReadMetric> = Bool;

Use [messages.reportReadMetrics](/method/messages.reportReadMetrics.md) to report how long visible messages stayed in the chat viewport.  

The viewport is the visible rectangle of the chat history list after excluding in-chat UI that covers messages.

Track one exposure while a message remains in the viewport:

- Ignore an exposure that lasts less than 300 milliseconds.
- Start a new `view_id` for every accepted exposure.
- Finalize (i.e. append to the send queue) the exposure when the message leaves the viewport for at least 300 milliseconds.
- Finalize (i.e. append to the send queue) and restart tracking after 5 minutes of continuous exposure.
- Pause time accumulation while the app or chat screen is inactive.
- Count active time only while the user is active; official clients consider the user active for 15 seconds after a user action.
- Batch finalized metrics per peer and flush them with [messages.reportReadMetrics](/method/messages.reportReadMetrics.md). Official clients use a 5 second flush delay.

Each [inputMessageReadMetric](/constructor/inputMessageReadMetric.md) is computed as follows:

- `msg_id` is the server [message ID](/api/updates.md#message-id-sequences) in `peer`.
- `view_id` is a random non-zero 64-bit ID generated for this exposure.
- `time_in_view_ms` is the total exposure time in milliseconds of at least one pixel of the message after the 300 millisecond entry grace period.
- `active_time_in_view_ms` is the part of `time_in_view_ms` accumulated while the user is active.
- `height_to_viewport_ratio_permille` is `round(max_message_height * 1000 / max_viewport_height)`. It can be greater than `1000` when the message is taller than the viewport.
- `seen_range_ratio_permille` is `round(max_seen_vertical_range * 1000 / max_message_height)`, clamped to the `0...1000` range.

If a grouped media album is rendered as one visual block, use the album block rectangle consistently when computing `height_to_viewport_ratio_permille` and `seen_range_ratio_permille` for the messages in that block.

### Music listens

    ---functions---

    messages.reportMusicListen#ddbcd819 id:InputDocument listened_duration:int = Bool;

Use [messages.reportMusicListen](/method/messages.reportMusicListen.md) to report listening time for a [document](/constructor/document.md) that represents a song, i.e. an audio document described by [documentAttributeAudio](/constructor/documentAttributeAudio.md) without the `voice` flag.

Accumulate only the time during which the song is playing. Do not include paused, pausing or stopped time.  
Invoke [messages.reportMusicListen](/method/messages.reportMusicListen.md) when playback stops, when another track starts, when the player is closed, or after a pause lasts at least 60 seconds.

Invoke [messages.reportMusicListen](/method/messages.reportMusicListen.md) only if the accumulated duration is at least 3 seconds:

- `id` is the [InputDocument](/type/InputDocument.md) of the listened song.
- `listened_duration` is the accumulated playing time in whole seconds.

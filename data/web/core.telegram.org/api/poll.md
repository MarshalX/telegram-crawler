# Polls and quizzes


Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

### Sending a poll

    pollAnswer#4b7d786a flags:# text:TextWithEntities option:bytes media:flags.0?MessageMedia added_by:flags.1?Peer date:flags.1?int = PollAnswer;

    poll#966e2dbf id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true open_answers:flags.6?true revoting_disabled:flags.7?true shuffle_answers:flags.8?true hide_results_until_close:flags.9?true creator:flags.10?true subscribers_only:flags.11?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int countries_iso2:flags.12?Vector<string> hash:long = Poll;

    inputMediaPoll#883a4108 flags:# poll:Poll correct_answers:flags.0?Vector<int> attached_media:flags.3?InputMedia solution:flags.1?string solution_entities:flags.1?Vector<MessageEntity> solution_media:flags.2?InputMedia = InputMedia;

    ---functions---

    messages.sendMedia#330e77f flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true noforwards:flags.14?true update_stickersets_order:flags.15?true invert_media:flags.16?true allow_paid_floodskip:flags.19?true peer:InputPeer reply_to:flags.0?InputReplyTo media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int schedule_repeat_period:flags.24?int send_as:flags.13?InputPeer quick_reply_shortcut:flags.17?InputQuickReplyShortcut effect:flags.18?long allow_paid_stars:flags.21?long suggested_post:flags.22?SuggestedPost = Updates;

To send a poll in a chat, call [messages.sendMedia](/method/messages.sendMedia.md), providing an [inputMediaPoll](/constructor/inputMediaPoll.md): its `poll` field contains the actual [poll](/constructor/poll.md) constructor, while the remaining [inputMediaPoll](/constructor/inputMediaPoll.md) fields configure quiz correct answers, the quiz solution and optional media attachments.

See the [poll](/constructor/poll.md) and [inputMediaPoll](/constructor/inputMediaPoll.md) constructor pages for a description of all available fields.

A specific answer within a poll message can be linked to using the `option` parameter of a [message deep link&nbsp;&raquo;](/api/links.md#message-links), which contains the base64url-encoded [pollAnswer](/constructor/pollAnswer.md).`option` of the answer to highlight.

In order to prematurely close the poll, preventing further votes, use [messages.editMessage](/method/messages.editMessage.md), setting the `poll.closed` flag to true.  

### Open-answer polls
    
    poll#966e2dbf id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true open_answers:flags.6?true revoting_disabled:flags.7?true shuffle_answers:flags.8?true hide_results_until_close:flags.9?true creator:flags.10?true subscribers_only:flags.11?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int countries_iso2:flags.12?Vector<string> hash:long = Poll;

    inputPollAnswer#199fed96 flags:# text:TextWithEntities media:flags.0?InputMedia = PollAnswer;

    pollAnswer#4b7d786a flags:# text:TextWithEntities option:bytes media:flags.0?MessageMedia added_by:flags.1?Peer date:flags.1?int = PollAnswer;

    messageActionPollAppendAnswer#9da1cd6c answer:PollAnswer = MessageAction;
    messageActionPollDeleteAnswer#399674dc answer:PollAnswer = MessageAction;

    ---functions---

    messages.addPollAnswer#19bc4b6d peer:InputPeer msg_id:int answer:PollAnswer = Updates;
    messages.deletePollAnswer#ac8505a5 peer:InputPeer msg_id:int option:bytes = Updates;

When a poll is created with the [poll](/constructor/poll.md).`open_answers` flag set, users can add new answer options to the poll after it has been sent.

To add a new answer, call [messages.addPollAnswer](/method/messages.addPollAnswer.md), providing an [inputPollAnswer](/constructor/inputPollAnswer.md) with the new answer's `text` and an optional `media` attachment.

To remove an answer option, call [messages.deletePollAnswer](/method/messages.deletePollAnswer.md), specifying the `option` identifier of the answer to delete. Only the user who added the answer or the poll creator can delete it; a user that is not the poll creator may only delete an answer they added within [`poll_answer_delete_period` &raquo;](/api/config.md#poll-answer-delete-period) seconds of adding it.

When an answer is added or removed, all participants in the chat receive a service message: [messageActionPollAppendAnswer](/constructor/messageActionPollAppendAnswer.md) when an answer is appended, or [messageActionPollDeleteAnswer](/constructor/messageActionPollDeleteAnswer.md) when one is deleted.

The `pollAnswer.added_by` and `pollAnswer.date` fields indicate which peer added a given answer and when. These fields are only populated for answers that were dynamically added to an open-answer poll; the original answers set when creating the poll do not carry these fields.

### Voting in polls

    pollAnswerVoters#3645230a flags:# chosen:flags.0?true correct:flags.1?true option:bytes voters:flags.2?int recent_voters:flags.2?Vector<Peer> = PollAnswerVoters;

    pollResults#ba7bb15e flags:# min:flags.0?true has_unread_votes:flags.6?true can_view_stats:flags.7?true results:flags.1?Vector<PollAnswerVoters> total_voters:flags.2?int recent_voters:flags.3?Vector<Peer> solution:flags.4?string solution_entities:flags.4?Vector<MessageEntity> solution_media:flags.5?MessageMedia = PollResults;

    poll#966e2dbf id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true open_answers:flags.6?true revoting_disabled:flags.7?true shuffle_answers:flags.8?true hide_results_until_close:flags.9?true creator:flags.10?true subscribers_only:flags.11?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int countries_iso2:flags.12?Vector<string> hash:long = Poll;

    messageMediaPoll#773f4e66 flags:# poll:Poll results:PollResults attached_media:flags.0?MessageMedia = MessageMedia;

    updateMessagePoll#d64c522b flags:# peer:flags.1?Peer msg_id:flags.1?int top_msg_id:flags.2?int poll_id:long poll:flags.0?Poll results:PollResults = Update;

    ---functions---

    messages.sendVote#10ea6184 peer:InputPeer msg_id:int options:Vector<bytes> = Updates;

When receiving a [message](/constructor/message.md) with a [messageMediaPoll](/constructor/messageMediaPoll.md), users can vote in it using [messages.sendVote](/method/messages.sendVote.md), specifying the chosen `option` identifiers.

The method will return an [updateMessagePoll](/constructor/updateMessagePoll.md), containing an updated [pollResults](/constructor/pollResults.md) constructor, with the `chosen` flag set on the chosen options, and the `correct` flag set on the correct answers.

[pollResults](/constructor/pollResults.md) also carries:
- `has_unread_votes` - Whether the non-anonymous poll has votes that haven't been read yet (see [unread poll votes »](#unread-poll-votes))
- `solution_media` - An optional media attachment shown alongside the quiz solution explanation
- `can_view_stats` - Whether the current user can view detailed [poll statistics »](/api/stats.md#poll-statistics)

The [updateMessagePoll](/constructor/updateMessagePoll.md) now includes `peer`, `msg_id`, and `top_msg_id` to identify exactly which message the update pertains to (including for [file references](/api/file-references.md)), in addition to the `poll_id`; these fields are absent when poll results are pushed to channel subscribers.  

#### Vote restrictions

Before enabling the voting UI, clients should verify that the current user is actually allowed to vote. A user **cannot** vote in a poll if any of the following conditions apply:

- The poll is closed, i.e. [poll](/constructor/poll.md).`closed` is set (see [above](#sending-a-poll)).
- The poll is [subscriber-only »](#subscriber-only-polls) and the user is not an eligible subscriber.
- The poll is [country-restricted »](#country-restricted-polls) and the user's country is not in the allowed list.

### Subscriber-only polls

    poll#966e2dbf id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true open_answers:flags.6?true revoting_disabled:flags.7?true shuffle_answers:flags.8?true hide_results_until_close:flags.9?true creator:flags.10?true subscribers_only:flags.11?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int countries_iso2:flags.12?Vector<string> hash:long = Poll;

    channel#1c32b11c flags:# creator:flags.0?true left:flags.2?true broadcast:flags.5?true verified:flags.7?true megagroup:flags.8?true restricted:flags.9?true signatures:flags.11?true min:flags.12?true scam:flags.19?true has_link:flags.20?true has_geo:flags.21?true slowmode_enabled:flags.22?true call_active:flags.23?true call_not_empty:flags.24?true fake:flags.25?true gigagroup:flags.26?true noforwards:flags.27?true join_to_send:flags.28?true join_request:flags.29?true forum:flags.30?true flags2:# stories_hidden:flags2.1?true stories_hidden_min:flags2.2?true stories_unavailable:flags2.3?true signature_profiles:flags2.12?true autotranslation:flags2.15?true broadcast_messages_allowed:flags2.16?true monoforum:flags2.17?true forum_tabs:flags2.19?true id:long access_hash:flags.13?long title:string username:flags.6?string photo:ChatPhoto date:int restriction_reason:flags.9?Vector<RestrictionReason> admin_rights:flags.14?ChatAdminRights banned_rights:flags.15?ChatBannedRights default_banned_rights:flags.18?ChatBannedRights participants_count:flags.17?int usernames:flags2.0?Vector<Username> stories_max_id:flags2.4?RecentStory color:flags2.7?PeerColor profile_color:flags2.8?PeerColor emoji_status:flags2.9?EmojiStatus level:flags2.10?int subscription_until_date:flags2.11?int bot_verification_icon:flags2.13?long send_paid_messages_stars:flags2.14?long linked_monoforum_id:flags2.18?long = Chat;

    channelForbidden#17d493d5 flags:# broadcast:flags.5?true megagroup:flags.8?true monoforum:flags.10?true id:long access_hash:long title:string until_date:flags.16?int = Chat;

    messageFwdHeader#4e4df4bb flags:# imported:flags.7?true saved_out:flags.11?true from_id:flags.0?Peer from_name:flags.5?string date:int channel_post:flags.2?int post_author:flags.3?string saved_from_peer:flags.4?Peer saved_from_msg_id:flags.4?int saved_from_id:flags.8?Peer saved_from_name:flags.9?string saved_date:flags.10?int psa_type:flags.6?string = MessageFwdHeader;

    ---functions---

    messages.sendVote#10ea6184 peer:InputPeer msg_id:int options:Vector<bytes> = Updates;

When the [poll](/constructor/poll.md).`subscribers_only` flag (`flags.11`) is set, only subscribers of the channel/supergroup where it was posted may vote in it.  

A user may vote only if **both** of the following are true, evaluated against the [channel](/constructor/channel.md) constructor of the peer where the poll was posted (for forwarded polls, the original peer in [messageFwdHeader](/constructor/messageFwdHeader.md).`from_id`):

- The user is currently a member: the [channel](/constructor/channel.md).`left` flag (`flags.2`) is **unset**. (Banned/kicked users have `left` set, or are exposed as a [channelForbidden](/constructor/channelForbidden.md) with no membership at all.)
- The user joined at least **24 hours** (`86400` seconds) before the poll message was posted, i.e. `message.date - channel.date >= 86400`, where [channel](/constructor/channel.md).`date` is the date the current user joined. For forwarded polls, use [messageFwdHeader](/constructor/messageFwdHeader.md).`date` instead of [message](/constructor/message.md).`date` to obtain the date when the poll was posted. 

If either condition is not met, clients should disable the voting UI and indicate that voting is restricted to long-time subscribers.  

### Country-restricted polls

When a [poll](/constructor/poll.md) is created with the `countries_iso2` field set (to at most [`poll_countries_max` &raquo;](/api/config.md#poll-countries-max) [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes), only users located in one of the listed countries may vote in it.  

To determine whether the current user may vote, clients must compare the poll's `countries_iso2` list against the user's own country code, exposed by the [`phone_country_iso2` &raquo;](/api/config.md#phone-country-iso2) configuration parameter (which the server derives from the user's phone number).  

If `phone_country_iso2` is **not** contained in the poll's `countries_iso2`, the user is not allowed to vote: clients should disable the voting UI and indicate that voting is restricted to the poll's allowed countries.  

### Getting poll votes

    pollAnswerVoters#3645230a flags:# chosen:flags.0?true correct:flags.1?true option:bytes voters:flags.2?int recent_voters:flags.2?Vector<Peer> = PollAnswerVoters;

    pollResults#ba7bb15e flags:# min:flags.0?true has_unread_votes:flags.6?true can_view_stats:flags.7?true results:flags.1?Vector<PollAnswerVoters> total_voters:flags.2?int recent_voters:flags.3?Vector<Peer> solution:flags.4?string solution_entities:flags.4?Vector<MessageEntity> solution_media:flags.5?MessageMedia = PollResults;

    updateMessagePoll#d64c522b flags:# peer:flags.1?Peer msg_id:flags.1?int top_msg_id:flags.2?int poll_id:long poll:flags.0?Poll results:PollResults = Update;

    ---functions---

    messages.getPollResults#eda3e33b peer:InputPeer msg_id:int poll_hash:long = Updates;

Regularly, if new users have voted in polls available to the user, they will receive an [updateMessagePoll](/constructor/updateMessagePoll.md), with updated [pollResults](/constructor/pollResults.md).  

The same constructor can also be fetched manually using [messages.getPollResults](/method/messages.getPollResults.md). The `poll_hash` parameter should be set to the current `poll.hash` value from the last received poll state; the server uses it to skip sending back unchanged data.

### Unread poll votes

    ---functions---

    messages.getUnreadPollVotes#43286cf2 flags:# peer:InputPeer top_msg_id:flags.0?int offset_id:int add_offset:int limit:int max_id:int min_id:int = messages.Messages;
    messages.readPollVotes#1720b4d8 flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;

When users cast votes in a non-anonymous poll, the poll owner's [dialog](/constructor/dialog.md) and [forumTopic](/constructor/forumTopic.md) expose an `unread_poll_votes_count` counter that increments for each unread vote. The [pollResults](/constructor/pollResults.md) `has_unread_votes` flag signals that there are pending unread votes for that specific poll.

[messages.getUnreadPollVotes](/method/messages.getUnreadPollVotes.md) returns the messages in the specified chat that contain polls with unread votes. The `offset_id`, `add_offset`, `limit`, `max_id`, and `min_id` parameters work the same way as in other paginated message list methods. The optional `top_msg_id` restricts the results to a specific forum topic.

[messages.readPollVotes](/method/messages.readPollVotes.md) marks all unread poll votes in the specified chat (or forum topic, when `top_msg_id` is set) as read, resetting the `unread_poll_votes_count` counter.

### Getting poll voters in non-anonymous polls

    messagePeerVote#b6cc2d5c peer:Peer option:bytes date:int = MessagePeerVote;
    messagePeerVoteInputOption#74cda504 peer:Peer date:int = MessagePeerVote;
    messagePeerVoteMultiple#4628f6e6 peer:Peer options:Vector<bytes> date:int = MessagePeerVote;

    messages.votesList#4899484e flags:# count:int votes:Vector<MessagePeerVote> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.VotesList; 

    updateMessagePollVote#7699f014 poll_id:long peer:Peer options:Vector<bytes> positions:Vector<int> qts:int = Update;

    ---functions---
    
    messages.getPollVotes#b86e380e flags:# peer:InputPeer id:int option:flags.0?bytes offset:flags.1?string limit:int = messages.VotesList; 

[messages.getPollVotes](/method/messages.getPollVotes.md) can be used to get poll results for non-anonymous polls, to see how each user voted for a poll option.  
Bots will also receive an [updateMessagePollVote](/constructor/updateMessagePollVote.md) every time a user changes their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. 

The `positions` field contains the 0-based indices of the voted `options` within the poll's `answers` vector, corresponding element-by-element.

### Replying to poll options

    inputReplyToMessage#3bd4b7c2 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int monoforum_peer_id:flags.5?InputPeer todo_item_id:flags.6?int poll_option:flags.7?bytes = InputReplyTo;

    messageReplyHeader#1b97dd66 flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int todo_item_id:flags.11?int poll_option:flags.12?bytes = MessageReplyHeader;

A message can be sent as a reply to a specific poll option by setting the `poll_option` field in [inputReplyToMessage](/constructor/inputReplyToMessage.md) to the `option` bytes of the desired answer. The resulting message's [messageReplyHeader](/constructor/messageReplyHeader.md) will contain the same `poll_option` bytes, indicating which poll answer option the reply is directed at.

### Searching for polls

    inputMessagesFilterPoll#fa2bc90a = MessagesFilter;

Pass [inputMessagesFilterPoll](/constructor/inputMessagesFilterPoll.md) as the `filter` parameter in `messages.search` to retrieve only poll messages from a chat.

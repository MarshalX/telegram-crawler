# pollResults

Results of poll

```tl
pollResults#ba7bb15e flags:# min:flags.0?true has_unread_votes:flags.6?true can_view_stats:flags.7?true results:flags.1?Vector<PollAnswerVoters> total_voters:flags.2?int recent_voters:flags.3?Vector<Peer> solution:flags.4?string solution_entities:flags.4?Vector<MessageEntity> solution_media:flags.5?MessageMedia = PollResults;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Similar to [min](/api/min.md) objects, used for poll constructors that are the same for all users so they don't have the option chosen by the current user (you can use [messages.getPollResults](/method/messages.getPollResults.md) to get the full poll results). |
| **has\_unread\_votes** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether there are unread votes in this non-anonymous poll, see [polls »](/api/poll.md#unread-poll-votes) |
| **can\_view\_stats** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether the current user can view detailed [poll statistics »](/api/stats.md#poll-statistics) |
| **results** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[PollAnswerVoters](/type/PollAnswerVoters.md)&gt; | Poll results |
| **total\_voters** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Total number of people that voted in the poll |
| **recent\_voters** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | IDs of the last users that recently voted in the poll |
| **solution** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Explanation of quiz solution |
| **solution\_entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text in quiz solution](/api/entities.md) |
| **solution\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[MessageMedia](/type/MessageMedia.md) | Optional media attachment shown alongside the quiz solution explanation |

### Type
[PollResults](/type/PollResults.md)

### Related pages

#### [Min constructors](/api/min.md)
In some situations user and channel constructors have reduced set of fields present (although id is always there) and min flag set.

#### [messages.getPollResults](/method/messages.getPollResults.md)
Get poll results

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
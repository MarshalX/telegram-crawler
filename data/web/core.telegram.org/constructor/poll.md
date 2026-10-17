# poll

Poll

```tl
poll#966e2dbf id:long flags:# closed:flags.0?true public_voters:flags.1?true multiple_choice:flags.2?true quiz:flags.3?true open_answers:flags.6?true revoting_disabled:flags.7?true shuffle_answers:flags.8?true hide_results_until_close:flags.9?true creator:flags.10?true subscribers_only:flags.11?true question:TextWithEntities answers:Vector<PollAnswer> close_period:flags.4?int close_date:flags.5?int countries_iso2:flags.12?Vector<string> hash:long = Poll;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | ID of the poll |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **closed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the poll is closed and doesn't accept any more answers |
| **public\_voters** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether cast votes are publicly visible to all users (non-anonymous poll) |
| **multiple\_choice** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether multiple options can be chosen as answer |
| **quiz** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is a quiz (with wrong and correct answers, results shown in the return type). \
When creating a poll, the correct answers are specified in [inputMediaPoll](/constructor/inputMediaPoll.md).`correct_answers`. |
| **open\_answers** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether users can add new answer options after the poll is created, see [open-answer polls »](/api/poll.md#open-answer-polls) |
| **revoting\_disabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, users cannot change their vote after casting it |
| **shuffle\_answers** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Whether answer options are displayed in a randomized order to each user |
| **hide\_results\_until\_close** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether vote results are hidden from all participants until the poll is closed |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Whether the current user created this poll |
| **subscribers\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[true](/constructor/true.md) | Whether only subscribers can vote: a user may vote only if they are currently a member of the channel/supergroup and joined it at least 24 hours before the poll was posted, see [subscriber-only polls »](/api/poll.md#subscriber-only-polls). |
| **question** | [TextWithEntities](/type/TextWithEntities.md) | The question of the poll (only [Premium](/api/premium.md) users can use [custom emoji entities](/api/custom-emoji.md) here). |
| **answers** | [Vector](/type/Vector%20t)&lt;[PollAnswer](/type/PollAnswer.md)&gt; | The possible answers (2-[poll\_answers\_max](/api/config.md#poll-answers-max)), vote using [messages.sendVote](/method/messages.sendVote.md). |
| **close\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Amount of time in seconds the poll will be active after creation, up to [`poll_close_period_max` »](/api/config.md#poll-close-period-max) seconds. Can't be used together with close\_date. |
| **close\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Point in time (Unix timestamp) when the poll will be automatically closed. Up to [`poll_close_period_max` »](/api/config.md#poll-close-period-max) seconds in the future; can't be used together with close\_period. |
| **countries\_iso2** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | If set, only users from the specified ISO 3166-1 alpha-2 country codes may vote, see [country-restricted polls »](/api/poll.md#country-restricted-polls); a user may vote only if the [`phone_country_iso2` »](/api/config.md#phone-country-iso2) configuration parameter is contained in this list. |
| **hash** | [long](/type/long.md) | Hash for use with [messages.getPollResults](/method/messages.getPollResults.md) |

### Type
[Poll](/type/Poll.md)

### Related pages

#### [inputMediaPoll](/constructor/inputMediaPoll.md)
A poll

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [messages.sendVote](/method/messages.sendVote.md)
Vote in a [poll](/constructor/poll.md)

Starting from layer 159, the vote will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).

Before voting, clients should check that the user is actually allowed to vote: voting is not possible if the poll is closed, if it is [subscriber-only »](/api/poll.md#subscriber-only-polls) and the user is not an eligible subscriber, or if it is [country-restricted »](/api/poll.md#country-restricted-polls) and the user's [`phone_country_iso2` »](/api/config.md#phone-country-iso2) is not in the poll's allowed country list. See [vote restrictions »](/api/poll.md#vote-restrictions) for the full list of conditions.

#### [messages.getPollResults](/method/messages.getPollResults.md)
Get poll results
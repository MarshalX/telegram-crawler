# pollAnswerVoters

A poll answer, and how users voted on it

```tl
pollAnswerVoters#3645230a flags:# chosen:flags.0?true correct:flags.1?true option:bytes voters:flags.2?int recent_voters:flags.2?Vector<Peer> = PollAnswerVoters;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **chosen** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we have chosen this answer |
| **correct** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | For quizzes, whether the option we have chosen is correct |
| **option** | [bytes](/type/bytes.md) | The param that has to be passed to [messages.sendVote](/method/messages.sendVote.md). |
| **voters** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | How many users voted for this option |
| **recent\_voters** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | Peers of the most recent voters for this option; mutually exclusive with `voters` |

### Type
[PollAnswerVoters](/type/PollAnswerVoters.md)

### Related pages

#### [messages.sendVote](/method/messages.sendVote.md)
Vote in a [poll](/constructor/poll.md)

Starting from layer 159, the vote will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).

Before voting, clients should check that the user is actually allowed to vote: voting is not possible if the poll is closed, if it is [subscriber-only »](/api/poll.md#subscriber-only-polls) and the user is not an eligible subscriber, or if it is [country-restricted »](/api/poll.md#country-restricted-polls) and the user's [`phone_country_iso2` »](/api/config.md#phone-country-iso2) is not in the poll's allowed country list. See [vote restrictions »](/api/poll.md#vote-restrictions) for the full list of conditions.
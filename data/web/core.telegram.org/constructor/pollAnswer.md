# pollAnswer

A possible answer of a poll

```tl
pollAnswer#4b7d786a flags:# text:TextWithEntities option:bytes media:flags.0?MessageMedia added_by:flags.1?Peer date:flags.1?int = PollAnswer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **text** | [TextWithEntities](/type/TextWithEntities.md) | Textual representation of the answer (only [Premium](/api/premium.md) users can use [custom emoji entities](/api/custom-emoji.md) here). |
| **option** | [bytes](/type/bytes.md) | The param that has to be passed to [messages.sendVote](/method/messages.sendVote.md). |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[MessageMedia](/type/MessageMedia.md) | Optional media attachment displayed alongside the answer |
| **added\_by** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | The peer who added this answer; only set for answers dynamically added to an open-answer poll, see [polls »](/api/poll.md#open-answer-polls) |
| **date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | When this answer was added; only set for answers dynamically added to an open-answer poll |

### Type
[PollAnswer](/type/PollAnswer.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [messages.sendVote](/method/messages.sendVote.md)
Vote in a [poll](/constructor/poll.md)

Starting from layer 159, the vote will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).

Before voting, clients should check that the user is actually allowed to vote: voting is not possible if the poll is closed, if it is [subscriber-only »](/api/poll.md#subscriber-only-polls) and the user is not an eligible subscriber, or if it is [country-restricted »](/api/poll.md#country-restricted-polls) and the user's [`phone_country_iso2` »](/api/config.md#phone-country-iso2) is not in the poll's allowed country list. See [vote restrictions »](/api/poll.md#vote-restrictions) for the full list of conditions.

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.
# inputPollAnswer

An answer option to add to an [open-answer poll »](/api/poll.md#open-answer-polls)

```tl
inputPollAnswer#199fed96 flags:# text:TextWithEntities media:flags.0?InputMedia = PollAnswer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **text** | [TextWithEntities](/type/TextWithEntities.md) | The answer text |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputMedia](/type/InputMedia.md) | Optional media attachment to display alongside the answer |

### Type
[PollAnswer](/type/PollAnswer.md)

### Related pages

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.
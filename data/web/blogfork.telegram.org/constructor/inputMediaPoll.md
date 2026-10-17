# inputMediaPoll

A poll

```tl
inputMediaPoll#883a4108 flags:# poll:Poll correct_answers:flags.0?Vector<int> attached_media:flags.3?InputMedia solution:flags.1?string solution_entities:flags.1?Vector<MessageEntity> solution_media:flags.2?InputMedia = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **poll** | [Poll](/type/Poll.md) | The poll to send |
| **correct\_answers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | 0-based indices of the correct answers in the `answers` vector (for quiz polls) |
| **attached\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InputMedia](/type/InputMedia.md) | Optional media attachment to display alongside the poll |
| **solution** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds. |
| **solution\_entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Styled text message entities](/api/entities.md) for the `solution` explanation. |
| **solution\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputMedia](/type/InputMedia.md) | Optional media attachment shown alongside the quiz solution explanation |

### Type
[InputMedia](/type/InputMedia.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
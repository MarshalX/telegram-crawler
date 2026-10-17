# messages.composedMessageWithAI

Represents a message modified by AI.

```tl
messages.composedMessageWithAI#90d7adfa flags:# result_text:TextWithEntities diff_text:flags.0?TextWithEntities = messages.ComposedMessageWithAI;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **result\_text** | [TextWithEntities](/type/TextWithEntities.md) | The modified message. |
| **diff\_text** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[TextWithEntities](/type/TextWithEntities.md) | If **only** the proofreading mode ([messages.composeMessageWithAI](/method/messages.composeMessageWithAI.md).`proofread`) is enabled, this field will be populated with a "pre-rendered" diff between the old and the new message text using **only** [diff entities »](/api/entities.md#diff-entities). |

### Type
[messages.ComposedMessageWithAI](/type/messages.ComposedMessageWithAI.md)

### Related pages

#### [messages.composeMessageWithAI](/method/messages.composeMessageWithAI.md)
Invokes telegram's AI Editor that can translate, transform, fixup and/or emojify your message in a number of different ways, privately powered by [Cocoon](https://cocoon.org), see [here »](/api/ai.md#compose-messages) for more info!

All of the modes specified below can be combined.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
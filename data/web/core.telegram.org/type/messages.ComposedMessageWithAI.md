# Messages.ComposedMessageWithAI

Represents a message modified by AI.

```tl
messages.composedMessageWithAI#90d7adfa flags:# result_text:TextWithEntities diff_text:flags.0?TextWithEntities = messages.ComposedMessageWithAI;

---functions---

messages.composeMessageWithAI#daecc589 flags:# proofread:flags.0?true emojify:flags.3?true text:TextWithEntities translate_to_lang:flags.1?string tone:flags.2?InputAiComposeTone = messages.ComposedMessageWithAI;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.composedMessageWithAI](/constructor/messages.composedMessageWithAI.md) | Represents a message modified by AI. |

### Methods

| Method | Description |
| --- | --- |
| [messages.composeMessageWithAI](/method/messages.composeMessageWithAI.md) | Invokes telegram's AI Editor that can translate, transform, fixup and/or emojify your message in a number of different ways, privately powered by [Cocoon](https://cocoon.org), see [here »](/api/ai.md#compose-messages) for more info!\
\
All of the modes specified below can be combined. |
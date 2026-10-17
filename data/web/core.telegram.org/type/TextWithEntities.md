# TextWithEntities

Styled text with [message entities](/api/entities.md)

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===216===
textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;
```

API schema:
<!-- /schema-blocks -->

```tl
textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;

---functions---

messages.summarizeText#abbbd346 flags:# peer:InputPeer id:int to_lang:flags.0?string tone:flags.2?string = TextWithEntities;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [textWithEntities](/constructor/textWithEntities.md) | Styled text with [message entities](/api/entities.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.summarizeText](/method/messages.summarizeText.md) | Summarize the contents of a message with AI, see [here »](/api/ai.md#summarize-messages) for more info.\
\
Clients should use [message](/constructor/message.md).`summary_from_language` as a hint for showing a summarization button; its absence does not forbid invoking this method. |

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
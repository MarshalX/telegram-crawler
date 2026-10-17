# messages.summarizeText

Summarize the contents of a message with AI, see [here »](/api/ai.md#summarize-messages) for more info.

Clients should use [message](/constructor/message.md).`summary_from_language` as a hint for showing a summarization button; its absence does not forbid invoking this method.

```tl
textWithEntities#751f3146 text:string entities:Vector<MessageEntity> = TextWithEntities;
---functions---
messages.summarizeText#abbbd346 flags:# peer:InputPeer id:int to_lang:flags.0?string tone:flags.2?string = TextWithEntities;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer where the message is located. |
| **id** | [int](/type/int.md) | Message ID. |
| **to\_lang** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, generates the summary in the specified target language (two-letter ISO 639-1 language code) instead of the message's language. |
| **tone** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | If set, rephrases the summary using the specified [AI composer tone »](/api/ai.md#ai-compose-tones) (pass the tone identifier) |

### Result
[TextWithEntities](/type/TextWithEntities.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | INPUT\_TEXT\_TOO\_LONG | The specified text is too long. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.

#### [message](/constructor/message.md)
A message
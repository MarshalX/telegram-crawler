# aicompose.getToneExample

Fetch an example showing how an [AI composer tone »](/api/ai.md#ai-compose-tones) rephrases a sample message, used as a preview in the tone picker.

```tl
aiComposeToneExample#f1d628ec from:TextWithEntities to:TextWithEntities = AiComposeToneExample;
---functions---
aicompose.getToneExample#d1b4ab14 tone:InputAiComposeTone num:int = AiComposeToneExample;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **tone** | [InputAiComposeTone](/type/InputAiComposeTone.md) | The tone to preview |
| **num** | [int](/type/int.md) | 0-based index of the example to fetch, to cycle through the available examples (there are [aicompose\_tone\_examples\_num »](/api/config.md#aicompose-tone-examples-num) examples per tone) |

### Result
[AiComposeToneExample](/type/AiComposeToneExample.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AICOMPOSE\_TONE\_INVALID | The specified tone is invalid. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
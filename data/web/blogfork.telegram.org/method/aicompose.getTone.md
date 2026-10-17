# aicompose.getTone

Fetch information about a single [AI composer tone »](/api/ai.md#ai-compose-tones), for example to resolve a shared tone deep link.

```tl
aicompose.tonesNotModified#c1f46103 = aicompose.Tones;
aicompose.tones#6c9d0efe hash:long tones:Vector<AiComposeTone> users:Vector<User> = aicompose.Tones;
---functions---
aicompose.getTone#b2e8ba03 tone:InputAiComposeTone = aicompose.Tones;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **tone** | [InputAiComposeTone](/type/InputAiComposeTone.md) | The tone to fetch |

### Result
[aicompose.Tones](/type/aicompose.Tones.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AICOMPOSE\_TONE\_INVALID | The specified tone is invalid. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
# aicompose.deleteTone

Permanently delete a custom [AI composer tone »](/api/ai.md#ai-compose-tones) created by the current user.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
aicompose.deleteTone#dd39316a tone:InputAiComposeTone = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **tone** | [InputAiComposeTone](/type/InputAiComposeTone.md) | The tone to delete |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AICOMPOSE\_TONE\_INVALID | The specified tone is invalid. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
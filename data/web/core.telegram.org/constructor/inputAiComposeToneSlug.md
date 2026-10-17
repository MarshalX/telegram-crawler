# inputAiComposeToneSlug

References a custom [AI composer tone »](/api/ai.md#ai-compose-tones) by its public slug, used when opening an [AI compose tone link »](/api/links.md#ai-compose-tone-links).

```tl
inputAiComposeToneSlug#1fa01357 slug:string = InputAiComposeTone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | Public tone slug, as returned in [aiComposeTone](/constructor/aiComposeTone.md).`slug` |

### Type
[InputAiComposeTone](/type/InputAiComposeTone.md)

### Related pages

#### [aiComposeTone](/constructor/aiComposeTone.md)
A custom [AI composer tone »](/api/ai.md#ai-compose-tones), used to rephrase messages in a specific style with the [AI message composer](/api/ai.md#compose-messages).

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.
# AiComposeTone

An [AI composer tone »](/api/ai.md#ai-compose-tones), used to rephrase messages in a specific style with the [AI message composer](/api/ai.md#compose-messages).

```tl
aiComposeTone#cff63ea9 flags:# creator:flags.0?true id:long access_hash:long slug:string title:string emoji_id:flags.1?long prompt:flags.4?string installs_count:flags.2?int author_id:flags.3?long example_english:flags.5?AiComposeToneExample = AiComposeTone;
aiComposeToneDefault#9bad6414 tone:string emoji_id:long title:string = AiComposeTone;

---functions---

aicompose.createTone#4aa83913 flags:# display_author:flags.0?true emoji_id:long title:string prompt:string = AiComposeTone;
aicompose.updateTone#903bcf59 flags:# tone:InputAiComposeTone display_author:flags.0?Bool emoji_id:flags.1?long title:flags.2?string prompt:flags.3?string = AiComposeTone;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [aiComposeTone](/constructor/aiComposeTone.md) | A custom [AI composer tone »](/api/ai.md#ai-compose-tones), used to rephrase messages in a specific style with the [AI message composer](/api/ai.md#compose-messages). |
| [aiComposeToneDefault](/constructor/aiComposeToneDefault.md) | A built-in, default [AI composer tone »](/api/ai.md#ai-compose-tones), identified by a string identifier rather than by a numeric ID. |

### Methods

| Method | Description |
| --- | --- |
| [aicompose.createTone](/method/aicompose.createTone.md) | Create a new custom [AI composer tone »](/api/ai.md#ai-compose-tones). |
| [aicompose.updateTone](/method/aicompose.updateTone.md) | Edit a custom [AI composer tone »](/api/ai.md#ai-compose-tones) previously created by the current user. Only the fields whose flag is set will be modified. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
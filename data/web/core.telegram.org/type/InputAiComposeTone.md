# InputAiComposeTone

References an [AI composer tone »](/api/ai.md#ai-compose-tones), either a built-in default tone or a custom one (by ID or slug).

```tl
inputAiComposeToneDefault#1fe9a9bf tone:string = InputAiComposeTone;
inputAiComposeToneID#773c080 id:long access_hash:long = InputAiComposeTone;
inputAiComposeToneSlug#1fa01357 slug:string = InputAiComposeTone;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputAiComposeToneDefault](/constructor/inputAiComposeToneDefault.md) | References a built-in, default [AI composer tone »](/api/ai.md#ai-compose-tones) by its string identifier. |
| [inputAiComposeToneID](/constructor/inputAiComposeToneID.md) | References a custom [AI composer tone »](/api/ai.md#ai-compose-tones) by its ID and access hash. |
| [inputAiComposeToneSlug](/constructor/inputAiComposeToneSlug.md) | References a custom [AI composer tone »](/api/ai.md#ai-compose-tones) by its public slug, used when opening an [AI compose tone link »](/api/links.md#ai-compose-tone-links). |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
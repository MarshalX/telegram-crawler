# aiComposeToneDefault

A built-in, default [AI composer tone »](/api/ai.md#ai-compose-tones), identified by a string identifier rather than by a numeric ID.

```tl
aiComposeToneDefault#9bad6414 tone:string emoji_id:long title:string = AiComposeTone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **tone** | [string](/type/string.md) | String identifier of the built-in tone, to be passed to [inputAiComposeToneDefault](/constructor/inputAiComposeToneDefault.md) |
| **emoji\_id** | [long](/type/long.md) | [Custom emoji ID](/api/custom-emoji.md) of the tone's icon |
| **title** | [string](/type/string.md) | Localized, human-readable name of the tone |

### Type
[AiComposeTone](/type/AiComposeTone.md)

### Related pages

#### [inputAiComposeToneDefault](/constructor/inputAiComposeToneDefault.md)
References a built-in, default [AI composer tone »](/api/ai.md#ai-compose-tones) by its string identifier.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
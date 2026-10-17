# aicompose.updateTone

Edit a custom [AI composer tone »](/api/ai.md#ai-compose-tones) previously created by the current user. Only the fields whose flag is set will be modified.

```tl
aiComposeTone#cff63ea9 flags:# creator:flags.0?true id:long access_hash:long slug:string title:string emoji_id:flags.1?long prompt:flags.4?string installs_count:flags.2?int author_id:flags.3?long example_english:flags.5?AiComposeToneExample = AiComposeTone;
aiComposeToneDefault#9bad6414 tone:string emoji_id:long title:string = AiComposeTone;
---functions---
aicompose.updateTone#903bcf59 flags:# tone:InputAiComposeTone display_author:flags.0?Bool emoji_id:flags.1?long title:flags.2?string prompt:flags.3?string = AiComposeTone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **tone** | [InputAiComposeTone](/type/InputAiComposeTone.md) | The tone to edit |
| **display\_author** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | If set, changes whether the current user is publicly credited as the author of the tone (ternary value, can be not set, set and true, set and false). |
| **emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | If set, the new [custom emoji ID](/api/custom-emoji.md) of the tone's icon |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | If set, the new human-readable tone name, up to [aicompose\_tone\_title\_length\_max »](/api/config.md#aicompose-tone-title-length-max) UTF-8 characters long |
| **prompt** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | If set, the new prompt that describes how the AI should rephrase messages using this tone, up to [aicompose\_tone\_prompt\_length\_max »](/api/config.md#aicompose-tone-prompt-length-max) UTF-8 characters long |

### Result
[AiComposeTone](/type/AiComposeTone.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AICOMPOSE\_TONE\_INVALID | The specified tone is invalid. |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
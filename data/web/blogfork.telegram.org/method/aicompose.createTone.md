# aicompose.createTone

Create a new custom [AI composer tone »](/api/ai.md#ai-compose-tones).

```tl
aiComposeTone#cff63ea9 flags:# creator:flags.0?true id:long access_hash:long slug:string title:string emoji_id:flags.1?long prompt:flags.4?string installs_count:flags.2?int author_id:flags.3?long example_english:flags.5?AiComposeToneExample = AiComposeTone;
aiComposeToneDefault#9bad6414 tone:string emoji_id:long title:string = AiComposeTone;
---functions---
aicompose.createTone#4aa83913 flags:# display_author:flags.0?true emoji_id:long title:string prompt:string = AiComposeTone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **display\_author** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the current user will be publicly credited as the author of the tone |
| **emoji\_id** | [long](/type/long.md) | [Custom emoji ID](/api/custom-emoji.md) of the tone's icon |
| **title** | [string](/type/string.md) | Human-readable tone name, up to [aicompose\_tone\_title\_length\_max »](/api/config.md#aicompose-tone-title-length-max) UTF-8 characters long |
| **prompt** | [string](/type/string.md) | The prompt that describes how the AI should rephrase messages using this tone, up to [aicompose\_tone\_prompt\_length\_max »](/api/config.md#aicompose-tone-prompt-length-max) UTF-8 characters long |

### Result
[AiComposeTone](/type/AiComposeTone.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AICOMPOSE\_TONE\_TITLE\_INVALID | The specified tone title is invalid. |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
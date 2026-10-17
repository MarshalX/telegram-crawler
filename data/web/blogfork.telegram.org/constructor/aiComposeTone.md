# aiComposeTone

A custom [AI composer tone »](/api/ai.md#ai-compose-tones), used to rephrase messages in a specific style with the [AI message composer](/api/ai.md#compose-messages).

```tl
aiComposeTone#cff63ea9 flags:# creator:flags.0?true id:long access_hash:long slug:string title:string emoji_id:flags.1?long prompt:flags.4?string installs_count:flags.2?int author_id:flags.3?long example_english:flags.5?AiComposeToneExample = AiComposeTone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the current user is the creator of this tone |
| **id** | [long](/type/long.md) | Tone identifier |
| **access\_hash** | [long](/type/long.md) | Tone access hash |
| **slug** | [string](/type/string.md) | Unique tone slug, used to share and install the tone via [AI compose tone links »](/api/links.md#ai-compose-tone-links) |
| **title** | [string](/type/string.md) | Human-readable tone name, up to [aicompose\_tone\_title\_length\_max »](/api/config.md#aicompose-tone-title-length-max) UTF-8 characters long |
| **emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | [Custom emoji ID](/api/custom-emoji.md) of the tone's icon |
| **prompt** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | The prompt that describes how the AI should rephrase messages using this tone, up to [aicompose\_tone\_prompt\_length\_max »](/api/config.md#aicompose-tone-prompt-length-max) UTF-8 characters long; only present for tones created by the current user |
| **installs\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Number of users that have installed this tone |
| **author\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | ID of the user that created this tone, if made public by the author. |
| **example\_english** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[AiComposeToneExample](/type/AiComposeToneExample.md) | An example showing how a sample English message is rephrased by this tone; use [aicompose.getToneExample](/method/aicompose.getToneExample.md) to fetch more examples. |

### Type
[AiComposeTone](/type/AiComposeTone.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [aicompose.getToneExample](/method/aicompose.getToneExample.md)
Fetch an example showing how an [AI composer tone »](/api/ai.md#ai-compose-tones) rephrases a sample message, used as a preview in the tone picker.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
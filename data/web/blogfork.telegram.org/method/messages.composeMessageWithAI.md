# messages.composeMessageWithAI

Invokes telegram's AI Editor that can translate, transform, fixup and/or emojify your message in a number of different ways, privately powered by [Cocoon](https://cocoon.org), see [here »](/api/ai.md#compose-messages) for more info!

All of the modes specified below can be combined.

```tl
messages.composedMessageWithAI#90d7adfa flags:# result_text:TextWithEntities diff_text:flags.0?TextWithEntities = messages.ComposedMessageWithAI;
---functions---
messages.composeMessageWithAI#daecc589 flags:# proofread:flags.0?true emojify:flags.3?true text:TextWithEntities translate_to_lang:flags.1?string tone:flags.2?InputAiComposeTone = messages.ComposedMessageWithAI;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **proofread** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, proofreads and fixes mistakes in the message |
| **emojify** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, adds emojis to the message |
| **text** | [TextWithEntities](/type/TextWithEntities.md) | The message |
| **translate\_to\_lang** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If set, translates the message to the specified language |
| **tone** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputAiComposeTone](/type/InputAiComposeTone.md) | If set, rephrases the message using the specified [AI composer tone »](/api/ai.md#ai-compose-tones) |

### Result
[messages.ComposedMessageWithAI](/type/messages.ComposedMessageWithAI.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AICOMPOSE\_FLOOD\_PREMIUM | You've reached the daily limit of AI text transformations, upgrade to [Telegram Premium](/api/premium.md) to get **50x** times more AI text transformations per day! |
| 500 | AICOMPOSE\_TIMEOUT | A timeout occurred while composing the message. |
| 400 | AI\_COMPOSE\_TASK\_MISSING | No AI task was specified. The caller must provide at least one of: proofread, translate (with a target language), tone, or emojify. |
| 400 | MESSAGE\_EMPTY | The provided message is empty. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.
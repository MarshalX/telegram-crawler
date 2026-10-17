# inputAiComposeToneID

References a custom [AI composer tone »](/api/ai.md#ai-compose-tones) by its ID and access hash.

```tl
inputAiComposeToneID#773c080 id:long access_hash:long = InputAiComposeTone;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Tone identifier, as returned in [aiComposeTone](/constructor/aiComposeTone.md).`id` |
| **access\_hash** | [long](/type/long.md) | Tone [access hash](/api/peers.md#access-hash), as returned in [aiComposeTone](/constructor/aiComposeTone.md).`access_hash` |

### Type
[InputAiComposeTone](/type/InputAiComposeTone.md)

### Related pages

#### [aiComposeTone](/constructor/aiComposeTone.md)
A custom [AI composer tone »](/api/ai.md#ai-compose-tones), used to rephrase messages in a specific style with the [AI message composer](/api/ai.md#compose-messages).

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
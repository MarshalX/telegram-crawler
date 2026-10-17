# aicompose.saveTone

Install or uninstall an [AI composer tone »](/api/ai.md#ai-compose-tones), adding it to or removing it from the list of saved tones of the current user.

Non-[Premium](/api/premium.md) users may install up to [aicompose\_tone\_saved\_limit\_default »](/api/config.md#aicompose-tone-saved-limit-default) tones, [Premium](/api/premium.md) users up to [aicompose\_tone\_saved\_limit\_premium »](/api/config.md#aicompose-tone-saved-limit-premium) tones.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
aicompose.saveTone#1782cbb1 tone:InputAiComposeTone unsave:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **tone** | [InputAiComposeTone](/type/InputAiComposeTone.md) | The tone to save or unsave |
| **unsave** | [Bool](/type/Bool.md) | If `false`, installs (saves) the tone; if `true`, uninstalls (unsaves) it |

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

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
# aicompose.getTones

Fetch the list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user.

```tl
aicompose.tonesNotModified#c1f46103 = aicompose.Tones;
aicompose.tones#6c9d0efe hash:long tones:Vector<AiComposeTone> users:Vector<User> = aicompose.Tones;
---functions---
aicompose.getTones#abd59201 hash:long = aicompose.Tones;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Hash from a previously cached [aicompose.tones](/constructor/aicompose.tones.md).`hash` to avoid refetching the list if it hasn't changed; initially 0. |

### Result
[aicompose.Tones](/type/aicompose.Tones.md)

### Only users can use this method

### Related pages

#### [aicompose.tones](/constructor/aicompose.tones.md)
The list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
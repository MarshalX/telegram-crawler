# Aicompose.Tones

The list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user.

```tl
aicompose.tonesNotModified#c1f46103 = aicompose.Tones;
aicompose.tones#6c9d0efe hash:long tones:Vector<AiComposeTone> users:Vector<User> = aicompose.Tones;

---functions---

aicompose.getTone#b2e8ba03 tone:InputAiComposeTone = aicompose.Tones;
aicompose.getTones#abd59201 hash:long = aicompose.Tones;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [aicompose.tonesNotModified](/constructor/aicompose.tonesNotModified.md) | The list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) hasn't changed since the last time it was fetched (i.e. the `hash` passed to [aicompose.getTones](/method/aicompose.getTones.md) is still valid). |
| [aicompose.tones](/constructor/aicompose.tones.md) | The list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user. |

### Methods

| Method | Description |
| --- | --- |
| [aicompose.getTone](/method/aicompose.getTone.md) | Fetch information about a single [AI composer tone »](/api/ai.md#ai-compose-tones), for example to resolve a shared tone deep link. |
| [aicompose.getTones](/method/aicompose.getTones.md) | Fetch the list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user. |

### Related pages

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
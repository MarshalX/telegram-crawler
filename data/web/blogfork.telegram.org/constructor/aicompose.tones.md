# aicompose.tones

The list of saved [AI composer tones »](/api/ai.md#ai-compose-tones) of the current user.

```tl
aicompose.tones#6c9d0efe hash:long tones:Vector<AiComposeTone> users:Vector<User> = aicompose.Tones;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash for pagination, for more info click here](/api/offsets.md#hash-generation) |
| **tones** | [Vector](/type/Vector%20t)&lt;[AiComposeTone](/type/AiComposeTone.md)&gt; | The saved AI composer tones |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users (i.e. the authors of the tones) |

### Type
[aicompose.Tones](/type/aicompose.Tones.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [AI features](/api/ai.md)
Telegram offers many AI features powered by Cocoon — a decentralized network designed to maximize privacy.
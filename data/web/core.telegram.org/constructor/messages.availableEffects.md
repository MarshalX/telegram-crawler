# messages.availableEffects

The full list of usable [animated message effects »](/api/effects.md).

```tl
messages.availableEffects#bddb616e hash:int effects:Vector<AvailableEffect> documents:Vector<Document> = messages.AvailableEffects;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **effects** | [Vector](/type/Vector%20t)&lt;[AvailableEffect](/type/AvailableEffect.md)&gt; | Message effects |
| **documents** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Documents specified in the `effects` constructors. |

### Type
[messages.AvailableEffects](/type/messages.AvailableEffects.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.
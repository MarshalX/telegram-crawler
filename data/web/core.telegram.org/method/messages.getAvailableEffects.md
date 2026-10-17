# messages.getAvailableEffects

Fetch the full list of usable [animated message effects »](/api/effects.md).

```tl
messages.availableEffectsNotModified#d1ed9a5b = messages.AvailableEffects;
messages.availableEffects#bddb616e hash:int effects:Vector<AvailableEffect> documents:Vector<Document> = messages.AvailableEffects;
---functions---
messages.getAvailableEffects#dea20a39 hash:int = messages.AvailableEffects;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.AvailableEffects](/type/messages.AvailableEffects.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.
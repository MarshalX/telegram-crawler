# messages.savedReactionTags

List of [reaction tag »](/api/saved-messages.md#tags) names assigned by the user.

```tl
messages.savedReactionTags#3259950a tags:Vector<SavedReactionTag> hash:long = messages.SavedReactionTags;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **tags** | [Vector](/type/Vector%20t)&lt;[SavedReactionTag](/type/SavedReactionTag.md)&gt; | Saved reaction tags. |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). Can also be manually regenerated, if needed, using the [custom algorithm specified here »](/api/saved-messages.md#tags). |

### Type
[messages.SavedReactionTags](/type/messages.SavedReactionTags.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
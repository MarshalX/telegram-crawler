# messages.getSavedReactionTags

Fetch the full list of [saved message tags](/api/saved-messages.md#tags) created by the user.

```tl
messages.savedReactionTagsNotModified#889b59ef = messages.SavedReactionTags;
messages.savedReactionTags#3259950a tags:Vector<SavedReactionTag> hash:long = messages.SavedReactionTags;
---functions---
messages.getSavedReactionTags#3637e05b flags:# peer:flags.0?InputPeer hash:long = messages.SavedReactionTags;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | If set, returns tags only used in the specified [saved message dialog](/api/saved-messages.md#saved-message-dialogs). |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.SavedReactionTags](/type/messages.SavedReactionTags.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
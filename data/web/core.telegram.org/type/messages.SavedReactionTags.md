# messages.SavedReactionTags

List of [reaction tag »](/api/saved-messages.md#tags) names assigned by the user.

```tl
messages.savedReactionTagsNotModified#889b59ef = messages.SavedReactionTags;
messages.savedReactionTags#3259950a tags:Vector<SavedReactionTag> hash:long = messages.SavedReactionTags;

---functions---

messages.getSavedReactionTags#3637e05b flags:# peer:flags.0?InputPeer hash:long = messages.SavedReactionTags;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.savedReactionTagsNotModified](/constructor/messages.savedReactionTagsNotModified.md) | The list of [reaction tag »](/api/saved-messages.md#tags) names assigned by the user hasn't changed. |
| [messages.savedReactionTags](/constructor/messages.savedReactionTags.md) | List of [reaction tag »](/api/saved-messages.md#tags) names assigned by the user. |

### Methods

| Method | Description |
| --- | --- |
| [messages.getSavedReactionTags](/method/messages.getSavedReactionTags.md) | Fetch the full list of [saved message tags](/api/saved-messages.md#tags) created by the user. |

### Related pages

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.
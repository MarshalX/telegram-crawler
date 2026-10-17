# Messages.FoundStickerSets

Found stickersets

```tl
messages.foundStickerSetsNotModified#d54b65d = messages.FoundStickerSets;
messages.foundStickerSets#8af09dd2 hash:long sets:Vector<StickerSetCovered> = messages.FoundStickerSets;

---functions---

messages.searchStickerSets#35705b8a flags:# exclude_featured:flags.0?true q:string hash:long = messages.FoundStickerSets;
messages.searchEmojiStickerSets#92b4494c flags:# exclude_featured:flags.0?true q:string hash:long = messages.FoundStickerSets;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.foundStickerSetsNotModified](/constructor/messages.foundStickerSetsNotModified.md) | No further results were found |
| [messages.foundStickerSets](/constructor/messages.foundStickerSets.md) | Found stickersets |

### Methods

| Method | Description |
| --- | --- |
| [messages.searchStickerSets](/method/messages.searchStickerSets.md) | Search for stickersets |
| [messages.searchEmojiStickerSets](/method/messages.searchEmojiStickerSets.md) | Search for [custom emoji stickersets »](/api/custom-emoji.md) |
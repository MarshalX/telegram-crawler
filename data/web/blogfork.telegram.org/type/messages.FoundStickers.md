# Messages.FoundStickers

Found [stickers](/api/stickers.md)

```tl
messages.foundStickersNotModified#6010c534 flags:# next_offset:flags.0?int = messages.FoundStickers;
messages.foundStickers#82c9e290 flags:# next_offset:flags.0?int hash:long stickers:Vector<Document> = messages.FoundStickers;

---functions---

messages.searchStickers#29b1c66a flags:# emojis:flags.0?true q:string emoticon:string lang_code:Vector<string> offset:int limit:int hash:long = messages.FoundStickers;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.foundStickersNotModified](/constructor/messages.foundStickersNotModified.md) | No new stickers were found for the specified query |
| [messages.foundStickers](/constructor/messages.foundStickers.md) | Found stickers |

### Methods

| Method | Description |
| --- | --- |
| [messages.searchStickers](/method/messages.searchStickers.md) | Search for stickers using AI-powered keyword search |

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.
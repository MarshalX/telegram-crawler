# messages.getCustomEmojiDocuments

Fetch [custom emoji stickers »](/api/custom-emoji.md).

Returns a list of [documents](/constructor/document.md) with the animated custom emoji in TGS format, and a [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md) attribute with the original emoji and info about the emoji stickerset this custom emoji belongs to.

```tl
---functions---
messages.getCustomEmojiDocuments#d9ab0f54 document_id:Vector<long> = Vector<Document>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **document\_id** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | [Custom emoji](/api/custom-emoji.md) IDs from a [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md). |

### Result
[Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt;

### Both users and bots can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [messageEntityCustomEmoji](/constructor/messageEntityCustomEmoji.md)
Represents a custom emoji.  
Note that this entity must wrap exactly one regular emoji (the one contained in [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md).`alt`) in the related text, otherwise the server will ignore it.

#### [document](/constructor/document.md)
Document

#### [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md)
Info about a custom emoji
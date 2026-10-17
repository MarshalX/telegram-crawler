# messageEntityCustomEmoji

Represents a custom emoji.  
Note that this entity must wrap exactly one regular emoji (the one contained in [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md).`alt`) in the related text, otherwise the server will ignore it.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===144===
messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **document\_id** | [long](/type/long.md) | Document ID of the [custom emoji](/api/custom-emoji.md), use [messages.getCustomEmojiDocuments](/method/messages.getCustomEmojiDocuments.md) to fetch the emoji animation and the actual emoji it represents. |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [messages.getCustomEmojiDocuments](/method/messages.getCustomEmojiDocuments.md)
Fetch [custom emoji stickers »](/api/custom-emoji.md).

Returns a list of [documents](/constructor/document.md) with the animated custom emoji in TGS format, and a [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md) attribute with the original emoji and info about the emoji stickerset this custom emoji belongs to.

#### [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md)
Info about a custom emoji
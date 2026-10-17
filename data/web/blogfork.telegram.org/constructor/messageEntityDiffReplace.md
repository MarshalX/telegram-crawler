# messageEntityDiffReplace

Represents an diff replacement, render it as follows:

- Insert `old_text` into the text at offset `offset`, <u>underline</u> it and color it in red: note that this insertion does not affect the offsets of entities that come after it.
- <u>underline</u> the section delimited by `offset` and `limit` and color it in green.

See [here »](/api/entities.md#diff-entities) for more info on how to render diff entities.

```tl
messageEntityDiffReplace#c6c1e5a7 offset:int length:int old_text:string = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **old\_text** | [string](/type/string.md) | The chunk of text that was removed. |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
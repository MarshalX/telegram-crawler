# messageEntityDiffDelete

Represents an diff deletion: render it by simply <u>underlining</u> the specified section and coloring it in red, see [here »](/api/entities.md#diff-entities) for more info on how to render diff entities.

```tl
messageEntityDiffDelete#652c1c5 offset:int length:int = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
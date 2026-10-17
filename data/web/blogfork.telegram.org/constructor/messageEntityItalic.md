# messageEntityItalic

Message entity representing *italic text*.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
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
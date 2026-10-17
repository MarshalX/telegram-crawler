# messageEntityStrike

Message entity representing <del>strikethrough</del> text.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===101===
messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
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
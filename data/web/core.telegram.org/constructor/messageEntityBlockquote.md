# messageEntityBlockquote

Message entity representing a block quote.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===101===
messageEntityBlockquote#020df5d0 offset:int length:int = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityBlockquote#f1ccaaac flags:# collapsed:flags.0?true offset:int length:int = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **collapsed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the quote is collapsed by default. |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
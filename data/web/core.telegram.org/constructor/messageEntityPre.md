# messageEntityPre

Message entity representing a preformatted `codeblock`, allowing the user to specify a programming language for the codeblock.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **language** | [string](/type/string.md) | Programming language of the code |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities
# messageEntityUrl

Message entity representing an in-text url: <https://google.com>; for [text urls](https://google.com), use [messageEntityTextUrl](/constructor/messageEntityTextUrl.md).

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;
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

#### [messageEntityTextUrl](/constructor/messageEntityTextUrl.md)
Message entity representing a [text url](https://google.com): for in-text urls like <https://google.com> use [messageEntityUrl](/constructor/messageEntityUrl.md).

Note that an additional confirmation popup with the full URL must be displayed to the user before opening this link, unless the domain satisfies the conditions specified in the [domain whitelist documentation »](/api/config.md#whitelisted-domains).
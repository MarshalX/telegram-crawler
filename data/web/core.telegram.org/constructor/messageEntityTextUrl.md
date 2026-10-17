# messageEntityTextUrl

Message entity representing a [text url](https://google.com): for in-text urls like <https://google.com> use [messageEntityUrl](/constructor/messageEntityUrl.md).

Note that an additional confirmation popup with the full URL must be displayed to the user before opening this link, unless the domain satisfies the conditions specified in the [domain whitelist documentation »](/api/config.md#whitelisted-domains).

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **url** | [string](/type/string.md) | The actual URL |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [messageEntityUrl](/constructor/messageEntityUrl.md)
Message entity representing an in-text url: <https://google.com>; for [text urls](https://google.com), use [messageEntityTextUrl](/constructor/messageEntityTextUrl.md).

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.
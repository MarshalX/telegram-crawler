# messageEntityMention

Message entity [mentioning](/api/mentions.md) a user by `@username`; [messageEntityMentionName](/constructor/messageEntityMentionName.md) can also be used to mention users by their ID.

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===45===
messageEntityMention#fa04579d offset:int length:int = MessageEntity;
```

#### API schema
<!-- /schema-blocks -->

```tl
messageEntityMention#fa04579d offset:int length:int = MessageEntity;
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

#### [Mentions and replies](/api/mentions.md)
Telegram allows mentioning other users in case of urgent duckling matters, and quickly navigating to those mentions in order to read them as swiftly as possible.

#### [messageEntityMentionName](/constructor/messageEntityMentionName.md)
Message entity representing a [user mention](/api/mentions.md): for *creating* a mention use [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md).
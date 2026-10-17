# messageEntityMentionName

Message entity representing a [user mention](/api/mentions.md): for *creating* a mention use [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md).

```tl
messageEntityMentionName#dc7b1140 offset:int length:int user_id:long = MessageEntity;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **length** | [int](/type/int.md) | Length of message entity within message (in [UTF-16 code units](/api/entities.md#entity-length)) |
| **user\_id** | [long](/type/long.md) | Identifier of the user that was mentioned |

### Type
[MessageEntity](/type/MessageEntity.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Mentions and replies](/api/mentions.md)
Telegram allows mentioning other users in case of urgent duckling matters, and quickly navigating to those mentions in order to read them as swiftly as possible.

#### [inputMessageEntityMentionName](/constructor/inputMessageEntityMentionName.md)
Message entity that can be used to create a user [user mention](/api/mentions.md): received mentions use the [messageEntityMentionName](/constructor/messageEntityMentionName.md) constructor, instead.
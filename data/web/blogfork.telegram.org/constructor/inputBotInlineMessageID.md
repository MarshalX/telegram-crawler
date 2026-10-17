# inputBotInlineMessageID

Represents a sent inline message from the perspective of a bot (legacy constructor)

```tl
inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dc\_id** | [int](/type/int.md) | DC ID to use when working with this inline message |
| **id** | [long](/type/long.md) | ID of message, contains both the (32-bit, legacy) owner ID and the message ID, used only for Bot API backwards compatibility with 32-bit user ID. |
| **access\_hash** | [long](/type/long.md) | Access hash of message |

### Type
[InputBotInlineMessageID](/type/InputBotInlineMessageID.md)
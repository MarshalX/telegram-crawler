# updateMessageID

Sent message with **random\_id** client identifier was assigned an identifier.

```tl
updateMessageID#4e90bfd6 id:int random_id:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [int](/type/int.md) | **id** identifier of a respective [Message](/type/Message.md) |
| **random\_id** | [long](/type/long.md) | Previously transferred client **random\_id** identifier. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Message](/type/Message.md)
Object describing a message.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.
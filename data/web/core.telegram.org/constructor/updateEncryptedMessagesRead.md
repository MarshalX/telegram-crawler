# updateEncryptedMessagesRead

Communication history in an encrypted chat was marked as read.

```tl
updateEncryptedMessagesRead#38fe25b7 chat_id:int max_date:int date:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [int](/type/int.md) | Chat ID |
| **max\_date** | [int](/type/int.md) | Maximum value of data for read messages |
| **date** | [int](/type/int.md) | Time when messages were read |

### Type
[Update](/type/Update.md)
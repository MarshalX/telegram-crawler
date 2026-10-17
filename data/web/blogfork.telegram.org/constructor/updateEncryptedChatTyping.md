# updateEncryptedChatTyping

Interlocutor is typing a message in an encrypted chat. Update period is 6 second. If upon this time there is no repeated update, it shall be considered that the interlocutor stopped typing.

```tl
updateEncryptedChatTyping#1710f156 chat_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [int](/type/int.md) | Chat ID |

### Type
[Update](/type/Update.md)
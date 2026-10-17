# decryptedMessageService

Contents of an encrypted service message.

```tl
===8===
decryptedMessageService#aa48327d random_id:long random_bytes:bytes action:DecryptedMessageAction = DecryptedMessage;

===17===
decryptedMessageService#73164160 random_id:long action:DecryptedMessageAction = DecryptedMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_id** | [long](/type/long.md) | Random message ID, assigned by the message author.\
Must be equal to the ID passed to the sending method. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **random\_bytes** | [bytes](/type/bytes.md) | Random bytes, removed in Layer 17. |
| **action** | [DecryptedMessageAction](/type/DecryptedMessageAction.md) | Action relevant to the service message |

### Type
[DecryptedMessage](/type/DecryptedMessage.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.
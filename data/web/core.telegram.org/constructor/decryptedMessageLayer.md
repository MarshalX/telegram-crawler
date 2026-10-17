# decryptedMessageLayer

Sets the layer number for the contents of an encrypted message.

```tl
===17===
decryptedMessageLayer#1be31789 random_bytes:bytes layer:int in_seq_no:int out_seq_no:int message:DecryptedMessage = DecryptedMessageLayer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_bytes** | [bytes](/type/bytes.md) | Set of random bytes to prevent content recognition in short encrypted messages.\
Clients are required to check that there are at least 15 random bytes included in each message. Messages with less than 15 random bytes must be ignored.\
Parameter moved here from [decryptedMessage](/constructor/decryptedMessage.md) in Layer 17. |
| **layer** | [int](/type/int.md) | Layer number. Mimimal value - **17** (the layer in which the constructor was added). |
| **in\_seq\_no** | [int](/type/int.md) | 2x the number of messages in the sender's inbox (including deleted and service messages), incremented by 1 if current user was not the chat creator\
Parameter added in Layer 17. |
| **out\_seq\_no** | [int](/type/int.md) | 2x the number of messages in the recipient's inbox (including deleted and service messages), incremented by 1 if current user was the chat creator\
Parameter added in Layer 17. |
| **message** | [DecryptedMessage](/type/DecryptedMessage.md) | The content of message itself |

### Type
[DecryptedMessageLayer](/type/DecryptedMessageLayer.md)

### Related pages

#### [decryptedMessage](/constructor/decryptedMessage.md)
Contents of an encrypted message.
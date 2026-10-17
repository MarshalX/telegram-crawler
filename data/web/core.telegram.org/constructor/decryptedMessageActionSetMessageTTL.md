# decryptedMessageActionSetMessageTTL

Setting of a message lifetime after reading.

Upon receiving such message the client shall start deleting of all messages of an encrypted chat **ttl\_seconds** seconds after the messages were read by user.

```tl
===8===
decryptedMessageActionSetMessageTTL#a1733aec ttl_seconds:int = DecryptedMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **ttl\_seconds** | [int](/type/int.md) | Lifetime in seconds |

### Type
[DecryptedMessageAction](/type/DecryptedMessageAction.md)
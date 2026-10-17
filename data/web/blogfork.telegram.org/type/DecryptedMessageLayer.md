# DecryptedMessageLayer

Object describes encrypted message content in relation to the required layer.

```tl
===17===
decryptedMessageLayer#1be31789 random_bytes:bytes layer:int in_seq_no:int out_seq_no:int message:DecryptedMessage = DecryptedMessageLayer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [decryptedMessageLayer](/constructor/decryptedMessageLayer.md) | Sets the layer number for the contents of an encrypted message. |
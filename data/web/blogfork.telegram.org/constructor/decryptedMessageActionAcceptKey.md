# decryptedMessageActionAcceptKey

Accept new key

```tl
===20===
decryptedMessageActionAcceptKey#6fe1735b exchange_id:long g_b:bytes key_fingerprint:long = DecryptedMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **exchange\_id** | [long](/type/long.md) | Exchange ID |
| **g\_b** | [bytes](/type/bytes.md) | B parameter, see [rekeying process](/api/end-to-end/pfs.md) |
| **key\_fingerprint** | [long](/type/long.md) | Key fingerprint, see [rekeying process](/api/end-to-end/pfs.md) |

### Type
[DecryptedMessageAction](/type/DecryptedMessageAction.md)

### Related pages

#### [Perfect Forward Secrecy](/api/end-to-end/pfs.md)
Perfect Forward Secrecy in secret chats.
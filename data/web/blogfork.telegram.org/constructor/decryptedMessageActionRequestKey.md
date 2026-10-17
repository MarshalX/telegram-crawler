# decryptedMessageActionRequestKey

Request rekeying, see [rekeying process](/api/end-to-end/pfs.md)

```tl
===20===
decryptedMessageActionRequestKey#f3c9611b exchange_id:long g_a:bytes = DecryptedMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **exchange\_id** | [long](/type/long.md) | Exchange ID |
| **g\_a** | [bytes](/type/bytes.md) | g\_a, see [rekeying process](/api/end-to-end/pfs.md) |

### Type
[DecryptedMessageAction](/type/DecryptedMessageAction.md)

### Related pages

#### [Perfect Forward Secrecy](/api/end-to-end/pfs.md)
Perfect Forward Secrecy in secret chats.
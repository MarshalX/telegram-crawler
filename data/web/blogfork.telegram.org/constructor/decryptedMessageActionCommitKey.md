# decryptedMessageActionCommitKey

Commit new key, see [rekeying process](/api/end-to-end/pfs.md)

```tl
===20===
decryptedMessageActionCommitKey#ec2e0b9b exchange_id:long key_fingerprint:long = DecryptedMessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **exchange\_id** | [long](/type/long.md) | Exchange ID, see [rekeying process](/api/end-to-end/pfs.md) |
| **key\_fingerprint** | [long](/type/long.md) | Key fingerprint, see [rekeying process](/api/end-to-end/pfs.md) |

### Type
[DecryptedMessageAction](/type/DecryptedMessageAction.md)

### Related pages

#### [Perfect Forward Secrecy](/api/end-to-end/pfs.md)
Perfect Forward Secrecy in secret chats.
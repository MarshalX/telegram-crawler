# auth.bindTempAuthKey

Binds a temporary authorization key `temp_auth_key_id` to the permanent authorization key `perm_auth_key_id`.

For more information, see [Perfect Forward Secrecy](/api/pfs.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.bindTempAuthKey#cdd42a05 perm_auth_key_id:long nonce:long expires_at:int encrypted_message:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **perm\_auth\_key\_id** | [long](/type/long.md) | Permanent auth\_key\_id to bind to |
| **nonce** | [long](/type/long.md) | Random long from [Binding message contents](#binding-message-contents) |
| **expires\_at** | [int](/type/int.md) | Unix timestamp to invalidate temporary key, see [Binding message contents](#binding-message-contents) |
| **encrypted\_message** | [bytes](/type/bytes.md) | See [Generating encrypted\_message](#generating-encrypted-message) |

### Result
[Bool](/type/Bool.md)

### Generating encrypted_message

The client begins by creating a special binding message:

### Binding message contents

```
bind_auth_key_inner#75a3f765 nonce:long temp_auth_key_id:long perm_auth_key_id:long temp_session_id:long expires_at:int = BindAuthKeyInner;
```

|     |     |     |
| --- | --- | --- |
| **nonce** | [long](/type/long.md) | Random long |
| **temp\_auth\_key\_id** | [long](/type/long.md) | Temporary auth\_key\_id |
| **perm\_auth\_key\_id** | [long](/type/long.md) | Permanent auth\_key\_id to bind to |
| **temp\_session\_id** | [long](/type/long.md) | Session id, which will be used to invoke **auth.bindTempAuthKey** method |
| **expires\_at** | [int](/type/int.md) | Unix timestamp to invalidate temporary key |

### Encrypting the binding message

This binding message is encrypted in [the usual way, but with MTProto v1](/mtproto/description.md) using the `perm_auth_key`. In other words, one has to prepend `random:int128` (it replaces the customary `session_id:long` and `salt:long` that are irrelevant in this case), then append the same `msg_id` that will be used for the request, a `seqno` equal to zero, and the correct `msg_len` (40 bytes in this case); after that, one computes the `msg_key:int128` as SHA1 of the resulting string, appends padding necessary for a 16-byte alignment, encrypts the resulting string using the key derived from `perm_auth_key` and `msg_key`, and prepends `perm_auth_key_id` and `msg_key` to the encrypted data as usual.

### Binding

Once **encrypted\_message** is ready, an **auth.bindTempAuthKey** request is sent to the server using `temp_auth_key` and `temp_session_id`. Don't forget to [rewrite client info](/api/invoking.md#saving-client-info) using [initConnection](/method/initConnection.md) when the binding is completed.

### Both users and bots can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ENCRYPTED\_MESSAGE\_INVALID | Encrypted message invalid. |
| 400 | EXPIRES\_AT\_INVALID | The specified `expires_at` timestamp is invalid. |
| 400 | TEMP\_AUTH\_KEY\_ALREADY\_BOUND | The passed temporary key is already bound to another **perm_auth_key_id**. |
| 400 | TEMP\_AUTH\_KEY\_EMPTY | No temporary auth key provided. |

### Related pages

#### [Perfect Forward Secrecy](/api/pfs.md)
Binding temporary authorization key to permanent ones.

#### [long](/type/long.md)
A basic bare type, elements of which correspond to two-element sequences, representing 64-bit signed numbers (little-endian).

#### [int](/type/int.md)
A basic bare type, the values of which correspond to single-element sequences, i.e. numbers from -2^31 to 2^31-1 which in this case represent themselves.

#### [﻿Mobile Protocol: Detailed Description](/mtproto/description.md)
A description of MTProto 2.0, used by major Telegram clients as of version 4.6.

#### [Calling API Methods](/api/invoking.md)
Additional options for calling methods.

#### [initConnection](/method/initConnection.md)
Initialize connection
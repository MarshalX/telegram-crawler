# updateNewAuthorization

A new session logged into the current user's account through an unknown device.

```tl
updateNewAuthorization#8951abef flags:# unconfirmed:flags.0?true hash:long date:flags.0?int device:flags.0?string location:flags.0?string = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unconfirmed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the session is [unconfirmed, see here »](/api/auth.md#confirming-login) for more info. |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Authorization date |
| **device** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Name of device, for example *Android* |
| **location** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Location, for example *USA, NY (IP=1.2.3.4)* |

### Type
[Update](/type/Update.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.
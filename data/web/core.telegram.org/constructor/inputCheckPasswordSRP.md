# inputCheckPasswordSRP

Constructor for checking the validity of a 2FA SRP password (see [SRP](/api/srp.md))

```tl
inputCheckPasswordSRP#d27ff082 srp_id:long A:bytes M1:bytes = InputCheckPasswordSRP;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **srp\_id** | [long](/type/long.md) | [SRP ID](/api/srp.md) |
| **A** | [bytes](/type/bytes.md) | `A` parameter (see [SRP](/api/srp.md)) |
| **M1** | [bytes](/type/bytes.md) | `M1` parameter (see [SRP](/api/srp.md)) |

### Type
[InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md)

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.
# auth.loginToken

Login token (for [QR code login](/api/qr-login.md))

```tl
auth.loginToken#629f1980 expires:int token:bytes = auth.LoginToken;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **expires** | [int](/type/int.md) | Expiration date of QR code |
| **token** | [bytes](/type/bytes.md) | Token to render in QR code |

### Type
[auth.LoginToken](/type/auth.LoginToken.md)

### Related pages

#### [Login via QR code](/api/qr-login.md)
QR code login flow
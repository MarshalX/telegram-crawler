# auth.acceptLoginToken

Accept QR code login token, logging in the app that generated it.

Returns info about the new session.

For more info, see [login via QR code](/api/qr-login.md).

```tl
authorization#ad01d61d flags:# current:flags.0?true official_app:flags.1?true password_pending:flags.2?true encrypted_requests_disabled:flags.3?true call_requests_disabled:flags.4?true unconfirmed:flags.5?true hash:long device_model:string platform:string system_version:string api_id:int app_name:string app_version:string date_created:int date_active:int ip:string country:string region:string = Authorization;
---functions---
auth.acceptLoginToken#e894ad4d token:bytes = Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **token** | [bytes](/type/bytes.md) | Login token embedded in QR code, for more info, see [login via QR code](/api/qr-login.md). |

### Result
[Authorization](/type/Authorization.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | AUTH\_TOKEN\_ALREADY\_ACCEPTED | The specified auth token was already accepted. |
| 400 | AUTH\_TOKEN\_EXCEPTION | An error occurred while importing the auth token. |
| 400 | AUTH\_TOKEN\_EXPIRED | The authorization token has expired. |
| 400 | AUTH\_TOKEN\_INVALIDX | The specified auth token is invalid. |

### Related pages

#### [Login via QR code](/api/qr-login.md)
QR code login flow
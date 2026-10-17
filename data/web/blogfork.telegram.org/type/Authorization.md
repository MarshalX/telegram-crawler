# Authorization

Represents a logged-in session

```tl
authorization#ad01d61d flags:# current:flags.0?true official_app:flags.1?true password_pending:flags.2?true encrypted_requests_disabled:flags.3?true call_requests_disabled:flags.4?true unconfirmed:flags.5?true hash:long device_model:string platform:string system_version:string api_id:int app_name:string app_version:string date_created:int date_active:int ip:string country:string region:string = Authorization;

---functions---

auth.acceptLoginToken#e894ad4d token:bytes = Authorization;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [authorization](/constructor/authorization.md) | Logged-in session |

### Methods

| Method | Description |
| --- | --- |
| [auth.acceptLoginToken](/method/auth.acceptLoginToken.md) | Accept QR code login token, logging in the app that generated it.\
\
Returns info about the new session.\
\
For more info, see [login via QR code](/api/qr-login.md). |
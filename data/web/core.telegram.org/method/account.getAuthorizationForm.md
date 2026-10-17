# account.getAuthorizationForm

Returns a Telegram Passport authorization form for sharing data with a service

```tl
account.authorizationForm#ad2e1cd8 flags:# required_types:Vector<SecureRequiredType> values:Vector<SecureValue> errors:Vector<SecureValueError> users:Vector<User> privacy_policy_url:flags.0?string = account.AuthorizationForm;
---functions---
account.getAuthorizationForm#a929597a bot_id:long scope:string public_key:string = account.AuthorizationForm;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot\_id** | [long](/type/long.md) | User identifier of the service's bot |
| **scope** | [string](/type/string.md) | Telegram Passport element types requested by the service |
| **public\_key** | [string](/type/string.md) | Service's public key |

### Result
[account.AuthorizationForm](/type/account.AuthorizationForm.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | PUBLIC\_KEY\_REQUIRED | A public key is required. |
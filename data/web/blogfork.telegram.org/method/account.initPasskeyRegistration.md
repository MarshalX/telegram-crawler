# account.initPasskeyRegistration

Initialize passkey registration for the current account, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow.

```tl
account.passkeyRegistrationOptions#e16b5ce1 options:DataJSON = account.PasskeyRegistrationOptions;
---functions---
account.initPasskeyRegistration#429547e8 = account.PasskeyRegistrationOptions;
```

### Parameters

This constructor does not require any parameters.

### Result
[account.PasskeyRegistrationOptions](/type/account.PasskeyRegistrationOptions.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | ACCESS\_DENIED | The account was deactivated, or is a bot/service account. |
| 406 | FRESH\_RESET\_AUTHORISATION\_FORBIDDEN | You can't logout other sessions if less than 24 hours have passed since you logged on the current session. |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
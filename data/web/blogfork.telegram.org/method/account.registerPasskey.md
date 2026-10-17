# account.registerPasskey

Complete passkey registration for the current account, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow.

```tl
passkey#98613ebf flags:# id:string name:string date:int software_emoji_id:flags.0?long last_usage_date:flags.1?int = Passkey;
---functions---
account.registerPasskey#55b41fd6 credential:InputPasskeyCredential = Passkey;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **credential** | [InputPasskeyCredential](/type/InputPasskeyCredential.md) | Registration result. |

### Result
[Passkey](/type/Passkey.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CREDENTIAL\_INVALID | The specified credential is invalid. |
| 400 | PASSKEY\_ORIGIN\_MISMATCH | Third-party clients currently don't support passkeys even when changing the origin. |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
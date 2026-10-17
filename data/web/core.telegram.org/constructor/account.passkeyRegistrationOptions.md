# account.passkeyRegistrationOptions

Passkey registration options, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow.

```tl
account.passkeyRegistrationOptions#e16b5ce1 options:DataJSON = account.PasskeyRegistrationOptions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **options** | [DataJSON](/type/DataJSON.md) | JSON-encoded object whose `publicKey` field contains a [`PublicKeyCredentialCreationOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions) object. |

### Type
[account.PasskeyRegistrationOptions](/type/account.PasskeyRegistrationOptions.md)

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
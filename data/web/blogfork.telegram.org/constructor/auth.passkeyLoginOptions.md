# auth.passkeyLoginOptions

Passkey login options, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info on the full flow.

```tl
auth.passkeyLoginOptions#e2037789 options:DataJSON = auth.PasskeyLoginOptions;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **options** | [DataJSON](/type/DataJSON.md) | JSON-encoded object whose `publicKey` field contains a [`PublicKeyCredentialRequestOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions) object. |

### Type
[auth.PasskeyLoginOptions](/type/auth.PasskeyLoginOptions.md)

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
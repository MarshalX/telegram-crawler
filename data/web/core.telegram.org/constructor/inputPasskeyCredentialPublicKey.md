# inputPasskeyCredentialPublicKey

Public-key passkey credential used both for registration and for login, see [creating a passkey »](/api/passkeys.md#creating-a-passkey) and [logging in with a passkey »](/api/passkeys.md#logging-in-with-a-passkey) for the full flows.

```tl
inputPasskeyCredentialPublicKey#3c27b78f id:string raw_id:string response:InputPasskeyResponse = InputPasskeyCredential;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [string](/type/string.md) | `id` field of a [PublicKeyCredential](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential), passed as-is without base64url-decoding when using the JSON representation |
| **raw\_id** | [string](/type/string.md) | `rawId` field of a [PublicKeyCredential](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential), passed as-is without base64url-decoding when using the JSON representation |
| **response** | [InputPasskeyResponse](/type/InputPasskeyResponse.md) | Registration or login response. |

### Type
[InputPasskeyCredential](/type/InputPasskeyCredential.md)

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
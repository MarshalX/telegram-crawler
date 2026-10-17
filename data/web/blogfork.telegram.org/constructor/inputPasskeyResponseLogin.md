# inputPasskeyResponseLogin

WebAuthn authentication response used when logging in with a passkey, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info on the full flow.

Generated from the [AuthenticatorAssertionResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse) object.

```tl
inputPasskeyResponseLogin#c31fc14a client_data:DataJSON authenticator_data:bytes signature:bytes user_handle:string = InputPasskeyResponse;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **client\_data** | [DataJSON](/type/DataJSON.md) | Base64url-decoded `clientDataJSON` field of an [AuthenticatorAssertionResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse), wrapped in [dataJSON](/constructor/dataJSON.md) |
| **authenticator\_data** | [bytes](/type/bytes.md) | Base64url-decoded `authenticatorData` field of an [AuthenticatorAssertionResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse) |
| **signature** | [bytes](/type/bytes.md) | Base64url-decoded `signature` field of an [AuthenticatorAssertionResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse) |
| **user\_handle** | [string](/type/string.md) | Base64url-decoded `userHandle` field of an [AuthenticatorAssertionResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse). The user handle specified by the server is in `<dc_id>:<user_id>` format. |

### Type
[InputPasskeyResponse](/type/InputPasskeyResponse.md)

### Related pages

#### [dataJSON](/constructor/dataJSON.md)
Represents a json-encoded object

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
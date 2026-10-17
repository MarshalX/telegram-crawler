# inputPasskeyResponseRegister

WebAuthn registration response used when registering a new passkey, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow.

Generated from the [AuthenticatorAttestationResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse) object.

```tl
inputPasskeyResponseRegister#3e63935c client_data:DataJSON attestation_data:bytes = InputPasskeyResponse;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **client\_data** | [DataJSON](/type/DataJSON.md) | Base64url-decoded `clientDataJSON` field of an [AuthenticatorAttestationResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse), wrapped in [dataJSON](/constructor/dataJSON.md) |
| **attestation\_data** | [bytes](/type/bytes.md) | Base64url-decoded `attestationObject` field of an [AuthenticatorAttestationResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse) |

### Type
[InputPasskeyResponse](/type/InputPasskeyResponse.md)

### Related pages

#### [dataJSON](/constructor/dataJSON.md)
Represents a json-encoded object

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
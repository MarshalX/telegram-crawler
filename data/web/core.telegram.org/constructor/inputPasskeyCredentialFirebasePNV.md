# inputPasskeyCredentialFirebasePNV

Alternative [passkey](/api/passkeys.md) credential that proves ownership of the account's phone number through a Firebase Phone Number Verification (PNV) token, used on official apps where a full WebAuthn [public-key passkey](/constructor/inputPasskeyCredentialPublicKey.md) cannot be created, in a way similar to [Firebase SMS authentication »](/api/auth.md).

No such constructor in the current schema.

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **pnv\_token** | [string](/type/string.md) | Firebase Phone Number Verification token attesting that the user controls the phone number associated with the account. |

### Type
[InputPasskeyCredential](/type/InputPasskeyCredential.md)

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.

#### [inputPasskeyCredentialPublicKey](/constructor/inputPasskeyCredentialPublicKey.md)
Public-key passkey credential used both for registration and for login, see [creating a passkey »](/api/passkeys.md#creating-a-passkey) and [logging in with a passkey »](/api/passkeys.md#logging-in-with-a-passkey) for the full flows.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.
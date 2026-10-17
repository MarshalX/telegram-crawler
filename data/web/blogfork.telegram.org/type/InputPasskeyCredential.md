# InputPasskeyCredential

Credential used to register a [passkey »](/api/passkeys.md) or to log in with one.

```tl
inputPasskeyCredentialPublicKey#3c27b78f id:string raw_id:string response:InputPasskeyResponse = InputPasskeyCredential;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputPasskeyCredentialPublicKey](/constructor/inputPasskeyCredentialPublicKey.md) | Public-key passkey credential used both for registration and for login, see [creating a passkey »](/api/passkeys.md#creating-a-passkey) and [logging in with a passkey »](/api/passkeys.md#logging-in-with-a-passkey) for the full flows. |
| [inputPasskeyCredentialFirebasePNV](/constructor/inputPasskeyCredentialFirebasePNV.md) | Alternative [passkey](/api/passkeys.md) credential that proves ownership of the account's phone number through a Firebase Phone Number Verification (PNV) token, used on official apps where a full WebAuthn [public-key passkey](/constructor/inputPasskeyCredentialPublicKey.md) cannot be created, in a way similar to [Firebase SMS authentication »](/api/auth.md). |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
# Auth.PasskeyLoginOptions

Passkey login options, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info on the full flow.

```tl
auth.passkeyLoginOptions#e2037789 options:DataJSON = auth.PasskeyLoginOptions;

---functions---

auth.initPasskeyLogin#518ad0b7 api_id:int api_hash:string = auth.PasskeyLoginOptions;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [auth.passkeyLoginOptions](/constructor/auth.passkeyLoginOptions.md) | Passkey login options, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info on the full flow. |

### Methods

| Method | Description |
| --- | --- |
| [auth.initPasskeyLogin](/method/auth.initPasskeyLogin.md) | Initialize login with a passkey over an unauthenticated connection, see [here »](/api/passkeys.md#logging-in-with-a-passkey) for more info. |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
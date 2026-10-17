# Passkey

Human-readable info about a passkey associated to an account, returned when [creating a passkey »](/api/passkeys.md#creating-a-passkey) or [listing passkeys »](/api/passkeys.md#list-passkeys).

```tl
passkey#98613ebf flags:# id:string name:string date:int software_emoji_id:flags.0?long last_usage_date:flags.1?int = Passkey;

---functions---

account.registerPasskey#55b41fd6 credential:InputPasskeyCredential = Passkey;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [passkey](/constructor/passkey.md) | Human-readable info about a passkey associated to an account, returned when [creating a passkey »](/api/passkeys.md#creating-a-passkey) or [listing passkeys »](/api/passkeys.md#list-passkeys). |

### Methods

| Method | Description |
| --- | --- |
| [account.registerPasskey](/method/account.registerPasskey.md) | Complete passkey registration for the current account, see [here »](/api/passkeys.md#creating-a-passkey) for more info on the full flow. |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
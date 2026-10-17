# Account.Passkeys

List of [passkeys »](/api/passkeys.md#list-passkeys) associated to the current account.

```tl
account.passkeys#f8e0aa1c passkeys:Vector<Passkey> = account.Passkeys;

---functions---

account.getPasskeys#ea1f0c52 = account.Passkeys;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.passkeys](/constructor/account.passkeys.md) | List of [passkeys »](/api/passkeys.md#list-passkeys) associated to the current account. |

### Methods

| Method | Description |
| --- | --- |
| [account.getPasskeys](/method/account.getPasskeys.md) | List the passkeys associated to the current account that can be used to log in, see [here »](/api/passkeys.md#list-passkeys) for more info on passkeys. |

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
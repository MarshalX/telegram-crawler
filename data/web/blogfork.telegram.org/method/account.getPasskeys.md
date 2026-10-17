# account.getPasskeys

List the passkeys associated to the current account that can be used to log in, see [here »](/api/passkeys.md#list-passkeys) for more info on passkeys.

```tl
account.passkeys#f8e0aa1c passkeys:Vector<Passkey> = account.Passkeys;
---functions---
account.getPasskeys#ea1f0c52 = account.Passkeys;
```

### Parameters

This constructor does not require any parameters.

### Result
[account.Passkeys](/type/account.Passkeys.md)

### Only users can use this method

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
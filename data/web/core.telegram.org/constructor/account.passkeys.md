# account.passkeys

List of [passkeys »](/api/passkeys.md#list-passkeys) associated to the current account.

```tl
account.passkeys#f8e0aa1c passkeys:Vector<Passkey> = account.Passkeys;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **passkeys** | [Vector](/type/Vector%20t)&lt;[Passkey](/type/Passkey.md)&gt; | List of passkeys that can be used to log into the current account |

### Type
[account.Passkeys](/type/account.Passkeys.md)

### Related pages

#### [Passkey login](/api/passkeys.md)
Log in to Telegram instantly with a passkey using a PIN or biometrics instead of an SMS code.
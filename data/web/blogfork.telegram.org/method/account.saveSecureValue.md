# account.saveSecureValue

Securely save [Telegram Passport](/passport.md) document, [for more info see the passport docs »](/passport/encryption.md#encryption)

```tl
secureValue#187fa0ca flags:# type:SecureValueType data:flags.0?SecureData front_side:flags.1?SecureFile reverse_side:flags.2?SecureFile selfie:flags.3?SecureFile translation:flags.6?Vector<SecureFile> files:flags.4?Vector<SecureFile> plain_data:flags.5?SecurePlainData hash:bytes = SecureValue;
---functions---
account.saveSecureValue#899fe31d value:InputSecureValue secure_secret_id:long = SecureValue;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **value** | [InputSecureValue](/type/InputSecureValue.md) | Secure value, [for more info see the passport docs »](/passport/encryption.md#encryption) |
| **secure\_secret\_id** | [long](/type/long.md) | Passport secret hash, [for more info see the passport docs »](/passport/encryption.md#encryption) |

### Result
[SecureValue](/type/SecureValue.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_REQUIRED | A [2FA password](/api/srp.md) must be configured to use Telegram Passport. |
| 400 | SECURE\_SECRET\_REQUIRED | A secure secret is required. |

### Related pages

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.
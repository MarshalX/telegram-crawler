# SecurePlainData

Plaintext verified [passport data](/passport/encryption.md#secureplaindata).

```tl
securePlainPhone#7d6099dd phone:string = SecurePlainData;
securePlainEmail#21ec5a5f email:string = SecurePlainData;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [securePlainPhone](/constructor/securePlainPhone.md) | Phone number to use in [telegram passport](/passport.md): [it must be verified, first »](/passport/encryption.md#secureplaindata). |
| [securePlainEmail](/constructor/securePlainEmail.md) | Email address to use in [telegram passport](/passport.md): [it must be verified, first »](/passport/encryption.md#secureplaindata). |

### Related pages

#### [Telegram Passport Encryption Details](/passport/encryption.md)
How Telegram Passport data is stored and encrypted end-to-end.
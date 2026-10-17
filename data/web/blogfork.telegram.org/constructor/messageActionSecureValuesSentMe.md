# messageActionSecureValuesSentMe

Secure [telegram passport](/passport.md) values were received

```tl
messageActionSecureValuesSentMe#1b287353 values:Vector<SecureValue> credentials:SecureCredentialsEncrypted = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **values** | [Vector](/type/Vector%20t)&lt;[SecureValue](/type/SecureValue.md)&gt; | Vector with information about documents and other Telegram Passport elements that were shared with the bot |
| **credentials** | [SecureCredentialsEncrypted](/type/SecureCredentialsEncrypted.md) | Encrypted credentials required to decrypt the data |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.
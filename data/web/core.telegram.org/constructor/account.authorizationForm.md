# account.authorizationForm

[Telegram Passport](/passport.md) authorization form

```tl
account.authorizationForm#ad2e1cd8 flags:# required_types:Vector<SecureRequiredType> values:Vector<SecureValue> errors:Vector<SecureValueError> users:Vector<User> privacy_policy_url:flags.0?string = account.AuthorizationForm;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **required\_types** | [Vector](/type/Vector%20t)&lt;[SecureRequiredType](/type/SecureRequiredType.md)&gt; | Required [Telegram Passport](/passport.md) documents |
| **values** | [Vector](/type/Vector%20t)&lt;[SecureValue](/type/SecureValue.md)&gt; | Already submitted [Telegram Passport](/passport.md) documents |
| **errors** | [Vector](/type/Vector%20t)&lt;[SecureValueError](/type/SecureValueError.md)&gt; | [Telegram Passport](/passport.md) errors |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Info about the bot to which the form will be submitted |
| **privacy\_policy\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | URL of the service's privacy policy |

### Type
[account.AuthorizationForm](/type/account.AuthorizationForm.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.
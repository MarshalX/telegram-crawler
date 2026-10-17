# codeSettings

Settings used by telegram servers for sending the confirm code.

Example implementations: [telegram for android](https://github.com/DrKLO/Telegram/blob/master/TMessagesProj/src/main/java/org/telegram/ui/LoginActivity.java), [tdlib](https://github.com/tdlib/td/tree/master/td/telegram/SendCodeHelper.cpp).

```tl
codeSettings#ad253d78 flags:# allow_flashcall:flags.0?true current_number:flags.1?true allow_app_hash:flags.4?true allow_missed_call:flags.5?true allow_firebase:flags.7?true unknown_number:flags.9?true logout_tokens:flags.6?Vector<bytes> token:flags.8?string app_sandbox:flags.8?Bool = CodeSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **allow\_flashcall** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to allow phone verification via [phone calls](/api/auth.md). |
| **current\_number** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Pass true if the phone number is used on the current device. Ignored if allow\_flashcall is not set. |
| **allow\_app\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If a token that will be included in eventually sent SMSs is required: required in newer versions of android, to use the [android SMS receiver APIs](https://developers.google.com/identity/sms-retriever/overview) |
| **allow\_missed\_call** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this device supports receiving the code using the [auth.codeTypeMissedCall](/constructor/auth.codeTypeMissedCall.md) method |
| **allow\_firebase** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether Firebase auth is supported |
| **unknown\_number** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Set this flag if there is a SIM card in the current device, but it is not possible to check whether the specified phone number matches the SIM's phone number. |
| **logout\_tokens** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Vector](/type/Vector%20t)&lt;[bytes](/type/bytes.md)&gt; | Previously stored future auth tokens, see [the documentation for more info »](/api/auth.md#future-auth-tokens) |
| **token** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[string](/type/string.md) | Used only by official iOS apps for Firebase auth: device token for apple push. |
| **app\_sandbox** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[Bool](/type/Bool.md) | Used only by official iOS apps for firebase auth: whether a sandbox-certificate will be used during transmission of the push notification. |

### Type
[CodeSettings](/type/CodeSettings.md)

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.

#### [auth.codeTypeMissedCall](/constructor/auth.codeTypeMissedCall.md)
The next time, the authentication code will be delivered via an immediately canceled incoming call, handled manually by the user.
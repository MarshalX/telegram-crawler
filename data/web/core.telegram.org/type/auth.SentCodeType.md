# auth.SentCodeType

Type of the verification code that was sent

```tl
auth.sentCodeTypeApp#3dbb5986 length:int = auth.SentCodeType;
auth.sentCodeTypeSms#c000bba2 length:int = auth.SentCodeType;
auth.sentCodeTypeCall#5353e5a7 length:int = auth.SentCodeType;
auth.sentCodeTypeFlashCall#ab03c6d9 pattern:string = auth.SentCodeType;
auth.sentCodeTypeMissedCall#82006484 prefix:string length:int = auth.SentCodeType;
auth.sentCodeTypeEmailCode#f450f59b flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true email_pattern:string length:int reset_available_period:flags.3?int reset_pending_date:flags.4?int = auth.SentCodeType;
auth.sentCodeTypeSetUpEmailRequired#a5491dea flags:# apple_signin_allowed:flags.0?true google_signin_allowed:flags.1?true = auth.SentCodeType;
auth.sentCodeTypeFragmentSms#d9565c39 url:string length:int = auth.SentCodeType;
auth.sentCodeTypeFirebaseSms#9fd736 flags:# nonce:flags.0?bytes play_integrity_project_id:flags.2?long play_integrity_nonce:flags.2?bytes receipt:flags.1?string push_timeout:flags.1?int length:int = auth.SentCodeType;
auth.sentCodeTypeSmsWord#a416ac81 flags:# beginning:flags.0?string = auth.SentCodeType;
auth.sentCodeTypeSmsPhrase#b37794af flags:# beginning:flags.0?string = auth.SentCodeType;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [auth.sentCodeTypeApp](/constructor/auth.sentCodeTypeApp.md) | The code was sent through the telegram app |
| [auth.sentCodeTypeSms](/constructor/auth.sentCodeTypeSms.md) | The code was sent via SMS |
| [auth.sentCodeTypeCall](/constructor/auth.sentCodeTypeCall.md) | The code will be sent via a phone call: a synthesized voice will tell the user which verification code to input. |
| [auth.sentCodeTypeFlashCall](/constructor/auth.sentCodeTypeFlashCall.md) | The code will be sent via a flash phone call, that will be closed immediately. The phone code will then be the phone number itself, just make sure that the phone number matches the specified pattern. |
| [auth.sentCodeTypeMissedCall](/constructor/auth.sentCodeTypeMissedCall.md) | The code will be sent via a flash phone call, that will be closed immediately. The last digits of the phone number that calls are the code that must be entered manually by the user. |
| [auth.sentCodeTypeEmailCode](/constructor/auth.sentCodeTypeEmailCode.md) | The code was sent via the [previously configured login email »](/api/auth.md#email-verification) |
| [auth.sentCodeTypeSetUpEmailRequired](/constructor/auth.sentCodeTypeSetUpEmailRequired.md) | The user should add and verify an email address in order to login as described [here »](/api/auth.md#email-verification). |
| [auth.sentCodeTypeFragmentSms](/constructor/auth.sentCodeTypeFragmentSms.md) | The code was delivered via [fragment.com](https://fragment.com). |
| [auth.sentCodeTypeFirebaseSms](/constructor/auth.sentCodeTypeFirebaseSms.md) | An authentication code should be delivered via SMS after Firebase attestation, as described in the [auth documentation »](/api/auth.md). |
| [auth.sentCodeTypeSmsWord](/constructor/auth.sentCodeTypeSmsWord.md) | The code was sent via SMS as a secret word, starting with the letter specified in `beginning` |
| [auth.sentCodeTypeSmsPhrase](/constructor/auth.sentCodeTypeSmsPhrase.md) | The code was sent via SMS as a secret phrase starting with the word specified in `beginning` |
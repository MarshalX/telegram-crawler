# auth.SentCode

Contains info on a confirmation code message sent via SMS, phone call or Telegram.

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;

---functions---

auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
account.sendChangePhoneCode#82574ae5 phone_number:string settings:CodeSettings = auth.SentCode;
auth.resendCode#cae47523 flags:# phone_number:string phone_code_hash:string reason:flags.0?string = auth.SentCode;
account.sendConfirmPhoneCode#1b3faa88 hash:string settings:CodeSettings = auth.SentCode;
account.sendVerifyPhoneCode#a5a356f9 phone_number:string settings:CodeSettings = auth.SentCode;
auth.resetLoginEmail#7e960193 phone_number:string phone_code_hash:string = auth.SentCode;
auth.checkPaidAuth#56e59f9c phone_number:string phone_code_hash:string form_id:long = auth.SentCode;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [auth.sentCode](/constructor/auth.sentCode.md) | Contains info about a sent verification code. |
| [auth.sentCodeSuccess](/constructor/auth.sentCodeSuccess.md) | The user successfully authorized using [future auth tokens](/api/auth.md#future-auth-tokens) |
| [auth.sentCodePaymentRequired](/constructor/auth.sentCodePaymentRequired.md) | Official apps may receive this constructor, indicating that due to the high cost of SMS verification codes for the user's country/provider, the user must purchase a [Telegram Premium](/api/premium.md) subscription in order to proceed with the login/signup, see [here »](/api/auth.md#paid-auth) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [auth.sendCode](/method/auth.sendCode.md) | Send the verification code for login |
| [auth.resendCode](/method/auth.resendCode.md) | Resend the login code via another medium, the phone code type is determined by the return value of the previous auth.sendCode/auth.resendCode: see [login](/api/auth.md) for more info. |
| [auth.resetLoginEmail](/method/auth.resetLoginEmail.md) | Reset the [login email »](/api/auth.md#email-verification). |
| [auth.checkPaidAuth](/method/auth.checkPaidAuth.md) | Checks the status of a [login payment](/api/auth.md#paid-auth). |
| [account.sendChangePhoneCode](/method/account.sendChangePhoneCode.md) | Verify a new phone number to associate to the current account |
| [account.sendConfirmPhoneCode](/method/account.sendConfirmPhoneCode.md) | Send confirmation code to cancel account deletion, for more info [click here »](/api/account-deletion.md) |
| [account.sendVerifyPhoneCode](/method/account.sendVerifyPhoneCode.md) | Send the verification phone code for telegram [passport](/passport.md). |
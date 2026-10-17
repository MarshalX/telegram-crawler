# Account deletion

A user can delete their Telegram account using [account.deleteAccount](/method/account.deleteAccount.md).  

    ---functions---
    account.deleteAccount#a2c0cf74 flags:# reason:string password:flags.0?InputCheckPasswordSRP = Bool;

    account.confirmPhone#5f2178c3 phone_code_hash:string phone_code:string = Bool;
    account.sendConfirmPhoneCode#1b3faa88 hash:string settings:CodeSettings = auth.SentCode;

If the account doesn't have a [2FA password](/api/srp.md), calling this method  will **immediately delete the Telegram account**.  
If the account has a [2FA password](/api/srp.md) and it is provided to `account.deleteAccount:password`, calling this method will **immediately delete the Telegram account**.  

If the account has a [2FA password](/api/srp.md) but the user doesn't remember it, [password reset may be requested first&nbsp;&raquo;](/api/srp.md#password-reset), or otherwise, the `password` field may simply be left empty.  

In this case, if the account's [2FA password](/api/srp.md) was modified more than 7 days ago and was active in the last 7 days, **account deletion will be delayed for 7 days**.
Otherwise, the account will be **immediately deleted**.  
In the first case, a [service message will be sent to the user](/constructor/updateServiceNotification.md), containing a [phone number confirmation link&nbsp;&raquo;](/api/links.md#phone-confirmation-links).

When such a link is clicked, [account.sendConfirmPhoneCode](/method/account.sendConfirmPhoneCode.md) must be called with the specified `hash`, using the account with the specified `phone` number.  
This will send a phone number verification code to the phone number associated with the account.  
The phone code settings are the same as for the [login code](/api/auth.md), and [auth.cancelCode](/method/auth.cancelCode.md) with [auth.resendCode](/method/auth.resendCode.md) can be used as well, to resend or cancel the phone code as for the [login code](/api/auth.md).

Once the SMS code is received, the [account.confirmPhone](/method/account.confirmPhone.md) method will have to be called with the SMS code and the phone hash received from the [account.sendConfirmPhoneCode](/method/account.sendConfirmPhoneCode.md) method.

This will cancel deletion of the account and will log out the user that tried to reset it.  
Otherwise, if the number isn't confirmed in 7 days, the **account will be deleted** and the user will be free to recreate it.

## Related articles

### [User Authorization](/api/auth.md)

How to register a user's phone to start using the API.

### [Two-factor authentication](/api/srp.md)

How to login to a user's account if they have enabled 2FA, how to change password.  

### [Deep links](/api/links.md)

Telegram clients must handle special `tg://` and `t.me` deep links encountered in messages, link entities and in other apps by registering OS handlers. 

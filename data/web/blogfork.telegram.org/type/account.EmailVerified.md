# account.EmailVerified

Email verification status

```tl
account.emailVerified#2b96cd1b email:string = account.EmailVerified;
account.emailVerifiedLogin#e1bb0d61 email:string sent_code:auth.SentCode = account.EmailVerified;

---functions---

account.verifyEmail#32da4cf purpose:EmailVerifyPurpose verification:EmailVerification = account.EmailVerified;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.emailVerified](/constructor/account.emailVerified.md) | The email was verified correctly. |
| [account.emailVerifiedLogin](/constructor/account.emailVerifiedLogin.md) | The email was verified correctly, and a login code was just sent to it. |

### Methods

| Method | Description |
| --- | --- |
| [account.verifyEmail](/method/account.verifyEmail.md) | Verify an email address. |
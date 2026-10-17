# account.SentEmailCode

The email code that was sent

```tl
account.sentEmailCode#811f854f email_pattern:string length:int = account.SentEmailCode;

---functions---

account.sendVerifyEmailCode#98e037bb purpose:EmailVerifyPurpose email:string = account.SentEmailCode;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.sentEmailCode](/constructor/account.sentEmailCode.md) | The sent email code |

### Methods

| Method | Description |
| --- | --- |
| [account.sendVerifyEmailCode](/method/account.sendVerifyEmailCode.md) | Send an email verification code. |
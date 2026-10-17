# account.sentEmailCode

The sent email code

```tl
account.sentEmailCode#811f854f email_pattern:string length:int = account.SentEmailCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **email\_pattern** | [string](/type/string.md) | The email (to which the code was sent) must match this [pattern](/api/pattern.md) |
| **length** | [int](/type/int.md) | The length of the verification code |

### Type
[account.SentEmailCode](/type/account.SentEmailCode.md)

### Related pages

#### [Pattern matching](/api/pattern.md)
Some methods require the client to verify if the data obtained from an external source matches a certain pattern.
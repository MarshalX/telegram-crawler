# invokeWithReCaptcha

Official clients only: re-execute a method call that required reCAPTCHA verification via a `RECAPTCHA_CHECK_%s__%s`, where the first placeholder is the `action`, and the second one is the reCAPTCHA key ID.

```tl
---functions---
invokeWithReCaptcha#adbb0f94 {X:Type} token:string query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **token** | [string](/type/string.md) | reCAPTCHA token received after verification. |
| **query** | !X | The original method call. |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method
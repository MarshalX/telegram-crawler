# auth.sentCodeTypeSmsPhrase

The code was sent via SMS as a secret phrase starting with the word specified in `beginning`

```tl
auth.sentCodeTypeSmsPhrase#b37794af flags:# beginning:flags.0?string = auth.SentCodeType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **beginning** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, the secret phrase (and the SMS) starts with this word. |

### Type
[auth.SentCodeType](/type/auth.SentCodeType.md)
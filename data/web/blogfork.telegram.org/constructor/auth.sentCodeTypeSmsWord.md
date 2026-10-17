# auth.sentCodeTypeSmsWord

The code was sent via SMS as a secret word, starting with the letter specified in `beginning`

```tl
auth.sentCodeTypeSmsWord#a416ac81 flags:# beginning:flags.0?string = auth.SentCodeType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **beginning** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, the secret word in the sent SMS (which may contain multiple words) starts with this letter. |

### Type
[auth.SentCodeType](/type/auth.SentCodeType.md)
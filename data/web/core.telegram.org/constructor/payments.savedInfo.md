# payments.savedInfo

Saved server-side order information

```tl
payments.savedInfo#fb8fe43c flags:# has_saved_credentials:flags.1?true saved_info:flags.0?PaymentRequestedInfo = payments.SavedInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_saved\_credentials** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the user has some saved payment credentials |
| **saved\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PaymentRequestedInfo](/type/PaymentRequestedInfo.md) | Saved server-side order information |

### Type
[payments.SavedInfo](/type/payments.SavedInfo.md)